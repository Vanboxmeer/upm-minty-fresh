import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TelegramChat = () => {
  return (
    <div 
      className="fixed bottom-4 z-50 animate-[fade-in_0.6s_ease-out_0.5s_both,scale-in_0.4s_ease-out_0.5s_both] hidden md:block" 
      style={{ right: '1rem' }}
    >
      <Button
        variant="default"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow [box-shadow:0_0_20px_var(--primary-glow),0_0_40px_var(--primary-glow)] hover:[box-shadow:0_0_30px_var(--primary-glow),0_0_60px_var(--primary-glow)]"
        asChild
      >
        <a 
          href="http://t.me/unitedpressmedia" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat with us on Telegram"
        >
          <Send size={24} />
        </a>
      </Button>
    </div>
  );
};

export default TelegramChat;
