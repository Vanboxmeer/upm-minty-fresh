import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { auditLogger } from '@/utils/auditLogger';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import type { Database } from '@/integrations/supabase/types';

type DatabaseBlogPost = Database['public']['Tables']['blog_posts']['Row'];

export interface SocialEmbed {
  platform: string;
  embed_code: string;
}

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
  categories?: string[] | null;
  read_time: string | null;
  social_embeds?: any; // JSON from DB, cast to SocialEmbed[] at usage
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user } = useAdminAuth();
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const INITIAL_POSTS = 12;
  const POSTS_PER_LOAD = 6;

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
  const fetchPublicPosts = useCallback(async (resetPagination = true, categoryFilter?: string) => {
    try {
      setLoading(true);
      const { data: allPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published');
      
      if (error) throw error;
      
      // Get current date/time in UTC to ensure consistent comparison
      const now = new Date();
      
      // Filter posts client-side to ensure proper date comparison and category filtering
      const filteredPosts = (allPosts || []).filter(post => {
        // Date filter
        if (post.publish_date && new Date(post.publish_date) > now) return false;
        
        // Category filter
        if (categoryFilter) {
          const postCategories = post.categories || (post.category ? [post.category] : []);
          return postCategories.some(cat => cat.toLowerCase() === categoryFilter.toLowerCase());
        }
        
        return true;
      });
      
      // Sort by publish_date (desc), then created_at (desc)  
      const sortedPosts = filteredPosts.sort((a, b) => {
        const aDate = new Date(a.publish_date || a.created_at);
        const bDate = new Date(b.publish_date || b.created_at);
        return bDate.getTime() - aDate.getTime();
      });
      
      setPosts(sortedPosts as BlogPost[]);
      
      // Only reset displayed posts if explicitly requested (initial load)
      if (resetPagination) {
        setDisplayedPosts(sortedPosts.slice(0, INITIAL_POSTS) as BlogPost[]);
        setCurrentPage(1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    
    // Calculate how many posts to show next
    const currentCount = displayedPosts.length;
    const nextCount = currentCount + POSTS_PER_LOAD;
    
    // Add more posts to displayed posts
    const newDisplayedPosts = posts.slice(0, nextCount);
    
    setTimeout(() => {
      setDisplayedPosts(newDisplayedPosts);
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 300); // Small delay for better UX
  };

  const hasMorePosts = displayedPosts.length < posts.length;

  const createPost = async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating post with data:', postData);
      
      // Prepare data for database insert
      const insertData = {
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        author: postData.author,
        featured_image: postData.featured_image || null,
        featured_image_alt: postData.featured_image_alt || null,
        status: postData.status,
        publish_date: postData.publish_date || null,
        seo_title: postData.seo_title || null,
        seo_description: postData.seo_description || null,
        seo_keywords: postData.seo_keywords || null,
        category: postData.category || null,
        categories: postData.categories || null,
        read_time: postData.read_time || null,
        social_embeds: postData.social_embeds || [],
      };
      
      console.log('Insert data prepared:', insertData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(insertData)
        .select()
        .maybeSingle();
      
      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      if (!data) throw new Error('Failed to create post - no data returned');
      
      await fetchPosts();
      toast.success('Post created successfully!');
      return data;
    } catch (err) {
      console.error('Create post error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      toast.error(`Failed to create post: ${errorMessage}`);
      throw new Error(errorMessage);
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

  const getPostBySlug = useCallback(async (slug: string) => {
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
  }, []);

  const getRelatedPosts = async (currentPostId: string, categories: string[], limit = 3) => {
    try {
      const { data: allPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentPostId);
      
      if (error) throw error;
      
      const now = new Date();
      
      // Filter out future posts
      const validPosts = (allPosts || []).filter(post => {
        if (post.publish_date && new Date(post.publish_date) > now) return false;
        return true;
      });

      console.log('Valid posts for related:', validPosts.length);
      console.log('Current post categories:', categories);

      let relatedPosts: BlogPost[] = [];
      
      // 1. First priority: Find posts with matching categories
      if (categories.length > 0) {
        const categoryMatches = validPosts.filter(post => {
          const postCategories = post.categories || (post.category ? [post.category] : []);
          return postCategories.some(cat => categories.includes(cat));
        });
        
          console.log('Category matches found:', categoryMatches.length);
        relatedPosts = categoryMatches.slice(0, limit) as BlogPost[];
      }
      
      // 2. Second priority: If we need more, find posts with matching keywords/tags
      if (relatedPosts.length < limit) {
        const usedIds = new Set(relatedPosts.map(p => p.id));
        const remainingPosts = validPosts.filter(p => !usedIds.has(p.id));
        
        const { data: currentPost } = await supabase
          .from('blog_posts')
          .select('seo_keywords')
          .eq('id', currentPostId)
          .single();
        
        const currentKeywords = currentPost?.seo_keywords || [];
        console.log('Current post keywords:', currentKeywords);
        
        if (currentKeywords.length > 0) {
          const tagMatches = remainingPosts.filter(post => {
            const postKeywords = post.seo_keywords || [];
            return postKeywords.some(keyword => currentKeywords.includes(keyword));
          });
          
          console.log('Tag matches found:', tagMatches.length);
          const neededCount = limit - relatedPosts.length;
          relatedPosts = [...relatedPosts, ...tagMatches.slice(0, neededCount)] as BlogPost[];
        }
      }
      
      // 3. Third priority: If we still need more, add recent posts
      if (relatedPosts.length < limit) {
        const usedIds = new Set(relatedPosts.map(p => p.id));
        const remainingPosts = validPosts
          .filter(p => !usedIds.has(p.id))
          .sort((a, b) => {
            const aDate = new Date(a.publish_date || a.created_at);
            const bDate = new Date(b.publish_date || b.created_at);
            return bDate.getTime() - aDate.getTime();
          });
        
        const neededCount = limit - relatedPosts.length;
        console.log('Adding recent posts:', neededCount);
        relatedPosts = [...relatedPosts, ...remainingPosts.slice(0, neededCount)] as BlogPost[];
      }
      
      console.log('Final related posts count:', relatedPosts.length);
      return relatedPosts.slice(0, limit);
    } catch (err) {
      console.error('Failed to fetch related posts:', err);
      return [];
    }
  };

  const getAdjacentPosts = async (currentPost: BlogPost) => {
    try {
      const { data: allPosts, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, publish_date, created_at')
        .eq('status', 'published');
      
      if (error) throw error;
      
      const now = new Date();
      
      // Filter out future posts and sort by publish date (newest first)
      const validPosts = (allPosts || [])
        .filter(post => {
          if (post.publish_date && new Date(post.publish_date) > now) return false;
          return true;
        })
        .sort((a, b) => {
          const aDate = new Date(a.publish_date || a.created_at);
          const bDate = new Date(b.publish_date || b.created_at);
          return bDate.getTime() - aDate.getTime();
        });
      
      console.log('All valid posts for navigation:', validPosts.length);
      console.log('Current post ID:', currentPost.id);
      
      // Find current post's index in the sorted array
      const currentIndex = validPosts.findIndex(post => post.id === currentPost.id);
      console.log('Current post index:', currentIndex);
      
      if (currentIndex === -1) {
        console.log('Current post not found in valid posts');
        return { nextPost: null, previousPost: null };
      }
      
      // Previous post (newer) is at index - 1
      const previousPost = currentIndex > 0 ? validPosts[currentIndex - 1] : null;
      
      // Next post (older) is at index + 1
      const nextPost = currentIndex < validPosts.length - 1 ? validPosts[currentIndex + 1] : null;
      
      console.log('Previous post:', previousPost?.title);
      console.log('Next post:', nextPost?.title);
      
      return { 
        nextPost: nextPost ? {
          id: nextPost.id,
          title: nextPost.title,
          slug: nextPost.slug
        } : null,
        previousPost: previousPost ? {
          id: previousPost.id,
          title: previousPost.title,
          slug: previousPost.slug
        } : null
      };
    } catch (err) {
      console.error('Failed to fetch adjacent posts:', err);
      return { nextPost: null, previousPost: null };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    displayedPosts,
    loading,
    loadingMore,
    error,
    hasMorePosts,
    loadMore,
    fetchPosts,
    fetchPublicPosts,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
    getRelatedPosts,
    getAdjacentPosts,
  };
};