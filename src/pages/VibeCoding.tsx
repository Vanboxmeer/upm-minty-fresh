import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code2, Rocket, Zap, Sparkles, Layers, Clock } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";

const VibeCoding = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Vibe Coding Agency - MVP App Development with Base44 & Lovable | UPM",
      description: "Launch your MVP faster with Vibe Coding Agency. Expert app development using Base44 and Lovable platforms. From idea to launch in weeks, not months.",
      keywords: "vibe coding, app development, MVP development, Base44, Lovable, rapid development, no-code, low-code, startup apps",
      ogTitle: "Vibe Coding Agency - Rapid MVP Development",
      ogDescription: "Turn your app idea into reality with expert development using Base44 and Lovable platforms",
    });
  }, []);

  const benefits = [
    {
      icon: Rocket,
      title: "Launch Faster",
      description: "Get your MVP to market in weeks instead of months using cutting-edge development platforms"
    },
    {
      icon: Zap,
      title: "Cost-Effective",
      description: "Save up to 70% on development costs compared to traditional custom development"
    },
    {
      icon: Layers,
      title: "Scalable Architecture",
      description: "Built on robust platforms that scale seamlessly as your user base grows"
    },
    {
      icon: Sparkles,
      title: "Modern Tech Stack",
      description: "Leverage the latest technologies including React, AI-assisted development, and cloud infrastructure"
    }
  ];

  const platforms = [
    {
      name: "Lovable",
      description: "AI-powered development platform that turns ideas into production-ready apps",
      features: [
        "AI-assisted code generation",
        "Real-time preview and editing",
        "Built-in authentication & database",
        "Automatic deployment",
        "Responsive design out of the box"
      ],
      useCases: ["Web Applications", "SaaS Products", "Internal Tools", "Marketing Websites"]
    },
    {
      name: "Base44",
      description: "Professional low-code platform for complex business applications",
      features: [
        "Enterprise-grade security",
        "Custom business logic",
        "Advanced integrations",
        "Workflow automation",
        "Multi-tenant architecture"
      ],
      useCases: ["Enterprise Apps", "B2B Platforms", "Complex Workflows", "Data Management Systems"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, define features, and create a development roadmap",
      duration: "1-2 days"
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Create user-friendly interfaces and interactive prototypes for your approval",
      duration: "2-3 days"
    },
    {
      step: "03",
      title: "Development",
      description: "Build your MVP using the most suitable platform (Lovable or Base44)",
      duration: "1-3 weeks"
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Quality assurance, bug fixes, and deployment to production",
      duration: "2-3 days"
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
              <span className="text-sm font-medium text-foreground">Vibe Coding Agency</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-foreground">
              <span className="block">Turn Your Idea Into an</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-primary-glow bg-clip-text text-transparent">
                MVP in Weeks
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              Expert app development using <span className="font-semibold text-foreground">Base44</span> and <span className="font-semibold text-foreground">Lovable</span> platforms. 
              Launch faster, spend less, and validate your market fit with a production-ready MVP.
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
                <div className="text-3xl font-bold text-foreground mb-2">2-6 weeks</div>
                <div className="text-sm text-muted-foreground">Average Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
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
              Why Choose Vibe Coding Agency?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with expert development to deliver exceptional results
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
              Our Development Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We leverage the best platforms in the industry to build your MVP
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {platforms.map((platform, index) => (
              <Card key={index} className="border-2 border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                    {platform.name}
                  </CardTitle>
                  <CardDescription className="text-base">{platform.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {platform.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Best For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.useCases.map((useCase, idx) => (
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
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach to get you from idea to launch
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
              Choose the package that fits your needs and budget
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
              Ready to Build Your MVP?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's turn your vision into reality. Get in touch with our team today and start your journey to launch.
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
