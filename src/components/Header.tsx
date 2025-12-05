import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, Building2, Users, Palette, Code } from "lucide-react";
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
              <DropdownMenuContent align="start" className="min-w-[200px] bg-popover border border-border">
                {/* Brands with sub-items */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <Building2 className="h-4 w-4 mr-2" />
                    For Brands
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover border border-border">
                    <DropdownMenuItem asChild>
                      <a href="/services" className="w-full cursor-pointer flex items-center">
                        <Building2 className="h-4 w-4 mr-2 opacity-60" />
                        Marketing Services
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/media-for-brands" className="w-full cursor-pointer flex items-center">
                        <Palette className="h-4 w-4 mr-2 opacity-60" />
                        Content Creation
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/vibe-coding" className="w-full cursor-pointer flex items-center">
                        <Code className="h-4 w-4 mr-2 opacity-60" />
                        Vibe Coding
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator />
                
                {/* Creators */}
                <DropdownMenuItem asChild>
                  <a href="/creators" className="w-full cursor-pointer flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    For Creators
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button onClick={scrollToContact} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Contact</button>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
            <a href="/think-tank" className="text-foreground hover:text-primary transition-colors">Think Tank</a>
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
              <div className="pl-4 space-y-3">
                {/* For Brands Section */}
                <div className="space-y-2">
                  <span className="text-muted-foreground text-sm font-medium flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    For Brands
                  </span>
                  <div className="pl-6 space-y-2">
                    <a href="/services" className="text-foreground hover:text-primary transition-colors block text-sm">Marketing Services</a>
                    <a href="/media-for-brands" className="text-foreground hover:text-primary transition-colors block text-sm">Content Creation</a>
                    <a href="/vibe-coding" className="text-foreground hover:text-primary transition-colors block text-sm">Vibe Coding</a>
                  </div>
                </div>
                
                {/* For Creators */}
                <a href="/creators" className="text-foreground hover:text-primary transition-colors flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  For Creators
                </a>
              </div>
            </div>
            
            <button onClick={scrollToContact} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer text-left">Contact</button>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
            <a href="/think-tank" className="text-foreground hover:text-primary transition-colors">Think Tank</a>
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