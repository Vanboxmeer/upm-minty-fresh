import { useEffect, useState, useRef } from "react";
import { Send, Sparkles, TrendingUp, Users, Zap, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { updateMetaTags } from "@/utils/seoUtils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ThinkTank = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('thinktank-session');
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem('thinktank-session', newId);
    return newId;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    updateMetaTags({
      title: "Think Tank - AI Marketing Advisor | UPM",
      description: "Get expert Web3 marketing advice powered by AI. Discuss press releases, influencer strategies, media placements, and more with our intelligent marketing advisor.",
      keywords: "AI marketing advisor, Web3 marketing, crypto marketing strategy, marketing consultant, press release strategy, KOL marketing",
      canonical: "https://unitedpressmedia.com/think-tank",
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const conversationStarters = [
    {
      icon: TrendingUp,
      text: "How do I launch a successful crypto project?",
    },
    {
      icon: Users,
      text: "What's the best way to get media coverage?",
    },
    {
      icon: Sparkles,
      text: "How can I find the right influencers for my Web3 brand?",
    },
    {
      icon: Zap,
      text: "What marketing channels work best for NFT projects?",
    },
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/think-tank-chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: textToSend,
            conversationHistory: messages.slice(-10), // Last 10 messages for context
            sessionId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      // Add empty assistant message that we'll update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMessage += data.content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
      // Remove the empty assistant message if error occurred
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    const newId = crypto.randomUUID();
    localStorage.setItem('thinktank-session', newId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">AI-Powered Marketing Strategy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-fade-in">
            Welcome to the Think Tank
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
            Your AI marketing advisor specialized in Web3, crypto, and digital growth strategies. 
            Get personalized advice and discover how UPM can amplify your success.
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
            <div className="flex flex-col h-[600px]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">Start a Conversation</h3>
                      <p className="text-muted-foreground">
                        Ask me anything about marketing, or try one of these:
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                      {conversationStarters.map((starter, index) => {
                        const Icon = starter.icon;
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-auto p-4 text-left justify-start hover:border-primary hover:bg-primary/5 transition-all duration-300"
                            onClick={() => handleSend(starter.text)}
                          >
                            <Icon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span className="text-sm">{starter.text}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground border border-primary/20'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.content === '' && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-4 border border-primary/20">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-primary/20 p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me about your marketing strategy..."
                    className="min-h-[60px] max-h-[120px] resize-none"
                    disabled={isLoading}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="h-full"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                    {messages.length > 0 && (
                      <Button
                        onClick={clearConversation}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThinkTank;
