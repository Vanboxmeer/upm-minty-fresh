import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import FeaturedInMedia from "@/components/FeaturedInMedia";
import BlogSection from "@/components/BlogSection";
import PackageSelector from "@/components/PackageSelector";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { useExitIntent } from "@/hooks/useExitIntent";
import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";

const Index = () => {
  const { showExitIntent, hideExitIntent } = useExitIntent();
  
  useEffect(() => {
    // SEO optimization for homepage
    updateMetaTags({
      title: "UPM - United Press Media | Digital Marketing Growth Platform",
      description: "Growth platform built for digital marketing with press release distribution, KOL collaborations, and tier-1 media placements. Trusted by 1500+ marketing teams.",
      keywords: "digital marketing, press release distribution, KOL collaborations, web3 marketing, crypto marketing, tier-1 media, content promotion, growth platform",
      canonical: "https://unitedpressmedia.com/",
      ogTitle: "UPM - United Press Media | Digital Marketing Growth Platform",
      ogDescription: "Growth platform built for digital marketing with press release distribution, KOL collaborations, and tier-1 media placements.",
      ogType: "website",
      ogImage: "https://unitedpressmedia.com/lovable-uploads/4ed87a93-4a52-47a8-a969-1b8e2ddac6d9.png",
      twitterCard: "summary_large_image",
      structuredData: [
        generateStructuredData('organization', {}),
        generateStructuredData('website', {})
      ]
    });
  }, []);

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <TrustedBy />
        <Services />
        <FeaturedInMedia />
        <BlogSection />
        <PackageSelector />
        <Footer />
      </div>
      <ExitIntentPopup isOpen={showExitIntent} onClose={hideExitIntent} />
    </>
  );
};

export default Index;
