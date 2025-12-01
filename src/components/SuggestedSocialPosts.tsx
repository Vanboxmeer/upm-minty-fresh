import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Twitter, Linkedin, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SuggestedSocialPostsProps {
  postUrl: string;
  title: string;
  excerpt: string;
  content: string;
  className?: string;
}

interface SocialHandles {
  twitter: string[];
  linkedin: string[];
  urlMap: { [key: string]: { twitter?: string; linkedin?: string; name?: string } };
}

interface SuggestedPosts {
  twitter: string;
  linkedin: string;
}

export const SuggestedSocialPosts = ({
  postUrl,
  title,
  excerpt,
  content,
  className = ''
}: SuggestedSocialPostsProps) => {
  const [loading, setLoading] = useState(false);
  const [socialHandles, setSocialHandles] = useState<SocialHandles | null>(null);
  const [suggestedPosts, setSuggestedPosts] = useState<SuggestedPosts | null>(null);
  const [editedPosts, setEditedPosts] = useState<SuggestedPosts | null>(null);
  const { toast } = useToast();

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-social-handles', {
        body: { content, title, excerpt }
      });

      if (error) throw error;

      setSocialHandles(data.socialHandles);
      
      // Replace placeholder with actual URL
      const twitterPost = data.suggestedPosts.twitter.replace('[YOUR_BLOG_URL]', postUrl);
      const linkedinPost = data.suggestedPosts.linkedin.replace('[YOUR_BLOG_URL]', postUrl);
      
      setSuggestedPosts({ twitter: twitterPost, linkedin: linkedinPost });
      setEditedPosts({ twitter: twitterPost, linkedin: linkedinPost });

      const totalHandles = data.socialHandles.twitter.length + data.socialHandles.linkedin.length;
      
      if (totalHandles > 0) {
        toast({
          title: 'Social handles found!',
          description: `Found ${totalHandles} verified social handle(s) from linked websites`,
        });
      } else {
        toast({
          title: 'No handles found',
          description: 'No social media handles were detected in the linked websites',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate social post suggestions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (platform: 'twitter' | 'linkedin') => {
    if (!editedPosts) return;

    try {
      await navigator.clipboard.writeText(editedPosts[platform]);
      toast({
        title: 'Copied!',
        description: `${platform === 'twitter' ? 'X/Twitter' : 'LinkedIn'} post copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the text manually',
        variant: 'destructive',
      });
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
          Suggested Social Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!suggestedPosts ? (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Generate AI-powered social media posts with verified handles from websites mentioned in your article.
              </AlertDescription>
            </Alert>
            <Button
              onClick={generateSuggestions}
              disabled={loading}
              className="w-full"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {loading ? 'Analyzing content...' : 'Generate Social Posts'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Display found handles */}
            {socialHandles && (
              <div className="space-y-2">
                {socialHandles.twitter.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Twitter className="h-4 w-4 text-primary" />
                    <span className="font-medium">X handles found:</span>
                    <span className="text-muted-foreground">{socialHandles.twitter.join(', ')}</span>
                  </div>
                )}
                {socialHandles.linkedin.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Linkedin className="h-4 w-4 text-primary" />
                    <span className="font-medium">LinkedIn handles found:</span>
                    <span className="text-muted-foreground">{socialHandles.linkedin.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            <Tabs defaultValue="twitter" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="twitter">
                  <Twitter className="h-4 w-4 mr-2" />
                  X/Twitter
                </TabsTrigger>
                <TabsTrigger value="linkedin">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="twitter" className="space-y-3">
                <Textarea
                  value={editedPosts?.twitter || ''}
                  onChange={(e) => handleEdit('twitter', e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                  placeholder="Twitter post will appear here..."
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopy('twitter')}
                    className="flex-1"
                    variant="default"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Post
                  </Button>
                  <Button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(editedPosts?.twitter || '')}`, '_blank')}
                    variant="outline"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Open X
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="linkedin" className="space-y-3">
                <Textarea
                  value={editedPosts?.linkedin || ''}
                  onChange={(e) => handleEdit('linkedin', e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                  placeholder="LinkedIn post will appear here..."
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopy('linkedin')}
                    className="flex-1"
                    variant="default"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Post
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.linkedin.com/feed/', '_blank')}
                    variant="outline"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    Open LinkedIn
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={generateSuggestions}
              disabled={loading}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
