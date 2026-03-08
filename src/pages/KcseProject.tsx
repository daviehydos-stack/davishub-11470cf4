import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Download, CheckCircle, Play, X, ArrowRight, Clock,
  Database, FileText, BookOpen, Star, ShoppingBag,
  Target, Code, Table, Zap, Shield, Award
} from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  created_at: string;
}

const KcseProject = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { getDownloadUrl, redirectMode } = useSiteSettings();
  const downloadUrl = getDownloadUrl();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, category, featured_image, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const videos = [
    { id: "TMUg9BFWn_g", title: "Azani ISP Complete Walkthrough", badge: "Featured" },
    { id: "Rhp84_oP6bU", title: "Getting Started with MS Access", badge: "Beginner" },
    { id: "GMP0Fn3WJpk", title: "Database Design Tutorial", badge: "Core" },
    { id: "Zj57vFeaO-A", title: "KCSE Project Preparation", badge: "Essential" },
    { id: "Rhp84_oP6bU", title: "Victory School Club — Database", badge: "2024" },
    { id: "GMP0Fn3WJpk", title: "Uzima Borehole — Queries", badge: "2023" },
    { id: "Zj57vFeaO-A", title: "Maringo Sports Club System", badge: "2023" },
    { id: "TMUg9BFWn_g", title: "Maringo — Query Design", badge: "2023" },
  ];

  const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@AZANIISPINFORMATIONSYSTEM?sub_confirmation=1";

  const milestones = [
    {
      title: "Milestone 1: Documentation",
      icon: FileText,
      color: "blue",
      items: [
        "Problem definition & system analysis",
        "System flowcharts & data flow diagrams",
        "Entity-Relationship (ER) diagrams",
        "Table structures & data dictionary",
        "Form and report layout designs",
        "Normalization to 3NF",
      ],
    },
    {
      title: "Milestone 2: Implementation",
      icon: Database,
      color: "purple",
      items: [
        "Complete MS Access database (.accdb)",
        "Normalized tables with relationships",
        "Data entry forms with validation",
        "Parameter & action queries",
        "Professional grouped reports",
        "Switchboard / navigation system",
      ],
    },
  ];

  const features = [
    { icon: Shield, title: "Zero Plagiarism", desc: "100% original work, unique to you" },
    { icon: Zap, title: "Instant Download", desc: "Get your files immediately" },
    { icon: Award, title: "Exam Ready", desc: "Aligned with KNEC marking scheme" },
    { icon: Target, title: "Complete Package", desc: "Milestone 1 & 2 included" },
    { icon: Code, title: "Working Database", desc: "Fully functional MS Access system" },
    { icon: BookOpen, title: "Free Guides", desc: "Tutorials and video walkthroughs" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="KCSE 2026 COMPUTER STUDIES PROJECT | AZANI ISP INFORMATION SYSTEM"
        description="Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Milestone 1 and 2 Download Now. Free Download. Get your copy today."
        canonical="https://www.azaniispproject.co.ke/kcse-2026-project"
        ogTitle="KCSE 2026 Computer Studies Project | Azani ISP Information System"
        ogDescription="Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Milestone 1 and 2 Download Now. Free Download. Get your copy today."
        keywords={[
          "KCSE 2026 Computer Studies Project",
          "Azani ISP Information System",
          "KCSE 2026 project download",
          "Azani Internet Service Provider",
          "KCSE Computer Project 2026",
          "Paper 451/3 2026",
          "MS Access KCSE project",
          "KCSE Milestone 1 and 2",
          "computer studies project Kenya",
          "KNEC computer project 2026",
          "KCSE project free download",
          "Azani ISP database system",
          "KCSE 2026 Paper 3",
        ]}
      />

      {/* JSON-LD for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Azani Internet Service Provider Information System",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Windows",
            description:
              "Complete KCSE 2026 Computer Studies Project featuring Milestone 1 documentation and Milestone 2 MS Access database for the Azani Internet Service Provider system.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KES",
              availability: "https://schema.org/InStock",
            },
            author: {
              "@type": "Organization",
              name: "Azani ISP Project",
              url: "https://www.azaniispproject.co.ke",
            },
          }),
        }}
      />

      <Header />

      <main className="flex-1 pt-16 overflow-x-hidden">
        {/* Hero */}
        <section className="relative py-16 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-blue-600/5 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary text-primary-foreground border-0 px-4 py-1.5 text-xs md:text-sm font-semibold">
                KCSE 2026 Computer Studies Paper 451/3
              </Badge>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Azani Internet Service Provider
                <span className="block text-xl sm:text-2xl md:text-3xl mt-3 text-muted-foreground font-medium">
                  Complete Information System — Milestone 1 & 2
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Download your complete, exam-ready KCSE 2026 Computer Studies Project. 
                Includes full documentation, working MS Access database, forms, queries, reports, 
                and step-by-step guides — all aligned with the KNEC marking scheme.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download Now — Free
                  </a>
                </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                  <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Visit Our Shop
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Zero Plagiarism</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Milestone 1 & 2</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> KNEC Aligned</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Instant Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-10">
              Why Students Choose Our Project
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {features.map((f) => (
                <div key={f.title} className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors">
                  <f.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestone Breakdown */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
              What's Included in the Project
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Everything you need for your KCSE 2026 Computer Studies Paper 3 exam
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {milestones.map((m) => (
                <div key={m.title} className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold">{m.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
              Watch: Azani ISP Project Tutorials
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Free video guides to help you understand every aspect of the project
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {videos.map((video) => (
                <div key={video.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                  <div className="relative aspect-video">
                    {activeVideo === video.id ? (
                      <div className="relative w-full h-full bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                        <button
                          onClick={() => setActiveVideo(null)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full cursor-pointer" onClick={() => setActiveVideo(video.id)}>
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={`${video.title} - Azani ISP KCSE 2026 Tutorial`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                          </div>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground border-0 text-[10px]">
                          {video.badge}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts from DB */}
        {blogs.length > 0 && (
          <section className="py-14 md:py-20">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
                KCSE 2026 Project Guides & Articles
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                In-depth tutorials on database design, MS Access, queries, and KNEC requirements
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {blogs.map((blog) => (
                  <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group block">
                    <article className="bg-card border border-border rounded-xl overflow-hidden h-full hover:border-primary/30 transition-colors">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={blog.featured_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          {blog.category || "Guide"}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Clock className="w-3 h-3" />
                          {formatDate(blog.created_at)}
                        </div>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        {blog.excerpt && (
                          <p className="text-xs text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                        )}
                        <span className="flex items-center text-primary text-xs font-medium mt-3">
                          Read more <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link to="/blogs">
                    View All Guides <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Azani ISP System Overview (SEO content block) */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-sm md:prose-base dark:prose-invert">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
                About the Azani Internet Service Provider Information System
              </h2>

              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  The <strong>Azani Internet Service Provider (ISP)</strong> is a company that specializes in providing 
                  internet services and infrastructure to educational institutions across Kenya — including primary schools, 
                  junior schools, senior schools, and colleges. Their services include bandwidth packages 
                  (4 MBPS to 50 MBPS), LAN infrastructure installation, and computer sales.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  For the <strong>KCSE 2026 Computer Studies Project (Paper 451/3)</strong>, students are required to design 
                  and implement a complete database information system for Azani ISP using Microsoft Access. 
                  The project covers client registration, bandwidth management, billing, payment tracking, 
                  and reporting — demonstrating mastery of database concepts including normalization, 
                  ER diagrams, SQL queries, forms, and professional reports.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <Table className="w-5 h-5 text-primary" /> Key Database Tables
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• tblClients — Institution registration details</li>
                    <li>• tblBandwidth — Internet package options & pricing</li>
                    <li>• tblSubscriptions — Client bandwidth subscriptions</li>
                    <li>• tblPayments — Payment records & tracking</li>
                    <li>• tblLAN — LAN infrastructure installations</li>
                    <li>• tblComputers — PC sales and deliveries</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" /> Scoring Highlights
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• System analysis & documentation — 30%</li>
                    <li>• Database design & relationships — 25%</li>
                    <li>• Queries, calculations & reports — 25%</li>
                    <li>• Forms, UI & user experience — 20%</li>
                    <li>• KNEC-aligned marking scheme</li>
                    <li>• Bonus: VBA automation & macros</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe + Final CTA */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
              <div className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8">
                <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                  Subscribe on YouTube
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  New KCSE tutorials every week — 389+ subscribers and growing.
                </p>
                <Button asChild size="lg" className="bg-[hsl(0,100%,40%)] hover:bg-[hsl(0,100%,35%)] text-white font-semibold">
                  <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                    <Play className="mr-2 h-5 w-5" />
                    Subscribe Now
                  </a>
                </Button>
              </div>
              <div className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8">
                <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                  Ready to Ace Your KCSE 2026 Project?
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Download the complete Azani ISP project — Milestone 1 & 2 included.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="font-semibold">
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Download Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default KcseProject;
