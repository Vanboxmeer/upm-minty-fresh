

# Fix Blog Category Filtering + Restore Blog Cover + Dynamic Tags

## Root Cause Analysis

The category filter chips are **hardcoded** to 5 fantasy categories (`Trending`, `Underdogs`, `Spotlight`, `Top Lists`, `Press Releases`) that **don't match actual database categories**. Real categories are things like `Web3` (39 posts), `Crypto` (31), `Blockchain` (22), `AI` (18), `Trending News` (8), etc. The filter does a case-insensitive match but `"Trending" !== "Trending News"`, so clicking "Trending" returns zero results.

## Plan

### 1. Dynamic Category Chips from Database (CategoryFilterChips.tsx)

Replace hardcoded `FILTER_CATEGORIES` with a dynamic query. Fetch the top 10 most-used categories from `blog_posts` (by counting `unnest(categories)`), display them as chips with an "All" chip first, and a "View More" button that expands to show all remaining categories.

- Query actual categories and counts from Supabase on mount
- Show "All" + top 10 categories initially
- "View More" toggles to reveal the rest
- Keep accent colors for known categories (Trending News, Underdogs, etc.), use default cyan for others
- Update `categoryColors.ts` to include `'Trending News'` as a recognized accent color (same purple as Trending)

### 2. Restore Blog Cover Hero (Blog.tsx + new MagazineBanner component)

Replace the `MagazineHero` (which shows the latest post's image as cover) with a branded banner:

- UPM logo centered
- "UP Megazine" title + tagline ("Your source for trending Web3 stories, hidden gems, and innovation in crypto, AI, VR, and GameFi")
- Dark gradient background with subtle purple glow (consistent with site branding)
- The latest/featured post card stays in the grid below, not as a special hero

### 3. Fix Category Color Map (categoryColors.ts)

Add real categories to the color map so chips and badges render proper colors:
- `'Trending News'` → purple (same as Trending)
- `'AI'`, `'AI Agents'`, `'AI News'` → a distinct color
- Keep existing mappings but add fallback logic

### 4. Files to Edit

1. **`src/components/magazine/CategoryFilterChips.tsx`** — Rewrite to fetch categories dynamically from Supabase, show top 10 + "View More"
2. **`src/components/magazine/categoryColors.ts`** — Add `'Trending News'` and other real categories to color map, remove fake `FILTER_CATEGORIES` export
3. **`src/pages/Blog.tsx`** — Replace `MagazineHero` with a branded UPM banner (logo + tagline), show all posts in the grid (no special first-post hero)
4. **`src/components/magazine/MagazineHero.tsx`** — Repurpose as the branded banner component (UPM logo, title, tagline, gradient background)

