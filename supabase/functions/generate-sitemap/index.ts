import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get all published blog posts
    const { data: blogPosts, error } = await supabaseClient
      .from('blog_posts')
      .select('slug, updated_at, publish_date, created_at')
      .eq('status', 'published')

    if (error) throw error

    // Filter out future-dated posts
    const now = new Date()
    const availablePosts = (blogPosts || []).filter(post => {
      if (!post.publish_date) return true
      return new Date(post.publish_date) <= now
    })

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
    ]

    // Generate sitemap XML
    const baseUrl = 'https://unitedpressmedia.com'
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Add static routes
    staticRoutes.forEach(route => {
      sitemap += '  <url>\n'
      sitemap += `    <loc>${baseUrl}${route.url ? '/' + route.url : ''}</loc>\n`
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`
      sitemap += `    <priority>${route.priority}</priority>\n`
      sitemap += '  </url>\n'
    })

    // Add blog post routes
    availablePosts.forEach(post => {
      const lastmod = post.updated_at ? post.updated_at.split('T')[0] : new Date().toISOString().split('T')[0]
      sitemap += '  <url>\n'
      sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`
      sitemap += `    <lastmod>${lastmod}</lastmod>\n`
      sitemap += `    <changefreq>monthly</changefreq>\n`
      sitemap += `    <priority>0.7</priority>\n`
      sitemap += '  </url>\n'
    })

    sitemap += '</urlset>'

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})