import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const TrustedBy = () => {
  const trustMetrics = [{
    number: "1,500+",
    label: "Projects Served",
    description: "Successfully delivered marketing campaigns across diverse Web3 sectors"
  }, {
    number: "95%",
    label: "Client Retention",
    description: "Long-term partnerships built on consistent results and trust"
  }, {
    number: "50M+",
    label: "Media Impressions",
    description: "Combined reach across tier-1 publications and media outlets"
  }, {
    number: "24/7",
    label: "Global Coverage",
    description: "Round-the-clock support with international media network"
  }];

  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(150);

  return <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by <span className="text-primary">Leading Web3 Projects</span>
          </h2>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustMetrics.map((metric, index) => <div 
              key={index} 
              className={`group text-center space-y-4 transition-all duration-500 hover:bg-muted/20 p-6 rounded-lg ${
                visibleItems.has(index) ? 'animate-fade-in card-hover' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {metric.label}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TrustedBy;