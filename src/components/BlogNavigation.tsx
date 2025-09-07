import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/hooks/useBlogPosts";

interface BlogNavigationProps {
  currentPost: BlogPost;
}

export const BlogNavigation = ({ currentPost }: BlogNavigationProps) => {
  const [nextPost, setNextPost] = useState<{ title: string; slug: string } | null>(null);
  const [previousPost, setPreviousPost] = useState<{ title: string; slug: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdjacentPosts = async () => {
      try {
        // Get all published posts sorted by publish date
        const { data: posts } = await supabase
          .from('blog_posts')
          .select('id, title, slug, publish_date, created_at')
          .eq('status', 'published')
          .order('publish_date', { ascending: false, nullsFirst: false })
          .order('created_at', { ascending: false });

        if (!posts) return;

        // Filter out future posts
        const now = new Date();
        const validPosts = posts.filter(post => {
          if (!post.publish_date) return true;
          return new Date(post.publish_date) <= now;
        });

        // Find current post index
        const currentIndex = validPosts.findIndex(post => post.id === currentPost.id);
        
        if (currentIndex > -1) {
          // Previous post is newer (lower index)
          if (currentIndex > 0) {
            setPreviousPost({
              title: validPosts[currentIndex - 1].title,
              slug: validPosts[currentIndex - 1].slug
            });
          }
          
          // Next post is older (higher index)  
          if (currentIndex < validPosts.length - 1) {
            setNextPost({
              title: validPosts[currentIndex + 1].title,
              slug: validPosts[currentIndex + 1].slug
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch adjacent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdjacentPosts();
  }, [currentPost.id]);

  if (loading) {
    return (
      <nav className="max-w-3xl mx-auto py-12">
        <div className="flex justify-between items-center gap-4">
          <div className="animate-pulse h-10 bg-muted rounded w-32"></div>
          <div className="animate-pulse h-10 bg-muted rounded w-32"></div>
        </div>
      </nav>
    );
  }

  if (!nextPost && !previousPost) {
    return null;
  }

  return (
    <nav className="max-w-3xl mx-auto py-12">
      <div className="flex justify-between items-center gap-4">
        {previousPost ? (
          <Button asChild variant="outline" className="flex items-center gap-2 max-w-[45%]">
            <Link to={`/blog/${previousPost.slug}`}>
              <ChevronLeft className="w-4 h-4" />
              <span className="truncate">{previousPost.title}</span>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
        
        {nextPost ? (
          <Button asChild variant="outline" className="flex items-center gap-2 max-w-[45%]">
            <Link to={`/blog/${nextPost.slug}`}>
              <span className="truncate">{nextPost.title}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};