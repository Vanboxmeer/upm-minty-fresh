import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { useEffect } from "react";
const Blog = () => {
  useEffect(() => {
    const title = "UPM Blog | Web3 and Crypto Marketing Guides";
    const description = "Educational articles on Web3, crypto marketing, KOLs, PR, and growth.";
    document.title = title;

    const ensureTag = (selector: string, el: HTMLElement) => {
      const existing = document.head.querySelector(selector);
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing as Node);
      document.head.appendChild(el);
    };

    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = description;
    ensureTag('meta[name="description"]', metaDesc);

    const linkCanonical = document.createElement("link");
    linkCanonical.rel = "canonical";
    linkCanonical.href = `${window.location.origin}/blog`;
    ensureTag('link[rel="canonical"]', linkCanonical);
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">UPM Blog: Web3 and Crypto Marketing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Educational, human-first articles on Web3 growth, KOLs, PR, and brand building.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`${post.color} h-2`}></div>
                <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${post.color} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date} • {post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;