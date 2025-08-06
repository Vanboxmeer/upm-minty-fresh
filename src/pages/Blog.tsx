import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  const blogPosts = [
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
    },
    {
      id: 4,
      title: "NFT Development Agencies",
      description: "Top NFT development agencies and what services they offer for creators and brands.",
      category: "NFT",
      color: "bg-red-500",
      date: "March 8, 2024"
    },
    {
      id: 5,
      title: "Hire Crypto KOLs",
      description: "How to find and hire crypto KOLs for your blockchain marketing campaigns.",
      category: "CRYPTO",
      color: "bg-cyan-500",
      date: "March 5, 2024"
    },
    {
      id: 6,
      title: "Business Media Placements",
      description: "Securing strategic media placements for business growth and brand awareness.",
      category: "MEDIA",
      color: "bg-purple-600",
      date: "March 3, 2024"
    },
    {
      id: 7,
      title: "Crypto Token Marketing",
      description: "Complete guide to marketing crypto tokens and building community engagement.",
      category: "CRYPTO",
      color: "bg-indigo-600",
      date: "March 1, 2024"
    },
    {
      id: 8,
      title: "ICO Marketing Guide",
      description: "Essential ICO marketing strategies and compliance considerations for token sales.",
      category: "ICO",
      color: "bg-gray-600",
      date: "February 28, 2024"
    },
    {
      id: 9,
      title: "What is IDO?",
      description: "Understanding Initial DEX Offerings and their role in DeFi ecosystem.",
      category: "DEFI",
      color: "bg-violet-600",
      date: "February 25, 2024"
    },
    {
      id: 10,
      title: "Influencer Promotion",
      description: "Best practices for influencer promotion campaigns and ROI measurement.",
      category: "INFLUENCER",
      color: "bg-pink-600",
      date: "February 22, 2024"
    },
    {
      id: 11,
      title: "Web3 Branding Agencies",
      description: "Top Web3 branding agencies and how they help projects build strong identities.",
      category: "WEB3",
      color: "bg-teal-600",
      date: "February 20, 2024"
    },
    {
      id: 12,
      title: "Initial Game Offering",
      description: "Understanding IGOs and how gaming projects can leverage token sales.",
      category: "GAMING",
      color: "bg-rose-500",
      date: "February 18, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">UPM Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and strategies in digital marketing, crypto, and Web3.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;