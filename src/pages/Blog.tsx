import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { CategoryBreadcrumbs } from "@/components/CategoryBreadcrumbs";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { fetchPublicPosts, displayedPosts, posts, loading, loadingMore, hasMorePosts, loadMore } = useBlogPosts();
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    // SEO optimization for blog page
    updateMetaTags({
      title: "UPM Blog | Web3 and Crypto Marketing Guides",
      description: "Expert insights on Web3 growth, KOL collaborations, PR distribution, and crypto marketing strategies. Educational articles by digital marketing professionals.",
      keywords: "web3 marketing, crypto marketing blog, KOL guides, press release distribution, digital marketing insights, blockchain marketing",
      canonical: "https://unitedpressmedia.com/blog",
      ogTitle: "UPM Blog: Web3 and Crypto Marketing",
      ogDescription: "Expert insights on Web3 growth, KOL collaborations, PR distribution, and crypto marketing strategies.",
      ogType: "website",
      ogImage: "https://unitedpressmedia.com/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png",
      twitterCard: "summary_large_image",
    });
  }, []);

  useEffect(() => {
    fetchPublicPosts(true, categoryFilter || undefined); // Reset pagination on initial load
  }, [categoryFilter, fetchPublicPosts]); // Include categoryFilter and fetchPublicPosts

  // Extract available categories from all posts
  useEffect(() => {
    if (posts.length > 0) {
      const allCategories = new Set<string>();
      posts.forEach(post => {
        const postCategories = post.categories || (post.category ? [post.category] : []);
        postCategories.forEach(cat => {
          if (cat && cat.trim()) allCategories.add(cat);
        });
      });
      setAvailableCategories(Array.from(allCategories).sort());
    }
  }, [posts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Cosmic Space Hero Section */}
      <div className="relative overflow-hidden">
        {/* Cosmic background - forced dark for space effect */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0f0a1e 0%, #1a0a2e 30%, #0c1929 70%, hsl(var(--background)) 100%)' }}>
          {/* Deep space stars layer */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
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
          
          {/* Nebula glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(0, 255, 255, 0.25) 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)', animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 rounded-full blur-3xl" style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)' }} />
          
          {/* Shooting star accents */}
          <div className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" style={{ top: '15%', left: '70%', transform: 'rotate(-45deg)', animation: 'pulse 3s ease-in-out infinite' }} />
          <div className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40" style={{ top: '40%', left: '20%', transform: 'rotate(-35deg)', animation: 'pulse 4s ease-in-out infinite', animationDelay: '1.5s' }} />
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-20 text-center">
          {/* UPM Logo with pulsing glow */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Pulsing glow layers */}
              <div className="absolute -inset-6 rounded-full blur-2xl animate-pulse" style={{ background: 'rgba(0, 255, 255, 0.3)' }} />
              <div className="absolute -inset-10 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(139, 92, 246, 0.2)', animationDelay: '0.5s' }} />
              <div className="absolute -inset-14 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(236, 72, 153, 0.15)', animationDelay: '1s' }} />
              
              {/* Logo */}
              <img 
                src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
                alt="UPM Logo"
                className="relative h-24 w-auto"
                style={{
                  filter: `
                    drop-shadow(0 0 10px rgba(0, 255, 255, 0.7))
                    drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))
                    drop-shadow(0 0 35px rgba(139, 92, 246, 0.4))
                  `,
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              />
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the Convergence of Web3, AI, VR, and GameFi
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            {categoryFilter ? `Articles in "${categoryFilter}"` : 'Latest Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedPosts.map((post) => (
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
                      <CategoryBreadcrumbs 
                        categories={post.categories || (post.category ? [post.category] : [])} 
                        size="sm"
                        maxDisplay={1}
                        linkTo={(category) => `/blog?category=${encodeURIComponent(category)}`}
                      />
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

          {hasMorePosts && (
            <div className="text-center">
              <Button 
                onClick={loadMore}
                disabled={loadingMore}
                variant="outline"
                size="lg"
                className="min-w-32"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}

          {/* Category Filter Section */}
          {(categoryFilter || availableCategories.length > 0) && (
            <div className="max-w-4xl mx-auto mt-16 p-6 bg-muted/30 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {categoryFilter ? 'Browse Other Categories' : 'Browse by Category'}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {availableCategories
                  .filter(cat => cat !== categoryFilter) // Hide current category
                  .map(category => (
                    <Link key={category} to={`/blog?category=${encodeURIComponent(category)}`}>
                      <Badge 
                        variant="outline" 
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer px-3 py-1"
                      >
                        {category}
                      </Badge>
                    </Link>
                  ))}
              </div>

              {categoryFilter && (
                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link to="/blog">View All Blog Posts</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;