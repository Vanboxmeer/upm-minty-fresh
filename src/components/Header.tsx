import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">UPM</div>
        </div>
        
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
          <a href="/services" className="text-foreground hover:text-primary transition-colors">Services</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">Login</Button>
          <Button variant="cta" size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;