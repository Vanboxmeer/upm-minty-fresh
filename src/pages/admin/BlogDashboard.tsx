import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlogPostsTable } from '@/components/admin/BlogPostsTable';
import { useBlogPosts } from '@/hooks/useBlogPosts';

export const BlogDashboard = () => {
  const { posts, loading, deletePost } = useBlogPosts();

  return (
    <AdminLayout 
      title="Blog Management"
      action={
        <Link to="/admin/blog/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      }
    >
      <BlogPostsTable 
        posts={posts} 
        onDelete={deletePost}
        loading={loading}
      />
    </AdminLayout>
  );
};