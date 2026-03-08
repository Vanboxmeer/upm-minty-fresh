

# Fix Sitemap for Google Search Console

## Problem
Google requires the sitemap URL to be on `unitedpress.media`. The current `/sitemap.xml` route is a React component that does a JavaScript redirect to the Supabase edge function. Google's sitemap crawler does not execute JavaScript, so it sees blank HTML and fails.

## Solution
Generate a static `sitemap.xml` file at build time using a Vite plugin. Every time you publish via Lovable (which triggers a build), the sitemap is regenerated with the latest blog posts from Supabase.

## Changes

### 1. Add Vite plugin to generate sitemap at build time (`vite.config.ts`)
- Add a `closeBundle` plugin that queries the Supabase REST API directly (using `fetch`, no client library needed in Node) for published blog posts
- Writes `dist/sitemap.xml` with all static routes + blog post URLs using `https://unitedpress.media` as base URL
- Same logic currently in the edge function, just runs at build time

### 2. Update `public/robots.txt`
- Change sitemap directive back to: `Sitemap: https://unitedpress.media/sitemap.xml`

### 3. Remove `/sitemap.xml` React route
- Remove the route from `App.tsx`
- Delete `src/pages/SitemapXML.tsx` (no longer needed -- the static file will be served directly)
- Keep `src/pages/Sitemap.tsx` as-is (download utility, separate route)

### 4. Keep the edge function
- `generate-sitemap` edge function stays for the admin dashboard health check and as a fallback. No changes needed there.

### Trade-off
The sitemap updates only when you publish. Since you chose "on publish," this is the expected behavior and costs zero edge function invocations for Google crawls.

