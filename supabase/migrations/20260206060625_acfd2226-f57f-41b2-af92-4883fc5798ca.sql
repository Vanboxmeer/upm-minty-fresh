ALTER TABLE public.blog_posts 
ADD COLUMN social_embeds jsonb DEFAULT '[]'::jsonb;