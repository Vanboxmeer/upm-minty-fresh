import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  meta_description: string
  category: string
  author: string
  status: string
  publish_date: string
  created_at: string
  updated_at: string
  featured_image_url?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Fetching published blog posts for RSS feed...')

    // Fetch published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .lte('publish_date', new Date().toISOString())
      .order('publish_date', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    console.log(`Found ${posts?.length || 0} published posts`)

    const siteUrl = 'https://unitedpress.media'
    const now = new Date().toUTCString()
    
    // Generate RSS items
    const rssItems = (posts || [])
      .map((post: BlogPost) => {
        const postUrl = `${siteUrl}/blog/${post.slug}`
        const pubDate = new Date(post.publish_date || post.created_at).toUTCString()
        const description = post.meta_description || post.excerpt || post.content.substring(0, 200) + '...'
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category || 'Digital Marketing'}]]></category>
      ${post.author ? `<dc:creator><![CDATA[${post.author}]]></dc:creator>` : ''}
      ${post.featured_image_url ? `<enclosure url="${post.featured_image_url}" type="image/jpeg" />` : ''}
    </item>`
      })
      .join('')

    // Generate complete RSS XML
    const rssXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[UPM Digital Marketing Blog]]></title>
    <description><![CDATA[Latest insights on digital marketing, press release distribution, tier1 media, and sponsored content creator collaborations from UPM]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${now}</pubDate>
    <managingEditor>info@unitedpress.media (UPM Team)</managingEditor>
    <webMaster>info@unitedpress.media (UPM Team)</webMaster>
    <generator>UPM Blog RSS Generator</generator>
    <ttl>60</ttl>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>UPM Digital Marketing Blog</title>
      <link>${siteUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>${rssItems}
  </channel>
</rss>`

    console.log('RSS feed generated successfully')

    // Return RSS XML with proper headers
    return new Response(rssXML, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })

  } catch (error) {
    console.error('RSS feed generation error:', error)
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate RSS feed' }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})