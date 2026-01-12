import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Remove the initial HTML loader with a fade
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.style.opacity = '0';
      setTimeout(() => {
        initialLoader.remove();
      }, 500);
    }

    // Preload the logo
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = "/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png";

    // Start fade out after minimum loading time
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Remove loader after fade animation
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Don't show loader on mobile devices
  if (isMobile || !isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo with fill animation - properly centered */}
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
          alt="UPM Logo" 
          className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain transition-all duration-500 ${
            logoLoaded ? 'opacity-100 scale-100 animate-logo-fill retro-logo-loader' : 'opacity-0 scale-95'
          }`}
        />
      </div>
    </div>
  );
};

export default PageLoader;