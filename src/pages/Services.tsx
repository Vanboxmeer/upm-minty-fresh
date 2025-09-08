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
    typeSpeed: 100,
    deleteSpeed: 50,
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
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Marketing Services for{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {currentBrand}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From KOL collaborations to press releases and media features, we provide 
            comprehensive marketing solutions with packages ranging from $5K to $100K.
          </p>
          <Button variant="cta" size="lg" onClick={() => {
            const packageSection = document.querySelector('[data-section="package-selector"]');
            if (packageSection) {
              const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }
          }}>
            View Our Packages
          </Button>
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