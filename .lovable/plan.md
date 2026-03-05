

# Fix: Blog Posts Not Opening + Minor Design Polish

## Critical Bug: Infinite Re-render Loop

When clicking any blog post, the page gets stuck on the loading skeleton forever. Root cause:

In `useBlogPosts.ts`, `getRelatedPosts` (line 271) is a regular async function -- not wrapped in `useCallback`. But in `BlogPost.tsx` (line 69), it's listed as a useEffect dependency:

```js
}, [slug, getPostBySlug, getRelatedPosts]);
```

Every render creates a new `getRelatedPosts` reference → triggers useEffect → fetches data → sets state → re-renders → new reference → infinite loop. Console confirms: `getRelatedPosts` logs repeat endlessly.

**Fix**: Wrap `getRelatedPosts` in `useCallback` in `useBlogPosts.ts`, same as `getPostBySlug` already is. This is a one-line structural change that immediately fixes post pages.

Also wrap `getAdjacentPosts` in `useCallback` for the same reason (used similarly in `BlogNavigation`).

## Design: Minimal Polish (Not a Rewrite)

The listing page (/blog) actually looks good -- cinematic hero, category chips, masonry cards all work. The user's complaint is mainly that **posts don't open** (the infinite loop), which makes the whole thing feel broken.

Minimal design touches to enhance "magazine feel" without changing layout:
- Make post card headlines slightly larger/bolder (`text-lg font-bold` → `text-xl font-extrabold`)
- Add subtle text shadow on the MagazineHero headline for better readability over busy images
- Ensure the hero headline text doesn't clash with the background image text (the screenshot shows "Video Game News" watermark bleeding through)

## Files to Edit

1. **`src/hooks/useBlogPosts.ts`** — Wrap `getRelatedPosts` and `getAdjacentPosts` in `useCallback`
2. **`src/components/magazine/MagazineHero.tsx`** — Add text-shadow to headline for readability over busy images
3. **`src/components/magazine/MagazinePostCard.tsx`** — Slightly bolder headlines

