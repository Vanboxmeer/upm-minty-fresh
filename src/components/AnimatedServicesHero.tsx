import { useEffect, useState, useMemo } from "react";

// Sleek outlined social media icons with neon glow effect
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <path d="M8 11v5M8 8v.01M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 5L2 12.5l7 2M21 5l-12 9.5M21 5l-5 15-7-7.5" strokeLinecap="round" strokeLinejoin="round" />
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
    { Icon: XIcon, name: "X", borderColor: "border-zinc-400", glowColor: "shadow-zinc-400/50", textColor: "text-zinc-300", angle: 0, radius: 38, speed: 25 },
    { Icon: TikTokIcon, name: "TikTok", borderColor: "border-pink-400", glowColor: "shadow-pink-400/50", textColor: "text-pink-300", angle: 72, radius: 38, speed: 25 },
    { Icon: YouTubeIcon, name: "YouTube", borderColor: "border-red-400", glowColor: "shadow-red-400/50", textColor: "text-red-300", angle: 144, radius: 38, speed: 25 },
    { Icon: LinkedInIcon, name: "LinkedIn", borderColor: "border-blue-400", glowColor: "shadow-blue-400/50", textColor: "text-blue-300", angle: 216, radius: 38, speed: 25 },
    { Icon: TelegramIcon, name: "Telegram", borderColor: "border-sky-400", glowColor: "shadow-sky-400/50", textColor: "text-sky-300", angle: 288, radius: 38, speed: 25 },
  ];

  // Calculate current rotation angle based on time
  const [rotation, setRotation] = useState(0);
  
  // Generate stable particle positions once
  const particles = useMemo(() => 
    [...Array(15)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.5,
    })), []
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
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

      {/* Floating particles - stable positions with smooth drift animation */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float-${i % 3} ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: particle.opacity,
            }}
          />
        ))}
        <style>{`
          @keyframes float-0 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, -15px); }
          }
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-8px, 12px); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(12px, 8px); }
          }
        `}</style>
      </div>

      {/* Central hub with UPM Logo - always has active hover effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10">
          <div className="relative">
            {/* Retro cyan glow layers - mimicking retro-logo-hover effect */}
            <div className="absolute -inset-8 bg-retro-cyan/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -inset-6 bg-retro-cyan/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute -inset-4 bg-primary/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.4s' }} />
            
            {/* Main logo container */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Animated gradient ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan via-primary to-retro-purple animate-[spin_8s_linear_infinite]" />
              
              {/* Inner circle with logo */}
              <div className="absolute inset-[4px] rounded-full bg-slate-900/95 flex items-center justify-center overflow-hidden">
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                
                {/* UPM Logo - larger with retro glow effect always active */}
                <img 
                  src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
                  alt="UPM Logo"
                  className="w-24 h-24 object-contain"
                  style={{
                    filter: `
                      drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))
                      drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))
                      drop-shadow(0 0 25px rgba(0, 255, 255, 0.4))
                      drop-shadow(0 0 35px rgba(139, 92, 246, 0.3))
                    `
                  }}
                />
              </div>
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_-8px_20px_rgba(0,0,0,0.4),inset_0_4px_10px_rgba(255,255,255,0.1)]" />
            </div>
            
            {/* Orbiting ring effects */}
            <div className="absolute -inset-10 border border-retro-cyan/30 rounded-full animate-[spin_15s_linear_infinite]" />
            <div className="absolute -inset-16 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          </div>
        </div>

        {/* Social Platform Icons - positioned using angle calculations to stay upright */}
        {socialPlatforms.map((platform) => {
          const currentAngle = (platform.angle + rotation) * (Math.PI / 180);
          const x = Math.cos(currentAngle) * platform.radius;
          const y = Math.sin(currentAngle) * platform.radius;
          
          return (
            <div 
              key={platform.name}
              className="absolute group cursor-pointer"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.05s linear, top 0.05s linear'
              }}
            >
              {/* Neon glow effect */}
              <div className={`absolute -inset-2 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition-opacity bg-current ${platform.textColor}`} />
              
              {/* Main icon container - sleek bordered style */}
              <div className={`relative w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-sm border-2 ${platform.borderColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${platform.glowColor}`}>
                {/* Icon with neon color */}
                <div className={`${platform.textColor}`}>
                  <platform.Icon />
                </div>
              </div>
              
              {/* Label */}
              <div className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold ${platform.textColor} opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 px-2 py-1 rounded backdrop-blur-sm border ${platform.borderColor}`}>
                {platform.name}
              </div>
            </div>
          );
        })}

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
        {[...Array(3)].map((_, i) => (
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
