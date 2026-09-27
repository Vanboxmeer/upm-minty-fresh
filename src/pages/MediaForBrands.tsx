import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";
import {
  Sparkles, CheckCircle2, Zap, Percent, ExternalLink,
  PenLine, LayoutGrid, RefreshCw, ShieldCheck
} from "lucide-react";
import alchemistMark from "@/assets/apps/fullmedia-alchemist.svg";

/* Fullmedia Alchemist brand tokens — taken from fullmediaalchemist.com/brand-assets.html */
const FMA = {
  ink: "#12160f",
  panel: "#1b2117",
  line: "#333b2c",
  paper: "#f8f3e6",
  paperDim: "#ece6d6",
  muted: "#b4ac94",
  emerald: "#2e9c74",
  emeraldDim: "#1f6f52",
  amber: "#e8a33d",
  amberInk: "#4a2e05",
  violet: "#8a5aa6",
};

const serif = { fontFamily: '"Fraunces", Georgia, serif' };
const sans = { fontFamily: '"IBM Plex Sans", -apple-system, system-ui, sans-serif' };
const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' };

const pricingTiers = [
  { name: "Free", posts: "3 content pieces", price: "$0/mo", bestFor: "Try it before you commit to a plan", video: "No video" },
  { name: "Starter", posts: "30 content pieces", price: "$79/mo", bestFor: "One brand, steady output", video: "Video add-on, $8 each" },
  { name: "Growth", posts: "100 content pieces", price: "$249/mo", bestFor: "Up to 3 brands, 3 concurrent campaigns", popular: true, video: "10 AI videos/mo (coming soon)" },
  { name: "Agency", posts: "300 content pieces", price: "$799/mo", bestFor: "Up to 10 brands, unlimited campaigns", video: "30 AI videos/mo (coming soon)" },
];

const loop = [
  {
    icon: ShieldCheck,
    step: "01",
    title: "Brand intake, once",
    body: "Your voice, colours, niches, mascot and no-go list go in a single time. Everything after this is drafted against that record rather than a blank prompt.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Drafted, never invented",
    body: "Start a campaign and the batch is written from details your brand actually published. No invented stats, no imaginary endorsements, no features you do not ship.",
  },
  {
    icon: LayoutGrid,
    step: "03",
    title: "Shipped fully designed",
    body: "Each piece comes back as finished cards across eight platforms — surfaces, typefaces and backgrounds varied per post, with per-platform hashtags and a real destination link.",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Review & improve",
    body: "Once posts are live it reads the real copy, hashtags and your own notes, then sharpens the next campaign. One click approves a batch, or send it back with a reason and it redrafts.",
  },
];

const contentTypes = [
  "Instagram, TikTok, X, LinkedIn and YouTube posts — stills and short form video",
  "Branded memes, lifestyle scenes, niche culture jokes, educational explainers and product showcases",
  "Written descriptions, strategised hashtags and audio associations per platform",
];

const bonusFeatures = [
  "5–60 second video commercials with sound design",
  "Vertical ads sized for TikTok, Reels, Telegram, YouTube Shorts and LinkedIn",
  "Consistent character and world-building across a long-running campaign",
];

const perfectFor = [
  "App builders and indie teams who want to look professional without hiring a full-time social manager",
  "Web3 founders who need consistent messaging through a token launch, mainnet or partnership",
  "Creators and brands who want content that converts without losing its personality",
  "Teams who already have the vision but not the hours to execute it weekly",
];

const Wordmark = ({ size = "text-3xl" }: { size?: string }) => (
  <span className={`${size} font-semibold`} style={{ ...serif, color: FMA.paper }}>
    Fullmedia <span className="italic" style={{ color: FMA.emerald }}>Alchemist</span>
  </span>
);

