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
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Marketing Services for{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent inline-block min-h-[1em]">
              {currentBrand || '\u00A0'}
              <span className="animate-pulse text-white ml-1 font-thin">|</span>
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

      {/* Creators & Publishers Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Services for Creators & Publishers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our media network and unlock new opportunities for growth, monetization, and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Client & Sponsor Acquisition</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with brands and projects looking for quality media placements and collaborations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Access to our brand network</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Sponsored content opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Revenue sharing programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Newspaper className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Publications & Content Syndication</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Amplify your content reach through our publication network and directory listings.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Web3 directory listings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Content syndication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Cross-platform distribution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-secondary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Web3 Quests & Community Rewards</h3>
                <p className="text-muted-foreground mb-6">
                  Launch engaging quests and reward systems to grow and maintain your community. 
                  Web3 quests are becoming essential for creator growth and community engagement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>Custom quest design and implementation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>Token-based reward mechanisms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>Community engagement analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>Cross-platform quest integration</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-secondary to-secondary-glow rounded-full mb-6">
                  <Mic className="h-16 w-16 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Join Our Media Deck</h4>
                <p className="text-sm text-muted-foreground">
                  Become part of our creator network and unlock new opportunities
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="cta" size="lg" onClick={() => {
              const contactSection = document.querySelector('footer');
              if (contactSection) {
                const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}>
              Apply to Join Our Network
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Ready to monetize your audience and grow your community? Get in touch with us.
            </p>
          </div>
        </div>
      </section>

      <PaidAdvertising />
      <PackageSelector />
      <Footer />
    </div>;
};
export default ServicesPage;