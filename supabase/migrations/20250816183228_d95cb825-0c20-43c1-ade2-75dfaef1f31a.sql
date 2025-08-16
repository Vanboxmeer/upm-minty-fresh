-- Create cleanup function for rate limits (runs daily via cron)
CREATE OR REPLACE FUNCTION public.cleanup_newsletter_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Remove rate limit records older than 7 days
  DELETE FROM public.newsletter_rate_limits 
  WHERE last_attempt_at < now() - interval '7 days';
  
  -- Reset blocked status for records where block period has expired
  UPDATE public.newsletter_rate_limits 
  SET blocked_until = NULL 
  WHERE blocked_until IS NOT NULL 
    AND blocked_until < now();
    
  -- Log cleanup action
  INSERT INTO public.audit_logs (
    action, 
    resource, 
    resource_id, 
    metadata
  ) VALUES (
    'cleanup_rate_limits',
    'newsletter_rate_limits',
    'system',
    jsonb_build_object(
      'cleanup_time', now(),
      'automated', true
    )
  );
END;
$$;