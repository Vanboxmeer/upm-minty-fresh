import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

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
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (resendApiKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: "UPM Blog <unitedpress.media@gmail.com>",
            to: [email],
            subject: "Welcome to UPM's Marketing Insights Newsletter!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb; text-align: center;">Welcome to UPM!</h1>
                <p>Hi ${name || 'there'},</p>
                <p>Thank you for subscribing to United Press Media's marketing insights newsletter!</p>
                <p>You'll receive bi-weekly updates with:</p>
                <ul>
                  <li>Latest marketing trends and strategies</li>
                  <li>Case studies from successful campaigns</li>
                  <li>Industry insights and expert tips</li>
                  <li>Exclusive offers and updates</li>
                </ul>
                <p>Stay tuned for valuable content that will help elevate your marketing game!</p>
                <p>Best regards,<br>The UPM Team</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                  You're receiving this because you subscribed to our newsletter. 
                  <a href="mailto:unitedpress.media@gmail.com?subject=Unsubscribe">Unsubscribe</a>
                </p>
              </div>
            `,
          }),
        });
      }
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
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