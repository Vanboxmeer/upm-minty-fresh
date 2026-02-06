

# Trending News Section

## Overview
Add a "Trending News" feature to the UPM site that highlights the top 3 daily stories in tech, AI, VR, gaming, crypto, and web3. This will use the existing blog system -- posts tagged with a "Trending News" category will be surfaced on a dedicated `/trending` page. Each trending story can include multiple social media embed codes (Instagram, TikTok, etc.) that display alongside the article.

The homepage blog section stays exactly as it is.

## What Changes

### 1. Database: New `social_embeds` column on `blog_posts`
A new JSON column `social_embeds` will be added to the `blog_posts` table. This stores an array of embed objects, each with a platform label and raw embed HTML code. This allows you to attach multiple Instagram/TikTok embeds to any blog post.

```text
social_embeds: [
  { platform: "instagram", embed_code: "<blockquote ...>...</blockquote>" },
  { platform: "tiktok", embed_code: "<blockquote ...>...</blockquote>" },
  ...
]
```

### 2. Admin Blog Editor: Social Embeds Section
A new "Social Embeds" panel will be added to the blog post editor sidebar. You'll be able to:
- Add multiple embed codes per post
- Label each embed with a platform (Instagram, TikTok, X, YouTube, Other)
- Remove individual embeds
- Embeds are stored with the post and rendered on the trending page

### 3. New `/trending` Page
A dedicated Trending News page that:
- Filters blog posts to only show those with the "Trending News" category
- Displays a visually distinct layout -- a hero section with the cosmic starfield header branded as "Trending in Tech, AI, Crypto & Web3"
- Shows stories in a card grid (similar to the blog page)
- Each story card links to its full blog post at `/blog/[slug]`
- Below each story's content on the blog post page, any attached social embeds render inline

### 4. Social Embeds on Blog Post Page
When viewing a blog post that has social embeds, they'll render in a dedicated "From Our Socials" section after the article content. Instagram and TikTok embeds load their respective platform scripts to render natively.

### 5. Header Navigation Update
- "Blog" in the header becomes a dropdown with two items: "Blog" and "Trending News"
- Or alternatively, a "Trending" link is added next to "Blog" in the nav

### 6. New Route in App.tsx
Add the `/trending` route pointing to the new Trending News page.

## Technical Details

### Database Migration
```sql
ALTER TABLE public.blog_posts 
ADD COLUMN social_embeds jsonb DEFAULT '[]'::jsonb;
```

### Files to Create
- `src/pages/TrendingNews.tsx` -- The dedicated trending news page, filtering blog posts by "Trending News" category
- `src/components/SocialEmbedsRenderer.tsx` -- Component that safely renders embed codes using `dangerouslySetInnerHTML` with DOMPurify sanitization, and loads platform embed scripts

### Files to Modify
- `src/components/admin/BlogPostEditor.tsx` -- Add social embeds management panel in the sidebar
- `src/hooks/useBlogPosts.ts` -- Add the `social_embeds` field to the BlogPost interface
- `src/pages/BlogPost.tsx` -- Render social embeds section below article content
- `src/components/Header.tsx` -- Add "Trending" nav link (desktop and mobile)
- `src/App.tsx` -- Add `/trending` route
- `src/integrations/supabase/types.ts` -- Will auto-update after migration

### Social Embed Rendering Strategy
- Embed codes are sanitized with DOMPurify (already installed) before rendering
- After rendering, the component dynamically loads Instagram (`instagram.com/embed.js`) and TikTok (`tiktok.com/embed.js`) scripts so embeds display natively
- Each embed is wrapped in a responsive container for consistent sizing

### Security Consideration
Since embed codes contain third-party HTML, they are only editable by admin users through the protected blog editor. DOMPurify sanitization adds an extra layer of safety on the rendering side. The `social_embeds` column follows the same RLS policies as all other `blog_posts` columns.

