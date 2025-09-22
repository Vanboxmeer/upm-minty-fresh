import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Newspaper, Mic, Star, Zap, Target, Crown, Sparkles, Rocket } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";
import CreatorPricing from "@/components/CreatorPricing";

const CreatorsPage = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Creator & Publisher Services - UPM Digital Marketing",
      description: "Join our media network for creators and publishers. Get client acquisition, content syndication, web3 directory listings, and community quest programs.",
      keywords: "creator services, publisher network, web3 quests, content syndication, sponsor acquisition, media deck"
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gradient-start via-secondary/10 to-accent-gradient-end opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--secondary))_0%,transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary))_0%,transparent_50%)] opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">Creator Network Program</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Services for{" "}
            <span className="bg-gradient-to-r from-secondary via-secondary-glow to-accent bg-clip-text text-transparent">
              Creators & Publishers
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The more you pay, the more we promote you to our client base by adding you to shortlists and referrals. 
            Join our referral program for revenue sharing and no subscription fees if you're active.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="cta" size="lg" onClick={() => {
              const pricingSection = document.querySelector('#creator-pricing');
              if (pricingSection) {
                const offsetTop = pricingSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}>
              View Pricing Plans
            </Button>
            <Button variant="outline" size="lg" onClick={() => {
              window.open('/affiliate-signup', '_blank');
            }}>
              Join Referral Program - FREE
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            💡 Join our referral program and earn without subscription fees
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent service: we promote you to our clients based on your subscription level and provide referral opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="group p-6 hover:shadow-xl hover:shadow-secondary/20 transition-all duration-500 border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-secondary/20 to-secondary-glow/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text text-transparent">Client & Sponsor Acquisition</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  We add you to client shortlists and refer you to brands based on your subscription level.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Client shortlist inclusion</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Direct brand referrals</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Higher subscription = more promotion</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group p-6 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Newspaper className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Publications & Syndication</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Access our publication network and get featured in web3 directories.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Web3 directory inclusion</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Publication network access</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Content listing opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group p-6 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500 border-accent/20 bg-gradient-to-br from-card via-card to-accent/5">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-accent/20 to-accent-glow/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">Collaboration Opportunities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Opportunities to collaborate with other network members and our clients.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">Network introductions</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">Collaboration matching</span>
                  </li>
                  <li className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm">Referral program benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Web3 Quests Feature */}
          <div className="relative bg-gradient-to-br from-card/80 via-secondary/5 to-accent/5 backdrop-blur-sm rounded-3xl p-8 border border-gradient-retro overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--secondary))_0%,transparent_50%)] opacity-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-10"></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-secondary/20 to-secondary-glow/20 rounded-xl">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary via-secondary-glow to-accent bg-clip-text text-transparent">
                    Web3 Quests & Community Rewards
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  Web3 quests help creators reward their communities and drive engagement. 
                  We can include your quests in our client recommendations and directories.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium">Quest directory inclusion</span>
                  </li>
                  <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 delay-75">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium">Client quest recommendations</span>
                  </li>
                  <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 delay-150">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium">Network promotion of your quests</span>
                  </li>
                  <li className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 delay-225">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-medium">Higher tiers get priority placement</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-40 h-40 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary-glow to-accent rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-secondary to-secondary-glow rounded-full flex items-center justify-center">
                    <Mic className="h-20 w-20 text-white drop-shadow-lg" />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Join Our Media Deck
                </h4>
                <p className="text-muted-foreground">
                  Become part of our creator network and unlock new opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <CreatorPricing />

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join Our Network?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get promoted to our clients through shortlists and referrals. Revenue sharing available through our referral program.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Partnerships</h3>
              <p className="text-muted-foreground">
                Connect with top-tier brands and projects in the Web3 space for high-value collaborations.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Tools</h3>
              <p className="text-muted-foreground">
                Access cutting-edge tools and strategies to grow your audience and maximize engagement.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Revenue Optimization</h3>
              <p className="text-muted-foreground">
                Multiple revenue streams and optimization strategies to maximize your earning potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Creator Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of creators and publishers who are already monetizing their audience 
            and growing their communities with our network.
          </p>
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
            Apply Now - It's Free
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No upfront costs. We succeed when you succeed.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreatorsPage;