import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";

const PackageSelector = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [billingFrequency, setBillingFrequency] = useState<string>("monthly");
  const [customBudget, setCustomBudget] = useState<string>("");
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

  const handleProceed = () => {
    if (!selectedPackage || !selectedSubscription) {
      return;
    }

    const packageData = coveragePackages.find(p => p.name === selectedPackage);
    const subscriptionData = subscriptionPlans.find(s => s.name === selectedSubscription);
    
    if (!packageData || !subscriptionData) return;

    // Create comprehensive summary with converted prices
    let summary = `SELECTED PACKAGE & SUBSCRIPTION:\n\n`;
    
    if (packageData.name === "Custom Budget" && customBudget) {
      summary += `Coverage Package: ${packageData.name} - $${Number(customBudget).toLocaleString()}\n`;
    } else {
      summary += `Coverage Package: ${packageData.name} - ${formatPrice(packageData.price)}\n`;
    }
    summary += `Description: ${packageData.description}\n\n`;
    
    summary += `Subscription Level: ${subscriptionData.name}\n`;
    if (subscriptionData.hasBilling && billingFrequency === "annual") {
      summary += `Billing: Annual - ${formatPrice(`$${subscriptionData.annualPrice}`)} (Save ${formatPrice(`$${(subscriptionData.monthlyPrice * 12) - subscriptionData.annualPrice}`)})\n`;
    } else if (subscriptionData.hasBilling) {
      summary += `Billing: Monthly - ${formatPrice(`$${subscriptionData.monthlyPrice}`)}\n`;
    }
    summary += `Service Fee: ${subscriptionData.subtitle}\n`;
    summary += `Subscription Details: ${subscriptionData.description}\n`;
    summary += `\n`;

    const encodedSummary = encodeURIComponent(summary);
    window.location.href = `/?selection=${encodedSummary}#contact-form`;
  };

  return (
    <div className="py-20 bg-white" data-section="package-selector">
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
                  selectedPackage === pkg.name ? 'border-primary bg-primary/5 shadow-lg scale-105' : 'hover:shadow-lg'
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
                  
                  {pkg.name === "Custom Budget" && selectedPackage === pkg.name && (
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
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      variant={selectedPackage === pkg.name ? "default" : "outline"}
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                      onClick={() => setSelectedPackage(pkg.name)}
                    >
                      {selectedPackage === pkg.name ? "Selected" : "Select Option"}
                    </Button>
                  </div>
                </CardContent>
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
                  selectedSubscription === plan.name ? 'border-primary bg-primary/5 shadow-lg scale-105' : 'hover:shadow-lg'
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
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      variant={selectedSubscription === plan.name ? "default" : "outline"}
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                      onClick={() => setSelectedSubscription(plan.name)}
                    >
                      {selectedSubscription === plan.name ? "Selected" : "Select Option"}
                    </Button>
                  </div>
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
                      {formatPrice(`$${subscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice}`)}/month
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="annual" className="mt-4">
                  <Card className="p-4 text-center">
                    <h4 className="font-semibold">Annual Billing</h4>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(`$${subscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice}`)}/year
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save {formatPrice(`$${((subscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice || 0) * 12) - (subscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice || 0)}`)}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {/* Selection Summary and Proceed */}
        {selectedPackage && selectedSubscription && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-center text-shimmer">Your Selection Summary</h3>
              <div className="space-y-2 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Coverage Package:</span>
                  <span className="font-semibold">
                    {selectedPackage} - {selectedPackage === "Custom Budget" && customBudget 
                      ? `$${Number(customBudget).toLocaleString()}` 
                      : formatPrice(coveragePackages.find(p => p.name === selectedPackage)?.price || "")}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Subscription Level:</span>
                  <span className="font-semibold">{selectedSubscription}</span>
                </div>
                {subscriptionPlans.find(p => p.name === selectedSubscription)?.hasBilling && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span>Billing:</span>
                    <span className="font-semibold capitalize">
                      {billingFrequency} - {formatPrice(`$${billingFrequency === "monthly" 
                        ? subscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice
                        : subscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice
                      }`)}
                    </span>
                  </div>
                )}
              </div>
              
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full pulse-glow"
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