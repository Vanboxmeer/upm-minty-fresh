import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TelegramChat = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Sync with mobile nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsNavVisible(true);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  // Mobile bottom position based on nav visibility
  const mobileBottomClass = isNavVisible ? "bottom-20" : "bottom-4";

  return (
    <>
      {/* Desktop - always visible */}
      <div 
        className="fixed bottom-4 right-4 z-50 animate-[fade-in_0.6s_ease-out_0.5s_both,scale-in_0.4s_ease-out_0.5s_both] hidden md:block"
      >
        <Button
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow [box-shadow:0_0_20px_var(--primary-glow),0_0_40px_var(--primary-glow)] hover:[box-shadow:0_0_30px_var(--primary-glow),0_0_60px_var(--primary-glow)]"
          asChild
        >
          <a 
            href="http://t.me/unitedpressmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Chat with us on Telegram"
          >
            <Send size={24} />
          </a>
        </Button>
        <div className="absolute -top-12 right-0 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-2 shadow-lg animate-bounce-subtle">
          <p className="text-xs font-medium text-foreground whitespace-nowrap">
            💬 DM us
          </p>
        </div>
      </div>
      
      {/* Mobile - scroll-aware positioning, stacked below Tank icon */}
      <div 
        className={`fixed ${mobileBottomClass} right-4 z-40 md:hidden transition-all duration-300 animate-[fade-in_0.6s_ease-out_0.5s_both]`}
      >
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
          asChild
        >
          <a 
            href="http://t.me/unitedpressmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Chat with us on Telegram"
          >
            <Send size={20} />
          </a>
        </Button>
      </div>
    </>
  );
};

export default TelegramChat;
