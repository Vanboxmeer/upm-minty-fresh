import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Megaphone, Users, CheckCircle, Clock, Headphones } from "lucide-react";

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo Section */}
            <div className="text-center mb-12">
              <img 
                src="/lovable-uploads/dc543201-6235-4993-abf2-0a832b4c4248.png" 
                alt="UPM Logo" 
                className="retro-logo-hover h-24 w-auto mx-auto mb-6" 
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About United Press Media
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your trusted partner in digital marketing excellence
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
                <p className="text-lg leading-relaxed mb-6">
                  United Press Media (UPM) is a leading digital marketing service provider specializing in 
                  press release distribution, tier-1 media placements, and sponsored content creator collaborations. 
                  We help businesses amplify their message and reach their target audiences through strategic 
                  media partnerships and influential content creators.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">What We Do</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <FileText className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Press Release Distribution</h3>
                    </div>
                    <p>
                      Professional press release writing and distribution to major news outlets, 
                      ensuring your story reaches the right audience at the right time.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <Megaphone className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Tier-1 Media Placements</h3>
                    </div>
                    <p>
                      Strategic placement in top-tier publications and media outlets to maximize 
                      your brand's visibility and credibility.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <Users className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">KOL Collaborations</h3>
                    </div>
                    <p>
                      Connect with key opinion leaders and content creators to amplify your 
                      message through authentic, engaging sponsored content.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Our Approach</h2>
                <p className="text-lg leading-relaxed mb-6">
                  We believe in data-driven strategies that deliver measurable results. Our team of 
                  experienced marketing professionals works closely with each client to understand 
                  their unique goals and develop customized campaigns that drive engagement, 
                  build brand awareness, and generate leads.
                </p>
                
                <div className="bg-muted p-8 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Why Choose UPM?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Extensive network of media contacts and content creators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Transparent pricing with no hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <Headphones className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Responsive customer support and regular campaign updates</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">Fast turnaround times and reliable delivery</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-6">Get Started Today</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Ready to amplify your brand's reach? Contact our team to discuss your marketing 
                  goals and learn how UPM can help you achieve them.
                </p>
                <div className="text-center">
                  <Button 
                    onClick={() => window.location.href = '/#package-selector'}
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold"
                  >
                    Start a Campaign
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
        <Footer />
      </div>
    </>
  );
};

export default About;