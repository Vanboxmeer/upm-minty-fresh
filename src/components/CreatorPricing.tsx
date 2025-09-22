import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown, Sparkles, Rocket, Star, Users, Zap } from "lucide-react";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";

const creatorPlans = [
  {
    name: "Creator Starter",
    subtitle: "Perfect for new creators",
    price: "$45",
    monthlyPrice: 45,
    annualPrice: 450,
    features: [
      "Get listed in the UPM media deck",
      "Get recommended to clients with active marketing campaigns"
    ],
    excludedFeatures: [],
    popular: false,
    hasBilling: true,
    icon: Users,
    gradient: "from-secondary to-secondary-glow"
  },
  {
    name: "Creator Pro",
    subtitle: "Most popular for growing creators",
    price: "$95",
    monthlyPrice: 95,
    annualPrice: 950,
    features: [
      "Get listed in the UPM media deck",
      "Get recommended to clients with active marketing campaigns",
      "KOL collaboration requests"
    ],
    excludedFeatures: [],
    popular: true,
    hasBilling: true,
    icon: Crown,
    gradient: "from-primary to-primary-glow"
  },
  {
    name: "Creator Elite",
    subtitle: "For top-tier creators and publishers",
    price: "$195",
    monthlyPrice: 195,
    annualPrice: 1950,
    features: [
      "Get listed in the UPM media deck",
      "Get recommended to clients with active marketing campaigns",
      "KOL collaboration requests",
      "Directory listings",
      "Community quest listings"
    ],
    excludedFeatures: [],
    popular: false,
    hasBilling: true,
    icon: Rocket,
    gradient: "from-accent to-accent-glow"
  }
];

const CreatorPricing = () => {
  const [billingFrequency, setBillingFrequency] = useState<"monthly" | "annual">("monthly");
  const { setSelectedSubscription, setBillingFrequency: setContextBilling } = usePackageSelection();

  const handleSelectPlan = (plan: typeof creatorPlans[0]) => {
    setSelectedSubscription(plan);
    setContextBilling(billingFrequency);
    
    // Scroll to contact form
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="creator-pricing" className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Choose Your Plan</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Creator <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Subscription Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan to grow your creator business and maximize your earning potential.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm p-1 rounded-xl border border-secondary/20 mb-8">
            <button
              onClick={() => setBillingFrequency("monthly")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                billingFrequency === "monthly"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingFrequency("annual")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                billingFrequency === "annual"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {creatorPlans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = billingFrequency === "annual" ? plan.annualPrice : plan.monthlyPrice;
            const savings = billingFrequency === "annual" ? (plan.monthlyPrice * 12) - plan.annualPrice : 0;
            
            return (
              <Card
                key={plan.name}
                className={`relative p-4 lg:p-6 card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5 ${
                  plan.popular
                    ? "border-primary/50 shadow-xl shadow-primary/20"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-white flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3 lg:pb-4 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-3 lg:mb-4 mx-auto`}>
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-lg lg:text-xl font-bold">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                  
                  <div className="mt-3 lg:mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl lg:text-3xl font-bold">${displayPrice}</span>
                      <span className="text-sm text-muted-foreground">
                        /{billingFrequency === "annual" ? "year" : "month"}
                      </span>
                    </div>
                    {billingFrequency === "annual" && savings > 0 && (
                      <p className="text-sm text-secondary font-medium mt-1">
                        Save ${savings}/year
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 lg:space-y-6">
                  {plan.features.length > 0 && (
                    <ul className="space-y-2 lg:space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 lg:gap-3">
                          <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    variant={plan.popular ? "cta" : "outline"}
                    className="w-full"
                    size="sm"
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Referral Program Alternative */}
        <div className="text-center bg-gradient-to-r from-card via-secondary/10 to-card backdrop-blur-sm rounded-2xl p-8 border border-secondary/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-secondary" />
            <h3 className="text-2xl font-bold">Join Our Referral Program - FREE!</h3>
          </div>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Become an active member of our referral program and access all creator services without subscription fees. 
            Earn commissions while growing your network!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="lg"
              onClick={() => window.open('/affiliate-signup', '_blank')}
            >
              Join Referral Program
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('/partner-dashboard', '_blank')}
            >
              Partner Dashboard
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ✨ No subscription fees • Earn 10% commission on referrals • Access to all creator services
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreatorPricing;