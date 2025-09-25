import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting scheduled posts check...')

    // Find all draft posts with publish_date in the past or now
    const { data: scheduledPosts, error: fetchError } = await supabaseClient
      .from('blog_posts')
      .select('*')
      .eq('status', 'draft')
      .not('publish_date', 'is', null)
      .lte('publish_date', new Date().toISOString())

    if (fetchError) {
      console.error('Error fetching scheduled posts:', fetchError)
      throw fetchError
    }

    console.log(`Found ${scheduledPosts?.length || 0} posts ready to publish`)

    if (!scheduledPosts || scheduledPosts.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No scheduled posts ready to publish',
          published: 0 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    let publishedCount = 0
    const errors: string[] = []

    // Update each scheduled post to published status
    for (const post of scheduledPosts) {
      try {
        const { error: updateError } = await supabaseClient
          .from('blog_posts')
          .update({ 
            status: 'published',
            updated_at: new Date().toISOString()
          })
          .eq('id', post.id)

        if (updateError) {
          console.error(`Error publishing post ${post.id}:`, updateError)
          errors.push(`Failed to publish "${post.title}": ${updateError.message}`)
        } else {
          console.log(`Successfully published: ${post.title}`)
          publishedCount++

          // Log the publishing action
          await supabaseClient
            .from('audit_logs')
            .insert({
              action: 'auto_publish_scheduled_post',
              resource: 'blog_post',
              resource_id: post.id,
              metadata: {
                post_title: post.title,
                scheduled_date: post.publish_date,
                published_at: new Date().toISOString(),
                automated: true
              }
            })
        }
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        errors.push(`Failed to publish "${post.title}": ${errorMessage}`)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Published ${publishedCount} scheduled posts`,
        published: publishedCount,
        errors: errors.length > 0 ? errors : undefined
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in publish-scheduled-posts function:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})