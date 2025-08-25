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
      {/* Rainbow Beam Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900">
        {/* Animated Rainbow Beams */}
        {Array.from({ length: 25 }, (_, i) => {
          const colors = [
            ['rgb(232, 121, 249)', 'rgb(96, 165, 250)', 'rgb(94, 234, 212)'],
            ['rgb(232, 121, 249)', 'rgb(94, 234, 212)', 'rgb(96, 165, 250)'],
            ['rgb(94, 234, 212)', 'rgb(232, 121, 249)', 'rgb(96, 165, 250)'],
            ['rgb(94, 234, 212)', 'rgb(96, 165, 250)', 'rgb(232, 121, 249)'],
            ['rgb(96, 165, 250)', 'rgb(94, 234, 212)', 'rgb(232, 121, 249)'],
            ['rgb(96, 165, 250)', 'rgb(232, 121, 249)', 'rgb(94, 234, 212)']
          ];
          const colorSet = colors[Math.floor(Math.random() * colors.length)];
          const animationDuration = 45 - (45 / 25 / 2 * i);
          const animationDelay = -(i / 25 * 45);
          
          return (
            <div
              key={i}
              className="absolute top-0 w-0 h-screen origin-top-right"
              style={{
                transform: 'rotate(10deg)',
                boxShadow: `
                  -130px 0 80px 40px rgba(255, 255, 255, 0.6),
                  -50px 0 50px 25px ${colorSet[0]},
                  0 0 50px 25px ${colorSet[1]},
                  50px 0 50px 25px ${colorSet[2]},
                  130px 0 80px 40px rgba(255, 255, 255, 0.6)
                `,
                animation: `slide ${animationDuration}s linear infinite`,
                animationDelay: `${animationDelay}s`
              }}
            />
          );
        })}
        
        {/* Horizontal Light Overlay */}
        <div 
          className="absolute bottom-0 left-0 w-full h-0"
          style={{
            boxShadow: '0 0 50vh 40vh rgba(255, 255, 255, 0.1)'
          }}
        />
        
        {/* Vertical Light Overlay */}
        <div 
          className="absolute bottom-0 left-0 w-0 h-full"
          style={{
            boxShadow: '0 0 35vw 25vw rgba(255, 255, 255, 0.05)'
          }}
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30"></div>
      </div>
      
      <style>{`
        @keyframes slide {
          from {
            right: -25vw;
          }
          to {
            right: 125vw;
          }
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