import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LoginLinkRequest {
  email: string;
  redirectUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectUrl }: LoginLinkRequest = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email belongs to an approved affiliate
    const { data: affiliate, error: affiliateError } = await supabase
      .from('affiliates')
      .select('name, affiliate_email, status')
      .eq('affiliate_email', email)
      .eq('status', 'approved')
      .single();

    if (affiliateError || !affiliate) {
      return new Response(
        JSON.stringify({ error: 'Affiliate account not found or not approved' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate magic link using Supabase Auth
    const { data, error: authError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: redirectUrl
      }
    });

    if (authError || !data.properties?.action_link) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate login link' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send branded email using Resend API directly
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'UPM Affiliate Program <noreply@unitedpress.media>',
        to: [email],
        subject: 'Login to Your UPM Affiliate Dashboard',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UPM Affiliate Dashboard Login</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">UPM Affiliate Dashboard</h1>
              <p style="color: #666; font-size: 16px;">Secure Login Access</p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #1e293b; margin-bottom: 15px;">Hello ${affiliate.name || 'Partner'},</h2>
              <p style="margin-bottom: 20px;">Click the button below to securely access your UPM Affiliate Dashboard where you can:</p>
              
              <ul style="margin-bottom: 25px; padding-left: 20px;">
                <li>View your referral statistics</li>
                <li>Track commission earnings</li>
                <li>Access marketing materials</li>
                <li>Download your referral links</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${data.properties.action_link}" 
                   style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                  Access My Dashboard
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-top: 25px;">
                This secure link will expire in 1 hour for your security. If you didn't request this login, you can safely ignore this email.
              </p>
            </div>
            
            <div style="text-align: center; font-size: 13px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
              <p>© 2024 United Press Media (UPM)<br>
              This email was sent because you requested access to your affiliate dashboard.</p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Login email sent successfully:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Login link sent successfully',
        affiliate_name: affiliate.name 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in send-affiliate-login-link function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);