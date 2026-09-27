import type { SyntheticEvent } from "react";

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * Swap an <img> to the local placeholder when its source fails to load.
 *
 * Blog covers are referenced by URL from the database, so a post can point at a
 * file that was never uploaded (or has since moved). Without this the browser
 * renders a broken-image icon, which looks worse than no image at all.
 *
 * Guarded with a data attribute so a failing placeholder can't loop.
 */
export const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === "true") return;
  img.dataset.fallbackApplied = "true";
  img.src = PLACEHOLDER_IMAGE;
};
