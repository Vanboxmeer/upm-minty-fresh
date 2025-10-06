-- Fix search_path for the get_content_age_days function
CREATE OR REPLACE FUNCTION public.get_content_age_days(reviewed_date TIMESTAMP WITH TIME ZONE)
RETURNS INTEGER
LANGUAGE sql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXTRACT(DAY FROM (now() - reviewed_date))::INTEGER;
$$;