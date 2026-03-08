import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogPostEditor } from '@/components/admin/BlogPostEditor';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/hooks/useBlogPosts';

export const BlogPostCreate = () => {
  const [loading, setLoading] = useState(false);
  const { createPost } = useBlogPosts();
  const navigate = useNavigate();

  const handleSave = async (data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await createPost(data);
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
