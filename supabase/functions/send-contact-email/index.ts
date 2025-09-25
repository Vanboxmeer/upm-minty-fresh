import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  telegram?: string;
  country: string;
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
    const { firstName, lastName, email, phone, telegram, country, message, referrerName, referrerCode }: ContactEmailRequest = await req.json();

    console.log("Sending contact email:", { firstName, lastName, email });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store contact inquiry in database
    const { error: contactError } = await supabase
      .from('referrals')
      .insert({
        referrer_code: referrerCode || null,
        referred_user_name: `${firstName} ${lastName}`,
        referred_user_email: email,
        referrer_name: referrerName || 'Direct Contact',
        status: 'converted',
        notes: `Contact form submission: ${message}`,
        source_domain: req.headers.get('referer') ? new URL(req.headers.get('referer')!).hostname : null
      });

    if (contactError) {
      console.error('Error storing contact inquiry:', contactError);
    }

    // Send emails using Resend API directly
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Send notification email to team
    const teamNotification = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "UPM Contact Form <noreply@unitedpress.media>",
        to: ["unitedpress.media@gmail.com"],
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Telegram:</strong> ${telegram || 'Not provided'}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Referrer:</strong> ${referrerName || 'None'} ${referrerCode ? `(Code: ${referrerCode})` : ''}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!teamNotification.ok) {
      const errorText = await teamNotification.text();
      console.error('Team notification error:', errorText);
    }

    // Send confirmation email to user
    const userConfirmation = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "United Press Media <noreply@unitedpress.media>",
        to: [email],
        subject: "Thank you for contacting United Press Media",
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${firstName},</p>
          <p>We've received your message and will get back to you within 24 hours during business days.</p>
          <p>In the meantime, feel free to explore our services and case studies on our website.</p>
          <p>Best regards,<br>The UPM Team</p>
        `,
      }),
    });

    if (!userConfirmation.ok) {
      const errorText = await userConfirmation.text();
      console.error('User confirmation error:', errorText);
    }

    console.log('Contact emails sent successfully');

    return new Response(JSON.stringify({ success: true }), {
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