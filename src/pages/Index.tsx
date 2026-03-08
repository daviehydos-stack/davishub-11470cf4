import { useState, useEffect } from "react";

import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { AzaniAboutSection } from "@/components/AzaniAboutSection";
import { DownloadSection } from "@/components/DownloadSection";
import { MSAccessSection } from "@/components/MSAccessSection";
import { FormsQueriesSection } from "@/components/FormsQueriesSection";
import { SampleReportsSection } from "@/components/SampleReportsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { WhatsIncludedSection } from "@/components/WhatsIncludedSection";
import GuidesSection from "@/components/GuidesSection";
import { FreeResourcesSection } from "@/components/FreeResourcesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PastProjectsSection } from "@/components/PastProjectsSection";
import { CtaSection } from "@/components/CtaSection";
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

  // Default SEO values - optimized for target keywords
  const defaultTitle = "2026 KCSE COMPUTER STUDIES PROJECT | AZANI INTERNET SERVICE PROVIDER INFORMATION SYSTEM";
  const defaultDescription = "2026 KCSE Computer Studies Project - Azani Internet Service Provider Information System (Paper 451/3). Download Now. Zero Plagiarism. Free Download. Milestone 1 & 2 Included. MS Access database with forms, queries & reports. 500+ Students Scored 90%+.";
  const defaultImage = "https://www.azaniispproject.co.ke/azani.jpg";
  const defaultCanonical = "https://www.azaniispproject.co.ke/";
  const defaultKeywords = [
    "2026 KCSE Computer Studies Project",
    "KCSE 2026 project",
    "KCSE computer project 2026",
    "Azani ISP",
    "Azani Internet Service Provider",
    "KCSE 451/3",
    "KCSE paper 3 project 2026",
    "KNEC computer studies project 2026",
    "Milestone 1",
    "Milestone 2",
    "KCSE Computer Studies",
    "MS Access Project",
    "KCSE project download",
    "computer project Kenya",
    "KCSE database project",
    "KNEC project requirements 2026",
    "free KCSE computer project",
    "computer studies paper 3 2026",
    "secondary school computer project Kenya"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seo?.meta_title || defaultTitle}
        description={seo?.meta_description || defaultDescription}
        canonical={seo?.canonical_url || defaultCanonical}
        ogTitle={seo?.og_title || "AZANI INTERNET SERVICE PROVIDER INFORMATION SYSTEM | KCSE 2026 COMPUTER STUDIES PROJECT"}
        ogDescription={seo?.og_description || "Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Download Now. Zero Plagiarism. Free Download."}
        ogImage={seo?.og_image || defaultImage}
        keywords={seo?.keywords || defaultKeywords}
      />
      
      <main className="flex-1 pt-16">
        <HeroSection />
        <AzaniAboutSection />
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
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
