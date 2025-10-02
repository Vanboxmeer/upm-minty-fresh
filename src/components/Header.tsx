import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import { ThemeToggle } from "@/components/ThemeToggle";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToCoveragePackages = () => {
    // Navigate to home if not there, then scroll
    if (window.location.pathname !== '/') {
      window.location.href = '/#package-selector';
    } else {
      const packageSection = document.querySelector('[data-section="package-selector"]');
      if (packageSection) {
        const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80; // Account for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleLogoHover = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  return <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="block" onMouseEnter={handleLogoHover}>
            <img src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" alt="UPM Logo" className="h-12 w-auto retro-logo-hover" />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
                Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[160px]">
                <DropdownMenuItem asChild>
                  <a href="/services" className="w-full cursor-pointer">
                    Brands
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/creators" className="w-full cursor-pointer">
                    Creators
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button onClick={scrollToContact} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Contact</button>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
          </nav>
          
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="synthwave" size="sm" className="group relative overflow-hidden" onClick={scrollToCoveragePackages}>
                Start a Campaign
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-retro-cyan/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
              </Button>
            </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            
            {/* Mobile Services Menu */}
            <div className="flex flex-col space-y-2">
              <span className="text-foreground font-medium">Services</span>
              <div className="pl-4 space-y-2">
                <a href="/services" className="text-foreground hover:text-primary transition-colors block">Brands</a>
                <a href="/creators" className="text-foreground hover:text-primary transition-colors block">Creators</a>
              </div>
            </div>
            
            <button onClick={scrollToContact} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer text-left">Contact</button>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <ThemeToggle />
              <Button variant="synthwave" size="sm" className="group relative overflow-hidden" onClick={scrollToCoveragePackages}>
                Start a Campaign
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-retro-cyan/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
              </Button>
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;