import DOMPurify from 'dompurify';
import type { BlogPost } from '@/hooks/useBlogPosts';
import { getCategoryColor } from '../categoryColors';

interface Props { post: BlogPost; }

const TrendingTemplate = ({ post }: Props) => {
  const accentColor = getCategoryColor('Trending');
  const sanitized = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
  });

  return (
    <div className="space-y-8">
      {/* LIVE TREND badge */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white animate-pulse"
          style={{ backgroundColor: accentColor }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          LIVE TREND
        </span>
      </div>

      {/* Content */}
      <div
        className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />

      {/* Key Takeaways box */}
      <div className="rounded-xl p-6 border-l-4" style={{ borderColor: accentColor, backgroundColor: accentColor + '10' }}>
        <h3 className="font-bold text-lg mb-3" style={{ color: accentColor }}>🔑 Key Takeaways</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• This trend is shaping the next wave of innovation</li>
          <li>• Early movers stand to gain significant advantage</li>
          <li>• Watch for market shifts in the coming weeks</li>
        </ul>
      </div>
    </div>
  );
};

export default TrendingTemplate;
