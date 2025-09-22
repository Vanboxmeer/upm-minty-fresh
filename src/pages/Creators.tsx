import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Newspaper, Mic, Star, Zap, Target } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";

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
      <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Services for{" "}
            <span className="bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text text-transparent">
              Creators & Publishers
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our media network and unlock new opportunities for growth, monetization, 
            and community engagement in the Web3 space.
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
            Apply to Join Our Network
          </Button>
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
              Comprehensive services designed to help creators and publishers monetize their audience and grow their reach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Client & Sponsor Acquisition</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Connect with brands and projects looking for quality media placements and collaborations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Access to brand network</span>
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

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Newspaper className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Publications & Syndication</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
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

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Collaboration Opportunities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Partner with other creators and brands for cross-promotional campaigns.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Creator partnerships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Cross-promotional campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm">Joint content creation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Web3 Quests Feature */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-secondary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-secondary" />
                  <h3 className="text-2xl font-bold">Web3 Quests & Community Rewards</h3>
                </div>
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join Our Network?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access exclusive opportunities and grow your creator business with our comprehensive support system.
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