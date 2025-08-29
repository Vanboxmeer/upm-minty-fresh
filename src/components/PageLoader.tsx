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
      {/* Logo with fill animation - properly centered */}
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
          alt="UPM Logo" 
          className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain transition-opacity duration-300 ${
            logoLoaded ? 'opacity-100 animate-logo-fill' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default PageLoader;