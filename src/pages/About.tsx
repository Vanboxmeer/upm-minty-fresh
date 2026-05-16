import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";
import AnimatedStarfield from "@/components/AnimatedStarfield";
import { Button } from "@/components/ui/button";
import { FileText, Megaphone, Users, CheckCircle, Clock, Headphones, Code2, ExternalLink, ArrowRight, Rocket, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { updateMetaTags } from "@/utils/seoUtils";

import watchCryptoIcon from "@/assets/apps/watch-crypto.png";
import spinquestIcon from "@/assets/apps/spinquest.png";
import amplifyHubIcon from "@/assets/apps/amplifyhub.png";
import rewriteableIcon from "@/assets/apps/rewriteable-ai.png";
import readingRaceIcon from "@/assets/apps/reading-race.png";
import everythingNightlifeIcon from "@/assets/apps/everything-nightlife.png";
import vaporsmoothIcon from "@/assets/apps/vaporsmooth.png";

const apps = [
  { name: "Watch Crypto", icon: watchCryptoIcon, url: "https://watchcrypto.info/" },
  { name: "SpinQuest", icon: spinquestIcon, url: "https://spinquest.app/" },
  { name: "AmplifyHub", icon: amplifyHubIcon, url: "https://amplifyhub.base44.app" },
  { name: "Re-Writeable AI", icon: rewriteableIcon, url: "https://rewriteable.lovable.app/" },
  { name: "Reading Race", icon: readingRaceIcon, url: "https://readingrace.com/" },
  { name: "Everything Nightlife", icon: everythingNightlifeIcon, url: "https://everythingnightlife.lovable.app" },
  { name: "Vaporsmooth", icon: vaporsmoothIcon, url: "https://vaporsmooth.com" },
];

const services = [
  {
    icon: FileText,
    title: "Press Release Distribution",
    description: "Professional press release writing and distribution to major news outlets, ensuring your story reaches the right audience at the right time.",
    link: "/services#press-release",
  },
  {
    icon: Megaphone,
    title: "Tier-1 Media Placements",
    description: "Strategic placement in top-tier publications and media outlets to maximize your brand's visibility and credibility.",
    link: "/services#publications",
  },
  {
    icon: Users,
    title: "KOL Collaborations",
    description: "Connect with key opinion leaders and content creators to amplify your message through authentic, engaging sponsored content.",
    link: "/services#kol-collaborations",
  },
  {
    icon: Palette,
    title: "Social Content Creation",
    description: "Custom branded social content — posts, reels, videos & ads that feel like you. From ~$25/post with monthly plans.",
    link: "/media-for-brands",
  },
  {
    icon: Code2,
    title: "Vibe Coding",
    description: "Custom app development services — from concept to launch. We build modern, high-performance web applications for your brand.",
    link: "/vibe-coding",
  },
];

const About = () => {
  useEffect(() => {
    updateMetaTags({
      title: "About UPM | United Press - Media Agency",
      description: "Meet UPM: a digital marketing agency for press release distribution, KOL collaborations, tier-1 media placements, and vibe coding.",
      keywords: "about UPM, United Press Media Agency, digital marketing, press release, KOL, vibe coding, web3 marketing",
      canonical: "https://unitedpress.media/about",
      ogTitle: "About UPM | United Press - Media Agency",
      ogDescription: "Your trusted partner in digital marketing excellence. Press releases, media placements, KOL collaborations & app development.",
      ogType: "website",
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen relative pt-16" style={{ background: 'linear-gradient(to bottom, #0f172a, #1e1b4b)' }}>
        {/* Starfield Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AnimatedStarfield />
        </div>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-24 pb-16 text-center">
            <div className="container mx-auto px-4">
              <img
                src="/lovable-uploads/upm-logo.png"
                alt="UPM Logo"
                className="retro-logo-hover h-24 w-auto mx-auto mb-6 drop-shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">About UPM</h1>
              <p className="text-xl md:text-2xl text-purple-300 font-medium mb-4">United Press - Media Agency</p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Your trusted partner in digital marketing excellence
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-semibold mb-6 text-white">Our Mission</h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  United Press - Media Agency (UPM) is a leading digital marketing service provider specializing in
                  press release distribution, tier-1 media placements, and sponsored content creator collaborations.
                  We help businesses amplify their message and reach their target audiences through strategic
                  media partnerships and influential content creators.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do: Core Services */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-semibold mb-10 text-white text-center">What We Do</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    to={service.link}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <service.icon className="h-10 w-10 text-purple-400 mb-4 group-hover:text-purple-300 transition-colors" />
                    <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose UPM */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-semibold mb-6 text-white">Why Choose UPM?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Extensive network of media contacts and content creators</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <Headphones className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Responsive customer support and regular campaign updates</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Fast turnaround times and reliable delivery</span>
                  </li>
                  <li className="flex items-start">
                    <Rocket className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Data-driven strategies that deliver measurable results</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Apps Showcase */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-semibold mb-4 text-white text-center">Our Apps</h2>
              <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
                Built with UPM Vibe Coding services — explore our portfolio of modern web applications.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-6 mb-8">
                {apps.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative mb-3">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-contain p-1 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-purple-500/30"
                      />
                      <ExternalLink className="absolute -top-1 -right-1 h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                      {app.name}
                    </span>
                  </a>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/10">
                  <Link to="/our-products" className="inline-flex items-center gap-2">
                    View All Apps
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Blog / Trending Feed */}
          <BlogSection />

          {/* Get Started CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h2 className="text-3xl font-semibold mb-4 text-white">Get Started Today</h2>
              <p className="text-lg text-gray-300 mb-8">
                Ready to amplify your brand's reach? Contact our team to discuss your marketing
                goals and learn how UPM can help you achieve them.
              </p>
              <Button
                onClick={() => window.location.href = '/#package-selector'}
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                Start a Campaign
              </Button>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default About;
