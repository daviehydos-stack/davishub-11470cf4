import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Download, CheckCircle, Play, ArrowRight, Clock,
  Database, FileText, BookOpen, MessageCircle, Star,
  Target, Code, Shield, Award, Zap, ShoppingBag,
  Users, MonitorSmartphone, Table, Globe, ExternalLink
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

const KcseComputerStudies = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const { getDownloadUrl } = useSiteSettings();
  const downloadUrl = getDownloadUrl();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, category, featured_image, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(9);
      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const videos = [
    { id: "TMUg9BFWn_g", title: "Azani ISP Database System – Complete KCSE 2026 Walkthrough", desc: "Full project demo showing database, forms, queries, and reports for Paper 451/3." },
    { id: "Rhp84_oP6bU", title: "Victory School Club — Milestone 2 Database System", desc: "KCSE 2024 past project database system walkthrough." },
    { id: "GMP0Fn3WJpk", title: "Victory School Club — Milestone 1 Documentation", desc: "Complete documentation walkthrough for KCSE 2024 project." },
    { id: "Zj57vFeaO-A", title: "Uzima Borehole — Full Query Design", desc: "Learn query design from the 2023 KCSE project." },
  ];

  const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@AZANIISPINFORMATIONSYSTEM?sub_confirmation=1";

  const shopPackages = [
    { name: "Free Documentation Sample", price: "KES 5", badge: "Free", desc: "Preview the documentation quality before buying", url: "https://shop.azaniispproject.co.ke/" },
    { name: "Full Documentation (Milestone 1)", price: "KES 450", badge: "Popular", desc: "Complete system analysis, ER diagrams, flowcharts, data dictionary", url: "https://shop.azaniispproject.co.ke/" },
    { name: "MS Access Database (Milestone 2)", price: "KES 500", badge: "Database", desc: "Working tables, queries, forms, reports, switchboard", url: "https://shop.azaniispproject.co.ke/" },
    { name: "Full Project Bundle", price: "KES 500", badge: "Best Value", desc: "Both milestones — documentation + working database system", url: "https://shop.azaniispproject.co.ke/" },
  ];

  const milestoneDetails = [
    {
      title: "Milestone 1: System Documentation",
      icon: FileText,
      items: [
        "Title page, table of contents, introduction",
        "Problem statement & 5+ SMART objectives",
        "Hardware & software requirements analysis",
        "Entity-Relationship (ER) diagram with all entities",
        "Data dictionary for every table and field",
        "Normalization process to 3NF",
        "System flowcharts & data flow diagrams",
        "Form and report layout designs",
        "Input/output specifications",
      ],
    },
    {
      title: "Milestone 2: Database Implementation",
      icon: Database,
      items: [
        "Complete MS Access .accdb database file",
        "6+ normalized tables with relationships",
        "Data entry forms with validation rules",
        "Navigation/switchboard system",
        "5+ queries including parameter queries",
        "Action queries (update, append, delete)",
        "Professional grouped reports with summaries",
        "Calculated fields and expressions",
        "Testing documentation with screenshots",
      ],
    },
  ];

  const azaniTables = [
    { name: "tblClients", desc: "Stores institution details — school name, type, county, contact person, email, phone" },
    { name: "tblBandwidth", desc: "Internet packages — 4 Mbps, 10 Mbps, 20 Mbps, 50 Mbps with pricing" },
    { name: "tblSubscriptions", desc: "Links clients to bandwidth packages with start/end dates and status" },
    { name: "tblPayments", desc: "Payment records — amount, date, method (M-Pesa, bank), receipt number" },
    { name: "tblLAN", desc: "LAN infrastructure installations — cabling, switches, access points" },
    { name: "tblComputers", desc: "Computer sales — brand, specs, quantity, delivery status" },
  ];

  const faqs = [
    { q: "What is the KCSE 2026 Computer Studies Project?", a: "The KCSE 2026 Computer Studies Paper 3 (451/3) project requires students to design and implement a database information system for the Azani Internet Service Provider using Microsoft Access. It is divided into Milestone 1 (documentation) and Milestone 2 (database implementation)." },
    { q: "What is the Azani Internet Service Provider?", a: "Azani ISP is a fictional company used in the KCSE 2026 project brief. It provides internet bandwidth, LAN installation, and computer sales to educational institutions across Kenya. Students must build a database system to manage its operations." },
    { q: "What software do I need for the project?", a: "You need Microsoft Access 2016 or later (part of Microsoft Office) running on Windows. The documentation can be prepared in Microsoft Word. A PC or laptop running Windows 10/11 is recommended." },
    { q: "How many marks is the project worth?", a: "The Computer Studies Project (Paper 3) is worth a significant portion of your final KCSE grade. Documentation accounts for approximately 30%, database design 25%, queries and reports 25%, and forms/UI 20%." },
    { q: "Can I download a sample project for free?", a: "Yes! We offer a free documentation sample on our shop at shop.azaniispproject.co.ke. You can also watch our free YouTube tutorials and read our blog guides to understand every aspect of the project." },
    { q: "Is this project plagiarism-free?", a: "Yes. Each project package is customized with unique content. We provide different batches to ensure no two students submit identical work. Our documentation follows KNEC guidelines while maintaining originality." },
  ];

  // Single consolidated JSON-LD with both schemas using @graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Azani Internet Service Provider Information System — KCSE 2026",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Windows",
        description: "Complete KCSE 2026 Computer Studies Project (Paper 451/3) for the Azani Internet Service Provider. Includes Milestone 1 documentation and Milestone 2 MS Access database. Free download available.",
        offers: { "@type": "AggregateOffer", lowPrice: "5", highPrice: "500", priceCurrency: "KES", offerCount: "4" },
        author: { "@type": "Organization", name: "Azani ISP Project", url: "https://www.azaniispproject.co.ke" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        name: "KCSE 2026 Computer Studies Project — Free Milestone 1 & 2 Download",
        url: "https://www.azaniispproject.co.ke/kcse-2026-computer-studies-project",
        description: "KCSE 2026 Computer Studies Project. Azani Internet Service Provider Information System. Free Milestone 1 and 2. Download Documentation and Database System. Get a copy today.",
      }
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="KCSE 2026 COMPUTER STUDIES PROJECT | Free Milestone 1 & 2 Download | Azani ISP"
        description="KCSE 2026 Computer Studies Project. Azani Internet Service Provider Information System. Free Milestone 1 and 2. Download Documentation and Database System. Get a copy today. Zero Plagiarism. KNEC Aligned."
        canonical="https://www.azaniispproject.co.ke/kcse-2026-computer-studies-project"
        ogTitle="KCSE 2026 COMPUTER STUDIES PROJECT — Free Milestone 1 & 2 Download"
        ogDescription="KCSE 2026 Computer Studies Project. Azani Internet Service Provider Information System. Free Milestone 1 and 2. Download Documentation and Database System. Get a copy today."
        ogImage="https://www.azaniispproject.co.ke/azani.jpg"
        keywords={[
          "KCSE 2026 Computer Studies Project",
          "KCSE 2026 COMPUTER STUDIES PROJECT",
          "kcse 2026 computer studies project",
          "KCSE 2026 project",
          "KCSE computer studies project 2026",
          "Azani ISP project",
          "Azani Internet Service Provider",
          "KCSE Paper 451/3",
          "computer studies project download",
          "free KCSE project download",
          "MS Access KCSE project",
          "KCSE project milestone 1",
          "KCSE project milestone 2",
          "KNEC computer project 2026",
          "Azani ISP database system",
          "KCSE 2026 computer project Kenya",
          "computer studies project documentation",
          "free milestone 1 and 2",
        ]}
      />

      {/* Single consolidated JSON-LD — no duplicates */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 pt-16 overflow-x-hidden">
        {/* Hero */}
        <section className="relative py-16 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/30 to-primary/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary text-primary-foreground border-0 px-4 py-1.5 text-xs md:text-sm font-semibold">
                KCSE 2026 · Paper 451/3 · Computer Studies
              </Badge>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                KCSE 2026 Computer Studies Project
                <span className="block text-lg sm:text-xl md:text-2xl mt-3 text-muted-foreground font-medium">
                  Azani Internet Service Provider Information System
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                Download the complete, exam-ready project — <strong className="text-foreground">Free Milestone 1 documentation</strong> and <strong className="text-foreground">Milestone 2 MS Access database</strong>. 
                Aligned with KNEC marking scheme. Free sample available on our shop.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Get the Documentation and Database System today. Zero Plagiarism. Instant delivery via M-Pesa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="font-semibold shadow-lg">
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
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
                <span className="flex items-center gap-1"><Users className="w-4 h-4 text-green-500" /> 500+ Students</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> KNEC Aligned</span>
                <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-green-500" /> Instant Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* What is this project */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-8">
                What is the KCSE 2026 Computer Studies Project?
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-foreground">KCSE 2026 Computer Studies Paper 3 (451/3)</strong> requires every Form Four student 
                  taking Computer Studies to design and implement a database information system. For the 2026 exam cycle, 
                  KNEC has assigned the <strong className="text-foreground">Azani Internet Service Provider (ISP)</strong> as the project topic.
                </p>
                <p>
                  <strong className="text-foreground">Azani ISP</strong> is a company that provides internet services to educational institutions 
                  across Kenya — primary schools, junior schools, senior schools, and colleges. Their services include 
                  bandwidth packages (4 Mbps to 50 Mbps), LAN infrastructure installation, and computer sales.
                </p>
                <p>
                  Students must build a <strong className="text-foreground">Microsoft Access database system</strong> that manages client registration, 
                  bandwidth subscriptions, billing, payments, LAN installations, and computer deliveries. The project is divided into 
                  two milestones: <strong className="text-foreground">Milestone 1</strong> (system documentation) and <strong className="text-foreground">Milestone 2</strong> (database implementation).
                </p>
                <p>
                  The project is examined internally by your school and externally moderated by KNEC. It contributes significantly 
                  to your final Computer Studies grade, making it essential to submit a complete, well-documented, and functional project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-10">
              Why 500+ Students Choose Our Azani ISP Project
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "Zero Plagiarism", desc: "Multiple unique batches — no two students submit the same work" },
                { icon: Zap, title: "Instant Download", desc: "Get your files immediately after payment via M-Pesa" },
                { icon: Award, title: "KNEC Aligned", desc: "Follows the official marking scheme for maximum marks" },
                { icon: Target, title: "Both Milestones", desc: "Documentation + working MS Access database included" },
                { icon: Code, title: "Working Database", desc: "Fully functional system with forms, queries, and reports" },
                { icon: BookOpen, title: "Free Guides", desc: "YouTube tutorials and blog articles to help you learn" },
              ].map((f) => (
                <div key={f.title} className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors">
                  <f.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-1 text-sm md:text-base">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestone Breakdown */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
              Complete Milestone 1 & 2 Breakdown
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Everything KNEC requires for your KCSE 2026 Computer Studies Paper 3
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {milestoneDetails.map((m) => (
                <div key={m.title} className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold">{m.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
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

        {/* Database Tables */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
              Azani ISP Database Structure
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              The 6 core tables in the Azani Internet Service Provider Information System
            </p>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {azaniTables.map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Table className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="font-mono font-semibold text-sm">{t.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
              Free Video Tutorials — Azani ISP Project
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Watch and learn every aspect of the KCSE 2026 Computer Studies Project
            </p>

            <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
              {videos.map((video, idx) => (
                <div key={`${video.id}-${idx}`} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    {playingVideo === `${video.id}-${idx}` ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <button
                        onClick={() => setPlayingVideo(`${video.id}-${idx}`)}
                        className="relative w-full h-full group"
                        aria-label={`Play ${video.title}`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          width={480}
                          height={360}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm md:text-base mb-1">{video.title}</h3>
                    <p className="text-xs text-muted-foreground">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe */}
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="font-semibold">
                <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" /> Subscribe on YouTube
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Shop / Packages */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
              Get Your Azani ISP Project Package
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Choose a package from our shop — free sample available. Instant delivery via M-Pesa.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              {shopPackages.map((pkg) => (
                
                  key={pkg.name}
                  href={pkg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group block"
                >
                  <Badge className="mb-3 bg-primary/10 text-primary border-0 text-[10px]">{pkg.badge}</Badge>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{pkg.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{pkg.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{pkg.price}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Browse All Packages on Our Shop
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        {blogs.length > 0 && (
          <section className="py-14 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-4">
                Free KCSE 2026 Guides & Articles
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                In-depth tutorials on database design, MS Access, queries, reports, and KNEC requirements
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
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px]">
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
                          Read guide <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
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

        {/* FAQ Section */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-card border border-border rounded-xl group">
                  <summary className="p-5 cursor-pointer font-semibold text-sm md:text-base list-none flex items-center justify-between">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe + CTA */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
              <div className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8">
                <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                  Subscribe on YouTube
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Get notified when we publish new KCSE tutorials — 389+ subscribers and growing.
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
                  Ready to Ace Your Project?
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Download the complete Azani ISP project. Join 500+ students who scored high.
                </p>
                <Button asChild size="lg" className="font-semibold">
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Block (hidden visually, visible to crawlers) */}
        <section className="sr-only">
          <h2>KCSE 2026 Computer Studies Project — Azani ISP</h2>
          <p>The KCSE 2026 Computer Studies Project focuses on the Azani Internet Service Provider Information System. This project is examined as Paper 451/3 and requires students to demonstrate their skills in Microsoft Access database design and implementation. Students must complete Milestone 1 (system documentation including ER diagrams, data dictionary, system flowcharts, and normalization) and Milestone 2 (working MS Access database with tables, forms, queries, and reports). The Azani ISP system manages client registration for educational institutions, bandwidth subscription tracking, payment processing, LAN infrastructure installations, and computer equipment sales across Kenya.</p>
          <p>Keywords: KCSE 2026 computer studies project, KCSE computer project, Azani ISP project, KCSE Paper 451/3, computer studies paper 3, MS Access KCSE project, KCSE milestone 1, KCSE milestone 2, KNEC computer project, database project Kenya, Azani Internet Service Provider, KCSE 2026 project download, free KCSE project, computer studies project documentation, free milestone 1 and 2, download documentation and database system.</p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default KcseComputerStudies;
