import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import NewsletterSignup from "@/components/NewsletterSignup";
import { BlogNavigation } from "@/components/BlogNavigation";
import { BlogPostCTA } from "@/components/BlogPostCTA";
import MobileBottomNav from "@/components/MobileBottomNav";
import { SocialEmbedsRenderer } from "@/components/SocialEmbedsRenderer";
import { useBlogPosts, type BlogPost as BlogPostType, type SocialEmbed } from "@/hooks/useBlogPosts";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import ReadingProgressBar from "@/components/magazine/ReadingProgressBar";
import PostSidebar from "@/components/magazine/PostSidebar";
import ClapButton from "@/components/magazine/ClapButton";
import TemplateRenderer from "@/components/magazine/TemplateRenderer";
import { getCategoryColor } from "@/components/magazine/categoryColors";

const setMeta = (post: BlogPostType) => {
  const baseUrl = 'https://unitedpress.media';
  const imageUrl = post.featured_image?.startsWith('http') ? post.featured_image : `${baseUrl}${post.featured_image || '/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png'}`;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  updateMetaTags({
    title: `${post.title} | UP Megazine`,
    description: post.excerpt || post.content?.substring(0, 160) || '',
    keywords: post.seo_keywords?.join(', ') || "web3 marketing, crypto marketing",
    canonical: postUrl,
    ogTitle: post.title,
    ogDescription: post.excerpt || '',
    ogType: "article",
    ogImage: imageUrl,
    ogUrl: postUrl,
    twitterCard: "summary_large_image",
    twitterTitle: post.title,
    twitterDescription: post.excerpt || '',
    twitterImage: imageUrl,
    structuredData: generateStructuredData('article', post),
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const { getPostBySlug, getRelatedPosts } = useBlogPosts();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setPost(null);

    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData as BlogPostType);
        if (postData) {
          setMeta(postData as BlogPostType);
          const cats = postData.categories || (postData.category ? [postData.category] : []);
          const related = await getRelatedPosts(postData.id, cats, 3);
          setRelatedPosts(related);
        }
      } catch { setPost(null); }
      finally { setLoading(false); }
    };
    fetchPost();
  }, [slug, getPostBySlug, getRelatedPosts]);

  const category = post?.categories?.[0] || post?.category || '';
  const accentColor = getCategoryColor(category);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-64 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        </div>
        <MobileBottomNav />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-16">
            <Card className="p-8 max-w-xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">Article not found</h1>
              <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or was moved.</p>
              <Link to="/blog" className="text-primary underline">Back to UP Megazine</Link>
            </Card>
          </div>
        </div>
        <MobileBottomNav />
      </>
    );
  }

  return (
    <>
      <ReadingProgressBar category={category} />
      <Header />
      <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
        <div className="container mx-auto px-4">
          {/* Header section — title above image */}
          <header className="max-w-3xl mx-auto text-center pt-10 mb-8">
            {category && (
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white mb-4"
                style={{ backgroundColor: accentColor }}
              >
                {category}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.publish_date || post.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.read_time}</span>
            </div>
          </header>

          {/* Featured image below title */}
          {post.featured_image && (
            <div className="max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.featured_image_alt || post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Main content + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 max-w-5xl mx-auto">
            <article>
              <section className="prose prose-invert max-w-[720px] mx-auto mb-12">
                <TemplateRenderer post={post} />
              </section>

              {/* Social Embeds */}
              {(post as any).social_embeds?.length > 0 && (
                <div className="max-w-[720px] mx-auto my-12">
                  <SocialEmbedsRenderer embeds={(post as any).social_embeds as SocialEmbed[]} />
                </div>
              )}

              {/* Clap button — right after article content on all devices */}
              <div className="max-w-[720px] mx-auto my-8 flex justify-center">
                <ClapButton
                  postId={post.id}
                  initialClaps={(post as any).claps || 0}
                  category={category}
                  size="lg"
                />
              </div>

              {/* Mid-article CTA */}
              <div className="max-w-[720px] mx-auto">
                <BlogPostCTA variant="inline" />
              </div>

              {/* End-article CTA */}
              <div className="max-w-[720px] mx-auto">
                <BlogPostCTA variant="end" />
              </div>

              {/* Blog Navigation */}
              <BlogNavigation currentPost={post} />

              {/* Newsletter */}
              <div className="max-w-xl mx-auto">
                <NewsletterSignup variant="blog" />
              </div>
            </article>

            {/* Sidebar - stacks below on mobile */}
            <PostSidebar post={post} relatedPosts={relatedPosts} />
          </div>
        </div>
        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default BlogPost;
