import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Twitter, Link, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export const SocialShareButtons = ({ 
  url, 
  title, 
  description = '', 
  className = '' 
}: SocialShareButtonsProps) => {
  const { toast } = useToast();
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The blog post link has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy link',
        description: 'Please copy the link manually from your browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30"
      >
        <Twitter className="h-4 w-4" />
        <span className="hidden sm:inline">X</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30"
      >
        <Linkedin className="h-4 w-4" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30"
      >
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('email')}
        className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400"
      >
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">Email</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400"
      >
        <Link className="h-4 w-4" />
        <span className="hidden sm:inline">Copy Link</span>
      </Button>
    </div>
  );
};