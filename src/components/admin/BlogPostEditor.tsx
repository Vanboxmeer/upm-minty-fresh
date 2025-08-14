import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlogPost } from '@/hooks/useBlogPosts';
import { Save, Eye, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  featured_image: z.string().optional(),
  featured_image_alt: z.string().optional(),
  status: z.enum(['draft', 'published']),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  read_time: z.string().optional(),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (data: Partial<BlogPost>) => Promise<void>;
  loading?: boolean;
}

export const BlogPostEditor = ({ post, onSave, loading }: BlogPostEditorProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      author: post?.author || 'UPM Team',
      category: post?.category || 'Marketing',
      featured_image: post?.featured_image || '',
      featured_image_alt: post?.featured_image_alt || '',
      status: post?.status || 'draft',
      seo_title: post?.seo_title || '',
      seo_description: post?.seo_description || '',
      seo_keywords: post?.seo_keywords?.join(', ') || '',
      read_time: post?.read_time || '5 min read',
    },
  });

  const watchTitle = form.watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !post) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      form.setValue('slug', slug);
    }
  }, [watchTitle, form, post]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

      form.setValue('featured_image', publicUrl);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      const keywords = data.seo_keywords 
        ? data.seo_keywords.split(',').map(k => k.trim()).filter(Boolean)
        : [];

      const postData = {
        ...data,
        seo_keywords: keywords,
        publish_date: data.status === 'published' ? new Date().toISOString() : null,
      };

      await onSave(postData);
      toast({
        title: 'Success',
        description: `Post ${post ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${post ? 'update' : 'create'} post`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <Badge variant={form.watch('status') === 'published' ? 'default' : 'secondary'}>
            {form.watch('status')}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Editor' : 'Preview'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="post-url-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of your post..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <div className="bg-background border rounded-md">
                            <ReactQuill
                              theme="snow"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Write your blog post content..."
                              modules={{
                                toolbar: [
                                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                  ['bold', 'italic', 'underline', 'strike'],
                                  [{ 'align': [] }],
                                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                  [{ 'indent': '-1'}, { 'indent': '+1' }],
                                  ['blockquote', 'code-block'],
                                  ['link', 'image'],
                                  [{ 'color': [] }, { 'background': [] }],
                                  ['clean']
                                ]
                              }}
                              formats={[
                                'header', 'bold', 'italic', 'underline', 'strike',
                                'align', 'list', 'bullet', 'indent',
                                'blockquote', 'code-block', 'link', 'image',
                                'color', 'background'
                              ]}
                              style={{ minHeight: '300px' }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Web3">Web3</SelectItem>
                            <SelectItem value="Crypto">Crypto</SelectItem>
                            <SelectItem value="Press Release">Press Release</SelectItem>
                            <SelectItem value="Influencer">Influencer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="read_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Read Time</FormLabel>
                        <FormControl>
                          <Input placeholder="5 min read" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {form.watch('featured_image') && (
                    <div className="relative">
                      <img 
                        src={form.watch('featured_image')} 
                        alt="Featured"
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => form.setValue('featured_image', '')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      disabled={uploading}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="featured_image_alt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Image description..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seo_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO optimized title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="SEO meta description..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo_keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <Button type="submit" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};