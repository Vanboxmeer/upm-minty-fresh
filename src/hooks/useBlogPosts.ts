import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { auditLogger } from '@/utils/auditLogger';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import type { Database } from '@/integrations/supabase/types';

type DatabaseBlogPost = Database['public']['Tables']['blog_posts']['Row'];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  status: 'draft' | 'published';
  publish_date?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string[] | null;
  category: string | null;
  read_time: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAdminAuth();
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (onlyPublished = false) => {
    try {
      setLoading(true);
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('publish_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });
      
      if (onlyPublished) {
        query = query.eq('status', 'published');
        // For public view, only show posts with publish_date <= now() or null publish_date
        const now = new Date().toISOString();
        query = query.or(`publish_date.is.null,publish_date.lte.${now}`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setPosts((data || []) as BlogPost[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Separate method for public posts (published + not in future)
  const fetchPublicPosts = async () => {
    try {
      setLoading(true);
      const now = new Date().toISOString();
      const { data: allPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published');
      
      if (error) throw error;
      
      // Filter posts client-side to ensure proper date comparison
      const filteredPosts = (allPosts || []).filter(post => {
        if (!post.publish_date) return true; // Show posts without publish_date
        return new Date(post.publish_date) <= new Date(); // Only show posts with publish_date in past or now
      });
      
      // Sort by publish_date (desc), then created_at (desc)  
      const sortedPosts = filteredPosts.sort((a, b) => {
        const aDate = new Date(a.publish_date || a.created_at);
        const bDate = new Date(b.publish_date || b.created_at);
        return bDate.getTime() - aDate.getTime();
      });
      
      setPosts(sortedPosts as BlogPost[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();
      
      if (error) throw error;
      await fetchPosts();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      await fetchPosts();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  const deletePost = async (id: string) => {
    const postToDelete = posts.find(post => post.id === id);
    
    // Log the deletion attempt
    auditLogger.logBlogAction('delete_attempt', id, user?.id, user?.email, {
      postTitle: postToDelete?.title,
      postStatus: postToDelete?.status
    });
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchPosts();
      auditLogger.logBlogAction('delete_success', id, user?.id, user?.email, {
        postTitle: postToDelete?.title
      });
      toast.success('Post deleted successfully');
    } catch (err) {
      auditLogger.logBlogAction('delete_failed', id, user?.id, user?.email, { 
        error: err instanceof Error ? err.message : 'Unknown error' 
      });
      toast.error('Failed to delete post');
      throw new Error(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const getPostBySlug = async (slug: string) => {
    try {
      const { data: allPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published');
      
      if (error) throw error;
      
      if (!allPosts || allPosts.length === 0) {
        throw new Error('Post not found');
      }
      
      const post = allPosts[0];
      
      // Check if post is scheduled for future
      if (post.publish_date && new Date(post.publish_date) > new Date()) {
        throw new Error('Post not found'); // Hide future posts from public
      }
      
      return post;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Post not found');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPublicPosts,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
  };
};