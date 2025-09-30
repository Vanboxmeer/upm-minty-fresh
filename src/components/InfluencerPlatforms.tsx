import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Youtube, Twitter, Send, Instagram, Music, Linkedin } from "lucide-react";

const InfluencerPlatforms = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const platforms = [
    {
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      description: "Long-form content creators and reviewers"
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "text-primary",
      description: "Thought leaders and breaking news"
    },
    {
      name: "Telegram",
      icon: Send,
      color: "text-primary",
      description: "Community channels and groups"
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      description: "Visual storytellers and lifestyle content"
    },
    {
      name: "TikTok",
      icon: Music,
      color: "text-black dark:text-white",
      description: "Viral short-form content creators"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "text-primary",
      description: "Professional network and B2B content"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Web2 & Web3 Influencer Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We partner with top-tier influencers across both traditional and crypto spaces, 
            ensuring your message reaches the right audience on every major platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">Web2 Creators</span>
            <span className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">Web3 KOLs</span>
            <span className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">Cross-Platform Reach</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Card 
                key={platform.name}
                className={`p-8 text-center hover:shadow-lg transition-all duration-500 bg-card border-border ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms` 
                }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-muted">
                    <Icon className={`h-8 w-8 ${platform.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground">
                  {platform.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6 py-4 bg-muted rounded-2xl max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">1,500+</span>
              <span className="text-muted-foreground text-sm">Content Creators</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">100M+</span>
              <span className="text-muted-foreground text-sm">Combined Reach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerPlatforms;