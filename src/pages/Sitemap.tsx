import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Sitemap = () => {
  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Get all published blog posts
        const { data: blogPosts, error } = await supabase
          .from('blog_posts')
          .select('slug, updated_at, publish_date, created_at')
          .eq('status', 'published');

        if (error) throw error;

        // Filter out future-dated posts
        const now = new Date();
        const availablePosts = (blogPosts || []).filter(post => {
          if (!post.publish_date) return true;
          return new Date(post.publish_date) <= now;
        });

        // Static routes with their priorities
        const staticRoutes = [
          { url: '', priority: '1.0', changefreq: 'weekly' },
          { url: 'services', priority: '0.9', changefreq: 'monthly' },
          { url: 'blog', priority: '0.8', changefreq: 'daily' },
          { url: 'case-studies', priority: '0.7', changefreq: 'monthly' },
          { url: 'about', priority: '0.6', changefreq: 'monthly' },
          { url: 'help-center', priority: '0.5', changefreq: 'monthly' },
          { url: 'contact', priority: '0.5', changefreq: 'monthly' },
          { url: 'privacy-policy', priority: '0.3', changefreq: 'yearly' },
          { url: 'terms-of-service', priority: '0.3', changefreq: 'yearly' },
        ];

        // Generate sitemap XML
        const baseUrl = window.location.origin;
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static routes
        staticRoutes.forEach(route => {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${baseUrl}/${route.url}</loc>\n`;
          sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
          sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
          sitemap += `    <priority>${route.priority}</priority>\n`;
          sitemap += '  </url>\n';
        });

        // Add blog post routes
        availablePosts.forEach(post => {
          const lastmod = post.updated_at ? post.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
          sitemap += '  <url>\n';
          sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
          sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          sitemap += `    <changefreq>monthly</changefreq>\n`;
          sitemap += `    <priority>0.7</priority>\n`;
          sitemap += '  </url>\n';
        });

        sitemap += '</urlset>';

        // Set response headers and content
        const response = new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          },
        });

        // Convert response to blob and trigger download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    generateSitemap();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
        <p className="text-muted-foreground">Your sitemap.xml will download shortly.</p>
      </div>
    </div>
  );
};

export default Sitemap;