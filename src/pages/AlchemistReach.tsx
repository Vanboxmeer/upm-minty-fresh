import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";
import {
  Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, Search, PenLine, ShieldCheck, Inbox,
  Handshake, Layers, Library, ListChecks, Smartphone, Users, Briefcase, Building2, Percent
} from "lucide-react";
import alchemistMark from "@/assets/apps/fullmedia-alchemist.svg";

/* Fullmedia Alchemist brand tokens (Alchemist Reach is a module of Fullmedia Alchemist) */
const FMA = {
  ink: "#12160f",
  panel: "#1b2117",
  panelAlt: "#161c13",
  line: "#333b2c",
  paper: "#f8f3e6",
  paperDim: "#ece6d6",
  muted: "#b4ac94",
  emerald: "#2e9c74",
  amber: "#e8a33d",
  amberInk: "#4a2e05",
};

const serif = { fontFamily: '"Fraunces", Georgia, serif' };
const sans = { fontFamily: '"IBM Plex Sans", -apple-system, system-ui, sans-serif' };
const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };

const APP_URL = "https://www.fullmediaalchemist.com/reach-features/";
const PRICING_URL = "https://www.fullmediaalchemist.com/pricing/";

const twoWays = [
  {
    tag: "Run it yourself",
    tone: "emerald",
    title: "Subscribe at Fullmedia Alchemist",
    body: "Pick Content, Reach, or both. Content writes and designs your own posts, and Reach finds the creators and outlets worth pitching and tracks every deal to a close. Both start free, each has its own plans, and the same tier of each together is 10% cheaper. You do the outreach, so your accounts and your data stay yours.",
    bullets: [
      "Free to start, no card",
      "Your own Gmail, your own brands, your own team seats",
      "Nothing is sent until you approve it",
    ],
    link: { href: PRICING_URL, label: "See Content and Reach plans", external: true },
  },
  {
    tag: "We run it for you",
    tone: "amber",
    title: "Work with UPM on Silver or Gold",
    body: "Our team does the work for you. Silver and Gold are done-for-you plans, and we use the same tools, Fullmedia Alchemist Content and Reach, to run your campaigns. The service fee is lower on both and lowest on Gold, and you can see every placement move.",
    bullets: [
      "Silver: $250 a month plus a 3.45% service fee",
      "Gold: $995 a month plus a 1% service fee",
      "Researched shortlists, outreach, follow-ups and rates handled by our team",
    ],
    link: { to: "/services", label: "See UPM plans and services" },
  },
];

const loop = [
  {
    icon: Search,
    step: "01",
    title: "Ask",
    body: "Say who you want: channel types, niche, audience size, language, free or paid, and a budget cap per placement. Reach goes and researches them.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Review the shortlist",
    body: "Matches come back as proposed rows with the reason each one fits, a contact route that was found on a real source, and a first draft written from your brand facts.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "Approve and send",
    body: "Open the draft in Gmail with your signature, or copy it into a DM, then mark it sent. Every message waits for you.",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Track and close",
    body: "Replies land on the same deal. Reach shows who owes the next move, nudges stalled deals, logs quotes and holds the approvals checklist until the deal is signed.",
  },
];

const capabilities = [
  {
    icon: Layers,
    title: "A workbench for every deal",
    body: "One inbox for replies you owe, proposed options and drafts waiting for review, across every brand. Edit status, next action, follow-up date and quote right in the row.",
  },
  {
    icon: Library,
    title: "An options library with the price on file",
    body: "One record per creator or outlet, with response history across your brands. Import from a deck or sheet instead of retyping it, and share or pick up options in the public library.",
  },
  {
    icon: ListChecks,
    title: "Approvals before it moves on",
    body: "Set NDA, contract, client sign-off, licensing or payment checks once per brand. Reach asks for them at the right stage and logs every confirmation and override.",
  },
  {
    icon: Smartphone,
    title: "Works on your phone",
    body: "Check who replied, approve a draft and mark it sent from anywhere. Ask the Alchemist who needs a reply first, or what is stalled and why.",
  },
  {
    icon: Users,
    title: "Brands, seats and clients",
    body: "Each brand keeps its own tone, signature and do-not-contact list. Agency plans add team seats, client review links and client portals that never show your notes or contacts.",
  },
  {
    icon: Inbox,
    title: "Free and paid, side by side",
    body: "Free coverage counts as a real outcome next to paid placements, with every quote logged by date so the next negotiation starts from evidence.",
  },
];

const guardrails = [
  "No verified contact route, no row. Where nothing is found, Reach says so instead of guessing.",
  "Prices are only what you or the creator gave. Nothing in the library is estimated.",
  "Reach never sends for you. You review every message and press send yourself.",
  "Do-not-contact names are set per brand and respected by every research run.",
];

