import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TelegramChat = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Button
        variant="default"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white"
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