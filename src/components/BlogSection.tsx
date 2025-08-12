import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
const BlogSection = () => {
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh insights on Web3 and crypto marketing, handpicked by our team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recent.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className={`${post.color} h-2`}></div>
              <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
                <AspectRatio ratio={16 / 9}>
                  <img src={post.image} alt={post.imageAlt} loading="lazy" className="w-full h-full object-cover" />
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