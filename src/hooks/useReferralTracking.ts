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

  const updateReferralTracking = async (referralCode: string, sourceDomain?: string) => {
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
          status: 'visited',
          source_domain: sourceDomain || window.location.hostname,
          referrer_domain: document.referrer ? new URL(document.referrer).hostname : null
        });

      if (error) {
        console.log('Error tracking referral visit:', error);
      }
    } catch (error) {
      console.log('Referral tracking error:', error);
    }
  };

  const trackReferralVisit = async (referralCode: string) => {
    await updateReferralTracking(referralCode);
  };

  const trackDomainReferral = async (domain: string) => {
    try {
      const visitorId = getOrCreateVisitorId();
      
      // Track domain-based referral
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_code: null,
          referred_user_name: 'Domain Visitor',
          referred_user_email: `domain-visitor-${visitorId}@temp.com`,
          referrer_name: 'Domain Tracking',
          status: 'visited',
          source_domain: domain,
          referrer_domain: document.referrer ? new URL(document.referrer).hostname : null
        });

      if (error) {
        console.log('Error tracking domain referral:', error);
      }
    } catch (error) {
      console.log('Domain referral tracking error:', error);
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
    
    try {
      // Insert conversion tracking - whether from referral code or direct domain
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_code: referralCode || null,
          referred_user_name: customerName,
          referred_user_email: customerEmail,
          referrer_name: referralCode ? 'To be updated' : 'Direct Contact', // Will be updated by trigger if referral code exists
          status: 'converted',
          notes: `Conversion type: ${conversionType}`,
          source_domain: window.location.hostname,
          referrer_domain: document.referrer ? new URL(document.referrer).hostname : null
        });

      if (!error && referralCode) {
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
    trackConversion,
    trackDomainReferral
  };
};