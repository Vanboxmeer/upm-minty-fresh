import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, title, excerpt } = await req.json();

    if (!content) {
      throw new Error('Content is required');
    }

    // Extract URLs from content
    const urlRegex = /https?:\/\/[^\s<>"]+/gi;
    const urls = content.match(urlRegex) || [];
    
    // Remove duplicates and filter out image URLs
    const uniqueUrls = [...new Set(urls)].filter(url => 
      !url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    console.log(`Found ${uniqueUrls.length} unique URLs in content`);

    const socialHandles: {
      twitter: string[];
      linkedin: string[];
      urlMap: { [key: string]: { twitter?: string; linkedin?: string; name?: string } };
    } = {
      twitter: [],
      linkedin: [],
      urlMap: {}
    };

    // Process each URL to find social handles
    for (const url of uniqueUrls.slice(0, 10)) { // Limit to 10 URLs to prevent timeout
      try {
        console.log(`Processing URL: ${url}`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; UPM-Bot/1.0; +https://unitedpress.media)'
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout per URL
        });

        if (!response.ok) continue;

        const html = await response.text();
        const domain = new URL(url).hostname;

        // Extract brand/company name from title tag
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const brandName = titleMatch ? titleMatch[1].split('|')[0].split('-')[0].trim() : domain;

        // Find Twitter/X handle
        const twitterPatterns = [
          /twitter\.com\/([a-zA-Z0-9_]+)/i,
          /x\.com\/([a-zA-Z0-9_]+)/i,
          /<meta[^>]*name=["']twitter:site["'][^>]*content=["']@?([a-zA-Z0-9_]+)["']/i,
          /<meta[^>]*property=["']twitter:site["'][^>]*content=["']@?([a-zA-Z0-9_]+)["']/i,
          /<a[^>]*href=["']https?:\/\/(?:twitter|x)\.com\/([a-zA-Z0-9_]+)["']/i
        ];

        let twitterHandle = null;
        for (const pattern of twitterPatterns) {
          const match = html.match(pattern);
          if (match && match[1]) {
            twitterHandle = match[1];
            // Verify it's not a generic path
            if (!['home', 'share', 'intent', 'i'].includes(twitterHandle.toLowerCase())) {
              break;
            }
            twitterHandle = null;
          }
        }

        // Find LinkedIn handle
        const linkedinPatterns = [
          /linkedin\.com\/company\/([a-zA-Z0-9\-]+)/i,
          /<meta[^>]*property=["']og:url["'][^>]*content=["']https?:\/\/(?:www\.)?linkedin\.com\/company\/([a-zA-Z0-9\-]+)["']/i,
          /<a[^>]*href=["']https?:\/\/(?:www\.)?linkedin\.com\/company\/([a-zA-Z0-9\-]+)["']/i
        ];

        let linkedinHandle = null;
        for (const pattern of linkedinPatterns) {
          const match = html.match(pattern);
          if (match && match[1]) {
            linkedinHandle = match[1];
            break;
          }
        }

        // Store results
        if (twitterHandle || linkedinHandle) {
          socialHandles.urlMap[url] = {
            twitter: twitterHandle || undefined,
            linkedin: linkedinHandle || undefined,
            name: brandName
          };

          if (twitterHandle) {
            const formattedHandle = `@${twitterHandle}`;
            if (!socialHandles.twitter.includes(formattedHandle)) {
              socialHandles.twitter.push(formattedHandle);
            }
          }

          if (linkedinHandle) {
            if (!socialHandles.linkedin.includes(linkedinHandle)) {
              socialHandles.linkedin.push(linkedinHandle);
            }
          }

          console.log(`Found handles for ${url}:`, { twitter: twitterHandle, linkedin: linkedinHandle });
        }
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
        continue;
      }
    }

    // Generate suggested social posts
    const twitterPost = generateTwitterPost(title, excerpt, socialHandles.twitter);
    const linkedinPost = generateLinkedInPost(title, excerpt, socialHandles.linkedin, socialHandles.urlMap);

    console.log(`Generated suggestions with ${socialHandles.twitter.length} Twitter and ${socialHandles.linkedin.length} LinkedIn handles`);

    return new Response(
      JSON.stringify({
        socialHandles,
        suggestedPosts: {
          twitter: twitterPost,
          linkedin: linkedinPost
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in suggest-social-handles:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function generateTwitterPost(title: string, excerpt: string, handles: string[]): string {
  let post = `📰 ${title}\n\n`;
  
  if (excerpt && excerpt.length < 150) {
    post += `${excerpt}\n\n`;
  }
  
  if (handles.length > 0) {
    post += handles.join(' ') + '\n\n';
  }
  
  post += '[YOUR_BLOG_URL]';
  
  // Twitter has 280 char limit
  if (post.length > 260) {
    const maxExcerptLength = 150 - handles.join(' ').length;
    const shortExcerpt = excerpt ? excerpt.substring(0, maxExcerptLength) + '...' : '';
    post = `📰 ${title}\n\n${shortExcerpt}\n\n${handles.join(' ')}\n\n[YOUR_BLOG_URL]`;
  }
  
  return post;
}

function generateLinkedInPost(
  title: string, 
  excerpt: string, 
  handles: string[],
  urlMap: { [key: string]: { twitter?: string; linkedin?: string; name?: string } }
): string {
  let post = `${title}\n\n`;
  
  if (excerpt) {
    post += `${excerpt}\n\n`;
  }
  
  if (handles.length > 0) {
    post += '✨ Featuring insights from:\n';
    handles.forEach(handle => {
      // Find the brand name from urlMap
      const entry = Object.values(urlMap).find(v => v.linkedin === handle);
      const brandName = entry?.name || handle;
      post += `• ${brandName} (https://linkedin.com/company/${handle})\n`;
    });
    post += '\n';
  }
  
  post += 'Read the full article: [YOUR_BLOG_URL]';
  
  return post;
}
