-- Add categories table for dynamic category management
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories table
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view categories
CREATE POLICY "Anyone can view categories" 
ON public.categories 
FOR SELECT 
USING (true);

-- Allow admin users to manage categories
CREATE POLICY "Admin users can manage categories" 
ON public.categories 
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

-- Add categories column to blog_posts (array of category names)
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT ARRAY['Marketing'];

-- Update existing posts to use the new categories format
UPDATE public.blog_posts 
SET categories = ARRAY[category] 
WHERE categories IS NULL AND category IS NOT NULL;

-- Insert default categories
INSERT INTO public.categories (name, slug, color) VALUES
  ('Marketing', 'marketing', '#3b82f6'),
  ('Web3', 'web3', '#8b5cf6'),
  ('Crypto', 'crypto', '#f59e0b'),
  ('Press Release', 'press-release', '#10b981'),
  ('Influencer', 'influencer', '#f97316'),
  ('SEO', 'seo', '#06b6d4'),
  ('Social Media', 'social-media', '#ec4899'),
  ('Content Marketing', 'content-marketing', '#84cc16'),
  ('Paid Advertising', 'paid-advertising', '#ef4444'),
  ('Analytics', 'analytics', '#6366f1')
ON CONFLICT (name) DO NOTHING;

-- Create trigger for categories updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();