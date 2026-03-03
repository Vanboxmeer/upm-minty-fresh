
-- Add claps and post_type columns to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS claps integer NOT NULL DEFAULT 0;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS post_type text DEFAULT NULL;

-- Create increment_claps RPC function
CREATE OR REPLACE FUNCTION public.increment_claps(post_id uuid, amount integer DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blog_posts
  SET claps = claps + amount
  WHERE id = post_id;
END;
$$;
