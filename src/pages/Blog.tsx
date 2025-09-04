import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { CategoryBreadcrumbs } from "@/components/CategoryBreadcrumbs";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const { fetchPublicPosts, displayedPosts, loading, loadingMore, hasMorePosts, loadMore } = useBlogPosts();

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
    fetchPublicPosts(true); // Reset pagination on initial load
  }, [fetchPublicPosts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">UPM Blog: Web3 and Crypto Marketing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Web3 growth, KOLs, PR, and brand building.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;