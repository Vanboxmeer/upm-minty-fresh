export const CATEGORY_COLORS: Record<string, string> = {
  'Trending': '#a855f7',
  'Underdogs': '#84cc16',
  'Spotlight': '#eab308',
  'Top Lists': '#06b6d4',
  'Press Releases': '#94a3b8',
};

const DEFAULT_COLOR = '#06b6d4'; // cyan primary

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

export const FILTER_CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Trending', value: 'Trending' },
  { label: 'Underdogs', value: 'Underdogs' },
  { label: 'Spotlight', value: 'Spotlight' },
  { label: 'Top Lists', value: 'Top Lists' },
  { label: 'Press Releases', value: 'Press Releases' },
];
