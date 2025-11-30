-- Add social handle fields to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN twitter_handles text[] DEFAULT '{}',
ADD COLUMN linkedin_handles text[] DEFAULT '{}';