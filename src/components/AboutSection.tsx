import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Shield, Zap, BookOpen } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Original",
    description:
      "Every project is uniquely crafted. Zero plagiarism, guaranteed. We understand academic integrity matters.",
    gradient: "from-brand-purple to-brand-pink",
  },
  {
    icon: BookOpen,
    title: "Complete Documentation",
    description:
      "Full system analysis, design docs, implementation guides, and user manuals. Everything examiners expect.",
    gradient: "from-brand-cyan to-brand-purple",
  },
  {
    icon: Zap,
    title: "KCSE Aligned",
    description:
      "Built specifically for KCSE Computer Studies requirements. Meet every syllabus criterion with confidence.",
    gradient: "from-brand-orange to-brand-pink",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Built for students,{" "}
            <span className="gradient-text">by students</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We know what it takes to score top marks. Our materials are designed 
            by students who aced KCSE and understand exactly what examiners want.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                style={{ background: `linear-gradient(135deg, hsl(var(--brand-purple) / 0.2), hsl(var(--brand-cyan) / 0.2))` }}
              />
              <div className="glass rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-brand-purple/50">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Students Helped" },
            { value: "100%", label: "Original Work" },
            { value: "24/7", label: "WhatsApp Support" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}