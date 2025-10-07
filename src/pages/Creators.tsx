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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Elegant gradient foundation */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
          
          {/* Multi-layered mesh gradient */}
          <div className="absolute inset-0 bg-gradient-to-tl from-fuchsia-100/50 via-pink-100/40 to-purple-100/50 dark:from-primary/30 dark:to-accent/20"></div>
          
          {/* Radial accent gradients */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-pink-200/60 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-200/60 to-transparent blur-3xl"></div>
          
          {/* Sophisticated animated orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-br from-fuchsia-300/35 to-pink-300/35 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '9s' }}></div>
            <div className="absolute top-1/3 left-16 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '11s' }}></div>
            <div className="absolute bottom-32 right-1/3 w-72 h-72 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '10s' }}></div>
          </div>
          
          {/* Fine grain texture */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.025]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}></div>
          
          {/* Soft glass effect */}
          <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
          
          {/* Enhanced readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/45 dark:from-slate-900/50 dark:via-transparent dark:to-slate-900/30"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-foreground">
              <span className="block">Services for</span>
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Creators & Publishers
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Join our network of creators and unlock exclusive opportunities for collaboration, sponsorships, and revenue growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button variant="hero" size="lg" className="px-8 py-6 text-lg group" onClick={() => {
                const pricingSection = document.querySelector('#creator-pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                <span className="group-hover:scale-110 transition-transform duration-200">View Pricing Plans</span>
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg group" asChild>
                <a href="/affiliate-signup">
                  <span className="group-hover:scale-110 transition-transform duration-200">Join Referral Program</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-primary">Core Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed to amplify your reach and maximize your earning potential in the digital space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg border-2 border-primary/20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Quest Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Web3 quest integration and community engagement solutions for creators and brands.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary-glow shadow-lg border-2 border-secondary/20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Collaboration Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Connect with brands and other creators for strategic partnerships and joint ventures.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-glow shadow-lg border-2 border-accent/20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Sponsorships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Get matched with relevant brands looking for creators in your niche and audience size.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg border-2 border-primary/20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Newspaper className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Coverage Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
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
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose <span className="text-primary">Our Platform</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the advantages that set us apart from other creator platforms and maximize your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5 p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-glow shadow-xl border-2 border-primary/30 mb-6 mx-auto group-hover:scale-110 transition-all duration-300">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                Exclusive Access
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Access premium brands and campaigns that aren't available anywhere else.
              </p>
            </Card>

            <Card className="text-center group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5 p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-secondary to-secondary-glow shadow-xl border-2 border-secondary/30 mb-6 mx-auto group-hover:scale-110 transition-all duration-300">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                Priority Placement
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Get featured first when brands are looking for creators.
              </p>
            </Card>

            <Card className="text-center group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5 p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-accent-glow shadow-xl border-2 border-accent/30 mb-6 mx-auto group-hover:scale-110 transition-all duration-300">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                Revenue Growth
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Multiple income streams including direct partnerships, referral commissions, 
                and collaboration opportunities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-primary">Get Started?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of creators who are already earning with our platform. 
                Get access to exclusive opportunities and start growing your revenue today.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="cta" size="lg" className="px-8 py-6 text-lg" onClick={() => {
                  const contactSection = document.querySelector('footer');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  Get Started Today
                </Button>
                
                <Button variant="light" size="lg" className="px-8 py-6 text-lg" onClick={() => {
                  const pricingSection = document.querySelector('#creator-pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  View Pricing
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Revenue share opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Priority client promotion</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatorsPage;