import { ArrowRight, Rocket, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogPostCTAProps {
  variant?: "inline" | "end";
}

export const BlogPostCTA = ({ variant = "end" }: BlogPostCTAProps) => {
  if (variant === "inline") {
    return (
      <Card className="my-8 p-6 bg-muted/50 border-primary/20 not-prose">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-semibold mb-1">Need help with your marketing strategy?</h4>
            <p className="text-sm text-muted-foreground">
              Get a free consultation with our experts. No commitment required.
            </p>
          </div>
          <Button asChild variant="outline" className="whitespace-nowrap">
            <a 
              href="http://t.me/unitedpressmedia" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Chat Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-muted to-retro-cyan/10 border border-primary/20 not-prose">
      <div className="text-center max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">Ready to Scale Your Brand?</h3>
        <p className="text-muted-foreground mb-6">
          Join 1500+ marketing teams using UPM to amplify their reach with press releases, KOL collaborations, and tier-1 media placements.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="group">
            <Link to="/#packages">
              Start a Campaign
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a 
              href="http://t.me/unitedpressmedia" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Talk to an Expert
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCTA;
