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
      {/* Cosmic Space Header */}
      <div className="relative overflow-hidden mb-12">
        {/* Cosmic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/40 to-background">
          {/* Stars */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() > 0.8 ? '2px' : '1px',
                  height: Math.random() > 0.8 ? '2px' : '1px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3 + Math.random() * 0.7,
                  animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Nebula glow effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-retro-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-retro-cyan/10 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 text-center">
          {/* UPM Logo with pulsing glow */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Pulsing glow layers */}
              <div className="absolute -inset-4 bg-retro-cyan/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -inset-6 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -inset-8 bg-retro-purple/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Logo */}
              <img 
                src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
                alt="UPM Logo"
                className="relative w-20 h-20 object-contain"
                style={{
                  filter: `
                    drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))
                    drop-shadow(0 0 15px rgba(0, 255, 255, 0.4))
                    drop-shadow(0 0 25px rgba(139, 92, 246, 0.3))
                  `,
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Latest from Our Blog</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            News, trends, and innovation in Web3, AI, VR, and GameFi.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">

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