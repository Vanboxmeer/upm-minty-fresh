import { useState, useEffect } from 'react';

export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    let hasShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop (window width >= 768px)
      if (window.innerWidth < 768) return;
      
      // Only trigger if mouse is leaving from the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setShowExitIntent(true);
        hasShown = true;
      }
    };

    // Prevent showing multiple times
    const handleMouseEnter = () => {
      if (hasShown) return;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const hideExitIntent = () => setShowExitIntent(false);

  return { showExitIntent, hideExitIntent };
};