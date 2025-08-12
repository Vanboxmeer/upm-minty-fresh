import Header from "@/components/Header";
import Footer from "@/components/Footer";
const PrivacyPolicy = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Privacy Policy
            </h1>
            <p className="text-center text-muted-foreground mb-12">Last updated: August 11, 2025</p>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                  United Press Media ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and safeguard your information 
                  when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <h3 className="text-xl font-medium mb-3">Personal Information</h3>
                <p className="mb-4">We may collect the following personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company information and job title</li>
                  <li>Payment and billing information</li>
                  <li>Communication preferences</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-3 mt-6">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Device information and operating system</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our marketing services</li>
                  <li>Process payments and manage your account</li>
                  <li>Communicate with you about our services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Analyze website usage and improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> Third-party vendors who assist in providing our services</li>
                  <li><strong>Media Partners:</strong> Publications and platforms where we place your content (as necessary for service delivery)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of our business</li>
                </ul>
                <p className="mt-4">
                  We do not sell, rent, or lease your personal information to third parties for their marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="mb-4">Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict or object to processing of your information</li>
                  <li>Data portability</li>
                  <li>Withdraw consent (where processing is based on consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze website traffic, and personalize content. You can control cookie 
                  settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibent mb-4">Data Retention</h2>
                <p>
                  We retain your personal information only as long as necessary to fulfill the 
                  purposes outlined in this policy, comply with legal obligations, resolve disputes, 
                  and enforce our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not 
                  knowingly collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on our website and updating the 
                  "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
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
    </div>;
};
export default PrivacyPolicy;