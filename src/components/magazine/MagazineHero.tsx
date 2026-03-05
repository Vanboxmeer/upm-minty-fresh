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
    <Link to={`/blog/${post.slug}`} className="block group">
      <div className="relative w-full min-h-[60vh] overflow-hidden rounded-2xl">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={post.featured_image || '/placeholder.svg'}
            alt={post.featured_image_alt || post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-[60vh] p-6 md:p-12">
          <div className="max-w-3xl space-y-4">
            {/* Category badge */}
            {category && (
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                style={{ backgroundColor: accentColor }}
              >
                {category}
              </span>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base md:text-lg text-gray-300 line-clamp-2 max-w-2xl">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{new Date(post.publish_date || post.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.read_time}</span>
              {claps > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    👏 {claps}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MagazineHero;
