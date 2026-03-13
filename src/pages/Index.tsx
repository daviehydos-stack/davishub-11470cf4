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
  const defaultTitle = "AZANI INTERNET SERVICE PROVIDER | KCSE 2026 COMPUTER STUDIES PROJECT";
  const defaultDescription = "Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Download Now for Free. Milestone 1 and 2 Available. Zero Plagiarism.";
  const defaultImage = "https://www.azaniispproject.co.ke/azani.jpg";
  const defaultCanonical = "https://www.azaniispproject.co.ke/";

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seo?.meta_title || defaultTitle}
        description={seo?.meta_description || defaultDescription}
        canonical={seo?.canonical_url || defaultCanonical}
        ogTitle={seo?.og_title || defaultTitle}
        ogDescription={seo?.og_description || defaultDescription}
        ogImage={seo?.og_image || defaultImage}
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
