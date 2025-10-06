import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ContentFreshness {
  id: string;
  post_id: string;
  last_reviewed_date: string;
  freshness_score: number;
  needs_update: boolean;
  update_suggestions: string[];
  post?: {
    title: string;
    slug: string;
    updated_at: string;
  };
}

export const useContentFreshness = () => {
  const [freshness, setFreshness] = useState<ContentFreshness[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFreshness();
  }, []);

  const fetchFreshness = async () => {
    try {
      const { data, error } = await supabase
        .from('content_freshness_tracking')
        .select(`
          *,
          post:blog_posts(title, slug, updated_at)
        `)
        .eq('needs_update', true)
        .order('freshness_score', { ascending: true });

      if (error) throw error;
      
      const formattedData = (data || []).map(item => ({
        ...item,
        post: Array.isArray(item.post) ? item.post[0] : item.post,
      }));
      
      setFreshness(formattedData);
    } catch (error) {
      console.error('Error fetching freshness:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsReviewed = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('content_freshness_tracking')
        .update({
          last_reviewed_date: new Date().toISOString(),
          needs_update: false,
          freshness_score: 100,
        })
        .eq('post_id', postId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Post marked as reviewed',
      });

      fetchFreshness();
    } catch (error) {
      console.error('Error marking as reviewed:', error);
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive',
      });
    }
  };

  const runFreshnessCheck = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('check-content-freshness');

      if (error) throw error;

      toast({
        title: 'Freshness Check Complete',
        description: `Checked ${data.checked} posts, found ${data.needsUpdate} needing updates`,
      });

      fetchFreshness();
    } catch (error) {
      console.error('Error running freshness check:', error);
      toast({
        title: 'Error',
        description: 'Failed to run freshness check',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    freshness,
    loading,
    markAsReviewed,
    runFreshnessCheck,
  };
};