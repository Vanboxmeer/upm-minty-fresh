import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Eye, MessageCircle, Globe } from "lucide-react";
const CaseStudies = () => {
  const caseStudies = [{
    id: 1,
    title: "DeFi Protocol Launch Success",
    client: "Project Alpha",
    service: "Press Release Distribution",
    challenge: "New DeFi protocol needed market awareness and credibility for their token launch",
    solution: "Distributed press releases across 200+ tier-1 crypto and financial media outlets",
    results: [{
      metric: "Media Coverage",
      value: "180+ publications",
      icon: Globe
    }, {
      metric: "Website Traffic",
      value: "+450% increase",
      icon: Eye
    }, {
      metric: "Community Growth",
      value: "25K new followers",
      icon: Users
    }, {
      metric: "Token Pre-sale",
      value: "$2.3M raised",
      icon: TrendingUp
    }],
    timeline: "6 weeks",
    category: "Press Release"
  }, {
    id: 2,
    title: "Gaming Token Community Explosion",
    client: "GameFi Beta",
    service: "Influencer Marketing Campaign",
    challenge: "Gaming token needed to reach gamers and crypto enthusiasts for upcoming NFT collection",
    solution: "Collaborated with 15 top crypto KOLs and 8 gaming influencers across Twitter, YouTube, and Twitch",
    results: [{
      metric: "Total Reach",
      value: "2.8M impressions",
      icon: Eye
    }, {
      metric: "Engagement Rate",
      value: "8.5% average",
      icon: MessageCircle
    }, {
      metric: "Discord Members",
      value: "+12K new joins",
      icon: Users
    }, {
      metric: "NFT Collection",
      value: "Sold out in 4 hours",
      icon: TrendingUp
    }],
    timeline: "4 weeks",
    category: "Influencer Marketing"
  }, {
    id: 3,
    title: "Enterprise Blockchain Mainstream Coverage",
    client: "TechCorp Solutions",
    service: "Tier-1 Media Features",
    challenge: "B2B blockchain solution needed mainstream business media coverage to attract enterprise clients",
    solution: "Secured exclusive features in Forbes, TechCrunch, and CoinDesk with thought leadership positioning",
    results: [{
      metric: "Tier-1 Features",
      value: "12 major publications",
      icon: Globe
    }, {
      metric: "LinkedIn Views",
      value: "850K profile views",
      icon: Eye
    }, {
      metric: "Lead Generation",
      value: "340 qualified leads",
      icon: Users
    }, {
      metric: "Enterprise Deals",
      value: "5 contracts signed",
      icon: TrendingUp
    }],
    timeline: "8 weeks",
    category: "Media Coverage"
  }, {
    id: 4,
    title: "Meme Coin Viral Marketing Success",
    client: "Project Doge",
    service: "Combined PR & Influencer Strategy",
    challenge: "Community-driven meme coin needed viral momentum and mainstream attention",
    solution: "Integrated press release distribution with meme-focused influencer collaborations and strategic media placement",
    results: [{
      metric: "Viral Posts",
      value: "15M+ total views",
      icon: Eye
    }, {
      metric: "Community Growth",
      value: "75K Telegram members",
      icon: Users
    }, {
      metric: "Media Mentions",
      value: "90+ publications",
      icon: Globe
    }, {
      metric: "Market Cap Peak",
      value: "$50M achieved",
      icon: TrendingUp
    }],
    timeline: "3 weeks",
    category: "Integrated Campaign"
  }, {
    id: 5,
    title: "FinTech Startup Market Entry",
    client: "CryptoWallet Pro",
    service: "Full-Spectrum Marketing Launch",
    challenge: "New crypto wallet app needed market penetration in competitive landscape",
    solution: "Comprehensive campaign: press releases, KOL partnerships, and tier-1 media coverage across 3 months",
    results: [{
      metric: "App Downloads",
      value: "150K in first month",
      icon: TrendingUp
    }, {
      metric: "Media Coverage",
      value: "250+ publications",
      icon: Globe
    }, {
      metric: "Social Following",
      value: "45K across platforms",
      icon: Users
    }, {
      metric: "User Retention",
      value: "68% monthly active",
      icon: MessageCircle
    }],
    timeline: "12 weeks",
    category: "Full Campaign"
  }];
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Press Release":
        return "bg-primary/10 text-primary border-primary/20";
      case "Influencer Marketing":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Media Coverage":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Integrated Campaign":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Full Campaign":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories That Speak Volumes
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Explore example case studies to see how our strategic marketing campaigns can help brands achieve their goals and exceed expectations.</p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>• Client names anonymized for privacy</span>
              <span>• Simulated metrics</span>
              <span>• Results vary by package size</span>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 max-w-4xl mx-auto">
              {caseStudies.map(study => <Card key={study.id} className="p-8 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className={getCategoryColor(study.category)}>
                        {study.service}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{study.timeline}</span>
                    </div>
                    <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                    <p className="text-muted-foreground font-medium">Client: {study.client}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-destructive mb-2">Challenge</h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Our Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-400 mb-4">Results Achieved</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {study.results.map((result, index) => {
                      const Icon = result.icon;
                      return <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border">
                              <Icon className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-semibold text-sm">{result.metric}</p>
                                <p className="text-primary font-bold">{result.value}</p>
                              </div>
                            </div>;
                    })}
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the ranks of successful crypto projects that have transformed their market presence with our proven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contact-form" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                Start Your Campaign
              </a>
              <a href="/services" className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors">
                View Our Services
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default CaseStudies;