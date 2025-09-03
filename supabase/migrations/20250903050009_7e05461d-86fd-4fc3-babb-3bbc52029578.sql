-- Fix RLS policies for blog_posts table to allow service role operations
-- Drop existing policies and recreate them correctly
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;

-- Create proper RLS policies
-- Allow anyone to view published posts
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

-- Allow admin users (authenticated with admin email) to manage all posts
CREATE POLICY "Admin users can manage all blog posts" 
ON public.blog_posts 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  )
);

-- Allow service role (used by edge functions) to bypass RLS
CREATE POLICY "Service role can manage all blog posts" 
ON public.blog_posts 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');