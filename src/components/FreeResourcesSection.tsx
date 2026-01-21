import { useRef, useEffect, useState } from "react";
import { Download, FileText, Video, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: FileText,
    title: "KCSE Past Papers",
    description: "Computer Studies past papers with marking schemes",
    link: "#",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step MS Access tutorials for beginners",
    link: "#guides",
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Comprehensive notes covering the syllabus",
    link: "/blogs",
  },
  {
    icon: Download,
    title: "Sample Databases",
    description: "Practice with sample Access databases",
    link: "#",
  },
];

export function FreeResourcesSection() {
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
      { rootMargin: "-100px" }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="resources" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Free Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helpful resources to supplement your KCSE computer studies preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <a
              key={resource.title}
              href={resource.link}
              className={`group bg-background rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <resource.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
              <p className="text-muted-foreground text-sm">{resource.description}</p>
            </a>
          ))}
        </div>

        <div
          className={`text-center mt-10 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <Button asChild variant="outline" size="lg">
            <a href="/blogs">View All Resources</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
