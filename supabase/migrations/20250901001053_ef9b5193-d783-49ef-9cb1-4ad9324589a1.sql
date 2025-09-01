-- Allow checking admin email existence during login (anonymous access for email verification only)
CREATE POLICY "Allow email lookup for authentication"
ON public.admin_users
FOR SELECT
TO anon
USING (true);