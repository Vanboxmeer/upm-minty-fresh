import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { n: "01", title: "Brief", text: "You tell us the brand, the audience and the budget." },
  { n: "02", title: "Shortlist", text: "We add creators and outlets to your campaign sheet." },
  { n: "03", title: "You approve", text: "Nothing is booked or paid until you say so." },
  { n: "04", title: "Track", text: "Follow every placement's status in the same sheet." },
];

const HowItWorks = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">How a campaign runs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{s.n}</div>
                <h3 className="text-xl font-semibold text-white mt-2 mb-2">{s.title}</h3>
                <p className="text-gray-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
