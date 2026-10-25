import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import alchemistMark from "@/assets/apps/fullmedia-alchemist.svg";

const AlchemistReachSpotlight = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="alchemist-reach"
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #12160f 0%, #16241c 50%, #12160f 100%)" }}
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
                style={{ background: "radial-gradient(circle, rgba(232,163,61,0.35), rgba(46,156,116,0.3))" }}
              />
              <img src={alchemistMark} alt="Alchemist Reach, part of Fullmedia Alchemist" className="relative h-20 w-20 md:h-24 md:w-24" />
            </div>

            <div className="text-center md:text-left">
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-primary-glow">
                Powered by Alchemist Reach
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 text-white">
                Every campaign runs on Alchemist Reach
              </h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-5">
                Shortlists researched against your brand rather than pulled from a generic database.
                One professional voice across every approach. A follow-up date on every thread, so the
                creator who said &ldquo;not now&rdquo; in March gets asked again in June. It is our own
                software, built after watching too many good deals die in a shared inbox. Run it yourself
                on a free-to-start plan, or let UPM run it for you with Silver and Gold.
              </p>
              <Link
                to="/alchemist-reach"
                className="inline-flex items-center gap-2 font-semibold text-primary-glow hover:gap-3 transition-all"
              >
                Explore Alchemist Reach
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlchemistReachSpotlight;
