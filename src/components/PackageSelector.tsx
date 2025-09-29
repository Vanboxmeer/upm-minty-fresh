import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useEffect } from "react";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";

const PackageSelector = () => {
  const {
    selectedPackage,
    selectedSubscription,
    billingFrequency,
    customBudget,
    setSelectedPackage,
    setSelectedSubscription,
    setBillingFrequency,
    setCustomBudget,
  } = usePackageSelection();

  const formatPrice = (usdPrice: string) => {
    return usdPrice;
  };

  const coveragePackages = [
    {
      name: "Growth",
      price: "$5,000",
      description: "Perfect for emerging projects looking to establish market presence. Use your budget for things such as:",
      features: [
        "Press release distribution to key outlets",
        "Collaborations with micro-influencers",
        "Feature placements in industry publications",
        "Social media amplification",
        "Web3 directory listing services"
      ],
      popular: false
    },
    {
      name: "Scale",
      price: "$25,000",
      description: "Comprehensive marketing for projects ready to scale significantly. Use your budget for things such as:",
      features: [
        "Global press release distribution",
        "Partnerships with a top-tier influencer",
        "Collaborations with multiple micro-influencers",
        "Executive interviews and features in major publications",
        "Feature articles in leading industry sites",
        "Web3 directory listing services"
      ],
      popular: true
    },
    {
      name: "Dominate",
      price: "$100,000",
      description: "Maximum exposure package for industry-leading projects. Use your budget for things such as:",
      features: [
        "Global media outreach to 500+ outlets",
        "Collaborations with multiple top-tier influencers",
        "Collaborations with small and medium sized content creators",
        "Coverage in multiple tier-1 media publications",
        "Budget gives room for a longer campaign or larger media blitz",
        "Web3 directory listing services"
      ],
      popular: false
    },
    {
      name: "Custom Budget",
      price: "Custom",
      description: "Your account manager will work with you to shortlist mixed media options that utilize your full budget. Use your budget for things such as:",
      features: [
        "Account manager shortlists options to use your full budget ($5K - $500K)",
        "Mixed media package combining press releases & influencer collaborations",
        "Scalable media outreach matching your investment",
        "Custom KOL selection and content creation",
        "Web3 directory listing services"
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

  // Auto-scroll to contact form when both selections are made
  useEffect(() => {
    if (selectedPackage && selectedSubscription) {
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [selectedPackage, selectedSubscription]);

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const handleSubscriptionSelect = (sub: any) => {
    setSelectedSubscription(sub);
  };

  return (
    <div className="py-20 bg-muted/30" data-section="package-selector">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Media Package Budget & Subscription Level
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select both a coverage package and subscription level to get started. 
            Choose your marketing package below and use your budget for the listed activities.
          </p>
        </div>

        {/* Coverage Package Selection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Step 1: Choose Coverage Package</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {coveragePackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`group relative flex flex-col h-full transition-all duration-500 card-hover hover:border-primary/50 ${
                  selectedPackage?.name === pkg.name ? 'border-primary bg-primary/5 shadow-lg' : 'hover:shadow-lg'
                } ${pkg.popular ? 'border-primary/50 ring-2 ring-primary/20' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center relative z-10">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">{formatPrice(pkg.price)}</div>
                  <CardDescription className="group-hover:text-foreground transition-colors duration-300">{pkg.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 space-y-4">
                  <ul className="space-y-2 text-sm">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 group/item">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="group-hover/item:text-primary transition-colors duration-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {pkg.name === "Custom Budget" && selectedPackage?.name === pkg.name && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Your Budget ($USD)</label>
                      <Input
                        type="number"
                        placeholder="Enter budget (5,000 - 500,000)"
                        value={customBudget}
                        onChange={(e) => setCustomBudget(e.target.value)}
                        min="5000"
                        max="500000"
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Minimum: $5,000 | Maximum: $500,000</p>
                    </div>
                  )}
                  
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    variant={selectedPackage?.name === pkg.name ? "default" : "outline"}
                    className="w-full group-hover:shadow-lg transition-all duration-300"
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    {selectedPackage?.name === pkg.name ? "Selected" : "Select Option"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Level Selection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Step 2: Choose Subscription Level</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {subscriptionPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`group relative flex flex-col h-full transition-all duration-500 card-hover hover:border-primary/50 ${
                  selectedSubscription?.name === plan.name ? 'border-primary bg-primary/5 shadow-lg' : 'hover:shadow-lg'
                } ${plan.popular ? 'border-primary/50 ring-2 ring-primary/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center relative z-10">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{plan.subtitle}</p>
                  <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">{formatPrice(plan.price)}</div>
                  <CardDescription className="group-hover:text-foreground transition-colors duration-300">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 space-y-4">
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
                  
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    variant={selectedSubscription?.name === plan.name ? "default" : "outline"}
                    className="w-full group-hover:shadow-lg transition-all duration-300"
                    onClick={() => handleSubscriptionSelect(plan)}
                  >
                    {selectedSubscription?.name === plan.name ? "Selected" : "Select Option"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelector;