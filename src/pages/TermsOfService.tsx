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
              Last updated: November 13, 2025
            </p>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p>By accessing and using UnitedPress.Media's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services. The words "you" and "your" refer to each customer, website visitor, clients, or application user, "we", "us" and "our" refer to 'UPM' (unitedpress.media) and "Services" and or "Coverages" refers to all services provided by us. UPM (unitedpress.media) is operated by BVB Management Inc – Charles Court, 1st Floor, 189 Main Street, P.O. Box 4406, Tortola VG1110 British Virgin Islands.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Description of Services</h2>
                <p className="mb-4">UPM unitedpress.media is a digital marketing service and media partner registered in the British Virgin Islands (BVI), offering international services such as:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>KOL Collaborations:</strong> Collaborate with influencers and key opinion leaders who have a direct connection with your target audience, including verified influencer networks, targeted audience matching, campaign performance tracking, and content creation support.</li>
                  <li><strong>Press Release Services:</strong> Distribute press releases to keep your investors and community up to date with important news and milestone events, including major publication distribution, investor-focused messaging, niche-specific PR bundles (DeFi, NFT, AI, Tech), and fast turnaround.</li>
                  <li><strong>Features, Interviews, Spaces:</strong> Get featured in top media, have your CEO as a guest on a popular show, or co-host a community event, with top-tier media placements, executive interview opportunities, community event hosting, and thought leadership positioning.</li>
                  <li><strong>Web2 & Web3 Influencer Network:</strong> We partner with over 1,500 content creators across platforms like YouTube (long-form content creators and reviewers), X (Twitter) (thought leaders and breaking news), Telegram (community channels and groups), Instagram (visual storytellers and lifestyle content), TikTok (viral short-form content creators), and LinkedIn (professional network and B2B content), for a combined reach exceeding 100M.</li>
                  <li><strong>Managed Paid Advertising:</strong> Strategic paid advertising campaigns on platforms where your audience is most active, with full campaign management, performance optimization, detailed analytics, Telegram Ads (channel & group sponsorships, targeted community reach, crypto-native audience, high engagement rates), Brave Ads (privacy-first advertising, rewarded user attention, Web3-savvy users, performance tracking), and Native Ads (banner & display ads, branded content links, niche site placements, native content integration).</li>
                  <li><strong>Additional Services:</strong> Creator Services, Vibe Coding Agency, Web3 Directory Listings, and Media for Brands including videos, images, commercials/ads, social media content, and ad media.</li>
                </ul>
                <p className="mt-4">These services may involve coordination with third-party providers, such as content creators and ad platforms, funded through client-provided budgets.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                <h3 className="text-xl font-medium mb-3">Content Requirements</h3>
                <p className="mb-4">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, truthful, and non-misleading information.</li>
                  <li>Ensure all content complies with applicable laws and regulations.</li>
                  <li>Respect intellectual property rights of others.</li>
                  <li>Not submit content that is defamatory, obscene, or harmful.</li>
                  <li>Obtain necessary permissions for any third-party content.</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain confidentiality of your account credentials.</li>
                  <li>Notify us immediately of any unauthorized use.</li>
                  <li>Provide timely responses to our communications.</li>
                  <li>Make payments according to agreed terms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is required in advance for all services.</li>
                  <li>All prices are in USD unless otherwise specified; however, payment can be made in crypto (e.g., USDC on EVM chains) and fiat options.</li>
                  <li>Refunds are subject to our refund policy outlined below.</li>
                  <li>Late payments may result in service suspension.</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">Subscription Fees and Service Fees</h3>
                <div className="bg-muted p-6 rounded-lg space-y-3">
                  <p>The subscription fee determines the monthly service fee percentage for your selected plan (e.g., 3.45% of the marketing campaign budget).</p>
                  <p>This subscription amount is automatically deducted from any campaign retainer each month until the plan is stopped or cancelled.</p>
                  <p><strong>Service fees are non-reimbursable and cannot be refunded</strong>, even if a campaign is able to be stopped or cancelled.</p>
                  <p>Monthly service fee deductions continue until you formally cancel your subscription plan.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cryptocurrency and Digital Asset Payments</h2>
                <p className="mb-4">Clients may provide campaign budgets via web3 wallets (e.g., transferring USDC or other digital assets to a UPM-controlled wallet). These budgets fund UPM's subscription fees, service fees, and campaign executions such as press release packages, ad buying, and payments to content creators.</p>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <p className="mb-3"><strong>Important:</strong> Upon transfer of funds (digital assets or fiat) to UPM for a campaign or services, the funds become the property of UPM and are no longer owned by the client. The wallet or account being funded is controlled by UPM.</p>
                  <p>These funds will be used to fulfill ordered coverages (e.g., KOL collaborations, press releases, or managed ads). If no coverages are ordered, the funds will continue to be charged for ongoing subscription fees until depletion or cancellation.</p>
                </div>
                <p>Clients acknowledge that cryptocurrency payments involve risks such as volatility, and UPM is not responsible for any losses due to market fluctuations after receipt. All transactions are final upon confirmation on the blockchain or payment processor, and UPM acts as a merchant accepting digital assets as payment for services, in compliance with BVI regulations.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">VAT Disclaimer</h2>
                <p>Prices may be subject to value-added tax (VAT) or other applicable taxes based on your location and tax status. VAT rates and regulations vary by country, and it's the customer's responsibility to ensure compliance with local tax laws. For more information, please contact us or your local tax authority.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Withholding Tax and Client Responsibility</h2>
                <p>Clients are responsible for ensuring compliance with local tax laws and regulations, including VAT and withholding tax. As a BVI-registered company, we comply with applicable tax laws and regulations in the jurisdictions where we operate.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Service Delivery and Performance</h2>
                <h3 className="text-xl font-medium mb-3">Our Commitments</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Deliver services according to the specifications in your selected package.</li>
                  <li>Provide regular updates on campaign progress.</li>
                  <li>Use reasonable efforts to meet estimated timelines.</li>
                  <li>Maintain professional standards in all communications.</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Limitations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We cannot guarantee specific outcomes or results.</li>
                  <li>Media placements are subject to editorial decisions of third-party publications.</li>
                  <li>Performance may vary based on market conditions and content quality.</li>
                  <li>We are not responsible for actions of third-party media partners.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                <h3 className="text-xl font-medium mb-3">Refund Eligibility:</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Within 48 hours:</strong> Full refund if no work has commenced.</li>
                  <li><strong>Partial delivery:</strong> Prorated refund for undelivered services.</li>
                  <li><strong>Service failures:</strong> Refund if we fail to deliver agreed-upon services.</li>
                  <li><strong>No refunds:</strong> Once press releases are distributed or content is published.</li>
                </ul>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <p>For any refund requests involving campaign budgets funded via web3 wallets or digital assets, applicable subscription fees and service fees (e.g., 3.45% or other plan-specific percentages) will be deducted prior to processing the refund. Refunds will be issued in the original form of payment where possible, subject to blockchain transaction fees or conversion costs, which may reduce the refunded amount.</p>
                </div>
                <p>To request a refund, contact us within 14 days of service completion with detailed reasons.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You retain ownership of your original content and materials.</li>
                  <li>You grant us a license to use your content for service delivery.</li>
                  <li>We retain rights to our methodologies, processes, and proprietary tools.</li>
                  <li>Neither party may use the other's trademarks without permission.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, United Press Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                <p className="mb-4">We may terminate services at any time:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Immediately for breach of these terms.</li>
                  <li>For any reason upon notice to you.</li>
                </ul>
                <p>You may cancel your subscription at any time by providing notice to us, but such cancellation will not entitle you to a refund of any prepaid subscription fees, service fees, or other amounts, which are non-refundable as outlined in the Subscription Fees and Service Fees and Refund Policy sections. Upon cancellation, access to services will end at the conclusion of the current billing period, and any remaining funds in your campaign budget will be retained by UPM.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Privacy and Privacy Policy</h2>
                <p className="mb-4">UPM handles personal data from clients, influencers, and other parties in the course of providing services, such as contact information, campaign details, and communication records. We use tools like Google Spreadsheets for managing information, Telegram for client interactions, and Gmail for communications. We are committed to protecting your privacy and comply with applicable data protection laws, including the General Data Protection Regulation (GDPR) for clients in the European Union (EU) or where GDPR applies. This includes obtaining necessary consents, ensuring data security, and providing rights such as access, rectification, and deletion of personal data.</p>
                <p className="mb-4">For detailed information on how we collect, use, store, and share personal data, please refer to our separate Privacy Policy, available at <a href="/privacy-policy" className="text-primary hover:underline">unitedpress.media/privacy-policy</a>. By using our services, you consent to the practices described in the Privacy Policy. If you are an EU resident, you have additional rights under GDPR, and we will process your data accordingly. Questions about data privacy can be directed to contact@unitedpress.media.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Force Majeure</h2>
                <p className="mb-4">Neither party shall be liable for any failure or delay in performing its obligations under these Terms of Service if such failure or delay is caused by events beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials ("Force Majeure Events").</p>
                <p>In the event of a Force Majeure Event, the affected party shall notify the other party promptly and use reasonable efforts to resume performance as soon as possible. If the Force Majeure Event continues for more than 30 days, either party may terminate the services upon written notice, subject to the Termination and Refund Policy provisions.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
                <p>Any disputes arising from these terms or our services shall be resolved through binding arbitration in accordance with the rules of the ADR Institute of Canada. The arbitration shall take place in Toronto, Ontario, and be conducted in English.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Governing Law and Changes</h2>
                <p className="mb-4">These Terms of Service are governed by the laws of the British Virgin Islands. We reserve the right to modify these Terms of Service at any time without prior notice. Any changes will be effective immediately upon posting.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact and Tax Advice</h2>
                <p>For questions or concerns, please contact us at contact@unitedpress.media. These Terms of Service are not intended to provide tax advice, and clients should consult their own tax professionals for guidance on VAT, withholding tax, and other tax-related matters.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-4">For questions about these Terms of Service, please contact us:</p>
                <div className="bg-muted p-6 rounded-lg">
                  <p><strong>United Press Media</strong></p>
                  <p>Email: contact@unitedpress.media</p>
                  <p>Telegram: <a href="https://t.me/unitedpressmedia" className="text-primary hover:underline">@unitedpressmedia</a></p>
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