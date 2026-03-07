import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getCategoryColor } from './categoryColors';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryCount {
  name: string;
  count: number;
}

const CHUNK_SIZE = 10;
const MIN_POST_COUNT = 2;

const CategoryFilterChips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('category') || '';
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('categories')
        .eq('status', 'published');

      if (error || !data) return;

      const counts: Record<string, number> = {};
      data.forEach((post) => {
        const cats = post.categories || [];
        cats.forEach((cat: string) => {
          if (cat) counts[cat] = (counts[cat] || 0) + 1;
        });
      });

      const sorted = Object.entries(counts)
        .filter(([, count]) => count >= MIN_POST_COUNT)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      setCategories(sorted);
    };

    fetchCategories();
  }, []);

  const handleClick = (value: string) => {
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  const visibleCategories = categories.slice(0, visibleCount);
  const remaining = categories.length - visibleCount;
  const hasMore = remaining > 0;

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleClick('')}
          className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap"
          style={
            !active
              ? { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderColor: 'hsl(var(--primary))' }
              : { backgroundColor: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }
          }
        >
          All
        </button>

        {visibleCategories.map(({ name, count }) => {
          const isActive = active === name;
          const color = getCategoryColor(name);

          return (
            <button
              key={name}
              onClick={() => handleClick(name)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap"
              style={
                isActive
                  ? { backgroundColor: color, color: '#fff', borderColor: color }
                  : { backgroundColor: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }
              }
            >
              {name} <span className="opacity-60 ml-1 text-xs">({count})</span>
            </button>
          );
        })}

        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => c + CHUNK_SIZE)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap flex items-center gap-1"
            style={{ backgroundColor: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}
          >
            View More ({remaining}) <ChevronDown className="w-3 h-3" />
          </button>
        )}

        {visibleCount > CHUNK_SIZE && (
          <button
            onClick={() => setVisibleCount(CHUNK_SIZE)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap flex items-center gap-1"
            style={{ backgroundColor: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}
          >
            View Less <ChevronUp className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilterChips;
