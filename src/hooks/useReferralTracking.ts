import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useReferralTracking = () => {
  useEffect(() => {
    // Track referral visits
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
      // Store referral code in localStorage for later use
      localStorage.setItem('referralCode', refCode);
      
      // Track the visit (optional - you can implement visit tracking)
      console.log('Referral visit tracked:', refCode);
    }
  }, []);

  const getReferralCode = (): string | null => {
    return localStorage.getItem('referralCode');
  };

  const clearReferralCode = () => {
    localStorage.removeItem('referralCode');
  };

  return {
    getReferralCode,
    clearReferralCode
  };
};