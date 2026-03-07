

# Fix Blog Light Theme, Spotlight Layout, Branding & Chat Labels

## Issues Identified

1. **Light mode text unreadable**: All templates + BlogPost use `prose-invert` which forces light-colored text — invisible on white backgrounds. Need `dark:prose-invert` instead.
2. **No AI disclaimer**: Need an "AI-assisted content" disclaimer at end of articles.
3. **Homepage BlogSection still says "UP Megazine"**: Title and button text need updating. No starfield banner on homepage section.
4. **MagazineBanner says "UPM News & Insights"**: Should say just "News & Insights".
5. **SpotlightTemplate splits content into 3/5 + 2/5 columns** with duplicate featured image and hardcoded quote — should be full-width like other templates.
6. **Chat widget labels**: "Ask Bolt anything!" → "Ask Bolt" and "DM us on Telegram" → "DM us".

## Changes

### 1. Fix light mode text (5 files)

Replace `prose-invert` with `dark:prose-invert` in:
- `src/pages/BlogPost.tsx` (line 152)
- `src/components/magazine/TemplateRenderer.tsx` (default case)
- `src/components/magazine/templates/TrendingTemplate.tsx`
- `src/components/magazine/templates/UnderdogTemplate.tsx`
- `src/components/magazine/templates/SpotlightTemplate.tsx`

### 2. Add AI disclaimer to BlogPost.tsx

After the ClapButton block (line 171), add a small disclaimer:
```
<p className="text-xs text-muted-foreground text-center italic max-w-[720px] mx-auto mt-4">
  This article may contain AI-assisted content. All information is editorially reviewed.
</p>
```

### 3. Update homepage BlogSection

- Change title from "Latest from UP Megazine" → "News & Insights"
- Change button text from "View UP Megazine" → "View All News"
- Add the UPM logo above the title and the starfield background to match the blog listing page banner style.

### 4. Update MagazineBanner (blog listing page)

- Change h1 from "UPM News & Insights" → "News & Insights"

### 5. Fix SpotlightTemplate — make full-width

Remove the 3/5 + 2/5 grid split, the duplicate featured image, and the hardcoded quote. Render content full-width like Trending/Underdog templates, keeping only the "Featured Spotlight" badge.

### 6. Update chat widget text

- `TankChatWidget.tsx` line 223: "⚡ Ask Bolt anything!" → "⚡ Ask Bolt"
- `TelegramChat.tsx` line 67: "💬 DM us on Telegram" → "💬 DM us"

### 7. SEO title update

- `BlogPost.tsx` line 25: "UP Megazine" → "UPM News"
- `BlogPost.tsx` line 101: "Back to UP Megazine" → "Back to News"

