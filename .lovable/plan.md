

# Fix: Footer Form Visibility on Blog Posts + Form Submission Error

## Two Issues Found

### Issue 1: Footer form hidden on blog posts
Same z-index problem as the About page had. In `BlogPost.tsx`, the `<Footer />` is placed outside `<main className="relative z-10">` but inside the starfield container. The fixed starfield at `z-0` covers the Footer since it has no z-index. This affects all 3 render paths in BlogPost (loading, not-found, and normal view).

**Fix:** Move `<Footer />` inside the `<main>` tag (or give it `relative z-10`) in all 3 render branches of `BlogPost.tsx`.

### Issue 2: Form submission fails with validation error
The edge function logs show the exact error:
```
referrerName: "Expected string, received null"
referrerCode: "Expected string, received null"
```

In `Footer.tsx` line 369-370, the code sends:
```js
referrerName: referrerName || null,
referrerCode: referrerCode || null,
```

But the Zod schema in the edge function uses `.optional()`, which accepts `undefined` but **not** `null`. Sending `null` fails validation.

Also, the message validation fails because "fd" (2 chars) doesn't meet the 10-character minimum -- but that's user error. The `null` issue would cause failures even with valid messages.

**Fix:** In `Footer.tsx`, change `|| null` to `|| undefined` (or just use `|| ""` which is valid for optional strings). Alternatively, update the edge function schema to accept `.nullable()` on those fields.

I'll fix both sides for robustness:
- **Footer.tsx**: Send `undefined` instead of `null` for empty referrer fields
- **Edge function**: Add `.nullable()` to `referrerName` and `referrerCode` as defense-in-depth
- **BlogPost.tsx**: Move Footer inside the z-10 wrapper in all 3 render paths

## Files Modified
- `src/pages/BlogPost.tsx` -- move Footer inside z-10 main in 3 places
- `src/components/Footer.tsx` -- change `|| null` to `|| undefined` on referrerName/referrerCode
- `supabase/functions/send-contact-email/index.ts` -- add `.nullable()` to referrerName and referrerCode in Zod schema

