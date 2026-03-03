import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import confetti from 'canvas-confetti';
import { getCategoryColor } from './categoryColors';

interface ClapButtonProps {
  postId: string;
  initialClaps: number;
  category?: string | null;
  size?: 'sm' | 'lg';
}

const MAX_CLAPS = 10;

const ClapButton = ({ postId, initialClaps, category, size = 'sm' }: ClapButtonProps) => {
  const storageKey = `up-megazine-claps-${postId}`;
  const [userClaps, setUserClaps] = useState(() => {
    try { return parseInt(localStorage.getItem(storageKey) || '0', 10); } catch { return 0; }
  });
  const [totalClaps, setTotalClaps] = useState(initialClaps);
  const [animating, setAnimating] = useState(false);

  const accentColor = getCategoryColor(category);

  const handleClap = useCallback(() => {
    if (userClaps >= MAX_CLAPS) return;

    const newUserClaps = userClaps + 1;
    setUserClaps(newUserClaps);
    setTotalClaps(prev => prev + 1);
    localStorage.setItem(storageKey, String(newUserClaps));

    // Animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    // Confetti burst
    confetti({
      particleCount: 8,
      spread: 40,
      origin: { y: 0.7 },
      colors: [accentColor, '#ffffff'],
      scalar: 0.6,
      gravity: 1.5,
      ticks: 40,
    });

    // Sync to server (fire-and-forget)
    supabase.rpc('increment_claps' as any, { post_id: postId, amount: 1 }).then(({ error }) => {
      if (error) console.error('Clap sync error:', error);
    });
  }, [userClaps, postId, storageKey, accentColor]);

  const isLarge = size === 'lg';

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleClap}
        disabled={userClaps >= MAX_CLAPS}
        className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
          isLarge ? 'w-16 h-16' : 'w-10 h-10'
        } ${userClaps >= MAX_CLAPS ? 'opacity-60 cursor-default' : 'hover:scale-110 active:scale-95 cursor-pointer'}`}
        style={{
          backgroundColor: userClaps > 0 ? accentColor + '20' : 'transparent',
          border: `2px solid ${accentColor}`,
          transform: animating ? 'scale(1.2)' : undefined,
        }}
        aria-label="Clap"
      >
        <svg
          width={isLarge ? 28 : 18}
          height={isLarge ? 28 : 18}
          viewBox="0 0 24 24"
          fill={userClaps > 0 ? accentColor : 'none'}
          stroke={accentColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>

        {/* Animated count flyout */}
        {animating && (
          <span
            className="absolute -top-6 text-sm font-bold pointer-events-none animate-fade-in"
            style={{ color: accentColor }}
          >
            +1
          </span>
        )}
      </button>

      <span className={`font-bold ${isLarge ? 'text-2xl' : 'text-sm'} text-foreground`}>
        {totalClaps}
      </span>

      {totalClaps >= 50 && (
        <span className="text-xs text-muted-foreground">
          {totalClaps >= 500 ? '🔥🔥🔥' : totalClaps >= 100 ? '🔥🔥' : '🔥'} {totalClaps} clapped
        </span>
      )}

      {userClaps >= MAX_CLAPS && (
        <span className="text-[10px] text-muted-foreground">Max reached</span>
      )}
    </div>
  );
};

export default ClapButton;
