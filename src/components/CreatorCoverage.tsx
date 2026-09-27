import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Handshake, Gift, ListChecks, ShieldCheck } from "lucide-react";

const CreatorCoverage = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const points = [
    {
      icon: Gift,
      title: "Free & Organic Coverage",
      description: "We don't only chase paid slots. Our team reaches out to creators who are a genuine fit for your brand and asks whether they'd cover it for free, at a reduced rate, or as a mutual promo."
    },
    {
      icon: Handshake,
      title: "Paid Collaborations",
      description: "When budget calls for it, we negotiate paid placements directly with creators and publications — quoted rates, no hidden markups on top of what's disclosed to you."
    },
    {
      icon: ListChecks,
      title: "Tracked, Not Guesswork",
      description: "Every outreach, reply, and quote is logged so you always know where a conversation stands — from first message to booked coverage."
    },
    {
      icon: ShieldCheck,
      title: "Included On Membership",
      description: "Free & paid creator coverage sourcing comes standard with both Silver and Gold Membership — no separate line item."
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
            Free & Paid Creator Coverage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not every worthwhile placement needs a budget line. Alongside paid influencer
            collaborations, we reach out to creators who might genuinely value your project
            and are open to covering it for free or at low cost — included with your
            membership.
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
