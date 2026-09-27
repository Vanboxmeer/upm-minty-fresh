import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code2, Rocket, Zap, Sparkles, Layers, Clock, Terminal, GitBranch, Workflow } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";

const VibeCoding = () => {
  useEffect(() => {
    updateMetaTags({
      title: "App Development & AI Automations | Agentic Builds | UPM",
      description: "We build apps, automations, skills and internal tools with agentic AI development — connecting Google Sheets, Supabase, Vercel, Stripe and the rest of your stack. Faster and cheaper than traditional custom development.",
      keywords: "app development, AI automation, agentic development, business process automation, Google Sheets automation, Supabase, Vercel, AI integrations, Claude Skills, MCP connectors, internal tools, custom software, vibe coding, MVP development",
      ogTitle: "App Development & AI Automations Built With Agentic Development",
      ogDescription: "Apps, automations, skills and internal tools — built fast, connected to the tools you already use, and owned entirely by you.",
    });
  }, []);

  const benefits = [
    {
      icon: Rocket,
      title: "Built in Days, Not Quarters",
      description: "Agentic development means the build loop runs continuously — plan, write, test, fix — instead of waiting on sprint cycles. Most internal tools and automations land in days; full products in weeks."
    },
    {
      icon: Workflow,
      title: "Your Tools, Actually Connected",
      description: "The value is usually in the joins: a Google Sheet your team already lives in, talking to Supabase, triggered from Vercel, notifying Slack or email. We build the plumbing between what you already use."
    },
    {
      icon: Zap,
      title: "Cheaper Than the Alternative",
      description: "Save up to 70% against traditional custom development. You are not paying a team to type — you are paying for the judgement about what gets built and the review that keeps it correct."
    },
    {
      icon: GitBranch,
      title: "You Own Everything",
      description: "The repo sits in your GitHub, the data in your Supabase, the site on your Vercel, the automation in your workspace. No platform, and no agency, can hold your process hostage."
    }
  ];

  const stack = ["Claude Code", "Claude Cowork", "Claude Skills", "MCP connectors", "Supabase", "Vercel", "GitHub", "Google Sheets", "Google Apps Script", "Stripe", "Resend", "React + Vite", "Next.js", "Lovable", "Base44"];

  const tracks = [
    {
      name: "Apps & Client-Facing Products",
      tag: "Ship the whole thing",
      icon: Rocket,
      recommended: true,
      description: "A real product on infrastructure you own — database, auth, payments, hosting — built by agentic development with a person reviewing every change.",
      features: [
        "Supabase for database, auth, storage and edge functions",
        "Vercel hosting with a preview URL on every push",
        "Stripe for payments, Resend for transactional email",
        "Your GitHub repo, your accounts, full commit history",
        "Already on Lovable or Base44? We can move it without losing history"
      ],
      useCases: ["SaaS products", "Marketplaces", "Client dashboards", "Directories"]
    },
    {
      name: "Automations & Integrations",
      tag: "Make the process stop hurting",
      icon: Workflow,
      recommended: false,
      description: "The job nobody has time for: the report rebuilt by hand every Monday, the data retyped between two systems, the follow-up that depends on someone remembering.",
      features: [
        "Google Sheets wired to a real database instead of being one",
        "Scheduled jobs that run whether or not anyone is at a desk",
        "Two systems that never spoke to each other, kept in sync",
        "AI in the loop where judgement is needed — drafting, classifying, summarising",
        "Alerts when something needs a human, silence when it does not"
      ],
      useCases: ["Ops reporting", "Data sync", "Client onboarding", "Content pipelines"]
    },
    {
      name: "Skills, Agents & Internal Tools",
      tag: "Give your team leverage",
      icon: Terminal,
      recommended: false,
      description: "Packaged capability your team can run themselves — a skill, an agent, a small internal tool — so the thing you currently ask a specialist for becomes a button.",
      features: [
        "Claude Skills that encode how your team actually does a job",
        "MCP connectors so an assistant can reach your own systems",
        "Small internal tools for the workflow no SaaS product fits",
        "Agents that run a recurring job end to end and report back",
        "Documented and handed over, so it is not a black box"
      ],
      useCases: ["Repeatable expert work", "Internal dashboards", "Research & triage", "Custom assistants"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Find the Real Bottleneck",
      description: "We look at how the work happens now, and say plainly whether the answer is an app, an automation, a tool, or nothing at all",
      duration: "1-2 days"
    },
    {
      step: "02",
      title: "Scope & Shape",
      description: "Which systems it touches, what it must never do, and what done looks like — written down before anything is built",
      duration: "1-3 days"
    },
    {
      step: "03",
      title: "Build & Review",
      description: "The agentic build loop runs while a person reviews every change, and you follow along on a live preview from the first day",
      duration: "Days to 3 weeks"
    },
    {
      step: "04",
      title: "Hand Over Properly",
      description: "Deployed on your own accounts, with repo access and a walkthrough so your team can change it without calling us",
      duration: "1-3 days"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter MVP",
      price: "$5,000",
      description: "Perfect for validating your idea quickly",
      features: [
        "Up to 5 core features",
        "Responsive web application",
        "Basic authentication",
        "Database setup",
        "2 rounds of revisions",
        "1 month post-launch support"
      ],
      timeline: "2-3 weeks",
      popular: false
    },
    {
      name: "Professional MVP",
      price: "$15,000",
      description: "For startups ready to make an impact",
      features: [
        "Up to 15 features",
        "Advanced user management",
        "Payment integration",
        "API integrations",
        "Custom workflows",
        "Admin dashboard",
        "4 rounds of revisions",
        "3 months post-launch support"
      ],
      timeline: "4-6 weeks",
      popular: true
    },
    {
      name: "Enterprise MVP",
      price: "$35,000+",
      description: "Complex applications with advanced requirements",
      features: [
        "Unlimited features",
        "Multi-tenant architecture",
        "Advanced integrations",
        "Custom business logic",
        "Data analytics dashboard",
        "Mobile responsive",
        "Unlimited revisions",
        "6 months post-launch support",
        "Dedicated project manager"
      ],
      timeline: "8-12 weeks",
      popular: false
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/40 dark:to-slate-800"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/50 via-pink-100/30 to-violet-100/50 dark:from-primary/20 dark:via-transparent dark:to-secondary/20"></div>
          
          {/* Radial gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-purple-300/40 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-pink-300/40 to-transparent blur-3xl"></div>
          
          {/* Animated orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
            <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-br from-fuchsia-400/25 to-pink-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-violet-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '9s' }}></div>
          </div>
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}></div>
          
          {/* Glass morphism effect */}
          <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/40 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/30"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">App Development &amp; AI Automations</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-foreground">
              <span className="block">Apps, Tools and Automations,</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-primary-glow bg-clip-text text-transparent">
                Built in a Fraction of the Time
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              We use <span className="font-semibold text-foreground">agentic development</span> and AI integrations to build software and
              wire your tools together — <span className="font-semibold text-foreground">Google Sheets</span>, <span className="font-semibold text-foreground">Supabase</span>,
              <span className="font-semibold text-foreground"> Vercel</span> and whatever else the job needs. Automations that fix a broken process,
              and new products built from scratch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                variant="hero" 
                size="lg" 
                className="px-8 py-6 text-lg group"
                onClick={() => {
                  const contactForm = document.getElementById('contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <span className="group-hover:scale-110 transition-transform duration-200">Start Your Project</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => {
                  const processSection = document.getElementById('process');
                  if (processSection) {
                    processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                See How It Works
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">Days to weeks</div>
                <div className="text-sm text-muted-foreground">Scope to live, not months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Of the code is yours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vibe Coding */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why This Costs Less and Lands Sooner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The AI does the building. People decide what gets built. You keep all of it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Build
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Same team, same tooling. Most engagements are one of these three, and plenty are a mix.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tracks.map((track, index) => (
              <Card
                key={index}
                className={"relative flex flex-col border-2 transition-all duration-300 " + (track.recommended ? "border-primary/60 shadow-lg shadow-primary/5" : "border-border hover:border-primary/50")}
              >
                {track.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      Recommended
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{track.tag}</div>
                  <CardTitle className="text-xl flex items-start gap-3">
                    <track.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span>{track.name}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{track.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <div>
                    <h4 className="font-semibold mb-3">What you get:</h4>
                    <ul className="space-y-2">
                      {track.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <h4 className="font-semibold mb-3">Best for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {track.useCases.map((useCase, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stack strip */}
          <div className="max-w-4xl mx-auto mt-14 text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              The stack we hand over
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {stack.map((item, idx) => (
                <span key={idx} className="px-4 py-1.5 rounded-full border border-border bg-background text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How a Build Actually Runs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Short, visible, and pointed at the thing that is actually slowing you down
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {process.map((phase, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl font-bold text-primary/30">{phase.step}</div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{phase.title}</CardTitle>
                          <CardDescription className="text-base">{phase.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {phase.duration}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build packages for full products. Every tier ships the repo into your GitHub, with the app running on your
              own Supabase and Vercel. Smaller automations, skills and internal tools are scoped on their own — ask and
              we will price the specific job.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary my-4">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock className="h-4 w-4" />
                    <span>{tier.timeline}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={tier.popular ? "default" : "outline"} 
                    className="w-full mt-6"
                    onClick={() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Would You Build If It Were Cheap?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Most teams have a list of things not worth building at agency prices. That list is worth revisiting. Tell us what is on yours.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="px-8 py-6 text-lg group"
              onClick={() => {
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <span className="group-hover:scale-110 transition-transform duration-200">Start Your Project Now</span>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default VibeCoding;
