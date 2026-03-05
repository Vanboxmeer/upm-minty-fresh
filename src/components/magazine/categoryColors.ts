export const CATEGORY_COLORS: Record<string, string> = {
  // Original
  'Trending': '#a855f7',
  'Trending News': '#a855f7',
  'Underdogs': '#84cc16',
  'Spotlight': '#eab308',
  'Top Lists': '#06b6d4',
  'Press Releases': '#94a3b8',
  // Real DB categories
  'Web3': '#8b5cf6',
  'Crypto': '#f59e0b',
  'Blockchain': '#3b82f6',
  'AI': '#10b981',
  'AI Agents': '#10b981',
  'AI News': '#10b981',
  'Marketing': '#ec4899',
  'DeFi': '#6366f1',
  'GameFi': '#f97316',
  'NFT': '#14b8a6',
  'VR': '#8b5cf6',
  'Metaverse': '#7c3aed',
  'Technology': '#0ea5e9',
};

const DEFAULT_COLOR = '#06b6d4';

export function getCategoryColor(category?: string | null): string {
  if (!category) return DEFAULT_COLOR;
  return CATEGORY_COLORS[category] || DEFAULT_COLOR;
}

export function getCategoryFromPostType(postType?: string | null): string | null {
  const map: Record<string, string> = {
    trending: 'Trending',
    underdog: 'Underdogs',
    spotlight: 'Spotlight',
    list: 'Top Lists',
    press: 'Press Releases',
  };
  return postType ? map[postType] || null : null;
}
