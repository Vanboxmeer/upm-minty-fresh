import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { ContentFreshnessWidget } from '@/components/admin/ContentFreshnessWidget';
import { 
  FileText, Users, TrendingUp, Mail, Clock, CheckCircle,
  ArrowRight, BarChart3, Settings, Eye, Heart, Download,
  Activity, Newspaper, UserPlus, RefreshCw
} from 'lucide-react';
import { updateMetaTags } from '@/utils/seoUtils';
import { toast } from '@/hooks/use-toast';

interface Subscriber {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

interface RecentPost {
  id: string;
  title: string;
  status: string;
  publish_date: string | null;
  created_at: string;
}

interface RecentAffiliate {
  id: string;
  affiliate_name: string;
  affiliate_email: string;
  status: string;
  created_at: string;
}

interface DashboardData {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  total_claps: number;
  total_affiliates: number;
  pending_affiliates: number;
  approved_affiliates: number;
  newsletter_subscribers: number;
  recent_subscribers: Subscriber[];
  recent_posts: RecentPost[];
  recent_affiliates: RecentAffiliate[];
}

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [healthChecking, setHealthChecking] = useState(false);
  const [healthResults, setHealthResults] = useState<Record<string, 'ok' | 'error' | 'checking'>>({});

  useEffect(() => {
    updateMetaTags({
      title: 'Admin Dashboard | UPM',
      description: 'UPM Admin Dashboard - Manage content, affiliates, and analytics.',
    });
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.rpc('get_admin_dashboard_stats');
      if (error) throw error;
      setData(result as unknown as DashboardData);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({ title: 'Error loading dashboard', description: 'Could not fetch stats. Make sure you are logged in as admin.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const exportSubscribersCSV = () => {
    if (!data?.recent_subscribers?.length) return;
    const rows = [['Email', 'Source', 'Subscribed']];
    data.recent_subscribers.forEach(s => {
      rows.push([s.email, s.source || 'direct', new Date(s.created_at).toLocaleDateString()]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const checkHealth = async () => {
    setHealthChecking(true);
    const functions = ['rss-feed', 'generate-sitemap'];
    const results: Record<string, 'ok' | 'error' | 'checking'> = {};
    functions.forEach(f => { results[f] = 'checking'; });
    setHealthResults({ ...results });

    await Promise.all(functions.map(async (fn) => {
      try {
        const { error } = await supabase.functions.invoke(fn, {
          method: 'POST',
          body: {},
        });
        results[fn] = error ? 'error' : 'ok';
      } catch {
        results[fn] = 'error';
      }
    }));
    
    setHealthResults({ ...results });
    setHealthChecking(false);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Admin Dashboard">
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  const stats = data || {
    total_posts: 0, published_posts: 0, draft_posts: 0, total_claps: 0,
    total_affiliates: 0, pending_affiliates: 0, approved_affiliates: 0,
    newsletter_subscribers: 0, recent_subscribers: [], recent_posts: [], recent_affiliates: [],
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Control Panel</h2>
            <p className="text-muted-foreground">Manage content, affiliates, and monitor platform health</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchStats}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_posts}</div>
              <p className="text-xs text-muted-foreground">{stats.published_posts} published · {stats.draft_posts} drafts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Affiliates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_affiliates}</div>
              <p className="text-xs text-muted-foreground">{stats.approved_affiliates} active · {stats.pending_affiliates} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newsletter_subscribers}</div>
              <p className="text-xs text-muted-foreground">Total subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_claps.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Claps across all posts</p>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Subscribers Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Newsletter Subscribers</CardTitle>
                  <CardDescription>Recent signups ({stats.newsletter_subscribers} total)</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={exportSubscribersCSV}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {stats.recent_subscribers?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recent_subscribers.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sub.source || 'direct'}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-sm">No subscribers yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Management Areas */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Blog Management */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Manage posts and publishing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary"><Eye className="mr-1 h-3 w-3" />{stats.published_posts} Published</Badge>
                <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />{stats.draft_posts} Drafts</Badge>
              </div>
              <div className="space-y-2">
                <Link to="/admin/blog"><Button variant="outline" className="w-full justify-between">Manage Blog Posts<ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/admin/blog/new"><Button className="w-full justify-between">Create New Post<ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </CardContent>
          </Card>

          {/* Affiliate Management */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Affiliate Management</CardTitle>
                  <CardDescription>Review applications and partners</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                {stats.pending_affiliates > 0 ? (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" />{stats.pending_affiliates} Pending</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />All Reviewed</Badge>
                )}
                <Badge variant="outline"><Users className="mr-1 h-3 w-3" />{stats.approved_affiliates} Active</Badge>
              </div>
              <div className="space-y-2">
                <Link to="/admin/affiliates"><Button variant="outline" className="w-full justify-between">Manage Affiliates<ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recent_posts?.map((post) => (
                <div key={post.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <Newspaper className="h-4 w-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(post.publish_date || post.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={post.status === 'published' ? 'secondary' : 'outline'} className="shrink-0">{post.status}</Badge>
                </div>
              ))}
              {stats.recent_affiliates?.map((aff) => (
                <div key={aff.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <UserPlus className="h-4 w-4 text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{aff.affiliate_name}</p>
                    <p className="text-xs text-muted-foreground">{aff.affiliate_email}</p>
                  </div>
                  <Badge variant={aff.status === 'approved' ? 'secondary' : 'outline'} className="shrink-0">{aff.status}</Badge>
                </div>
              ))}
              {(!stats.recent_posts?.length && !stats.recent_affiliates?.length) && (
                <p className="text-muted-foreground text-sm">No recent activity.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Site Health / Heartbeat */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> Site Health</CardTitle>
              <Button variant="outline" size="sm" onClick={checkHealth} disabled={healthChecking}>
                {healthChecking ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Activity className="mr-2 h-4 w-4" />}
                Run Health Check
              </Button>
            </div>
            <CardDescription>Ping edge functions to verify they're responding</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(healthResults).length > 0 ? (
              <div className="grid gap-2 md:grid-cols-3">
                {Object.entries(healthResults).map(([fn, status]) => (
                  <div key={fn} className="flex items-center gap-2 p-3 rounded-lg border">
                    <span className={`h-2.5 w-2.5 rounded-full ${status === 'ok' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className="text-sm font-medium">{fn}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Click "Run Health Check" to test edge function endpoints.</p>
            )}
          </CardContent>
        </Card>

        {/* Content Freshness */}
        <ContentFreshnessWidget />

        {/* Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Analytics & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/ftjdmvdyeetiubmziwav" target="_blank" rel="noopener noreferrer">
                  <Settings className="mr-2 h-4 w-4" /> Supabase Dashboard
                </a>
              </Button>
              <Button variant="outline" className="justify-start" disabled>
                <BarChart3 className="mr-2 h-4 w-4" /> Analytics (Coming Soon)
              </Button>
              <Button variant="outline" className="justify-start" disabled>
                <Mail className="mr-2 h-4 w-4" /> Email Reports (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
