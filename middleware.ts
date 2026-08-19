/**
 * Vercel Edge Middleware — server-side SEO metadata injection.
 *
 * WHY THIS EXISTS
 * ---------------
 * This site is a client-rendered Vite SPA. Every route is served the same
 * `index.html`, whose <title>, description, Open Graph tags and — critically —
 * `<link rel="canonical">` all describe the HOMEPAGE. The real per-page values
 * are applied by JavaScript after hydration (see src/utils/seoUtils.ts).
 *
 * That breaks two things badly:
 *
 *   1. Every URL declared `canonical = https://unitedpress.media/` in its raw
 *      HTML, telling search engines all 91 blog posts are duplicates of the
 *      homepage.
 *   2. Social crawlers (Facebook, LinkedIn, X, Slack, WhatsApp, Telegram) do not
 *      execute JavaScript at all, so every shared link rendered the generic
 *      homepage card instead of the article.
 *
 * This middleware intercepts the affected routes, resolves the correct metadata
 * (from Supabase for blog posts, from a static map for marketing pages), and
 * rewrites the tags into the HTML before it is returned. Crawlers and browsers
 * both receive correct metadata on the first byte.
 *
 * It deliberately does NOT render page content — this is a metadata fix, not
 * server-side rendering. Content still renders client-side exactly as before.
 */

export const config = {
  matcher: [
    '/',
    '/blog/:slug*',
    '/services',
    '/media-for-brands',
    '/vibe-coding',
    '/creators',
    '/our-products',
    '/case-studies',
    '/think-tank',
    '/trending',
    '/about',
    '/help-center',
    '/contact',
    '/affiliate-signup',
    '/privacy-policy',
    '/terms-of-service',
  ],
};

const SITE = 'https://unitedpress.media';
const DEFAULT_IMAGE = `${SITE}/og-image.png`;

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

type Meta = {
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

/** Metadata for the fixed marketing pages, mirroring what the client sets. */
const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'UPM | Digital Marketing & Press Release Distribution',
    description:
      'Professional digital marketing services including press release distribution, content promotion, and ROI-positive campaigns. Trusted by 1500+ marketing teams.',
  },
  '/services': {
    title: 'UPM Services | KOL, Press Release & Media Placements',
    description:
      'From KOL collaborations to press releases and tier-1 media features. Comprehensive Web3 and crypto marketing packages from $5K to $100K.',
  },
  '/media-for-brands': {
    title: 'Media for Brands | UPM',
    description:
      'Earned media, native placements and branded content for brands looking to reach crypto, Web3 and technology audiences.',
  },
  '/vibe-coding': {
    title: 'Vibe Coding | Web3 MVPs & Rapid App Development | UPM',
    description:
      'Web3 MVPs, token dashboards and landing pages built fast. UPM ships production apps from idea to launch.',
  },
  '/creators': {
    title: 'For Creators | KOL & Influencer Partnerships | UPM',
    description:
      'Join UPM’s network of 500+ KOLs and creators across Twitter/X, YouTube and Telegram. Paid collaborations with vetted Web3 brands.',
  },
  '/our-products': {
    title: 'Our Apps | UPM Ecosystem',
    description:
      'A few of the apps built by UPM, including SpinQuest, Reading Race, Watch Crypto, Everything Nightlife and Vaporsmooth.',
  },
  '/case-studies': {
    title: 'Case Studies | Campaign Results | UPM',
    description:
      'Real campaign results from UPM press, KOL and paid media work for Web3 and crypto projects.',
  },
  '/think-tank': {
    title: 'Think Tank | AI Marketing Strategist | UPM',
    description:
      'Ask Bolt, UPM’s AI marketing strategist, for tactical Web3 and crypto marketing advice, launch frameworks and budget benchmarks.',
  },
  '/trending': {
    title: 'Trending News | Tech, AI, Crypto & Gaming | UPM',
    description:
      'The latest trending stories across technology, AI, VR, gaming and crypto, curated by the UPM newsroom.',
  },
  '/about': {
    title: 'About UPM | United Press Media',
    description:
      'United Press Media is a digital marketing agency specialising in press distribution, KOL collaborations and tier-1 media for Web3 and crypto.',
  },
  '/help-center': {
    title: 'Help Center | UPM',
    description:
      'Answers to common questions about UPM services, campaign timelines, pricing and getting started.',
  },
  '/contact': {
    title: 'Contact UPM | Start a Campaign',
    description:
      'Get in touch with United Press Media to scope a press, KOL or paid media campaign for your project.',
  },
  '/affiliate-signup': {
    title: 'Affiliate Program | Earn With UPM',
    description:
      'Refer clients to United Press Media and earn commission on campaigns you introduce.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | UPM',
    description: 'How United Press Media collects, uses and protects your data.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | UPM',
    description: 'The terms governing use of the United Press Media website and services.',
  },
};

