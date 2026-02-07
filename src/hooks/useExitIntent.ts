import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const EXIT_INTENT_STORAGE_KEY = 'exitIntentLastShown';
const EXIT_INTENT_COOLDOWN_DAYS = 7;

export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    let hasShown = false;
    let isReady = false;

    // Check if shown within the cooldown period (7 days)
    const lastShown = localStorage.getItem(EXIT_INTENT_STORAGE_KEY);
    if (lastShown) {
      const daysSinceShown = (Date.now() - Number(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < EXIT_INTENT_COOLDOWN_DAYS) {
        hasShown = true;
      }
    }

    // Don't show for logged-in users (admin or otherwise)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        hasShown = true;
      }
    });

    // Only allow exit intent after 45 seconds on site
    const readyTimer = setTimeout(() => {
      isReady = true;
    }, 45000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      if (!isReady || hasShown) return;
      
      if (e.clientY <= 0) {
        setShowExitIntent(true);
        hasShown = true;
        localStorage.setItem(EXIT_INTENT_STORAGE_KEY, String(Date.now()));
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