const perfectFor = [
  { icon: Briefcase, text: "PR and influencer agencies running outreach for several client brands" },
  { icon: Building2, text: "In-house brand and partnerships teams who own their own creator and press relationships" },
  { icon: Users, text: "Founders and small teams chasing coverage, partners and sponsors without a dedicated hire" },
  { icon: Sparkles, text: "Brands who would rather hand the whole thing to a team and see the results, which is what Silver and Gold are for" },
];

const AlchemistReach = () => {
  const { setSelectedPackage, setUserType } = usePackageSelection();

  useEffect(() => {
    setUserType("brand");
    setSelectedPackage({
      name: "Alchemist Reach",
      price: "Free to start",
      description: "Find creators and outlets, draft the outreach and track every deal to a close",
      features: [
        "Ask for a shortlist with contacts and a first draft each",
        "Workbench, deals and options library",
        "Approvals checklist and client portals",
        "Run it yourself, or have UPM run it on Silver or Gold",
      ],
      popular: false,
    });

    updateMetaTags({
      title: "Alchemist Reach | Find Creators & Press, Track Every Deal | UPM",
      description: "Alchemist Reach finds the creators and outlets worth pitching, drafts the outreach and tracks every deal to a close. Run it yourself on a free-to-start plan, or have UPM run it for you on Silver or Gold.",
      keywords: "Alchemist Reach, Fullmedia Alchemist Reach, outreach software, influencer outreach tool, PR outreach tool, creator outreach, deal tracker, agency outreach software, UPM Silver Gold",
      canonical: "https://unitedpress.media/alchemist-reach",
      ogTitle: "Alchemist Reach by UPM",
      ogDescription: "Find who should cover you and track every deal to a close. Run it yourself, or have UPM run it for you.",
      ogType: "website",
      twitterCard: "summary_large_image",
      structuredData: [
        generateStructuredData("organization", {}),
        generateStructuredData("website", {}),
      ],
    });
  }, [setSelectedPackage, setUserType]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 pb-16 md:pb-0" style={{ ...sans, background: FMA.ink }}>

        {/* ---------- HERO ---------- */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0d110a 0%, rgba(46,156,116,0.14) 45%, " + FMA.ink + " 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[620px] h-[620px] rounded-full blur-[130px] -translate-y-1/3 translate-x-1/4" style={{ background: "rgba(46,156,116,0.22)" }} />
            <div className="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" style={{ background: "rgba(232,163,61,0.12)" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-7">
                <div className="relative">
                  <div
                    className="absolute -inset-8 rounded-full blur-3xl opacity-60"
                    style={{ background: "radial-gradient(circle, rgba(232,163,61,0.28), rgba(46,156,116,0.3) 60%, transparent 78%)" }}
                  />
                  <img src={alchemistMark} alt="Alchemist Reach, part of Fullmedia Alchemist" className="relative h-24 w-24 md:h-28 md:w-28" />
                </div>
              </div>

              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase mb-6"
                style={{ ...mono, color: FMA.amber, border: "1px solid rgba(232,163,61,0.45)" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Alchemist Reach · part of Fullmedia Alchemist
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.05]" style={{ ...serif, color: FMA.paper, fontWeight: 700 }}>
                Find who should <span style={{ color: FMA.amber }}>cover you</span>
              </h1>

              <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: FMA.paperDim }}>
                The outreach tool behind every UPM campaign. Use it yourself, or let us use it for you.
              </p>

              <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: FMA.muted }}>
                Describe the creators and outlets you want. Alchemist Reach researches them, brings back a
                shortlist with contacts and a first draft each, and keeps every deal moving until it closes.
                You approve every message.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                  style={{ background: FMA.amber, color: FMA.amberInk }}
                >
                  Start free on Fullmedia Alchemist
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <button
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
                  style={{ border: "1px solid " + FMA.line, color: FMA.paperDim }}
                  onClick={() => scrollTo("ways")}
                >
                  Or have UPM run it for you
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- TWO WAYS ---------- */}
        <section id="ways" className="py-16 md:py-20" style={{ background: FMA.ink }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                Two ways to use it
              </h2>
              <p className="text-lg" style={{ color: FMA.muted }}>
                Same tools either way. The difference is who does the work.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {twoWays.map((w) => {
                const c = w.tone === "emerald" ? FMA.emerald : FMA.amber;
                const bg = w.tone === "emerald" ? "rgba(46,156,116,0.08)" : "rgba(232,163,61,0.08)";
                const br = w.tone === "emerald" ? "rgba(46,156,116,0.4)" : "rgba(232,163,61,0.4)";
                return (
                  <div key={w.title} className="p-7 rounded-xl flex flex-col" style={{ background: bg, border: "1px solid " + br }}>
                    <span className="text-[11px] tracking-[0.2em] uppercase" style={{ ...mono, color: c }}>{w.tag}</span>
                    <h3 className="text-xl mt-2 mb-3" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>{w.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: FMA.muted }}>{w.body}</p>
                    <ul className="space-y-2.5 flex-1 mb-5">
                      {w.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: c }} />
                          <span style={{ color: FMA.paperDim }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {"to" in w.link ? (
                      <Link to={w.link.to} className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: c }}>
                        {w.link.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a href={w.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: c }}>
                        {w.link.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="max-w-3xl mx-auto mt-8 p-4 rounded-xl text-center flex items-center justify-center gap-3" style={{ background: FMA.panelAlt, border: "1px solid " + FMA.line }}>
              <Percent className="w-5 h-5 shrink-0" style={{ color: FMA.emerald }} />
              <p className="text-sm" style={{ color: FMA.paperDim }}>
                Self-serve customers who put Content and Reach on the same tier save 10% on both.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section id="how" className="py-20" style={{ background: FMA.panelAlt }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                From a request to a closed deal
              </h2>
              <p className="text-lg" style={{ color: FMA.muted }}>
                Finding the right options is the slow part, so that is where Reach starts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {loop.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="p-7 rounded-xl" style={{ background: FMA.ink, border: "1px solid " + FMA.line }}>
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 p-3 rounded-lg" style={{ background: "rgba(46,156,116,0.18)", border: "1px solid rgba(46,156,116,0.4)" }}>
                        <Icon className="h-6 w-6" style={{ color: FMA.amber }} />
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
          </div>
        </section>

        {/* ---------- WHAT'S INSIDE ---------- */}
        <section className="py-20" style={{ background: FMA.ink }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                What is inside
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: FMA.muted }}>
                Built for people who live in their inbox and spreadsheet today.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="flex gap-4 p-6 rounded-xl" style={{ background: FMA.panelAlt, border: "1px solid " + FMA.line }}>
                    <div className="shrink-0">
                      <div className="p-3 rounded-lg" style={{ background: "rgba(46,156,116,0.18)", border: "1px solid rgba(46,156,116,0.4)" }}>
                        <Icon className="h-6 w-6" style={{ color: FMA.amber }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>{c.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: FMA.muted }}>{c.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- GUARDRAILS ---------- */}
        <section className="py-20" style={{ background: FMA.panelAlt }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto p-8 rounded-xl" style={{ background: FMA.ink, border: "1px solid rgba(232,163,61,0.3)" }}>
              <h3 className="text-2xl mb-6" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>What Reach will not do</h3>
              <ul className="space-y-4">
                {guardrails.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: FMA.amber }} />
                    <span style={{ color: FMA.muted }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- PERFECT FOR ---------- */}
        <section className="py-20" style={{ background: FMA.ink }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>Perfect for</h2>
              <div className="space-y-4">
                {perfectFor.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: FMA.panelAlt, border: "1px solid " + FMA.line }}>
                      <Icon className="w-6 h-6 shrink-0 mt-0.5" style={{ color: FMA.amber }} />
                      <p style={{ color: FMA.muted }}>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FOR CREATORS ---------- */}
        <section className="py-16" style={{ background: FMA.panelAlt }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl mb-5" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
                If you are on the other side of it
              </h2>
              <p className="text-lg leading-relaxed mb-7" style={{ color: FMA.muted }}>
                Creators, publishers and newsletters hear from UPM through Alchemist Reach: one consistent voice,
                a clear brief and a follow-up that arrives when we say it will. When a budget exists we
                say so, and free coverage is welcome too.
              </p>
              <Link
                to="/creators"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
                style={{ border: "1px solid " + FMA.line, color: FMA.paper }}
              >
                For creators and publishers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="py-20" style={{ background: "linear-gradient(180deg, " + FMA.ink + " 0%, #0d110a 100%)" }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ ...serif, color: FMA.paper, fontWeight: 600 }}>
              Do it yourself, or hand it to us
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: FMA.muted }}>
              Start free and run your own outreach, or tell us what you need covered and we will run it
              on Silver or Gold.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                style={{ background: FMA.amber, color: FMA.amberInk }}
              >
                Start free on Fullmedia Alchemist
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <Link
                to="/contact"
                className="text-lg px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                style={{ border: "1px solid " + FMA.line, color: FMA.paperDim }}
              >
                Talk to UPM
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm mt-5">
              <Link
                to="/blog/alchemist-reach-how-we-stopped-losing-creator-deals-in-our-inbox"
                style={{ color: FMA.muted, textDecoration: "underline" }}
              >
                Read how we built it
              </Link>
            </p>
          </div>
        </section>

        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default AlchemistReach;
