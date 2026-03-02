import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const vibeCodingSchema = z.object({
  approximateBudget: z.string().max(100).optional(),
  timeframe: z.string().max(100).optional(),
  appFeatures: z.array(z.string().max(200)).max(20).optional(),
  appDescription: z.string().max(2000).optional(),
  includesWeb3: z.string().max(100).optional()
}).optional();

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name too long').trim(),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name too long').trim(),
  email: z.string().email('Invalid email address').max(254, 'Email too long').trim(),
  phone: z.string().max(30, 'Phone number too long').optional(),
  telegram: z.string().max(100, 'Telegram handle too long').optional(),
  country: z.string().min(1, 'Country is required').max(100, 'Country name too long'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message must be under 5000 characters'),
  referrerName: z.string().max(200).optional().nullable(),
  referrerCode: z.string().max(50).optional().nullable(),
  vibeCodingData: vibeCodingSchema
});

// Sanitize string for HTML email content
function sanitizeForHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = contactSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: validationResult.error.issues.map(i => i.message).join(', ')
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { firstName, lastName, email, phone, telegram, country, message, referrerName, referrerCode, vibeCodingData } = validationResult.data;

    console.log("Sending contact email:", { firstName, lastName, email: email.slice(0, 3) + '***' });

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
        referred_user_name: `${firstName} ${lastName}`.slice(0, 200),
        referred_user_email: email,
        referrer_name: referrerName?.slice(0, 200) || 'Direct Contact',
        status: 'converted',
        notes: `Contact form submission: ${message.slice(0, 1000)}`,
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

    // Sanitize all user inputs for HTML
    const safeFirstName = sanitizeForHtml(firstName);
    const safeLastName = sanitizeForHtml(lastName);
    const safeEmail = sanitizeForHtml(email);
    const safePhone = sanitizeForHtml(phone);
    const safeTelegram = sanitizeForHtml(telegram);
    const safeCountry = sanitizeForHtml(country);
    const safeMessage = sanitizeForHtml(message);
    const safeReferrerName = sanitizeForHtml(referrerName);
    const safeReferrerCode = sanitizeForHtml(referrerCode);

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
        subject: `New Contact Form Submission from ${safeFirstName} ${safeLastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
          <p><strong>Telegram:</strong> ${safeTelegram || 'Not provided'}</p>
          <p><strong>Country:</strong> ${safeCountry}</p>
          <p><strong>Referrer:</strong> ${safeReferrerName || 'None'} ${safeReferrerCode ? `(Code: ${safeReferrerCode})` : ''}</p>
          ${vibeCodingData ? `
            <h3>Vibe Coding App Development Details:</h3>
            <p><strong>Budget:</strong> ${sanitizeForHtml(vibeCodingData.approximateBudget) || 'Not specified'}</p>
            <p><strong>Timeframe:</strong> ${sanitizeForHtml(vibeCodingData.timeframe) || 'Not specified'}</p>
            <p><strong>App Type:</strong> ${sanitizeForHtml(vibeCodingData.includesWeb3) || 'Not specified'}</p>
            ${vibeCodingData.appFeatures?.length ? `<p><strong>Features:</strong> ${vibeCodingData.appFeatures.map(f => sanitizeForHtml(f)).join(', ')}</p>` : ''}
            ${vibeCodingData.appDescription ? `<p><strong>Description:</strong> ${sanitizeForHtml(vibeCodingData.appDescription)}</p>` : ''}
          ` : ''}
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!teamNotification.ok) {
      const errorText = await teamNotification.text();
      console.error('Team notification error:', errorText);
      throw new Error('Failed to send notification email. Please try again.');
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
          <p>Hi ${safeFirstName},</p>
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
      JSON.stringify({ error: 'An error occurred processing your request' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);