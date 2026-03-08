

# Fix: Google Search Console Can't Fetch Sitemap

## Root Cause
Google's sitemap crawler does NOT execute JavaScript. The current `/sitemap.xml` route renders a React component that uses `window.location.replace()` to redirect to the Supabase edge function. Google sees blank HTML, not XML.

## Solution
Point `robots.txt` directly to the Supabase edge function URL instead of the client-side route. This gives Google a direct URL that returns raw XML with no JavaScript required.

### Changes

**1. Update `public/robots.txt`**
Change the Sitemap directive from:
```
Sitemap: https://unitedpress.media/sitemap.xml
```
to:
```
Sitemap: https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/generate-sitemap
```

That's it. The edge function already returns proper `Content-Type: application/xml` with valid sitemap XML (confirmed by testing it just now). Google will fetch it directly without needing JavaScript.

The `/sitemap.xml` React route can remain as-is for human visitors who want to view/download the sitemap -- it still redirects to the same edge function and works fine in browsers.

### After deployment
Re-submit the sitemap in Google Search Console using the new URL:
`https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/generate-sitemap`

Or keep the robots.txt pointer and wait for Google to re-crawl it (usually within a few days).

