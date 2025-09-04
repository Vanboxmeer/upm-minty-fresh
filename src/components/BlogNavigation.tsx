import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBlogPosts, type BlogPost } from "@/hooks/useBlogPosts";

interface BlogNavigationProps {
  currentPost: BlogPost;
}

interface AdjacentPost {
  id: string;
  title: string;
  slug: string;
}

export const BlogNavigation = ({ currentPost }: BlogNavigationProps) => {
  const { getAdjacentPosts } = useBlogPosts();
  const [nextPost, setNextPost] = useState<AdjacentPost | null>(null);
  const [previousPost, setPreviousPost] = useState<AdjacentPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdjacent = async () => {
      try {
        setLoading(true);
        const { nextPost: next, previousPost: prev } = await getAdjacentPosts(currentPost);
        setNextPost(next);
        setPreviousPost(prev);
      } catch (error) {
        console.error('Failed to fetch adjacent posts:', error);
        setNextPost(null);
        setPreviousPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdjacent();
  }, [currentPost.id, getAdjacentPosts]);

  if (loading) {
    return (
      <nav className="max-w-3xl mx-auto py-12">
        <div className="flex justify-between items-center gap-4">
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>
          <div className="animate-pulse flex items-center gap-2">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="w-8 h-8 bg-muted rounded"></div>
          </div>
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
        {nextPost ? (
          <Button asChild variant="outline" className="flex items-center gap-2 max-w-[45%]">
            <Link to={`/blog/${nextPost.slug}`}>
              <ChevronLeft className="w-4 h-4" />
              <span className="truncate">{nextPost.title}</span>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
        
        {previousPost ? (
          <Button asChild variant="outline" className="flex items-center gap-2 max-w-[45%]">
            <Link to={`/blog/${previousPost.slug}`}>
              <span className="truncate">{previousPost.title}</span>
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