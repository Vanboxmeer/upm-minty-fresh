import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import servicesIcon from "@/assets/crypto-marketing-services.jpg";
import { CheckCircle } from "lucide-react";
const Services = () => {
  const services = [{
    title: "KOL Collaborations",
    description: "Collaborate with influencers and key opinion leaders who have a direct connection with your target audience.",
    features: ["Verified influencer network", "Targeted audience matching", "Campaign performance tracking", "Content creation support"]
  }, {
    title: "Press Release Services",
    description: "Distribute press releases to keep your investors and community up to date with important news and milestone events.",
    features: ["Major publication distribution", "Investor-focused messaging", "Timeline milestone coverage", "Community engagement boost"]
  }, {
    title: "Features, Interviews, Spaces",
    description: "Get featured in top media, have your CEO as a guest on a popular show, or co-host a community event.",
    features: ["Top-tier media placements", "Executive interview opportunities", "Community event hosting", "Thought leadership positioning"]
  }];
  return <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Premium Marketing Services for{" "}
              <span className="text-primary">
Crypto Projects</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              From KOL collaborations to press releases and media features, 
              we provide comprehensive marketing solutions that drive real 
              results for your project.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Verified influencer network access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Major publication distribution</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Executive media placement</span>
              </div>
            </div>
            
            <Button variant="cta" size="lg" onClick={() => {
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
            </Button>
          </div>
          
          <div className="relative">
            <img src={servicesIcon} alt="Digital Marketing Services" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;