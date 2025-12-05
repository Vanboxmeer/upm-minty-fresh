import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useReferralTracking } from "@/hooks/useReferralTracking";

const ExitIntentPopup = ({ isOpen, onClose }: ExitIntentPopupProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [billingFrequency, setBillingFrequency] = useState<string>("monthly");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [customBudget, setCustomBudget] = useState<string>("");
  const [userType, setUserType] = useState<'brand' | 'creator'>('brand');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { trackConversion, getReferralCode } = useReferralTracking();

  // Countries that BVI can do business with (excluding sanctioned countries)
  const allowedCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const packages = [
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
    },
    {
      name: "Media for Brands",
      price: "Custom",
      description: "AI-powered video and image generation using Grok Imagine with character continuity:",
      features: [
        "Instagram Reels, TikTok clips, and social media content",
        "10-30s video ads with sound and character continuity",
        "Banner/display creatives for Brave, Native, Telegram Ads",
        "Photorealistic 1024×1024 images and short videos",
        "Unlimited iterations with Grok Imagine infinite scroll"
      ],
      popular: false
    },
    {
      name: "Vibe Coding App Development",
      price: "Custom",
      description: "Launch your MVP quickly with Base44 and Lovable platforms:",
      features: [
        "Rapid MVP development using no-code/low-code platforms",
        "Full-stack app development with Base44 or Lovable",
        "Web2 and Web3 integration capabilities",
        "Custom feature development and integration",
        "Project management and development support"
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
      hasBilling: false,
      type: 'brand' as const
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
      hasBilling: true,
      type: 'brand' as const
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
      hasBilling: true,
      type: 'brand' as const
    },
    // Creator subscription plans
    {
      name: "Creator Starter",
      subtitle: "Perfect for new creators",
      price: "$45",
      monthlyPrice: 45,
      annualPrice: 450,
      description: "Essential services to launch your creator career",
      features: ["Get listed in the UPM media deck", "Get recommended to clients with active marketing campaigns"],
      excludedFeatures: [],
      popular: false,
      hasBilling: true,
      type: 'creator' as const
    },
    {
      name: "Creator Pro",
      subtitle: "Most popular for growing creators",
      price: "$95",
      monthlyPrice: 95,
      annualPrice: 950,
      description: "Advanced tools for established creators looking to scale",
      features: ["Get listed in the UPM media deck", "Get recommended to clients with active marketing campaigns", "KOL collaboration requests"],
      excludedFeatures: [],
      popular: true,
      hasBilling: true,
      type: 'creator' as const
    },
    {
      name: "Creator Elite",
      subtitle: "For top-tier creators and publishers",
      price: "$195",
      monthlyPrice: 195,
      annualPrice: 1950,
      description: "Premium service with dedicated support and custom solutions",
      features: ["Get listed in the UPM media deck", "Get recommended to clients with active marketing campaigns", "KOL collaboration requests", "Directory listings", "Community quest listings"],
      excludedFeatures: [],
      popular: false,
      hasBilling: true,
      type: 'creator' as const
    }
  ];

  // Filter subscription plans based on user type
  const filteredSubscriptionPlans = subscriptionPlans.filter(plan => 
    plan.type === userType || !plan.type
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !country) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including country.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Track referral conversion automatically
      const trackedReferralCode = getReferralCode();
      if (trackedReferralCode) {
        await trackConversion(`${firstName} ${lastName}`, email, 'exit_intent_form');
      }

      let formMessage = message || "I'm interested in your digital marketing services. Please contact me with more details.";
      
      if (selectedPackage || selectedSubscription) {
        formMessage = `I'm interested in the following selection:\n\n`;
        
        if (selectedPackage) {
          const packageData = packages.find(p => p.name === selectedPackage);
          if (selectedPackage === "Custom Budget" && customBudget) {
            formMessage += `Coverage Package: ${selectedPackage} - $${Number(customBudget).toLocaleString()}\n`;
          } else {
            formMessage += `Coverage Package: ${selectedPackage} - ${packageData?.price}\n`;
          }
        }
        
        if (selectedSubscription) {
          const subscriptionData = filteredSubscriptionPlans.find(s => s.name === selectedSubscription);
          formMessage += `Subscription Level: ${selectedSubscription}\n`;
          
          if (subscriptionData?.hasBilling) {
            formMessage += `Billing: ${billingFrequency} - $${billingFrequency === "monthly" 
              ? subscriptionData.monthlyPrice 
              : subscriptionData.annualPrice}\n`;
          }
        }
        
        formMessage += `\n${message || "Please contact me with more details."}`;
      }

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          telegram,
          country,
          message: formMessage,
          referrerName: referrerName || null,
          referrerCode: referrerCode || null,
        }
      });

      if (error) throw error;

      if (subscribeToNewsletter) {
        await supabase.functions.invoke('subscribe-newsletter', {
          body: {
            email,
            name: `${firstName} ${lastName}`,
            source: "exit-intent-popup",
            userAgent: navigator.userAgent
          }
        });
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });

      // Reset form and close popup
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setTelegram("");
      setCountry("");
      setMessage("");
      setReferrerName("");
      setReferrerCode("");
      setSelectedPackage("");
      setSelectedSubscription("");
      setBillingFrequency("monthly");
      setCustomBudget("");
      setSubscribeToNewsletter(false);
      onClose();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your Package & Subscription
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* User Type Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-4">I am a:</h3>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={userType === 'brand' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setUserType('brand');
                  setSelectedSubscription("");
                  setSelectedPackage("");
                }}
                className="flex-1"
              >
                Brand/Company
              </Button>
              <Button
                type="button"
                variant={userType === 'creator' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setUserType('creator');
                  setSelectedSubscription("");
                  setSelectedPackage("");
                }}
                className="flex-1"
              >
                Creator/Influencer
              </Button>
            </div>
          </div>
          {/* Package Selection - Only show for brands */}
          {userType === 'brand' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select a Package</h3>
            <div className="space-y-3">
              {packages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={`cursor-pointer transition-all ${
                    selectedPackage === pkg.name
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedPackage(pkg.name)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        {pkg.popular && <Badge variant="secondary">Most Popular</Badge>}
                        <span className="font-bold text-primary">{pkg.price}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                    <ul className="space-y-1">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {pkg.name === "Custom Budget" && selectedPackage === pkg.name && (
                      <div className="mt-3">
                        <Input
                          type="number"
                          placeholder="Enter budget (5,000 - 500,000)"
                          value={customBudget}
                          onChange={(e) => setCustomBudget(e.target.value)}
                          min="5000"
                          max="500000"
                          className="w-full text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Min: $5K | Max: $500K</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}

          {/* Subscription Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Subscription</h3>
            <div className="space-y-2">
              {filteredSubscriptionPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`cursor-pointer transition-all ${
                    selectedSubscription === plan.name
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedSubscription(plan.name)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{plan.name}</span>
                          {plan.popular && <Badge variant="secondary">Popular</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                      </div>
                      <span className="font-bold text-primary">{plan.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Billing Frequency for Paid Plans */}
          {selectedSubscription && filteredSubscriptionPlans.find(p => p.name === selectedSubscription)?.hasBilling && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Billing Frequency</h3>
              <Tabs value={billingFrequency} onValueChange={setBillingFrequency}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">Annual</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="mt-2">
                  <div className="text-center p-2">
                    <span className="font-medium">${filteredSubscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice}/month</span>
                  </div>
                </TabsContent>
                <TabsContent value="annual" className="mt-2">
                  <div className="text-center p-2">
                    <span className="font-medium">${filteredSubscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice}/year</span>
                    <div className="text-xs text-green-600">Save ${((filteredSubscriptionPlans.find(p => p.name === selectedSubscription)?.monthlyPrice || 0) * 12) - (filteredSubscriptionPlans.find(p => p.name === selectedSubscription)?.annualPrice || 0)}</div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started Today</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              
              <Input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              
              <Input
                type="text"
                placeholder="Telegram Username"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />

              <Select value={country} onValueChange={setCountry} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country *" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 max-h-64 z-50">
                  {allowedCountries.map((countryName) => (
                    <SelectItem key={countryName} value={countryName} className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100">
                      {countryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <textarea
                placeholder="Message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-md border border-input bg-background text-sm min-h-[100px] resize-none"
              />

              {/* Referral Fields */}
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="Referrer Name (Optional)"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Referrer Email/Code (Optional)"
                  value={referrerCode}
                  onChange={(e) => setReferrerCode(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter-popup"
                  checked={subscribeToNewsletter}
                  onCheckedChange={(checked) => setSubscribeToNewsletter(checked as boolean)}
                />
                <label
                  htmlFor="newsletter-popup"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Subscribe to our marketing newsletter (bi-weekly insights)
                </label>
              </div>

              {(selectedPackage || selectedSubscription) && (
                <div className="p-3 bg-primary/10 rounded-md space-y-1">
                  <p className="text-sm font-medium">Your Selection:</p>
                  {selectedPackage && (
                    <p className="text-sm">
                      Package: {selectedPackage === "Custom Budget" && customBudget 
                        ? `${selectedPackage} - $${Number(customBudget).toLocaleString()}` 
                        : selectedPackage}
                    </p>
                  )}
                  {selectedSubscription && (
                    <p className="text-sm">Subscription: {selectedSubscription}</p>
                  )}
                  {selectedSubscription && subscriptionPlans.find(s => s.name === selectedSubscription)?.hasBilling && (
                    <p className="text-sm">Billing: {billingFrequency}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;