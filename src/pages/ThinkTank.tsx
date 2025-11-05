import { useEffect, useState, useRef } from "react";
import { Send, Sparkles, TrendingUp, Users, Zap, Loader2, Copy, ChevronDown } from "lucide-react";
import ReactMarkdown from 'react-markdown';
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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('thinktank-session');
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem('thinktank-session', newId);
    return newId;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
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
    // Only auto-scroll if user is near bottom (within 150px)
    const container = chatContainerRef.current;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
    
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      let textBuffer = '';

      // Add empty assistant message that we'll update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
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
                const data = JSON.parse(jsonStr);
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
          if (jsonStr === '[DONE]') continue;

          try {
            const data = JSON.parse(jsonStr);
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
            // Incomplete JSON - put it back in buffer for next iteration
            textBuffer = line + '\n' + textBuffer;
            break;
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
      <section className="relative py-12 md:py-20 px-4 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
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
      <section className="flex-1 py-8 px-4 pb-16">
        <div className="container mx-auto max-w-4xl h-full">
          <Card className="bg-gradient-to-b from-card/60 to-card/40 backdrop-blur-md border-2 border-primary/20 shadow-2xl relative overflow-hidden h-[calc(100vh-280px)] min-h-[500px]">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
            <div className="flex flex-col h-full relative z-10">
              {/* Messages Area */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">Start a Conversation</h3>
                      <p className="text-muted-foreground">
                        Ask me anything about marketing, or try one of these:
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl px-4">
                      {conversationStarters.map((starter, index) => {
                        const Icon = starter.icon;
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-auto min-h-[80px] p-4 text-left justify-start items-start hover:border-primary hover:bg-primary/30 dark:hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 group"
                            onClick={() => handleSend(starter.text)}
                          >
                            <Icon className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-sm md:text-base leading-relaxed whitespace-normal break-words">
                              {starter.text}
                            </span>
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
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}
                      >
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl p-3 md:p-4 shadow-lg relative ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-primary to-primary-electric text-white ml-4 md:ml-12'
                              : 'bg-card/90 backdrop-blur-sm text-foreground border-2 border-primary/30 mr-4 md:mr-12 dark:bg-card/50'
                          }`}
                        >
                          {message.role === 'assistant' ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown
                                components={{
                                  p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                  ul: ({node, ...props}) => <ul className="mb-2 ml-4 list-disc space-y-1" {...props} />,
                                  ol: ({node, ...props}) => <ol className="mb-2 ml-4 list-decimal space-y-1" {...props} />,
                                  li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                                  strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
                                  code: ({node, ...props}) => <code className="bg-muted px-1.5 py-0.5 rounded text-xs" {...props} />,
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                              {message.content}
                            </p>
                          )}
                          
                          {message.role === 'assistant' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-card/90 backdrop-blur-sm border border-primary/20 hover:bg-primary/10"
                              onClick={() => {
                                navigator.clipboard.writeText(message.content);
                                toast({
                                  title: "Copied!",
                                  description: "Message copied to clipboard",
                                });
                              }}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.content === '' && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md rounded-2xl p-4 border-2 border-primary/40 shadow-xl mr-4 md:mr-12 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer"></div>
                          
                          <div className="flex items-center gap-3 relative z-10">
                            <div className="relative">
                              <Loader2 className="h-5 w-5 animate-spin text-primary" />
                              <div className="absolute inset-0 h-5 w-5 animate-ping text-primary/40">
                                <Sparkles className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-foreground">Analyzing your question...</span>
                              <span className="text-xs text-muted-foreground">Crafting expert advice</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showScrollButton && (
                      <Button
                        onClick={scrollToBottom}
                        className="absolute bottom-32 right-4 rounded-full h-10 w-10 shadow-lg bg-primary hover:bg-primary-electric z-20"
                        size="icon"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t-2 border-primary/20 p-3 md:p-4 bg-card/80 backdrop-blur-sm">
                <div className="flex gap-2 md:gap-3">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me about Web3 marketing, press releases, KOL strategies..."
                    className="min-h-[70px] md:min-h-[80px] max-h-[140px] resize-none text-sm md:text-base border-2 border-primary/20 focus:border-primary/50 transition-colors"
                    disabled={isLoading}
                    maxLength={2000}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="h-full min-h-[70px] min-w-[50px] md:min-w-[60px] bg-gradient-to-br from-primary to-primary-electric hover:from-primary-electric hover:to-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                      size="icon"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                    {messages.length > 0 && (
                      <Button
                        onClick={clearConversation}
                        variant="outline"
                        size="sm"
                        className="border-2 border-primary/40 hover:border-primary hover:bg-primary/10 text-xs font-semibold"
                        disabled={isLoading}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2 px-1">
                  <p className="text-xs text-muted-foreground">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-muted border border-border rounded">Enter</kbd> to send • 
                    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-muted border border-border rounded ml-1">Shift+Enter</kbd> for new line
                  </p>
                  {input.length > 0 && (
                    <p className={`text-xs font-medium transition-colors ${
                      input.length > 1800 ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {input.length}/2000
                    </p>
                  )}
                </div>
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
