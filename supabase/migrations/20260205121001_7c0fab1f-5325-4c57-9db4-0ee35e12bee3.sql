-- Fix 1: think_tank_rate_limits - Remove overly permissive policy and restrict to service_role only
DROP POLICY IF EXISTS "Anyone can manage rate limits" ON public.think_tank_rate_limits;

-- Create restrictive policy - only service_role (edge functions) can manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.think_tank_rate_limits FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Fix 2: newsletter_subscribers - Replace blanket 'false' policy with proper admin check
DROP POLICY IF EXISTS "Admin only read access to newsletter subscribers" ON public.newsletter_subscribers;

-- Create proper admin access policy using admin_users table check
CREATE POLICY "Admin users can read newsletter subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
));

-- Fix 3: admin_users password_hash exposure - Since the system uses Supabase Auth magic links
-- and not custom password authentication, drop the password_hash column if it's not being used.
-- First, let's check if the column can be safely removed by making it nullable temporarily
-- Actually, we should NOT drop the column without user confirmation as it could break things.
-- Instead, we'll add a security definer function to check admin status without exposing password_hash

-- Create a security definer function to check admin status without exposing password_hash
CREATE OR REPLACE FUNCTION public.is_admin_user(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = check_email
  )
$$;

-- Add comment to document the security concern
COMMENT ON COLUMN public.admin_users.password_hash IS 'SECURITY: This column stores password hashes. Consider migrating to Supabase Auth if custom password auth is not needed. Ensure this column is never directly queryable by non-admin users.';