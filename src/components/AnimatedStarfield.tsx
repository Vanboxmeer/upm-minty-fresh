import { useEffect, useRef, useState } from "react";

interface AnimatedStarfieldProps {
  className?: string;
}

/**
 * Star Wars-style cosmic background - flying through space.
 * Stars pass by the sides like looking out a spaceship window.
 * Includes distant star layer for depth.
 */
const AnimatedStarfield = ({ className = "" }: AnimatedStarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(() => 
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let centerX = 0;
    let centerY = 0;

    interface Star {
      x: number;
      y: number;
      z: number;
      baseSize: number;
      color: { r: number; g: number; b: number };
    }

    interface DistantStar {
      x: number;
      y: number;
      size: number;
      opacity: number;
      drift: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }

    let stars: Star[] = [];
    let distantStars: DistantStar[] = [];
    let shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const maxDepth = 2000;
    const speed = 1.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      centerX = canvasWidth / 2;
      centerY = canvasHeight / 2;
      createStars();
      createDistantStars();
    };

    const getStarColor = (): { r: number; g: number; b: number } => {
      const roll = Math.random();
      if (roll < 0.7) {
        return { r: 220, g: 230, b: 255 };
      } else if (roll < 0.82) {
        return { r: 180, g: 200, b: 255 };
      } else if (roll < 0.90) {
        return { r: 255, g: 245, b: 220 };
      } else if (roll < 0.95) {
        return { r: 200, g: 180, b: 230 };
      } else {
        return { r: 180, g: 220, b: 230 };
      }
    };

    const createDistantStars = () => {
      distantStars = [];
      const count = Math.floor((canvasWidth * canvasHeight) / 800);
      
      for (let i = 0; i < count; i++) {
        distantStars.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          size: 0.3 + Math.random() * 0.7,
          opacity: 0.15 + Math.random() * 0.35,
          drift: (Math.random() - 0.5) * 0.02
        });
      }
    };

    const createStars = () => {
      stars = [];
      const starCount = Math.floor((canvasWidth * canvasHeight) / 4000);
      
      for (let i = 0; i < starCount; i++) {
        stars.push(createStar(true));
      }
    };

    const createStar = (randomZ: boolean = false): Star => {
      const spreadX = canvasWidth * 1.5;
      const spreadY = canvasHeight * 1.5;
      
      return {
        x: (Math.random() - 0.5) * spreadX,
        y: (Math.random() - 0.5) * spreadY,
        z: randomZ ? Math.random() * maxDepth : maxDepth,
        baseSize: 0.4 + Math.random() * 1,
        color: getStarColor()
      };
    };

    const createShootingStar = () => {
      const now = Date.now();
      if (now - lastShootingStarTime > 6000 + Math.random() * 6000) {
        lastShootingStarTime = now;
        
        const fromTop = Math.random() > 0.3;
        const x = fromTop ? Math.random() * canvasWidth : canvasWidth + 20;
        const y = fromTop ? -20 : Math.random() * canvasHeight * 0.4;
        
        const spd = 6 + Math.random() * 4;
        const angle = fromTop 
          ? (Math.PI / 4) + (Math.random() - 0.5) * 0.3
          : (Math.PI * 0.6) + (Math.random() - 0.5) * 0.2;
        
        shootingStars.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 0,
          maxLife: 50 + Math.random() * 30,
          size: 1 + Math.random() * 0.8
        });
      }
    };

    const drawBackground = () => {
      // Always use dark cosmic background for hero sections
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvasWidth, canvasHeight)
      );
      gradient.addColorStop(0, '#0c0c18');
      gradient.addColorStop(0.5, '#08080f');
      gradient.addColorStop(1, '#050508');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Subtle nebula
      const nebula = ctx.createRadialGradient(
        canvasWidth * 0.3, canvasHeight * 0.4, 0,
        canvasWidth * 0.3, canvasHeight * 0.4, canvasWidth * 0.5
      );
      nebula.addColorStop(0, 'rgba(59, 130, 246, 0.02)');
      nebula.addColorStop(0.5, 'rgba(139, 92, 246, 0.01)');
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      const nebula2 = ctx.createRadialGradient(
        canvasWidth * 0.75, canvasHeight * 0.7, 0,
        canvasWidth * 0.75, canvasHeight * 0.7, canvasWidth * 0.4
      );
      nebula2.addColorStop(0, 'rgba(139, 92, 246, 0.015)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const drawDistantStars = () => {
      distantStars.forEach(star => {
        star.x += star.drift;
        
        if (star.x < -5) star.x = canvasWidth + 5;
        if (star.x > canvasWidth + 5) star.x = -5;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 210, 230, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawShootingStar = (star: ShootingStar) => {
      const progress = star.life / star.maxLife;
      const fadeIn = Math.min(star.life / 8, 1);
      const fadeOut = 1 - Math.pow(progress, 2);
      const alpha = fadeIn * fadeOut;
      
      if (alpha <= 0) return;
      
      const trailLength = 60;
      const tailX = star.x - (star.vx / 8) * trailLength;
      const tailY = star.y - (star.vy / 8) * trailLength;
      
      const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
      gradient.addColorStop(0.15, `rgba(200, 220, 255, ${alpha * 0.5})`);
      gradient.addColorStop(1, 'rgba(150, 180, 255, 0)');
      
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = star.size;
      ctx.lineCap = 'round';
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      drawBackground();
      drawDistantStars();
      
      stars.forEach((star, i) => {
        star.z -= speed;
        
        const perspective = 300 / star.z;
        const screenX = centerX + star.x * perspective;
        const screenY = centerY + star.y * perspective;
        
        const size = Math.min(star.baseSize * perspective * 0.6, 2.5);
        
        const depthRatio = 1 - (star.z / maxDepth);
        const opacity = 0.15 + depthRatio * 0.55;
        
        const offScreen = screenX < -20 || screenX > canvasWidth + 20 || 
                          screenY < -20 || screenY > canvasHeight + 20 ||
                          star.z <= 1;
        
        if (offScreen) {
          stars[i] = createStar(false);
          return;
        }
        
        if (size > 0.2) {
          if (size > 1.2) {
            const glowGradient = ctx.createRadialGradient(
              screenX, screenY, 0,
              screenX, screenY, size * 2
            );
            glowGradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity * 0.25})`);
            glowGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity})`;
          ctx.arc(screenX, screenY, Math.max(0.3, size), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      createShootingStar();
      
      shootingStars = shootingStars.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life++;
        
        drawShootingStar(star);
        
        return star.life < star.maxLife && 
               star.x > -100 && star.x < canvasWidth + 100 &&
               star.y > -100 && star.y < canvasHeight + 100;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    
    window.addEventListener('resize', resize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedStarfield;
