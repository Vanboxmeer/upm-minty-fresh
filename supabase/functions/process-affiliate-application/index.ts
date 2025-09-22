import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AffiliateApplication {
  affiliate_name: string;
  affiliate_email: string;
  company?: string;
  referral_code: string;
}

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  console.log(`Processing ${req.method} request`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { affiliate_name, affiliate_email, company }: Omit<AffiliateApplication, 'referral_code'> = await req.json();

    console.log('Processing affiliate application for:', affiliate_email);

    // Check if affiliate already exists
    const { data: existingAffiliate } = await supabaseClient
      .from('affiliates')
      .select('id')
      .eq('affiliate_email', affiliate_email)
      .single();

    if (existingAffiliate) {
      return new Response(
        JSON.stringify({ 
          error: 'An affiliate account with this email already exists'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Generate a unique referral code using the database function
    const { data: referralCodeData, error: codeError } = await supabaseClient
      .rpc('generate_referral_code');

    if (codeError) {
      console.error('Error generating referral code:', codeError);
      throw codeError;
    }

    const referral_code = referralCodeData;

    // Insert affiliate application
    const { data: affiliateData, error: affiliateError } = await supabaseClient
      .from('affiliates')
      .insert({
        affiliate_name,
        affiliate_email,
        company,
        referral_code,
        status: 'pending' // Default to pending for manual review
      })
      .select()
      .single();

    if (affiliateError) {
      console.error('Error inserting affiliate:', affiliateError);
      throw affiliateError;
    }

    console.log('Affiliate application created:', affiliateData.id);

    // Initialize referral stats
    const { error: statsError } = await supabaseClient
      .from('referral_stats')
      .insert({
        affiliate_id: affiliateData.id,
        total_referrals: 0,
        successful_referrals: 0,
        commission_earned: 0
      });

    if (statsError) {
      console.error('Error initializing affiliate stats:', statsError);
      // Don't fail the whole process if stats initialization fails
    }

    // Send notification email to admin (optional)
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (resendApiKey) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@unitedpress.media',
            to: ['unitedpress.media@gmail.com'],
            subject: 'New Affiliate Application',
            html: `
              <h2>New Affiliate Application</h2>
              <p><strong>Name:</strong> ${affiliate_name}</p>
              <p><strong>Email:</strong> ${affiliate_email}</p>
              <p><strong>Company:</strong> ${company || 'Not specified'}</p>
              <p><strong>Referral Code:</strong> ${referral_code}</p>
              <p><strong>Status:</strong> Pending Review</p>
              <p>Please review and approve/reject this application in your admin panel.</p>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send admin notification email');
        }
      }
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError);
      // Don't fail the whole process if email notification fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Affiliate application submitted successfully',
        affiliate_id: affiliateData.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in process-affiliate-application function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process affiliate application',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});