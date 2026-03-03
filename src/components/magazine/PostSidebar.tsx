import ClapButton from './ClapButton';
import TableOfContents from './TableOfContents';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/hooks/useBlogPosts';

interface PostSidebarProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const PostSidebar = ({ post, relatedPosts }: PostSidebarProps) => {
  const category = post.categories?.[0] || post.category || '';
  const postUrl = `https://unitedpress.media/blog/${post.slug}`;

  return (
    <aside className="space-y-8 lg:sticky lg:top-20">
      {/* Clap zone */}
      <div className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
        <ClapButton
          postId={post.id}
          initialClaps={(post as any).claps || 0}
          category={category}
          size="lg"
        />
      </div>

      {/* Social share */}
      <div className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Share</h4>
        <SocialShareButtons
          url={postUrl}
          title={post.title}
          description={post.excerpt || ''}
          twitterHandles={(post as any).twitter_handles || []}
          linkedinHandles={(post as any).linkedin_handles || []}
        />
      </div>

      {/* Table of Contents */}
      <div className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
        <TableOfContents content={post.content} />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Related</h4>
          <div className="space-y-3">
            {relatedPosts.map((rp) => (
              <Link key={rp.id} to={`/blog/${rp.slug}`} className="flex gap-3 group">
                {rp.featured_image && (
                  <img
                    src={rp.featured_image}
                    alt={rp.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {rp.title}
                  </p>
                  <span className="text-xs text-muted-foreground">{rp.read_time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default PostSidebar;
