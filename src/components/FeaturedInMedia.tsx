import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const FeaturedInMedia = () => {
  const mediaOutlets = [
    {
      name: "Forbes",
      logo: "/lovable-uploads/29431995-0b17-4c1d-947c-4fdf64ed3e61.png",
      bgColor: "bg-black"
    },
    {
      name: "Bloomberg",
      logo: "/lovable-uploads/fd291aa5-c279-4d45-8e13-115ec774c798.png",
      bgColor: "bg-[#2800d7]"
    },
    {
      name: "Inc.",
      logo: "/lovable-uploads/ed714aff-3f87-4a5b-9963-9db61287904a.png",
      bgColor: "bg-black"
    },
    {
      name: "Cointelegraph",
      logo: "/lovable-uploads/868451f0-4647-4708-83e3-63e492a35970.png",
      bgColor: "bg-white"
    },
    {
      name: "CoinDesk",
      logo: "/lovable-uploads/5c44e521-7873-410d-a0bc-d2de4d624b5f.png",
      bgColor: "bg-[#242424]"
    },
    {
      name: "Entrepreneur",
      logo: "/lovable-uploads/ee6cba84-1b90-4044-a6b7-92d005185929.png",
      bgColor: "bg-white"
    },
    {
      name: "VentureBeat",
      logo: "/lovable-uploads/d8186eef-d27e-4865-bf9b-5675b807aa7e.png",
      bgColor: "bg-black"
    },
    {
      name: "IBT",
      logo: "/lovable-uploads/5ebf1b92-19e9-4a1b-b624-010e03564938.png",
      bgColor: "bg-black"
    }
  ];

  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(150);

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Get Featured In <span className="text-blue-700">Top Media</span>
          </h2>
        </div>
        
        <div ref={gridRef} className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {mediaOutlets.map((outlet, index) => (
            <div 
              key={index} 
              className={`transition-all duration-500 ${
                visibleItems.has(index) ? 'animate-fade-in hover-scale' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className={`group w-48 h-24 md:w-56 md:h-28 rounded-[15px] border border-muted flex items-center justify-center ${outlet.bgColor} hover:border-primary/50 card-hover transition-all duration-300 overflow-hidden`}>
                <img 
                  src={outlet.logo} 
                  alt={`${outlet.name} logo`}
                  className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInMedia;