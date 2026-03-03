import DOMPurify from 'dompurify';
import type { BlogPost } from '@/hooks/useBlogPosts';
import { getCategoryColor } from '../categoryColors';
import { Heart } from 'lucide-react';

interface Props { post: BlogPost; }

const ListTemplate = ({ post }: Props) => {
  const accentColor = getCategoryColor('Top Lists');
  const sanitized = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: accentColor }}
        >
          📋 Top List
        </span>
      </div>

      {/* Content rendered as-is (the numbered items come from content) */}
      <div
        className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-li:marker:text-primary"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />

      {/* Vote hint */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border/50 pt-4">
        <Heart className="w-4 h-4" style={{ color: accentColor }} />
        <span>Like this list? Clap to let us know.</span>
      </div>
    </div>
  );
};

export default ListTemplate;
