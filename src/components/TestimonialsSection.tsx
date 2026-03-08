import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Faith W.",
    school: "Kenya High School",
    year: "2024",
    quote:
      "The Victory School Club Membership System project was so well done. The MS Access database had all the forms, queries, and reports already built. My teacher accepted it on the first submission — I scored 36/40 on Milestone 2!",
    rating: 5,
  },
  {
    name: "Brian K.",
    school: "Mang'u High School",
    year: "2024",
    quote:
      "I got the Maringo Sports Club project and it was complete with ER diagrams, data flow diagrams, and system flowcharts. The documentation was professionally formatted and passed plagiarism checks perfectly.",
    rating: 5,
  },
  {
    name: "Grace M.",
    school: "Alliance Girls High School",
    year: "2024",
    quote:
      "The Victory School Club project had everything — from the problem statement to implementation. The normalization section and sample reports were exactly what KNEC expects. Scored an A in Paper 3!",
    rating: 5,
  },
  {
    name: "Kevin O.",
    school: "Nairobi School",
    year: "2023",
    quote:
      "The Maringo Sports Club database project saved me weeks of work. The video tutorials on YouTube helped me understand how everything works. When my examiner asked questions, I was fully prepared.",
    rating: 5,
  },
  {
    name: "Mercy N.",
    school: "Pangani Girls",
    year: "2023",
    quote:
      "I was worried about the project being too complex, but the documentation broke everything down clearly. The WhatsApp support team clarified every doubt I had about the Victory School Club system.",
    rating: 5,
  },
  {
    name: "James M.",
    school: "Starehe Boys Centre",
    year: "2023",
    quote:
      "The past project files were complete and perfectly formatted. My teacher used my Maringo Sports Club submission as a reference example for other students. Best investment I made for KCSE.",
    rating: 5,
  },
];

export function TestimonialsSection() {
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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="text-brand-pink font-medium text-sm uppercase tracking-wider">
            Student Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Join hundreds of{" "}
            <span className="gradient-text">success stories</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real students, real results. See why KCSE candidates trust us 
            with their Computer Studies projects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`glass rounded-2xl p-6 relative group transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-purple/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-orange fill-brand-orange" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed text-sm">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{testimonial.school}</span>
                    <Badge variant="outline" className="text-[10px] border-accent/30 text-accent px-1.5 py-0">
                      {testimonial.year}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
