import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, Database, Wifi } from "lucide-react";

const packages = [
  {
    milestone: "Milestone 1",
    title: "Basic",
    price: "500",
    description: "Basic ISP system implementation with core features",
    features: [
      "Complete Documentation",
      "Project Overview",
      "Problem Statement",
      "System Design & Flow Designs",
      "User Interface",
    ],
    popular: false,
  },
  {
    milestone: "Milestone 2",
    title: "Advanced",
    price: "1,000",
    description: "Enhanced ISP system with additional features",
    features: [
      "Fully Customized Forms & Reports",
      "Data/Table Modeling",
      "Database Structure",
      "Query Processing",
      "Performance Optimization",
    ],
    popular: true,
  },
  {
    milestone: "Complete Project",
    title: "Full",
    price: "1,400",
    description: "Full ISP system with complete documentation",
    features: [
      "Fully Customized Forms & Reports",
      "Project Overview",
      "Documentation Clarity",
      "Performance Optimization",
      "WhatsApp Chat for Support",
    ],
    popular: false,
  },
];

const highlights = [
  {
    icon: FileText,
    title: "Complete Documentation",
    description: "Comprehensive ISP documentation that meets all project requirements, including system analysis, design, and implementation details.",
  },
  {
    icon: Database,
    title: "Database Structure",
    description: "Well-designed database with proper relationships, normalization, and optimized queries for efficient ISP data management.",
  },
  {
    icon: Wifi,
    title: "Network Management",
    description: "Complete modules for customer management, billing, service plans, and network infrastructure tracking.",
  },
];

export function DownloadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="download" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Choose your{" "}
            <span className="gradient-text">success package</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Invest in your future. All packages include professionally designed ISP materials 
            and expert support to help you score top marks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-20">
          {packages.map((pkg, index) => (
            <div
              key={pkg.title}
              className={`relative rounded-2xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              } ${
                pkg.popular
                  ? "bg-gradient-to-br from-brand-purple to-brand-pink p-[2px]"
                  : "border border-border"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-brand-orange text-white border-0 font-semibold px-4">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className={`rounded-2xl p-8 h-full bg-card`}>
                <div className="mb-4">
                  <span className="text-brand-purple font-medium text-sm">
                    {pkg.milestone}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-2">
                  {pkg.title}
                </h3>
                
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Ksh. </span>
                  <span className="font-display text-3xl font-bold">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground text-sm">/copy</span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">
                  {pkg.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={`w-5 h-5 flex-shrink-0 ${pkg.popular ? "text-brand-cyan" : "text-brand-purple"}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  asChild
                  className={`w-full font-semibold ${
                    pkg.popular
                      ? "bg-brand-purple hover:bg-brand-purple-dark"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  <a
                    href="https://wa.link/4mq5mb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div
          className={`grid gap-8 md:grid-cols-3 max-w-5xl mx-auto transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {highlights.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-brand-purple" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-8 text-center transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-5 h-5 text-brand-cyan" />
            Secure Payment
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-5 h-5 text-brand-cyan" />
            Instant Delivery
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-5 h-5 text-brand-cyan" />
            Money-back Guarantee
          </div>
        </div>
      </div>
    </section>
  );
}
