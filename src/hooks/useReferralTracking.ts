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
      
      // Track the visit by inserting into referrals table
      trackReferralVisit(refCode);
    }
  }, []);

  const trackReferralVisit = async (referralCode: string) => {
    try {
      // Get visitor info (anonymous tracking)
      const visitorId = getOrCreateVisitorId();
      
      // Track the referral visit (we'll track conversions separately)
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_code: referralCode,
          referred_user_name: 'Anonymous Visitor',
          referred_user_email: `visitor-${visitorId}@temp.com`,
          referrer_name: 'Unknown', // Will be updated when we find the affiliate
          status: 'visited'
        });

      if (error) {
        console.log('Error tracking referral visit:', error);
      }
    } catch (error) {
      console.log('Referral tracking error:', error);
    }
  };

  const getOrCreateVisitorId = (): string => {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
  };

  const getReferralCode = (): string | null => {
    return localStorage.getItem('referralCode');
  };

  const clearReferralCode = () => {
    localStorage.removeItem('referralCode');
  };

  const trackConversion = async (customerName: string, customerEmail: string, conversionType: string = 'contact') => {
    const referralCode = getReferralCode();
    if (!referralCode) return;

    try {
      // Insert conversion tracking
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_code: referralCode,
          referred_user_name: customerName,
          referred_user_email: customerEmail,
          referrer_name: 'To be updated', // Will be updated by trigger
          status: 'converted',
          notes: `Conversion type: ${conversionType}`
        });

      if (!error) {
        // Clear referral code after successful conversion
        clearReferralCode();
      }
    } catch (error) {
      console.log('Error tracking conversion:', error);
    }
  };

  return {
    getReferralCode,
    clearReferralCode,
    trackConversion
  };
};