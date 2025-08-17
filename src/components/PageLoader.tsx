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
      {/* Logo with fill animation */}
      {logoLoaded && (
        <img 
          src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
          alt="UPM Logo" 
          className="w-24 h-24 md:w-32 md:h-32 object-contain animate-logo-fill"
        />
      )}
    </div>
  );
};

export default PageLoader;