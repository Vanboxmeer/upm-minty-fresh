import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SitemapXML = () => {
  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-sitemap');
        
        if (error) {
          console.error('Error fetching sitemap:', error);
          window.location.href = '/404';
          return;
        }

        // Create a new response with XML content type
        const blob = new Blob([data], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Replace current page with XML content
        window.location.replace(url);
      } catch (error) {
        console.error('Failed to fetch sitemap:', error);
        window.location.href = '/404';
      }
    };

    fetchSitemap();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Generating Sitemap...</h2>
        <p className="text-muted-foreground">Please wait while we generate your sitemap.</p>
      </div>
    </div>
  );
};

export default SitemapXML;