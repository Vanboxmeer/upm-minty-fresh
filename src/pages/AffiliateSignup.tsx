import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags } from '@/utils/seoUtils';

const AffiliateSignup = () => {
  const [formData, setFormData] = useState({
    affiliate_name: '',
    affiliate_email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    updateMetaTags({
      title: 'Referral Program | UPM',
      description: 'Refer clients to UPM and earn a 10% commission. Free to join, no exclusivity, and your referral link works the moment you sign up.',
      keywords: 'referral program, affiliate program, partnership, digital marketing referrals, commission',
      canonical: 'https://unitedpress.media/affiliate-signup'
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const referralLink = referralCode
    ? `https://unitedpress.media/?ref=${referralCode}`
    : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({ title: 'Copied', description: 'Your referral link is on the clipboard.' });
    } catch {
      toast({
        title: 'Could not copy',
        description: 'Select the link and copy it manually.',
        variant: 'destructive'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-affiliate-application', {
        body: formData,
      });

      const payload = (data ?? {}) as any;
      // Signing up twice is not a failure: the function hands back the existing code,
      // so show the link rather than an error.
      const existingCode = payload?.referral_code ?? null;

      if (error && !existingCode) {
        throw new Error(error.message || 'Failed to submit application');
      }
      if (payload?.error && !existingCode) {
        throw new Error(payload.error);
      }

      setReferralCode(existingCode);
      setFormData({ affiliate_name: '', affiliate_email: '', company: '' });

      toast({
        title: payload?.error ? 'You were already signed up' : 'You are signed up',
        description: existingCode
          ? 'Your referral link is ready below.'
          : 'We have your details and will be in touch with your referral link.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to submit. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Refer a Client, Earn a Commission
            </h1>
            <p className="text-xl text-muted-foreground">
              Know a brand that needs press, creators or content? Send them our way and take
              10% of what they spend with us.
            </p>
          </div>

          {referralCode ? (
            <Card className="border-primary/40">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <CheckCircle2 className="h-5 w-5" />
                  <CardTitle>You&apos;re in</CardTitle>
                </div>
                <CardDescription>
                  This is your referral link. Save it somewhere &mdash; anyone who arrives through it is
                  tagged to your code.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input readOnly value={referralLink} className="font-mono text-sm" />
                  <Button onClick={copyLink} className="shrink-0">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your referral code is <span className="font-mono text-foreground">{referralCode}</span>.
                  Questions about a referral or your commission? Email{' '}
                  <a href="mailto:brad@unitedpress.media" className="text-primary hover:underline">
                    brad@unitedpress.media
                  </a>{' '}
                  and we will check it for you.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Join the Referral Program</CardTitle>
                <CardDescription>
                  Two fields and you are done. Your link is generated straight away.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="affiliate_name">Full Name *</Label>
                    <Input
                      id="affiliate_name"
                      name="affiliate_name"
                      type="text"
                      required
                      value={formData.affiliate_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliate_email">Email Address *</Label>
                    <Input
                      id="affiliate_email"
                      name="affiliate_email"
                      type="email"
                      required
                      value={formData.affiliate_email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter your company name (optional)"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing you up...' : 'Get My Referral Link'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What you get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>&bull; 10% commission on what your referral spends with us</li>
                  <li>&bull; A referral link that works the moment you sign up</li>
                  <li>&bull; Visits through your link tagged to you automatically</li>
                  <li>&bull; Free to join, and nothing exclusive on your side</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How it works</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>&bull; Sign up with your name and email</li>
                  <li>&bull; Copy your referral link from the confirmation</li>
                  <li>&bull; Share it wherever your audience is</li>
                  <li>&bull; Commission is confirmed with you directly on any referral that becomes a client</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </>
  );
};

export default AffiliateSignup;
