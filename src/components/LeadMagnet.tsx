import { useState } from "react";
import { Download, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LeadMagnetProps {
  title?: string;
  description?: string;
  resourceName?: string;
  className?: string;
}

export const LeadMagnet = ({
  title = "Free Web3 Marketing Checklist",
  description = "Download our comprehensive checklist to launch your next successful marketing campaign.",
  resourceName = "Web3 Marketing Checklist",
  className = ""
}: LeadMagnetProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to download the resource.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email, source: `lead-magnet-${resourceName.toLowerCase().replace(/\s+/g, '-')}` }
      });

      if (error) throw error;

      if (data?.alreadySubscribed) {
        toast({
          title: "You're already subscribed!",
          description: "Check your email for the download link.",
        });
      } else {
        toast({
          title: "Success!",
          description: "Check your email for the download link.",
        });
      }
      
      setIsSubscribed(true);
    } catch (error) {
      console.error('Lead magnet error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`p-6 bg-primary/5 border-primary/20 ${className}`}>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400">Check your inbox!</h4>
            <p className="text-sm text-muted-foreground">
              We've sent the {resourceName} to your email.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 bg-gradient-to-br from-primary/5 to-retro-cyan/5 border-primary/20 ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Download className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            {description}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-[220px]"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Get Free Download
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default LeadMagnet;
