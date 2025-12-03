import { useEffect, useState } from "react";

// Custom social media icons as components
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

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

  const socialPlatforms = [
    { Icon: XIcon, name: "X", color: "from-zinc-800 via-zinc-700 to-zinc-900", glowColor: "bg-zinc-500/50", textColor: "text-zinc-400", position: "top-[12%] left-[25%]", speed: 20 },
    { Icon: TikTokIcon, name: "TikTok", color: "from-pink-500 via-cyan-400 to-pink-600", glowColor: "bg-pink-500/50", textColor: "text-pink-400", position: "top-[12%] right-[25%]", speed: 25 },
    { Icon: YouTubeIcon, name: "YouTube", color: "from-red-600 via-red-500 to-red-700", glowColor: "bg-red-500/50", textColor: "text-red-400", position: "bottom-[12%] left-1/2 -translate-x-1/2", speed: 18 },
    { Icon: LinkedInIcon, name: "LinkedIn", color: "from-blue-600 via-blue-500 to-blue-700", glowColor: "bg-blue-500/50", textColor: "text-blue-400", position: "top-1/2 right-[8%] -translate-y-1/2", speed: 22 },
    { Icon: TelegramIcon, name: "Telegram", color: "from-sky-500 via-sky-400 to-sky-600", glowColor: "bg-sky-500/50", textColor: "text-sky-400", position: "top-1/2 left-[8%] -translate-y-1/2", speed: 24 },
  ];

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
        {[...Array(15)].map((_, i) => (
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

      {/* Central hub with UPM Logo - always has active hover effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10">
          <div className="relative">
            {/* Outer glow rings - always active */}
            <div className="absolute -inset-6 bg-primary/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -inset-4 bg-primary/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute -inset-2 bg-primary-glow/50 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.6s' }} />
            
            {/* Main logo container - always scaled up */}
            <div className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-2xl overflow-hidden scale-110">
              {/* Animated gradient ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-retro-purple to-retro-cyan animate-[spin_6s_linear_infinite]" />
              
              {/* Inner circle with logo */}
              <div className="absolute inset-[3px] rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                
                {/* UPM Logo */}
                <img 
                  src="/lovable-uploads/e7c5744d-4804-4575-b2f2-0e55bee6382b.png" 
                  alt="UPM Logo"
                  className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                />
              </div>
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_-8px_20px_rgba(0,0,0,0.4),inset_0_4px_10px_rgba(255,255,255,0.1)]" />
            </div>
            
            {/* Orbiting ring effects */}
            <div className="absolute -inset-8 border border-primary/40 rounded-full animate-[spin_15s_linear_infinite]" />
            <div className="absolute -inset-12 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          </div>
        </div>

        {/* Social Platform Icons */}
        {socialPlatforms.map((platform, index) => (
          <div 
            key={platform.name}
            className="absolute w-full h-full"
            style={{ animation: `spin ${platform.speed}s linear infinite` }}
          >
            <div 
              className={`absolute ${platform.position}`}
              style={{ animation: `spin ${platform.speed}s linear infinite reverse` }}
            >
              <div className="relative group cursor-pointer">
                {/* Outer glow */}
                <div className={`absolute -inset-3 ${platform.glowColor} rounded-full blur-xl group-hover:blur-2xl transition-all opacity-60 group-hover:opacity-100`} />
                
                {/* Main orb */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden group-hover:scale-125 transition-transform duration-300 shadow-2xl">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color}`} />
                  
                  {/* Glass highlight */}
                  <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/30 via-white/5 to-transparent" />
                  
                  {/* Inner depth shadow */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_-6px_15px_rgba(0,0,0,0.5),inset_0_3px_8px_rgba(255,255,255,0.2)]" />
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <platform.Icon />
                  </div>
                </div>
                
                {/* Label */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold ${platform.textColor} opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10`}>
                  {platform.name}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Connecting lines/paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}>
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          
          {/* Animated connection circles */}
          <circle 
            cx="50%" 
            cy="50%" 
            r="22%" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="1"
            strokeDasharray="8 4"
            className="animate-[spin_30s_linear_infinite]"
            style={{ opacity: 0.4 }}
          />
          <circle 
            cx="50%" 
            cy="50%" 
            r="32%" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="1"
            strokeDasharray="12 6"
            className="animate-[spin_40s_linear_infinite_reverse]"
            style={{ opacity: 0.3 }}
          />
        </svg>

        {/* Data flow particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute w-full h-full"
            style={{
              animation: `spin ${12 + i * 3}s linear infinite`,
              animationDelay: `${-i * 2}s`
            }}
          >
            <div 
              className="absolute top-[8%] left-1/2 w-2 h-2 bg-gradient-to-r from-primary to-retro-cyan rounded-full shadow-lg shadow-primary/50"
              style={{ transform: 'translateX(-50%)' }}
            />
          </div>
        ))}
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
  );
};

export default AnimatedServicesHero;
