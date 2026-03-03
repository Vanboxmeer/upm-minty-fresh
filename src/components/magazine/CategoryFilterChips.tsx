import { useSearchParams } from 'react-router-dom';
import { FILTER_CATEGORIES, getCategoryColor } from './categoryColors';

const CategoryFilterChips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('category') || '';

  const handleClick = (value: string) => {
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {FILTER_CATEGORIES.map(({ label, value }) => {
        const isActive = active === value;
        const color = value ? getCategoryColor(value) : undefined;

        return (
          <button
            key={label}
            onClick={() => handleClick(value)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap"
            style={
              isActive && color
                ? { backgroundColor: color, color: '#fff', borderColor: color }
                : isActive && !color
                ? { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderColor: 'hsl(var(--primary))' }
                : { backgroundColor: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilterChips;
