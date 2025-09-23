import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();

  React.useEffect(() => {
    updateMetaTags({
      title: 'Join Our Affiliate Program | UPM',
      description: 'Become a UPM affiliate partner and earn commissions by referring clients to our digital marketing services.',
      keywords: 'affiliate program, partnership, digital marketing referrals, earn commissions',
      canonical: 'https://unitedpress.media/affiliate-signup'
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { data, error } = await supabase.functions.invoke('process-affiliate-application', {
      body: formData,
    });

    if (error) throw new Error(error.message || 'Failed to submit application');
    if ((data as any)?.error) throw new Error((data as any).error);

    toast({
      title: 'Account Created Successfully!',
      description: 'Your affiliate account is ready. You can now log in to your partner dashboard.',
    });

    const email = formData.affiliate_email;
    setFormData({ affiliate_name: '', affiliate_email: '', company: '' });

    setTimeout(() => {
      window.location.href = `/partner-dashboard?email=${encodeURIComponent(email)}`;
    }, 1500);
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error?.message || 'Failed to submit application. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join Our Affiliate Program
            </h1>
            <p className="text-xl text-muted-foreground">
              Partner with UPM and earn commissions by referring clients to our digital marketing services
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Affiliate Application</CardTitle>
              <CardDescription>
                Fill out the form below to apply for our affiliate program
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

<Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Already a partner? <a href="/partner-dashboard" className="text-primary hover:underline">Access your dashboard</a>
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Program Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 10% commission on all referrals</li>
                  <li>• Monthly commission payouts</li>
                  <li>• Dedicated affiliate dashboard</li>
                  <li>• Marketing materials provided</li>
                  <li>• Real-time tracking & reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Apply and get approved</li>
                  <li>• Receive your unique referral link</li>
                  <li>• Share with your network</li>
                  <li>• Earn commissions on successful referrals</li>
                  <li>• Track performance in your dashboard</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AffiliateSignup;