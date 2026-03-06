import AnimatedStarfield from '@/components/AnimatedStarfield';

const MagazineBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border/50" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      {/* Starfield background */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatedStarfield />
      </div>

      {/* Subtle glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center text-center py-14 md:py-20 px-6 space-y-5">
        <img
          src="/lovable-uploads/upm-logo.png"
          alt="UPM Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain header-logo-pulse"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          UPM News & Insights
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
          Where tech, AI, crypto, and gaming converge — the latest stories, analysis, and innovation.
        </p>
      </div>
    </div>
  );
};

export default MagazineBanner;
