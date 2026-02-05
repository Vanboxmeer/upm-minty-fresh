-- Fix 1: audit_logs - Restrict INSERT to service_role only (prevent log flooding attacks)
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;

CREATE POLICY "Service role can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Fix 2: security_definer_functions - Revoke public execute on sensitive functions
-- This prevents direct client-side calls while still allowing edge functions (service_role) to use them

REVOKE EXECUTE ON FUNCTION public.generate_referral_code() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_newsletter_rate_limit(text) FROM PUBLIC;

-- Grant execute only to service_role for these functions
GRANT EXECUTE ON FUNCTION public.generate_referral_code() TO service_role;
GRANT EXECUTE ON FUNCTION public.check_newsletter_rate_limit(text) TO service_role;

-- Add internal access control to generate_referral_code as defense in depth
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  -- Defense in depth: Only allow service_role to generate codes
  IF current_setting('role', true) IS DISTINCT FROM 'service_role' THEN
    RAISE EXCEPTION 'Access denied: service_role privileges required';
  END IF;

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