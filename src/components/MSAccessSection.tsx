import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Database, Table2, FileSpreadsheet, Lock, Wifi, Users } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Database Design",
    description: "Properly normalized database for ISP operations management",
  },
  {
    icon: Wifi,
    title: "Network Management",
    description: "Complete modules for managing network infrastructure and services",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Customer registration, billing, and service plan tracking",
  },
  {
    icon: Lock,
    title: "Data Integrity",
    description: "Referential integrity and validation rules implemented",
  },
];

export function MSAccessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="database" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ISP Database System
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional database design for Internet Service Provider management with proper normalization and relationships.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 border border-border hover:border-brand-purple/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
