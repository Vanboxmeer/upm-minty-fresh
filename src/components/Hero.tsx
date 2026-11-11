import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/useParallax";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero = () => {
  const brandTypes = ["Every Brand", "Startups", "Online Stores", "Local Businesses", "Creators", "Apps & Tech"];
  const currentBrand = useTypewriter({ words: brandTypes, typeSpeed: 22, deleteSpeed: 12, delayBetweenWords: 1000 });
  // Parallax effects for background layers
  const parallaxSlow = useParallax({ speed: 0.1 });
  const parallaxMedium = useParallax({ speed: 0.2 });
  const parallaxFast = useParallax({ speed: 0.3 });

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
      <style>{`
@keyframes heroUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes heroShine{to{background-position:200% center}}
@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes heroOrb{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-20px) scale(1.15)}}
.hero-up{opacity:0;animation:heroUp .8s cubic-bezier(.2,.7,.2,1) forwards}
.hero-shine{background-size:200% auto;animation:heroShine 4s linear infinite}
.hero-chip{animation:heroFloat 4s ease-in-out infinite;transition:border-color .2s,background .2s}
.hero-chip:hover{border-color:hsl(var(--primary));background:rgba(255,255,255,.12)}
.hero-orb{animation:heroOrb 12s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.hero-up,.hero-shine,.hero-chip,.hero-orb{animation:none;opacity:1}}
`}</style>
      
      {/* Animated Background with Parallax */}
      <div className="absolute inset-0">
        {/* Base gradient with vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"></div>
        
        {/* Animated color overlays with retro colors */}
        <div className="absolute inset-0 retro-gradient opacity-30 animate-pulse"></div>
        
        {/* Floating geometric shapes with parallax */}
        <div className="absolute inset-0 parallax-layer">
          <div 
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary to-retro-cyan rounded-full blur-3xl opacity-40 hero-orb"
            style={{ transform: `translateY(${parallaxSlow}px)` }}
          />
          <div 
            className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-retro-purple to-retro-pink rounded-full blur-2xl opacity-50"
            style={{ transform: `translateY(${parallaxMedium}px)` }}
          />
          <div 
            className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-r from-retro-cyan to-primary-electric rounded-full blur-3xl opacity-40"
            style={{ transform: `translateY(${parallaxFast}px)` }}
          />
          <div 
            className="absolute bottom-20 right-1/3 w-72 h-72 bg-gradient-to-r from-primary-electric to-retro-purple rounded-full blur-3xl opacity-30"
            style={{ transform: `translateY(${parallaxMedium}px)` }}
          />
          
          {/* Retro grid pattern with subtle parallax */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary-neon)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-neon)) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              transform: `translateY(${parallaxSlow * 0.5}px)`
            }}
          />
        </div>
        
        {/* Content overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight hero-up text-white">
            <span className="block">Promotion & Media Partner for</span>
            <span className="bg-gradient-to-r from-primary via-retro-cyan to-primary-glow bg-clip-text text-transparent inline-block min-h-[1em] hero-shine">
              {currentBrand || '\u00A0'}
              <span className="animate-pulse text-primary ml-1 font-normal">|</span>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto hero-up" style={{animationDelay:"0.2s"}}>Whatever you sell, we put it in front of the right people: creators, press and communities. You approve every placement before it is booked.</p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Creator campaigns", "PR & press releases", "Native ads", "Social content", "Media features"].map((t, i) => (
              <span key={t} style={{animationDelay:`${0.4+i*0.1}s`}} className="hero-up px-3 py-1 rounded-full text-xs sm:text-sm text-gray-200 border border-white/20 bg-white/5 backdrop-blur-sm">{t}</span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-up" style={{animationDelay:"0.9s"}}>
            <Button variant="retro" size="lg" className="px-8 py-6 text-lg group relative overflow-hidden cta-pulse cta-shimmer cta-glow-hover" onClick={scrollToCoveragePackages}>
              <span className="group-hover:scale-110 transition-transform duration-200">Start a Campaign</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-[synthwave-scan_1s_ease-in-out] pointer-events-none" />
            </Button>
            <Button variant="synthwave" size="lg" className="px-8 py-6 text-lg group relative overflow-hidden cta-shimmer cta-glow-hover" asChild>
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