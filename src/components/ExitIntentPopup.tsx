import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup = ({ isOpen, onClose }: ExitIntentPopupProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const packages = [
    {
      name: "Growth",
      price: "$5,000",
      description: "Perfect for emerging projects",
      features: ["Press release distribution", "Micro-influencer collaborations", "Industry publications"]
    },
    {
      name: "Scale", 
      price: "$25,000",
      description: "Comprehensive marketing for scaling",
      features: ["Global press distribution", "Top-tier influencer partnerships", "Major publication features"],
      popular: true
    },
    {
      name: "Dominate",
      price: "$100,000", 
      description: "Maximum exposure package",
      features: ["500+ media outlets", "Multiple top-tier influencers", "Tier-1 media coverage"]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          message: selectedPackage ? `I'm interested in the ${selectedPackage} package. Please contact me with more details.` : "I'm interested in your digital marketing services. Please contact me with more details."
        }
      });

      if (error) throw error;

      if (subscribeToNewsletter) {
        await supabase.functions.invoke('subscribe-newsletter', {
          body: { email }
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
      setSelectedPackage("");
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
          {/* Package Selection */}
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
                  </CardContent>
                </Card>
              ))}
            </div>
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
                  Subscribe to our newsletter
                </label>
              </div>

              {selectedPackage && (
                <div className="p-3 bg-primary/10 rounded-md">
                  <p className="text-sm font-medium">Selected Package: {selectedPackage}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Get My Custom Quote"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;