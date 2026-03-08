import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Twitter, Linkedin, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuggestedSocialPostsProps {
  postUrl: string;
  title: string;
  excerpt: string;
  content: string;
  className?: string;
}

interface SuggestedPosts {
  twitter: string;
  linkedin: string;
}

export const SuggestedSocialPosts = ({
  postUrl,
  title,
  excerpt,
  className = ''
}: SuggestedSocialPostsProps) => {
  const [suggestedPosts, setSuggestedPosts] = useState<SuggestedPosts | null>(null);
  const [editedPosts, setEditedPosts] = useState<SuggestedPosts | null>(null);
  const { toast } = useToast();

  const generateSuggestions = () => {
    const shortExcerpt = excerpt ? (excerpt.length > 100 ? excerpt.substring(0, 100) + '...' : excerpt) : '';
    
    const twitterPost = `📰 ${title}\n\n${shortExcerpt}\n\n${postUrl}`.slice(0, 280);
    const linkedinPost = `📰 ${title}\n\n${excerpt || ''}\n\nRead more: ${postUrl}\n\n#Web3 #Crypto #Blockchain`;

    setSuggestedPosts({ twitter: twitterPost, linkedin: linkedinPost });
    setEditedPosts({ twitter: twitterPost, linkedin: linkedinPost });
  };

  const handleCopy = async (platform: 'twitter' | 'linkedin') => {
    if (!editedPosts) return;
    try {
      await navigator.clipboard.writeText(editedPosts[platform]);
      toast({ title: 'Copied!', description: `${platform === 'twitter' ? 'X/Twitter' : 'LinkedIn'} post copied to clipboard` });
    } catch {
      toast({ title: 'Failed to copy', description: 'Please copy the text manually', variant: 'destructive' });
    }
  };

  const handleEdit = (platform: 'twitter' | 'linkedin', value: string) => {
    setEditedPosts(prev => prev ? { ...prev, [platform]: value } : null);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Social Post Drafts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!suggestedPosts ? (
          <Button onClick={generateSuggestions} className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Social Posts
          </Button>
        ) : (
          <div className="space-y-4">
            <Tabs defaultValue="twitter" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="twitter"><Twitter className="h-4 w-4 mr-2" />X/Twitter</TabsTrigger>
                <TabsTrigger value="linkedin"><Linkedin className="h-4 w-4 mr-2" />LinkedIn</TabsTrigger>
              </TabsList>
              <TabsContent value="twitter" className="space-y-3">
                <Textarea value={editedPosts?.twitter || ''} onChange={(e) => handleEdit('twitter', e.target.value)} rows={8} className="font-mono text-sm" />
                <div className="flex gap-2">
                  <Button onClick={() => handleCopy('twitter')} className="flex-1"><Copy className="h-4 w-4 mr-2" />Copy</Button>
                  <Button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(editedPosts?.twitter || '')}`, '_blank')} variant="outline"><Twitter className="h-4 w-4 mr-2" />Open X</Button>
                </div>
              </TabsContent>
              <TabsContent value="linkedin" className="space-y-3">
                <Textarea value={editedPosts?.linkedin || ''} onChange={(e) => handleEdit('linkedin', e.target.value)} rows={10} className="font-mono text-sm" />
                <div className="flex gap-2">
                  <Button onClick={() => handleCopy('linkedin')} className="flex-1"><Copy className="h-4 w-4 mr-2" />Copy</Button>
                  <Button onClick={() => window.open('https://www.linkedin.com/feed/', '_blank')} variant="outline"><Linkedin className="h-4 w-4 mr-2" />Open LinkedIn</Button>
                </div>
              </TabsContent>
            </Tabs>
            <Button onClick={generateSuggestions} variant="outline" className="w-full" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />Regenerate
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
