-- Add enhanced newsletter validation and logging
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  user_id UUID,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Admin only read access to audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (false);

-- Anyone can insert audit logs (for system logging)
CREATE POLICY "System can insert audit logs" 
ON public.audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Add validation trigger for newsletter subscribers to prevent abuse
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
$$ LANGUAGE plpgsql SECURITY DEFINER;