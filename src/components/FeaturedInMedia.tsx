import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const FeaturedInMedia = () => {
  const mediaOutlets = [
    {
      name: "Forbes",
      logo: "Forbes",
      textBased: true
    },
    {
      name: "Bloomberg",
      logo: "Bloomberg",
      textBased: true
    },
    {
      name: "Inc.",
      logo: "Inc.",
      textBased: true
    },
    {
      name: "Cointelegraph",
      logo: "Cointelegraph",
      textBased: true
    },
    {
      name: "CoinDesk",
      logo: "CoinDesk",
      textBased: true
    },
    {
      name: "Entrepreneur",
      logo: "Entrepreneur",
      textBased: true
    }
  ];

  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(150);

  return (
    <section ref={sectionRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Clients Have Been Featured In <span className="text-primary">Top Media</span>
          </h2>
        </div>
        
        <div ref={gridRef} className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {mediaOutlets.map((outlet, index) => (
            <div 
              key={index} 
              className={`transition-all duration-500 ${
                visibleItems.has(index) ? 'animate-fade-in hover-scale' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-muted flex items-center justify-center bg-card hover:border-primary/50 transition-colors">
                <span className="text-lg md:text-xl font-semibold text-foreground text-center px-4">
                  {outlet.logo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInMedia;