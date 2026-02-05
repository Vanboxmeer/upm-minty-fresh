import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const affiliateSchema = z.object({
  affiliate_name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters').trim(),
  affiliate_email: z.string().email('Invalid email address').max(254, 'Email too long').trim(),
  company: z.string().max(200, 'Company name must be under 200 characters').optional()
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
    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = affiliateSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: validationResult.error.issues.map(i => i.message).join(', ')
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { affiliate_name, affiliate_email, company } = validationResult.data;

    console.log('Processing affiliate application for:', affiliate_email.slice(0, 3) + '***');

    // Check if affiliate already exists
    const { data: existingAffiliate } = await supabaseClient
      .from('affiliates')
      .select('id, status')
      .eq('affiliate_email', affiliate_email)
      .maybeSingle();

    if (existingAffiliate) {
      return new Response(
        JSON.stringify({ 
          error: 'An affiliate account with this email already exists',
          existing_status: existingAffiliate.status,
          affiliate_id: existingAffiliate.id
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
        affiliate_name: affiliate_name.slice(0, 100),
        affiliate_email,
        company: company?.slice(0, 200),
        referral_code,
        status: 'approved' // Auto-approve for immediate access
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
        // Sanitize for HTML
        const safeName = sanitizeForHtml(affiliate_name);
        const safeEmail = sanitizeForHtml(affiliate_email);
        const safeCompany = sanitizeForHtml(company);
        const safeCode = sanitizeForHtml(referral_code);

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
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Company:</strong> ${safeCompany || 'Not specified'}</p>
              <p><strong>Referral Code:</strong> ${safeCode}</p>
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
        error: 'Failed to process affiliate application'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});