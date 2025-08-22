-- Fix search_path issues for existing functions
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.affiliates WHERE referral_code = code) INTO exists_check;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Update stats when a referral is created
  IF TG_OP = 'INSERT' THEN
    -- Find affiliate by code or email
    INSERT INTO public.referral_stats (affiliate_id, total_referrals, last_referral_date)
    SELECT a.id, 1, NEW.referral_date
    FROM public.affiliates a
    WHERE (NEW.referrer_code IS NOT NULL AND a.referral_code = NEW.referrer_code)
       OR (NEW.referrer_email IS NOT NULL AND a.affiliate_email = NEW.referrer_email)
    ON CONFLICT (affiliate_id) DO UPDATE SET
      total_referrals = referral_stats.total_referrals + 1,
      last_referral_date = NEW.referral_date,
      updated_at = now();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;