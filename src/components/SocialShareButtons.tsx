import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Twitter, Link, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  twitterHandles?: string[];
  linkedinHandles?: string[];
}

export const SocialShareButtons = ({ 
  url, 
  title, 
  description = '', 
  className = '',
  twitterHandles = [],
  linkedinHandles = []
}: SocialShareButtonsProps) => {
  const { toast } = useToast();
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  // Build Twitter text with handles
  const twitterText = twitterHandles.length > 0 
    ? `${title} ${twitterHandles.join(' ')}`
    : title;
  const encodedTwitterText = encodeURIComponent(twitterText);

  // Build LinkedIn description with handles (LinkedIn uses company pages format)
  const linkedinText = linkedinHandles.length > 0
    ? `${description}\n\nMentioned: ${linkedinHandles.map(handle => `https://linkedin.com/company/${handle}`).join(' ')}`
    : description;
  const encodedLinkedinText = encodeURIComponent(linkedinText);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTwitterText}&url=${encodedUrl}`,
    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedLinkedinText}`,
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
        variant="retro"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 group"
      >
        <Twitter className="h-4 w-4" />
        <span className="hidden sm:inline">X</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
      </Button>

      <Button
        variant="retro"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-2 group"
      >
        <Linkedin className="h-4 w-4" />
        <span className="hidden sm:inline">LinkedIn</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
      </Button>

      <Button
        variant="retro"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 group"
      >
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
      </Button>

      <Button
        variant="synthwave"
        size="sm"
        onClick={() => handleShare('email')}
        className="flex items-center gap-2 group"
      >
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">Email</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-retro-cyan/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
      </Button>

      <Button
        variant="synthwave"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2 group"
      >
        <Link className="h-4 w-4" />
        <span className="hidden sm:inline">Copy Link</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-retro-cyan/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
      </Button>
    </div>
  );
};