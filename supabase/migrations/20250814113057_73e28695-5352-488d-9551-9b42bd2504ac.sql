-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.validate_newsletter_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Check for duplicate submissions from same IP within 1 hour
  IF EXISTS (
    SELECT 1 FROM public.newsletter_subscribers 
    WHERE ip = NEW.ip 
    AND created_at > now() - interval '1 hour'
    AND email != NEW.email
  ) THEN
    RAISE EXCEPTION 'Too many subscription attempts from this IP address. Please try again later.';
  END IF;
  
  -- Basic email validation
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Log the subscription attempt
  INSERT INTO public.audit_logs (
    action, 
    resource, 
    resource_id, 
    ip_address, 
    user_agent, 
    metadata
  ) VALUES (
    'newsletter_subscribe',
    'newsletter_subscription',
    NEW.email,
    NEW.ip,
    NEW.user_agent,
    jsonb_build_object(
      'source', NEW.source,
      'name', NEW.name,
      'consent', NEW.consent
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Create the trigger for newsletter validation
CREATE TRIGGER newsletter_validation_trigger
  BEFORE INSERT ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.validate_newsletter_subscription();