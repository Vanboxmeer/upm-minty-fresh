import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import boltIcon from "@/assets/bolt-icon.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TankChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem("tank-widget-session");
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem("tank-widget-session", newId);
    return newId;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  // Sync with mobile nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsNavVisible(true);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  const quickQuestions = [
    "How can UPM help my crypto project?",
    "What's the best marketing strategy for Web3?",
    "Tell me about press release services",
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/think-tank-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: textToSend,
            conversationHistory: messages.slice(-8),
            sessionId,
            isWidget: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let textBuffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) {
          if (textBuffer.trim()) {
            const lines = textBuffer.split("\n");
            for (let line of lines) {
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (line.startsWith(":") || line.trim() === "") continue;
              if (!line.startsWith("data: ")) continue;

              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") continue;

              try {
                const data = JSON.parse(jsonStr);
                if (data.content) {
                  assistantMessage += data.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      role: "assistant",
                      content: assistantMessage,
                    };
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Final buffer parse error:", e);
              }
            }
          }
          break;
        }

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const data = JSON.parse(jsonStr);
            if (data.content) {
              assistantMessage += data.content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantMessage,
                };
                return newMessages;
              });
            }
          } catch (e) {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mobile bottom position based on nav visibility - stacked above Telegram icon
  const mobileBottomClass = isNavVisible ? "bottom-36" : "bottom-20";
  
  if (!isOpen) {
    return (
      <>
        {/* Desktop */}
        <div className="fixed bottom-32 right-4 z-50 hidden md:block animate-[fade-in_0.6s_ease-out_0.3s_both]">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-primary to-primary-electric text-primary-foreground animate-pulse-glow [box-shadow:0_0_20px_var(--primary-glow),0_0_40px_var(--primary-glow)] hover:[box-shadow:0_0_30px_var(--primary-glow),0_0_60px_var(--primary-glow)] p-0 overflow-hidden"
            aria-label="Chat with Bolt AI"
          >
            <img
              src={boltIcon}
              alt="Bolt AI Assistant"
              className="h-12 w-12 object-contain rounded-full"
            />
          </Button>
          <div className="absolute -top-12 right-0 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-2 shadow-lg animate-bounce-subtle">
            <p className="text-xs font-medium text-foreground whitespace-nowrap">
              ⚡ Ask Bolt
            </p>
          </div>
        </div>
        {/* Mobile */}
        <div className={`fixed ${mobileBottomClass} right-4 z-50 md:hidden transition-all duration-300 animate-[fade-in_0.6s_ease-out_0.3s_both]`}>
          <Button
            onClick={() => setIsOpen(true)}
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-primary to-primary-electric text-primary-foreground p-0 overflow-hidden"
            aria-label="Chat with Bolt AI"
          >
            <img
              src={boltIcon}
              alt="Bolt AI Assistant"
              className="h-10 w-10 object-contain rounded-full"
            />
          </Button>
        </div>
      </>
    );
  }

  if (isMinimized) {
    return (
      <>
        {/* Desktop */}
        <div className="fixed bottom-20 right-4 z-50 hidden md:block">
          <Button
            onClick={() => setIsMinimized(false)}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-primary to-primary-electric text-primary-foreground p-0 overflow-hidden relative"
            aria-label="Expand Bolt chat"
          >
            <img
              src={boltIcon}
              alt="Bolt AI Assistant"
              className="h-12 w-12 object-contain rounded-full"
            />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                {messages.length}
              </span>
            )}
          </Button>
        </div>
        {/* Mobile */}
        <div className={`fixed ${mobileBottomClass} right-4 z-50 md:hidden transition-all duration-300`}>
          <Button
            onClick={() => setIsMinimized(false)}
            className="h-12 w-12 rounded-full shadow-lg transition-all duration-300 bg-gradient-to-br from-primary to-primary-electric text-primary-foreground p-0 overflow-hidden relative"
            aria-label="Expand Bolt chat"
          >
            <img
              src={boltIcon}
              alt="Bolt AI Assistant"
              className="h-10 w-10 object-contain rounded-full"
            />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                {messages.length}
              </span>
            )}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop chat window - positioned to avoid header overlap */}
      <div className="fixed bottom-20 right-4 z-40 hidden md:block animate-[scale-in_0.3s_ease-out]">
        <div className="w-[380px] h-[min(520px,calc(100vh-160px))] bg-card/95 backdrop-blur-lg border-2 border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-electric p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={boltIcon}
                alt="Bolt"
                className="h-8 w-8 rounded-full border-2 border-white/30 object-contain bg-white/20"
              />
              <div>
                <h3 className="font-bold text-white text-sm">⚡ Bolt AI</h3>
                <p className="text-xs text-white/80">Marketing Advisor</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/20"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <img src={boltIcon} alt="Bolt" className="h-10 w-10 object-contain rounded-full" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Hi! I'm Bolt ⚡
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your AI marketing advisor. Ask me about Web3 marketing, press releases, or growth strategies!
                </p>
                <div className="space-y-2 w-full">
                  {quickQuestions.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs justify-start h-auto py-2 border-primary/30 text-foreground hover:border-primary hover:bg-primary/10 hover:text-foreground"
                      onClick={() => handleSend(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-primary-electric text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({ node, ...props }) => (
                                <p className="mb-1 last:mb-0 text-sm leading-relaxed text-foreground" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul className="mb-1 ml-3 list-disc text-sm text-foreground" {...props} />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong className="font-bold text-primary" {...props} />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.content === "" && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-xl px-3 py-2 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground">⚡ Bolt is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-primary/20 p-3 bg-card/50">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="min-h-[40px] max-h-[80px] resize-none text-sm border-primary/20 text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
                maxLength={1000}
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-10 w-10 bg-primary hover:bg-primary-electric text-primary-foreground shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <a
              href="/think-tank"
              className="block text-center text-xs text-muted-foreground hover:text-primary mt-2 transition-colors"
            >
              Open full Think Tank →
            </a>
          </div>
        </div>
      </div>

      {/* Mobile chat window - full screen overlay with proper safe area */}
      <div className="fixed inset-0 z-50 md:hidden bg-background flex flex-col animate-[fade-in_0.2s_ease-out]">
        {/* Header - positioned below the fixed site header */}
        <div className="bg-gradient-to-r from-primary to-primary-electric p-3 flex items-center justify-between mt-16">
          <div className="flex items-center gap-2">
            <img
              src={boltIcon}
              alt="Bolt"
              className="h-8 w-8 rounded-full border-2 border-white/30 object-contain bg-white/20"
            />
            <div>
              <h3 className="font-bold text-white text-sm">⚡ Bolt AI</h3>
              <p className="text-xs text-white/80">Marketing Advisor</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-3 space-y-3"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <img src={boltIcon} alt="Bolt" className="h-10 w-10 object-contain rounded-full" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Hi! I'm Bolt ⚡
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your AI marketing advisor. Ask me about Web3 marketing!
              </p>
              <div className="space-y-2 w-full max-w-sm">
                {quickQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs justify-start h-auto py-3 border-primary/30 text-foreground hover:border-primary hover:bg-primary/10 hover:text-foreground"
                    onClick={() => handleSend(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary-electric text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ node, ...props }) => (
                              <p className="mb-1 last:mb-0 text-sm leading-relaxed text-foreground" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul className="mb-1 ml-3 list-disc text-sm text-foreground" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong className="font-bold text-primary" {...props} />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.content === "" && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-xl px-3 py-2 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">⚡ Bolt is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-primary/20 p-3 bg-card/50 pb-24">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="min-h-[44px] max-h-[100px] resize-none text-base border-primary/20 text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              maxLength={1000}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-11 w-11 bg-primary hover:bg-primary-electric text-primary-foreground shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TankChatWidget;
