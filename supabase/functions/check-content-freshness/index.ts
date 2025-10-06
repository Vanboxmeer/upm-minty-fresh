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

    // Get all published posts
    const { data: posts, error: postsError } = await supabaseClient
      .from('blog_posts')
      .select('id, title, slug, updated_at, categories')
      .eq('status', 'published');

    if (postsError) {
      throw postsError;
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const results = [];

    for (const post of posts || []) {
      const postDate = new Date(post.updated_at);
      const ageInDays = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (postDate < sixMonthsAgo) {
        // Check if tracking record exists
        const { data: tracking } = await supabaseClient
          .from('content_freshness_tracking')
          .select('*')
          .eq('post_id', post.id)
          .single();

        if (!tracking || new Date(tracking.last_reviewed_date) < sixMonthsAgo) {
          // Generate update suggestions using AI
          const suggestions = await generateUpdateSuggestions(post);
          
          const freshnessScore = Math.max(0, 100 - Math.floor(ageInDays / 3.65)); // Lose 1 point per 3.65 days

          // Upsert tracking record
          const { error: upsertError } = await supabaseClient
            .from('content_freshness_tracking')
            .upsert({
              post_id: post.id,
              last_reviewed_date: post.updated_at,
              freshness_score: freshnessScore,
              needs_update: true,
              update_suggestions: suggestions,
            }, {
              onConflict: 'post_id',
            });

          if (upsertError) {
            console.error(`Error updating tracking for post ${post.id}:`, upsertError);
          }

          results.push({
            post_id: post.id,
            title: post.title,
            age_days: ageInDays,
            needs_update: true,
          });
        }
      }
    }

    console.log(`Checked ${posts?.length || 0} posts, found ${results.length} needing updates`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        checked: posts?.length || 0,
        needsUpdate: results.length,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in check-content-freshness:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function generateUpdateSuggestions(post: any): Promise<string[]> {
  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return ['Update statistics and data', 'Add recent industry trends', 'Refresh examples'];
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
            content: 'You are a content strategist. Suggest 3-5 specific ways to update this blog post to make it current. Return ONLY a JSON array of strings.',
          },
          {
            role: 'user',
            content: `Post title: ${post.title}\nCategories: ${post.categories?.join(', ')}\nLast updated: ${post.updated_at}`,
          },
        ],
      }),
    });

    if (aiResponse.ok) {
      const aiData = await aiResponse.json();
      return JSON.parse(aiData.choices[0].message.content);
    }
  } catch (error) {
    console.error('Error generating suggestions:', error);
  }
  
  return ['Update statistics and data', 'Add recent industry trends', 'Refresh examples'];
}