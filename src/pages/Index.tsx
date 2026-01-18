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

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seo?.meta_title || "Azani ISP Project - Internet Service Provider Information System 2025"}
        description={seo?.meta_description || "Complete ISP management system with full documentation and database. Get 100% original computer science projects at KES 500. Instant delivery for students."}
        canonical={seo?.canonical_url || "https://azaniispproject.co.ke"}
        ogTitle={seo?.og_title || "Azani ISP Project - Complete Internet Service Provider System"}
        ogDescription={seo?.og_description || "Get your complete ISP management project at KES 500. Includes full documentation and database. 100% original work, instant delivery."}
        ogImage={seo?.og_image || "https://azaniispproject.co.ke/og-image.jpg"}
        keywords={seo?.keywords || ["ISP project", "internet service provider project", "computer science project", "student projects Kenya", "ISP database", "ISP documentation", "2025 project"]}
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
