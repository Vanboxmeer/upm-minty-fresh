import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Newspaper, Target, Sparkles, Megaphone, Inbox } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";

const scrollToForm = () => {
  const el = document.querySelector('footer');
  if (el) {
    const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
};

const whatYouGet = [
  {
    icon: Newspaper,
    title: "First look at news in your niche",
    body: "Tell us the industries you actually cover and we will bring you client announcements, launches and milestones as they happen — before they are everywhere else.",
  },
  {
    icon: Megaphone,
    title: "Earned coverage when it stands on its own",
    body: "If a story is genuinely useful to your audience, no money needs to change hands. We will say so plainly, hand you the facts and assets, and leave the editorial call entirely to you.",
  },
  {
    icon: Target,
    title: "Paid campaigns when there is a budget",
    body: "When a client is running a paid push, we come to you with the brief and the budget. Your rates, your formats, your call — we negotiate on the brand's side, never against yours.",
  },
  {
    icon: Users,
    title: "Collaborations beyond a single post",
    body: "Co-hosted Spaces and AMAs, community quests, directory listings and introductions to other creators working the same beat.",
  },
  {
    icon: Inbox,
    title: "One contact, not six",
    body: "Everything reaches you through Dealflow, the outreach system we built for ourselves. One consistent voice instead of a different account manager every month, a real brief instead of a copy-pasted DM, and a follow-up that arrives when we said it would.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Tell us what you cover",
    body: "Your channels, your beat, your audience. If you publish a newsletter, a site, a podcast or a feed, all of it counts.",
  },
  {
    step: "02",
    title: "Share rates only if you have them",
    body: "If you sell promotions on your site, socials or newsletter, send us the numbers so we can match you to the right budgets. If you do not, that is fine — plenty of what we send is not a paid placement at all.",
  },
  {
    step: "03",
    title: "Hear from us when it is relevant",
    body: "We reach out when there is a story or a campaign that genuinely fits what you cover. No obligation to take any of it, and nothing exclusive on your side.",
  },
];

const CreatorsPage = () => {
  useEffect(() => {
    updateMetaTags({
      title: "For Creators, Publishers & Newsletters | UPM",
      description: "Hear first about news in the industries you cover. Earned coverage when a story stands on its own, paid campaigns when there is a budget. No listing fees, no exclusivity.",
      keywords: "creators, publishers, newsletters, earned media, editorial coverage, press coverage, paid promotions, creator rates, media network"
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Elegant gradient foundation */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
          
          {/* Multi-layered mesh gradient */}
          <div className="absolute inset-0 bg-gradient-to-tl from-fuchsia-100/50 via-pink-100/40 to-purple-100/50 dark:from-primary/30 dark:to-accent/20"></div>
          
          {/* Radial accent gradients */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-pink-200/60 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-200/60 to-transparent blur-3xl"></div>
          
          {/* Sophisticated animated orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-32 right-16 w-80 h-80 bg-gradient-to-br from-fuchsia-300/35 to-pink-300/35 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '9s' }}></div>
            <div className="absolute top-1/3 left-16 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '11s' }}></div>
            <div className="absolute bottom-32 right-1/3 w-72 h-72 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '10s' }}></div>
          </div>
          
          {/* Fine grain texture */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.025]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}></div>
          
          {/* Soft glass effect */}
          <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
          
          {/* Enhanced readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/45 dark:from-slate-900/50 dark:via-transparent dark:to-slate-900/30"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-foreground">
              <span className="block">For Creators,</span>
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Publishers &amp; Newsletters
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in">
              Hear first about news in the industries you already cover. Sometimes that comes with a
              budget attached. Often it does not — and it is still worth publishing.
            </p>

            <p className="text-base text-muted-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in">
              No listing fees. No exclusivity. Nothing to buy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button variant="hero" size="lg" className="px-8 py-6 text-lg group" onClick={scrollToForm}>
                <span className="group-hover:scale-110 transition-transform duration-200">Tell us what you cover</span>
              </Button>

              <Button variant="outline" size="lg" className="px-8 py-6 text-lg group" asChild>
                <a href="/affiliate-signup">
                  <span className="group-hover:scale-110 transition-transform duration-200">Join Referral Program</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Earned media */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">How we think about coverage</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not every story needs a <span className="text-primary">price tag</span>
            </h2>

            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed text-left sm:text-center">
              <p>
                Somewhere along the way the industry decided every mention had to be bought. We do not
                work that way. When a client has a real launch, a funding round, a partnership or a
                product that your audience would actually want to know about, we will bring it to you as
                a story — not as an invoice.
              </p>
              <p>
                That is the whole point of an audience subscribing to you in the first place. They came
                for news they can use, from someone whose judgement they trust. Coverage that is earned
                reads differently, ages better, and does more for the brand than a sponsored slot ever
                will.
              </p>
              <p className="text-foreground font-medium">
                So we encourage earned media wherever it makes sense, and we are upfront about which
                is which. When there is money involved, we say so. When there is not, we say that too.
              </p>
              <p className="text-base">
                Everything we send you is tracked in{" "}
                <a href="/dealflow" className="text-primary underline underline-offset-4">Dealflow</a>, our
                own outreach system &mdash; which is how free coverage gets counted as a real outcome on our
                side instead of being treated as a failed sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What you <span className="text-primary">get</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with brands across AI, gaming, Web3, DeFi and consumer tech. What reaches you
              depends entirely on what you tell us you cover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whatYouGet.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="group border-border card-hover bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:to-primary/5">
                  <CardHeader className="pb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg border-2 border-primary/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How it <span className="text-primary">works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three steps, and only the first one needs anything from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item) => (
              <Card key={item.step} className="border-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm p-8">
                <span className="text-sm font-mono tracking-[0.2em] text-primary">{item.step}</span>
                <h3 className="text-xl font-bold mt-2 mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get on the <span className="text-primary">list</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Let us know you are interested in hearing about news in your industry — and share your
                rates if promotions on your site, socials or newsletter are something you offer. Both
                are useful. Neither is required.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="cta" size="lg" className="px-8 py-6 text-lg" onClick={scrollToForm}>
                  Tell us what you cover
                </Button>

                <Button variant="light" size="lg" className="px-8 py-6 text-lg" asChild>
                  <a href="/contact">Ask us a question</a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No listing fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No exclusivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Rates optional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>You keep editorial control</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
};

export default CreatorsPage;
