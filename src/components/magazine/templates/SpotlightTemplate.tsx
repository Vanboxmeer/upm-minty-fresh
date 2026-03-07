import DOMPurify from 'dompurify';
import type { BlogPost } from '@/hooks/useBlogPosts';
import { getCategoryColor } from '../categoryColors';

interface Props { post: BlogPost; }

const SpotlightTemplate = ({ post }: Props) => {
  const accentColor = getCategoryColor('Spotlight');
  const sanitized = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
  });

  return (
    <div className="space-y-8">
      {/* Brand lockup */}
      <div className="flex items-center gap-3">
        <span
          className="inline-block w-1 h-8 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
          Featured Spotlight
        </span>
      </div>

      {/* Full-width content */}
      <div
        className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </div>
  );
};

export default SpotlightTemplate;
