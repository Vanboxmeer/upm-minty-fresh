import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { updateMetaTags } from "@/utils/seoUtils";
import {
  Sparkles, Tag, Clock, Gift, ArrowRight, CheckCircle2,
  ClipboardList, Users, Building2
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
};

const heading = { fontFamily: '"Sora", -apple-system, system-ui, sans-serif' };
const body = { fontFamily: '"Inter", -apple-system, system-ui, sans-serif' };
const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' };

const capabilities = [
  {
    icon: Sparkles,
    title: "AI-researched shortlists",
    body: "No generic influencer database. Creators and outlets are researched against the brand, the niche and the actual audience, then shortlisted and sanity-checked before a single message goes out.",
  },
  {
    icon: Gift,
    title: "Free and paid, side by side",
    body: "Every shortlist is worked for organic coverage as well as paid. “Said yes for free” is tracked as a real outcome, so budget goes only to the placements that genuinely need paying for.",
  },
  {
    icon: Tag,
    title: "Rates we can actually check",
    body: "Every quote we have ever been given is logged. When a rate comes back high we know it, because we can see what comparable channels charged — so negotiation runs on evidence rather than vibes.",
  },
  {
    icon: Clock,
    title: "Nothing goes cold",
    body: "A next action and a follow-up date sit on every thread. The creator who said “not now” in March gets picked back up in June instead of quietly disappearing from an inbox.",
  },
];

const Dealflow = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Dealflow by UPM | Creator & Press Outreach System",
      description: "Dealflow is the in-house outreach system behind every UPM campaign — AI-researched shortlists, free and paid coverage tracked side by side, logged rates and follow-ups that never go cold.",
      keywords: "Dealflow, UPM Dealflow, creator outreach, press outreach, influencer outreach tool, media outreach system, earned media, creator rates, campaign tracker",
      ogTitle: "Dealflow by UPM",
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen pb-16 md:pb-0" style={{ ...body, background: DF.slate }}>

        {/* HERO */}
        <section
          className="relative pt-24 pb-20 overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0b1220 0%, ' + DF.indigo + '26 45%, ' + DF.slate + ' 100%)' }}
        >
          <div className="container mx-auto px-4">
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
                className="inline-block px-3.5 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase mb-6"
                style={{ ...mono, color: DF.amber, border: '1px solid rgba(245,158,11,0.45)' }}
              >
                Our outreach system
              </span>

              <h1 className="text-4xl md:text-6xl mb-6 leading-[1.05]" style={{ ...heading, color: DF.paper, fontWeight: 700 }}>
                Dealflow
              </h1>

              <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: DF.paperDim }}>
                The outreach system behind every UPM campaign.
              </p>

              <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: DF.muted }}>
                Good coverage dies in shared inboxes. Someone forgets to follow up, nobody remembers
                what a channel quoted last time, and the creator who said &ldquo;not now&rdquo; is never
                asked again. So we built our own system to run outreach properly &mdash; and every
                campaign we take on runs through it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  to="/contact"
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                  style={{ background: DF.amber, color: DF.amberInk }}
                >
                  Start a campaign
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/blog/dealflow-by-upm-how-we-stopped-losing-creator-deals-in-our-inbox"
                  className="text-lg px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                  style={{ border: '1px solid ' + DF.line, color: DF.paperDim }}
                >
                  Read the write-up
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="py-20" style={{ background: DF.slate }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                What it does
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: DF.muted }}>
                Four things a shared inbox and a spreadsheet were never going to do.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="flex gap-4 p-6 rounded-xl transition-colors"
                    style={{ background: DF.slateLight, border: '1px solid ' + DF.line }}
                  >
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

        {/* WHERE IT FITS */}
        <section className="py-20" style={{ background: DF.slateLight }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                  What it means for your campaign
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: DF.muted }}>
                  Included with Silver and Gold, working from the day your campaign starts.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl" style={{ background: DF.slate, border: '1px solid ' + DF.line }}>
                  <div className="p-3 rounded-lg inline-flex mb-4" style={{ background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.35)' }}>
                    <CheckCircle2 className="h-6 w-6" style={{ color: DF.amber }} />
                  </div>
                  <h3 className="text-lg mb-2" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>Included in your plan</h3>
                  <p className="text-sm leading-relaxed" style={{ color: DF.muted }}>
                    Silver and Gold campaigns are run on Dealflow from day one, at no extra cost. It is
                    simply how we work.
                  </p>
                </div>

                <div className="p-6 rounded-xl" style={{ background: DF.slate, border: '1px solid ' + DF.line }}>
                  <div className="p-3 rounded-lg inline-flex mb-4" style={{ background: 'rgba(30,58,138,0.35)', border: '1px solid rgba(59,91,191,0.45)' }}>
                    <ClipboardList className="h-6 w-6" style={{ color: DF.paperDim }} />
                  </div>
                  <h3 className="text-lg mb-2" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>You see the whole board</h3>
                  <p className="text-sm leading-relaxed" style={{ color: DF.muted }}>
                    It feeds your Campaign Organizer, so you approve what runs and watch every placement
                    move without chasing anyone for a status update.
                  </p>
                </div>

                <div className="p-6 rounded-xl" style={{ background: DF.slate, border: '1px solid rgba(46,156,116,0.35)' }}>
                  <div className="p-3 rounded-lg inline-flex mb-4" style={{ background: 'rgba(46,156,116,0.14)', border: '1px solid rgba(46,156,116,0.4)' }}>
                    <Users className="h-6 w-6" style={{ color: '#38bdf8' }} />
                  </div>
                  <h3 className="text-lg mb-2" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>Budget where it counts</h3>
                  <p className="text-sm leading-relaxed" style={{ color: DF.muted }}>
                    Free coverage is chased as hard as paid, and every rate is checked against what similar
                    channels quoted us before &mdash; so you spend on the placements worth paying for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOR CREATORS */}
        <section className="py-20" style={{ background: DF.slate }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl mb-6" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                If you are on the other side of it
              </h2>
              <p className="text-lg leading-relaxed mb-5" style={{ color: DF.muted }}>
                Creators, publishers and newsletters hear from us through Dealflow. That cuts both ways:
                one consistent voice instead of six people from the same agency, a real brief rather than
                a copy-pasted DM, and a follow-up that actually arrives when we say it will.
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: DF.muted }}>
                It also tracks free coverage as a genuine outcome, which means we can bring you stories
                worth publishing without pretending a budget exists. When there is money involved we say
                so. When there is not, we say that too.
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

        {/* LICENSING */}
        <section className="py-20" style={{ background: DF.slateLight }}>
          <div className="container mx-auto px-4">
            <div
              className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl text-center"
              style={{ background: DF.slate, border: '1px solid rgba(245,158,11,0.3)' }}
            >
              <div className="p-3 rounded-lg inline-flex mb-5" style={{ background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.35)' }}>
                <Building2 className="h-6 w-6" style={{ color: DF.amber }} />
              </div>
              <h2 className="text-2xl md:text-3xl mb-4" style={{ ...heading, color: DF.paper, fontWeight: 600 }}>
                Want to run it in your own agency?
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: DF.muted }}>
                Right now Dealflow is used in house, on UPM campaigns only. We are exploring licensing it
                to other agencies and in-house brand teams who want the same outreach discipline without
                rebuilding it themselves. If that sounds useful, tell us what your team runs today and we
                will keep you in the loop.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
                style={{ background: DF.amber, color: DF.amberInk }}
              >
                Talk to us about licensing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
};

export default Dealflow;
