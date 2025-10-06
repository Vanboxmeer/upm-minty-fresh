import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePostPublishing = () => {
  const { toast } = useToast();

  const triggerPostPublishing = async (postId: string) => {
    try {
      // Send WebMentions
      const { data: webmentionData, error: webmentionError } = await supabase.functions.invoke('send-webmentions', {
        body: { postId },
      });

      if (webmentionError) {
        console.error('WebMention error:', webmentionError);
      } else {
        console.log('WebMentions sent:', webmentionData);
        if (webmentionData?.sent > 0) {
          toast({
            title: 'WebMentions Sent',
            description: `Notified ${webmentionData.sent} websites`,
          });
        }
      }

      // Auto-post to social media
      const { data: socialData, error: socialError } = await supabase.functions.invoke('auto-post-to-social', {
        body: { postId },
      });

      if (socialError) {
        console.error('Social posting error:', socialError);
      } else {
        console.log('Social posts created:', socialData);
        if (socialData?.results?.twitter) {
          toast({
            title: 'Posted to Social Media',
            description: 'Post shared on configured platforms',
          });
        }
      }
    } catch (error) {
      console.error('Error in post publishing:', error);
    }
  };

  return { triggerPostPublishing };
};