import Header from "@/components/Header";
import Footer from "@/components/Footer";
const TermsOfService = () => {
  return <div className="min-h-screen bg-background">
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
                <p>By accessing and using UnitedPress.Media's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services. The words “you” and “your” refer to each customer, website visitor, clients, or application user, “we”, “us” and “our” refer to ‘UPM’ (unitedpress.media) and “Services” and or “Coverages” refers to all services provided by us. UPM (unitedpress.media) is operated by BVB Management Inc – Charles Court, 1st Floor, 189 Main Street, P.O. Box 4406, Tortola VG1110 British Virgin Islands.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Description of Services</h2>
                <p className="mb-4">UPM provides:</p>
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
                  <li>All prices are in USD unless otherwise specified, however payment can be made in crypto and fiat options</li>
                  <li>Refunds are subject to our refund policy outlined below</li>
                  <li>Late payments may result in service suspension</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">Subscription Fees and Service Fees</h3>
                <div className="bg-muted p-6 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The <strong>subscription fee</strong> determines the monthly service fee percentage for your selected plan</li>
                    <li>This subscription amount is automatically deducted from any campaign retainer each month until the plan is stopped or cancelled</li>
                    <li>Service fees are <strong>non-reimbursable</strong> and cannot be refunded, even if a campaign is able to be stopped or cancelled</li>
                    <li>Monthly service fee deductions continue until you formally cancel your subscription plan</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">VAT Disclaimer</h2>
                <p>
                  Prices may be subject to value-added tax (VAT) or other applicable taxes based on your location 
                  and tax status. VAT rates and regulations vary by country, and it's the customer's responsibility to 
                  ensure compliance with local tax laws. For more information, please contact us or your local tax 
                  authority.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Withholding Tax and Client Responsibility</h2>
                <p>
                  Clients are responsible for ensuring compliance with local tax laws and regulations, including VAT 
                  and withholding tax. As a BVI-registered company, we comply with applicable tax laws and 
                  regulations in the jurisdictions where we operate.
                </p>
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
                  <li>We may terminate services:</li>
                  <li>Immediately for breach of these terms</li>
                  
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
                <h2 className="text-2xl font-semibold mb-4">Governing Law and Changes</h2>
                <p>
                  This disclaimer is governed by the laws of the British Virgin Islands. We reserve the right to modify 
                  this disclaimer at any time without prior notice. Any changes will be effective immediately upon 
                  posting.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact and Tax Advice</h2>
                <p>
                  For questions or concerns, please contact us at contact@unitedpress.media. This disclaimer is not 
                  intended to provide tax advice, and clients should consult their own tax professionals for guidance 
                  on VAT, withholding tax, and other tax-related matters.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted p-6 rounded-lg">
                  <p><strong>United Press Media</strong></p>
                  <p>Email: contact@unitedpress.media</p>
                  <p>Telegram: <a href="https://t.me/upressagency" className="text-primary hover:underline">@upressagency</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default TermsOfService;