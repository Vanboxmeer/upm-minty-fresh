import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BlogSection = () => {
  const recentPosts = [
    {
      id: 1,
      title: "What is KOL in Crypto",
      description: "Understanding Key Opinion Leaders in the cryptocurrency space and their impact on marketing strategies.",
      category: "CRYPTO",
      color: "bg-emerald-500",
      date: "March 15, 2024"
    },
    {
      id: 2,
      title: "B2B Social Media Agencies",
      description: "How B2B companies can leverage social media agencies to drive growth and engagement.",
      category: "B2B",
      color: "bg-orange-500",
      date: "March 12, 2024"
    },
    {
      id: 3,
      title: "Crypto Marketing Strategies",
      description: "Effective crypto marketing strategies for blockchain projects and token launches.",
      category: "CRYPTO",
      color: "bg-blue-600",
      date: "March 10, 2024"
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest insights, trends, and strategies in digital marketing and Web3.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className={`${post.color} h-2`}></div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`${post.color} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
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