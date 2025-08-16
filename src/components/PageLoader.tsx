import { useEffect, useState } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Simulate minimum loading time and wait for page to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Preload the logo
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = "/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png";

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="relative">
        {/* Logo container with fill animation */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          {/* Background circle that fills */}
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
          
          {/* Logo with fade and scale animation */}
          {logoLoaded && (
            <img 
              src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
              alt="UPM Logo" 
              className="absolute inset-0 w-full h-full object-contain animate-scale-in"
            />
          )}
          
          {/* Spinning border */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground animate-fade-in">Loading UPM Platform...</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;