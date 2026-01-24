import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, X, ExternalLink } from "lucide-react";

const videos = [
  {
    id: "Rhp84_oP6bU",
    title: "Getting Started",
    description: "Set up your project environment and understand the basics.",
    badge: "Beginner",
  },
   {
    id: "TMUg9BFWn_g",
    title: "Getting Started",
    description: "Set up your project environment and understand the basics.",
    badge: "New",
  },
  {
    id: "GMP0Fn3WJpk",
    title: "Database Design",
    description: "Master database structures and relationships for your project.",
    badge: "Core",
  },
  {
    id: "Zj57vFeaO-A",
    title: "KCSE Prep",
    description: "Prepare your project presentation for the exam.",
    badge: "Essential",
  },
];

export function GuidesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
    <section id="guides" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="text-brand-orange font-medium text-sm uppercase tracking-wider">
            Free Resources
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Learn from our{" "}
            <span className="gradient-text">video guides</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Free tutorials to help you understand your project. 
            Watch, learn, and ace your KCSE.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`glass rounded-2xl overflow-hidden group transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video">
                {activeVideo === video.id ? (
                  <div className="relative w-full h-full bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={`Microsoft Access Azani ISP ${video.title} Tutorial`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      width={480}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-brand-purple flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-3 left-3 bg-brand-purple/90 border-0">
                      {video.badge}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div
          className={`mt-16 max-w-2xl mx-auto transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">
              Join our WhatsApp community
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect with other KCSE students, get instant help, and share your progress.
            </p>
            <Button
              asChild
              className="bg-[hsl(142,76%,36%)] hover:bg-[hsl(142,76%,30%)] font-semibold"
            >
              <a
                href="https://chat.whatsapp.com/IO7QQrf6GH3IRHDMDAbNwm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join WhatsApp Group
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
