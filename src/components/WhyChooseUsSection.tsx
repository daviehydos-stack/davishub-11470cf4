import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { CheckCircle2, Clock, Shield, Award, MessageCircle, FileCheck } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Top-Rated Quality",
    description: "Our ISP projects consistently score 90%+ marks in examinations",
  },
  {
    icon: Clock,
    title: "Instant Delivery",
    description: "Get your project immediately after payment via WhatsApp",
  },
  {
    icon: Shield,
    title: "100% Original",
    description: "Unique projects that pass all plagiarism checks",
  },
  {
    icon: FileCheck,
    title: "Complete Documentation",
    description: "Every section follows professional project guidelines",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Direct support for any questions or clarifications",
  },
  {
    icon: CheckCircle2,
    title: "Proven Results",
    description: "500+ students have successfully used our ISP projects",
  },
];

export function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by students across Kenya for quality computer studies ISP projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-background rounded-xl border border-border hover:border-brand-purple/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center shrink-0">
                <reason.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
