import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";
import AnimatedStarfield from "@/components/AnimatedStarfield";

// Import app icons
import watchCryptoIcon from "@/assets/apps/watch-crypto.png";
import spinquestIcon from "@/assets/apps/spinquest-logo.png";
import readingRaceIcon from "@/assets/apps/reading-race.png";
import everythingNightlifeIcon from "@/assets/apps/everything-nightlife.png";
import vaporsmoothIcon from "@/assets/apps/vaporsmooth.png";
import contentConveyorBeltIcon from "@/assets/apps/content-conveyor-belt.svg";

const products = [
  {
    name: "Content Conveyor Belt",
    tagline: "Social Content Pipeline",
    description: "The content engine behind UPM's social packages. Plan a month of on-brand posts, generate the images and short video to go with them, run everything through approval, and track what has gone live on each platform — all from one belt.",
    url: "https://content-conveyor-belt.vercel.app/",
    icon: contentConveyorBeltIcon,
    gradient: "from-violet-500/20 to-indigo-500/20",
    isWide: false,
    rounded: true
  },
  {
    name: "SpinQuest",
    tagline: "Activity & Adventure Randomizer",
    description: "A web app featuring activity and adventure randomizers with quests designed for brand communities. Includes multiplayer mini games to boost engagement and community interaction.",
    url: "https://spinquest.app/",
    icon: spinquestIcon,
    gradient: "from-purple-500/20 to-pink-500/20",
    isWide: true,
    rounded: false
  },
  {
    name: "Reading Race",
    tagline: "Competitive AI EPUB Reader",
    description: "The world's first competitive AI EPUB reader. Race through books with friends, experience immersive scene changes, and become the fastest reader you can be.",
    url: "https://readingrace.com/",
    icon: readingRaceIcon,
    gradient: "from-rose-500/20 to-red-500/20",
    isWide: false,
    rounded: true
  },
  {
    name: "Watch Crypto",
    tagline: "Cryptoverse Explorer",
    description: "Track crypto news, projects, and market trends with our comprehensive cryptoverse explorer. Stay informed with real-time updates and in-depth analysis of the blockchain ecosystem.",
    url: "https://watchcrypto.info/",
    icon: watchCryptoIcon,
    gradient: "from-emerald-500/20 to-teal-500/20",
    isWide: false,
    rounded: false
  },
  {
    name: "Vaporsmooth",
    tagline: "Cannabis Marketplace",
    description: "Discover the finest vaporizers, CBD/THC products, and accessories. Learn about cannabis, take quizzes, and stay up to date with top trending cannabis news.",
    url: "https://vaporsmooth.com",
    icon: vaporsmoothIcon,
    gradient: "from-green-500/20 to-emerald-500/20",
    isWide: false,
    rounded: true
  },
  {
    name: "Everything Nightlife",
    tagline: "Global Event & Ticket Hub",
    description: "Find the night you'll remember. Everything Nightlife lists club nights, concerts, festivals and shows across major cities worldwide, indexed from official ticketing partners so you buy straight from the seller — no markups.",
    url: "https://everythingnightlife.com",
    icon: everythingNightlifeIcon,
    gradient: "from-fuchsia-500/20 to-violet-500/20",
    isWide: true,
    rounded: false
  }
];

const OurProducts = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Our Apps | UPM Ecosystem",
      description: "A few of the apps built by UPM, including the Content Conveyor Belt, SpinQuest, Reading Race, Watch Crypto, Everything Nightlife, and Vaporsmooth.",
      keywords: "UPM apps, Content Conveyor Belt, social content calendar, SpinQuest, Reading Race, Watch Crypto, Everything Nightlife, Vaporsmooth, crypto tools, community apps, cannabis marketplace"
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      
      {/* Hero Section with Animated Starfield */}
      <section className="relative pt-14 pb-6 overflow-hidden">
        <AnimatedStarfield />
        
        {/* Bottom fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(to top, #0c1929, transparent)' }} />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* UPM Logo with glow */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full blur-2xl animate-pulse" style={{ background: 'rgba(0, 255, 255, 0.3)' }} />
                <div className="absolute -inset-10 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(139, 92, 246, 0.2)', animationDelay: '0.5s' }} />
                <img 
                  src="/lovable-uploads/upm-logo.png" 
                  alt="UPM Logo"
                  className="relative h-20 w-auto"
                  style={{
                    filter: `
                      drop-shadow(0 0 10px rgba(0, 255, 255, 0.7))
                      drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))
                      drop-shadow(0 0 35px rgba(139, 92, 246, 0.4))
                    `,
                    animation: 'pulse 3s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Apps We've{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Built
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Here are a few of the apps we’ve built — a small sample of the platforms UPM has created for creators, brands, and communities.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary">
              <span className="text-sm font-medium">Built with UPM Vibe Coding Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              return (
                <Card 
                  key={product.name}
                  className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center justify-center w-16 h-16">
                        <img 
                          src={product.icon} 
                          alt={`${product.name} icon`}
                          className={`object-contain ${product.isWide ? 'h-12 w-auto max-w-[120px]' : 'h-14 w-14'} ${product.rounded ? 'rounded-xl' : ''}`}
                        />
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

      {/* Vibe Coding CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Turn Your Idea Into an MVP in Weeks
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            All of these apps were built using our Vibe Coding services. Let UPM help you bring your vision to life with rapid MVP development and AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="hero">
              <a href="/vibe-coding">Learn About Vibe Coding</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/contact">Start Your Project</a>
            </Button>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default OurProducts;
