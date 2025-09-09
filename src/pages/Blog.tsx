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
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">UPM: A Web3 and Crypto Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trends, Stories, KOL partnerships, PR, and impactful brand building.
          </p>
        </div>

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