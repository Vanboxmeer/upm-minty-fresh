import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToMembership = () => {
    const membershipSection = document.getElementById('membership');
    if (membershipSection) {
      const offsetTop = membershipSection.offsetTop - 80; // Account for header height
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToCoveragePackages = () => {
    const coverageSection = document.getElementById('coverage-packages');
    if (coverageSection) {
      const offsetTop = coverageSection.offsetTop - 80; // Account for header height
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80; // Account for header height
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="block">
            <img 
              src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
              alt="UPM Logo" 
              className="h-12 w-auto transition-transform duration-200 hover:scale-105"
            />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="/services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <button onClick={scrollToContact} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Contact</button>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
            <button onClick={scrollToCoveragePackages} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Start a Campaign</button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">Login</Button>
            <Button variant="cta" size="sm" onClick={scrollToMembership}>Start Subscription</Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="/services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <button onClick={scrollToContact} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer text-left">Contact</button>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
            <button onClick={scrollToCoveragePackages} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer text-left">Start a Campaign</button>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm">Login</Button>
              <Button variant="cta" size="sm" onClick={scrollToMembership}>Start Subscription</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;