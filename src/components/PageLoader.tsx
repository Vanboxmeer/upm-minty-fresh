import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const PageLoader = () => {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'hidden'>('loading');
  const [logoLoaded, setLogoLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Immediately remove the initial HTML loader
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.remove();
    }

    // Preload the logo
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = "/lovable-uploads/upm-logo.png";

    // Start fade out after minimum loading time
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 1000);

    // Fully hide after fade completes
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Don't show loader on mobile devices or when hidden
  if (isMobile || phase === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      }}
    >
      {/* Logo with fill animation - properly centered */}
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/upm-logo.png" 
          alt="UPM Logo" 
          className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain transition-all duration-300 ${
            logoLoaded ? 'opacity-100 scale-100 animate-logo-fill retro-logo-loader' : 'opacity-0 scale-95'
          }`}
        />
      </div>
    </div>
  );
};

export default PageLoader;