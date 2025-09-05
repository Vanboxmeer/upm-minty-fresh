-- Fix RLS policies for categories and blog_posts to allow proper admin access

-- First, let's drop the existing restrictive policies and create more flexible ones
DROP POLICY IF EXISTS "Admin users can manage categories" ON categories;
DROP POLICY IF EXISTS "Admin users can manage all blog posts" ON blog_posts;

-- Create more flexible policies for categories
CREATE POLICY "Admin users can manage categories" ON categories
FOR ALL 
USING (
  -- Allow if user exists in admin_users table
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
  OR
  -- Allow if authenticated and email matches specific admin emails
  (
    auth.uid() IS NOT NULL 
    AND (auth.jwt() ->> 'email'::text) IN (
      'unitedpress.media@gmail.com',
      'watchcrypto.media@gmail.com'
    )
  )
)
WITH CHECK (
  -- Same check for inserts/updates
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
  OR
  (
    auth.uid() IS NOT NULL 
    AND (auth.jwt() ->> 'email'::text) IN (
      'unitedpress.media@gmail.com',
      'watchcrypto.media@gmail.com'
    )
  )
);

-- Create more flexible policies for blog_posts
CREATE POLICY "Admin users can manage all blog posts" ON blog_posts
FOR ALL 
USING (
  -- Allow if user exists in admin_users table
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
  OR
  -- Allow if authenticated and email matches specific admin emails
  (
    auth.uid() IS NOT NULL 
    AND (auth.jwt() ->> 'email'::text) IN (
      'unitedpress.media@gmail.com',
      'watchcrypto.media@gmail.com'
    )
  )
)
WITH CHECK (
  -- Same check for inserts/updates
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
  OR
  (
    auth.uid() IS NOT NULL 
    AND (auth.jwt() ->> 'email'::text) IN (
      'unitedpress.media@gmail.com',
      'watchcrypto.media@gmail.com'
    )
  )
);

-- Add the missing admin user if they don't exist
INSERT INTO admin_users (email, name, password_hash)
VALUES ('watchcrypto.media@gmail.com', 'Crypto Admin', 'magic_link_auth')
ON CONFLICT (email) DO NOTHING;