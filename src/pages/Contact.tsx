import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Contact = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Contact Us
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Ready to amplify your brand's reach? Get in touch with our team.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="mr-2">📧</span>
                      Email Us
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Send us a detailed message about your marketing needs.
                    </p>
                    <a href="mailto:unitedpress.media@gmail.com" className="text-primary hover:underline font-medium">
                      unitedpress.media@gmail.com
                    </a>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="mr-2">💬</span>
                      Telegram
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Quick questions? Chat with us directly on Telegram.
                    </p>
                    <a href="https://t.me/upressagency" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@unitedpressmedia</a>
                  </div>
                  
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="mr-2">⏰</span>
                      Response Time
                    </h3>
                    <p className="text-muted-foreground">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">What to Include in Your Message</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Your company name and industry
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Current marketing goals and challenges
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Preferred timeline for your project
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Budget range (helps us recommend the best package)
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Quick Contact Form</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                {/* Redirect to home page contact form */}
                <div className="bg-muted p-8 rounded-lg text-center">
                  <p className="mb-4">Use our package and subscription selector to let us know what you're looking for.</p>
                  <a href="/#contact-form" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Go to Contact Form
                  </a>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Services We Offer</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Press Release Distribution
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Tier-1 Media Placements
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      KOL Collaborations
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Sponsored Content Creation
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Features & Interviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 bg-primary/10 p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join hundreds of satisfied clients who have amplified their brand reach with UPM.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/services" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  View Our Services
                </a>
                <a href="/case-studies" className="inline-block border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                  See Case Studies
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Contact;