const MediaForBrands = () => {
  const { setSelectedPackage, setUserType } = usePackageSelection();
  const navigate = useNavigate();

  useEffect(() => {
    setUserType('brand');
    setSelectedPackage({
      name: "Social Content Creation",
      price: "Free, then from $79/mo",
      description: "Custom branded social content — posts, reels, videos & ads",
      features: [
        "3–300 content pieces/month depending on plan",
        "Instagram Reels, TikTok, X/Twitter content",
        "Branded memes & product showcases",
        "AI-powered video ads with character continuity",
        "Free plan available — no card required",
      ],
      popular: false,
    });

    updateMetaTags({
      title: "Social Content Creation | UPM - United Press Media",
      description: "On-brand social posts, reels, videos and ads on Fullmedia Alchemist. Free plan, then $79, $249 or $799/mo — drafted from your real brand details, never invented, and reviewed after they go live.",
      keywords: "social content creation, Fullmedia Alchemist, AI social content, branded content, social media management, Instagram Reels, TikTok content, Web3 social media, crypto content, content marketing",
      canonical: "https://unitedpress.media/media-for-brands",
      ogTitle: "Social Content Creation by UPM",
      ogDescription: "Scroll-stopping, on-brand social content. Free plan, then from $79/mo.",
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
      <div className="min-h-screen pt-16 pb-16 md:pb-0" style={{ background: FMA.ink, ...sans }}>

        {/* ---------- HERO: UPM navy melting into Alchemist ink ---------- */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0b1220 0%, #101a24 34%, #101710 74%, ' + FMA.ink + ' 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[620px] h-[620px] rounded-full blur-[130px] -translate-y-1/3 translate-x-1/4" style={{ background: 'rgba(0,191,255,0.16)' }} />
            <div className="absolute bottom-0 left-0 w-[560px] h-[560px] rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" style={{ background: 'rgba(46,156,116,0.18)' }} />
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: 'linear-gradient(#f8f3e6 1px, transparent 1px), linear-gradient(90deg, #f8f3e6 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase mb-8"
                style={{ ...mono, color: FMA.amber, border: '1px solid rgba(232,163,61,0.45)' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                UPM Social Content
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.05]" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                Social content that{" "}
                <span className="italic" style={{ color: FMA.emerald }}>gets sharper</span>{" "}
                every post
              </h1>

              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: FMA.muted }}>
                Scroll-stopping, on-brand content so you can focus on building, not posting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ background: FMA.amber, color: FMA.amberInk }}
                >
                  Start your content plan
                  <Zap className="ml-2 h-5 w-5 inline" />
                </button>
                <button
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
                  style={{ border: '1px solid ' + FMA.line, color: FMA.paperDim }}
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  View pricing
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- THE HANDOFF: UPM to Fullmedia Alchemist ---------- */}
        <section className="relative" style={{ background: FMA.ink }}>
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="flex flex-col items-center gap-3">
                  <img src="/lovable-uploads/upm-logo.png" alt="UPM" className="h-16 w-16 object-contain" />
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ ...mono, color: FMA.muted }}>The agency</span>
                </div>

                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="hidden md:block h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(0,191,255,0.5), ' + FMA.emerald + ')' }} />
                  <span className="text-xs tracking-[0.3em] uppercase" style={{ ...mono, color: FMA.emerald }}>runs on</span>
                  <span className="hidden md:block h-px w-20" style={{ background: 'linear-gradient(90deg, ' + FMA.emerald + ', rgba(232,163,61,0.6))' }} />
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-5 rounded-full blur-2xl opacity-60" style={{ background: 'radial-gradient(circle, rgba(46,156,116,0.4), rgba(232,163,61,0.18))' }} />
                    <img src={alchemistMark} alt="Fullmedia Alchemist" className="relative h-20 w-20 object-contain" />
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ ...mono, color: FMA.muted }}>The platform</span>
                </div>
              </div>

              <div className="text-center mt-10">
                <div className="inline-flex items-center gap-3 flex-wrap justify-center">
                  <Wordmark size="text-3xl md:text-4xl" />
                  <span className="px-2.5 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase" style={{ ...mono, color: FMA.amber, border: '1px solid rgba(232,163,61,0.5)' }}>
                    By UPM
                  </span>
                </div>
                <p className="mt-5 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: FMA.muted }}>
                  Every post in a UPM social package is made on our own platform — so what you buy from
                  the agency and what you can log in and see are the same thing.
                </p>
              </div>
            </div>
          </div>
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, ' + FMA.line + ', transparent)' }} />
        </section>

        {/* ---------- THE LOOP ---------- */}
        <section className="py-20" style={{ background: FMA.ink }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full blur-2xl opacity-60" style={{ background: 'radial-gradient(circle, rgba(46,156,116,0.35), rgba(232,163,61,0.15))' }} />
                  <img src={alchemistMark} alt="" className="relative h-24 w-24 object-contain" />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                Meet the <span className="italic" style={{ color: FMA.emerald }}>Alchemist</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: FMA.muted }}>
                The Alchemist is the assistant that actually makes your content. It learns your brand
                once, writes only from things you have really published, and hands the work back
                finished rather than as a draft for you to fix — then goes back over what went live
                and gets better at it.
              </p>
              <p className="text-sm mt-4" style={{ ...mono, color: FMA.amber }}>
                Four habits worth knowing about
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {loop.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="p-7 rounded-xl" style={{ background: FMA.panel, border: '1px solid ' + FMA.line }}>
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 p-3 rounded-lg" style={{ background: 'rgba(46,156,116,0.12)', border: '1px solid rgba(46,156,116,0.3)' }}>
                        <Icon className="h-6 w-6" style={{ color: FMA.emerald }} />
                      </div>
                      <div>
                        <span className="text-xs tracking-[0.2em]" style={{ ...mono, color: FMA.amber }}>{s.step}</span>
                        <h3 className="text-xl mt-1 mb-2" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>{s.title}</h3>
                        <p className="leading-relaxed" style={{ color: FMA.muted }}>{s.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl text-center" style={{ background: 'rgba(138,90,166,0.10)', border: '1px solid rgba(138,90,166,0.35)' }}>
              <p className="leading-relaxed" style={{ color: FMA.paperDim }}>
                <strong style={{ color: FMA.paper }}>Nothing gets invented.</strong> Every claim is grounded in
                something your brand actually published — and clients get their own login, so no part of the
                plan is a mystery.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- WHAT IT MAKES ---------- */}
        <section className="py-20" style={{ background: FMA.panel }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div className="p-8 rounded-xl" style={{ background: FMA.ink, border: '1px solid ' + FMA.line }}>
                <h3 className="text-2xl mb-6" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>What it makes</h3>
                <ul className="space-y-4">
                  {contentTypes.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: FMA.emerald }} />
                      <span style={{ color: FMA.muted }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-xl" style={{ background: FMA.ink, border: '1px solid rgba(232,163,61,0.3)' }}>
                <h3 className="text-2xl mb-6" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                  Video, when a still will not do
                </h3>
                <ul className="space-y-4">
                  {bonusFeatures.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: FMA.amber }} />
                      <span style={{ color: FMA.muted }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- PRICING ---------- */}
        <section id="pricing" className="py-20" style={{ background: FMA.ink }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                Simple, fair pricing
              </h2>
              <p className="text-lg" style={{ color: FMA.muted }}>
                The same four plans you get on <Wordmark size="text-lg" /> — billed monthly, cancel anytime.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="p-6 text-center rounded-xl relative transition-transform hover:-translate-y-1"
                  style={{
                    background: tier.popular ? 'rgba(46,156,116,0.10)' : FMA.panel,
                    border: '1px solid ' + (tier.popular ? FMA.emerald : FMA.line),
                  }}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] tracking-wider uppercase" style={{ ...mono, background: FMA.emerald, color: FMA.ink }}>
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl mb-2" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>{tier.name}</h3>
                  <p className="text-3xl mb-1" style={{ ...serif, color: FMA.amber, fontWeight: 600 }}>{tier.price}</p>
                  <p className="text-sm mb-3" style={{ color: FMA.paperDim }}>{tier.posts}/month</p>
                  <p className="text-xs mb-3" style={{ color: FMA.muted }}>{tier.bestFor}</p>
                  <p className="text-[11px] pt-3" style={{ ...mono, color: FMA.amber, borderTop: '1px solid ' + FMA.line }}>{tier.video}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: FMA.panel, border: '1px solid ' + FMA.line }}>
                <Percent className="w-5 h-5 shrink-0" style={{ color: FMA.emerald }} />
                <span className="text-sm" style={{ color: FMA.paperDim }}>Pay <strong style={{ color: FMA.paper }}>annually</strong> → <strong style={{ color: FMA.emerald }}>2 months free</strong></span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: FMA.panel, border: '1px solid ' + FMA.line }}>
                <Percent className="w-5 h-5 shrink-0" style={{ color: FMA.amber }} />
                <span className="text-sm" style={{ color: FMA.paperDim }}>Video is priced separately from stills · extra brand slots from <strong style={{ color: FMA.amber }}>$29/mo</strong></span>
              </div>
            </div>
            <p className="text-center text-xs mt-5 max-w-lg mx-auto" style={{ color: FMA.muted }}>
              No card required to start on Free. Every plan includes Review &amp; Improve at one credit per
              platform reviewed, and CSV export to Metricool. Video is counted and priced on its own —
              see each plan above.
            </p>

            <div className="text-center mt-10">
              <a
                href="https://www.fullmediaalchemist.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-transform hover:-translate-y-0.5"
                style={{ background: FMA.emerald, color: FMA.ink }}
              >
                Open Fullmedia Alchemist
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-xs mt-3" style={{ color: FMA.muted }}>Free plan available — no card required.</p>
            </div>
          </div>
        </section>

        {/* ---------- PERFECT FOR ---------- */}
        <section className="py-20" style={{ background: FMA.panel }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>Perfect for</h2>
              <div className="space-y-4">
                {perfectFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: FMA.ink, border: '1px solid ' + FMA.line }}>
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" style={{ color: FMA.emerald }} />
                    <p style={{ color: FMA.muted }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA: back toward UPM ---------- */}
        <section className="py-20" style={{ background: 'linear-gradient(180deg, ' + FMA.ink + ' 0%, #101710 40%, #0b1220 100%)' }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
              Ready to stop stressing about content?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: FMA.muted }}>
              Let us take the posting pressure off your plate — so you can ship faster and show up stronger.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: FMA.amber, color: FMA.amberInk }}
            >
              Start your content plan
              <Zap className="ml-2 h-5 w-5 inline" />
            </button>
          </div>
        </section>

        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default MediaForBrands;
