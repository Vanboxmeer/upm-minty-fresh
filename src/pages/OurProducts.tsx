import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Gamepad2, Users, Sparkles, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";

const products = [
  {
    name: "Watch Crypto",
    tagline: "Cryptoverse Explorer",
    description: "Track crypto news, projects, and market trends with our comprehensive cryptoverse explorer. Stay informed with real-time updates and in-depth analysis of the blockchain ecosystem.",
    url: "https://watchcrypto.info/",
    icon: Globe,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500"
  },
  {
    name: "SpinQuest",
    tagline: "Activity & Adventure Randomizer",
    description: "A web app featuring activity and adventure randomizers with quests designed for brand communities. Includes multiplayer mini games to boost engagement and community interaction.",
    url: "https://spinquest.app/",
    icon: Gamepad2,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  },
  {
    name: "AmplifyHub",
    tagline: "Brand & Creator Collaboration Platform",
    description: "Connect brands with developers and creators for seamless project collaboration. Brands can share project details, track progress, and communicate directly with their team of creators and developers.",
    url: "https://amplifyhub.base44.app",
    icon: Users,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    name: "Re-Writeable AI",
    tagline: "SEO Content Humanizer",
    description: "Transform your content strategy with advanced RAG-powered AI that generates, optimizes, and humanizes content. Create SEO-optimized content that passes as human-written while ensuring authenticity and performance.",
    url: "https://re-writeable-ai.lovable.app/",
    icon: Sparkles,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500"
  },
  {
    name: "Reading Race",
    tagline: "Competitive AI EPUB Reader",
    description: "The world's first competitive AI EPUB reader. Race through books with friends, experience immersive scene changes, and become the fastest reader you can be.",
    url: "https://readingrace.com/",
    icon: BookOpen,
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-500"
  }
];

const OurProducts = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Our Apps | UPM Ecosystem",
      description: "Explore the UPM ecosystem of digital apps including Watch Crypto, SpinQuest, AmplifyHub, Re-Writeable AI, and Reading Race. Tools for crypto, community engagement, collaboration, and content creation.",
      keywords: "UPM apps, Watch Crypto, SpinQuest, AmplifyHub, Re-Writeable AI, Reading Race, crypto tools, community apps, content AI"
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Apps
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover the suite of digital apps and platforms built by UPM to empower creators, brands, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <Card 
                  key={product.name}
                  className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient}`}>
                        <IconComponent className={`w-8 h-8 ${product.iconColor}`} />
                      </div>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      </a>
                    </div>
                    <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {product.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="group/btn w-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
                    >
                      <a 
                        href={product.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Visit {product.name}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need marketing services, community tools, or content solutions — we have the expertise and products to help you succeed.
          </p>
          <Button asChild size="lg" variant="hero">
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default OurProducts;
