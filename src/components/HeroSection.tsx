import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, Clock, FileText, ShoppingBag } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
export function HeroSection() {
  const { getDownloadUrl } = useSiteSettings();
  const downloadUrl = getDownloadUrl();
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              2026 KCSE COMPUTER STUDIES PROJECT (451/3)
            </span>
          </div>
          {/* H1 - Updated for SEO */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
            Azani Internet Service Provider Information System
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-muted-foreground font-normal">
              2026 KCSE Computer Studies Project (451/3)
            </span>
          </h1>
          {/* Subheadline */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Complete Azani <span className="text-accent font-semibold">ISP</span> Information System with full documentation and MS Access database.
            Get your project <strong className="text-foreground">Today</strong>.
            100% original work. Instant WhatsApp delivery.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base group">
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                Download Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary font-medium px-6 h-12">
              <a href="https://drive.google.com/file/d/1tJOqxy3ILXuOXDjJl2pkNklqHjmB_Iz5/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Question Paper
              </a>
            </Button>
            
              href="http://shop.azaniispproject.co.ke/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#7c3aed",
                border: "1.5px solid #7c3aed40",
                borderRadius: "20px",
                background: "#7c3aed08",
                textDecoration: "none",
                transition: "all 0.2s ease",
                animation: "shopPulse 2.5s ease-in-out infinite",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#7c3aed15";
                (e.currentTarget as HTMLElement).style.borderColor = "#7c3aed80";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#7c3aed08";
                (e.currentTarget as HTMLElement).style.borderColor = "#7c3aed40";
              }}
            >
              <style>{`
                @keyframes shopPulse {
                  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 #7c3aed20; }
                  50% { transform: scale(1.04); box-shadow: 0 0 0 6px #7c3aed00; }
                }
              `}</style>
              <ShoppingBag style={{ width: 13, height: 13 }} />
              Shop
            </a>
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
      </div>
    </section>
  );
}
