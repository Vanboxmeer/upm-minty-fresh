import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How long does it take to see results from a press release campaign?",
      answer: "Typically, you'll start seeing initial results within 24-48 hours of publication. Full campaign results and analytics are usually available within 7-14 days."
    },
    {
      question: "What's included in your KOL collaboration packages?",
      answer: "Our KOL packages include influencer identification, outreach, content creation coordination, campaign management, and performance reporting. We handle the entire process from start to finish."
    },
    {
      question: "Can I see examples of previous work?",
      answer: "Yes! Check out our Case Studies page to see detailed examples of successful campaigns we've executed for our clients across various industries."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "We stand behind our work. If you're not satisfied with the deliverables outlined in your package, we'll work with you to make it right or provide appropriate compensation based on our terms of service."
    },
    {
      question: "How do you select media outlets for press release distribution?",
      answer: "We use a combination of factors including your target audience, industry relevance, outlet authority, and geographic reach to select the most appropriate media outlets for your campaign."
    },
    {
      question: "Can I customize my package?",
      answer: "Absolutely! While we offer standard packages, we can customize any package to better fit your specific needs and budget. Contact us to discuss your requirements."
    },
    {
      question: "How do you measure campaign success?",
      answer: "We provide comprehensive analytics including reach, impressions, engagement rates, website traffic, backlinks generated, and social media mentions. You'll receive detailed reports throughout and after your campaign."
    },
    {
      question: "What industries do you work with?",
      answer: "We work with businesses across all industries, including technology, finance, healthcare, e-commerce, crypto, gaming, and more. Our team has experience crafting campaigns for diverse sectors."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Help Center
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Find answers to common questions about our services
            </p>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-3">📞 Contact Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Need immediate assistance? Our support team is here to help.
                  </p>
                  <a 
                    href="https://t.me/unitedpressmedia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Contact us on Telegram →
                  </a>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-3">📧 Email Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Send us a detailed message and we'll get back to you within 24 hours.
                  </p>
                  <a 
                    href="/#contact-form" 
                    className="text-primary hover:underline"
                  >
                    Use our contact form →
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-12 bg-muted p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our team is ready to help you with any questions about our services.
              </p>
              <a 
                href="/#contact-form" 
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;