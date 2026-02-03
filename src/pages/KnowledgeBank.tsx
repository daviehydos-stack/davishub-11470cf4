import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Database, BookOpen, Download, CheckCircle, MessageCircle } from "lucide-react";

const KnowledgeBank = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="KCSE 2026 Computer Project Guide | Azani ISP Information System"
        description="Complete guide for the 2026 KCSE Computer Studies Project (451/3). Learn about Azani Internet Service Provider Information System - Milestone 1 Documentation & Milestone 2 Database."
        canonical="https://www.azaniispproject.co.ke/kcse"
        ogTitle="2026 KCSE Computer Project - Azani ISP Complete Guide"
        ogDescription="Everything you need to know about the Azani ISP KCSE project. Tables, Forms, Queries, Reports explained."
        keywords={[
          "KCSE 2026 Computer Project",
          "Azani ISP",
          "Azani Internet Service Provider",
          "KCSE 451/3",
          "Milestone 1",
          "Milestone 2",
          "MS Access Project",
          "Database Project Kenya",
          "KCSE Computer Studies"
        ]}
      />
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                2026 KCSE Computer Studies Project (451/3)
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Azani Internet Service Provider
                <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                  Information System Complete Guide
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Everything you need to understand and complete your KCSE Computer Project. 
                From database design to documentation - we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Get Complete Project
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="https://wa.link/jox26j" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-center">
                What is the Azani ISP Project?
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The Azani Internet Service Provider Information System is the official 2026 KCSE 
                  Computer Studies Paper 3 (451/3) project. Azani is a company that provides internet 
                  services and infrastructure to learning institutions including primary schools, 
                  junior schools, senior schools, and colleges across Kenya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">
              Project Requirements Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-6 rounded-xl border border-border">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Milestone 1: Documentation</h3>
                <p className="text-muted-foreground text-sm">
                  Complete project documentation including problem statement, system analysis, 
                  ER diagrams, data flow diagrams, and design specifications.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Database className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Milestone 2: Database</h3>
                <p className="text-muted-foreground text-sm">
                  Fully functional MS Access database with tables, forms, queries, 
                  reports, and VBA code for the ISP management system.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-3">Complete Package</h3>
                <p className="text-muted-foreground text-sm">
                  Both milestones combined with user manual, installation guide, 
                  and dedicated WhatsApp support for any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">
              Pricing & Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Milestone 1", price: "500", desc: "Documentation Only" },
                { title: "Milestone 2", price: "1,000", desc: "Database Only", popular: true },
                { title: "Complete", price: "1,400", desc: "Both Milestones" },
              ].map((pkg) => (
                <div key={pkg.title} className={`p-6 rounded-xl border ${pkg.popular ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                  {pkg.popular && <Badge className="mb-2 bg-primary">Most Popular</Badge>}
                  <h3 className="font-display text-xl font-bold">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.desc}</p>
                  <p className="text-3xl font-bold mb-4">Ksh {pkg.price}</p>
                  <Button asChild className="w-full">
                    <a href="https://shop.azaniispproject.co.ke/" target="_blank" rel="noopener noreferrer">
                      Order Now
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: "What is included in the project?", a: "Complete documentation, MS Access database, forms, queries, reports, and support." },
                { q: "How do I receive the project?", a: "Instant delivery via WhatsApp after payment confirmation." },
                { q: "Is it the official 2026 project?", a: "Yes, this is the official KNEC Paper 451/3 for KCSE 2026." },
                { q: "Can I customize the project?", a: "Absolutely! All materials are fully editable." },
              ].map((faq) => (
                <div key={faq.q} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Hidden Content for Google */}
        <div className="sr-only" aria-hidden="true">
          <h2>Azani Internet Service Provider Information System - KCSE 2026 Computer Project Complete Details</h2>
          
          <h3>Business Case Overview</h3>
          <p>Azani Company provides internet services to learning institutions. Registration fee is KSh 8,500. Installation fee is KSh 10,000. Personal computers cost KSh 40,000 each.</p>
          
          <h3>Bandwidth Packages</h3>
          <ul>
            <li>4 MBPS - KSh 1,200 per month</li>
            <li>10 MBPS - KSh 2,000 per month</li>
            <li>20 MBPS - KSh 3,500 per month</li>
            <li>25 MBPS - KSh 4,000 per month</li>
            <li>50 MBPS - KSh 7,000 per month</li>
          </ul>
          
          <h3>LAN Node Costs</h3>
          <ul>
            <li>2-10 nodes - KSh 10,000</li>
            <li>11-20 nodes - KSh 20,000</li>
            <li>21-40 nodes - KSh 30,000</li>
            <li>41-100 nodes - KSh 40,000</li>
          </ul>
          
          <h3>System Requirements</h3>
          <p>10% discount on bandwidth upgrades. 15% overdue fine for late payments. KSh 1,000 reconnection fee. Disconnection after 10th day of subsequent month if unpaid.</p>
          
          <h3>Database Tables Required</h3>
          <p>tblInstitutions, tblContactPersons, tblBandwidthPackages, tblServiceSubscriptions, tblPayments, tblInfrastructureRequirements, tblPCPurchases, tblLANPurchases, tblUpgrades, tblDisconnections, tblReconnections</p>
          
          <h3>Required Forms</h3>
          <p>Institution Registration Form, Payment Entry Form, Service Subscription Form, Reports Menu Form, Login Form, Main Dashboard</p>
          
          <h3>Required Queries</h3>
          <p>Registered institutions query, Defaulters report query, Disconnection issues query, Infrastructure requirements query, Total installation costs query, PC and LAN services costs query, Upgraded services charges query, Monthly charges by category query, Aggregate services per institution query</p>
          
          <h3>Required Reports</h3>
          <p>Registered Institutions Report, Defaulters Report, Disconnection Report, Infrastructure Requirements Report, Monthly Revenue Report, Institution Summary Report</p>
          
          <h3>Milestone 1 Documentation Requirements</h3>
          <p>Problem definition, existing system analysis, proposed system objectives, system flowcharts, data flow diagrams, entity relationship diagrams, table structures, form designs, report layouts</p>
          
          <h3>Milestone 2 Database Requirements</h3>
          <p>Minimum 5 tables with relationships, at least 4 forms with validation, at least 10 queries including calculations, professional reports, VBA code for automation, user manual</p>
          
          <h3>Contact Information</h3>
          <p>Phone: 0115475543, WhatsApp: +254115475543, Website: www.azaniispproject.co.ke, Email: hello@azaniispproject.co.ke, Location: Nairobi, Kenya</p>
          
          <h3>Keywords</h3>
          <p>KCSE 2026 Computer Project, Azani ISP, Azani Internet Service Provider Information System, KCSE 451/3, Computer Studies Project, Milestone 1, Milestone 2, MS Access Database, KNEC Project, Kenya Secondary School, Database Management System</p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default KnowledgeBank;
