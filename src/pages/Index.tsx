import { useEffect } from "react";
import Header from "@/components/Header";
import HomeV2 from "@/components/HomeV2";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

import TelegramChat from "@/components/TelegramChat";
import MobileBottomNav from "@/components/MobileBottomNav";

import { updateMetaTags, generateStructuredData } from "@/utils/seoUtils";

const Index = () => {
  
  
  useEffect(() => {
    // SEO optimization for homepage
    updateMetaTags({
      title: "UPM | Digital Marketing & Press Release Distribution",
      description: "Growth platform built for digital marketing with press release distribution, KOL collaborations, and tier-1 media placements \u2014 powered by Fullmedia Alchemist Content and Reach.",
      keywords: "digital marketing, press release distribution, KOL collaborations, web3 marketing, crypto marketing, tier-1 media, content promotion, growth platform",
      canonical: "https://unitedpress.media/",
      ogTitle: "UPM | Digital Marketing & Press Release Distribution",
      ogDescription: "Growth platform built for digital marketing with press release distribution, KOL collaborations, and tier-1 media placements.",
      ogType: "website",
      ogUrl: "https://unitedpress.media/",
      ogImage: "https://unitedpress.media/og-image.png",
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
      <Header />
      <div className="min-h-screen bg-background pt-16 pb-16 md:pb-0">
        <HomeV2 />
        <Footer />
      </div>
      <TelegramChat />
      <MobileBottomNav />
      
    </>
  );
};

export default Index;
