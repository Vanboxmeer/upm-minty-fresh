-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_name TEXT NOT NULL,
  referrer_email TEXT,
  referrer_code TEXT,
  referred_user_name TEXT NOT NULL,
  referred_user_email TEXT NOT NULL,
  referral_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create affiliates table
CREATE TABLE public.affiliates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_name TEXT NOT NULL,
  affiliate_email TEXT NOT NULL UNIQUE,
  company TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  signup_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create referral_stats table
CREATE TABLE public.referral_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  total_referrals INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  commission_earned DECIMAL(10,2) DEFAULT 0.00,
  last_referral_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Anyone can insert referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all referrals" 
ON public.referrals 
FOR SELECT 
USING (false); -- Only admins will be able to access via backend

-- Create policies for affiliates
CREATE POLICY "Anyone can insert affiliate applications" 
ON public.affiliates 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Affiliates can view their own data" 
ON public.affiliates 
FOR SELECT 
USING (affiliate_email = auth.jwt() ->> 'email');

CREATE POLICY "Affiliates can update their own data" 
ON public.affiliates 
FOR UPDATE 
USING (affiliate_email = auth.jwt() ->> 'email');

-- Create policies for referral_stats
CREATE POLICY "Affiliates can view their own stats" 
ON public.referral_stats 
FOR SELECT 
USING (affiliate_id IN (
  SELECT id FROM public.affiliates 
  WHERE affiliate_email = auth.jwt() ->> 'email'
));

-- Create function to generate unique referral codes
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.affiliates WHERE referral_code = code) INTO exists_check;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Create function to update referral stats
CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update stats when a referral is created
  IF TG_OP = 'INSERT' THEN
    -- Find affiliate by code or email
    INSERT INTO public.referral_stats (affiliate_id, total_referrals, last_referral_date)
    SELECT a.id, 1, NEW.referral_date
    FROM public.affiliates a
    WHERE (NEW.referrer_code IS NOT NULL AND a.referral_code = NEW.referrer_code)
       OR (NEW.referrer_email IS NOT NULL AND a.affiliate_email = NEW.referrer_email)
    ON CONFLICT (affiliate_id) DO UPDATE SET
      total_referrals = referral_stats.total_referrals + 1,
      last_referral_date = NEW.referral_date,
      updated_at = now();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger for referral stats updates
CREATE TRIGGER update_referral_stats_trigger
  AFTER INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_referral_stats();

-- Create trigger for affiliate updated_at
CREATE TRIGGER update_affiliates_updated_at
  BEFORE UPDATE ON public.affiliates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for referral_stats updated_at
CREATE TRIGGER update_referral_stats_updated_at
  BEFORE UPDATE ON public.referral_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_referrals_referrer_code ON public.referrals(referrer_code);
CREATE INDEX idx_referrals_referrer_email ON public.referrals(referrer_email);
CREATE INDEX idx_affiliates_referral_code ON public.affiliates(referral_code);
CREATE INDEX idx_affiliates_email ON public.affiliates(affiliate_email);
CREATE INDEX idx_referral_stats_affiliate_id ON public.referral_stats(affiliate_id);