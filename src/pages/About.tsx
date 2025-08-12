import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              About United Press Media
            </h1>
            
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
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Press Release Distribution</h3>
                    <p>
                      Professional press release writing and distribution to major news outlets, 
                      ensuring your story reaches the right audience at the right time.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Tier-1 Media Placements</h3>
                    <p>
                      Strategic placement in top-tier publications and media outlets to maximize 
                      your brand's visibility and credibility.
                    </p>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">KOL Collaborations</h3>
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
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Extensive network of media contacts and content creators
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Transparent pricing with no hidden fees
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      24/7 customer support and regular campaign updates
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
                  <a 
                    href="/#contact-form" 
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Contact Us
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;