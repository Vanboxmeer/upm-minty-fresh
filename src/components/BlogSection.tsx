import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogCardSkeleton } from "@/components/ui/skeleton";
import { getCategoryColor } from "@/components/magazine/categoryColors";
import AnimatedStarfield from "@/components/AnimatedStarfield";

const BlogSection = () => {
  const { fetchPublicPosts, displayedPosts, loading } = useBlogPosts();

  useEffect(() => {
    fetchPublicPosts();
  }, [fetchPublicPosts]);

  const recent = displayedPosts.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Banner matching blog listing page */}
        <div className="relative rounded-2xl overflow-hidden border border-border/50 mb-12" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <AnimatedStarfield />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
          <div className="relative flex flex-col items-center justify-center text-center py-14 md:py-20 px-6 space-y-5">
            <img
              src="/lovable-uploads/upm-logo.png"
              alt="UPM Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain header-logo-pulse"
            />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              News & Insights
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
              Where tech, AI, crypto, and gaming converge — the latest stories, analysis, and innovation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            recent.map((post) => {
              const category = post.categories?.[0] || post.category || '';
              const accentColor = getCategoryColor(category);
              const claps = (post as any).claps || 0;

              return (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden card-glow-hover">
                  <div className="h-1.5" style={{ backgroundColor: accentColor }} />
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
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          {category || 'General'}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(post.publish_date || post.created_at).toLocaleDateString()}</span>
                          {claps > 0 && <span>👏 {claps}</span>}
                        </div>
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
              );
            })
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/blog" className="inline-flex items-center gap-2">
              View All News
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
