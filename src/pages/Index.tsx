import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";

// ✅ Above-fold: load immediately
import { AzaniAboutSection } from "@/components/AzaniAboutSection";
import { DownloadSection } from "@/components/DownloadSection";

// ✅ Below-fold: lazy load (saves ~109 KiB on initial load)
const MSAccessSection = lazy(() => import("@/components/MSAccessSection").then(m => ({ default: m.MSAccessSection })));
const FormsQueriesSection = lazy(() => import("@/components/FormsQueriesSection").then(m => ({ default: m.FormsQueriesSection })));
const SampleReportsSection = lazy(() => import("@/components/SampleReportsSection").then(m => ({ default: m.SampleReportsSection })));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const WhatsIncludedSection = lazy(() => import("@/components/WhatsIncludedSection").then(m => ({ default: m.WhatsIncludedSection })));
const GuidesSection = lazy(() => import("@/components/GuidesSection"));
const FreeResourcesSection = lazy(() => import("@/components/FreeResourcesSection").then(m => ({ default: m.FreeResourcesSection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const PastProjectsSection = lazy(() => import("@/components/PastProjectsSection").then(m => ({ default: m.PastProjectsSection })));

// ✅ Simple fallback - no layout shift
const SectionFallback = () => (
  <div style={{ minHeight: '200px', background: 'transparent' }} aria-hidden="true" />
);

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
    // ✅ Defer SEO fetch slightly to not compete with hero render
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('page_path', '/')
        .maybeSingle();
      if (data) setSeo(data);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Default SEO values - optimized for target keywords
  const defaultTitle = "Azani ISP INFORMATION SYSTEM | KCSE 2026 COMPUTER STUDIES PROJECT";
  const defaultDescription = "Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Free Download Milestone 1 and Milestone 2. Zero Plagiarism. Download Now.";
  const defaultImage = "https://www.azaniispproject.co.ke/og-image.jpg";
  const defaultCanonical = "https://www.azaniispproject.co.ke/";
  const defaultKeywords = [
    "Azani ISP",
    "2026 KCSE Computer Project",
    "KCSE 451/3",
    "Azani Internet Service Provider",
    "Milestone 1",
    "Milestone 2",
    "KCSE Computer Studies",
    "MS Access Project",
    "KCSE project download",
    "computer project Kenya"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seo?.meta_title || defaultTitle}
        description={seo?.meta_description || defaultDescription}
        canonical={seo?.canonical_url || defaultCanonical}
        ogTitle={seo?.og_title || "Azani ISP INFORMATION SYSTEM | KCSE 2026 COMPUTER STUDIES PROJECT"}
        ogDescription={seo?.og_description || "Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Free Download Milestone 1 and Milestone 2. Zero Plagiarism. Download Now."}
        ogImage={seo?.og_image || defaultImage}
        keywords={seo?.keywords || defaultKeywords}
      />
      <Header />
      <main className="flex-1 pt-16">
        {/* ✅ Above fold - loads immediately, no Supabase calls */}
        <HeroSection />
        <AzaniAboutSection />
        <DownloadSection />

        {/* ✅ Below fold - lazy loaded after hero is visible */}
        <Suspense fallback={<SectionFallback />}>
          <PastProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MSAccessSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FormsQueriesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SampleReportsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyChooseUsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhatsIncludedSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GuidesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FreeResourcesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
