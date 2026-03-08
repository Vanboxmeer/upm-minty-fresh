

# Edge Function Audit -- Minimize Supabase Free Tier Usage

## Current State: 17 Edge Functions Deployed

Every deployed edge function consumes resources even when idle (cold starts, memory). On Supabase free tier, you get **500K edge function invocations/month** and **500MB** function size limit. Let me categorize them by necessity.

## Assessment

### ESSENTIAL -- Keep (7 functions, actively used by core features)
| Function | Used By | Notes |
|---|---|---|
| `think-tank-chat` | Think Tank AI chat + widget | Core feature, streaming AI |
| `send-contact-email` | Footer + Exit Intent contact forms | Core lead gen |
| `subscribe-newsletter` | Newsletter signup (multiple places) | Core lead gen |
| `validate-admin-email` | Admin login flow | Required for admin access |
| `process-affiliate-application` | Affiliate signup page | Core feature |
| `send-affiliate-login-link` | Partner dashboard login | Core feature |
| `send-affiliate-notification` | Admin affiliate management | Core feature |

### REMOVABLE -- No active usage or no configured credentials (6 functions)
| Function | Reason to Remove |
|---|---|
| `auto-post-to-social` | Requires Twitter API keys (TWITTER_CONSUMER_KEY etc.) which are NOT in your secrets. Will always fail silently. |
| `send-webmentions` | Called on post publish but WebMentions are a niche protocol -- very few sites support it. Adds latency to publishing for negligible SEO value. |
| `receive-webmention` | Inbound WebMention receiver -- no evidence anyone has ever sent one to your site. |
| `check-content-freshness` | Uses LOVABLE_API_KEY for AI suggestions. Only triggered manually from admin. Can be replaced with a simple DB query (age calculation) without an edge function. |
| `suggest-social-handles` | Fetches up to 25 external URLs, scrapes HTML for social handles. Heavy network I/O. Also called by `auto-post-to-social` (chain invocation = double cost). Only used in blog editor preview. |
| `publish-scheduled-posts` | Runs on a cron but you have 0 scheduled posts historically. Keep only if you plan to use scheduled publishing. |

### KEEP BUT OPTIMIZE (4 functions)
| Function | Optimization |
|---|---|
| `generate-sitemap` | Fine as-is, lightweight |
| `rss-feed` | Fine as-is, lightweight |
| `suggest-categories-keywords` | Admin-only, AI-powered. Keep but it uses LOVABLE_API_KEY credits per call |
| `suggest-internal-links` | Admin-only, AI-powered. Keep but it uses LOVABLE_API_KEY credits per call |

## Plan

### 1. Delete 5 edge functions (files + config)
Remove these function directories and their `config.toml` entries:
- `supabase/functions/auto-post-to-social/` -- no Twitter credentials configured
- `supabase/functions/send-webmentions/` -- negligible value
- `supabase/functions/receive-webmention/` -- no inbound usage
- `supabase/functions/check-content-freshness/` -- replace with client-side age calculation
- `supabase/functions/suggest-social-handles/` -- heavy scraper, only used by auto-post-to-social and editor preview

### 2. Remove client-side code calling deleted functions
- **`src/hooks/usePostPublishing.ts`**: Remove `send-webmentions` and `auto-post-to-social` invocations (the whole hook becomes empty, so delete it)
- **`src/hooks/useContentFreshness.ts`**: Remove `runFreshnessCheck` (the `check-content-freshness` invocation). Keep the DB query for fetching existing freshness data
- **`src/components/SuggestedSocialPosts.tsx`**: Remove the `suggest-social-handles` invocation. Replace with a simple static template generator (no external API call)
- **`src/components/admin/BlogPostEditor.tsx`**: Remove the social handles suggestion button that calls `suggest-social-handles`
- **`src/pages/admin/AdminDashboard.tsx`**: Keep the health check but only ping `rss-feed` and `generate-sitemap` (remove `subscribe-newsletter` from health check to avoid fake subscription attempts)

### 3. Keep `publish-scheduled-posts` (conditional)
This runs on a cron and is lightweight (just a DB query). If you want scheduled posts in the future, it costs almost nothing when there are 0 posts to publish. I will keep it.

### 4. Update `supabase/config.toml`
Remove entries for the 5 deleted functions.

### Summary of Impact
- **Before**: 17 edge functions deployed
- **After**: 12 edge functions deployed
- **Removed invocation chains**: `auto-post-to-social` calling `suggest-social-handles` (2 invocations per post publish reduced to 0)
- **Removed heavy I/O**: `suggest-social-handles` scraping 25 external URLs per call
- **Removed AI calls**: `check-content-freshness` AI suggestions (LOVABLE_API_KEY credits saved)

