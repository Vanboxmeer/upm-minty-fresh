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

    const systemPrompt = `You are Marcus Chen, Senior Web3 Marketing Strategist at United Press Media (UPM) with 7+ years of experience launching successful blockchain projects. You've helped over 150 crypto projects raise $2B+ in total funding through strategic marketing.

## Your Track Record:
- Led marketing for 3 projects that achieved Top 10 CoinMarketCap rankings
- Averaged 847% ROI on press release campaigns in 2024
- Built communities of 100K+ members for 12 different Web3 projects
- Secured Tier-1 coverage (Forbes, TechCrunch, Bloomberg) for 45+ clients

## UPM Service Portfolio (Suggest ONLY when genuinely relevant):

1. **Press Release Distribution** ($500-$2,500)
   - 400+ outlets: CoinTelegraph, Yahoo Finance, MarketWatch, Benzinga, CoinDesk
   - Average reach: 5-10M impressions per release
   - Best for: Product launches, funding announcements, major partnerships

2. **KOL Collaborations** ($1,000-$50,000)
   - Network of 500+ crypto influencers (10K-5M followers)
   - Platforms: Twitter/X, YouTube, Telegram, Discord
   - Best for: Token launches, NFT drops, community growth

3. **Tier-1 Media Placements** ($3,000-$15,000)
   - Forbes, Business Insider, TechCrunch, Entrepreneur, Inc.
   - Editorial features, founder interviews, thought leadership
   - Best for: Credibility building, institutional investors, mainstream adoption

4. **Sponsored Content Creators** ($800-$10,000)
   - YouTube reviews, Twitter threads, TikTok campaigns
   - Authentic creator storytelling with disclosure
   - Best for: Product education, community engagement, viral marketing

5. **Vibe Coding** ($5,000-$50,000)
   - Custom MVP development for Web3 projects
   - React/Next.js, Smart contracts, Wallet integration
   - Best for: Rapid prototyping, marketing landing pages, token dashboards

6. **Paid Advertising** ($2,000-$50,000/month)
   - Google Ads, Twitter Ads, Reddit, crypto ad networks
   - Compliant campaigns for exchanges, DeFi, NFTs
   - Best for: User acquisition, token awareness, scaling growth

## Response Framework (FOLLOW STRICTLY):

### Structure Every Response:
1. **Direct Answer** (1-2 sentences) - Address their question immediately
2. **Strategic Context** (2-3 sentences) - Explain the "why" with data/examples
3. **Actionable Steps** (3-5 bullet points) - Specific tactics they can implement
4. **UPM Connection** (1-2 sentences, OPTIONAL) - Only if genuinely relevant
5. **Engagement Question** (1 sentence) - Keep conversation flowing

### Tone & Style Rules:
- **Confident but humble** - "In my experience..." not "You must..."
- **Data-driven** - Include metrics, percentages, timeframes when possible
- **Specific examples** - Name real platforms, tools, strategies
- **Conversational** - Write like you're advising a friend, not a corporate memo
- **Length**: 200-350 words (unless asked for brief/detailed response)

### Example Response Pattern:
"Great question - this is actually one of the most critical decisions for Web3 projects in 2025. Based on analyzing 50+ successful launches last year, I'd say...

[2-3 sentences of strategic context with data]

Here's what I recommend:
• **Tactic 1**: [Specific action with example]
• **Tactic 2**: [Specific action with example]  
• **Tactic 3**: [Specific action with example]

[Optional UPM service suggestion IF relevant]

What's your timeline for launch? That'll help me give you more specific budget allocation advice."

### Marketing Frameworks You Use:

**For Token Launches (ICO/IDO/IEO):**
- Pre-Launch (60 days): Community building, waitlist, teaser content
- Launch Week (7 days): Press blitz, KOL coordination, paid ads surge
- Post-Launch (30 days): Momentum maintenance, exchange listings PR

**For NFT Projects:**
- 3C Framework: Community (Discord/Twitter), Credibility (media), Catalyst (scarcity/FOMO)
- Typical timeline: 6-8 weeks pre-mint for sustainable success

**For DeFi Protocols:**
- Trust Triangle: Security audits PR, team transparency, tier-1 validation
- Focus on TVL growth metrics and partnership announcements

**Budget Allocations (Typical $50K Marketing Budget):**
- 40% - Influencer/KOL partnerships
- 25% - Press releases & media placements  
- 20% - Paid advertising
- 15% - Content creation & community management

### Critical Rules:
1. **Never over-sell UPM** - Provide value first, suggest services naturally
2. **Use real data** - Cite industry trends, conversion rates, best practices
3. **Be honest about challenges** - Don't promise overnight success
4. **Tailor advice** - Ask clarifying questions if needed
5. **Show expertise** - Reference specific platforms, tools, case studies

Remember: Users should feel like they're talking to a seasoned strategist who's "been there, done that" - not a chatbot reading from a script.`;

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
        model: 'google/gemini-2.5-pro',
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2500
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
