import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogPostEditor } from '@/components/admin/BlogPostEditor';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/hooks/useBlogPosts';
import { supabase } from '@/integrations/supabase/client';

export const BlogPostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { updatePost } = useBlogPosts();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setPost(data as BlogPost);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        navigate('/admin/blog');
      } finally {
        setFetching(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSave = async (data: Partial<BlogPost>) => {
    if (!id) return;
    
    setLoading(true);
    try {
      await updatePost(id, data);
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout title="Edit Post">
        <div className="space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout title="Post Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Post not found.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Post">
      <BlogPostEditor post={post} onSave={handleSave} loading={loading} />
    </AdminLayout>
  );
};
