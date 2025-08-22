-- Update affiliates table with application status fields
ALTER TABLE public.affiliates 
ADD COLUMN IF NOT EXISTS application_date timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS approved_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS notes text;

-- Update existing records to have application_date if null
UPDATE public.affiliates 
SET application_date = created_at 
WHERE application_date IS NULL;

-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can manage their own records
CREATE POLICY "Admin users can view their own data" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid()::text = id::text);

CREATE POLICY "Admin users can update their own data" 
ON public.admin_users 
FOR UPDATE 
USING (auth.uid()::text = id::text);

-- Update affiliate RLS policies to allow admin access
CREATE POLICY "Admins can view all affiliates" 
ON public.affiliates 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
);

CREATE POLICY "Admins can update all affiliates" 
ON public.affiliates 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
);

-- Create function to handle affiliate status updates
CREATE OR REPLACE FUNCTION public.update_affiliate_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Set approved_date when status changes to approved
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    NEW.approved_date = now();
  END IF;
  
  -- Clear approved_date when status changes from approved
  IF NEW.status != 'approved' AND OLD.status = 'approved' THEN
    NEW.approved_date = NULL;
  END IF;
  
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for affiliate status updates
DROP TRIGGER IF EXISTS update_affiliate_status_trigger ON public.affiliates;
CREATE TRIGGER update_affiliate_status_trigger
  BEFORE UPDATE ON public.affiliates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_affiliate_status();

-- Create index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON public.affiliates(status);
CREATE INDEX IF NOT EXISTS idx_affiliates_application_date ON public.affiliates(application_date);