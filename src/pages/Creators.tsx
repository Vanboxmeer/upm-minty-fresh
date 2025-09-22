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
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${creatorsHeroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-secondary/10" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Exclusive Creator Network</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Unlock Your{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Creator Potential
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
            Join an elite network where premium brands actively seek creators like you. 
            The higher your commitment, the more exclusive opportunities we unlock for your growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-8 py-4"
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
              Explore Premium Tiers
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2"
              onClick={() => {
                window.open('/affiliate-signup', '_blank');
              }}
            >
              Start Free - Join Referral Network
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground/80">
            ✨ Zero commitment entry • Premium partnerships • Revenue sharing available
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Exclusive Creator <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Advantages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access premium brand partnerships and unlock revenue streams that scale with your influence and commitment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            <Card className="group p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-primary/20 bg-gradient-to-br from-card via-card/95 to-primary/5 hover:scale-105">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Premium Brand Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Get fast-tracked to exclusive brand partnerships that others can't access. Higher tiers unlock premium clients.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">Priority brand matching</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">Exclusive campaign invitations</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">Higher-paying opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group p-8 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 border-secondary/20 bg-gradient-to-br from-card via-card/95 to-secondary/5 hover:scale-105">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary-glow/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Newspaper className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Media Amplification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Expand your reach through our premium publication network and strategic directory placements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium text-foreground">Web3 directory features</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium text-foreground">Cross-platform syndication</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium text-foreground">Strategic content placement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group p-8 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 border-accent/20 bg-gradient-to-br from-card via-card/95 to-accent/5 hover:scale-105">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-accent/20 to-accent-glow/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Revenue Optimization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                  Multiple revenue streams and strategic partnerships that grow with your subscription tier.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="font-medium text-foreground">Strategic collaborations</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="font-medium text-foreground">Commission opportunities</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="font-medium text-foreground">Referral program benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Web3 Quests Feature */}
          <div className="relative bg-gradient-to-br from-card via-primary/10 to-secondary/10 backdrop-blur-sm rounded-3xl p-12 border border-primary/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--secondary))_0%,transparent_50%)] opacity-20"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">
                    Web3 Quest Integration
                  </h3>
                </div>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  Transform your community engagement with cutting-edge Web3 quests. We connect your quests 
                  with premium brands and include them in our exclusive recommendation engine.
                </p>
                <ul className="space-y-5">
                  <li className="flex items-center gap-4 hover:translate-x-3 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-semibold text-foreground text-lg">Featured in brand directories</span>
                  </li>
                  <li className="flex items-center gap-4 hover:translate-x-3 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-semibold text-foreground text-lg">Priority client recommendations</span>
                  </li>
                  <li className="flex items-center gap-4 hover:translate-x-3 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-semibold text-foreground text-lg">Premium tier advantages</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-48 h-48 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl">
                    <Mic className="h-24 w-24 text-white drop-shadow-xl" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-foreground">
                  Ready to Level Up?
                </h4>
                <p className="text-muted-foreground text-lg">
                  Join the elite creator network today
                </p>
              </div>
            </div>
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
            Ready to Join the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Elite Network</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of successful creators who've accelerated their growth through our premium network. 
            Your next breakthrough collaboration is waiting.
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
              Start Your Journey Today
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
              Compare Plans
            </Button>
          </div>
          <p className="text-sm text-muted-foreground/80 mt-6">
            🚀 Premium partnerships await • Exclusive opportunities • Proven results
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatorsPage;