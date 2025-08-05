import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustedBy />
      <Services />
      <Pricing />
      <Membership />
      <Footer />
    </div>
  );
};

export default Index;
