import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
}

interface AnimatedStarfieldProps {
  starCount?: number;
  className?: string;
  showNebula?: boolean;
  showShootingStars?: boolean;
  intensity?: "subtle" | "normal" | "intense";
}

const AnimatedStarfield = ({
  starCount = 80,
  className = "",
  showNebula = true,
  showShootingStars = true,
  intensity = "normal"
}: AnimatedStarfieldProps) => {
  // Generate stable star positions
  const stars = useMemo<Star[]>(() => {
    const colorOptions = ['#00ffff', '#a855f7', '#ffffff', '#ec4899', '#3b82f6'];
    return [...Array(starCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.85 ? 3 : Math.random() > 0.5 ? 2 : 1,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      opacity: 0.3 + Math.random() * 0.7,
      twinkleDuration: 2 + Math.random() * 4,
      twinkleDelay: Math.random() * 5,
      driftX: (Math.random() - 0.5) * (intensity === "intense" ? 20 : intensity === "subtle" ? 6 : 12),
      driftY: (Math.random() - 0.5) * (intensity === "intense" ? 20 : intensity === "subtle" ? 6 : 12),
      driftDuration: 8 + Math.random() * 12,
    }));
  }, [starCount, intensity]);

  // Generate shooting star data
  const shootingStars = useMemo(() => 
    showShootingStars ? [
      { x: 70, y: 15, width: 32, angle: -45, duration: 3, delay: 0 },
      { x: 20, y: 35, width: 20, angle: -35, duration: 4, delay: 1.5 },
      { x: 85, y: 60, width: 24, angle: -50, duration: 5, delay: 3 },
    ] : []
  , [showShootingStars]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1e] via-[#1a0a2e] to-[#0c1929]" />
      
      {/* Animated stars layer */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              background: star.color,
              opacity: star.opacity,
              boxShadow: star.size >= 2 ? `0 0 ${star.size * 2}px ${star.size}px ${star.color}40` : 'none',
              animation: `
                starTwinkle ${star.twinkleDuration}s ease-in-out infinite,
                starDrift-${star.id % 4} ${star.driftDuration}s ease-in-out infinite
              `,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula glow effects */}
      {showNebula && (
        <>
          <div 
            className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{ 
              top: '15%',
              left: '20%',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.25) 0%, transparent 70%)',
              animation: 'nebulaPulse 6s ease-in-out infinite',
            }} 
          />
          <div 
            className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full blur-3xl"
            style={{ 
              top: '25%',
              right: '15%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
              animation: 'nebulaPulse 8s ease-in-out infinite',
              animationDelay: '2s',
            }} 
          />
          <div 
            className="absolute w-full h-48 rounded-full blur-3xl"
            style={{ 
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
              animation: 'nebulaPulse 10s ease-in-out infinite',
              animationDelay: '4s',
            }} 
          />
        </>
      )}

      {/* Shooting stars */}
      {shootingStars.map((star, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            width: `${star.width}px`,
            height: '2px',
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: `rotate(${star.angle}deg)`,
            animation: `shootingStar ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* CSS Animations */}
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: var(--tw-opacity, 0.5); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes starDrift-0 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -6px); }
          50% { transform: translate(12px, 4px); }
          75% { transform: translate(-4px, 8px); }
        }
        
        @keyframes starDrift-1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-10px, 8px); }
          66% { transform: translate(6px, -10px); }
        }
        
        @keyframes starDrift-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        
        @keyframes starDrift-3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-6px, -8px); }
          50% { transform: translate(4px, -12px); }
          75% { transform: translate(8px, 4px); }
        }
        
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes shootingStar {
          0%, 90%, 100% { opacity: 0; transform: translateX(0) rotate(var(--angle, -45deg)); }
          5% { opacity: 0.8; }
          15% { opacity: 0; transform: translateX(100px) rotate(var(--angle, -45deg)); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedStarfield;
