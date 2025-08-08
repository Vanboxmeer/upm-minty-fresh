import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
const Hero = () => {
  const scrollToCoveragePackages = () => {
    const coverageSection = document.getElementById('coverage-packages');
    if (coverageSection) {
      coverageSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-semibold mb-4 animate-fade-in">Reach your KPI Goals with Data-Driven and Targeted Strategies</p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Growth Platform Built for{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Digital Marketing
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">UPM helps you get in front of the right audience through powerful kol collaborations, PR distribution, native ad placements, and earned tier 1 media features.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button variant="hero" size="lg" className="px-8 py-6 text-lg" onClick={scrollToCoveragePackages}>
              Start a Campaign
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;