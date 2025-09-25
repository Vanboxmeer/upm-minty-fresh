-- Add columns to referrals table for better tracking
ALTER TABLE public.referrals 
ADD COLUMN IF NOT EXISTS referral_method text DEFAULT 'direct',
ADD COLUMN IF NOT EXISTS approved boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS approved_by text,
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS commission_amount numeric DEFAULT 0.00;

-- Update existing records to set referral method
UPDATE public.referrals 
SET referral_method = CASE 
  WHEN referrer_code IS NOT NULL THEN 'referral_link'
  WHEN source_domain IS NOT NULL AND source_domain != 'unitedpress.media' THEN 'domain_tracking'
  ELSE 'direct'
END
WHERE referral_method = 'direct';

-- Update referral_stats table with detailed tracking
CREATE OR REPLACE FUNCTION public.update_referral_stats_detailed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Update stats when a referral is created or updated
  IF TG_OP IN ('INSERT', 'UPDATE') THEN
    -- Find affiliate by code
    INSERT INTO public.referral_stats (
      affiliate_id, 
      total_referrals, 
      successful_referrals,
      commission_earned,
      last_referral_date
    )
    SELECT 
      a.id,
      COALESCE((SELECT COUNT(*) FROM referrals WHERE referrer_code = a.referral_code), 0),
      COALESCE((SELECT COUNT(*) FROM referrals WHERE referrer_code = a.referral_code AND status = 'converted' AND approved = true), 0),
      COALESCE((SELECT SUM(commission_amount) FROM referrals WHERE referrer_code = a.referral_code AND approved = true), 0),
      NEW.referral_date
    FROM public.affiliates a
    WHERE a.referral_code = NEW.referrer_code
    ON CONFLICT (affiliate_id) DO UPDATE SET
      total_referrals = EXCLUDED.total_referrals,
      successful_referrals = EXCLUDED.successful_referrals,
      commission_earned = EXCLUDED.commission_earned,
      last_referral_date = EXCLUDED.last_referral_date,
      updated_at = now();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Create trigger for detailed stats updates
DROP TRIGGER IF EXISTS update_referral_stats_trigger ON public.referrals;
CREATE TRIGGER update_referral_stats_detailed_trigger
  AFTER INSERT OR UPDATE ON public.referrals
  FOR EACH ROW EXECUTE FUNCTION public.update_referral_stats_detailed();