/** Escape a value for safe interpolation into an HTML attribute. */
function attr(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Escape a value for safe interpolation into HTML text content. */
function text(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Collapse HTML/markdown to plain text and clip to a sensible meta length. */
function toDescription(raw: string, limit = 160): string {
  const plain = String(raw ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= limit) return plain;
  const clipped = plain.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 80 ? lastSpace : limit).trim()}…`;
}

async function fetchPost(slug: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  const params = new URLSearchParams({
    slug: `eq.${slug}`,
    status: 'eq.published',
    select:
      'title,slug,excerpt,content,featured_image,seo_title,seo_description,seo_keywords,author,publish_date,updated_at,categories',
    limit: '1',
  });

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?${params}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  } catch {
    return null;
  }
}

function buildJsonLd(meta: Meta): string {
  if (meta.type !== 'article') return '';
  const data = {
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
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': meta.canonical },
    articleSection: meta.section || 'Marketing',
    keywords: meta.keywords,
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(
    /</g,
    '\\u003c'
  )}</script>`;
}

/** Rewrite the homepage-derived tags in index.html with real per-page values. */
function injectMeta(html: string, meta: Meta): string {
  const set = (
    source: string,
    pattern: RegExp,
    replacement: string
  ): string =>
    pattern.test(source) ? source.replace(pattern, replacement) : source;

  let out = html;

  out = set(out, /<title>[\s\S]*?<\/title>/, `<title>${text(meta.title)}</title>`);

  out = set(
    out,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${attr(meta.description)}" />`
  );

  out = set(
    out,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${attr(meta.canonical)}" />`
  );

  out = set(
    out,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${attr(meta.title)}" />`
  );
  out = set(
    out,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${attr(meta.description)}" />`
  );
  out = set(
    out,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${attr(meta.type)}" />`
  );
  out = set(
    out,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${attr(meta.canonical)}" />`
  );
  out = set(
    out,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${attr(meta.image)}" />`
  );

  out = set(
    out,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`
  );
  out = set(
    out,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`
  );
  out = set(
    out,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${attr(meta.image)}" />`
  );

  const extras: string[] = [];
  if (meta.keywords) {
    out = set(
      out,
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${attr(meta.keywords)}" />`
    );
  }
  if (meta.type === 'article') {
    if (meta.publishedTime)
      extras.push(
        `<meta property="article:published_time" content="${attr(meta.publishedTime)}" />`
      );
    if (meta.modifiedTime)
      extras.push(
        `<meta property="article:modified_time" content="${attr(meta.modifiedTime)}" />`
      );
    if (meta.author)
      extras.push(`<meta property="article:author" content="${attr(meta.author)}" />`);
    if (meta.section)
      extras.push(`<meta property="article:section" content="${attr(meta.section)}" />`);
    extras.push(buildJsonLd(meta));
  }

  if (extras.length) {
    out = out.replace('</head>', `${extras.join('')}</head>`);
  }

  return out;
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  // Only rewrite HTML document requests. Assets and data fetches pass through.
  const accept = request.headers.get('accept') || '';
  if (request.method !== 'GET' || !accept.includes('text/html')) {
    return fetch(request);
  }

  // Fetch the built index.html. This path is not matched by this middleware,
  // so there is no recursion.
  const shellUrl = new URL('/index.html', url.origin);
  const shell = await fetch(shellUrl, {
    headers: { 'x-middleware-shell': '1' },
  });

  if (!shell.ok) return fetch(request);
  const html = await shell.text();

  let meta: Meta | null = null;

  if (pathname.startsWith('/blog/')) {
    const slug = decodeURIComponent(pathname.slice('/blog/'.length));
    const post = await fetchPost(slug);

    if (post) {
      const image = post.featured_image
        ? post.featured_image.startsWith('http')
          ? post.featured_image
          : `${SITE}${post.featured_image}`
        : DEFAULT_IMAGE;

      meta = {
        title: `${post.seo_title || post.title} | UPM News`,
        description: toDescription(
          post.seo_description || post.excerpt || post.content || ''
        ),
        canonical: `${SITE}/blog/${post.slug}`,
        image,
        type: 'article',
        publishedTime: post.publish_date || undefined,
        modifiedTime: post.updated_at || undefined,
        author: post.author || 'UPM Team',
        section: Array.isArray(post.categories) ? post.categories[0] : undefined,
        keywords: Array.isArray(post.seo_keywords)
          ? post.seo_keywords.join(', ')
          : undefined,
      };
    }
    // If the post is missing or unpublished we fall through to the untouched
    // shell rather than emitting wrong metadata.
  } else if (STATIC_PAGES[pathname]) {
    const page = STATIC_PAGES[pathname];
    meta = {
      title: page.title,
      description: page.description,
      canonical: pathname === '/' ? `${SITE}/` : `${SITE}${pathname}`,
      image: DEFAULT_IMAGE,
      type: 'website',
    };
  }

  const body = meta ? injectMeta(html, meta) : html;

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Serve instantly from the edge cache, refresh in the background.
      'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      'x-upm-meta': meta ? (meta.type === 'article' ? 'post' : 'static') : 'passthrough',
    },
  });
}
