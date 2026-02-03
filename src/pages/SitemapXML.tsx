import { useEffect } from 'react';

const SitemapXML = () => {
  useEffect(() => {
    // Redirect to the edge function that generates the sitemap
    // Google Search Console follows redirects for sitemaps
    window.location.replace(
      'https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/generate-sitemap'
    );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2 text-foreground">Redirecting to Sitemap...</h2>
        <p className="text-muted-foreground">Loading XML sitemap...</p>
      </div>
    </div>
  );
};

export default SitemapXML;
