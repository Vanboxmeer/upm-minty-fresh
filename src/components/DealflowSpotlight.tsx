import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import dealflowLogo from "@/assets/apps/dealflow-logo.svg";

const DealflowSpotlight = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="dealflow"
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div
          ref={elementRef}
          className={`max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="shrink-0 relative">
              <div
                className="absolute -inset-5 rounded-full blur-2xl opacity-50"
                style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35), rgba(30,58,138,0.25))" }}
              />
              <img src={dealflowLogo} alt="Dealflow by UPM" className="relative h-20 w-20 md:h-24 md:w-24" />
            </div>

            <div className="text-center md:text-left">
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-primary-glow">
                Powered by Dealflow
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 text-white">
                The system that does the legwork
              </h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-5">
                Shortlists researched against your brand rather than pulled from a generic database.
                One professional voice across every approach. A follow-up date on every thread, so the
                creator who said &ldquo;not now&rdquo; in March gets asked again in June. It is our own
                software, built after watching too many good deals die in a shared inbox &mdash; and it
                comes with Silver and Gold.
              </p>
              <Link
                to="/dealflow"
                className="inline-flex items-center gap-2 font-semibold text-primary-glow hover:gap-3 transition-all"
              >
                See how Dealflow works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealflowSpotlight;
