import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import fullmediaAlchemistIcon from "@/assets/apps/fullmedia-alchemist.svg";

// The Alchemist character art, as published by the app itself on fullmediaalchemist.com
const ALCHEMIST_CHARACTER =
  "https://tpqvvrdglnsdljdpzwfl.supabase.co/storage/v1/object/public/wheel-assets/content-calendar/platform-brand/assistant-wave.png";

const FullmediaAlchemistSpotlight = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-full blur-3xl opacity-40"
                style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(16,185,129,0.3))" }}
              />
              <img
                src={ALCHEMIST_CHARACTER}
                alt="The Alchemist, the brand assistant inside Fullmedia Alchemist"
                loading="lazy"
                width={1024}
                height={1536}
                onError={(e) => { e.currentTarget.src = fullmediaAlchemistIcon; }}
                className="relative w-[200px] md:w-[260px] h-auto object-contain"
              />
            </div>
          </div>

          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Your accounts, always posting
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fullmedia Alchemist
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              An app you log into and run yourself, with an agentic brand assistant —
              <strong className="text-foreground"> The Alchemist</strong> — who builds and improves your
              content campaigns. It drafts on-brand posts grounded in your brand&apos;s real details
              (never invented), ships them fully designed across eight platforms on your posting
              schedule, then reviews what actually went live to sharpen the next campaign — so the
              content gets sharper the longer you run it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="hero">
                <a
                  href="https://www.fullmediaalchemist.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Visit Fullmedia Alchemist
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/our-products">See All UPM Apps</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullmediaAlchemistSpotlight;
