import { useEffect } from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import PaidAdvertising from "@/components/PaidAdvertising";
import PackageSelector from "@/components/PackageSelector";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Newspaper, Mic } from "lucide-react";
import kolCollaborationsImg from "/lovable-uploads/ecd96ef3-208b-4ecb-a825-eebccedf3db8.png";
import pressReleaseImg from "/lovable-uploads/1b902ab0-3eb5-424d-8b98-de9e2da377c8.png";
import featuresInterviewsImg from "/lovable-uploads/8d2ae042-e00e-4b60-acfe-8d2f6c8edbb2.png";
import { updateMetaTags } from "@/utils/seoUtils";
import { useTypewriter } from "@/hooks/useTypewriter";
const ServicesPage = () => {
  const brandTypes = ["AI Brands", "Web3 Brands", "GameFi Brands", "VR Brands", "Crypto Brands", "Tech Brands"];
  const currentBrand = useTypewriter({
    words: brandTypes,
    typeSpeed: 50,
    deleteSpeed: 25,
    delayBetweenWords: 2000,
  });
  const serviceDetails = [{
    icon: Users,
    title: "KOL Collaborations",
    description: "Collaborate with influencers and key opinion leaders who have a direct connection with your target audience.",
    features: ["Access to verified influencer network of 500+ KOLs", "Audience matching based on demographics and interests", "Performance tracking and ROI measurement", "Content creation and campaign management", "Multi-platform coverage (Twitter, YouTube, Telegram)"],
    pricing: "Starting from $5K packages",
    image: kolCollaborationsImg
  }, {
    icon: Newspaper,
    title: "Press Release Services",
    description: "Distribute press releases to keep your investors and community up to date with important news and milestone events.",
    features: ["Distribution to 200+ major tech and crypto publications", "Investor-focused messaging and positioning", "Timeline and milestone coverage", "SEO-optimized content"],
    pricing: "Included in all packages",
    image: pressReleaseImg
  }, {
    icon: Mic,
    title: "Features, Interviews, Spaces",
    description: "Get featured in top media, have your CEO as a guest on a popular show, or co-host a community event.",
    features: ["Placement in top-tier crypto media outlets", "Executive interview opportunities", "Twitter Spaces and podcast hosting", "Community event organization", "Thought leadership positioning"],
    pricing: "Premium packages from $25K",
    image: featuresInterviewsImg
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Vibrant gradient background for light mode */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 dark:from-slate-800 dark:via-blue-900/60 dark:to-slate-900"></div>
          
          {/* Animated color overlays with stronger presence in light mode */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-cyan-100/30 to-sky-200/40 animate-pulse dark:from-primary/20 dark:via-transparent dark:to-secondary/15" style={{ animationDuration: '4s' }}></div>
          
          {/* Floating colored elements - more visible in light mode */}
          <div className="absolute inset-0">
            <div className="absolute top-32 left-16 w-28 h-28 bg-blue-400/30 rounded-lg blur-xl animate-bounce dark:bg-primary/35" style={{ animationDelay: '0s', animationDuration: '5s', transform: 'rotate(45deg)' }}></div>
            <div className="absolute top-48 right-24 w-16 h-16 bg-cyan-400/40 rounded-lg blur-lg animate-bounce dark:bg-secondary/45" style={{ animationDelay: '1.5s', animationDuration: '7s', transform: 'rotate(30deg)' }}></div>
            <div className="absolute bottom-48 left-1/3 w-20 h-20 bg-sky-400/35 rounded-lg blur-lg animate-bounce dark:bg-primary/40" style={{ animationDelay: '3s', animationDuration: '6s', transform: 'rotate(60deg)' }}></div>
            <div className="absolute bottom-24 right-1/4 w-36 h-36 bg-blue-300/25 rounded-lg blur-2xl animate-bounce dark:bg-secondary/30" style={{ animationDelay: '2s', animationDuration: '8s', transform: 'rotate(15deg)' }}></div>
            
            {/* Circuit pattern overlay */}
            <div className="absolute inset-0 opacity-10 dark:opacity-10" style={{
              backgroundImage: `
                linear-gradient(90deg, rgb(59, 130, 246, 0.3) 50%, transparent 50%),
                linear-gradient(0deg, rgb(59, 130, 246, 0.3) 50%, transparent 50%)
              `,
              backgroundSize: '80px 80px'
            }}></div>
            
            {/* Diagonal lines for tech aesthetic */}
            <div className="absolute inset-0 opacity-20 dark:opacity-20">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-12 origin-left"></div>
              <div className="absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -rotate-12 origin-left"></div>
              <div className="absolute bottom-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent transform rotate-6 origin-left"></div>
            </div>
          </div>
          
          {/* Content overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30 dark:from-slate-900/60 dark:via-transparent dark:to-slate-800/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-foreground">
              <span className="block">Services for</span>
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent inline-block min-h-[1em]">
                {currentBrand || '\u00A0'}
                <span className="animate-pulse text-foreground ml-1 font-thin">|</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              From KOL collaborations to press releases and media features, we provide 
              comprehensive marketing solutions with packages ranging from $5K to $100K.
            </p>
            <Button variant="hero" size="lg" className="px-8 py-6 text-lg group animate-fade-in" onClick={() => {
              const packageSection = document.querySelector('[data-section="package-selector"]');
              if (packageSection) {
                const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}>
              <span className="group-hover:scale-110 transition-transform duration-200">View Our Packages</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive marketing solutions designed specifically for crypto and blockchain projects.
            </p>
          </div>

          <div className="space-y-16">
            {serviceDetails.map((service, index) => <div key={index} id={service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-primary font-medium">{service.pricing}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>)}
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img 
                    src={service.image} 
                    alt={`${service.title} service illustration`}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>)}
          </div>
        </div>
      </section>

      <PaidAdvertising />
      <PackageSelector />
      <Footer />
    </div>;
};
export default ServicesPage;