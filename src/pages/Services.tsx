import { useEffect } from "react";
import Header from "@/components/Header";
import PackageSelector from "@/components/PackageSelector";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Newspaper, Mic, FileText, CalendarClock, Workflow, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { updateMetaTags } from "@/utils/seoUtils";
import { useTypewriter } from "@/hooks/useTypewriter";

/* ---------- Service diagrams: restrained line art, one accent, no stock photos ---------- */
const DIAGRAM_WRAP =
  "w-full rounded-xl border border-border/60 bg-gradient-to-br from-muted/40 to-background p-6 shadow-sm";

const CreatorsDiagram = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="One brand connected to a spread of creator channels, some booked and some still in conversation">
    <g stroke="currentColor" className="text-muted-foreground/30" strokeWidth="1" fill="none">
      <path d="M200 130 L92 58" /><path d="M200 130 L318 62" /><path d="M200 130 L64 150" />
      <path d="M200 130 L340 140" /><path d="M200 130 L110 214" /><path d="M200 130 L300 212" />
      <path d="M200 130 L214 34" />
    </g>
    <g stroke="currentColor" className="text-primary" strokeWidth="1.5" fill="none">
      <path d="M200 130 L92 58" /><path d="M200 130 L340 140" /><path d="M200 130 L300 212" />
    </g>
    <g className="text-primary" fill="currentColor">
      <circle cx="92" cy="58" r="11" /><circle cx="340" cy="140" r="8" /><circle cx="300" cy="212" r="13" />
    </g>
    <g className="text-muted-foreground/50" fill="currentColor">
      <circle cx="318" cy="62" r="9" /><circle cx="64" cy="150" r="7" />
      <circle cx="110" cy="214" r="10" /><circle cx="214" cy="34" r="6" />
    </g>
    <rect x="182" y="112" width="36" height="36" rx="8" className="text-foreground" fill="currentColor" />
  </svg>
);

const PressDiagram = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="A single announcement distributed out to multiple publications">
    <rect x="28" y="88" width="84" height="104" rx="6" className="text-foreground/80" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <g className="text-muted-foreground/60" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M44 110 H96" /><path d="M44 126 H88" /><path d="M44 142 H96" /><path d="M44 158 H72" />
    </g>
    <g stroke="currentColor" className="text-primary" strokeWidth="1.5" fill="none">
      <path d="M112 140 C168 140 168 54 236 54" /><path d="M112 140 C168 140 168 112 236 112" />
      <path d="M112 140 C168 140 168 168 236 168" /><path d="M112 140 C168 140 168 226 236 226" />
    </g>
    <g className="text-foreground/70" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="240" y="32" width="128" height="44" rx="5" /><rect x="240" y="90" width="128" height="44" rx="5" />
      <rect x="240" y="146" width="128" height="44" rx="5" /><rect x="240" y="204" width="128" height="44" rx="5" />
    </g>
    <g className="text-muted-foreground/50" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M254 48 H318" /><path d="M254 60 H294" /><path d="M254 106 H330" /><path d="M254 118 H286" />
      <path d="M254 162 H310" /><path d="M254 174 H302" /><path d="M254 220 H322" /><path d="M254 232 H278" />
    </g>
  </svg>
);

const PublicationsDiagram = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="Stacked article layouts with one feature placement highlighted">
    <g className="text-muted-foreground/35" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="54" y="34" width="292" height="60" rx="6" />
      <rect x="54" y="176" width="292" height="60" rx="6" />
    </g>
    <g className="text-muted-foreground/40" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M150 54 H326" /><path d="M150 70 H286" />
      <path d="M150 196 H326" /><path d="M150 212 H272" />
    </g>
    <g className="text-muted-foreground/25" fill="currentColor">
      <rect x="70" y="46" width="64" height="36" rx="4" /><rect x="70" y="188" width="64" height="36" rx="4" />
    </g>
    <rect x="54" y="105" width="292" height="60" rx="6" className="text-primary" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="70" y="117" width="64" height="36" rx="4" className="text-primary/30" fill="currentColor" />
    <g className="text-primary" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M150 125 H326" /><path d="M150 141 H290" />
    </g>
  </svg>
);

