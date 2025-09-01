import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
  maxImages?: number;
}

export const ImageGallery = ({ images, onImagesChange, maxImages = 10 }: ImageGalleryProps) => {
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: 'Error',
        description: `Maximum ${maxImages} images allowed`,
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image file`);
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} must be smaller than 5MB`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('blog-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(data.path);

        return {
          id: Date.now().toString() + Math.random().toString(36).substring(2),
          url: publicUrl,
          alt: file.name.split('.')[0],
          caption: ''
        };
      });

      const newImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newImages]);
      
      toast({
        title: 'Success',
        description: `${newImages.length} image(s) uploaded successfully`,
      });
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (imageId: string) => {
    onImagesChange(images.filter(img => img.id !== imageId));
  };

  const updateImageData = (imageId: string, updates: Partial<GalleryImage>) => {
    onImagesChange(images.map(img => 
      img.id === imageId ? { ...img, ...updates } : img
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Gallery Images ({images.length}/{maxImages})</Label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="gallery-upload"
            disabled={uploading || images.length >= maxImages}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            asChild
            disabled={uploading || images.length >= maxImages}
          >
            <label htmlFor="gallery-upload" className="cursor-pointer">
              {uploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Images
                </>
              )}
            </label>
          </Button>
        </div>
      </div>

      {images.length === 0 ? (
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              No images in gallery yet
            </p>
            <Button
              type="button"
              variant="outline"
              asChild
            >
              <label htmlFor="gallery-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </label>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="relative group mb-3">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {editingId === image.id ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Alt text"
                      value={image.alt}
                      onChange={(e) => 
                        onImagesChange(images.map(img => 
                          img.id === image.id ? { ...img, alt: e.target.value } : img
                        ))
                      }
                    />
                    <Input
                      placeholder="Caption (optional)"
                      value={image.caption || ''}
                      onChange={(e) => 
                        onImagesChange(images.map(img => 
                          img.id === image.id ? { ...img, caption: e.target.value } : img
                        ))
                      }
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate">{image.alt}</p>
                    {image.caption && (
                      <p className="text-xs text-muted-foreground truncate">{image.caption}</p>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(image.id)}
                      className="text-xs p-1 h-auto"
                    >
                      Edit details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};