import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
        .order('created_at', { ascending: false });
      
      if (onlyPublished) {
        query = query.eq('status', 'published');
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
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const getPostBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data;
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
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
  };
};