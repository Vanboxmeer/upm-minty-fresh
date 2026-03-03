

# UP Megazine Transformation Plan

This is a large transformation touching the blog listing page, single post page, clap system, and 5 post templates. No changes to homepage, header, footer, services, or other pages.

## Scope & Architecture

### Database Changes
- Add `claps` integer column (default 0) to `blog_posts` table
- Add `post_type` text column to `blog_posts` (values: `trending`, `underdog`, `spotlight`, `list`, `press`, or null for default)
- Create migration for both

### New Files to Create

1. **`src/components/magazine/MagazineHero.tsx`** — Full-width featured post hero for listing page (big image, headline, teaser, category badge with accent color, clap count)

2. **`src/components/magazine/MagazinePostCard.tsx`** — Post card for masonry grid (featured image, top-left category color tag, headline, excerpt, read time, clap count with fire emoji for 50+)

3. **`src/components/magazine/CategoryFilterChips.tsx`** — Horizontal chip bar: All, Trending, Underdogs, Spotlight, Top Lists, Press Releases. Each chip uses its category accent color. Clicking reflows grid via URL params

4. **`src/components/magazine/ClapButton.tsx`** — Animated clap interaction:
   - SVG hand icon that fills with category accent color on click
   - Up to 10 claps per user per post (localStorage enforcement)
   - Counter animates upward with CSS particle burst + confetti (using canvas-confetti already installed)
   - Shows "X people clapped this" with fire emoji at 50/100/500+ thresholds
   - Optimistic UI: instant feedback, then Supabase RPC to increment

5. **`src/components/magazine/ReadingProgressBar.tsx`** — Thin bar fixed at top, fills with category accent color as user scrolls article content

6. **`src/components/magazine/PostSidebar.tsx`** — Desktop right sidebar (stacks below on mobile): clap zone, social share buttons, auto-generated table of contents (parses H2/H3 from content), 3 related post mini-cards

7. **`src/components/magazine/TableOfContents.tsx`** — Extracts headings from post HTML content, renders as clickable anchor links with smooth scroll

8. **`src/components/magazine/categoryColors.ts`** — Shared category accent color map:
   - Trending → electric purple `#a855f7`
   - Underdogs → lime green `#84cc16`
   - Spotlight → gold `#eab308`
   - Top Lists → cyan `#06b6d4`
   - Press Releases → silver `#94a3b8`
   - Default → primary cyan

9. **Post Template Components** (all in `src/components/magazine/templates/`):
   - **`TrendingTemplate.tsx`** — "LIVE TREND" pulsing badge, punchy sections, stat cards, "3 key takeaways" boxed pullouts, market snapshot visual
   - **`UnderdogTemplate.tsx`** — "Hidden Gem" angled ribbon, Problem→Breakthrough→Proof→Next structure, large pull-quote cards with avatar
   - **`SpotlightTemplate.tsx`** — Desktop split-view (narrative left, visuals right), brand logo lockup, oversized italic CEO quote, horizontal timeline roadmap cards
   - **`ListTemplate.tsx`** — Vertical numbered cards (mobile swipe carousel), per-item: thumbnail, bold rank+title, description, "Why it stands out" accent one-liner, heart/vote icon (UI only)
   - **`PressReleaseTemplate.tsx`** — Clean header bar "Official Press Release • [Date]" + centered logo, structured content with bold subheads/bullets/quotes, "Download PDF" button (jsPDF generation), "Share to Telegram" with pre-filled text

10. **`src/components/magazine/TemplateRenderer.tsx`** — Detects `post_type` from post metadata and renders the matching template, falling back to the default article layout

### Files to Modify

1. **`src/pages/Blog.tsx`** — Complete rewrite as "UP Megazine" listing page:
   - Replace cosmic starfield hero with `MagazineHero` (latest/featured post)
   - Add `CategoryFilterChips` above grid
   - Replace uniform 3-col grid with masonry-style layout (CSS columns or grid with varying spans)
   - Use `MagazinePostCard` for each post
   - Keep existing "Load More" pagination
   - Dark background by default, clean sans-serif typography
   - SEO meta updated to "UP Megazine"

2. **`src/pages/BlogPost.tsx`** — Major restructure:
   - Add `ReadingProgressBar` at top (category accent color)
   - Full-width hero image (edge-to-edge)
   - Main content in centered ~720px column with generous typography
   - Desktop: content + right sidebar layout (grid: 2/3 + 1/3). Mobile: sidebar stacks below
   - Sidebar contains: `ClapButton`, social share, `TableOfContents`, related posts mini-cards
   - Bottom "Clap if this hit different" CTA with large clap button
   - Route through `TemplateRenderer` for type-specific layouts
   - Keep existing newsletter, lead magnet, blog navigation

3. **`src/hooks/useBlogPosts.ts`** — Add `claps` and `post_type` to `BlogPost` interface. Add `incrementClaps` function (Supabase RPC or direct update)

4. **`src/components/BlogSection.tsx`** — Update homepage blog preview cards to show clap counts and use new category color tags. Update section title to reference "UP Megazine"

5. **`src/index.css`** — Add magazine-specific CSS: masonry grid styles, clap animation keyframes, reading progress bar, category accent color utilities, pull-quote styles, scroll fade-in animations

6. **`src/components/admin/BlogPostEditor.tsx`** — Add `post_type` dropdown field (trending/underdog/spotlight/list/press/default) so admins can assign templates when creating posts

### Category Accent Color System
Colors applied dynamically based on post category:
- Category badge backgrounds on cards and post pages
- Reading progress bar fill color
- Clap button fill color
- Template accent highlights
- Filter chip active states

Mapping logic in shared `categoryColors.ts`, consumed everywhere via a `getCategoryColor(category)` utility.

### Clap System Details
- localStorage key: `up-megazine-claps-{postId}` storing count (0-10)
- On click: increment local count, optimistic UI update, then `supabase.rpc('increment_claps', { post_id, amount: 1 })` 
- Migration includes an `increment_claps` SQL function to atomically increment
- Display: large bold number + "X clapped" text. Fire emoji at 50+. Confetti burst on each clap via `canvas-confetti`

### Responsive Behavior
- Listing: 3-col masonry desktop, 2-col tablet, 1-col mobile
- Post: content+sidebar desktop, stacked mobile
- Filter chips: horizontal scroll on mobile
- Progress bar: always visible on scroll

### Performance
- Scroll fade-in via IntersectionObserver (lightweight, no library)
- Lazy image loading (already in place)
- Skeleton loaders for listing page
- Optimistic clap updates (no waiting for server)

