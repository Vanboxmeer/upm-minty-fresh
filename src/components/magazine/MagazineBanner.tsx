const MagazineBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-background via-card to-background border border-border/50">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center text-center py-12 md:py-16 px-6 space-y-4">
        <img
          src="/lovable-uploads/upm-logo.png"
          alt="UPM Logo"
          className="w-16 h-16 md:w-20 md:h-20 object-contain header-logo-pulse"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          UP Megazine
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
          Your source for trending Web3 stories, hidden gems, and innovation in crypto, AI, VR, and GameFi.
        </p>
      </div>
    </div>
  );
};

export default MagazineBanner;
