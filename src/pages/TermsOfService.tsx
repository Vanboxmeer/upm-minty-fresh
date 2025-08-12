import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Terms of Service
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Last updated: January 12, 2025
            </p>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p>
                  By accessing and using United Press Media's website and services, you agree to be bound 
                  by these Terms of Service and all applicable laws and regulations. If you do not agree 
                  with any of these terms, you are prohibited from using our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Description of Services</h2>
                <p className="mb-4">United Press Media provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Press release distribution services</li>
                  <li>Tier-1 media placement coordination</li>
                  <li>Key Opinion Leader (KOL) collaboration facilitation</li>
                  <li>Sponsored content creation and management</li>
                  <li>Digital marketing consultation and strategy</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                <h3 className="text-xl font-medium mb-3">Content Requirements</h3>
                <p className="mb-4">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, truthful, and non-misleading information</li>
                  <li>Ensure all content complies with applicable laws and regulations</li>
                  <li>Respect intellectual property rights of others</li>
                  <li>Not submit content that is defamatory, obscene, or harmful</li>
                  <li>Obtain necessary permissions for any third-party content</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Provide timely responses to our communications</li>
                  <li>Make payments according to agreed terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is required in advance for all services</li>
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>Refunds are subject to our refund policy outlined below</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                  <li>Late payments may result in service suspension</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Delivery and Performance</h2>
                <h3 className="text-xl font-medium mb-3">Our Commitments</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Deliver services according to the specifications in your selected package</li>
                  <li>Provide regular updates on campaign progress</li>
                  <li>Use reasonable efforts to meet estimated timelines</li>
                  <li>Maintain professional standards in all communications</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">Limitations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We cannot guarantee specific outcomes or results</li>
                  <li>Media placements are subject to editorial decisions of third-party publications</li>
                  <li>Performance may vary based on market conditions and content quality</li>
                  <li>We are not responsible for actions of third-party media partners</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Refund Eligibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Within 48 hours:</strong> Full refund if no work has commenced</li>
                    <li><strong>Partial delivery:</strong> Prorated refund for undelivered services</li>
                    <li><strong>Service failures:</strong> Refund if we fail to deliver agreed-upon services</li>
                    <li><strong>No refunds:</strong> Once press releases are distributed or content is published</li>
                    <li><strong>Service fees and subscription fees are non refundable</strong></li>
                    <li><strong>Non communication for 3 months results in loss of remaining budget</strong></li>
                  </ul>
                  
                  <p className="mt-4">
                    To request a refund, contact us within 14 days of service completion with detailed reasons.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You retain ownership of your original content and materials</li>
                  <li>You grant us a license to use your content for service delivery</li>
                  <li>We retain rights to our methodologies, processes, and proprietary tools</li>
                  <li>Neither party may use the other's trademarks without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, United Press Media shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including but not 
                  limited to loss of profits, data, or business opportunities, arising from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                <p className="mb-4">Either party may terminate services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With 30 days written notice for ongoing services</li>
                  <li>Immediately for breach of these terms</li>
                  <li>Immediately for non-payment</li>
                  <li>For any reason with mutual agreement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms or our services shall be resolved through binding 
                  arbitration in accordance with the rules of the American Arbitration Association. 
                  The arbitration shall take place in New York, NY, and be conducted in English.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p>
                  These Terms of Service are governed by and construed in accordance with the laws of 
                  New York State, without regard to its conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Material changes will be 
                  communicated via email or website notice at least 30 days in advance. Continued 
                  use of our services after changes constitute acceptance of new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted p-6 rounded-lg">
                  <p><strong>United Press Media</strong></p>
                  <p>Email: unitedpress.media@gmail.com</p>
                  <p>Telegram: <a href="https://t.me/unitedpressmedia" className="text-primary hover:underline">@unitedpressmedia</a></p>
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

export default TermsOfService;