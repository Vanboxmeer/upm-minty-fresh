import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory, sessionId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // Check rate limit
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('think_tank_rate_limits')
      .select('*')
      .eq('ip_address', clientIP)
      .single();

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    if (rateLimitData) {
      const firstMessageTime = new Date(rateLimitData.first_message_at);
      
      if (firstMessageTime > oneHourAgo && rateLimitData.message_count >= 20) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again later or contact us for unlimited access.' 
          }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Reset if outside time window
      if (firstMessageTime < oneHourAgo) {
        await supabase
          .from('think_tank_rate_limits')
          .update({
            message_count: 1,
            first_message_at: now.toISOString(),
            last_message_at: now.toISOString()
          })
          .eq('ip_address', clientIP);
      } else {
        await supabase
          .from('think_tank_rate_limits')
          .update({
            message_count: rateLimitData.message_count + 1,
            last_message_at: now.toISOString()
          })
          .eq('ip_address', clientIP);
      }
    } else {
      await supabase
        .from('think_tank_rate_limits')
        .insert({
          ip_address: clientIP,
          message_count: 1,
          first_message_at: now.toISOString(),
          last_message_at: now.toISOString()
        });
    }

    const systemPrompt = `You are a Web3 marketing strategist and advisor for United Press Media (UPM). 
Your role is to provide actionable marketing advice while naturally recommending UPM services when relevant.

UPM Services:
1. Press Release Distribution - Distribute press releases to 400+ media outlets including CoinTelegraph, Yahoo Finance, MarketWatch, and more
2. KOL Collaborations - Connect with top crypto influencers and Key Opinion Leaders for authentic promotion
3. Tier-1 Media Placements - Secure features and interviews in major publications like Forbes, Business Insider, TechCrunch
4. Sponsored Content Creator Content - Work with YouTube, Twitter, and TikTok creators for sponsored content
5. Vibe Coding - Custom MVP app development for marketing campaigns and Web3 projects
6. Paid Advertising - Google Ads, social media ads, and targeted crypto advertising campaigns

You specialize in:
- Press release distribution strategies
- KOL collaborations and influencer marketing
- Tier-1 media placements and PR strategies
- Web3/crypto project launches (ICO, IDO, IGO, NFT)
- Content creator partnerships
- Community building and engagement
- Token marketing and launch strategies
- DeFi and blockchain marketing

When users ask about marketing challenges, provide specific, actionable advice. Naturally suggest relevant UPM services when they would genuinely help solve their problem. Be conversational, knowledgeable, and authentic - avoid being overly salesy.

Keep responses concise (2-4 paragraphs) unless user asks for detailed analysis. Use examples and data when possible. Always end with a question to keep the conversation going.`;

    // Build messages array with history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('Sending request to Lovable AI with', messages.length, 'messages');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        stream: true,
        temperature: 0.8,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI service rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    // Stream the response back to client
    const reader = response.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let fullResponse = '';

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) {
              // Save conversation to database
              const serviceSuggestions = detectServices(fullResponse);
              
              await supabase
                .from('think_tank_conversations')
                .insert({
                  session_id: sessionId,
                  user_message: message,
                  ai_response: fullResponse,
                  service_suggested: serviceSuggestions,
                  ip_address: clientIP
                });

              controller.close();
              break;
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullResponse += content;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  console.error('Error parsing SSE data:', e);
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in think-tank-chat:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to detect UPM service mentions in response
function detectServices(text: string): string[] {
  const services: string[] = [];
  const lowerText = text.toLowerCase();

  if (lowerText.includes('press release') || lowerText.includes('pr distribution')) {
    services.push('press-release');
  }
  if (lowerText.includes('kol') || lowerText.includes('influencer') || lowerText.includes('key opinion leader')) {
    services.push('kol-collaboration');
  }
  if (lowerText.includes('tier-1') || lowerText.includes('tier 1') || lowerText.includes('media placement')) {
    services.push('tier1-media');
  }
  if (lowerText.includes('content creator') || lowerText.includes('sponsored content')) {
    services.push('sponsored-content');
  }
  if (lowerText.includes('vibe coding') || lowerText.includes('app development') || lowerText.includes('mvp')) {
    services.push('vibe-coding');
  }
  if (lowerText.includes('paid advertising') || lowerText.includes('google ads')) {
    services.push('paid-advertising');
  }

  return services;
}