const InterviewsDiagram = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="Two speakers either side of a live audio waveform">
    <g className="text-foreground/70" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="56" cy="130" r="26" /><circle cx="344" cy="130" r="26" />
    </g>
    <g className="text-muted-foreground/40" fill="currentColor">
      <circle cx="56" cy="121" r="9" /><circle cx="344" cy="121" r="9" />
      <path d="M40 150 a16 16 0 0 1 32 0 z" /><path d="M328 150 a16 16 0 0 1 32 0 z" />
    </g>
    <g className="text-primary" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M108 130 V130" /><path d="M126 112 V148" /><path d="M144 92 V168" /><path d="M162 118 V142" />
      <path d="M180 76 V184" /><path d="M198 104 V156" /><path d="M216 86 V174" /><path d="M234 120 V140" />
      <path d="M252 98 V162" /><path d="M270 114 V146" /><path d="M288 130 V130" />
    </g>
  </svg>
);

const OwnChannelsDiagram = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="A posting schedule filling across several platform rows">
    <g className="text-muted-foreground/25" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="40" y="40" width="320" height="180" rx="6" />
      <path d="M40 76 H360" /><path d="M40 112 H360" /><path d="M40 148 H360" /><path d="M40 184 H360" />
      <path d="M104 40 V220" /><path d="M168 40 V220" /><path d="M232 40 V220" /><path d="M296 40 V220" />
    </g>
    <g className="text-primary/70" fill="currentColor">
      <rect x="52" y="50" width="40" height="16" rx="4" /><rect x="180" y="50" width="40" height="16" rx="4" />
      <rect x="116" y="86" width="40" height="16" rx="4" /><rect x="308" y="86" width="40" height="16" rx="4" />
      <rect x="52" y="122" width="40" height="16" rx="4" /><rect x="244" y="122" width="40" height="16" rx="4" />
      <rect x="180" y="158" width="40" height="16" rx="4" /><rect x="308" y="158" width="40" height="16" rx="4" />
      <rect x="116" y="194" width="40" height="16" rx="4" />
    </g>
    <g className="text-muted-foreground/30" fill="currentColor">
      <rect x="244" y="50" width="40" height="16" rx="4" /><rect x="52" y="86" width="40" height="16" rx="4" />
      <rect x="308" y="122" width="40" height="16" rx="4" /><rect x="244" y="194" width="40" height="16" rx="4" />
    </g>
  </svg>
);

const AutomationDiagram = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="Several tools feeding one automated pipeline that produces a result">
    <g className="text-muted-foreground/50" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="26" y="34" width="72" height="34" rx="6" /><rect x="26" y="88" width="72" height="34" rx="6" />
      <rect x="26" y="142" width="72" height="34" rx="6" /><rect x="26" y="196" width="72" height="34" rx="6" />
    </g>
    <g stroke="currentColor" className="text-primary" strokeWidth="1.5" fill="none">
      <path d="M98 51 C150 51 150 120 176 128" /><path d="M98 105 C150 105 150 124 176 130" />
      <path d="M98 159 C150 159 150 138 176 132" /><path d="M98 213 C150 213 150 142 176 134" />
    </g>
    <rect x="176" y="100" width="64" height="62" rx="10" className="text-foreground" fill="currentColor" />
    <g className="text-background" stroke="currentColor" strokeWidth="2" fill="none">
      <path d="M192 131 h12" /><path d="M212 121 h12" /><path d="M212 141 h12" />
    </g>
    <path d="M240 131 H300" className="text-primary" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M292 124 L302 131 L292 138 Z" className="text-primary" fill="currentColor" />
    <rect x="306" y="104" width="68" height="54" rx="8" className="text-primary" fill="none" stroke="currentColor" strokeWidth="2" />
    <g className="text-primary/60" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M320 124 H360" /><path d="M320 138 H346" />
    </g>
  </svg>
);

