import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Faith W.",
    school: "Kenya High School",
    year: "2024",
    quote:
      "I was stressed about my project until I found Victory. The documentation was so thorough that my teacher was impressed. Scored an A!",
    rating: 5,
  },
  {
    name: "Mark O.",
    school: "Nairobi School",
    year: "2024",
    quote:
      "The WhatsApp support is incredible. They answered all my questions, even at night before my deadline. Total lifesaver!",
    rating: 5,
  },
  {
    name: "Grace M.",
    school: "Alliance Girls",
    year: "2023",
    quote:
      "Zero plagiarism concerns. The project was 100% original and I understood everything because of the detailed explanations.",
    rating: 5,
  },
  {
    name: "David K.",
    school: "Starehe Boys",
    year: "2023",
    quote:
      "Best investment for my KCSE. The database design section alone taught me more than my entire term's lessons.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
          style={{ willChange: 'opacity, transform' }}
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
        </motion.div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 relative group"
              style={{ willChange: 'opacity, transform' }}
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
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{testimonial.school}</span>
                    <Badge variant="outline" className="text-xs border-brand-cyan/30 text-brand-cyan">
                      {testimonial.year}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
