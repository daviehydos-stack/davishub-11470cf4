import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { DownloadSection } from "@/components/DownloadSection";
import { MSAccessSection } from "@/components/MSAccessSection";
import { FormsQueriesSection } from "@/components/FormsQueriesSection";
import { SampleReportsSection } from "@/components/SampleReportsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { WhatsIncludedSection } from "@/components/WhatsIncludedSection";
import { GuidesSection } from "@/components/GuidesSection";
import { FreeResourcesSection } from "@/components/FreeResourcesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PastProjectsSection } from "@/components/PastProjectsSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

interface SEOSettings {
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
}

const Index = () => {
  const [seo, setSeo] = useState<SEOSettings | null>(null);

  useEffect(() => {
    const fetchSEO = async () => {
      const { data } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('page_path', '/')
        .maybeSingle();
      
      if (data) setSeo(data);
    };
    fetchSEO();
  }, []);

  // Default SEO values with your exact specifications
  const defaultTitle = "Azani Internet Service Provider Project | KCSE 2026 Computer Project";
  const defaultDescription = "Azani Internet Service Provider Project. KCSE 2026 Computer Project. Documentation and Database Available. Free KCSE 2026 Project. Milestone 1 and Milestone 2 Available.";
  const defaultImage = "https://www.azaniispproject.co.ke/meta.jpg";
  const defaultCanonical = "https://www.azaniispproject.co.ke/";
  const defaultKeywords = [
    "KCSE 2026 project",
    "computer project",
    "ISP project",
    "internet service provider",
    "database project",
    "MS Access project",
    "KCSE computer project",
    "milestone 1",
    "milestone 2",
    "student projects Kenya",
    "ISP documentation",
    "ISP database"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seo?.meta_title || defaultTitle}
        description={seo?.meta_description || defaultDescription}
        canonical={seo?.canonical_url || defaultCanonical}
        ogTitle={seo?.og_title || defaultTitle}
        ogDescription={seo?.og_description || defaultDescription}
        ogImage={seo?.og_image || defaultImage}
        keywords={seo?.keywords || defaultKeywords}
      />
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <DownloadSection />
        <PastProjectsSection />
        <MSAccessSection />
        <FormsQueriesSection />
        <SampleReportsSection />
        <WhyChooseUsSection />
        <WhatsIncludedSection />
        <GuidesSection />
        <FreeResourcesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
