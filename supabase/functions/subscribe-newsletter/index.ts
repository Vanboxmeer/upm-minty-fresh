import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';
import { Resend } from "npm:resend@2.0.0";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscribeRequest {
  email: string;
  name?: string;
  source?: string;
  ip?: string;
  userAgent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter subscription request received");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, source = "blog", ip, userAgent }: NewsletterSubscribeRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get client IP from various headers (for security logging)
    const clientIP = ip || 
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      req.headers.get('cf-connecting-ip') ||
      'unknown';

    // Check rate limiting
    const { data: rateLimitResult, error: rateLimitError } = await supabase
      .rpc('check_newsletter_rate_limit', { client_ip: clientIP });

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!rateLimitResult) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format (additional security)
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if already subscribed (limited query, no data exposure)
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (existing) {
      // Don't reveal existing subscription details for security
      console.log(`Duplicate subscription attempt for email: ${email.substring(0, 3)}***`);
      return new Response(
        JSON.stringify({ message: "Successfully processed your subscription!" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        name,
        source,
        ip: clientIP,
        user_agent: userAgent
      });

    if (insertError) {
      console.error("Database error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: "UPM Blog <unitedpress.media@gmail.com>",
        to: [email],
        subject: "Welcome to UPM's Marketing Insights Newsletter!",
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="color: #1a1a1a; margin-bottom: 24px;">Welcome to UPM's Newsletter!</h1>
            
            <p style="color: #4a4a4a; line-height: 1.6; margin-bottom: 16px;">
              ${name ? `Hi ${name},` : 'Hi there,'}
            </p>
            
            <p style="color: #4a4a4a; line-height: 1.6; margin-bottom: 16px;">
              Thank you for subscribing to our newsletter! You'll now receive the latest insights on digital marketing, Web3, crypto, and more directly in your inbox.
            </p>
            
            <p style="color: #4a4a4a; line-height: 1.6; margin-bottom: 16px;">
              What to expect:
            </p>
            
            <ul style="color: #4a4a4a; line-height: 1.6; margin-bottom: 24px;">
              <li>Bi-weekly marketing insights and strategies</li>
              <li>Latest trends in Web3 and crypto marketing</li>
              <li>Case studies and success stories</li>
              <li>Exclusive tips from our team</li>
            </ul>
            
            <p style="color: #4a4a4a; line-height: 1.6; margin-bottom: 24px;">
              In the meantime, check out our latest blog posts at <a href="https://unitedpress.media/blog" style="color: #2563eb;">unitedpress.media/blog</a>
            </p>
            
            <div style="border-top: 1px solid #e5e5e5; padding-top: 24px; margin-top: 32px;">
              <p style="color: #888; font-size: 14px;">
                Best regards,<br>
                The UPM Team<br>
                <a href="https://unitedpress.media" style="color: #2563eb;">United Press Media</a>
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the subscription if email fails
    }

    console.log("Newsletter subscription successful");

    return new Response(
      JSON.stringify({ message: "Successfully subscribed!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in newsletter subscription:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);