import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogPostEditor } from '@/components/admin/BlogPostEditor';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/hooks/useBlogPosts';
import { usePostPublishing } from '@/hooks/usePostPublishing';

export const BlogPostCreate = () => {
  const [loading, setLoading] = useState(false);
  const { createPost } = useBlogPosts();
  const { triggerPostPublishing } = usePostPublishing();
  const navigate = useNavigate();

  const handleSave = async (data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const newPost = await createPost(data);
      if (data.status === 'published' && newPost?.id) {
        triggerPostPublishing(newPost.id);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Create New Post">
      <BlogPostEditor onSave={handleSave} loading={loading} />
    </AdminLayout>
  );
};