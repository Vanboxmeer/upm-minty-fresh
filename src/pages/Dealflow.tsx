import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";
import { usePackageSelection } from "@/contexts/PackageSelectionContext";
import {
  Sparkles, Tag, Clock, Gift, ArrowRight, CheckCircle2, Search, PenLine,
  ShieldCheck, Inbox, Plug, BellRing, Layers, Building2, Briefcase, Users, Handshake
} from "lucide-react";
import dealflowLogo from "@/assets/apps/dealflow-logo.svg";

/* Dealflow brand tokens */
const DF = {
  indigo: "#1E3A8A",
  indigoLight: "#3b5bbf",
  slate: "#0F172A",
  slateLight: "#16203a",
  line: "#27324f",
  amber: "#F59E0B",
  amberInk: "#3d2703",
  paper: "#f4f6fb",
  paperDim: "#dde3f0",
  muted: "#9aa6c2",
  sky: "#38bdf8",
};

const heading = { fontFamily: '"Sora", -apple-system, system-ui, sans-serif' };
const body = { fontFamily: '"Inter", -apple-system, system-ui, sans-serif' };
const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' };

/*
 * PLANS — owner-editable.
 * Prices and limits below are a PROPOSAL and stay hidden on the live page until
 * PRICES_CONFIRMED is flipped to true. While it is false, each card shows the
 * plan name, who it suits and what it covers, with "Pricing shared on request".
 */
const PRICES_CONFIRMED = false;

const PLANS = [
  {
    name: "Solo",
    suits: "One brand or one founder running their own outreach",
    price: "$49/mo",
    limits: "1 brand · 1 seat · 2 campaigns",
    includes: [
      "Both pipelines: coverage and leads & intros",
      "Spreadsheet-fast workbench with filters and inline edits",
      "Your Gmail and web research connected in-app",
      "Drafts, replies and follow-up alerts",
    ],
  },
  {
    name: "Agency",
    suits: "Agencies and in-house teams running several brands",
    price: "$149/mo",
    limits: "Up to 10 brands · 5 seats · unlimited campaigns",
    popular: true,
    includes: [
      "Everything in Solo",
      "A separate board per client brand",
      "Deal pricing now and history, with logged rates",
      "Client self-outreach or agency-sent, set per brand",
    ],
  },
  {
    name: "Studio",
    suits: "Larger agencies and networks with a bench of account managers",
    price: "$399/mo",
    limits: "Unlimited brands · 15 seats · priority onboarding",
    includes: [
      "Everything in Agency",
      "Shared do-not-contact lists across clients",
      "Team-wide rate benchmarks",
      "Onboarding call and workspace set-up",
    ],
  },
];

const twoWays = [
  {
    tag: "Run it yourself",
    tone: "amber",
    title: "Dealflow, your workspace",
    body: "An app you log into with your Claude account. You connect your own Gmail and web research, add your brands, and run outreach, replies, deals and negotiations from one board. Your data and your sending accounts stay yours.",
  },
  {
    tag: "We run it for you",
    tone: "sky",
    title: "UPM managed campaigns",
    body: "Our team works the same board on your behalf: shortlists, outreach, follow-ups and rates. Dealflow is included with Silver and Gold, and you see every placement move.",
    link: { to: "/services", label: "See UPM services" },
  },
];

const loop = [
  {
    icon: Search,
    step: "01",
    title: "Find options",
    body: "Tell Dealflow how many options you want for a brand. It researches creators, outlets and prospects, and keeps each one only when the contact details appear on the source page.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Review the drafts",
    body: "Each option lands as a proposed row in the right campaign with a first draft. Revise by asking the agent or edit by hand, then mark the row ready.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "You confirm, then send",
    body: "Open the message in Gmail or copy it into a DM with one click. Every message waits for your confirmation, and you mark it sent when it goes.",
  },
  {
    icon: Inbox,
    step: "04",
    title: "Track replies",
    body: "A progress scan reads your inbox and sent mail, then suggests which rows to mark as sent, replied or bounced. You accept the suggestions you agree with.",
  },
  {
    icon: Handshake,
    step: "05",
    title: "Close the deal",
    body: "Replies become deals with a price now, a price history and a next action. Outcomes land in Deals made, so the next campaign starts from evidence.",
  },
];

