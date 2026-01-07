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
        .single();
      
      if (data) setSeo(data);
    };
    fetchSEO();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seo?.meta_title || "Victory School Project | Ace Your KCSE Computer Studies"}
        description={seo?.meta_description || "The ultimate resource for KCSE Computer Studies projects. Get original, A-grade project materials with complete documentation. Join 500+ students who scored top marks."}
        canonical={seo?.canonical_url || "https://kcse.lovable.app"}
        ogTitle={seo?.og_title || "Victory School Project | Ace Your KCSE"}
        ogDescription={seo?.og_description || "The ultimate resource for KCSE Computer Studies projects. Original, A-grade materials with complete documentation."}
        ogImage={seo?.og_image || undefined}
        keywords={seo?.keywords || ["KCSE", "Computer Studies", "school project", "database project", "Kenya education", "KCSE 2026", "student projects"]}
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
