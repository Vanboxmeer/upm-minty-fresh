-- Fix search path security issue
CREATE OR REPLACE FUNCTION public.check_newsletter_rate_limit(client_ip TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rate_limit_record RECORD;
  max_attempts INTEGER := 5;
  time_window INTERVAL := '1 hour';
  block_duration INTERVAL := '24 hours';
BEGIN
  -- Get current rate limit record for IP
  SELECT * INTO rate_limit_record 
  FROM public.newsletter_rate_limits 
  WHERE ip_address = client_ip;

  -- If no record exists, create one and allow
  IF rate_limit_record IS NULL THEN
    INSERT INTO public.newsletter_rate_limits (ip_address) 
    VALUES (client_ip);
    RETURN TRUE;
  END IF;

  -- Check if currently blocked
  IF rate_limit_record.blocked_until IS NOT NULL 
     AND rate_limit_record.blocked_until > now() THEN
    RETURN FALSE;
  END IF;

  -- Reset if time window has passed
  IF rate_limit_record.first_attempt_at < now() - time_window THEN
    UPDATE public.newsletter_rate_limits 
    SET attempt_count = 1,
        first_attempt_at = now(),
        last_attempt_at = now(),
        blocked_until = NULL
    WHERE ip_address = client_ip;
    RETURN TRUE;
  END IF;

  -- Increment attempt count
  IF rate_limit_record.attempt_count >= max_attempts THEN
    -- Block the IP
    UPDATE public.newsletter_rate_limits 
    SET blocked_until = now() + block_duration,
        last_attempt_at = now()
    WHERE ip_address = client_ip;
    RETURN FALSE;
  ELSE
    -- Increment count
    UPDATE public.newsletter_rate_limits 
    SET attempt_count = attempt_count + 1,
        last_attempt_at = now()
    WHERE ip_address = client_ip;
    RETURN TRUE;
  END IF;
END;
$$;