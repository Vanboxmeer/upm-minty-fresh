import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { CategoryBreadcrumbs } from "@/components/CategoryBreadcrumbs";

interface RelatedPostsProps {
  currentPost: BlogPost;
}

export const RelatedPosts = ({ currentPost }: RelatedPostsProps) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // Get all published posts except current one
        const { data: allPosts } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .neq('id', currentPost.id);

        if (!allPosts) return;

        // Filter out future posts
        const now = new Date();
        const validPosts = allPosts.filter(post => {
          if (!post.publish_date) return true;
          return new Date(post.publish_date) <= now;
        });

        const currentCategories = currentPost.categories || (currentPost.category ? [currentPost.category] : []);
        const currentKeywords = currentPost.seo_keywords || [];
        let related: BlogPost[] = [];

        // 1. Find posts with matching categories
        if (currentCategories.length > 0) {
          const categoryMatches = validPosts.filter(post => {
            const postCategories = post.categories || (post.category ? [post.category] : []);
            return postCategories.some(cat => currentCategories.includes(cat));
          });
          related = categoryMatches.slice(0, 3) as BlogPost[];
        }

        // 2. If we need more, find posts with matching keywords/tags
        if (related.length < 3 && currentKeywords.length > 0) {
          const usedIds = new Set(related.map(p => p.id));
          const keywordMatches = validPosts.filter(post => {
            if (usedIds.has(post.id)) return false;
            const postKeywords = post.seo_keywords || [];
            return postKeywords.some(keyword => currentKeywords.includes(keyword));
          });
          const needed = 3 - related.length;
          related = [...related, ...keywordMatches.slice(0, needed) as BlogPost[]];
        }

        // 3. If we still need more, add recent posts
        if (related.length < 3) {
          const usedIds = new Set(related.map(p => p.id));
          const recentPosts = validPosts
            .filter(post => !usedIds.has(post.id))
            .sort((a, b) => {
              const aDate = new Date(a.publish_date || a.created_at);
              const bDate = new Date(b.publish_date || b.created_at);
              return bDate.getTime() - aDate.getTime();
            });
          const needed = 3 - related.length;
          related = [...related, ...recentPosts.slice(0, needed) as BlogPost[]];
        }

        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost.id]);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-200">
            <Link to={`/blog/${post.slug}`} className="block">
              {post.featured_image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CategoryBreadcrumbs 
                    categories={post.categories || (post.category ? [post.category] : [])} 
                    size="sm"
                    showAll={false}
                    linkTo={(category) => `/blog?category=${encodeURIComponent(category)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.publish_date || post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};