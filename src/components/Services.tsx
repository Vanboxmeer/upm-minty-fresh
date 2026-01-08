import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedServicesHero from "@/components/AnimatedServicesHero";
import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const Services = () => {
  const services = [{
    title: "KOL Collaborations",
    description: "Collaborate with influencers and key opinion leaders who have a direct connection with your target audience.",
    features: ["Verified influencer network", "Targeted audience matching", "Campaign performance tracking", "Content creation support"]
  }, {
    title: "Press Release Services",
    description: "Distribute press releases to keep your investors and community up to date with important news and milestone events.",
    features: ["Major publication distribution", "Investor-focused messaging", "Niche specific PR bundles (DeFi, NFT, AI, Tech)", "Fast turn around"]
  }, {
    title: "Features, Interviews, Spaces",
    description: "Get featured in top media, have your CEO as a guest on a popular show, or co-host a community event.",
    features: ["Top-tier media placements", "Executive interview opportunities", "Community event hosting", "Thought leadership positioning"]
  }];

  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

  return <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={heroRef} className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`transition-all duration-700 ${heroVisible ? 'animate-fade-in' : 'opacity-0 translate-x-[-50px]'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Growth Services for Brands in{" "}
              <span className="text-primary">
AI, GameFi, DeFi, and Web3</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              From KOL collaborations to press releases and media features, 
              we provide comprehensive marketing solutions that drive real 
              results for your project.
            </p>
            
            <Button variant="retro" size="lg" className="group relative overflow-hidden cta-pulse cta-shimmer cta-glow-hover" onClick={() => {
              const packageSection = document.querySelector('[data-section="package-selector"]');
              if (packageSection) {
                const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}>
              Get Started Today
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
            </Button>
          </div>
          
          <div 
            className={`relative transition-all duration-700 delay-300 rounded-lg overflow-hidden ${heroVisible ? 'animate-fade-in' : 'opacity-0 translate-x-[50px]'}`}
            style={{ background: '#0f172a' }}
          >
            <AnimatedServicesHero />
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <Card 
              key={index} 
              className={`group border-border card-hover card-glow-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5 ${
                cardsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2 group/item">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-sm group-hover/item:text-primary transition-colors duration-200">{feature}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;