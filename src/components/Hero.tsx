import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";
const Hero = () => {
  const brandTypes = ["AI Brands", "Web3 Brands", "Gaming Brands", "VR Brands", "Crypto Brands", "Tech Brands"];
  const currentBrand = useTypewriter({
    words: brandTypes,
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });

  const scrollToCoveragePackages = () => {
    // Navigate to home if not there, then scroll
    if (window.location.pathname !== '/') {
      window.location.href = '/#package-selector';
    } else {
      const packageSection = document.querySelector('[data-section="package-selector"]');
      if (packageSection) {
        const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Rainbow Background */}
      <div className="absolute inset-0">
        {/* Animated subtle gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, 
                rgba(147, 51, 234, 0.1) 0%, 
                rgba(59, 130, 246, 0.1) 25%, 
                rgba(16, 185, 129, 0.1) 50%, 
                rgba(236, 72, 153, 0.1) 75%, 
                rgba(147, 51, 234, 0.1) 100%
              )
            `,
            backgroundSize: '400% 400%',
            animation: 'gradientShift 20s ease infinite'
          }}
        />
        
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-slate-950/85"></div>
        
        {/* Subtle moving gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                rgba(147, 51, 234, 0.2) 25%, 
                rgba(59, 130, 246, 0.2) 50%, 
                rgba(16, 185, 129, 0.2) 75%, 
                transparent 100%
              )
            `,
            backgroundSize: '200% 100%',
            animation: 'slowSlide 30s linear infinite'
          }}
        />
      </div>
      
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slowSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      <div className="relative container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-white">
            Digital Marketing Services for{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {currentBrand}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">UPM helps you get in front of the right audience through powerful kol collaborations, PR distribution, native ad placements, and earned tier 1 media features.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button variant="hero" size="lg" className="px-8 py-6 text-lg" onClick={scrollToCoveragePackages}>
              Start a Campaign
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
              <a href="/services">View Our Services</a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;