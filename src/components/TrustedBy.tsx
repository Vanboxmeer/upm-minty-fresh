import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const TrustedBy = () => {
  const projects = [{
    name: "Unicrypt",
    logo: "/lovable-uploads/91531968-ee6d-4b3a-8743-b0ac73a6698a.png",
    description: "Unicrypt provides an ever-growing suite of decentralized services."
  }, {
    name: "Bittensor",
    logo: "/lovable-uploads/34105d70-e9a0-4097-912a-e85b083ca25e.png",
    description: "Bittensor is a peer-to-peer market that commoditizes machine intelligence using a proof-of-intelligence consensus mechanism."
  }, {
    name: "eMoney",
    logo: "/lovable-uploads/bbe20575-36a4-480b-9408-085567a1cecb.png",
    description: "Next Generation Stablecoins for the Internet of Money."
  }, {
    name: "Doge Dash",
    logo: "/lovable-uploads/9b590fdc-5b82-4573-9626-80858143c432.png",
    description: "Doge Dash features 10 fun, fast paced levels with the degree of difficulty increasing as the player progresses."
  }, {
    name: "Umbrella",
    logo: "/lovable-uploads/9aa3ddc7-17e3-4af9-a6a7-b6a5174b8269.png",
    description: "Umbrella is the first truly decentralized oracle service providing low cost, massively scalable, and secure solutions for smart contracts."
  }, {
    name: "MetalCore",
    logo: "/lovable-uploads/1e9ef986-400b-448c-b35f-801917674404.png",
    description: "MetalCore is an NFT-based, open world, mechanized combat game. Fight alongside your faction in territorial battles on a mineral rich alien planet."
  }];

  const { elementRef: sectionRef, isVisible } = useScrollAnimation();
  const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(150);

  return <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by <span className="text-primary">Leading Web3 Projects</span>
          </h2>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => <div 
              key={index} 
              className={`group text-center space-y-4 transition-all duration-500 hover:bg-muted/20 p-6 rounded-lg ${
                visibleItems.has(index) ? 'animate-fade-in card-hover' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={project.logo} 
                  alt={project.name} 
                  className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:filter group-hover:brightness-110" 
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TrustedBy;