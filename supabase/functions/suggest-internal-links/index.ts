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

    const { content, currentPostId } = await req.json();

    if (!content) {
      throw new Error('Content is required');
    }

    // Fetch all published posts except current one
    const { data: posts, error: postsError } = await supabaseClient
      .from('blog_posts')
      .select('id, title, slug, excerpt, categories, seo_keywords')
      .eq('status', 'published')
      .neq('id', currentPostId || '00000000-0000-0000-0000-000000000000')
      .limit(20);

    if (postsError) {
      throw postsError;
    }

    if (!posts || posts.length === 0) {
      return new Response(
        JSON.stringify({ suggestions: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use Lovable AI to analyze content and suggest relevant links
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO expert. Analyze the content and suggest 3-5 relevant internal links from the provided list. Return ONLY a JSON array of objects with: postId, title, suggestedAnchorText, relevanceScore (0-100), reason.',
          },
          {
            role: 'user',
            content: `Content to analyze:\n${content.substring(0, 2000)}\n\nAvailable posts:\n${JSON.stringify(posts.map(p => ({ id: p.id, title: p.title, excerpt: p.excerpt, categories: p.categories })))}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (aiResponse.status === 402) {
        throw new Error('AI credits exhausted. Please add credits to your workspace.');
      }
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiSuggestions = JSON.parse(aiData.choices[0].message.content);

    // Enrich with full post data
    const suggestions = aiSuggestions.map((suggestion: any) => {
      const post = posts.find(p => p.id === suggestion.postId);
      return {
        ...suggestion,
        slug: post?.slug,
        url: `/blog/${post?.slug}`,
      };
    });

    return new Response(
      JSON.stringify({ suggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in suggest-internal-links:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});