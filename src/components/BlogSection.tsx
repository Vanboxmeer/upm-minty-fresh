import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogCardSkeleton } from "@/components/ui/skeleton";
import AnimatedStarfield from "@/components/AnimatedStarfield";

const BlogSection = () => {
  const { fetchPublicPosts, posts, loading } = useBlogPosts();

  useEffect(() => {
    fetchPublicPosts();
  }, [fetchPublicPosts]);

  const recent = posts.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      {/* Cosmic Space Header with Animated Starfield */}
      <div className="relative overflow-hidden mb-12">
        <AnimatedStarfield />
        
        {/* Bottom fade overlay - forced dark to match cosmic background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(to top, #0c1929, transparent)' }} />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 text-center z-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Latest from Our Blog</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            News, trends, and innovation in Web3, AI, VR, and GameFi.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            // Skeleton loaders while loading
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            recent.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden card-glow-hover">
                <div className="h-2 bg-primary"></div>
                <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={post.featured_image || '/placeholder.svg'} 
                      alt={post.featured_image_alt || post.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </AspectRatio>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Link 
                        to={`/blog?category=${encodeURIComponent(post.category || '')}`}
                        className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium hover:bg-primary/80 transition-colors"
                      >
                        {post.category}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.publish_date || post.created_at).toLocaleDateString()} • {post.read_time}
                      </span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/blog" className="inline-flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;