import { Link } from 'react-router-dom';
import { getCategoryColor } from './categoryColors';
import type { BlogPost } from '@/hooks/useBlogPosts';

interface MagazinePostCardProps {
  post: BlogPost;
}

const MagazinePostCard = ({ post }: MagazinePostCardProps) => {
  const category = post.categories?.[0] || post.category || '';
  const accentColor = getCategoryColor(category);
  const claps = (post as any).claps || 0;

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 magazine-card-fade-in">
        {/* Image with category tag */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.featured_image || '/placeholder.svg'}
            alt={post.featured_image_alt || post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {category && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt || post.content?.substring(0, 120) + '...'}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>{post.read_time}</span>
            <span className="flex items-center gap-1">
              👏 <span className={claps > 50 ? 'font-bold text-foreground' : ''}>{claps}</span>
              {claps >= 50 && ' 🔥'}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MagazinePostCard;
