import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Send, Shield, Zap, Globe } from "lucide-react";

const PaidAdvertising = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const platforms = [
    {
      name: "Niche Site Placements",
      icon: Globe,
      color: "text-primary",
      description: "Banner, display and native slots on the industry sites your buyers already read",
      features: [
        "Display and banner inventory",
        "Native and sponsored content slots",
        "Sites chosen for audience fit, not raw traffic",
        "Rates checked against what comparable sites charge",
      ],
    },
    {
      name: "Newsletter Sponsorships",
      icon: Send,
      color: "text-primary",
      description: "Paid placement inside newsletters with an audience that opted in to hear about your category",
      features: [
        "Dedicated sends and inline placements",
        "Subscriber numbers and open rates confirmed before booking",
        "Copy written to match the newsletter's voice",
        "Live links reported back to you",
      ],
    },
    {
      name: "Community Sponsorships",
      icon: Shield,
      color: "text-primary",
      description: "Sponsored slots in the groups, servers and channels where your market already gathers",
      features: [
        "Group, channel and server placements",
        "Pinned posts, AMAs and event sponsorships",
        "Negotiated directly with the community owner",
        "No spray-and-pray blasting",
      ],
    },
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
            Paid Placements on Niche Sites
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Bought inventory on the sites, newsletters and communities your buyers already read.
            We find the placement, check the rate against what comparable channels charge, and
            handle the booking.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-4 py-2 bg-primary/10 rounded-full">Placement Sourced For You</span>
            <span className="px-4 py-2 bg-primary/10 rounded-full">Rates Benchmarked</span>
            <span className="px-4 py-2 bg-primary/10 rounded-full">Live Links Reported Back</span>
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
