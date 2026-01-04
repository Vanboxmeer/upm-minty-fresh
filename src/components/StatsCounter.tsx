import { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Rocket, Newspaper, Users, Globe } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Rocket className="w-8 h-8" />,
    value: 1500,
    suffix: "+",
    label: "Marketing Campaigns"
  },
  {
    icon: <Newspaper className="w-8 h-8" />,
    value: 250,
    suffix: "+",
    label: "Media Placements Monthly"
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 100,
    suffix: "+",
    label: "KOL Partners"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: 50,
    suffix: "M+",
    label: "Audience Reach"
  }
];

const AnimatedNumber = ({ 
  value, 
  suffix, 
  shouldAnimate 
}: { 
  value: number; 
  suffix: string; 
  shouldAnimate: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 2000; // 2 seconds
    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setDisplayValue(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldAnimate, value]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-retro-cyan bg-clip-text text-transparent">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section 
      ref={elementRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Cosmic effect overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-retro-cyan/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Trusted by Industry Leaders
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our track record speaks for itself. Join thousands of brands scaling their reach.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 
                hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex justify-center mb-4 text-primary">
                {stat.icon}
              </div>
              <AnimatedNumber 
                value={stat.value} 
                suffix={stat.suffix} 
                shouldAnimate={isVisible} 
              />
              <p className="mt-3 text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
