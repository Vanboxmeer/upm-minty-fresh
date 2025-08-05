import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const Membership = () => {
  const membershipPlans = [
    {
      name: "On Demand",
      subtitle: "(non member)",
      price: "Free",
      description: "Perfect for testing our services before committing to membership",
      features: [
        "Discovery media deck",
        "Campaign builder form", 
        "Quote builder and shortlisting assistance",
        "Order facilitation"
      ],
      excludedFeatures: [
        "KPI tracking",
        "Dedicated account manager and campaign advisor",
        "Managed Brave Ads and Telegram Ads",
        "Press negotiations",
        "Membership pricing"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Gold Membership Plan",
      subtitle: "1%",
      price: "$250 USD",
      period: "per month minimum",
      description: "Designed for large and highly active marketing campaigns requiring administrative work",
      features: [
        "Members media deck",
        "Campaign builder",
        "Order facilitation", 
        "Quote builder and shortlist assistance",
        "KPI tracking",
        "Dedicated account manager and campaign advisor",
        "Managed Brave Ads and Telegram Ads",
        "KOL communications",
        "Press negotiations",
        "Gold members pricing - service fees reduced to just 1%"
      ],
      excludedFeatures: [],
      cta: "Start Gold Plan",
      popular: true
    },
    {
      name: "Silver Membership Plan",
      subtitle: "3.45%",
      price: "$995 USD",
      period: "per month minimum",
      description: "Designed for medium sized campaigns with reduced service fees",
      features: [
        "Members media deck",
        "Campaign builder",
        "Order facilitation",
        "Quote builder and shortlist assistance", 
        "KPI tracking",
        "Dedicated account manager and campaign advisor",
        "Managed Brave Ads and Telegram Ads",
        "KOL communications",
        "Press negotiations",
        "Silver members pricing - service fees reduced to just 3.45%"
      ],
      excludedFeatures: [],
      cta: "Start Silver Plan",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            UPM Membership Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your membership level to determine service fees and access to premium features. 
            Membership plans affect the percentage fees on your coverage packages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>}
                </div>
                <CardDescription className="mt-4">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-8">
                  <h4 className="font-semibold mb-3 text-green-600">Included:</h4>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.excludedFeatures.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-3 text-red-600">Not Included:</h4>
                      <ul className="space-y-2 mb-6">
                        {plan.excludedFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Please let us know at any time if you would like to upgrade to one of our membership plans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Membership;