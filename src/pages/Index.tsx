import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import BlogSection from "@/components/BlogSection";
import PackageSelector from "@/components/PackageSelector";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustedBy />
      <Services />
      <BlogSection />
      <PackageSelector />
      <Footer />
    </div>
  );
};

export default Index;
