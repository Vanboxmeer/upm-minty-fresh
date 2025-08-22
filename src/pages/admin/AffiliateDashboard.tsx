import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, CheckCircle, XCircle, Clock, Users, Mail, Building, Calendar, StickyNote } from 'lucide-react';
import { format } from 'date-fns';

interface Affiliate {
  id: string;
  affiliate_name: string;
  affiliate_email: string;
  company: string | null;
  referral_code: string;
  status: string;
  application_date: string;
  approved_date: string | null;
  notes: string | null;
  commission_rate: number;
}

const AffiliateDashboard = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [filteredAffiliates, setFilteredAffiliates] = useState<Affiliate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAffiliates();
  }, []);

  useEffect(() => {
    filterAffiliates();
  }, [affiliates, searchTerm]);

  const fetchAffiliates = async () => {
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select('*')
        .order('application_date', { ascending: false });

      if (error) throw error;
      setAffiliates(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch affiliates: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterAffiliates = () => {
    if (!searchTerm) {
      setFilteredAffiliates(affiliates);
      return;
    }

    const filtered = affiliates.filter(affiliate =>
      affiliate.affiliate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.affiliate_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (affiliate.company && affiliate.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredAffiliates(filtered);
  };

  const handleStatusUpdate = async (affiliateId: string, newStatus: 'approved' | 'declined') => {
    setIsProcessing(true);
    
    try {
      // Update affiliate status
      const { error: updateError } = await supabase
        .from('affiliates')
        .update({ 
          status: newStatus,
          notes: actionNotes || null
        })
        .eq('id', affiliateId);

      if (updateError) throw updateError;

      // Send notification email
      const affiliate = affiliates.find(a => a.id === affiliateId);
      if (affiliate) {
        const { error: emailError } = await supabase.functions.invoke('send-affiliate-notification', {
          body: {
            affiliate_email: affiliate.affiliate_email,
            affiliate_name: affiliate.affiliate_name,
            status: newStatus,
            referral_code: affiliate.referral_code,
            notes: actionNotes
          }
        });

        if (emailError) {
          console.warn('Email notification failed:', emailError);
        }
      }

      toast({
        title: "Success",
        description: `Affiliate ${newStatus} and notification sent.`,
      });

      // Refresh data
      await fetchAffiliates();
      setSelectedAffiliate(null);
      setActionNotes('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to ${newStatus} affiliate: ` + error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'declined':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderAffiliateCards = (statusFilter: string) => {
    const filtered = filteredAffiliates.filter(affiliate => 
      statusFilter === 'all' || affiliate.status === statusFilter
    );

    if (filtered.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No {statusFilter === 'all' ? '' : statusFilter} affiliates found.
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((affiliate) => (
          <Card key={affiliate.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{affiliate.affiliate_name}</CardTitle>
                {getStatusBadge(affiliate.status)}
              </div>
              <CardDescription className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {affiliate.affiliate_email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {affiliate.company && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building className="w-4 h-4" />
                  {affiliate.company}
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Applied: {format(new Date(affiliate.application_date), 'MMM dd, yyyy')}
              </div>
              {affiliate.approved_date && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Approved: {format(new Date(affiliate.approved_date), 'MMM dd, yyyy')}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Code: <code className="bg-muted px-1 rounded">{affiliate.referral_code}</code>
              </div>
              {affiliate.notes && (
                <div className="flex items-start gap-1 text-sm text-muted-foreground">
                  <StickyNote className="w-4 h-4 mt-0.5" />
                  <span className="line-clamp-2">{affiliate.notes}</span>
                </div>
              )}
              
              {affiliate.status === 'pending' && (
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedAffiliate(affiliate)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Approve Affiliate</DialogTitle>
                        <DialogDescription>
                          Approve {affiliate.affiliate_name} as an affiliate partner?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notes">Notes (optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any notes about this approval..."
                            value={actionNotes}
                            onChange={(e) => setActionNotes(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setSelectedAffiliate(null);
                          setActionNotes('');
                        }}>
                          Cancel
                        </Button>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate(affiliate.id, 'approved')}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Approve'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => setSelectedAffiliate(affiliate)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Decline Affiliate</DialogTitle>
                        <DialogDescription>
                          Decline {affiliate.affiliate_name}'s affiliate application?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="decline-notes">Reason for decline</Label>
                          <Textarea
                            id="decline-notes"
                            placeholder="Provide a reason for declining this application..."
                            value={actionNotes}
                            onChange={(e) => setActionNotes(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setSelectedAffiliate(null);
                          setActionNotes('');
                        }}>
                          Cancel
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleStatusUpdate(affiliate.id, 'declined')}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Decline'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <AdminLayout title="Affiliate Management">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">Loading affiliates...</div>
        </div>
      </AdminLayout>
    );
  }

  const pendingCount = affiliates.filter(a => a.status === 'pending').length;
  const approvedCount = affiliates.filter(a => a.status === 'approved').length;
  const declinedCount = affiliates.filter(a => a.status === 'declined').length;

  return (
    <AdminLayout title="Affiliate Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliates.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Declined</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{declinedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search affiliates by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
            <TabsTrigger value="declined">Declined ({declinedCount})</TabsTrigger>
            <TabsTrigger value="all">All ({affiliates.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-6">
            {renderAffiliateCards('pending')}
          </TabsContent>
          
          <TabsContent value="approved" className="mt-6">
            {renderAffiliateCards('approved')}
          </TabsContent>
          
          <TabsContent value="declined" className="mt-6">
            {renderAffiliateCards('declined')}
          </TabsContent>
          
          <TabsContent value="all" className="mt-6">
            {renderAffiliateCards('all')}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AffiliateDashboard;