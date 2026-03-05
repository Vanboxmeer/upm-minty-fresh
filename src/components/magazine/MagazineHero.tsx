import { Link } from 'react-router-dom';
import { getCategoryColor } from './categoryColors';
import type { BlogPost } from '@/hooks/useBlogPosts';

interface MagazineHeroProps {
  post: BlogPost;
}

const MagazineHero = ({ post }: MagazineHeroProps) => {
  const category = post.categories?.[0] || post.category || '';
  const accentColor = getCategoryColor(category);
  const claps = (post as any).claps || 0;

  return (
    <Link to={`/blog/${post.slug}`} className="block group space-y-4">
      {/* Image */}
      <div className="w-full overflow-hidden rounded-2xl">
        <img
          src={post.featured_image || '/placeholder.svg'}
          alt={post.featured_image_alt || post.title}
          className="w-full h-auto max-h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content below image */}
      <div className="max-w-3xl space-y-3 px-2">
        {category && (
          <span
            className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
            style={{ backgroundColor: accentColor }}
          >
            {category}
          </span>
        )}

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-base md:text-lg text-muted-foreground line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{new Date(post.publish_date || post.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.read_time}</span>
          {claps > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">👏 {claps}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MagazineHero;
