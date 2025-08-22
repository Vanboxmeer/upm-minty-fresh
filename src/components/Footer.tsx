import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin, Twitter } from "lucide-react";
const Footer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionSummary, setSelectionSummary] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check URL parameters for package/membership selection
    const urlParams = new URLSearchParams(window.location.search);
    const packageSelection = urlParams.get('package');
    const membershipSelection = urlParams.get('membership');
    const generalSelection = urlParams.get('selection');
    
    // Safe decode function to handle malformed URIs
    const safeDecodeURIComponent = (str: string): string => {
      try {
        return decodeURIComponent(str);
      } catch (error) {
        console.warn('Failed to decode URI component:', str, error);
        return str; // Return original string if decoding fails
      }
    };
    
    if (packageSelection) {
      const decodedSelection = safeDecodeURIComponent(packageSelection);
      setSelectionSummary(decodedSelection);
      setMessage("I'm interested in this package. Please contact me with more details.");
    } else if (membershipSelection) {
      const decodedSelection = safeDecodeURIComponent(membershipSelection);
      setSelectionSummary(decodedSelection);
      setMessage("I'm interested in this membership plan. Please contact me with more details.");
    } else if (generalSelection) {
      const decodedSelection = safeDecodeURIComponent(generalSelection);
      setSelectionSummary(decodedSelection);
      setMessage("I'm interested in this plan. Please contact me with more details.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          message: selectionSummary ? `SELECTED: ${selectionSummary}\n\n${message}` : message,
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
      setMessage("");
      setReferrerName("");
      setReferrerCode("");
      setSubscribeToNewsletter(false);
      setSelectionSummary("");
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
        {/* CTA Section */}
        

        {/* Contact Form */}
        <div id="contact-form" className="bg-white/10 rounded-lg p-8 mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Get In Touch</h3>
          <form onSubmit={handleSubmit}>
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
            <textarea 
              placeholder="Message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[120px] resize-none" 
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
          {selectionSummary && (
            <div className="mt-4 p-3 bg-primary/20 rounded-md border border-primary/30">
              <p className="text-sm font-medium mb-1">Your Selection Summary:</p>
              <p className="text-xs opacity-80 whitespace-pre-line">{selectionSummary.replace(/\n\n$/, '')}</p>
            </div>
          )}
          <div className="mt-4 text-center">
            <p className="text-sm opacity-80">
              Or reach us on Telegram: <a href="https://t.me/unitedpressmedia" className="text-primary hover:underline">@unitedpressmedia</a>
              <br />
              Or send us an Email: <a href="mailto:unitedpress.media@gmail.com" className="text-primary hover:underline">unitedpress.media@gmail.com</a>
              {selectionSummary && <span className="block mt-1 text-xs opacity-60">You can forward your selection details to our Telegram for quick assistance.</span>}
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
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/services#kol-collaborations" className="hover:text-primary transition-colors">KOL Collaborations</a></li>
              <li><a href="/services#press-release-services" className="hover:text-primary transition-colors">Press Release Services</a></li>
              <li><a href="/services#features--interviews--spaces" className="hover:text-primary transition-colors">Features, Interviews, Spaces</a></li>
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
              {/* <li><a href="/affiliate-signup" className="hover:text-primary transition-colors">Affiliate Program</a></li> */}
              {/* <li><a href="/partner-dashboard" className="hover:text-primary transition-colors">Partner Login</a></li> */}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-sm opacity-60">© 2025 United Press Media. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;