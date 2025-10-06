import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { postId } = await req.json();

    // Fetch the blog post
    const { data: post, error: postError } = await supabaseClient
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      throw new Error('Post not found');
    }

    // Extract all external URLs from content
    const urlRegex = /https?:\/\/[^\s<>"]+/g;
    const urls = post.content.match(urlRegex) || [];
    const externalUrls = urls.filter(url => 
      !url.includes('unitedpress.media') && 
      !url.includes('localhost')
    );

    console.log(`Found ${externalUrls.length} external URLs in post`);

    const results = [];

    for (const targetUrl of externalUrls) {
      try {
        // Discover WebMention endpoint
        const endpoint = await discoverWebmentionEndpoint(targetUrl);
        
        if (endpoint) {
          // Send WebMention
          const sourceUrl = `https://unitedpress.media/blog/${post.slug}`;
          const response = await sendWebmention(endpoint, sourceUrl, targetUrl);
          
          // Log to database
          await supabaseClient.from('webmentions').insert({
            source_url: sourceUrl,
            target_url: targetUrl,
            post_id: postId,
            status: response.success ? 'sent' : 'failed',
            sent_at: new Date().toISOString(),
            response_code: response.status,
            error_message: response.error,
          });

          results.push({
            target: targetUrl,
            success: response.success,
            endpoint,
          });
        } else {
          console.log(`No WebMention endpoint found for ${targetUrl}`);
        }
      } catch (error) {
        console.error(`Error processing ${targetUrl}:`, error);
        results.push({
          target: targetUrl,
          success: false,
          error: error.message,
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        totalUrls: externalUrls.length,
        sent: results.filter(r => r.success).length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-webmentions:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function discoverWebmentionEndpoint(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'UPM-WebMention-Bot/1.0' },
    });

    // Check Link header
    const linkHeader = response.headers.get('Link');
    if (linkHeader) {
      const match = linkHeader.match(/<([^>]+)>;\s*rel="?webmention"?/i);
      if (match) return new URL(match[1], url).href;
    }

    // Check HTML for <link> or <a> tags
    const html = await response.text();
    const linkMatch = html.match(/<link[^>]+rel=["']webmention["'][^>]+href=["']([^"']+)["']/i) ||
                     html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']webmention["']/i) ||
                     html.match(/<a[^>]+rel=["']webmention["'][^>]+href=["']([^"']+)["']/i) ||
                     html.match(/<a[^>]+href=["']([^"']+)["'][^>]+rel=["']webmention["']/i);
    
    if (linkMatch) return new URL(linkMatch[1], url).href;
  } catch (error) {
    console.error(`Failed to discover endpoint for ${url}:`, error);
  }
  
  return null;
}

async function sendWebmention(
  endpoint: string, 
  source: string, 
  target: string
): Promise<{ success: boolean; status?: number; error?: string }> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'UPM-WebMention-Bot/1.0',
      },
      body: new URLSearchParams({ source, target }),
    });

    return {
      success: response.ok,
      status: response.status,
      error: response.ok ? undefined : await response.text(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}