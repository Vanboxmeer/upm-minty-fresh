import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackageSelector from "@/components/PackageSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";
import { Sparkles, Video, Image as ImageIcon, Zap, Target, Layers, CheckCircle2 } from "lucide-react";

const MediaForBrands = () => {
  const { setSelectedPackage, setUserType } = usePackageSelection();

  useEffect(() => {
    // Set user type to brand for this page
    setUserType('brand');

    // Auto-select Media for Brands package
    setSelectedPackage({
      name: "Media for Brands",
      price: "Custom",
      description: "AI-powered video and image generation using Grok Imagine with character continuity",
      features: [
        "Instagram Reels, TikTok clips, and social media content",
        "10-30s video ads with sound and character continuity",
        "Banner/display creatives for Brave, Native, Telegram Ads",
        "Photorealistic 1024×1024 images and short videos",
        "Unlimited iterations with Grok Imagine infinite scroll",
        "Web3, crypto, and tech-optimized content generation"
      ],
      popular: false
    });

    // SEO optimization
    updateMetaTags({
      title: "Media for Brands | AI Video & Image Ads | UPM",
      description: "Generate character-consistent videos, images & commercials with Grok Imagine. Perfect for Web3 socials and paid ads.",
      keywords: "AI video generation, Grok Imagine, character continuity, Web3 marketing, crypto ads, AI-generated content, social media content, AI commercials, brand media",
      canonical: "https://unitedpressmedia.com/media-for-brands",
      ogTitle: "Media for Brands - AI-Powered Visual Content Generation",
      ogDescription: "Generate character-consistent videos, images & commercials instantly with xAI's Grok Imagine. Perfect for digital marketing campaigns.",
      ogType: "website",
      ogImage: "https://unitedpressmedia.com/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png",
      twitterCard: "summary_large_image",
      structuredData: [
        generateStructuredData('organization', {}),
        generateStructuredData('website', {})
      ]
    });
  }, [setSelectedPackage, setUserType]);

  const scrollToPackageSelector = () => {
    const element = document.getElementById('package-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/60 dark:to-slate-900">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Powered by xAI's Grok Imagine
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight">
              Media for Brands
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-Powered Videos, Images & Commercials with <span className="text-primary font-semibold">Character Continuity</span>
            </p>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Generate photorealistic content instantly via Grok Imagine. Perfect for social media, paid ads, and brand campaigns.
            </p>

            <Button 
              onClick={scrollToPackageSelector}
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Start Your Campaign
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Deliver</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From social content to commercial ads, all generated with AI-powered precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Social Media Content */}
            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Social Media Content</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Instagram Reels & TikTok clips",
                  "X/Twitter carousels & video posts",
                  "Branded memes & lifestyle scenes",
                  "Product showcases & demos",
                  "Endless variations via infinite scroll"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Ad Media & Commercials */}
            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold">Ad Media & Commercials</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "10-30s video ads with sound",
                  "Banner/display creatives for Brave Ads",
                  "Native advertising formats",
                  "Telegram Ads channel placements",
                  "Full character-consistent campaigns"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Powered by Grok Imagine */}
          <Card className="p-8 max-w-5xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Powered by Grok Imagine</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Photorealistic 1024×1024 images",
                  "Short videos with audio generation",
                  "Upload reference → maintain exact character"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Trained on billions of examples",
                  "Optimized for DeFi, NFT, AI & Tech",
                  "Infinite iteration, zero revision hell"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Seamless Campaign Integration</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Same contact form, same subscription flow – just select your package and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                <Layers className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Subscription Levels</h3>
              <p className="text-muted-foreground">
                Starter → Pro → Enterprise bundles<br />(images + videos)
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="mx-auto mb-4 p-4 bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Campaign Budget</h3>
              <p className="text-muted-foreground">
                Set your range in the form<br />We optimize output count & quality
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One Contact Form</h3>
              <p className="text-muted-foreground">
                Same form, same flow<br />Just select "Media for Brands"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Character Continuity Feature Highlight */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm bg-primary/20 text-primary border-primary/30">
              <ImageIcon className="w-4 h-4 mr-2 inline" />
              Unique Selling Point
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Perfect Character Continuity</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Upload your brand mascot once → Generate hundreds of variations in different scenarios
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-2">Same Character</h4>
                <p className="text-muted-foreground">Maintain brand consistency across all content</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-2">Infinite Scenarios</h4>
                <p className="text-muted-foreground">Place your character in any setting or situation</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-2">Series-Based Content</h4>
                <p className="text-muted-foreground">Perfect for ongoing campaigns and storylines</p>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Media Generation Packages */}
      <section id="package-selector" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Set Your Campaign Budget</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-generated content included in your campaign budget
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Growth Package */}
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold mb-2">Growth</h4>
                  <p className="text-3xl font-bold text-primary mb-4">$5,000</p>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  {[
                    "15-25 custom images",
                    "5-10 short video clips",
                    "Character setup",
                    "Social media formats"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Scale Package */}
              <Card className="p-6 border-2 border-primary relative hover:shadow-lg transition-all">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold mb-2">Scale</h4>
                  <p className="text-3xl font-bold text-primary mb-4">$25,000</p>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  {[
                    "75-150 custom images",
                    "25-50 video clips",
                    "Character continuity",
                    "Multi-platform formats",
                    "Ad creative variations"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Dominate Package */}
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold mb-2">Dominate</h4>
                  <p className="text-3xl font-bold text-secondary mb-4">$100,000</p>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  {[
                    "300+ custom images",
                    "100+ video clips",
                    "Advanced character work",
                    "Campaign series",
                    "Priority support"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Custom Budget */}
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold mb-2">Custom</h4>
                  <p className="text-3xl font-bold text-accent mb-4">Custom</p>
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  {[
                    "Custom deliverables",
                    "Flexible budget",
                    "Mixed content packages",
                    "Account manager",
                    "Priority support"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={scrollToPackageSelector}
                size="lg"
                className="text-lg px-8 py-6"
              >
                Get Started
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Contact Form */}
      <Footer />
    </div>
  );
};

export default MediaForBrands;
