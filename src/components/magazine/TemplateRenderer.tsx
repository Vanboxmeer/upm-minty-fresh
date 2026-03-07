import type { BlogPost } from '@/hooks/useBlogPosts';
import DOMPurify from 'dompurify';
import TrendingTemplate from './templates/TrendingTemplate';
import UnderdogTemplate from './templates/UnderdogTemplate';
import SpotlightTemplate from './templates/SpotlightTemplate';
import ListTemplate from './templates/ListTemplate';
import PressReleaseTemplate from './templates/PressReleaseTemplate';

/** Add IDs to h2/h3 headings for anchor linking */
export function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (match, level, attrs, text) => {
    const plainText = text.replace(/<[^>]+>/g, '').trim();
    const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

interface Props {
  post: BlogPost;
}

const TemplateRenderer = ({ post }: Props) => {
  const postType = (post as any).post_type as string | null;

  switch (postType) {
    case 'trending':
      return <TrendingTemplate post={post} />;
    case 'underdog':
      return <UnderdogTemplate post={post} />;
    case 'spotlight':
      return <SpotlightTemplate post={post} />;
    case 'list':
      return <ListTemplate post={post} />;
    case 'press':
      return <PressReleaseTemplate post={post} />;
    default: {
      const sanitized = addHeadingIds(DOMPurify.sanitize(post.content, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'id']
      }));
      return (
        <div
          className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      );
    }
  }
};

export default TemplateRenderer;
