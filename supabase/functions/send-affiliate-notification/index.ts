import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  affiliate_email: string;
  affiliate_name: string;
  status: 'approved' | 'declined';
  referral_code?: string;
  notes?: string;
}

serve(async (req) => {
  console.log(`Processing ${req.method} request`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { affiliate_email, affiliate_name, status, referral_code, notes }: NotificationRequest = await req.json();

    console.log(`Sending ${status} notification to:`, affiliate_email);

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    let subject: string;
    let htmlContent: string;

    if (status === 'approved') {
      subject = 'Welcome to UPM Affiliate Program! 🎉';
      const partnerDashboardUrl = `https://unitedpress.media/partner-dashboard`;
      const referralUrl = `https://unitedpress.media/?ref=${referral_code}`;
      
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">Congratulations! 🎉</h1>
            <h2 style="color: #374151; font-weight: normal;">Your UPM Affiliate Application Has Been Approved</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p>Dear ${affiliate_name},</p>
            <p>We're excited to welcome you to the UPM Affiliate Program! Your application has been approved and you can now start earning commissions.</p>
            
            ${notes ? `<div style="background: #e0f2fe; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <strong>Note from our team:</strong><br>
              ${notes}
            </div>` : ''}
          </div>
          
          <div style="background: #ffffff; border: 2px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Affiliate Details:</h3>
            <p><strong>Referral Code:</strong> <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${referral_code}</code></p>
            <p><strong>Your Referral Link:</strong><br>
            <a href="${referralUrl}" style="color: #2563eb; word-break: break-all;">${referralUrl}</a></p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${partnerDashboardUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Access Your Partner Dashboard
            </a>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">Next Steps:</h3>
            <ol style="color: #374151; line-height: 1.6;">
              <li>Visit your partner dashboard to get your QR code and sharing tools</li>
              <li>Start sharing your referral link with your network</li>
              <li>Track your referrals and commissions in real-time</li>
              <li>Get paid monthly for successful referrals</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
            <p>Questions? Reply to this email or contact us at unitedpress.media@gmail.com</p>
            <p style="font-size: 14px;">© 2025 United Press Media. All rights reserved.</p>
          </div>
        </div>
      `;
    } else {
      subject = 'Update on Your UPM Affiliate Application';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; margin-bottom: 10px;">Application Update</h1>
            <h2 style="color: #374151; font-weight: normal;">UPM Affiliate Program</h2>
          </div>
          
          <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 20px;">
            <p>Dear ${affiliate_name},</p>
            <p>Thank you for your interest in the UPM Affiliate Program. After careful review, we're unable to approve your application at this time.</p>
            
            ${notes ? `<div style="background: #fff; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <strong>Feedback:</strong><br>
              ${notes}
            </div>` : ''}
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>You're welcome to reapply in the future</li>
              <li>Consider building more experience in digital marketing</li>
              <li>Follow us on social media for updates and tips</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
            <p>Questions? Reply to this email or contact us at unitedpress.media@gmail.com</p>
            <p style="font-size: 14px;">© 2025 United Press Media. All rights reserved.</p>
          </div>
        </div>
      `;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'UPM Affiliate Program <noreply@unitedpress.media>',
        to: [affiliate_email],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${status} notification sent successfully`,
        email_id: emailResult.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in send-affiliate-notification function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});