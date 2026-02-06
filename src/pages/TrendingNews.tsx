import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { CategoryBreadcrumbs } from "@/components/CategoryBreadcrumbs";
import { updateMetaTags } from "@/utils/seoUtils";
import { Loader2, TrendingUp, Zap } from "lucide-react";
import AnimatedStarfield from "@/components/AnimatedStarfield";

const TrendingNews = () => {
  const { fetchPublicPosts, displayedPosts, loading } = useBlogPosts();

  useEffect(() => {
    updateMetaTags({
      title: "Trending News | Tech, AI, Crypto & Web3 | UPM",
      description: "Today's top stories in tech, AI, VR, gaming, crypto and web3. Curated daily by the UPM team.",
      keywords: "trending news, tech news, AI news, crypto news, web3 news, gaming news, VR news",
      canonical: "https://unitedpressmedia.com/trending",
      ogTitle: "Trending News | Tech, AI, Crypto & Web3",
      ogDescription: "Today's top stories in tech, AI, VR, gaming, crypto and web3.",
      ogType: "website",
      ogImage: "https://unitedpressmedia.com/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png",
      twitterCard: "summary_large_image",
    });
  }, []);

  useEffect(() => {
    fetchPublicPosts(true, "Trending News");
  }, [fetchPublicPosts]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
        {/* Cosmic Space Hero */}
        <div className="relative overflow-hidden">
          <AnimatedStarfield />
          <div className="absolute bottom-0 left-0 right-0 h-40 z-10" style={{ background: 'linear-gradient(to top, #0c1929, transparent)' }} />
          
          <div className="relative container mx-auto px-4 py-20 text-center z-20">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full blur-2xl animate-pulse" style={{ background: 'rgba(0, 255, 255, 0.3)' }} />
                <div className="absolute -inset-10 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(139, 92, 246, 0.2)', animationDelay: '0.5s' }} />
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 relative">
                  <TrendingUp className="h-12 w-12 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.7))' }} />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
              Trending News
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Today's Top Stories in Tech, AI, Crypto & Web3
              <Zap className="h-5 w-5 text-yellow-400" />
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : displayedPosts.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Trending Stories Yet</h2>
              <p className="text-muted-foreground">Check back soon for the latest trending news.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Latest Trending Stories
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPosts.map((post, index) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                    {/* Ranking indicator for top 3 */}
                    {index < 3 && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1 shadow-lg">
                          #{index + 1}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-primary to-purple-500" />
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
                            maxDisplay={2}
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
            </div>
          )}
        </main>

        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default TrendingNews;
