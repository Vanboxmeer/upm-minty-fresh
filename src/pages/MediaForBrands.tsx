import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";
import {
  Sparkles, Video, Target, Zap, CheckCircle2, Palette,
  MessageCircle, Clock, Percent
} from "lucide-react";

const pricingTiers = [
  {
    name: "Light",
    posts: "4 posts",
    price: "~$100–120",
    bestFor: "Founders who post occasionally",
  },
  {
    name: "Steady",
    posts: "8–12 posts",
    price: "~$200–280",
    bestFor: "Growing communities & app updates",
  },
  {
    name: "Growth",
    posts: "16–20 posts",
    price: "~$380–480",
    bestFor: "Active engagement & brand building",
    popular: true,
  },
  {
    name: "Full Presence",
    posts: "28 posts",
    price: "~$650–700",
    bestFor: "Serious projects & launches",
  },
];

const contentTypes = [
  "Instagram, TikTok, X, LinkedIn, YouTube social posts (posts and short form videos)",
  "Branded memes, relatable lifestyle scenes, niche culture jokes, educational content, product content, and more",
  "Engaging content with well written descriptions and strategized hashtags and audio associations",
];

const bonusFeatures = [
  "5–60 second video commercials with sound design",
  "Vertical video ads ready for TikTok, Reels, Telegram, YouTube Shorts, LinkedIn Posts or Videos",
  "Consistent character + world-building for long-term brand campaigns",
];

const perfectFor = [
  "App builders & indie teams who want to look pro without hiring a full-time social media manager",
  "Web3 founders who need consistent messaging during token launches, mainnet, partnerships",
  "Creators & brands who want content that converts without losing personality",
  "Teams who already have a vision but no time to execute weekly",
];

const MediaForBrands = () => {
  const { setSelectedPackage, setUserType } = usePackageSelection();
  const navigate = useNavigate();

  useEffect(() => {
    setUserType('brand');
    setSelectedPackage({
      name: "Social Content Creation",
      price: "From $100/mo",
      description: "Custom branded social content — posts, reels, videos & ads",
      features: [
        "4–28 posts/month depending on plan",
        "Instagram Reels, TikTok, X/Twitter content",
        "Branded memes & product showcases",
        "AI-powered video ads with character continuity",
        "Monthly contracts, cancel anytime",
      ],
      popular: false,
    });

    updateMetaTags({
      title: "Social Content Creation | UPM - United Press Media",
      description: "Activate your content conveyor belt. Custom posts, reels, videos & ads starting from ~$25/post. No hidden fees.",
      keywords: "social content creation, branded content, social media management, Instagram Reels, TikTok content, Web3 social media, crypto content, content marketing",
      canonical: "https://unitedpress.media/media-for-brands",
      ogTitle: "Social Content Creation by UPM",
      ogDescription: "Scroll-stopping, on-brand social content. Starting from ~$25/post.",
      ogType: "website",
      twitterCard: "summary_large_image",
      structuredData: [
        generateStructuredData('organization', {}),
        generateStructuredData('website', {}),
      ],
    });
  }, [setSelectedPackage, setUserType]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
          {/* Layered background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/80 via-background to-muted/60" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
              backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                <Palette className="w-4 h-4 mr-2 inline" />
                Social Content Creation
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
                Activate Your{" "}
                <span className="text-primary">Content Conveyor Belt</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                We create scroll-stopping, on-brand content so you can focus on building, not posting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/contact')}
                  variant="hero"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  Start Your Content Plan
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Flexible Content Packages */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Content Packages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Full-service or light-touch monthly content packages. You choose how much support you want.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Just Filler Content?</h3>
                <p className="text-sm text-muted-foreground">2 residency days/week — perfect when your team is busy shipping</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Steady Presence?</h3>
                <p className="text-sm text-muted-foreground">1–3 posts/week to keep your community engaged</p>
              </Card>
              <Card className="p-6 text-center border-2 hover:border-primary/50 transition-all">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Serious Growth?</h3>
                <p className="text-sm text-muted-foreground">5–7 posts/week (up to 28 posts/month)</p>
              </Card>
            </div>

            <p className="text-center text-muted-foreground max-w-xl mx-auto">
              All posts are <span className="text-foreground font-medium">100% custom</span>, aligned with your voice, visuals, and current campaign goals.
            </p>
          </div>
        </section>

        {/* Content Types + Bonus */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Content Types We Create</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  {contentTypes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-8 border-2 hover:border-secondary/50 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-semibold">AI-Powered Videos and Images</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  {bonusFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Fair Pricing</h2>
              <p className="text-lg text-muted-foreground">
                Base rate ≈ <span className="text-foreground font-semibold">$25 per post</span> (final price depends on volume & complexity)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`p-6 text-center border-2 transition-all hover:shadow-lg relative ${
                    tier.popular
                      ? 'border-primary shadow-primary/20 shadow-lg'
                      : 'hover:border-primary/50'
                  }`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-1">{tier.price}</p>
                  <p className="text-sm text-muted-foreground mb-3">{tier.posts}/month</p>
                  <p className="text-xs text-muted-foreground">{tier.bestFor}</p>
                </Card>
              ))}
            </div>

            {/* Long-term discounts — integrated into pricing section */}
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                <Percent className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">Commit to <strong>3 months</strong> → <strong className="text-primary">5% off</strong> every month</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                <Percent className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">Commit to <strong>12 months</strong> → <strong className="text-primary">10% off</strong> every month</span>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 max-w-lg mx-auto">
              No hidden fees. Clear deliverables. Monthly contracts — cancel anytime after the first month.
            </p>
          </div>
        </section>

        {/* Perfect For */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Perfect For</h2>
              <div className="space-y-4">
                {perfectFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Stressing About Content?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let us take the posting pressure off your plate — so you can ship faster and show up stronger.
            </p>
            <Button
              onClick={() => navigate('/contact')}
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6"
            >
              Start Your Content Plan
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default MediaForBrands;
