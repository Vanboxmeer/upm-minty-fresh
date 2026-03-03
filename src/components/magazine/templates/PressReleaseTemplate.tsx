import DOMPurify from 'dompurify';
import type { BlogPost } from '@/hooks/useBlogPosts';
import { getCategoryColor } from '../categoryColors';
import { FileDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props { post: BlogPost; }

const PressReleaseTemplate = ({ post }: Props) => {
  const accentColor = getCategoryColor('Press Releases');
  const sanitized = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
  });

  const publishDate = new Date(post.publish_date || post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(`https://unitedpress.media/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`;

  return (
    <div className="space-y-8">
      {/* Official header bar */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-lg text-sm"
        style={{ backgroundColor: accentColor + '15', borderLeft: `4px solid ${accentColor}` }}
      >
        <span className="font-medium text-foreground">
          Official Press Release • {publishDate}
        </span>
        {post.featured_image && (
          <img src={post.featured_image} alt="" className="h-6 w-auto rounded" />
        )}
      </div>

      {/* Content */}
      <div
        className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-2"
        >
          <FileDown className="w-4 h-4" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a href={telegramShareUrl} target="_blank" rel="noopener noreferrer">
            <Send className="w-4 h-4" />
            Share to Telegram
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PressReleaseTemplate;
