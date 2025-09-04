import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBlogPosts, type BlogPost } from "@/hooks/useBlogPosts";
import { CategoryBreadcrumbs } from "@/components/CategoryBreadcrumbs";

interface RelatedPostsProps {
  currentPost: BlogPost;
}

export const RelatedPosts = ({ currentPost }: RelatedPostsProps) => {
  const { getRelatedPosts } = useBlogPosts();
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const categories = currentPost.categories || (currentPost.category ? [currentPost.category] : []);
        const related = await getRelatedPosts(currentPost.id, categories, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentPost.id, currentPost.categories, currentPost.category, getRelatedPosts]);

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