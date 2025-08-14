import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import NewsletterSignup from "@/components/NewsletterSignup";
import DOMPurify from 'dompurify';
import { useBlogPosts, type BlogPost } from "@/hooks/useBlogPosts";

const setMeta = (title: string, description: string, canonical: string, imageUrl?: string) => {
  document.title = title;

  const ensureTag = (selector: string, el: HTMLElement) => {
    const existing = document.head.querySelector(selector);
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    document.head.appendChild(el);
  };

  const metaDesc = document.createElement("meta");
  metaDesc.name = "description";
  metaDesc.content = description;
  ensureTag('meta[name="description"]', metaDesc);

  const linkCanonical = document.createElement("link");
  linkCanonical.rel = "canonical";
  linkCanonical.href = canonical;
  ensureTag('link[rel="canonical"]', linkCanonical);

  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    author: { '@type': 'Organization', name: 'UPM - Digital Marketing Agency' },
    publisher: { '@type': 'Organization', name: 'UPM' },
    mainEntityOfPage: canonical,
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(jsonLd);
  ensureTag('script[type="application/ld+json"]', script);
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
          setMeta(
            `${postData.title} | UPM Blog`,
            postData.excerpt || postData.content?.substring(0, 160) || '',
            `${window.location.origin}/blog/${postData.slug}`,
            postData.featured_image || undefined
          );
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
            <p className="text-xs inline-flex items-center gap-2 rounded-full px-3 py-1 bg-muted mb-4">
              <span className="font-medium tracking-wide">{post.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{post.read_time}</span>
            </p>
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
                __html: DOMPurify.sanitize(post.content) 
              }} 
            />
          </section>

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