const DIAGRAMS = {
  creators: CreatorsDiagram,
  press: PressDiagram,
  publications: PublicationsDiagram,
  interviews: InterviewsDiagram,
  ownChannels: OwnChannelsDiagram,
  automation: AutomationDiagram,
} as const;

const serviceDetails = [
  {
    id: "kol-collaborations",
    icon: Users,
    title: "Creator & KOL Collaborations",
    pricing: "Paid from your campaign budget",
    description:
      "Creators whose audience already overlaps with your market — researched against your brand rather than pulled off a list, then approached, negotiated and booked for you.",
    features: [
      "Shortlists built from your niche, audience and product, not a generic database",
      "Rates checked against what comparable channels have quoted us before",
      "Free and paid coverage chased side by side",
      "Coverage across X, YouTube, TikTok, Telegram and Instagram",
      "Every conversation and quote visible in your campaign tracker",
    ],
    diagram: "creators",
  },
  {
    id: "press-release",
    icon: Newspaper,
    title: "Press Releases & Distribution",
    pricing: "Included with Silver and Gold",
    description:
      "Announcements written to be picked up, then distributed to the tech, gaming, AI and crypto outlets that actually cover your category.",
    features: [
      "Written for the outlet, not for your homepage",
      "Investor and community-facing messaging for funding, launches and milestones",
      "SEO-structured so the release keeps earning after the news cycle",
      "Syndication reported back with live links",
    ],
    diagram: "press",
  },
  {
    id: "publications",
    icon: FileText,
    title: "Publications, Features & Placements",
    pricing: "Free where we can get it, paid where it is worth it",
    description:
      "Features, reviews, and bought slots on the sites, newsletters and communities your buyers already read. Some outlets charge; plenty will cover a genuinely newsworthy story for nothing, and we push for that first either way.",
    features: [
      "Earned features when the story stands on its own",
      "Sponsored articles and display slots where the audience justifies the rate",
      "Newsletter sends and inline placements",
      "Sponsored slots in the groups and channels your market gathers in",
      "Long-form thought leadership under your founder's name",
      "Every rate disclosed to you before anything is booked",
    ],
    diagram: "publications",
  },
  {
    id: "interviews",
    icon: Mic,
    title: "Interviews, Spaces & Podcasts",
    pricing: "Depends on the show",
    description:
      "Put your founder in front of an audience that already trusts the host — podcasts, X Spaces, AMAs and co-hosted community events.",
    features: [
      "Shows matched to your market rather than to follower count",
      "Executive interview placements and guest slots",
      "X Spaces and AMAs, hosted or co-hosted",
      "Briefing notes and likely questions before you go on",
    ],
    diagram: "interviews",
  },
  {
    id: "own-channels",
    icon: CalendarClock,
    title: "Content for Your Own Channels",
    pricing: "Free plan, then from $79/mo",
    description:
      "Fullmedia Alchemist is our own app. The Alchemist, its brand assistant, drafts on-brand posts from your real details and puts them on a schedule across eight platforms — you log in and run it yourself.",
    features: [
      "Posts, reels, video and ads for the accounts you already own",
      "Drafted from what your brand has actually published, never invented",
      "Finished designs, per-platform hashtags and a real destination link",
      "Reviews what went live to sharpen the next campaign",
    ],
    diagram: "ownChannels",
    link: { to: "/media-for-brands", label: "See Fullmedia Alchemist" },
  },
  {
    id: "app-development",
    icon: Workflow,
    title: "App Development & AI Automations",
    pricing: "From $5,000",
    description:
      "Agentic development and AI integrations. Apps, internal tools and automations across Google Sheets, Supabase, Vercel, Stripe and the rest of your stack — built in a fraction of the time a traditional agency takes.",
    features: [
      "Client-facing apps and MVPs",
      "Automations that remove the manual step instead of documenting it",
      "Skills, agents and internal tools for your own team",
      "Smaller automations scoped separately from full builds",
    ],
    diagram: "automation",
    link: { to: "/vibe-coding", label: "See App Development" },
  },
] as const;

