import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const BlogSection = () => {
  const { fetchPublicPosts, posts } = useBlogPosts();

  useEffect(() => {
    fetchPublicPosts();
  }, [fetchPublicPosts]);

  const recent = posts.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            News, trends, and innovation in Web3, AI, VR, and GameFi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recent.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="h-2 bg-primary"></div>
              <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={post.featured_image || '/placeholder.svg'} 
                    alt={post.featured_image_alt || post.title} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
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
          ))}
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