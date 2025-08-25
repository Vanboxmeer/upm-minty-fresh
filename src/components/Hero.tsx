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
      {/* Blockchain Tech AI Background */}
      <div className="absolute inset-0">
        {/* Dark tech gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900"></div>
        
        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D9FF' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Animated connection lines */}
        <div className="absolute inset-0">
          {/* Network nodes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 20px #00D9FF' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s', boxShadow: '0 0 15px #3B82F6' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s', boxShadow: '0 0 15px #A855F7' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s', boxShadow: '0 0 20px #10B981' }}></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s', boxShadow: '0 0 10px #EAB308' }}></div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00D9FF', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
              </linearGradient>
              <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#A855F7', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <line x1="25%" y1="25%" x2="75%" y2="33%" stroke="url(#line1)" strokeWidth="1" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="33%" y1="67%" x2="67%" y2="75%" stroke="url(#line2)" strokeWidth="1" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="25%" y1="25%" x2="33%" y2="67%" stroke="url(#line1)" strokeWidth="1" opacity="0.4">
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="75%" y1="33%" x2="67%" y2="75%" stroke="url(#line2)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-20 w-1 h-1 bg-cyan-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute top-32 right-16 w-0.5 h-0.5 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute bottom-20 left-32 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
          <div className="absolute bottom-40 right-20 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
          <div className="absolute top-1/2 left-16 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '3s', animationDuration: '11s' }}></div>
          <div className="absolute top-20 right-1/3 w-1 h-1 bg-indigo-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '5s', animationDuration: '7s' }}></div>
        </div>
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"></div>
      </div>
      
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