const ServicesPage = () => {
  useEffect(() => {
    updateMetaTags({
      title: "UPM Services | Creator Coverage, Press, Content & Builds",
      description:
        "Creator and KOL collaborations, press releases, feature coverage, interviews, social content for your own channels, and app development — for brands in AI, gaming, Web3 and tech.",
      keywords:
        "UPM services, KOL collaborations, creator coverage, press release distribution, media placements, interviews, social content, app development, AI automations",
      canonical: "https://unitedpress.media/services",
      ogTitle: "UPM Services | Creator Coverage, Press, Content & Builds",
      ogDescription:
        "Creator coverage, press, interviews, own-channel content and custom builds for brands in AI, gaming, Web3 and tech.",
      ogType: "website",
      ogUrl: "https://unitedpress.media/services",
    });
  }, []);

  const brandTypes = ["AI Brands", "Web3 Brands", "GameFi Brands", "VR Brands", "Crypto Brands", "Tech Brands"];
  const currentBrand = useTypewriter({
    words: brandTypes,
    typeSpeed: 50,
    deleteSpeed: 25,
    delayBetweenWords: 2000,
  });

  const scrollToPackages = () => {
    const packageSection = document.querySelector('[data-section="package-selector"]');
    if (packageSection) {
      const offsetTop = packageSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(0,191,255,0.12), transparent 45%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.12), transparent 45%)",
            }}
          />
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
                <span className="block">Services for</span>
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent inline-block min-h-[1em]">
                  {currentBrand || " "}
                  <span className="animate-pulse text-foreground ml-1 font-thin">|</span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                Coverage on other people&apos;s channels, content on your own, and the occasional
                app when the thing you need does not exist yet.
              </p>
              <p className="text-base text-muted-foreground/90 mb-8">
                You set the campaign budget, we place it and show you where every pound went.
                Memberships start at $250 a month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="px-8 py-6 text-lg" onClick={scrollToPackages}>
                  View Our Packages
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                  <Link to="/dealflow">How our outreach works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Actually Do</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Six services for brands in AI, gaming, Web3, DeFi and consumer tech. Most clients
                use two or three of them at once.
              </p>
            </div>

            <div className="space-y-20">
              {serviceDetails.map((service, index) => {
                const Diagram = DIAGRAMS[service.diagram];
                const flipped = index % 2 === 1;
                return (
                  <div key={service.id} id={service.id} className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div className={flipped ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <service.icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{service.title}</h3>
                          <p className="text-primary font-medium text-sm">{service.pricing}</p>
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

                      <div className="space-y-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {"link" in service && service.link && (
                        <Button variant="outline" className="mt-6 group" asChild>
                          <Link to={service.link.to} className="inline-flex items-center gap-2">
                            {service.link.label}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </Button>
                      )}
                    </div>

                    <div className={flipped ? "lg:order-1" : ""}>
                      <div className={DIAGRAM_WRAP}>
                        <Diagram />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dealflow band */}
        <section className="py-16 border-y border-border/60 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                The outreach runs on our own software
              </h2>
              <p className="text-lg text-muted-foreground mb-3">
                Creator and press work is run through Dealflow: researched shortlists, one consistent
                voice across every approach, logged rates, and a follow-up date on every thread so nothing
                quietly dies in an inbox. It comes with Silver and Gold.
              </p>
              <p className="text-base text-muted-foreground/90 mb-8">
                Free-coverage outreach is a bonus on top of the paid work, so it is metered — 15 requests
                a month on Silver, 50 on Gold, extras at $20. Paid-placement outreach is never capped.
              </p>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dealflow" className="inline-flex items-center gap-2">
                  See how Dealflow works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <PackageSelector />
        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default ServicesPage;
