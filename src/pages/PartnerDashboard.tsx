import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Copy, QrCode, Users, DollarSign, TrendingUp, Share2 } from 'lucide-react';
import { updateMetaTags } from '@/utils/seoUtils';

interface AffiliateData {
  id: string;
  affiliate_name: string;
  affiliate_email: string;
  company: string;
  referral_code: string;
  commission_rate: number;
  status: string;
}

interface StatsData {
  total_referrals: number;
  successful_referrals: number;
  commission_earned: number;
}

const PartnerDashboard = () => {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    updateMetaTags({
      title: 'Partner Dashboard | UPM Affiliates',
      description: 'Access your affiliate dashboard to track referrals, commissions, and manage your partnership with UPM.',
      keywords: 'affiliate dashboard, partner portal, referral tracking, commissions',
      canonical: 'https://unitedpress.media/partner-dashboard'
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if affiliate exists
      const { data: affiliateData, error: affiliateError } = await supabase
        .from('affiliates')
        .select('*')
        .eq('affiliate_email', email)
        .eq('status', 'active')
        .single();

      if (affiliateError || !affiliateData) {
        throw new Error('Affiliate not found or inactive');
      }

      setAffiliate(affiliateData);
      
      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .from('referral_stats')
        .select('*')
        .eq('affiliate_id', affiliateData.id)
        .single();

      if (statsData) {
        setStats(statsData);
      } else {
        setStats({ total_referrals: 0, successful_referrals: 0, commission_earned: 0 });
      }

      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "Successfully accessed your affiliate dashboard.",
      });
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: "Affiliate account not found or inactive. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const generateQRCode = (url: string) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    return qrUrl;
  };

  const shareLink = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'UPM Digital Marketing Services',
        text: 'Check out UPM for professional digital marketing services',
        url: url,
      });
    } else {
      copyToClipboard(url, 'Referral link');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Partner Dashboard Access</CardTitle>
                <CardDescription>
                  Enter your affiliate email to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your affiliate email"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Accessing...' : 'Access Dashboard'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const referralLink = `https://unitedpress.media/?ref=${affiliate?.referral_code}`;
  const qrCodeUrl = generateQRCode(referralLink);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {affiliate?.affiliate_name}!
            </h1>
            <p className="text-muted-foreground">
              Manage your affiliate partnership and track your performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.total_referrals || 0}</div>
                <p className="text-xs text-muted-foreground">All time referrals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Referrals</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.successful_referrals || 0}</div>
                <p className="text-xs text-muted-foreground">Converted referrals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats?.commission_earned || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {affiliate?.commission_rate}% commission rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Tools */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
                <CardDescription>
                  Share this link to earn commissions on referrals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(referralLink, 'Referral link')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => shareLink(referralLink)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Referral Code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={affiliate?.referral_code || ''}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(affiliate?.referral_code || '', 'Referral code')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Code</CardTitle>
                <CardDescription>
                  Share this QR code for easy mobile access
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <img
                  src={qrCodeUrl}
                  alt="Referral QR Code"
                  className="w-48 h-48 border rounded-lg"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = qrCodeUrl;
                    link.download = `UPM-Referral-QR-${affiliate?.referral_code}.png`;
                    link.click();
                  }}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Name</Label>
                  <p className="text-foreground font-medium">{affiliate?.affiliate_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-foreground font-medium">{affiliate?.affiliate_email}</p>
                </div>
                <div>
                  <Label>Company</Label>
                  <p className="text-foreground font-medium">{affiliate?.company || 'Not specified'}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="text-foreground font-medium capitalize">{affiliate?.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerDashboard;