import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Send, Shield, Zap, Globe } from "lucide-react";

const PaidAdvertising = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const platforms = [
    {
      name: "Telegram Ads",
      icon: Send,
      color: "text-primary",
      description: "Reach crypto-native audiences in targeted communities",
      features: [
        "Channel & Group Sponsorships",
        "Targeted Community Reach",
        "Crypto-Native Audience",
        "High Engagement Rates"
      ]
    },
    {
      name: "Brave Ads",
      icon: Shield,
      color: "text-orange-500",
      description: "Privacy-focused advertising with rewarded attention",
      features: [
        "Privacy-First Advertising",
        "Rewarded User Attention",
        "Web3-Savvy Users",
        "Performance Tracking"
      ]
    },
    {
      name: "Native Ads",
      icon: Globe,
      color: "text-green-500",
      description: "Seamless advertising on niche-specific industry sites",
      features: [
        "Banner & Display Ads",
        "Branded Content Links",
        "Niche Site Placements",
        "Native Content Integration"
      ]
    }
  ];


  return (
    <section id="paid-advertising" className="py-20 bg-muted/30">
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
            Managed Paid Advertising
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Strategic paid advertising campaigns on platforms where your audience is most active. 
            We handle everything from setup to optimization for maximum impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-4 py-2 bg-primary/10 rounded-full">Full Campaign Management</span>
            <span className="px-4 py-2 bg-primary/10 rounded-full">Performance Optimization</span>
            <span className="px-4 py-2 bg-primary/10 rounded-full">Detailed Analytics</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Card 
                key={platform.name}
                className={`p-8 hover:shadow-lg transition-all duration-500 bg-card border-border ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms` 
                }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="p-3 sm:p-4 rounded-full bg-muted shrink-0">
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${platform.color}`} />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground">
                      {platform.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                      {platform.description}
                    </p>
                    <ul className="space-y-2">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3">
                          <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PaidAdvertising;