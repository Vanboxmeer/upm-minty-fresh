import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Handshake, Gift, ListChecks, ShieldCheck } from "lucide-react";

const CreatorCoverage = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const points = [
    {
      icon: Gift,
      title: "Free and paid, worked together",
      description: "Every shortlist gets asked both ways. When a story is genuinely good, plenty of outlets and creators cover it for nothing — which leaves your budget for the placements that actually need paying for."
    },
    {
      icon: Handshake,
      title: "Rates negotiated on your side",
      description: "We price against what comparable channels have quoted us before, so an inflated number gets spotted for what it is. No markup hidden on top of what we disclose to you."
    },
    {
      icon: ListChecks,
      title: "Every conversation visible",
      description: "Outreach, replies, quotes and next steps sit in your campaign tracker. You can see which placements are moving, which are booked, and which have gone quiet."
    },
    {
      icon: ShieldCheck,
      title: "Free outreach, with a fair limit",
      description: "Free-coverage requests are a bonus on top of the paid work, so Silver includes 15 a month and Gold 50, with extras at $20. Paid-placement outreach is never capped."
    }
  ];

  return (
    <section id="creator-coverage" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Brand Covered
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            News outlets, publications, creators and KOLs, newsletters, podcasts and community
            channels — whoever actually reaches your market. We find the right ones, approach them
            properly, negotiate the rate and track every thread to a published link. Some of it is
            earned and costs nothing. Some of it is paid. Most campaigns are both.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={point.title}
                className={`p-6 text-center hover:shadow-lg transition-all duration-500 bg-card border-border ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const packageSection = document.querySelector('[data-section="package-selector"]');
              if (packageSection) {
                const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
              }
            }}
          >
            See Silver & Gold Membership
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreatorCoverage;
