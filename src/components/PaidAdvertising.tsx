import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Send, Shield, Target, TrendingUp, Users, Zap, Globe } from "lucide-react";

const PaidAdvertising = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const platforms = [
    {
      name: "Telegram Ads",
      icon: Send,
      color: "text-blue-500",
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

  const benefits = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach your exact audience with advanced targeting options"
    },
    {
      icon: TrendingUp,
      title: "Optimized Performance",
      description: "Continuous optimization for maximum ROI and engagement"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Connect with engaged communities in your niche"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
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
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-full bg-muted">
                    <Icon className={`h-8 w-8 ${platform.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      {platform.name}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {platform.description}
                    </p>
                    <ul className="space-y-2">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={benefit.title}
                className={`text-center transition-all duration-500 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${(index + 2) * 100}ms` 
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card rounded-full border border-border">
            <span className="text-2xl font-bold text-primary">95%</span>
            <span className="text-muted-foreground">Campaign Success Rate</span>
            <div className="w-px h-6 bg-border"></div>
            <span className="text-2xl font-bold text-primary">3.2x</span>
            <span className="text-muted-foreground">Average ROI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidAdvertising;