import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

function generateSitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle: async () => {
      try {
        const supabaseUrl = 'https://ftjdmvdyeetiubmziwav.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amRtdmR5ZWV0aXVibXppd2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NDYxNDcsImV4cCI6MjA3MDUyMjE0N30.FxpqvXDjsPIjD6k2toPLUCYrhprjv9sGYFc9Y2Znmgw';
        
        const res = await fetch(
          `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at,publish_date&status=eq.published`,
          {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
          }
        );
        
        const blogPosts: Array<{ slug: string; updated_at: string | null; publish_date: string | null }> = await res.json();
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        // Filter out future-dated posts
        const availablePosts = (blogPosts || []).filter((post: any) => {
          if (!post.publish_date) return true;
          return new Date(post.publish_date) <= now;
        });

        const baseUrl = 'https://unitedpress.media';
        const staticRoutes = [
          { url: '', priority: '1.0', changefreq: 'weekly' },
          { url: 'services', priority: '0.9', changefreq: 'monthly' },
          { url: 'media-for-brands', priority: '0.9', changefreq: 'monthly' },
          { url: 'vibe-coding', priority: '0.9', changefreq: 'monthly' },
          { url: 'creators', priority: '0.8', changefreq: 'monthly' },
          { url: 'blog', priority: '0.8', changefreq: 'daily' },
          { url: 'our-products', priority: '0.7', changefreq: 'monthly' },
          { url: 'case-studies', priority: '0.7', changefreq: 'monthly' },
          { url: 'think-tank', priority: '0.7', changefreq: 'monthly' },
          { url: 'trending', priority: '0.8', changefreq: 'daily' },
          { url: 'about', priority: '0.6', changefreq: 'monthly' },
          { url: 'help-center', priority: '0.5', changefreq: 'monthly' },
          { url: 'contact', priority: '0.5', changefreq: 'monthly' },
          { url: 'affiliate-signup', priority: '0.4', changefreq: 'monthly' },
          { url: 'privacy-policy', priority: '0.3', changefreq: 'yearly' },
          { url: 'terms-of-service', priority: '0.3', changefreq: 'yearly' },
        ];

        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        staticRoutes.forEach(route => {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${baseUrl}${route.url ? '/' + route.url : ''}</loc>\n`;
          sitemap += `    <lastmod>${today}</lastmod>\n`;
          sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
          sitemap += `    <priority>${route.priority}</priority>\n`;
          sitemap += '  </url>\n';
        });

        availablePosts.forEach((post: any) => {
          const lastmod = post.updated_at ? post.updated_at.split('T')[0] : today;
          sitemap += '  <url>\n';
          sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
          sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          sitemap += `    <changefreq>monthly</changefreq>\n`;
          sitemap += `    <priority>0.7</priority>\n`;
          sitemap += '  </url>\n';
        });

        sitemap += '</urlset>';

        const distDir = path.resolve(__dirname, 'dist');
        if (fs.existsSync(distDir)) {
          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
          console.log(`✅ Sitemap generated with ${staticRoutes.length} static routes and ${availablePosts.length} blog posts`);
        }
      } catch (error) {
        console.error('⚠️ Failed to generate sitemap:', error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && generateSitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
