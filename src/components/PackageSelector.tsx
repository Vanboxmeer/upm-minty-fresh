import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";
import { useState } from "react";

const PackageSelector = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [billingFrequency, setBillingFrequency] = useState<string>("monthly");

  const coveragePackages = [
    {
      name: "Growth",
      price: "$5,000",
      description: "Perfect for emerging projects looking to establish market presence",
      features: [
        "Press Release Distribution to 150+ crypto & tech outlets",
        "3-5 KOL Collaborations with verified micro-influencers",
        "Feature placement in 2-3 tier 2 crypto publications",
        "Social media amplification across key platforms",
        "Basic analytics and performance reporting",
        "Email campaign to targeted investor lists"
      ],
      popular: false
    },
    {
      name: "Scale",
      price: "$25,000",
      description: "Comprehensive marketing for projects ready to scale significantly",
      features: [
        "Press Release Distribution to 500+ premium outlets worldwide",
        "8-12 Premium KOL Partnerships with top-tier influencers",
        "Executive interviews in 4-6 major crypto publications",
        "Feature articles in Forbes, CoinDesk, and Decrypt",
        "Podcast appearances on leading crypto shows",
        "Community AMA hosting and event coordination",
        "Dedicated account manager and priority support",
        "Advanced analytics with ROI tracking"
      ],
      popular: true
    },
    {
      name: "Dominate",
      price: "$100,000",
      description: "Maximum exposure package for industry-leading projects",
      features: [
        "Press Release Distribution to 1000+ global media outlets",
        "20+ Elite KOL Collaborations with celebrity endorsers",
        "Cover stories in top-tier publications (Wall Street Journal, Bloomberg)",
        "TV interviews on CNBC, Fox Business, and Bloomberg TV",
        "Speaking slots at major industry conferences",
        "Exclusive media tours and investor roadshows",
        "Custom content creation and thought leadership articles",
        "White-glove service with 24/7 priority support",
        "Direct access to tier-1 journalists and editors"
      ],
      popular: false
    }
  ];

  const subscriptionPlans = [
    {
      name: "On Demand",
      subtitle: "(non member)",
      price: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for testing our services before committing to membership",
      features: ["Discovery media deck", "Campaign builder form", "Quote builder and shortlisting assistance", "Order facilitation"],
      excludedFeatures: ["KPI tracking", "Dedicated account manager and campaign advisor", "Managed Brave Ads and Telegram Ads", "Press negotiations", "Membership pricing"],
      popular: false,
      hasBilling: false
    },
    {
      name: "Silver Membership",
      subtitle: "3.45% service fee",
      price: "$250",
      monthlyPrice: 250,
      annualPrice: 2500, // 10 months pricing
      description: "Designed for medium sized campaigns with reduced service fees",
      features: ["Members media deck", "Campaign builder", "Order facilitation", "Quote builder and shortlist assistance", "KPI tracking", "Dedicated account manager and campaign advisor", "Managed Brave Ads and Telegram Ads", "KOL communications", "Press negotiations", "Silver members pricing - service fees reduced to just 3.45%"],
      excludedFeatures: [],
      popular: true,
      hasBilling: true
    },
    {
      name: "Gold Membership",
      subtitle: "1% service fee",
      price: "$995",
      monthlyPrice: 995,
      annualPrice: 9950, // 10 months pricing
      description: "Designed for large and highly active marketing campaigns requiring administrative work",
      features: ["Members media deck", "Campaign builder", "Order facilitation", "Quote builder and shortlist assistance", "KPI tracking", "Dedicated account manager and campaign advisor", "Managed Brave Ads and Telegram Ads", "KOL communications", "Press negotiations", "Gold members pricing - service fees reduced to just 1%"],
      excludedFeatures: [],
      popular: false,
      hasBilling: true
    }
  ];

  const handleProceed = () => {
    if (!selectedPackage || !selectedSubscription) {
      return;
    }

    const packageData = coveragePackages.find(p => p.name === selectedPackage);
    const subscriptionData = subscriptionPlans.find(s => s.name === selectedSubscription);
    
    if (!packageData || !subscriptionData) return;

    // Create comprehensive summary
    let summary = `SELECTED PACKAGE & SUBSCRIPTION:\n\n`;
    summary += `Coverage Package: ${packageData.name} - ${packageData.price}\n`;
    summary += `Description: ${packageData.description}\n\n`;
    
    summary += `Subscription Level: ${subscriptionData.name}\n`;
    if (subscriptionData.hasBilling && billingFrequency === "annual") {
      summary += `Billing: Annual - $${subscriptionData.annualPrice} (Save $${(subscriptionData.monthlyPrice * 12) - subscriptionData.annualPrice})\n`;
    } else if (subscriptionData.hasBilling) {
      summary += `Billing: Monthly - $${subscriptionData.monthlyPrice}\n`;
    }
    summary += `Service Fee: ${subscriptionData.subtitle}\n`;
    summary += `Subscription Details: ${subscriptionData.description}\n\n`;

    const encodedSummary = encodeURIComponent(summary);
    window.location.href = `/?selection=${encodedSummary}#contact-form`;
  };

  return (
    <div className="py-20 bg-background" data-section="package-selector">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Package & Subscription
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select both a coverage package and subscription level to get started. 
            First choose your marketing package, then select your membership level for service fees and features.
          </p>
        </div>

        {/* Coverage Package Selection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Step 1: Choose Coverage Package</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coveragePackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`transition-all hover:shadow-lg ${
                  selectedPackage === pkg.name ? 'border-primary bg-primary/5' : ''
                } ${pkg.popular ? 'border-primary/50' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={selectedPackage === pkg.name ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedPackage(pkg.name)}
                  >
                    {selectedPackage === pkg.name ? "Selected" : "Select Option"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Level Selection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Step 2: Choose Subscription Level</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`transition-all hover:shadow-lg ${
                  selectedSubscription === plan.name ? 'border-primary bg-primary/5' : ''
                } ${plan.popular ? 'border-primary/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-green-600 text-sm mb-2">Included:</h5>
                      <ul className="space-y-1 text-xs">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.excludedFeatures.length > 0 && (
                      <div>
                        <h5 className="font-medium text-red-600 text-sm mb-2">Not Included:</h5>
                        <ul className="space-y-1 text-xs">
                          {plan.excludedFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <X className="h-3 w-3 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant={selectedSubscription === plan.name ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedSubscription(plan.name)}
                  >
                    {selectedSubscription === plan.name ? "Selected" : "Select Option"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing Frequency for Paid Plans */}
        {selectedSubscription && subscriptionPlans.find(p => p.name === selectedSubscription)?.hasBilling && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Step 3: Choose Billing Frequency</h3>
            <div className="max-w-md mx-auto">
              <Tabs value={billingFrequency} onValueChange={setBillingFrequency}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">Annual</TabsTrigger>
                </TabsList>
                
                <TabsContent value="monthly" className="mt-4">
                  <Card className="p-4 text-center">
                    <h4 className="font-semibold">Monthly Billing</h4>
                    <div className="text-2xl font-bold text-primary">
                      ${subscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice}/month
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="annual" className="mt-4">
                  <Card className="p-4 text-center">
                    <h4 className="font-semibold">Annual Billing</h4>
                    <div className="text-2xl font-bold text-primary">
                      ${subscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice}/year
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${((subscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice || 0) * 12) - (subscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice || 0)}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* Selection Summary and Proceed */}
        {selectedPackage && selectedSubscription && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 bg-primary/5 border-primary">
              <h3 className="text-xl font-bold mb-4 text-center">Your Selection Summary</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Coverage Package:</span>
                  <span className="font-semibold">{selectedPackage} - {coveragePackages.find(p => p.name === selectedPackage)?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subscription Level:</span>
                  <span className="font-semibold">{selectedSubscription}</span>
                </div>
                {subscriptionPlans.find(p => p.name === selectedSubscription)?.hasBilling && (
                  <div className="flex justify-between">
                    <span>Billing:</span>
                    <span className="font-semibold capitalize">
                      {billingFrequency} - ${billingFrequency === "monthly" 
                        ? subscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice
                        : subscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice
                      }
                    </span>
                  </div>
                )}
              </div>
              
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleProceed}
              >
                Proceed to Contact Form
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelector;