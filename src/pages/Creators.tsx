import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Newspaper, Mic, Star, Zap, Target, Crown, Sparkles, Rocket } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";
import CreatorPricing from "@/components/CreatorPricing";

import creatorsHeroBg from "@/assets/creators-hero-bg.jpg";

const CreatorsPage = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Creator & Publisher Services - UPM Digital Marketing",
      description: "Join our exclusive media network for creators and publishers. Unlock premium brand partnerships, monetize your audience, and scale your influence.",
      keywords: "creator services, publisher network, brand partnerships, monetization, influencer marketing, content creator"
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-electric opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary-neon))_0%,transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--primary-electric))_0%,transparent_50%)] opacity-30"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold text-white">Creator Network</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
            Services for{" "}
            <span className="bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent">
              Creators & Publishers
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed">
            We help creators and publishers grow their audience through quest services, collaboration opportunities, 
            sponsorships, and coverage requests.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90"
              onClick={() => {
                const pricingSection = document.querySelector('#creator-pricing');
                if (pricingSection) {
                  const offsetTop = pricingSection.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              View Pricing Plans
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                window.open('/affiliate-signup', '_blank');
              }}
            >
              Join Referral Program
            </Button>
          </div>
          
          <p className="text-sm text-white/70">
            ✨ Start free with our referral program • Earn revenue share • Get promoted to clients
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We help creators and publishers grow through strategic partnerships and promotional opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-primary/20 bg-gradient-to-br from-card via-card/95 to-primary/5 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Quest Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Web3 quest integration and community engagement solutions for creators and brands.
                </p>
              </CardContent>
            </Card>

            <Card className="group p-6 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 border-secondary/20 bg-gradient-to-br from-card via-card/95 to-secondary/5 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary-glow/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Collaboration Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Connect with brands and other creators for strategic partnerships and joint ventures.
                </p>
              </CardContent>
            </Card>

            <Card className="group p-6 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 border-accent/20 bg-gradient-to-br from-card via-card/95 to-accent/5 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="p-4 bg-gradient-to-br from-accent/20 to-accent-glow/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Crown className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Sponsorships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Get matched with relevant brands looking for creators in your niche and audience size.
                </p>
              </CardContent>
            </Card>

            <Card className="group p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-primary/20 bg-gradient-to-br from-card via-card/95 to-primary/5 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Newspaper className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">Coverage Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Media placement and press coverage to amplify your brand and reach new audiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <CreatorPricing />

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Elite Creators <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Choose Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a network where your investment in growth directly translates to exclusive opportunities and premium partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-2xl mb-8 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Star className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Exclusive Access</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Access premium brands and campaigns that aren't available anywhere else. 
                The more you invest, the more exclusive your opportunities become.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary-glow/30 rounded-2xl mb-8 group-hover:shadow-lg group-hover:shadow-secondary/25 transition-all duration-300">
                <Zap className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Priority Placement</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Get featured first when brands are looking for creators. Premium tiers receive 
                priority placement in all client recommendations and shortlists.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/20 to-accent-glow/30 rounded-2xl mb-8 group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-300">
                <Target className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Revenue Growth</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Multiple income streams including direct partnerships, referral commissions, 
                and exclusive collaboration opportunities that scale with your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            Ready to Get <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Started</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Join our creator network and start getting connected with brands looking for creators like you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-10 py-4"
              onClick={() => {
                const contactSection = document.querySelector('footer');
                if (contactSection) {
                  const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-4 border-2"
              onClick={() => {
                const pricingSection = document.querySelector('#creator-pricing');
                if (pricingSection) {
                  const offsetTop = pricingSection.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-muted-foreground/80 mt-6">
            🚀 Start with our free referral program • Earn revenue share • Get promoted to clients
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatorsPage;