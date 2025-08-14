import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, Eye } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';
import { useToast } from '@/hooks/use-toast';

interface BlogPostsTableProps {
  posts: BlogPost[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const BlogPostsTable = ({ posts, onDelete, loading }: BlogPostsTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string, title: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
      toast({
        title: 'Post deleted',
        description: `"${title}" has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-md">
                    {post.excerpt || 'No excerpt'}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={post.status === 'published' ? 'default' : 'secondary'}
                >
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>
                {format(new Date(post.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {post.status === 'published' && (
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link to={`/admin/blog/edit/${post.id}`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        disabled={deletingId === post.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "{post.title}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.id, post.title)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};