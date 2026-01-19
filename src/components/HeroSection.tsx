import { Button } from "@/components/ui/button";
import { ArrowRight, Users, FileCheck, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
export function HeroSection() {
  return <section className="relative py-16 md:py-24 overflow-hidden">

      {/* LCP-Optimized Hero Image */}
      <img src="/hero-background.webp" alt="Azani Internet Service Provider Project Background" className="absolute inset-0 w-full h-full object-cover" fetchpriority="high" loading="eager" width={1920} height={1080} />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              2026 KCSE COMPUTER STUDIES PROJECT
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
            Azani Internet Service Provider Project
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Azani ISP Information System with complete documentation and database.
            Get your project at <strong className="text-foreground">KES 500</strong>.
            100% original work. Instant delivery. Read free guides.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base group">
              <a href="#download">nGet Your Project — Ksh 500<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary font-medium px-6 h-12">
              <Link to="/blogs">Read Free Guides</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>
                <strong className="text-foreground">500+</strong> students served
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% original work</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Instant delivery</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{
            icon: FileCheck,
            label: "Full Documentation"
          }, {
            icon: FileCheck,
            label: "Database System"
          }, {
            icon: FileCheck,
            label: "Forms & Queries"
          }, {
            icon: FileCheck,
            label: "Sample Reports"
          }].map((item, i) => <div key={i} className="flex items-center gap-2 p-3 bg-card/80 backdrop-blur-sm border border-border rounded-lg">
                <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}