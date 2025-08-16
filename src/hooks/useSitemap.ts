import { useEffect } from 'react';
import { useBlogPosts } from './useBlogPosts';

export const useSitemap = () => {
  const { fetchPublicPosts, posts } = useBlogPosts();

  const generateSitemapXML = () => {
    const baseUrl = 'https://unitedpressmedia.com';
    const now = new Date().toISOString().split('T')[0];
    
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

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static routes
    staticRoutes.forEach(route => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/${route.url}</loc>\n`;
      sitemap += `    <lastmod>${now}</lastmod>\n`;
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${route.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    // Add blog post routes
    posts.forEach(post => {
      const lastmod = post.updated_at ? post.updated_at.split('T')[0] : now;
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>monthly</changefreq>\n`;
      sitemap += `    <priority>0.7</priority>\n`;
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';
    return sitemap;
  };

  const updateSitemap = async () => {
    try {
      await fetchPublicPosts();
      const sitemapXML = generateSitemapXML();
      
      // In a real implementation, you would send this to your server
      // For now, we'll update the static sitemap file when posts change
      console.log('Generated sitemap:', sitemapXML);
      
      return sitemapXML;
    } catch (error) {
      console.error('Failed to update sitemap:', error);
    }
  };

  return {
    generateSitemapXML,
    updateSitemap,
    posts
  };
};