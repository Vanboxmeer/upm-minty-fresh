-- Add gallery_images column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN gallery_images JSONB DEFAULT '[]'::jsonb;