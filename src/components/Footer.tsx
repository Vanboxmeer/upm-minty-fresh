import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Footer = () => {
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* CTA Section */}
        

        {/* Contact Form */}
        <div id="contact-form" className="bg-white/10 rounded-lg p-8 mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Get In Touch</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="First Name" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
            <Input placeholder="Last Name" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="Email" type="email" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
            <Input placeholder="Phone" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
          </div>
          <textarea placeholder="Message" className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 min-h-[120px] resize-none" />
          <Button variant="hero" className="w-full mt-4">
            Send Message
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm opacity-80">
              Or reach us on Telegram: <a href="https://t.me/unitedpressmedia" className="text-primary hover:underline">@unitedpressmedia</a>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-8 border-t border-white/20 pt-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-primary">UPM</div>
            </div>
            <p className="text-sm opacity-80">
              United Press Media - Your trusted partner for digital marketing success.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-primary transition-colors">Press Release Distribution</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Content Marketing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Digital Advertising</a></li>
              
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
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