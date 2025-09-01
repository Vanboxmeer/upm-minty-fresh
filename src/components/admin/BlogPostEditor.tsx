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
import { Combobox } from '@/components/ui/combobox';
import { TagInput } from '@/components/ui/tag-input';
import { BlogPost } from '@/hooks/useBlogPosts';
import { Save, Eye, Upload, X, Smile } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EmojiPickerComponent } from './EmojiPicker';
import { ImageGallery, type GalleryImage } from './ImageGallery';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  featured_image: z.string().optional(),
  featured_image_alt: z.string().optional(),
  gallery_images: z.array(z.object({
    id: z.string(),
    url: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })).optional(),
  status: z.enum(['draft', 'published']),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.array(z.string()).optional(),
  read_time: z.string().optional(),
  publish_date: z.string().optional(),
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
  const [contentMode, setContentMode] = useState<'rich' | 'html'>('rich');
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [categories] = useState<string[]>([
    'Marketing', 'Web3', 'Crypto', 'Press Release', 'Influencer', 'SEO', 'Social Media', 'Content Marketing', 'Paid Advertising', 'Analytics'
  ]);
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
      gallery_images: (post as any)?.gallery_images?.filter((img: any) => 
        img.id && img.url && img.alt
      ) || [],
      status: post?.status || 'draft',
      seo_title: post?.seo_title || '',
      seo_description: post?.seo_description || '',
      seo_keywords: post?.seo_keywords || [],
      read_time: post?.read_time || '5 min read',
      publish_date: post?.publish_date ? (() => {
        const date = new Date(post.publish_date);
        // Convert to local time for datetime-local input
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return localDate.toISOString().slice(0, 16);
      })() : '',
    },
  });

  const watchPublishDate = form.watch('publish_date');
  const watchStatus = form.watch('status');
  const watchTitle = form.watch('title');
  
  // Check if post is scheduled for future
  const isScheduled = watchPublishDate && new Date(watchPublishDate) > new Date();
  
  // Determine display status
  const getStatusDisplay = () => {
    if (isScheduled) return 'Scheduled';
    return watchStatus;
  };

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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image must be smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(error.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

      form.setValue('featured_image', publicUrl);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const insertEmojiAtCursor = (emoji: string) => {
    const content = form.getValues('content');
    if (contentMode === 'rich') {
      // For rich text editor, we'll insert at the end for simplicity
      form.setValue('content', content + emoji);
    } else {
      // For HTML mode, insert at cursor position or end
      if (cursorPosition !== null) {
        const newContent = content.slice(0, cursorPosition) + emoji + content.slice(cursorPosition);
        form.setValue('content', newContent);
        setCursorPosition(cursorPosition + emoji.length);
      } else {
        form.setValue('content', content + emoji);
      }
    }
  };

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      const keywords = Array.isArray(data.seo_keywords) ? data.seo_keywords : [];

      let finalStatus = data.status;
      let publishDate: string | null = null;

      if (data.publish_date) {
        // datetime-local input gives us local time, convert properly to UTC
        const localDate = new Date(data.publish_date);
        publishDate = localDate.toISOString();
        
        // If publish date is in the future, automatically set status to draft
        if (localDate > new Date()) {
          finalStatus = 'draft';
          toast({
            title: 'Post Scheduled',
            description: `Post scheduled for ${localDate.toLocaleString()}. Status set to draft until publish time.`,
          });
        }
      } else if (data.status === 'published') {
        // If no publish date but status is published, set publish date to now
        publishDate = new Date().toISOString();
      }

      const postData = {
        ...data,
        status: finalStatus,
        seo_keywords: keywords,
        publish_date: publishDate,
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
          <Badge variant={isScheduled ? 'outline' : (watchStatus === 'published' ? 'default' : 'secondary')}>
            {getStatusDisplay()}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setContentMode(contentMode === 'rich' ? 'html' : 'rich')}
          >
            {contentMode === 'rich' ? 'HTML' : 'Rich'}
          </Button>
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
                        <div className="flex items-center justify-between">
                          <FormLabel>Content</FormLabel>
                          <EmojiPickerComponent 
                            onEmojiSelect={insertEmojiAtCursor}
                            className="mb-2"
                          />
                        </div>
                        <FormControl>
                          {contentMode === 'rich' ? (
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
                          ) : (
                            <Textarea 
                              placeholder="Paste your HTML code here..."
                              rows={15}
                              className="font-mono text-sm"
                              onSelect={(e: any) => {
                                setCursorPosition(e.target.selectionStart);
                              }}
                              {...field}
                            />
                          )}
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
                        <FormControl>
                          <Combobox
                            options={categories}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Select or add category..."
                            searchPlaceholder="Search categories..."
                            allowCustom={true}
                            onAddNew={(newCategory) => {
                              // In a real app, you might want to persist this to a categories table
                              console.log('New category added:', newCategory);
                            }}
                          />
                        </FormControl>
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

                   <FormField
                     control={form.control}
                     name="publish_date"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>
                           Publish Date
                           {isScheduled && (
                             <span className="text-sm text-orange-600 ml-2">(Scheduled)</span>
                           )}
                         </FormLabel>
                         <FormControl>
                           <Input 
                             type="datetime-local" 
                             {...field}
                             className={isScheduled ? 'border-orange-300 bg-orange-50' : ''}
                           />
                         </FormControl>
                         {isScheduled && (
                           <p className="text-sm text-orange-600">
                             Post will be published automatically at {new Date(watchPublishDate).toLocaleString()}
                           </p>
                         )}
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
                   <CardTitle>Image Gallery</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <FormField
                     control={form.control}
                     name="gallery_images"
                     render={({ field }) => (
                       <FormItem>
                         <FormControl>
                            <ImageGallery
                              images={(field.value as GalleryImage[]) || []}
                              onImagesChange={field.onChange}
                              maxImages={10}
                            />
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
                        <FormLabel>Keywords/Tags</FormLabel>
                        <FormControl>
                          <TagInput
                            tags={field.value || []}
                            onTagsChange={field.onChange}
                            placeholder="Type and press Enter to add keywords..."
                            maxTags={10}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Press Enter or comma to add keywords. Maximum 10 keywords.
                        </p>
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