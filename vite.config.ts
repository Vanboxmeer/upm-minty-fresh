import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function generateSitemapPlugin(env: Record<string, string | undefined>) {
  return {
    name: 'generate-sitemap',
    closeBundle: async () => {
      const supabaseUrl = env.VITE_SUPABASE_URL;
      const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Skipping sitemap generation: VITE_SUPABASE_URL and/or VITE_SUPABASE_PUBLISHABLE_KEY not found in environment.');
        return;
      }

      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at,publish_date&status=eq.published`,
          {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
          }
        );
        const resData = await res.json();
        const blogPosts: Array<{ slug: string; updated_at: string | null; publish_date: string | null }> = Array.isArray(resData) ? resData : [];
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


/* ------------------------------------------------------------------------- *
 * Prerender plugin — writes real HTML files with correct per-page metadata.
 *
 * WHY: this is a client-rendered SPA. Every route is served the same
 * index.html, whose <title>, description, Open Graph tags and canonical all
 * describe the HOMEPAGE. The correct values are applied by JavaScript after
 * hydration (src/utils/seoUtils.ts), which is too late for:
 *
 *   - Social crawlers (Facebook, LinkedIn, X, Slack, WhatsApp, Telegram).
 *     None of them execute JavaScript, so every shared link rendered the
 *     generic homepage card instead of the article.
 *   - `<link rel="canonical">`, which pointed every URL at the homepage and
 *     told search engines all 91 posts were duplicates of it.
 *
 * This emits dist/<route>/index.html per route with the metadata baked in.
 * Vercel's filesystem takes precedence over the SPA rewrite in vercel.json,
 * so these files are served directly. The React app still boots and renders
 * normally — only the <head> is pre-resolved.
 *
 * TRADE-OFF: metadata for a new post is baked at build time, so publishing a
 * post needs a redeploy to get its tags. Wire a Supabase webhook to a Vercel
 * Deploy Hook (or run a daily cron) to automate that.
 * ------------------------------------------------------------------------- */

const SITE_URL = 'https://unitedpress.media';

const STATIC_META: Record<string, { title: string; description: string }> = {
  'services': {
    title: 'UPM Services | KOL, Press Release & Media Placements',
    description: 'From KOL collaborations to press releases and tier-1 media features. Comprehensive Web3 and crypto marketing packages from $5K to $100K.',
  },
  'media-for-brands': {
    title: 'Media for Brands | UPM',
    description: 'Earned media, native placements and branded content for brands reaching crypto, Web3 and technology audiences.',
  },
  'vibe-coding': {
    title: 'Vibe Coding | Web3 MVPs & Rapid App Development | UPM',
    description: 'Web3 MVPs, token dashboards and landing pages built fast. UPM ships production apps from idea to launch.',
  },
  'creators': {
    title: 'For Creators | KOL & Influencer Partnerships | UPM',
    description: 'Join UPM\u2019s network of 500+ KOLs and creators across Twitter/X, YouTube and Telegram. Paid collaborations with vetted Web3 brands.',
  },
  'our-products': {
    title: 'Our Apps | UPM Ecosystem',
    description: 'A few of the apps built by UPM, including SpinQuest, Reading Race, Watch Crypto, Everything Nightlife and Vaporsmooth.',
  },
  'case-studies': {
    title: 'Case Studies | Campaign Results | UPM',
    description: 'Real campaign results from UPM press, KOL and paid media work for Web3 and crypto projects.',
  },
  'think-tank': {
    title: 'Think Tank | AI Marketing Strategist | UPM',
    description: 'Ask Bolt, UPM\u2019s AI marketing strategist, for tactical Web3 and crypto marketing advice, launch frameworks and budget benchmarks.',
  },
  'trending': {
    title: 'Trending News | Tech, AI, Crypto & Gaming | UPM',
    description: 'The latest trending stories across technology, AI, VR, gaming and crypto, curated by the UPM newsroom.',
  },
  'blog': {
    title: 'UPM News & Insights | Tech, AI, Crypto & Gaming',
    description: 'Where tech, AI, crypto and gaming converge \u2014 the latest stories, analysis and innovation from the UPM newsroom.',
  },
  'about': {
    title: 'About UPM | United Press Media',
    description: 'United Press Media is a digital marketing agency specialising in press distribution, KOL collaborations and tier-1 media for Web3 and crypto.',
  },
  'help-center': {
    title: 'Help Center | UPM',
    description: 'Answers to common questions about UPM services, campaign timelines, pricing and getting started.',
  },
  'contact': {
    title: 'Contact UPM | Start a Campaign',
    description: 'Get in touch with United Press Media to scope a press, KOL or paid media campaign for your project.',
  },
  'affiliate-signup': {
    title: 'Affiliate Program | Earn With UPM',
    description: 'Refer clients to United Press Media and earn commission on campaigns you introduce.',
  },
  'privacy-policy': {
    title: 'Privacy Policy | UPM',
    description: 'How United Press Media collects, uses and protects your data.',
  },
  'terms-of-service': {
    title: 'Terms of Service | UPM',
    description: 'The terms governing use of the United Press Media website and services.',
  },
};

export function escapeAttr(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function toDescription(raw: unknown, limit = 160): string {
  const plain = String(raw ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= limit) return plain;
  const clipped = plain.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(' ');
  return clipped.slice(0, lastSpace > 80 ? lastSpace : limit).trim() + '\u2026';
}

type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  keywords?: string;
};

export function injectMeta(html: string, meta: PageMeta): string {
  const swap = (src: string, pattern: RegExp, next: string) =>
    pattern.test(src) ? src.replace(pattern, next) : src;

  let out = html;
  out = swap(out, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  out = swap(out, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`);
  out = swap(out, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`);
  out = swap(out, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
  out = swap(out, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`);
  out = swap(out, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeAttr(meta.type)}" />`);
  out = swap(out, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`);
  out = swap(out, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeAttr(meta.image)}" />`);
  out = swap(out, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`);
  out = swap(out, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`);
  out = swap(out, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeAttr(meta.image)}" />`);
  if (meta.keywords) {
    out = swap(out, /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escapeAttr(meta.keywords)}" />`);
  }

  if (meta.type === 'article') {
    const extras: string[] = [];
    if (meta.publishedTime) extras.push(`<meta property="article:published_time" content="${escapeAttr(meta.publishedTime)}" />`);
    if (meta.modifiedTime) extras.push(`<meta property="article:modified_time" content="${escapeAttr(meta.modifiedTime)}" />`);
    if (meta.author) extras.push(`<meta property="article:author" content="${escapeAttr(meta.author)}" />`);
    if (meta.section) extras.push(`<meta property="article:section" content="${escapeAttr(meta.section)}" />`);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title.replace(/ \| UPM News$/, ''),
      description: meta.description,
      image: meta.image,
      datePublished: meta.publishedTime,
      dateModified: meta.modifiedTime || meta.publishedTime,
      author: { '@type': 'Person', name: meta.author || 'UPM Team' },
      publisher: {
        '@type': 'Organization',
        name: 'United Press Media',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': meta.canonical },
      articleSection: meta.section || 'Marketing',
      keywords: meta.keywords,
    };
    extras.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`);
    out = out.replace('</head>', `${extras.join('')}</head>`);
  }

  return out;
}

function prerenderPlugin(env: Record<string, string | undefined>) {
  return {
    name: 'prerender-meta',
    closeBundle: async () => {
      const distDir = path.resolve(__dirname, 'dist');
      const shellPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(shellPath)) return;
      const shell = fs.readFileSync(shellPath, 'utf-8');

      const write = (routePath: string, html: string) => {
        const dir = path.join(distDir, routePath);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      };

      let staticCount = 0;
      for (const [route, m] of Object.entries(STATIC_META)) {
        write(route, injectMeta(shell, {
          title: m.title,
          description: m.description,
          canonical: `${SITE_URL}/${route}`,
          image: `${SITE_URL}/og-image.png`,
          type: 'website',
        }));
        staticCount++;
      }

      const supabaseUrl = env.VITE_SUPABASE_URL;
      const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;
      let postCount = 0;

      if (supabaseUrl && supabaseKey) {
        try {
          const res = await fetch(
            `${supabaseUrl}/rest/v1/blog_posts?select=title,slug,excerpt,featured_image,seo_title,seo_description,seo_keywords,author,publish_date,updated_at,categories&status=eq.published`,
            { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
          );
          const posts = await res.json();
          if (Array.isArray(posts)) {
            for (const post of posts) {
              if (!post.slug || /[\s]/.test(post.slug)) continue; // skip malformed slugs
              const image = post.featured_image
                ? (String(post.featured_image).startsWith('http')
                    ? post.featured_image
                    : `${SITE_URL}${post.featured_image}`)
                : `${SITE_URL}/og-image.png`;
              write(`blog/${post.slug}`, injectMeta(shell, {
                title: `${post.seo_title || post.title} | UPM News`,
                description: toDescription(post.seo_description || post.excerpt || ''),
                canonical: `${SITE_URL}/blog/${post.slug}`,
                image,
                type: 'article',
                publishedTime: post.publish_date || undefined,
                modifiedTime: post.updated_at || undefined,
                author: post.author || 'UPM Team',
                section: Array.isArray(post.categories) ? post.categories[0] : undefined,
                keywords: Array.isArray(post.seo_keywords) ? post.seo_keywords.join(', ') : undefined,
              }));
              postCount++;
            }
          }
        } catch (error) {
          console.error('⚠️ Prerender: could not fetch posts:', error);
        }
      } else {
        console.warn('⚠️ Prerender: Supabase env missing, blog posts not prerendered.');
      }

      console.log(`✅ Prerendered ${staticCount} static pages and ${postCount} blog posts with real metadata`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'production' && generateSitemapPlugin(env),
      mode === 'production' && prerenderPlugin(env),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