const capabilities = [
  {
    icon: Layers,
    title: "Two pipelines, one board",
    body: "Coverage (creators, press, newsletters) and Leads & Intros (prospects, partners, warm introductions) share the workbench and keep separate stages.",
  },
  {
    icon: Plug,
    title: "Connectors live in the app",
    body: "Connect your own Gmail and web research from the Connections panel. Each user works from their own accounts, so a team keeps its inboxes separate.",
  },
  {
    icon: Gift,
    title: "Free and paid, side by side",
    body: "Free coverage is tracked as a real outcome next to paid placements, so budget goes to the deals that need it.",
  },
  {
    icon: Tag,
    title: "Rates you can check",
    body: "Every quote is logged with its date. When a price comes back high, comparable channels and your own history sit one click away.",
  },
  {
    icon: BellRing,
    title: "Alerts that keep threads warm",
    body: "Contacted within the last week, reply waiting, follow-up due: the inbox view shows what needs you today.",
  },
  {
    icon: Clock,
    title: "Fast by design",
    body: "Edits apply instantly, views filter and sort in place, and a board of several hundred rows stays quick.",
  },
];

const guardrails = [
  "Every message waits for your explicit confirmation before it goes anywhere.",
  "Contacts are kept when the name and the email or contact link appear together in the source.",
  "Do-not-contact names are set per brand and respected by every research run.",
  "Reply suggestions quote the line they come from, so you can check them in one glance.",
  "Prices and rates stay blank until someone has actually quoted them.",
];

const needs = [
  "A Claude account. Dealflow runs inside Claude, and research and drafting use your own Claude allowance.",
  "A Gmail account to connect for sending, inbox scans and reply tracking.",
  "A web research connector for the Find options run.",
];

const perfectFor = [
  { icon: Briefcase, text: "PR and influencer agencies running outreach for several client brands" },
  { icon: Building2, text: "In-house brand and partnerships teams who own their own creator and press relationships" },
  { icon: Users, text: "Founders and small teams chasing coverage, partners and sponsors without a dedicated hire" },
  { icon: Sparkles, text: "Growth marketers who want every negotiation and rate in one searchable place" },
];

