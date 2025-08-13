-- Fix security issue: Restrict SELECT access to newsletter_subscribers table
-- Only allow authenticated admin users to read subscriber data

-- First, let's see current policies
-- DROP any existing overly permissive SELECT policies if they exist
DROP POLICY IF EXISTS "Public read access" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.newsletter_subscribers;

-- Create a secure SELECT policy that only allows service role access
-- This means only server-side operations and authorized admin functions can read the data
CREATE POLICY "Admin only read access to newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false); -- No client-side access allowed

-- Keep the existing INSERT policy for public newsletter signups
-- (This should already exist but let's ensure it's correct)
DROP POLICY IF EXISTS "Anyone can insert newsletter subscriptions" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can insert newsletter subscriptions" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;