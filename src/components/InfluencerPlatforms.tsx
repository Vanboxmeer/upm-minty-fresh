import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Youtube, Twitter, Send, Instagram, Music, Linkedin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const useCountUp = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startCounting || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);

  return count;
};

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

        <StatsBar isVisible={isVisible} />
      </div>
    </section>
  );
};

const StatsBar = ({ isVisible }: { isVisible: boolean }) => {
  const creatorsCount = useCountUp(1500, 2000, isVisible);
  const reachCount = useCountUp(100, 2000, isVisible);

  return (
    <div className="text-center mt-16">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-8 py-6 bg-muted/50 border border-border/50 rounded-2xl max-w-lg mx-auto backdrop-blur-sm">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
            {creatorsCount.toLocaleString()}+
          </span>
          <span className="text-muted-foreground text-sm">Content Creators</span>
        </div>
        <div className="hidden sm:block w-px h-12 bg-border/50"></div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
            {reachCount}M+
          </span>
          <span className="text-muted-foreground text-sm">Combined Reach</span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerPlatforms;