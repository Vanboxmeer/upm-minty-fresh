import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, Share2, QrCode, Download, Loader2, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AffiliateData {
  id: string;
  affiliate_name: string;
  affiliate_email: string;
  referral_code: string;
  commission_rate: number;
  status: string;
}

interface StatsData {
  total_referrals: number;
  successful_referrals: number;
  commission_earned: number;
  link_visits?: number;
  link_conversions?: number;
  domain_visits?: number;
  domain_conversions?: number;
  total_visits?: number;
  total_conversions?: number;
  approved_conversions?: number;
}

interface AffiliateDomain {
  id: string;
  domain: string;
  tracking_enabled: boolean;
  created_at: string;
}

const PartnerDashboard = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [stats, setStats] = useState<StatsData>({ total_referrals: 0, successful_referrals: 0, commission_earned: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [domains, setDomains] = useState<AffiliateDomain[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set up meta tags
    document.title = "Partner Dashboard - UPM Affiliate Program";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access your UPM affiliate dashboard to track referrals, commissions, and manage your marketing materials.');
    }

    // Pre-fill email from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }

    // Auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      const userEmail = newSession?.user?.email ?? null;
      if (userEmail) {
        setIsLoading(true);
        // Defer DB calls to avoid deadlocks
        setTimeout(() => {
          loadAffiliate(userEmail)
            .catch(() => {/* handled in loadAffiliate */})
            .finally(() => setIsLoading(false));
        }, 0);
      }
    });

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const userEmail = session?.user?.email ?? null;
      if (userEmail) {
        setIsLoading(true);
        loadAffiliate(userEmail).finally(() => setIsLoading(false));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadAffiliate = async (emailAddress: string) => {
    try {
      // Fetch affiliate data
      const { data: affiliateData, error: affiliateError } = await supabase
        .from('affiliates')
        .select('*')
        .eq('affiliate_email', emailAddress)
        .single();

      if (affiliateError || !affiliateData) {
        // Check if there's an application but not approved
        const { data: statusCheck } = await supabase
          .from('affiliates')
          .select('status')
          .eq('affiliate_email', emailAddress)
          .maybeSingle();

        if (statusCheck) {
          if (statusCheck.status === 'pending') {
            throw new Error('Your affiliate application is still pending review. You will receive an email once it has been processed.');
          } else if (statusCheck.status === 'declined') {
            throw new Error('Your affiliate application was not approved. Please contact support for more information.');
          }
        }
        throw new Error('Affiliate account not found. Please apply for the affiliate program first.');
      }

      setAffiliate(affiliateData);
      
      // Fetch detailed stats using direct query
      const { data: detailedStats } = await supabase
        .from('referrals')
        .select(`
          *,
          approved,
          commission_amount
        `)
        .eq('referrer_code', affiliateData.referral_code);

      if (detailedStats && Array.isArray(detailedStats) && detailedStats.length > 0) {
        // Calculate stats from referrals data
        const totalVisits = detailedStats.length;
        const approvedConversions = detailedStats.filter(r => r.approved && r.status === 'converted').length;
        const totalCommission = detailedStats
          .filter(r => r.approved)
          .reduce((sum, r) => sum + (Number(r.commission_amount) || 0), 0);
          
        const linkVisits = detailedStats.filter(r => r.referral_method === 'link').length;
        const linkConversions = detailedStats.filter(r => r.referral_method === 'link' && r.approved && r.status === 'converted').length;
        const domainVisits = detailedStats.filter(r => r.referral_method === 'domain').length;
        const domainConversions = detailedStats.filter(r => r.referral_method === 'domain' && r.approved && r.status === 'converted').length;
        
        setStats({
          total_referrals: totalVisits,
          successful_referrals: approvedConversions,
          commission_earned: totalCommission,
        });
      } else {
        setStats({ 
          total_referrals: 0, 
          successful_referrals: 0, 
          commission_earned: 0,
          link_visits: 0,
          link_conversions: 0,
          domain_visits: 0,
          domain_conversions: 0,
          total_visits: 0,
          total_conversions: 0,
          approved_conversions: 0
        });
      }

      // Fetch affiliate domains
      const { data: domainsData } = await supabase
        .from('affiliate_domains')
        .select('*')
        .eq('affiliate_id', affiliateData.id)
        .order('created_at', { ascending: false });

      if (domainsData) {
        setDomains(domainsData);
      }

      setIsAuthenticated(true);
      toast({
        title: 'Welcome back!',
        description: 'Successfully accessed your affiliate dashboard.',
      });
    } catch (error: any) {
      console.error('Error loading affiliate:', error);
      toast({
        title: 'Access denied',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/partner-dashboard`;
      
      // Use custom affiliate login function instead of generic auth
      const { data, error } = await supabase.functions.invoke('send-affiliate-login-link', {
        body: { 
          email,
          redirectUrl 
        }
      });

      if (error) throw error;
      
      if (data?.error) {
        throw new Error(data.error);
      }

      setLinkSent(true);
      toast({
        title: 'Login link sent!',
        description: `We sent a secure login link to your UPM affiliate dashboard at ${email}`,
      });
    } catch (error: any) {
      toast({
        title: 'Sign-in failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: `${type} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again or copy manually',
        variant: 'destructive',
      });
    }
  };

  const generateQRCode = (url: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  const shareLink = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UPM Affiliate Link',
          url: url,
        });
      } catch (err) {
        copyToClipboard(url, 'Referral link');
      }
    } else {
      copyToClipboard(url, 'Referral link');
    }
  };

  const addDomain = async () => {
    if (!newDomain.trim() || !affiliate) return;

    try {
      // Basic domain validation
      const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!domainRegex.test(newDomain.trim())) {
        throw new Error('Please enter a valid domain name (e.g., example.com)');
      }

      const { error } = await supabase
        .from('affiliate_domains')
        .insert({
          affiliate_id: affiliate.id,
          domain: newDomain.trim().toLowerCase()
        });

      if (error) throw error;

      // Reload domains
      const { data: domainsData } = await supabase
        .from('affiliate_domains')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false });

      if (domainsData) {
        setDomains(domainsData);
      }

      setNewDomain("");
      toast({
        title: 'Domain added!',
        description: `${newDomain} is now being tracked for referrals.`,
      });
    } catch (error: any) {
      toast({
        title: 'Failed to add domain',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeDomain = async (domainId: string, domainName: string) => {
    if (!affiliate) return;

    try {
      const { error } = await supabase
        .from('affiliate_domains')
        .delete()
        .eq('id', domainId);

      if (error) throw error;

      setDomains(domains.filter(d => d.id !== domainId));
      toast({
        title: 'Domain removed',
        description: `${domainName} is no longer being tracked.`,
      });
    } catch (error: any) {
      toast({
        title: 'Failed to remove domain',
        description: error.message,
        variant: 'destructive',
      });
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
                <CardTitle>Partner Login</CardTitle>
                <CardDescription>
                  Enter your affiliate email to receive a secure magic link
                </CardDescription>
              </CardHeader>
              <CardContent>
                {linkSent ? (
                  <div className="text-center space-y-4">
                    <div className="text-sm text-muted-foreground">
                      We've sent a magic link to <strong>{email}</strong>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLinkSent(false);
                        setEmail('');
                      }}
                      className="w-full"
                    >
                      Send to different email
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your affiliate email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Login Link...
                        </>
                      ) : (
                        'Send Login Link'
                      )}
                    </Button>
                  </form>
                )}
                
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  New partner?{' '}
                  <a href="/affiliate-signup" className="text-primary hover:underline">
                    Apply to the Referral Program
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const referralLink = `https://unitedpress.media/?ref=${affiliate?.referral_code}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {affiliate?.affiliate_name}!</h1>
            <p className="text-muted-foreground">Manage your affiliate partnership and track your performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">👁️</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_visits || 0}</div>
                <p className="text-xs text-muted-foreground">All referral traffic</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">🎯</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_conversions || 0}</div>
                <p className="text-xs text-muted-foreground">Form submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Conversions</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">✅</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approved_conversions || 0}</div>
                <p className="text-xs text-muted-foreground">Admin approved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">💰</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.commission_earned}</div>
                <p className="text-xs text-muted-foreground">{affiliate?.commission_rate}% commission rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats by Method */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Referral Link Performance</CardTitle>
                <CardDescription>Stats from your direct referral link and QR code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Visits</span>
                  <span className="font-medium">{stats.link_visits || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversions</span>
                  <span className="font-medium">{stats.link_conversions || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <span className="font-medium">
                    {stats.link_visits > 0 ? ((stats.link_conversions / stats.link_visits) * 100).toFixed(1) : '0'}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Domain Tracking Performance</CardTitle>
                <CardDescription>Stats from your tracked domains</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Visits</span>
                  <span className="font-medium">{stats.domain_visits || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversions</span>
                  <span className="font-medium">{stats.domain_conversions || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <span className="font-medium">
                    {stats.domain_visits > 0 ? ((stats.domain_conversions / stats.domain_visits) * 100).toFixed(1) : '0'}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Your Referral Link */}
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
                <CardDescription>Share this link to earn commissions on referrals</CardDescription>
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
                
                <div>
                  <Label className="text-sm font-medium">Referral Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={affiliate?.referral_code || ''}
                      readOnly
                      className="font-mono text-lg"
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
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle>QR Code</CardTitle>
                <CardDescription>Share this QR code for easy mobile access</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-lg">
                  <img
                    src={generateQRCode(referralLink)}
                    alt="Referral QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generateQRCode(referralLink);
                    link.download = `UPM-Referral-QR-${affiliate?.referral_code}.png`;
                    link.click();
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Direct Domain Tracking */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Direct Domain Tracking</CardTitle>
              <CardDescription>
                Add domains you control to track referrals from direct traffic. Any conversions from these domains will be attributed to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  placeholder="example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDomain()}
                />
                <Button onClick={addDomain} disabled={!newDomain.trim()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Domain
                </Button>
              </div>

              {domains.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Tracked Domains</h4>
                  <div className="space-y-2">
                    {domains.map((domain) => (
                      <div key={domain.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{domain.domain}</span>
                          <Badge variant={domain.tracking_enabled ? "default" : "secondary"}>
                            {domain.tracking_enabled ? 'Active' : 'Paused'}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDomain(domain.id, domain.domain)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {domains.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No domains added yet. Add a domain to start tracking direct referrals.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="text-sm">{affiliate?.affiliate_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm">{affiliate?.affiliate_email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={affiliate?.status === 'approved' ? 'default' : 'secondary'}>
                    {affiliate?.status}
                  </Badge>
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