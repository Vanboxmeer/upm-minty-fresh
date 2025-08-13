import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How long does it take to see results from a press release campaign?",
      answer: "Results can vary depending on your budget size, selected media coverages, campaign goals, market timing, and target audience. We'll work with you to track progress and provide updates throughout the campaign."
    },
    {
      question: "What's included in your KOL collaboration packages?",
      answer: "Our KOL packages typically cover influencer collaborations, content creation coordination, and campaign management from idea to completion. Let's discuss the specifics of your campaign to tailor our approach."
    },
    {
      question: "Can I see examples of previous work?",
      answer: "We have example case studies that you can view which demonstrate our services on our website."
    },
    {
      question: "Do you offer refunds?",
      answer: "If there has been no work on your campaign you can request a refund within the first 48 hours."
    },
    {
      question: "How do you select media outlets for press release distribution?",
      answer: "We consider several factors when selecting media outlets, including relevance to your audience and campaign goals. Our goal is to find the best fit for your campaign. You will receive a media deck of options where you can shortlist any media outlets and content creators that you would like to be featured on or work with."
    },
    {
      question: "How do you measure campaign success?",
      answer: "We work with you to set and reach your KPIs. We set goals and we work to achieve them."
    },
    {
      question: "What industries do you work with?",
      answer: "We work with businesses across various industries. Primarily AI, Gaming, and Web3 industries. Let's talk about your specific needs, and we'll see how we can help."
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