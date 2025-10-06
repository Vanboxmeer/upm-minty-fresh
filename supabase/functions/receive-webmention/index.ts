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

    const formData = await req.formData();
    const source = formData.get('source')?.toString();
    const target = formData.get('target')?.toString();

    if (!source || !target) {
      return new Response(
        JSON.stringify({ error: 'Missing source or target' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify target is one of our blog posts
    const slug = target.split('/blog/')[1];
    const { data: post } = await supabaseClient
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!post) {
      return new Response(
        JSON.stringify({ error: 'Target not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify source actually links to target
    const isValid = await verifyWebmention(source, target);
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Source does not link to target' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store the webmention
    const { error: insertError } = await supabaseClient
      .from('webmentions')
      .insert({
        source_url: source,
        target_url: target,
        post_id: post.id,
        status: 'verified',
      });

    if (insertError) {
      throw insertError;
    }

    console.log(`Received and verified WebMention from ${source} to ${target}`);

    return new Response(
      JSON.stringify({ success: true, message: 'WebMention accepted' }),
      { status: 202, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in receive-webmention:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function verifyWebmention(source: string, target: string): Promise<boolean> {
  try {
    const response = await fetch(source);
    const html = await response.text();
    return html.includes(target);
  } catch (error) {
    console.error('Failed to verify WebMention:', error);
    return false;
  }
}