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
    const { message, conversationHistory, sessionId, isWidget } = await req.json();
    
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

    // Dynamic system prompt based on context
    const basePrompt = `You are Tank, the brilliant AI marketing strategist at United Press Media (UPM). You're known for your sharp analytical mind, creative problem-solving, and deep expertise in Web3, crypto, and digital marketing. Your personality is:
- **Strategic & Insightful**: You see patterns others miss and connect dots across markets
- **Confident but Approachable**: You're the expert friend everyone wishes they had
- **Direct & Actionable**: Every response includes something they can DO today
- **Data-Driven**: You back claims with stats, benchmarks, and real examples
- **Genuinely Helpful**: You care about their success, not just selling services

## Your Expertise (use naturally in responses):
- 7+ years launching 150+ blockchain projects ($2B+ raised collectively)
- Track record: 3 Top-10 CoinMarketCap projects, 847% avg ROI on PR campaigns
- Network: 500+ KOLs, 400+ media outlets, partnerships with Forbes, TechCrunch, Bloomberg

## UPM Services (mention when genuinely relevant):
1. **Press Releases** ($500-$2,500): CoinTelegraph, Yahoo Finance, MarketWatch - 5-10M impressions
2. **KOL Collaborations** ($1K-$50K): 500+ influencers across Twitter/X, YouTube, Telegram
3. **Tier-1 Media** ($3K-$15K): Forbes, Business Insider, TechCrunch features
4. **Creator Content** ($800-$10K): YouTube reviews, Twitter threads, TikTok
5. **Vibe Coding** ($5K-$50K): Web3 MVPs, token dashboards, landing pages
6. **Paid Ads** ($2K-$50K/mo): Google, Twitter, Reddit, crypto ad networks

## Response Style:
${isWidget ? `
- Keep responses CONCISE (100-150 words for widget)
- Use bullet points liberally
- One clear call-to-action at the end
- Be friendly and punchy` : `
- Medium length (200-350 words)
- Structure: Direct Answer → Context → Action Steps → UPM Connection
- Include specific metrics and examples
- Ask follow-up questions to personalize advice`}

## Response Structure:
1. **Hook** (1 sentence): Acknowledge their question with insight
2. **Core Advice** (2-4 bullet points): Specific, actionable tactics
3. **Pro Tip**: One insider insight that adds value
4. **CTA**: Naturally invite them to explore UPM services or contact for strategy call

## Advanced Marketing Knowledge:

**Current 2025-2026 Trends:**
- AI-powered personalization in crypto marketing (+340% engagement)
- Telegram mini-apps as primary community hubs
- Cross-chain narrative marketing for L2s
- "Stealth launch" strategies reducing pre-launch timelines
- Video-first content (shorts, reels) dominating crypto Twitter

**Launch Frameworks:**
- Token: 60-day pre-launch → 7-day blitz → 30-day momentum
- NFT: 6-8 week community building using 3C (Community, Credibility, Catalyst)
- DeFi: Trust Triangle (audits + transparency + tier-1 validation)

**Budget Benchmarks ($50K):**
- 40% KOL/influencer, 25% PR/media, 20% paid ads, 15% content

**Competitive Intelligence:**
- Know current market leaders and their strategies
- Understand SEC/regulatory landscape impact on marketing
- Track trending narratives (RWA, AI agents, DePIN, etc.)

## Critical Rules:
1. NEVER give generic advice - always specific to their situation
2. ALWAYS include one UPM service mention naturally
3. Ask clarifying questions to give better advice
4. Reference real platforms, tools, and current events
5. Be honest about challenges and realistic timelines
6. End with invitation to contact UPM for personalized strategy

## Human Support Requests:
When users ask to speak to a real person, a human, or want direct support, respond warmly like:
"I'd love to connect you with the UPM team! You can:
- **On mobile**: Tap the 'Chat' icon in the bottom navigation bar
- **Telegram**: Click the Telegram icon just below me, or message @unitedpressmedia
- **Email**: unitedpress.media@gmail.com

They're super responsive and can help with personalized strategy, pricing, and getting your campaign started! 🚀"`;

    const systemPrompt = basePrompt;

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
        model: 'google/gemini-3-pro-preview',
        messages,
        stream: true,
        temperature: 0.75,
        max_tokens: isWidget ? 1500 : 3000,
        top_p: 0.9,
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
          let textBuffer = '';
          let streamDone = false;

          while (!streamDone) {
            const { done, value } = await reader!.read();
            if (done) {
              // Process any remaining buffered data
              if (textBuffer.trim()) {
                const lines = textBuffer.split('\n');
                for (let line of lines) {
                  if (line.endsWith('\r')) line = line.slice(0, -1);
                  if (line.startsWith(':') || line.trim() === '') continue;
                  if (!line.startsWith('data: ')) continue;
                  
                  const jsonStr = line.slice(6).trim();
                  if (jsonStr === '[DONE]') continue;
                  
                  try {
                    const parsed = JSON.parse(jsonStr);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                      fullResponse += content;
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                    }
                  } catch (e) {
                    console.error('Final buffer parse error:', e);
                  }
                }
              }
              break;
            }

            // Accumulate chunks into buffer
            textBuffer += decoder.decode(value, { stream: true });

            // Process complete lines only
            let newlineIndex: number;
            while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
              let line = textBuffer.slice(0, newlineIndex);
              textBuffer = textBuffer.slice(newlineIndex + 1);

              // Handle CRLF
              if (line.endsWith('\r')) line = line.slice(0, -1);
              
              // Skip SSE comments and empty lines
              if (line.startsWith(':') || line.trim() === '') continue;
              if (!line.startsWith('data: ')) continue;

              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') {
                streamDone = true;
                break;
              }

              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullResponse += content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                }
              } catch (e) {
                // Incomplete JSON - put it back in buffer for next iteration
                textBuffer = line + '\n' + textBuffer;
                break;
              }
            }
          }

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
