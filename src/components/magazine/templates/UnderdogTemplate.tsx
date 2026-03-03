import DOMPurify from 'dompurify';
import type { BlogPost } from '@/hooks/useBlogPosts';
import { getCategoryColor } from '../categoryColors';

interface Props { post: BlogPost; }

const UnderdogTemplate = ({ post }: Props) => {
  const accentColor = getCategoryColor('Underdogs');
  const sanitized = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
  });

  return (
    <div className="space-y-8">
      {/* Hidden Gem ribbon */}
      <div className="relative">
        <span
          className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-r-full -ml-4"
          style={{ backgroundColor: accentColor, transform: 'skewX(-5deg)' }}
        >
          💎 Hidden Gem
        </span>
      </div>

      {/* Content */}
      <div
        className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />

      {/* Pull quote */}
      <blockquote
        className="border-l-4 pl-6 py-4 my-8 text-xl italic text-foreground/80"
        style={{ borderColor: accentColor }}
      >
        "Every giant was once an underdog. The ones who make it are those who refuse to stop building."
      </blockquote>
    </div>
  );
};

export default UnderdogTemplate;
