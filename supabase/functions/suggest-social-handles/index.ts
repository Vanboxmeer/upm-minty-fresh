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

    // Expanded list of invalid/generic handles to filter out
    const invalidTwitterHandles = new Set([
      'home', 'share', 'intent', 'i', 'widgets', 'search', 'explore', 'settings',
      'notifications', 'messages', 'login', 'signup', 'about', 'help', 'privacy',
      'tos', 'cookie', 'ads', 'business', 'developer', 'connatix', 'addthis',
      'sharethis', 'facebook', 'instagram', 'youtube', 'tiktok', 'pinterest'
    ]);

    // Process ALL URLs (increased limit to 25 for better coverage)
    const urlsToProcess = uniqueUrls.slice(0, 25);
    console.log(`Processing ${urlsToProcess.length} URLs out of ${uniqueUrls.length} total`);

    // Process URLs in parallel for speed
    const processUrl = async (url: string) => {
      try {
        console.log(`Processing URL: ${url}`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          signal: AbortSignal.timeout(8000) // 8 second timeout per URL
        });

        if (!response.ok) return null;

        const html = await response.text();
        const domain = new URL(url).hostname.replace('www.', '');

        // Extract brand/company name from title tag or og:site_name
        const ogSiteNameMatch = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        let brandName = ogSiteNameMatch?.[1] || (titleMatch ? titleMatch[1].split('|')[0].split('-')[0].split('–')[0].trim() : domain);
        
        // Clean up brand name
        brandName = brandName.replace(/\s*[|\-–]\s*.*$/, '').trim();
        if (brandName.length > 50) brandName = domain;

        // Find Twitter/X handle - prioritize meta tags over links
        const twitterPatterns = [
          // Meta tags first (most reliable)
          /<meta[^>]*name=["']twitter:site["'][^>]*content=["']@?([a-zA-Z0-9_]+)["']/i,
          /<meta[^>]*content=["']@?([a-zA-Z0-9_]+)["'][^>]*name=["']twitter:site["']/i,
          /<meta[^>]*property=["']twitter:site["'][^>]*content=["']@?([a-zA-Z0-9_]+)["']/i,
          // Links in social sections
          /<a[^>]*href=["']https?:\/\/(?:twitter|x)\.com\/([a-zA-Z0-9_]+)\/?["'][^>]*(?:rel=["'][^"']*noopener|class=["'][^"']*social)/i,
          // General Twitter/X links
          /href=["']https?:\/\/(?:twitter|x)\.com\/([a-zA-Z0-9_]+)\/?["']/gi,
        ];

        let twitterHandle: string | null = null;
        for (const pattern of twitterPatterns) {
          const matches = html.match(pattern);
          if (matches && matches[1]) {
            const handle = matches[1].toLowerCase();
            // Strict validation
            if (!invalidTwitterHandles.has(handle) && 
                handle.length >= 2 && 
                handle.length <= 15 &&
                !/^[0-9]+$/.test(handle)) {
              twitterHandle = matches[1];
              break;
            }
          }
        }

        // Find LinkedIn company page
        const linkedinPatterns = [
          /<a[^>]*href=["']https?:\/\/(?:www\.)?linkedin\.com\/company\/([a-zA-Z0-9\-]+)\/?["']/gi,
          /linkedin\.com\/company\/([a-zA-Z0-9\-]+)/gi,
        ];

        let linkedinHandle: string | null = null;
        for (const pattern of linkedinPatterns) {
          const match = html.match(pattern);
          if (match && match[1]) {
            // Filter out generic LinkedIn paths
            const handle = match[1].toLowerCase();
            if (!['company', 'companies', 'jobs', 'feed', 'in', 'pub'].includes(handle)) {
              linkedinHandle = match[1];
              break;
            }
          }
        }

        if (twitterHandle || linkedinHandle) {
          console.log(`Found handles for ${url}:`, { twitter: twitterHandle, linkedin: linkedinHandle, brand: brandName });
          return { url, twitter: twitterHandle, linkedin: linkedinHandle, name: brandName };
        }
        return null;
      } catch (error) {
        console.error(`Error processing ${url}:`, error.message);
        return null;
      }
    };

    // Process all URLs in parallel
    const results = await Promise.all(urlsToProcess.map(processUrl));

    // Aggregate results
    for (const result of results) {
      if (!result) continue;
      
      socialHandles.urlMap[result.url] = {
        twitter: result.twitter || undefined,
        linkedin: result.linkedin || undefined,
        name: result.name
      };

      if (result.twitter) {
        const formattedHandle = `@${result.twitter}`;
        if (!socialHandles.twitter.includes(formattedHandle)) {
          socialHandles.twitter.push(formattedHandle);
        }
      }

      if (result.linkedin) {
        if (!socialHandles.linkedin.includes(result.linkedin)) {
          socialHandles.linkedin.push(result.linkedin);
        }
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
  let post = `🚀 ${title}\n\n`;
  
  if (excerpt) {
    post += `${excerpt}\n\n`;
  }
  
  if (handles.length > 0) {
    // Build mentions - LinkedIn uses company page format
    const mentions: string[] = [];
    handles.forEach(handle => {
      const entry = Object.values(urlMap).find(v => v.linkedin === handle);
      const brandName = entry?.name || handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      // LinkedIn company mentions use this format for clickable links
      mentions.push(brandName);
    });
    
    post += `📌 Featuring: ${mentions.join(', ')}\n\n`;
    
    // Add company page links at the end for proper tagging
    post += 'Companies mentioned:\n';
    handles.forEach(handle => {
      const entry = Object.values(urlMap).find(v => v.linkedin === handle);
      const brandName = entry?.name || handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      post += `• ${brandName}: https://www.linkedin.com/company/${handle}/\n`;
    });
    post += '\n';
  }
  
  post += '📖 Read the full article: [YOUR_BLOG_URL]\n\n';
  post += '#Web3 #Crypto #Marketing #Blockchain';
  
  return post;
}
