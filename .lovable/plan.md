

# Blog Post Cleanup, Category Pagination, Newsletter Fix & Admin Dashboard Upgrade

## 1. Remove "Ready to Scale Your Brand?" CTA from Blog Posts

**File:** `src/pages/BlogPost.tsx`
- Remove the `<BlogPostCTA variant="end" />` block (lines 182-185) — this is the "Ready to Scale Your Brand?" section
- Keep the inline CTA ("Need help with your marketing strategy?") as it's a lighter, less intrusive prompt

## 2. Newsletter Spacing Fix

**File:** `src/pages/BlogPost.tsx`
- Add `mb-16` to the newsletter wrapper div (line 191) to add breathing room before the footer
- The newsletter edge function works — there are 4 subscribers in the database. The reason the admin dashboard shows **0** is an RLS issue (see item 4 below)

## 3. Category Chips — Paginated "View More" with 2+ Post Threshold

**File:** `src/components/magazine/CategoryFilterChips.tsx`
- Filter out categories with `count < 2` before displaying
- Change "View More" to reveal the **next 10** tags each click (not all at once), with the button updating to show remaining count
- Track a `visibleCount` state that increments by 10 on each click, instead of a boolean `expanded` toggle

## 4. Admin Dashboard — Fix Newsletter Count & Add Control Panel Features

### Newsletter Count Fix (RLS issue)
The SELECT policy on `newsletter_subscribers` requires `auth.jwt() ->> 'email'` to match an `admin_users` record. The admin is authenticated via Supabase Auth magic link, so this should work — but the dashboard query runs client-side with the anon key and only works if the admin is actually signed in via Supabase Auth session. 

**Fix:** Create a `get_admin_dashboard_stats` database function (SECURITY DEFINER) that returns all counts server-side, bypassing RLS. The dashboard calls this single function instead of multiple client-side queries. This also reduces egress.

### Admin Dashboard Upgrade

**File:** `src/pages/admin/AdminDashboard.tsx` — Major rewrite to add:

1. **Stats Cards Row** (keep existing, fix newsletter count via DB function):
   - Total Posts (published/drafts)
   - Affiliates (active/pending)
   - Newsletter Subscribers (actual count)
   - Total Claps / Engagement

2. **New: Newsletter Subscribers Panel**
   - Table showing recent subscribers (email, source, date)
   - Export CSV button
   - Unsubscribe/remove action

3. **New: Site Health / Heartbeat Widget**
   - Edge function status checks (ping key functions)
   - Last deploy timestamp
   - Content freshness summary (already exists, keep it)

4. **New: Recent Activity Feed**
   - Latest published posts
   - Latest affiliate applications
   - Latest newsletter signups

5. **Existing sections** (keep): Blog Management, Affiliate Management, Content Freshness, Analytics & Tools links

### Database Migration
Create a `get_admin_dashboard_stats` SECURITY DEFINER function:
```sql
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE result json;
BEGIN
  -- Verify caller is admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  SELECT json_build_object(
    'total_posts', (SELECT count(*) FROM blog_posts),
    'published_posts', (SELECT count(*) FROM blog_posts WHERE status = 'published'),
    'draft_posts', (SELECT count(*) FROM blog_posts WHERE status = 'draft'),
    'total_affiliates', (SELECT count(*) FROM affiliates),
    'pending_affiliates', (SELECT count(*) FROM affiliates WHERE status = 'pending'),
    'approved_affiliates', (SELECT count(*) FROM affiliates WHERE status = 'approved'),
    'newsletter_subscribers', (SELECT count(*) FROM newsletter_subscribers),
    'recent_subscribers', (
      SELECT json_agg(row_to_json(s))
      FROM (SELECT id, email, source, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 10) s
    )
  ) INTO result;
  
  RETURN result;
END;
$$;
```

### Files to Edit
1. `src/pages/BlogPost.tsx` — Remove end CTA, fix newsletter spacing
2. `src/components/magazine/CategoryFilterChips.tsx` — Paginated view more, 2+ post filter
3. `src/pages/admin/AdminDashboard.tsx` — Use new DB function, add subscriber table, activity feed, health widget
4. **DB migration** — `get_admin_dashboard_stats` function

