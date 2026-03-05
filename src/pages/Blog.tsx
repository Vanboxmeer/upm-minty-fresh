import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { updateMetaTags } from "@/utils/seoUtils";
import { Loader2 } from "lucide-react";
import MagazineBanner from "@/components/magazine/MagazineBanner";
import MagazinePostCard from "@/components/magazine/MagazinePostCard";
import CategoryFilterChips from "@/components/magazine/CategoryFilterChips";

const Blog = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { fetchPublicPosts, displayedPosts, loading, loadingMore, hasMorePosts, loadMore } = useBlogPosts();

  useEffect(() => {
    updateMetaTags({
      title: "UP Megazine | Web3 & Crypto Digital Magazine",
      description: "UP Megazine — your source for trending Web3 stories, hidden gems, spotlights, top lists, and press releases in crypto, AI, VR, and GameFi.",
      keywords: "web3 magazine, crypto news, KOL guides, press release, digital marketing, blockchain",
      canonical: "https://unitedpressmedia.com/blog",
      ogTitle: "UP Megazine: Web3 & Crypto Digital Magazine",
      ogDescription: "Trending stories, hidden gems, spotlights, and top lists in crypto and Web3.",
      ogType: "website",
      ogImage: "https://unitedpressmedia.com/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png",
      twitterCard: "summary_large_image",
    });
  }, []);

  useEffect(() => {
    fetchPublicPosts(true, categoryFilter || undefined);
  }, [categoryFilter, fetchPublicPosts]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Branded Banner */}
          <MagazineBanner />

          {/* Category Filter Chips */}
          <CategoryFilterChips />

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl bg-muted/30 aspect-[4/5]" />
              ))}
            </div>
          )}

          {/* Masonry grid — all posts in grid, no special hero */}
          {!loading && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {displayedPosts.map((post) => (
                <div key={post.id} className="break-inside-avoid">
                  <MagazinePostCard post={post} />
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMorePosts && (
            <div className="text-center pt-4">
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

          {!loading && displayedPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No articles found.</p>
          )}
        </div>
        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default Blog;