const Dealflow = () => {
  const { setSelectedPackage, setUserType } = usePackageSelection();

  useEffect(() => {
    setUserType('brand');
    setSelectedPackage({
      name: "Dealflow",
      price: "Early access",
      description: "Outreach, communications, deals and negotiations in one board",
      features: [
        "Coverage and leads & intros pipelines",
        "Your own Gmail and web research connected in-app",
        "Drafts, reply tracking and follow-up alerts",
        "Deal pricing and rate history",
      ],
      popular: false,
    });

    updateMetaTags({
      title: "Dealflow by UPM | Outreach, Deals & Negotiation Workspace",
      description: "Dealflow is the outreach workspace behind every UPM campaign, now open to agencies and brands: find options, draft, confirm, track replies and close deals from your own accounts.",
      keywords: "Dealflow, UPM Dealflow, outreach software, influencer outreach tool, PR outreach workspace, creator outreach, deal tracker, agency outreach software, rate tracker",
      canonical: "https://unitedpress.media/dealflow",
      ogTitle: "Dealflow by UPM",
      ogDescription: "Run your own outreach, communications, deals and negotiations from one board.",
      ogType: "website",
      twitterCard: "summary_large_image",
      structuredData: [
        generateStructuredData('organization', {}),
        generateStructuredData('website', {}),
      ],
    });
  }, [setSelectedPackage, setUserType]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 pb-16 md:pb-0" style={{ ...body, background: DF.slate }}>

        {/* ---------- HERO ---------- */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0b1220 0%, ' + DF.indigo + '26 45%, ' + DF.slate + ' 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[620px] h-[620px] rounded-full blur-[130px] -translate-y-1/3 translate-x-1/4" style={{ background: 'rgba(59,91,191,0.28)' }} />
            <div className="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" style={{ background: 'rgba(245,158,11,0.14)' }} />
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: 'linear-gradient(#f4f6fb 1px, transparent 1px), linear-gradient(90deg, #f4f6fb 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-7">
                <div className="relative">
                  <div
                    className="absolute -inset-8 rounded-full blur-3xl opacity-60"
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.32), rgba(30,58,138,0.3) 60%, transparent 78%)' }}
                  />
                  <img src={dealflowLogo} alt="Dealflow by UPM" className="relative h-24 w-24 md:h-28 md:w-28" />
                </div>
              </div>

              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase mb-6"
                style={{ ...mono, color: DF.amber, border: '1px solid rgba(245,158,11,0.45)' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Dealflow · a UPM app
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.05]" style={{ ...heading, color: DF.paper, fontWeight: 700 }}>
                Take control of your own{" "}
                <span style={{ color: DF.amber }}>outreach and deals</span>
              </h1>

              <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: DF.paperDim }}>
                The workspace behind every UPM campaign, now open to agencies and brands.
              </p>

              <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: DF.muted }}>
                Find options, draft the message, confirm, send from your own Gmail, track the replies
                and negotiate with every rate on record. One board, your accounts, your call on every send.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  to="/contact"
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                  style={{ background: DF.amber, color: DF.amberInk }}
                >
                  Request early access
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-colors"
                  style={{ border: '1px solid ' + DF.line, color: DF.paperDim }}
                  onClick={() => scrollTo('how')}
                >
                  See how it works
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- TWO WAYS ---------- */}
        <section className="py-16 md:py-20" style={{ background: DF.slate }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                Two ways to use it
              </h2>
              <p className="text-lg" style={{ color: DF.muted }}>
                The same board, whether your team drives or ours does.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {twoWays.map((w) => {
                const c = w.tone === 'amber' ? DF.amber : DF.sky;
                const bg = w.tone === 'amber' ? 'rgba(245,158,11,0.08)' : 'rgba(56,189,248,0.07)';
                const br = w.tone === 'amber' ? 'rgba(245,158,11,0.4)' : 'rgba(56,189,248,0.35)';
                return (
                  <div key={w.title} className="p-7 rounded-xl flex flex-col" style={{ background: bg, border: '1px solid ' + br }}>
                    <span className="text-[11px] tracking-[0.2em] uppercase" style={{ ...mono, color: c }}>{w.tag}</span>
                    <h3 className="text-xl mt-2 mb-3" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>{w.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: DF.muted }}>{w.body}</p>
                    {w.link && (
                      <Link to={w.link.to} className="inline-flex items-center gap-2 mt-5 text-sm font-semibold" style={{ color: c }}>
                        {w.link.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- THE LOOP ---------- */}
        <section id="how" className="py-20" style={{ background: DF.slateLight }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                From first search to signed deal
              </h2>
              <p className="text-lg" style={{ color: DF.muted }}>
                Five steps, each one visible on the board.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {loop.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.step}
                    className={"p-7 rounded-xl" + (i === loop.length - 1 ? " md:col-span-2" : "")}
                    style={{ background: DF.slate, border: '1px solid ' + DF.line }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 p-3 rounded-lg" style={{ background: 'rgba(30,58,138,0.35)', border: '1px solid rgba(59,91,191,0.45)' }}>
                        <Icon className="h-6 w-6" style={{ color: DF.amber }} />
                      </div>
                      <div>
                        <span className="text-xs tracking-[0.2em]" style={{ ...mono, color: DF.amber }}>{s.step}</span>
                        <h3 className="text-xl mt-1 mb-2" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>{s.title}</h3>
                        <p className="leading-relaxed" style={{ color: DF.muted }}>{s.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- WHAT'S INSIDE ---------- */}
        <section className="py-20" style={{ background: DF.slate }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                What is inside
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: DF.muted }}>
                Built for people who live in their inbox and spreadsheet today.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="flex gap-4 p-6 rounded-xl" style={{ background: DF.slateLight, border: '1px solid ' + DF.line }}>
                    <div className="shrink-0">
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(30,58,138,0.35)', border: '1px solid rgba(59,91,191,0.45)' }}>
                        <Icon className="h-6 w-6" style={{ color: DF.amber }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>{c.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: DF.muted }}>{c.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- GUARDRAILS + WHAT YOU NEED ---------- */}
        <section className="py-20" style={{ background: DF.slateLight }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-xl" style={{ background: DF.slate, border: '1px solid rgba(245,158,11,0.3)' }}>
                <h3 className="text-2xl mb-6" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>Your call on every send</h3>
                <ul className="space-y-4">
                  {guardrails.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: DF.amber }} />
                      <span style={{ color: DF.muted }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-xl" style={{ background: DF.slate, border: '1px solid ' + DF.line }}>
                <h3 className="text-2xl mb-6" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>What you bring</h3>
                <ul className="space-y-4">
                  {needs.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: DF.sky }} />
                      <span style={{ color: DF.muted }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- PLANS ---------- */}
        <section id="plans" className="py-20" style={{ background: DF.slate }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                Plans for every size of team
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: DF.muted }}>
                {PRICES_CONFIRMED
                  ? "Billed monthly. Your Claude and Gmail usage sits on your own accounts."
                  : "Early access is opening in small groups. Tell us about your team and we will share pricing and a start date."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  className="p-7 rounded-xl relative flex flex-col"
                  style={{
                    background: p.popular ? 'rgba(245,158,11,0.07)' : DF.slateLight,
                    border: '1px solid ' + (p.popular ? DF.amber : DF.line),
                  }}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] tracking-wider uppercase" style={{ ...mono, background: DF.amber, color: DF.amberInk }}>
                      Built for agencies
                    </span>
                  )}
                  <h3 className="text-xl mb-1" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>{p.name}</h3>
                  <p className="text-sm mb-4" style={{ color: DF.muted }}>{p.suits}</p>
                  <p className="text-3xl mb-1" style={{ ...heading, color: DF.amber, fontWeight: 600 }}>
                    {PRICES_CONFIRMED ? p.price : "Early access"}
                  </p>
                  <p className="text-xs mb-5" style={{ ...mono, color: DF.paperDim }}>
                    {PRICES_CONFIRMED ? p.limits : "Pricing shared on request"}
                  </p>
                  <ul className="space-y-3 pt-4 flex-1" style={{ borderTop: '1px solid ' + DF.line }}>
                    {p.includes.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: DF.amber }} />
                        <span style={{ color: DF.muted }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto p-5 rounded-xl text-center" style={{ background: DF.slateLight, border: '1px solid ' + DF.line }}>
              <p className="text-sm leading-relaxed" style={{ color: DF.paperDim }}>
                <strong style={{ color: DF.paper }}>Already a UPM client?</strong> Dealflow runs behind every Silver
                and Gold campaign at no extra cost, and the managed service needs no set-up on your side.
              </p>
            </div>

            <div className="text-center mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-transform hover:-translate-y-0.5"
                style={{ background: DF.amber, color: DF.amberInk }}
              >
                Request early access
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- PERFECT FOR ---------- */}
        <section className="py-20" style={{ background: DF.slateLight }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>Perfect for</h2>
              <div className="space-y-4">
                {perfectFor.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: DF.slate, border: '1px solid ' + DF.line }}>
                      <Icon className="w-6 h-6 shrink-0 mt-0.5" style={{ color: DF.amber }} />
                      <p style={{ color: DF.muted }}>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FOR CREATORS ---------- */}
        <section className="py-16" style={{ background: DF.slate }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl mb-5" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                If you are on the other side of it
              </h2>
              <p className="text-lg leading-relaxed mb-7" style={{ color: DF.muted }}>
                Creators, publishers and newsletters hear from UPM through Dealflow: one consistent voice,
                a clear brief and a follow-up that arrives when we say it will. When a budget exists we
                say so, and free coverage is welcome too.
              </p>
              <Link
                to="/creators"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
                style={{ border: '1px solid ' + DF.line, color: DF.paper }}
              >
                For creators and publishers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="py-20" style={{ background: 'linear-gradient(180deg, ' + DF.slate + ' 0%, #0b1220 100%)' }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
              Ready to run outreach from one board?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: DF.muted }}>
              Tell us what your team runs today and we will set up your workspace.
            </p>
            <Link
              to="/contact"
              className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              style={{ background: DF.amber, color: DF.amberInk }}
            >
              Request early access
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-sm mt-5">
              <Link
                to="/blog/dealflow-by-upm-how-we-stopped-losing-creator-deals-in-our-inbox"
                style={{ color: DF.muted, textDecoration: 'underline' }}
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

export default Dealflow;
