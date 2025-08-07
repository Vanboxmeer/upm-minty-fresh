import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import BlogSection from "@/components/BlogSection";
import Pricing from "@/components/Pricing";
import Membership from "@/components/Membership";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustedBy />
      <Services />
      <BlogSection />
      <Pricing />
      <Membership />
      <div id="payment-silver">
        <Payment planName="Silver Membership Plan" planType="silver" />
      </div>
      <div id="payment-gold">
        <Payment planName="Gold Membership Plan" planType="gold" />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
