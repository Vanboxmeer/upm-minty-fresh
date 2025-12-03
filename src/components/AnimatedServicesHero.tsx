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
            {/* Outer glow rings */}
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -inset-2 bg-primary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            {/* Main orb with glassmorphism */}
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-retro-purple animate-[spin_8s_linear_infinite]" />
              {/* Inner highlight */}
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              {/* Glass overlay */}
              <div className="absolute inset-[3px] rounded-full backdrop-blur-sm bg-gradient-to-br from-white/10 to-transparent" />
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_-8px_20px_rgba(0,0,0,0.4),inset_0_4px_10px_rgba(255,255,255,0.2)]" />
              {/* Icon */}
              <Sparkles className="relative w-12 h-12 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-pulse" />
            </div>
            {/* Orbiting ring effect */}
            <div className="absolute -inset-6 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
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
            <div className="relative group cursor-pointer">
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-retro-cyan/40 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-60 group-hover:opacity-100" />
              {/* Main orb */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan via-primary to-retro-cyan/80" />
                {/* Glass highlight */}
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                {/* Inner depth shadow */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_-6px_15px_rgba(0,0,0,0.4),inset_0_3px_8px_rgba(255,255,255,0.3)]" />
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-7 h-7 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-retro-cyan opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
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
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-retro-purple/40 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-60 group-hover:opacity-100" />
              <div className="relative w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-purple via-retro-pink to-retro-purple/80" />
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_-6px_15px_rgba(0,0,0,0.4),inset_0_3px_8px_rgba(255,255,255,0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-retro-purple opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
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
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-retro-pink/40 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-60 group-hover:opacity-100" />
              <div className="relative w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-pink via-primary to-retro-pink/80" />
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_-6px_15px_rgba(0,0,0,0.4),inset_0_3px_8px_rgba(255,255,255,0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Megaphone className="w-7 h-7 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-retro-pink opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
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
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-primary-electric/40 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-60 group-hover:opacity-100" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-electric via-retro-cyan to-primary-electric/80" />
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_-6px_15px_rgba(0,0,0,0.4),inset_0_3px_8px_rgba(255,255,255,0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-primary-electric opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
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
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-primary/40 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-60 group-hover:opacity-100" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-primary/80" />
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_-6px_15px_rgba(0,0,0,0.4),inset_0_3px_8px_rgba(255,255,255,0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Network className="w-6 h-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
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
