import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GitBranch, Users, MessageSquareText, Gift } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import dealflowLogo from "@/assets/apps/dealflow-logo.svg";

const DealflowSpotlight = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const points = [
    {
      icon: Users,
      title: "One list, every brand",
      description:
        "Every creator and publication we've researched lives in a single shared list — so two of your campaigns never quote the same channel twice with different numbers."
    },
    {
      icon: MessageSquareText,
      title: "Every conversation logged",
      description:
        "First message, reply, quoted rate, counter-offer, next action, follow-up date. Picking a thread back up after two weeks takes seconds, not an inbox search."
    },
    {
      icon: Gift,
      title: "Free coverage counts",
      description:
        "\"Said yes for free\" is tracked as a real outcome alongside paid placements — not buried in a notes column as a consolation prize."
    },
    {
      icon: GitBranch,
      title: "Built to keep growing",
      description:
        "New brand, new niche, new creators — it extends without a rebuild. Adding a client doesn't mean starting another spreadsheet from scratch."
    }
  ];

  return (
    <section
      id="dealflow"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div
          ref={elementRef}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-full blur-2xl opacity-50"
                  style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35), rgba(30,58,138,0.25))" }}
                />
                <img
                  src={dealflowLogo}
                  alt="Dealflow by UPM"
                  className="relative h-20 w-20 md:h-24 md:w-24"
                />
              </div>
            </div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary-glow text-sm font-medium mb-4 border border-primary/30">
              A UPM Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white">
              Dealflow by UPM
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The outreach system behind every campaign we run. When you work with UPM you
              aren't trusting an inbox — every creator we approach for you, every reply and
              every quoted rate is tracked in one place, so you always know exactly where a
              conversation stands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className={`flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="shrink-0">
                    <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                      <Icon className="h-6 w-6 text-primary-glow" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{point.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="hero">
              <Link
                to="/blog/dealflow-by-upm-how-we-stopped-losing-creator-deals-in-our-inbox"
                className="flex items-center justify-center gap-2"
              >
                See how Dealflow works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white hover:text-slate-900"
            >
              <Link to="/contact">Start a campaign</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealflowSpotlight;
