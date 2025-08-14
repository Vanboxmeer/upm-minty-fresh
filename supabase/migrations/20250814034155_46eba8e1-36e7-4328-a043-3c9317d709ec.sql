-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$;

-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN lower(trim(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g')));
END;
$$;