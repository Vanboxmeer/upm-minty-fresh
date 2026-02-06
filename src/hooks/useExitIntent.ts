import { useState, useEffect } from 'react';

export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    let hasShown = false;
    let isReady = false;

    // Only allow exit intent after 20 seconds on site
    const readyTimer = setTimeout(() => {
      isReady = true;
    }, 20000);

    // Also check sessionStorage so it only fires once per session
    const alreadyShownThisSession = sessionStorage.getItem('exitIntentShown');
    if (alreadyShownThisSession) {
      hasShown = true;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      if (!isReady || hasShown) return;
      
      if (e.clientY <= 0) {
        setShowExitIntent(true);
        hasShown = true;
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(readyTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const hideExitIntent = () => setShowExitIntent(false);

  return { showExitIntent, hideExitIntent };
};