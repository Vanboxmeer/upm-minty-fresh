import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import NewsletterSignup from "@/components/NewsletterSignup";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { CategoryBreadcrumbs } from "@/components/CategoryBreadcrumbs";
import DOMPurify from 'dompurify';
import { useBlogPosts, type BlogPost } from "@/hooks/useBlogPosts";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";

const setMeta = (post: BlogPost) => {
  const title = post.title;
  const description = post.excerpt || post.content?.substring(0, 160) || '';
  const baseUrl = 'https://unitedpress.media';
  const imageUrl = post.featured_image ? 
    (post.featured_image.startsWith('http') ? post.featured_image : `${baseUrl}${post.featured_image}`) : 
    `${baseUrl}/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png`;
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  updateMetaTags({
    title: `${title} | UPM Blog`,
    description,
    keywords: post.seo_keywords?.join(', ') || "web3 marketing, crypto marketing, digital marketing, KOL, press release",
    canonical: postUrl,
    ogTitle: title,
    ogDescription: description,
    ogType: "article",
    ogImage: imageUrl,
    ogUrl: postUrl,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    structuredData: generateStructuredData('article', post)
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const { getPostBySlug } = useBlogPosts();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData as BlogPost);
        
        if (postData) {
          setMeta(postData as BlogPost);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, getPostBySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2">Article not found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or was moved.</p>
            <Link to="/blog" className="text-primary underline">Back to Blog</Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <article>
          <header className="max-w-3xl mx-auto text-center mb-10">
            <div className="flex flex-col items-center gap-3 mb-4">
              {/* Multiple Categories Display */}
              <CategoryBreadcrumbs 
                categories={post.categories || (post.category ? [post.category] : [])} 
                size="md"
                showAll={true}
                className="justify-center"
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(post.publish_date || post.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.read_time}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            )}
          </header>

          {post.featured_image && (
            <figure className="max-w-4xl mx-auto mb-12 overflow-hidden rounded-lg">
              <img
                src={post.featured_image}
                alt={post.featured_image_alt || post.title}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </figure>
          )}

          <section className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto mb-12">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: (() => {
                  console.log('Raw content:', post.content);
                  const sanitized = DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel']
                  });
                  console.log('Sanitized content:', sanitized);
                  return sanitized;
                })()
              }} 
            />
          </section>

          {/* Social Share Buttons */}
          <div className="max-w-3xl mx-auto mb-12 flex justify-center">
            <SocialShareButtons 
              url={`https://unitedpress.media/blog/${post.slug}`}
              title={post.title}
              description={post.excerpt || post.content?.substring(0, 160) || ''}
              className="border rounded-lg p-4 bg-muted/50"
            />
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup variant="blog" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;