import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
const Pricing = () => {
  const plans = [{
    name: "Growth",
    price: "$5,000",
    period: "per package",
    description: "Perfect for emerging projects looking to establish market presence",
    features: ["2-3 KOL Collaborations", "Press Release Distribution", "Basic Media Outreach", "Social Media Amplification", "Campaign Analytics"],
    cta: "Get Started",
    popular: false
  }, {
    name: "Scale",
    price: "$25,000",
    period: "per package",
    description: "Comprehensive marketing for projects ready to scale significantly",
    features: ["5-8 Premium KOL Partnerships", "Multi-tier Press Release Campaign", "Executive Interview Placements", "Community Event Hosting", "Dedicated Account Manager", "Advanced Analytics & Reporting", "Custom Content Creation"],
    cta: "Get Started",
    popular: true
  }, {
    name: "Dominate",
    price: "$100,000",
    period: "per package",
    description: "Maximum exposure package for industry-leading projects",
    features: ["15+ Top-Tier KOL Collaborations", "Major Publication Features", "C-Suite Media Tour", "Industry Conference Hosting", "Custom Marketing Strategy", "White-glove Service", "24/7 Priority Support", "Exclusive Media Access"],
    cta: "Contact Sales",
    popular: false
  }];
  return <section id="coverage-packages" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            UPM Coverage Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the perfect plan to accelerate your digital marketing success. All plans include our core distribution network and analytics. If its your first time ordering with UPM please reach out to discuss your coverage requests before placing your order.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all hover:shadow-lg`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <CardDescription className="mt-4">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => <li key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      
                    </li>)}
                </ul>

                <Button variant={plan.popular ? "hero" : "outline"} className="w-full" size="lg">
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Pricing;