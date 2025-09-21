import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin, Twitter, Send, Calendar, Globe, Target, Users, Zap, BarChart3 } from "lucide-react";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";

const Footer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const { toast } = useToast();

  const {
    selectedPackage,
    selectedSubscription,
    billingFrequency,
    customBudget,
    campaignData,
    updateCampaignField,
    getSelectionSummary,
  } = usePackageSelection();

  // Countries that BVI can do business with (excluding sanctioned countries)
  const allowedCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  // Set default message when package is selected
  useEffect(() => {
    if (selectedPackage && selectedSubscription) {
      setMessage("I'm interested in this package/plan. Please contact me with more details.");
    }
  }, [selectedPackage, selectedSubscription]);

  const marketingObjectiveOptions = [
    "Brand Awareness", "Lead Generation", "Community Building", "Token Launch",
    "Partnership Announcements", "Product Launch", "Thought Leadership", "Crisis Management"
  ];

  const contentNeedOptions = [
    "Press Releases", "Blog Articles", "Social Media Content", "Video Content",
    "Infographics", "Case Studies", "White Papers", "Email Campaigns"
  ];

  const channelOptions = [
    "Tier-1 Media (Forbes, Reuters, etc.)", "Crypto Media (CoinDesk, CoinTelegraph, etc.)",
    "Social Media Platforms", "Industry Publications", "Podcasts", "YouTube",
    "LinkedIn", "Twitter/X", "Telegram", "Discord"
  ];

  const successMetricOptions = [
    "Website Traffic", "Social Media Engagement", "Brand Mentions", "Lead Generation",
    "Media Coverage", "Community Growth", "Conversion Rate", "ROI"
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
      // Save referral data if provided
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
          console.error("Referral tracking error:", referralError);
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
          country,
          message: selectionSummary ? `${selectionSummary}\n\n${message}` : message,
          referrerName: referrerName || null,
          referrerCode: referrerCode || null,
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

  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Contact Form */}
        <div id="contact-form" className="bg-white/10 rounded-lg p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Get In Touch</h3>
          
          {/* Package Selection Summary */}
          {(selectedPackage || selectedSubscription) && (
            <div className="mb-8 p-4 bg-primary/20 rounded-lg border border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-primary">Your Current Selection</h4>
                <Badge variant="secondary">Live Preview</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {selectedPackage && (
                  <div>
                    <p className="font-medium">Coverage Package:</p>
                    <p className="text-primary">
                      {selectedPackage.name} - {selectedPackage.name === "Custom Budget" && customBudget 
                        ? `$${Number(customBudget).toLocaleString()}` 
                        : selectedPackage.price}
                    </p>
                  </div>
                )}
                {selectedSubscription && (
                  <div>
                    <p className="font-medium">Subscription:</p>
                    <p className="text-primary">
                      {selectedSubscription.name} - {billingFrequency === "monthly" 
                        ? `$${selectedSubscription.monthlyPrice}/month`
                        : `$${selectedSubscription.annualPrice}/year`}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs mt-2 opacity-80">
                You can change your selection above and this will update automatically.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Contact Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70" 
                required
              />
              <Input 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70" 
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input 
                placeholder="Email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70" 
                required
              />
              <Input 
                placeholder="Phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70" 
              />
            </div>
            <div className="mb-4">
              <Select value={country} onValueChange={setCountry} required>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select your country" className="text-white/70" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 max-h-64 z-50">
                  {allowedCountries.map((countryName) => (
                    <SelectItem key={countryName} value={countryName} className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100">
                      {countryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campaign Details Section */}
            {(selectedPackage || selectedSubscription) && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Campaign Details (Optional)
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCampaignDetails(!showCampaignDetails)}
                    className="text-primary hover:text-primary/80"
                  >
                    {showCampaignDetails ? "Hide Details" : "Add Details"}
                  </Button>
                </div>
                
                {showCampaignDetails && (
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
                          <SelectContent className="bg-white border border-gray-200 max-h-64 z-50">
                            {targetAudienceOptions.map((audience) => (
                              <SelectItem key={audience} value={audience} className="text-gray-900 hover:bg-gray-100">
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
                          <SelectContent className="bg-white border border-gray-200 max-h-64 z-50">
                            {geographicOptions.map((geo) => (
                              <SelectItem key={geo} value={geo} className="text-gray-900 hover:bg-gray-100">
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
                          <SelectContent className="bg-white border border-gray-200 max-h-64 z-50">
                            {campaignDurationOptions.map((duration) => (
                              <SelectItem key={duration} value={duration} className="text-gray-900 hover:bg-gray-100">
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
                          <SelectContent className="bg-white border border-gray-200 max-h-64 z-50">
                            {industryOptions.map((industry) => (
                              <SelectItem key={industry} value={industry} className="text-gray-900 hover:bg-gray-100">
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

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Success Metrics</label>
                      <div className="grid grid-cols-2 gap-2">
                        {successMetricOptions.map((metric) => (
                          <div key={metric} className="flex items-center space-x-2">
                            <Checkbox
                              id={`metric-${metric}`}
                              checked={campaignData.successMetrics?.includes(metric) || false}
                              onCheckedChange={(checked) => {
                                const current = campaignData.successMetrics || [];
                                if (checked) {
                                  updateCampaignField('successMetrics', [...current, metric]);
                                } else {
                                  updateCampaignField('successMetrics', current.filter(m => m !== metric));
                                }
                              }}
                              className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label htmlFor={`metric-${metric}`} className="text-xs text-white/90">
                              {metric}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <textarea
                      placeholder="Additional requirements or notes"
                      value={campaignData.additionalRequirements || ""}
                      onChange={(e) => updateCampaignField('additionalRequirements', e.target.value)}
                      className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[80px] resize-none"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Message */}
            <textarea 
              placeholder="Message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[120px] resize-none mb-4" 
              required
            />
            
            {/* Referral Fields */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Input 
                placeholder="Referrer Name (Optional)" 
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70" 
              />
              <Input 
                placeholder="Referrer Email/Code (Optional)" 
                value={referrerCode}
                onChange={(e) => setReferrerCode(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70" 
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
              className="w-full mt-4"
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
        <div className="grid md:grid-cols-4 gap-8 border-t border-white/20 pt-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-primary">UPM</div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              United Press Media - Your trusted partner for digital marketing success.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/company/upm-network/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://x.com/WatchCryptoNews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="http://t.me/unitedpressmedia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary transition-colors"
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
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-sm opacity-60">
            © 2025 UnitedPress.Media - by using our website or services you agree to our{" "}
            <a href="/terms-of-service" className="text-primary hover:underline">
              terms of service
            </a>
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;