-- Remove the problematic public read policy from admin_users
DROP POLICY IF EXISTS "Allow email lookup for authentication" ON public.admin_users;

-- Keep the secure policies for authenticated admin users only
-- No changes needed to existing policies as they are properly secured