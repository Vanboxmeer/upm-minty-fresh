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
      trackReferralVisit(refCode, 'referral_link');
    } else {
      // Check if visitor came from a tracked affiliate domain
      checkDomainReferral();
    }
  }, []);

  const checkDomainReferral = async () => {
    const referrerDomain = document.referrer ? new URL(document.referrer).hostname : null;
    
    if (referrerDomain && referrerDomain !== window.location.hostname) {
      try {
        // Check if this domain is tracked by any affiliate
        const { data: domainData } = await supabase
          .from('affiliate_domains')
          .select('affiliate_id, affiliates(affiliate_name, referral_code)')
          .eq('domain', referrerDomain)
          .eq('tracking_enabled', true)
          .maybeSingle();

        if (domainData) {
          // Store affiliate info for conversion tracking
          localStorage.setItem('affiliateFromDomain', JSON.stringify({
            affiliateId: domainData.affiliate_id,
            affiliateName: domainData.affiliates.affiliate_name,
            referralCode: domainData.affiliates.referral_code,
            sourceDomain: referrerDomain
          }));
          
          // Track the domain referral visit
          trackDomainReferralVisit(domainData.affiliates.affiliate_name, domainData.affiliates.referral_code, referrerDomain);
        }
      } catch (error) {
        console.log('Domain referral check error:', error);
      }
    }
  };

  const updateReferralTracking = async (referralCode: string, sourceDomain?: string, method: string = 'referral_link') => {
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
          referrer_domain: document.referrer ? new URL(document.referrer).hostname : null,
          referral_method: method
        });

      if (error) {
        console.log('Error tracking referral visit:', error);
      }
    } catch (error) {
      console.log('Referral tracking error:', error);
    }
  };

  const trackReferralVisit = async (referralCode: string, method: string = 'referral_link') => {
    await updateReferralTracking(referralCode, undefined, method);
  };

  const trackDomainReferralVisit = async (affiliateName: string, referralCode: string, sourceDomain: string) => {
    try {
      const visitorId = getOrCreateVisitorId();
      
      // Track domain-based referral visit
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_code: referralCode,
          referred_user_name: 'Domain Visitor',
          referred_user_email: `domain-visitor-${visitorId}@temp.com`,
          referrer_name: affiliateName,
          status: 'visited',
          source_domain: sourceDomain,
          referrer_domain: sourceDomain,
          referral_method: 'domain_tracking'
        });

      if (error) {
        console.log('Error tracking domain referral visit:', error);
      }
    } catch (error) {
      console.log('Domain referral visit tracking error:', error);
    }
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
    const affiliateFromDomain = localStorage.getItem('affiliateFromDomain');
    let affiliateInfo = null;
    
    if (affiliateFromDomain) {
      affiliateInfo = JSON.parse(affiliateFromDomain);
    }
    
    try {
      // Determine conversion method and details
      let method = 'direct';
      let refCode = null;
      let refName = 'Direct Contact';
      let sourceDomain = window.location.hostname;
      
      if (referralCode) {
        method = 'referral_link';
        refCode = referralCode;
        refName = 'To be updated';
      } else if (affiliateInfo) {
        method = 'domain_tracking';
        refCode = affiliateInfo.referralCode;
        refName = affiliateInfo.affiliateName;
        sourceDomain = affiliateInfo.sourceDomain;
      }
      
      // Insert conversion tracking - whether from referral code or direct domain
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_code: refCode,
          referred_user_name: customerName,
          referred_user_email: customerEmail,
          referrer_name: refName,
          status: 'converted',
          notes: `Conversion type: ${conversionType}`,
          source_domain: sourceDomain,
          referrer_domain: document.referrer ? new URL(document.referrer).hostname : null,
          referral_method: method
        });

      if (!error) {
        // Clear stored referral info after successful conversion
        if (referralCode) clearReferralCode();
        if (affiliateFromDomain) localStorage.removeItem('affiliateFromDomain');
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