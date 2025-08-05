import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import servicesIcon from "@/assets/services-icon.jpg";
import { CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Press Release Distribution",
      description: "Push your announcement to the most-read crypto publications, automatically including product launches, memes, updates, we ensure your message appears in front of the right eyes.",
      features: [
        "Reach 1M audience of viewers",
        "Access to top-right publications",
        "Optional writing support - $199 per press release"
      ]
    },
    {
      title: "Scalable ROI-Positive Content Promotion", 
      description: "Promote your project with native ad placements that drive out engagement, not just impressions. Pay only for performance, and target your ideal users with advanced, auto-optimizing budgeting.",
      features: [
        "Performance-based pricing",
        "Advanced targeting options", 
        "Auto-optimizing campaigns"
      ]
    },
    {
      title: "Goal-Based Digital Marketing",
      description: "Comprehensive digital marketing services tailored to achieve your specific business objectives through data-driven strategies and proven methodologies.",
      features: [
        "Custom strategy development",
        "Multi-channel campaigns",
        "Performance tracking & optimization"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Distribute Press Releases That{" "}
              <span className="text-primary">Get Read</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Push your announcement to the most-read crypto publications, 
              automatically including product launches, memes, updates, we 
              ensure your message appears in front of the right eyes.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Reach to audience of 1 million</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Access to top-right publications</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Optional writing support - Live write per journalists</span>
              </div>
            </div>
            
            <Button variant="cta" size="lg">
              Launch a PR Campaign
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src={servicesIcon} 
              alt="Digital Marketing Services" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;