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
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient with vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"></div>
        
        {/* Animated color overlays with retro colors */}
        <div className="absolute inset-0 retro-gradient opacity-30 animate-pulse"></div>
        
        {/* Floating geometric shapes with vibrant colors */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary to-retro-cyan rounded-full blur-3xl opacity-40 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-retro-purple to-retro-pink rounded-full blur-2xl opacity-50 animate-bounce" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-r from-retro-cyan to-primary-electric rounded-full blur-3xl opacity-40 animate-bounce" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-gradient-to-r from-primary-electric to-retro-purple rounded-full blur-3xl opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          
          {/* Retro grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary-neon)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-neon)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Content overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-white">
            <span className="block">Media Partner for</span>
            <span className="neon-gradient bg-clip-text text-transparent inline-block min-h-[1em] retro-text-glow">
              {currentBrand || '\u00A0'}
              <span className="animate-pulse text-retro-cyan ml-1 font-thin">|</span>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">UPM helps you get in front of the right audience through powerful kol collaborations, PR distribution, native ad placements, and earned tier 1 media features.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button variant="retro" size="lg" className="px-8 py-6 text-lg group relative overflow-hidden" onClick={scrollToCoveragePackages}>
              <span className="group-hover:scale-110 transition-transform duration-200">Start a Campaign</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
            </Button>
            <Button variant="synthwave" size="lg" className="px-8 py-6 text-lg group relative overflow-hidden" asChild>
              <a href="/services">
                <span className="group-hover:scale-110 transition-transform duration-200">View Our Services</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-retro-cyan/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;