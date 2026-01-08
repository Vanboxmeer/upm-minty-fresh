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
        {/* Cosmic background - forced dark for space effect with theme-aware bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1e] via-[#1a0a2e] to-[#0c1929]">
          {/* Deep space stars layer */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() > 0.85 ? '3px' : Math.random() > 0.5 ? '2px' : '1px',
                  height: Math.random() > 0.85 ? '3px' : Math.random() > 0.5 ? '2px' : '1px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: Math.random() > 0.7 ? '#00ffff' : Math.random() > 0.5 ? '#a855f7' : '#ffffff',
                  opacity: 0.4 + Math.random() * 0.6,
                  boxShadow: Math.random() > 0.8 ? '0 0 6px 2px rgba(0, 255, 255, 0.5)' : 'none',
                  animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
          
          {/* Nebula glow effects - more vibrant */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)', animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(236, 72, 153, 0.25) 0%, transparent 70%)' }} />
          
          {/* Shooting star effect */}
          <div className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse" style={{ top: '20%', left: '60%', transform: 'rotate(-45deg)' }} />
        </div>
        
        {/* Bottom fade overlay - forced dark to match cosmic background */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #0c1929, transparent)' }} />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-16 text-center">
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