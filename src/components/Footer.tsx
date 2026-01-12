import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin, Send, Calendar, Globe, Target, Users, Zap, BarChart3 } from "lucide-react";

// X (Twitter) icon component matching lucide style
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z" />
  </svg>
);
import { usePackageSelection } from "@/contexts/PackageSelectionContext";

const Footer = () => {
  // Footer component initialized
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
  const [isLoading, setIsLoading] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const [showCreatorDetails, setShowCreatorDetails] = useState(false);
  const [showVibeCodingDetails, setShowVibeCodingDetails] = useState(false);
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [existingClientInquiry, setExistingClientInquiry] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const { toast } = useToast();
  const { trackConversion, getReferralCode } = useReferralTracking();

  const {
    selectedPackage,
    selectedSubscription,
    billingFrequency,
    customBudget,
    campaignData,
    creatorData,
    vibeCodingData,
    userType,
    updateCampaignField,
    updateCreatorField,
    updateVibeCodingField,
    getSelectionSummary,
    setSelectedPackage,
    setSelectedSubscription,
    setBillingFrequency,
    setCustomBudget,
    setUserType,
  } = usePackageSelection();
  console.log("Footer component loading, userType:", userType);
  // Coverage packages data
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
        "Unlimited iterations with Grok Imagine infinite scroll",
        "Web3, crypto, and tech-optimized content generation"
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

  // Subscription plans data
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
      popular: false,
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

  // Countries that BVI can do business with (excluding sanctioned countries)
  const allowedCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  // Auto-detect user type from URL path
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/creators') && !userType) {
      setUserType('creator');
    } else if (path.includes('/services') && !userType) {
      setUserType('brand');
    } else if (path === '/' && !userType) {
      // Default to brand for home page unless already set
      setUserType('brand');
    }
  }, [userType, setUserType]);

  // Set default message when package is selected
  useEffect(() => {
    if (selectedPackage && selectedSubscription) {
      setMessage("I'm interested in this package/plan. Please contact me with more details.");
    }
  }, [selectedPackage, selectedSubscription]);

  // Filter subscription plans based on user type
  const filteredSubscriptionPlans = subscriptionPlans.filter(plan => 
    plan.type === userType || !plan.type
  );

  const marketingObjectiveOptions = [
    "Brand Awareness", "Lead Generation", "Community Building", "Token Launch",
    "Partnership Announcements", "Product Launch", "Thought Leadership", "Crisis Management"
  ];

  const contentNeedOptions = [
    "Press Releases", "Blog Articles", "Social Media Content", "Video Content",
    "Features", "Case Studies", "Organic Earned Media", "Email Campaigns",
    "Paid social ads", "Paid browser ads"
  ];

  const channelOptions = [
    "Tier-1 Media (Forbes, Reuters, etc.)", "Crypto Media (CoinDesk, CoinTelegraph, etc.)",
    "Social Media Platforms", "Industry Publications", "Podcasts", "YouTube",
    "LinkedIn", "Twitter/X", "Telegram", "Discord"
  ];


  const targetAudienceOptions = [
    "Crypto Investors", "DeFi Users", "NFT Collectors", "GameFi Players", 
    "Retail Investors", "Institutional Investors", "Developers", "General Public",
    "Millennials", "Gen Z", "Tech Enthusiasts", "Early Adopters"
  ];

  const geographicOptions = [
    "Global", "North America", "Europe", "Asia Pacific", "Latin America",
    "United States", "Canada", "United Kingdom", "Germany", "France",
    "Japan", "South Korea", "Singapore", "Australia", "Brazil"
  ];

  const campaignDurationOptions = [
    "1-2 weeks", "3-4 weeks", "1-2 months", "3-6 months", 
    "6-12 months", "12+ months", "Ongoing"
  ];

  const budgetRangeOptions = [
    "Under $5,000", "$5,000 - $25,000", "$25,000 - $100,000", 
    "$100,000 - $500,000", "Over $500,000"
  ];

  const industryOptions = [
    "DeFi", "NFTs", "Gaming", "Infrastructure", "Trading/Exchange", 
    "Wallet", "Blockchain", "Metaverse", "AI", "Other"
  ];

  const urgencyOptions = [
    "ASAP (within 1 week)", "Within 2 weeks", "Within 1 month", 
    "Within 3 months", "Flexible timing"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !country || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including country",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Track referral conversion automatically
      const trackedReferralCode = getReferralCode();
      if (trackedReferralCode) {
        await trackConversion(`${firstName} ${lastName}`, email, 'contact_form');
      }

      // Save manual referral data if provided (for backwards compatibility)
      if (referrerName || referrerCode) {
        try {
          await supabase.from('referrals').insert({
            referrer_name: referrerName || 'Unknown',
            referrer_email: referrerCode.includes('@') ? referrerCode : null,
            referrer_code: !referrerCode.includes('@') ? referrerCode : null,
            referred_user_name: `${firstName} ${lastName}`,
            referred_user_email: email,
            notes: `Contact form submission: ${message}`,
          });
        } catch (referralError) {
          console.error("Manual referral tracking error:", referralError);
          // Don't fail the main form if referral tracking fails
        }
      }

      const selectionSummary = getSelectionSummary();
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          telegram,
          country,
          message: selectionSummary ? `${selectionSummary}\n\n${message}` : message,
          referrerName: referrerName || null,
          referrerCode: referrerCode || null,
          vibeCodingData: selectedPackage?.name === 'Vibe Coding App Development' ? vibeCodingData : undefined,
        },
      });

      if (error) throw error;

      // Handle newsletter subscription if checked
      if (subscribeToNewsletter) {
        try {
          await supabase.functions.invoke('subscribe-newsletter', {
            body: {
              email,
              name: `${firstName} ${lastName}`,
              source: "contact-form",
              userAgent: navigator.userAgent
            }
          });
        } catch (newsletterError) {
          console.error("Newsletter subscription error:", newsletterError);
          // Don't fail the main form if newsletter subscription fails
        }
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setTelegram("");
      setCountry("");
      setMessage("");
      setReferrerName("");
      setReferrerCode("");
      setSubscribeToNewsletter(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Contact Form */}
        <div id="contact-form" className="bg-gray-800/50 rounded-lg p-8 mb-16 max-w-4xl mx-auto border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Get In Touch</h3>
          
          {/* Package Selection Summary */}
          <div className="mb-8 p-3 sm:p-4 bg-primary/20 rounded-lg border border-primary/30">
            
            {/* User Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-white">I am a:</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant={userType === 'brand' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setUserType('brand');
                    setSelectedSubscription(null);
                    setSelectedPackage(null);
                  }}
                  className="flex-1 text-sm px-3 py-3 transition-all duration-200"
                >
                  Brand/Company
                </Button>
                <Button
                  type="button"
                  variant={userType === 'creator' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setUserType('creator');
                    setSelectedSubscription(null);
                    setSelectedPackage(null);
                  }}
                  className="flex-1 text-sm px-3 py-3 transition-all duration-200"
                >
                  Creator/Publisher
                </Button>
              </div>
            </div>

            {/* Existing Client Checkbox */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox 
                id="existing-client" 
                checked={isExistingClient}
                onCheckedChange={(checked) => setIsExistingClient(checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="existing-client" 
                className="text-sm text-white cursor-pointer"
              >
                I am an existing client
              </label>
            </div>
            
            {/* Existing Client Form */}
            {isExistingClient ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">What are you inquiring about?</label>
                  <Select value={existingClientInquiry} onValueChange={setExistingClientInquiry}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-[100]">
                      <SelectItem value="existing-campaign" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Existing campaign
                      </SelectItem>
                      <SelectItem value="account-upgrade" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Account upgrade
                      </SelectItem>
                      <SelectItem value="report-problem" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Report a problem
                      </SelectItem>
                      <SelectItem value="other" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {existingClientInquiry === 'existing-campaign' && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Campaign ID</label>
                    <Input
                      placeholder="Enter your campaign ID #"
                      value={campaignId}
                      onChange={(e) => setCampaignId(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                )}
              </div>
            ) :
            
            /* Show fields only after user type is selected and not existing client */
            userType ? (<>
              {userType === 'brand' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Coverage Package Selector - Only for brands */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Coverage Package:</label>
                    <Select 
                      value={selectedPackage?.name || ""} 
                      onValueChange={(value) => {
                        const pkg = coveragePackages.find(p => p.name === value);
                        if (pkg) setSelectedPackage(pkg);
                      }}
                    >
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select coverage package" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-[100]">
                        {coveragePackages.map((pkg) => (
                          <SelectItem key={pkg.name} value={pkg.name} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {pkg.name} - {pkg.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPackage?.name === "Custom Budget" && (
                      <Input
                        type="number"
                        placeholder="Enter budget ($5,000 - $500,000)"
                        value={customBudget}
                        onChange={(e) => setCustomBudget(e.target.value)}
                        min="5000"
                        max="500000"
                        className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    )}
                  </div>

                  {/* Brand Subscription Selector */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Subscription Level:</label>
                    <Select 
                      value={selectedSubscription?.name || ""} 
                      onValueChange={(value) => {
                        const sub = subscriptionPlans.find(s => s.name === value);
                        if (sub) setSelectedSubscription(sub);
                      }}
                    >
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select subscription level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                        {filteredSubscriptionPlans.map((plan) => (
                          <SelectItem key={plan.name} value={plan.name} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {plan.name} - {plan.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Billing Frequency for Paid Plans */}
                    {selectedSubscription && selectedSubscription.hasBilling && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-2 text-white">Billing:</label>
                        <Tabs value={billingFrequency} onValueChange={setBillingFrequency} className="w-full">
                          <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                            <TabsTrigger 
                              value="monthly" 
                              className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                            >
                              Monthly
                            </TabsTrigger>
                            <TabsTrigger 
                              value="annual" 
                              className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                            >
                              Annual
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <div className="mt-2 text-sm text-white/80">
                          {billingFrequency === 'monthly' ? (
                            <span>${selectedSubscription.monthlyPrice}/month</span>
                          ) : (
                            <span>${selectedSubscription.annualPrice}/year <span className="text-green-400">(Save ${(selectedSubscription.monthlyPrice * 12) - selectedSubscription.annualPrice})</span></span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Creator Plan:</label>
                  <Select 
                    value={selectedSubscription?.name || ""} 
                    onValueChange={(value) => {
                      const sub = subscriptionPlans.find(s => s.name === value);
                      if (sub) setSelectedSubscription(sub);
                    }}
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select creator plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                      {filteredSubscriptionPlans.map((plan) => (
                        <SelectItem key={plan.name} value={plan.name} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                          {plan.name} - {plan.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Billing Frequency for Creator Plans */}
                  {selectedSubscription && selectedSubscription.hasBilling && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2 text-white">Billing:</label>
                      <Tabs value={billingFrequency} onValueChange={setBillingFrequency} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                          <TabsTrigger 
                            value="monthly" 
                            className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                          >
                            Monthly
                          </TabsTrigger>
                          <TabsTrigger 
                            value="annual" 
                            className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                          >
                            Annual
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <div className="mt-2 text-sm text-white/80">
                        {billingFrequency === 'monthly' ? (
                          <span>${selectedSubscription.monthlyPrice}/month</span>
                        ) : (
                          <span>${selectedSubscription.annualPrice}/year <span className="text-green-400">(Save ${(selectedSubscription.monthlyPrice * 12) - selectedSubscription.annualPrice})</span></span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>) : null}
            {(selectedPackage || selectedSubscription) && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {selectedPackage?.name === 'Vibe Coding App Development' 
                        ? 'App Development Details (Optional)'
                        : userType === 'creator' 
                          ? 'Creator Details (Optional)' 
                          : 'Campaign Details (Optional)'}
                    </h4>
                    <p className="text-sm text-white/70 mt-1">
                      {selectedPackage?.name === 'Vibe Coding App Development'
                        ? 'Tell us about your app development needs'
                        : userType === 'creator' 
                          ? 'Share your creator profile and collaboration interests'
                          : 'Share more details about the campaign you\'re looking to run'
                      }
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (selectedPackage?.name === 'Vibe Coding App Development') {
                        setShowVibeCodingDetails(!showVibeCodingDetails);
                      } else if (userType === 'creator') {
                        setShowCreatorDetails(!showCreatorDetails);
                      } else {
                        setShowCampaignDetails(!showCampaignDetails);
                      }
                    }}
                    className="text-white hover:text-white hover:bg-white/10 border border-white/20"
                  >
                    {(selectedPackage?.name === 'Vibe Coding App Development' 
                      ? showVibeCodingDetails 
                      : userType === 'creator' 
                        ? showCreatorDetails 
                        : showCampaignDetails) ? "Hide Details" : "Add Details"}
                  </Button>
                </div>
                
                {/* Vibe Coding Details Form */}
                {selectedPackage?.name === 'Vibe Coding App Development' && showVibeCodingDetails && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Approximate Budget</label>
                        <Select 
                          value={vibeCodingData.approximateBudget || ""} 
                          onValueChange={(value) => updateVibeCodingField('approximateBudget', value)}
                        >
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                            <SelectItem value="$5,000 - $10,000" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              $5,000 - $10,000
                            </SelectItem>
                            <SelectItem value="$10,000 - $25,000" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              $10,000 - $25,000
                            </SelectItem>
                            <SelectItem value="$25,000 - $50,000" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              $25,000 - $50,000
                            </SelectItem>
                            <SelectItem value="$50,000+" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              $50,000+
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Timeframe</label>
                        <Select 
                          value={vibeCodingData.timeframe || ""} 
                          onValueChange={(value) => updateVibeCodingField('timeframe', value)}
                        >
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                            <SelectItem value="1-2 weeks" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              1-2 weeks
                            </SelectItem>
                            <SelectItem value="2-4 weeks" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              2-4 weeks
                            </SelectItem>
                            <SelectItem value="1-2 months" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              1-2 months
                            </SelectItem>
                            <SelectItem value="2-3 months" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              2-3 months
                            </SelectItem>
                            <SelectItem value="3+ months" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                              3+ months
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Desired App Features</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['User Authentication', 'Database Integration', 'Payment Processing', 'API Integrations', 'Social Features', 'Admin Dashboard', 'Mobile Responsive', 'Real-time Updates'].map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`feature-${feature}`}
                              checked={vibeCodingData.appFeatures?.includes(feature) || false}
                              onCheckedChange={(checked) => {
                                const current = vibeCodingData.appFeatures || [];
                                if (checked) {
                                  updateVibeCodingField('appFeatures', [...current, feature]);
                                } else {
                                  updateVibeCodingField('appFeatures', current.filter(f => f !== feature));
                                }
                              }}
                              className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label htmlFor={`feature-${feature}`} className="text-xs text-white/90">
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Web2/Web3 Components</label>
                      <Select 
                        value={vibeCodingData.includesWeb3 || ""} 
                        onValueChange={(value) => updateVibeCodingField('includesWeb3', value)}
                      >
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Select app type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                          <SelectItem value="Web2 Only" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Web2 Only (Traditional web app)
                          </SelectItem>
                          <SelectItem value="Web2 + Web3" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Web2 + Web3 (Hybrid approach)
                          </SelectItem>
                          <SelectItem value="Web3 Focus" className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Web3 Focus (Blockchain-heavy)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">App Description</label>
                      <textarea
                        placeholder="Describe the app you're looking to build, its purpose, target audience, and any specific requirements..."
                        value={vibeCodingData.appDescription || ""}
                        onChange={(e) => updateVibeCodingField('appDescription', e.target.value)}
                        className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Creator Details Form */}
                {userType === 'creator' && showCreatorDetails && selectedPackage?.name !== 'Vibe Coding App Development' && (
                  <div className="space-y-4">
                    {/* Social Media Links */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Website URL"
                        value={creatorData.website || ""}
                        onChange={(e) => updateCreatorField('website', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                      <Input
                        placeholder="Twitter/X Handle (@username)"
                        value={creatorData.twitterX || ""}
                        onChange={(e) => updateCreatorField('twitterX', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="TikTok Handle (@username)"
                        value={creatorData.tiktok || ""}
                        onChange={(e) => updateCreatorField('tiktok', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                      <Input
                        placeholder="Instagram Handle (@username)"
                        value={creatorData.instagram || ""}
                        onChange={(e) => updateCreatorField('instagram', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Telegram Handle (@username)"
                        value={creatorData.telegram || ""}
                        onChange={(e) => updateCreatorField('telegram', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                      <Input
                        placeholder="Other Social Media"
                        value={creatorData.otherSocial || ""}
                        onChange={(e) => updateCreatorField('otherSocial', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Current Rates (e.g., $500 per post)"
                        value={creatorData.currentRates || ""}
                        onChange={(e) => updateCreatorField('currentRates', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">What are you interested in?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Web3 Quest Development', 'KOL Collaborations', 'Brand Sponsorships', 'Coverage Requests', 'Web3 Directory Listings', 'Community Building', 'Content Partnerships', 'Media Placements'].map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={`interest-${interest}`}
                              checked={creatorData.interestedIn?.includes(interest) || false}
                              onCheckedChange={(checked) => {
                                const current = creatorData.interestedIn || [];
                                if (checked) {
                                  updateCreatorField('interestedIn', [...current, interest]);
                                } else {
                                  updateCreatorField('interestedIn', current.filter(i => i !== interest));
                                }
                              }}
                              className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label htmlFor={`interest-${interest}`} className="text-xs text-white/90">
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <textarea
                      placeholder="Past collaborations and partners you've worked with..."
                      value={creatorData.pastCollaborations || ""}
                      onChange={(e) => updateCreatorField('pastCollaborations', e.target.value)}
                      className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[80px] resize-none"
                    />
                  </div>
                )}
                
                {/* Campaign Details Form */}
                {userType === 'brand' && showCampaignDetails && selectedPackage?.name !== 'Vibe Coding App Development' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Project/Company Name"
                        value={campaignData.projectName || ""}
                        onChange={(e) => updateCampaignField('projectName', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                      <Input
                        placeholder="Website URL"
                        value={campaignData.website || ""}
                        onChange={(e) => updateCampaignField('website', e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    
                    <textarea
                      placeholder="Brief project description"
                      value={campaignData.projectDescription || ""}
                      onChange={(e) => updateCampaignField('projectDescription', e.target.value)}
                      className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[80px] resize-none"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Marketing Objectives</label>
                        <div className="grid grid-cols-2 gap-2">
                          {marketingObjectiveOptions.map((objective) => (
                            <div key={objective} className="flex items-center space-x-2">
                              <Checkbox
                                id={`objective-${objective}`}
                                checked={campaignData.marketingObjectives?.includes(objective) || false}
                                onCheckedChange={(checked) => {
                                  const current = campaignData.marketingObjectives || [];
                                  if (checked) {
                                    updateCampaignField('marketingObjectives', [...current, objective]);
                                  } else {
                                    updateCampaignField('marketingObjectives', current.filter(o => o !== objective));
                                  }
                                }}
                                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <label htmlFor={`objective-${objective}`} className="text-xs text-white/90">
                                {objective}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Content Needs</label>
                        <div className="grid grid-cols-2 gap-2">
                          {contentNeedOptions.map((content) => (
                            <div key={content} className="flex items-center space-x-2">
                              <Checkbox
                                id={`content-${content}`}
                                checked={campaignData.contentNeeds?.includes(content) || false}
                                onCheckedChange={(checked) => {
                                  const current = campaignData.contentNeeds || [];
                                  if (checked) {
                                    updateCampaignField('contentNeeds', [...current, content]);
                                  } else {
                                    updateCampaignField('contentNeeds', current.filter(c => c !== content));
                                  }
                                }}
                                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <label htmlFor={`content-${content}`} className="text-xs text-white/90">
                                {content}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Target Audience</label>
                        <Select value={campaignData.targetAudience || ""} onValueChange={(value) => updateCampaignField('targetAudience', value)}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Select target audience" />
                          </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                      {targetAudienceOptions.map((audience) => (
                        <SelectItem key={audience} value={audience} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                          {audience}
                        </SelectItem>
                      ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Geographic Focus</label>
                        <Select value={campaignData.geographicTarget || ""} onValueChange={(value) => updateCampaignField('geographicTarget', value)}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Select geographic focus" />
                          </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                      {geographicOptions.map((geo) => (
                        <SelectItem key={geo} value={geo} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                          {geo}
                        </SelectItem>
                      ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Campaign Duration</label>
                        <Select value={campaignData.campaignDuration || ""} onValueChange={(value) => updateCampaignField('campaignDuration', value)}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                      {campaignDurationOptions.map((duration) => (
                        <SelectItem key={duration} value={duration} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                          {duration}
                        </SelectItem>
                      ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Launch Date</label>
                        <Input
                          type="date"
                          value={campaignData.launchDate || ""}
                          onChange={(e) => updateCampaignField('launchDate', e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Project Category/Industry</label>
                        <Select value={campaignData.industry || ""} onValueChange={(value) => updateCampaignField('industry', value)}>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry} value={industry} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                          {industry}
                        </SelectItem>
                      ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Preferred Channels</label>
                      <div className="grid grid-cols-2 gap-2">
                        {channelOptions.map((channel) => (
                          <div key={channel} className="flex items-center space-x-2">
                            <Checkbox
                              id={`channel-${channel}`}
                              checked={campaignData.preferredChannels?.includes(channel) || false}
                              onCheckedChange={(checked) => {
                                const current = campaignData.preferredChannels || [];
                                if (checked) {
                                  updateCampaignField('preferredChannels', [...current, channel]);
                                } else {
                                  updateCampaignField('preferredChannels', current.filter(c => c !== channel));
                                }
                              }}
                              className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label htmlFor={`channel-${channel}`} className="text-xs text-white/90">
                              {channel}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}
            
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70" 
                required
              />
              <Input 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70" 
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                placeholder="Email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70" 
                required
              />
              <Input 
                placeholder="Phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
            <div className="mb-4">
              <Input 
                placeholder="Telegram - @handle" 
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
            <div className="mb-4">
              <Select value={country} onValueChange={setCountry} required>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select your country" className="text-white/70" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 z-50">
                  {allowedCountries.map((countryName) => (
                    <SelectItem key={countryName} value={countryName} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">
                      {countryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            {/* Message */}
            <textarea 
              placeholder="Message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[120px] resize-none mb-4" 
              required
            />
            
            {/* Referral Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input 
                placeholder="Referrer Name (Optional)" 
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Input 
                placeholder="Referrer Email/Code (Optional)" 
                value={referrerCode}
                onChange={(e) => setReferrerCode(e.target.value)}
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
            
            {/* Newsletter Subscription Checkbox */}
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="newsletter" 
                checked={subscribeToNewsletter}
                onCheckedChange={(checked) => setSubscribeToNewsletter(checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="newsletter" 
                className="text-sm text-white/90 cursor-pointer"
              >
                Subscribe to our marketing newsletter (bi-weekly insights)
              </label>
            </div>
            
            <Button
              type="submit" 
              variant="hero" 
              className="w-full mt-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm opacity-80">
              Or reach us on Telegram: <a href="https://t.me/unitedpressmedia" className="text-primary hover:underline">@unitedpressmedia</a>
              <br />
              Or send us an Email: <a href="mailto:unitedpress.media@gmail.com" className="text-primary hover:underline">unitedpress.media@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 border-t border-background/20 pt-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
                alt="UPM Logo" 
                className="h-8 w-auto retro-logo-hover opacity-100 filter-none mix-blend-normal" 
              />
            </div>
            <p className="text-sm opacity-80 mb-4">
              United Press Media - Your trusted partner for digital marketing success.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/company/upm-network/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-70 hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://x.com/WatchCryptoNews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-70 hover:text-primary transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <XIcon size={20} />
              </a>
              <a 
                href="http://t.me/unitedpressmedia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-70 hover:text-primary transition-colors"
                aria-label="Join our Telegram"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/services#kol-collaborations" className="hover:text-primary transition-colors">KOL Collaborations</a></li>
              <li><a href="/services#press-release-services" className="hover:text-primary transition-colors">Press Release Services</a></li>
              <li><a href="/services#features--interviews--spaces" className="hover:text-primary transition-colors">Features, Interviews, Spaces</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors">Managed Paid Advertising</a></li>
              <li><a href="/creators" className="hover:text-primary transition-colors">Creator Services</a></li>
              <li><a href="/media-for-brands" className="hover:text-primary transition-colors">Content Creation for Brands</a></li>
              <li><a href="/vibe-coding" className="hover:text-primary transition-colors">Vibe Coding App Development</a></li>
              <li><a href="https://watchcrypto.info/about/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Web3 Directory Listings</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/case-studies" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="/our-products" className="hover:text-primary transition-colors">Our Apps</a></li>
              <li><a href="/affiliate-signup" className="hover:text-secondary transition-colors font-medium">Referral Program</a></li>
              <li><a href="/partner-dashboard" className="hover:text-primary transition-colors">Partner Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Apps</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="https://watchcrypto.info/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Watch Crypto</a></li>
              <li><a href="https://spinquest.app/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">SpinQuest</a></li>
              <li><a href="https://amplifyhub.base44.app" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">AmplifyHub</a></li>
              <li><a href="https://re-writeable-ai.lovable.app/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Re-Writeable AI</a></li>
              <li><a href="https://readingrace.com/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Reading Race</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/help-center" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-sm opacity-60 text-center">
              © 2025 UnitedPress.Media - by using our website or services you agree to our{" "}
              <a href="/terms-of-service" className="text-primary hover:underline">
                terms of service
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;