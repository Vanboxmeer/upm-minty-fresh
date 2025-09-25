-- Add direct domain tracking functionality to affiliate system
CREATE TABLE public.affiliate_domains (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  tracking_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(affiliate_id, domain)
);

-- Enable Row Level Security
ALTER TABLE public.affiliate_domains ENABLE ROW LEVEL SECURITY;

-- Create policies for affiliate domain management
CREATE POLICY "Affiliates can view their own domains" 
ON public.affiliate_domains 
FOR SELECT 
USING (affiliate_id IN (
  SELECT id FROM public.affiliates 
  WHERE affiliate_email = (auth.jwt() ->> 'email')
));

CREATE POLICY "Affiliates can insert their own domains" 
ON public.affiliate_domains 
FOR INSERT 
WITH CHECK (affiliate_id IN (
  SELECT id FROM public.affiliates 
  WHERE affiliate_email = (auth.jwt() ->> 'email')
));

CREATE POLICY "Affiliates can update their own domains" 
ON public.affiliate_domains 
FOR UPDATE 
USING (affiliate_id IN (
  SELECT id FROM public.affiliates 
  WHERE affiliate_email = (auth.jwt() ->> 'email')
));

CREATE POLICY "Affiliates can delete their own domains" 
ON public.affiliate_domains 
FOR DELETE 
USING (affiliate_id IN (
  SELECT id FROM public.affiliates 
  WHERE affiliate_email = (auth.jwt() ->> 'email')
));

CREATE POLICY "Admins can view all domains" 
ON public.affiliate_domains 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = (auth.jwt() ->> 'email')
));

-- Add domain tracking to referrals table
ALTER TABLE public.referrals ADD COLUMN source_domain TEXT;
ALTER TABLE public.referrals ADD COLUMN referrer_domain TEXT;

-- Create index for better performance
CREATE INDEX idx_affiliate_domains_affiliate_id ON public.affiliate_domains(affiliate_id);
CREATE INDEX idx_referrals_source_domain ON public.referrals(source_domain);
CREATE INDEX idx_referrals_referrer_domain ON public.referrals(referrer_domain);

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_affiliate_domains_updated_at
BEFORE UPDATE ON public.affiliate_domains
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();