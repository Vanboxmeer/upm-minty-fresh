import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { ContentFreshnessWidget } from '@/components/admin/ContentFreshnessWidget';
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Mail, 
  Clock, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Settings,
  Eye
} from 'lucide-react';
import { updateMetaTags } from '@/utils/seoUtils';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalAffiliates: number;
  pendingAffiliates: number;
  approvedAffiliates: number;
  newsletterSubscribers: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalAffiliates: 0,
    pendingAffiliates: 0,
    approvedAffiliates: 0,
    newsletterSubscribers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateMetaTags({
      title: 'Admin Dashboard | UPM',
      description: 'UPM Admin Dashboard - Manage content, affiliates, and analytics.',
    });
    
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch blog post stats
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('status');

      if (postsError) throw postsError;

      // Fetch affiliate stats
      const { data: affiliates, error: affiliatesError } = await supabase
        .from('affiliates')
        .select('status');

      if (affiliatesError) throw affiliatesError;

      // Fetch newsletter subscriber count
      const { count: subscriberCount, error: subscribersError } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });

      if (subscribersError) throw subscribersError;

      // Calculate stats
      const totalPosts = posts?.length || 0;
      const publishedPosts = posts?.filter(p => p.status === 'published').length || 0;
      const draftPosts = posts?.filter(p => p.status === 'draft').length || 0;
      
      const totalAffiliates = affiliates?.length || 0;
      const pendingAffiliates = affiliates?.filter(a => a.status === 'pending').length || 0;
      const approvedAffiliates = affiliates?.filter(a => a.status === 'approved').length || 0;

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalAffiliates,
        pendingAffiliates,
        approvedAffiliates,
        newsletterSubscribers: subscriberCount || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Admin Dashboard">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold mb-2">Welcome to UPM Admin</h2>
          <p className="text-muted-foreground">
            Manage your content, affiliates, and monitor your platform's performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedPosts} published, {stats.draftPosts} drafts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Affiliates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
              <p className="text-xs text-muted-foreground">
                {stats.approvedAffiliates} active, {stats.pendingAffiliates} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newsletterSubscribers}</div>
              <p className="text-xs text-muted-foreground">
                Total subscriptions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/admin/blog/new">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="mr-2 h-3 w-3" />
                    New Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Areas */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Blog Management */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Blog Management</CardTitle>
                    <CardDescription>Manage blog posts, content, and publishing</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Recent Activity</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      <Eye className="mr-1 h-3 w-3" />
                      {stats.publishedPosts} Published
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      {stats.draftPosts} Drafts
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link to="/admin/blog">
                  <Button variant="outline" className="w-full justify-between">
                    Manage Blog Posts
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/admin/blog/new">
                  <Button className="w-full justify-between">
                    Create New Post
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Affiliate Management */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Affiliate Management</CardTitle>
                    <CardDescription>Review applications and manage affiliate partners</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pending Reviews</p>
                  <div className="flex items-center gap-2">
                    {stats.pendingAffiliates > 0 ? (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Clock className="mr-1 h-3 w-3" />
                        {stats.pendingAffiliates} Pending
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        All Reviewed
                      </Badge>
                    )}
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      {stats.approvedAffiliates} Active
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link to="/admin/affiliates">
                  <Button variant="outline" className="w-full justify-between">
                    Manage Affiliates
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                {stats.pendingAffiliates > 0 && (
                  <Link to="/admin/affiliates">
                    <Button variant="secondary" className="w-full justify-between bg-yellow-50 hover:bg-yellow-100 text-yellow-800">
                      Review Pending ({stats.pendingAffiliates})
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Freshness Widget */}
        <ContentFreshnessWidget />

        {/* Additional Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics & Tools
            </CardTitle>
            <CardDescription>Monitor performance and access administrative tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline" className="justify-start" asChild>
                <a href="https://supabase.com/dashboard/project/ftjdmvdyeetiubmziwav" target="_blank" rel="noopener noreferrer">
                  <Settings className="mr-2 h-4 w-4" />
                  Supabase Dashboard
                </a>
              </Button>
              <Button variant="outline" className="justify-start" disabled>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics (Coming Soon)
              </Button>
              <Button variant="outline" className="justify-start" disabled>
                <Mail className="mr-2 h-4 w-4" />
                Email Reports (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;