import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  referrerName?: string;
  referrerCode?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, message, referrerName, referrerCode }: ContactEmailRequest = await req.json();

    console.log("Sending contact email:", { firstName, lastName, email });

    // Send notification email to team
    const teamNotification = await resend.emails.send({
      from: "UPM Contact Form <noreply@unitedpress.media>",
      to: ["unitedpress.media@gmail.com"],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${referrerName || referrerCode ? `
        <p><strong>Referrer Name:</strong> ${referrerName || 'Not provided'}</p>
        <p><strong>Referrer Email/Code:</strong> ${referrerCode || 'Not provided'}</p>
        ` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from the UPM contact form.</em></p>
      `,
    });

    // Send confirmation email to user
    const userConfirmation = await resend.emails.send({
      from: "United Press Media <noreply@unitedpress.media>",
      to: [email],
      subject: "Thank you for contacting United Press Media",
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>The United Press Media Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          United Press Media<br>
          Digital Marketing Services<br>
          <a href="https://unitedpress.media">unitedpress.media</a>
        </p>
      `,
    });

    console.log("Team notification sent:", teamNotification);
    console.log("User confirmation sent:", userConfirmation);

    return new Response(JSON.stringify({ 
      success: true, 
      teamNotification, 
      userConfirmation 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);