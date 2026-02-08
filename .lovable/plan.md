
# About Page Overhaul

## Overview
A complete redesign of the About page to match the site's cosmic branding, correct the naming to "About UPM" / "United Press - Media Agency", and expand it into a comprehensive company page featuring services, apps, Vibe Coding, and a live blog/trending feed.

## What Changes

### 1. Starfield Background (Full-Page)
Add the `AnimatedStarfield` component with a `fixed inset-0` positioning (same approach as blog posts) so the cosmic background covers the entire page regardless of scroll depth. The page wrapper gets a forced dark gradient (`#0f172a` to `#1e1b4b`) and all text uses white/light colors for readability.

### 2. Hero Section Update
- Title changes from "About United Press Media" to **"About UPM"**
- Subtitle changes to **"United Press - Media Agency"**
- UPM logo with glow effect (matching the Our Apps page style)
- Tagline: "Your trusted partner in digital marketing excellence"

### 3. Our Mission Section
Keep the existing mission text but update "United Press Media (UPM)" to "United Press - Media Agency (UPM)" and style it for the dark background with semi-transparent card containers.

### 4. What We Do: Core Services
Keep the 3 existing service cards (Press Release Distribution, Tier-1 Media Placements, KOL Collaborations) but add a **4th card for Vibe Coding** (app development services). Each card links to its respective service page:
- Press Release: `/services#press-release`
- Tier-1 Media: `/services#publications`
- KOL Collaborations: `/services#kol-collaborations`
- Vibe Coding: `/vibe-coding`

Cards get a glass-morphism style (`bg-white/5 backdrop-blur border-white/10`) to work on the dark starfield background.

### 5. Our Apps Showcase
A new section displaying the 7 apps (Watch Crypto, SpinQuest, AmplifyHub, Re-Writeable AI, Reading Race, Everything Nightlife, Vaporsmooth) in a compact horizontal scrollable row or mini-grid. Each shows the app icon, name, and links externally. A "View All Apps" button links to `/our-products`.

### 6. Blog/Trending Feed
Embed the existing `BlogSection` component (which already fetches and displays the 3 most recent blog posts with its own cosmic header). This reuses the exact same component from the homepage, keeping it consistent.

### 7. Why Choose UPM + CTA
Keep the existing "Why Choose UPM?" checklist and "Get Started Today" CTA, styled for the dark background.

## Technical Details

### File Modified
- `src/pages/About.tsx` -- complete rewrite of the page

### New Imports
- `AnimatedStarfield` -- for the cosmic background
- `BlogSection` -- for the blog/trending feed
- `Link` from react-router-dom -- for internal navigation
- App icon assets from `src/assets/apps/` -- for the apps showcase
- Additional Lucide icons: `Code2`, `ExternalLink`, `ArrowRight`, `Rocket`
- `updateMetaTags` from seoUtils -- for proper SEO

### Page Structure (top to bottom)
```text
[Header]
[Fixed AnimatedStarfield Background]
  1. Hero: Logo + "About UPM" + "United Press - Media Agency"
  2. Our Mission (text section)
  3. What We Do (4 service cards with links)
  4. Why Choose UPM (checklist)
  5. Our Apps (mini grid with icons + links)
  6. BlogSection component (latest 3 posts)
  7. Get Started CTA
[Footer]
```

### Styling Approach
- Page wrapper: `min-h-screen relative pt-16` with dark gradient inline style
- Starfield container: `fixed inset-0 z-0 pointer-events-none`
- All content: `relative z-10 text-white`
- Cards: glass-morphism using `bg-white/5 backdrop-blur-sm border border-white/10`
- The BlogSection component renders with its own self-contained cosmic header section and normal-background card grid, which will layer naturally on top of the page starfield
- App icons use existing assets from `src/assets/apps/` with the same rounded styling from OurProducts page

### No other files change
The About page is self-contained. The BlogSection component is reused as-is. No routing changes needed since `/about` already exists.
