import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, Rocket, Newspaper, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isExternal?: boolean;
  isPrimary?: boolean;
}

const navItems: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/" },
  { icon: <LayoutGrid className="w-5 h-5" />, label: "Services", href: "/services" },
  { icon: <Rocket className="w-5 h-5" />, label: "Start", href: "/#packages", isPrimary: true },
  { icon: <Newspaper className="w-5 h-5" />, label: "Blog", href: "/blog" },
  { icon: <MessageCircle className="w-5 h-5" />, label: "Chat", href: "http://t.me/unitedpressmedia", isExternal: true },
];

const MobileBottomNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Always show after stopping scroll
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
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

  const handleNavClick = (href: string) => {
    if (href === "/#packages") {
      if (location.pathname === "/") {
        const packagesSection = document.getElementById("packages");
        packagesSection?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300",
        "bg-background/95 backdrop-blur-md border-t border-border/50",
        "pb-[env(safe-area-inset-bottom)]",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 py-2",
                  "text-muted-foreground hover:text-foreground transition-colors"
                )}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }

          if (item.isPrimary) {
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className="flex flex-col items-center justify-center gap-1 flex-1 -mt-4"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium text-primary">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
