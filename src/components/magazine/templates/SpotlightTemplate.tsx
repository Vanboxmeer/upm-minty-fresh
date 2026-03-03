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

      {/* Split view on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div
            className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />
        </div>
        <div className="lg:col-span-2 space-y-6">
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              className="w-full rounded-xl object-cover"
            />
          )}
          {/* CEO quote */}
          <div className="p-6 rounded-xl border" style={{ borderColor: accentColor + '40' }}>
            <p className="text-xl italic text-foreground/80 leading-relaxed">
              "Innovation doesn't wait for permission."
            </p>
            <span className="text-sm text-muted-foreground mt-2 block">— Featured Team</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightTemplate;
