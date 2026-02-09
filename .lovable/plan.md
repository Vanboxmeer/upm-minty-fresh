

# Fix About Page: Form, App Links, Icons + Update AmplifyHub Icon and Re-Writeable AI Link

## Issues and Fixes

### 1. Contact Form Not Displaying on About Page

The Footer component (which contains the contact form) is placed outside the `<main className="relative z-10">` tag on the About page. The starfield uses `fixed inset-0 z-0`, and since the Footer lacks a z-index, it renders behind the starfield -- making the form invisible (only Radix dropdown portals poke through since they render outside the DOM tree).

**Fix:** Move `<Footer />` inside the `<main>` wrapper so it inherits the `relative z-10` stacking context.

### 2. Update AmplifyHub Icon

Replace the current AmplifyHub icon asset with the newly uploaded logo (the blue/purple triangle "A" icon).

**Files:** Copy the uploaded image to `src/assets/apps/amplifyhub.png` (overwrite existing).

### 3. Update Re-Writeable AI Link

Change the URL from `https://re-writeable-ai.lovable.app/` to `https://rewriteable.lovable.app/` in:
- `src/pages/OurProducts.tsx` (product card)
- `src/components/Footer.tsx` (footer apps list)

The About page already has the correct URL for this one.

### 4. Fix App Links on About Page

The About page uses incorrect `.lovable.app` placeholder domains. Update to match the production URLs used on the Our Products page and Footer:

| App | Current (Wrong) | Correct |
|-----|-----------------|---------|
| Watch Crypto | watchcrypto.lovable.app | watchcrypto.info/ |
| SpinQuest | spinquest.lovable.app | spinquest.app/ |
| AmplifyHub | amplifyhub.lovable.app | amplifyhub.base44.app |
| Reading Race | readingrace.lovable.app | readingrace.com/ |

Everything Nightlife and Vaporsmooth are already correct.

### 5. Fix SpinQuest and Everything Nightlife Icon Sizing on About Page

These two icons are wider/non-square logos that get cropped by the current `object-cover` class. The fix:
- Change `object-cover` to `object-contain` on all app icons in the About page grid
- Add a small padding inside the icon container so logos have breathing room and don't get cut off at the edges

---

## Technical Details

### Files Modified

**`src/pages/About.tsx`**
- Move `<Footer />` inside `<main className="relative z-10">` so the form renders above the starfield
- Update the `apps` array URLs to use correct production domains
- Change the icon `<img>` class from `object-cover` to `object-contain` and add `p-1` padding to the icon container

**`src/pages/OurProducts.tsx`**
- Update Re-Writeable AI URL from `https://re-writeable-ai.lovable.app/` to `https://rewriteable.lovable.app/`

**`src/components/Footer.tsx`**
- Update Re-Writeable AI link from `https://re-writeable-ai.lovable.app/` to `https://rewriteable.lovable.app/`

**`src/assets/apps/amplifyhub.png`**
- Replaced with the new uploaded AmplifyHub logo asset

