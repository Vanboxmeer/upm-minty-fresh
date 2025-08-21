import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const RSSFeed = () => {
  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        // Call the RSS feed edge function
        const { data, error } = await supabase.functions.invoke('rss-feed');
        
        if (error) {
          console.error('Error fetching RSS feed:', error);
          // Fallback to a simple XML response
          const fallbackXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>UPM Digital Marketing Blog</title>
    <description>Latest insights on digital marketing</description>
    <link>https://unitedpress.media</link>
  </channel>
</rss>`;
          
          const blob = new Blob([fallbackXML], { type: 'application/rss+xml' });
          const url = URL.createObjectURL(blob);
          window.location.replace(url);
          return;
        }

        // Create blob with RSS XML content
        const blob = new Blob([data], { type: 'application/rss+xml' });
        const url = URL.createObjectURL(blob);
        
        // Replace current page with RSS content
        window.location.replace(url);
      } catch (error) {
        console.error('Failed to fetch RSS feed:', error);
        // Redirect to 404 if RSS generation fails
        window.location.href = '/404';
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Generating RSS Feed...</h2>
        <p className="text-muted-foreground">Please wait while we generate your RSS feed.</p>
      </div>
    </div>
  );
};

export default RSSFeed;