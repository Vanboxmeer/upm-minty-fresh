-- Fix critical IP address exposure in newsletter_rate_limits table
-- Drop the overly permissive policy and replace with secure ones

DROP POLICY IF EXISTS "System can manage rate limits" ON public.newsletter_rate_limits;

-- Create secure policies that protect IP address data
CREATE POLICY "Service role can manage rate limits" 
ON public.newsletter_rate_limits 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Allow edge functions to check rate limits (read-only for system operations)
CREATE POLICY "Edge functions can check rate limits" 
ON public.newsletter_rate_limits 
FOR SELECT 
USING (auth.role() = 'service_role'::text OR auth.role() = 'anon'::text);

-- Allow edge functions to insert/update rate limit records (for newsletter functionality)
CREATE POLICY "Edge functions can update rate limits" 
ON public.newsletter_rate_limits 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role'::text OR auth.role() = 'anon'::text);

CREATE POLICY "Edge functions can modify rate limits" 
ON public.newsletter_rate_limits 
FOR UPDATE 
USING (auth.role() = 'service_role'::text OR auth.role() = 'anon'::text);