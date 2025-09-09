import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";
const Hero = () => {
  const brandTypes = ["AI Brands", "Web3 Brands", "GameFi Brands", "VR Brands", "Crypto Brands", "Tech Brands"];
  const currentBrand = useTypewriter({
    words: brandTypes,
    typeSpeed: 50,
    deleteSpeed: 25,
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
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dark base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Animated color overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/20 animate-pulse"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/40 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-accent/50 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-primary/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-accent/25 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Content overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-white">
            Digital Marketing Services for{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent inline-block min-h-[1em]">
              {currentBrand || '\u00A0'}
              <span className="animate-pulse text-white ml-1 font-thin">|</span>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">UPM helps you get in front of the right audience through powerful kol collaborations, PR distribution, native ad placements, and earned tier 1 media features.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button variant="hero" size="lg" className="px-8 py-6 text-lg group" onClick={scrollToCoveragePackages}>
              <span className="group-hover:scale-110 transition-transform duration-200">Start a Campaign</span>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg hover:bg-white/10 hover:border-white hover:text-white transition-all duration-300 button-glow group" asChild>
              <a href="/services">
                <span className="group-hover:scale-110 transition-transform duration-200">View Our Services</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;