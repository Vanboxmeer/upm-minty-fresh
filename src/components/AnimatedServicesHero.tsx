import { useEffect, useState } from "react";
import { Users, FileText, Megaphone, TrendingUp, Network, Sparkles } from "lucide-react";

const AnimatedServicesHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('services-hero')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      id="services-hero"
      className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"
    >
      {/* Animated background gradient that follows mouse */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary)) 0%, transparent 50%)`
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary-neon)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-neon)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Central hub with orbiting elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center node - representing your brand */}
        <div className="relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-2xl border-2 border-primary-neon/50">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Orbiting service icons */}
        {/* KOL Collaborations - Top Left */}
        <div 
          className="absolute w-full h-full animate-[spin_20s_linear_infinite]"
          style={{ animationDirection: 'normal' }}
        >
          <div 
            className="absolute top-[15%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
            style={{ animation: 'spin 20s linear infinite reverse' }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-retro-cyan/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-retro-cyan to-primary flex items-center justify-center shadow-xl border-2 border-retro-cyan/50 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-retro-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                KOL Network
              </div>
            </div>
          </div>
        </div>

        {/* Press Releases - Top Right */}
        <div 
          className="absolute w-full h-full animate-[spin_25s_linear_infinite]"
          style={{ animationDirection: 'normal' }}
        >
          <div 
            className="absolute top-[15%] right-[20%] transform translate-x-1/2 -translate-y-1/2"
            style={{ animation: 'spin 25s linear infinite reverse' }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-retro-purple/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-retro-purple to-retro-pink flex items-center justify-center shadow-xl border-2 border-retro-purple/50 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-retro-purple opacity-0 group-hover:opacity-100 transition-opacity">
                Press Releases
              </div>
            </div>
          </div>
        </div>

        {/* Media Features - Bottom */}
        <div 
          className="absolute w-full h-full animate-[spin_18s_linear_infinite]"
          style={{ animationDirection: 'normal' }}
        >
          <div 
            className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 translate-y-1/2"
            style={{ animation: 'spin 18s linear infinite reverse' }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-retro-pink/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-retro-pink to-primary flex items-center justify-center shadow-xl border-2 border-retro-pink/50 group-hover:scale-110 transition-transform">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-retro-pink opacity-0 group-hover:opacity-100 transition-opacity">
                Media Features
              </div>
            </div>
          </div>
        </div>

        {/* Growth/Analytics - Right */}
        <div 
          className="absolute w-full h-full animate-[spin_22s_linear_infinite]"
          style={{ animationDirection: 'normal' }}
        >
          <div 
            className="absolute top-1/2 right-[10%] transform translate-x-1/2 -translate-y-1/2"
            style={{ animation: 'spin 22s linear infinite reverse' }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-electric/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary-electric to-retro-cyan flex items-center justify-center shadow-xl border-2 border-primary-electric/50 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-primary-electric opacity-0 group-hover:opacity-100 transition-opacity">
                Growth
              </div>
            </div>
          </div>
        </div>

        {/* Network Effect - Left */}
        <div 
          className="absolute w-full h-full animate-[spin_24s_linear_infinite]"
          style={{ animationDirection: 'normal' }}
        >
          <div 
            className="absolute top-1/2 left-[10%] transform -translate-x-1/2 -translate-y-1/2"
            style={{ animation: 'spin 24s linear infinite reverse' }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-xl border-2 border-primary/50 group-hover:scale-110 transition-transform">
                <Network className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Distribution
              </div>
            </div>
          </div>
        </div>

        {/* Connecting lines/paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}>
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          
          {/* Animated connection lines */}
          <circle 
            cx="50%" 
            cy="50%" 
            r="25%" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="1"
            className="animate-pulse"
            style={{ opacity: 0.3 }}
          />
          <circle 
            cx="50%" 
            cy="50%" 
            r="35%" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="1"
            className="animate-pulse"
            style={{ opacity: 0.2, animationDelay: '0.5s' }}
          />
        </svg>

        {/* Data flow particles along the orbits */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute w-full h-full"
            style={{
              animation: `spin ${15 + i * 2}s linear infinite`,
              animationDelay: `${-i * 2}s`
            }}
          >
            <div 
              className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
              style={{
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
  );
};

export default AnimatedServicesHero;
