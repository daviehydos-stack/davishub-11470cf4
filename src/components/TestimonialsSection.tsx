import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Faith W.",
    school: "Kenya High School",
    year: "2025",
    quote:
      "The Azani ISP project was well-structured and easy to follow. My teacher was impressed by the ER diagrams and the normalization section. I didn't have to redo anything — it was accepted on the first submission!",
    rating: 5,
  },
  {
    name: "Brian K.",
    school: "Mang'u High School",
    year: "2025",
    quote:
      "I received the complete package within minutes on WhatsApp. The MS Access database had all the forms, queries, and reports already built. It saved me weeks of work and I scored 38/40 on Milestone 2.",
    rating: 5,
  },
  {
    name: "Grace M.",
    school: "Alliance Girls High School",
    year: "2024",
    quote:
      "What stood out was how original the content was. I ran the documentation through plagiarism checkers and it passed perfectly. The data flow diagrams and system flowcharts were professionally done.",
    rating: 5,
  },
  {
    name: "Kevin O.",
    school: "Nairobi School",
    year: "2024",
    quote:
      "The video tutorials on the YouTube channel helped me understand how the database works. When my examiner asked questions during the practical, I was fully prepared. Scored an A in Paper 3!",
    rating: 5,
  },
  {
    name: "Mercy N.",
    school: "Pangani Girls",
    year: "2024",
    quote:
      "I was worried about the project being too complex, but the documentation broke everything down clearly — from the problem statement to implementation. The WhatsApp support team clarified every doubt I had.",
    rating: 5,
  },
  {
    name: "James M.",
    school: "Starehe Boys Centre",
    year: "2023",
    quote:
      "The Victory School Club project I got was complete and perfectly formatted. My teacher used it as a reference example for other students. Best investment I made for my KCSE preparation.",
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
