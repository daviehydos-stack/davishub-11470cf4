import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check } from "lucide-react";

const categories = [
  {
    title: "Complete Documentation",
    items: [
      "Project Overview & Introduction",
      "Problem Statement & Objectives",
      "System Analysis & Requirements",
      "System Design & Architecture",
      "Implementation Details",
      "Testing & Validation",
      "User Manual & Guide",
    ],
  },
  {
    title: "ISP Database Structure",
    items: [
      "Entity Relationship Diagrams",
      "Database Normalization (1NF, 2NF, 3NF)",
      "Customer & Service Tables",
      "Billing & Payment Records",
      "Network Infrastructure Tables",
      "Sample Data Records",
    ],
  },
  {
    title: "User Interface",
    items: [
      "Main Dashboard",
      "Customer Management Forms",
      "Service Plan Management",
      "Billing & Invoicing Forms",
      "Report Generation",
      "Input Validation",
    ],
  },
];

export function WhatsIncludedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="whats-included" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What's Included
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a complete and comprehensive ISP project submission.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
              className="bg-background rounded-xl p-6 border border-border"
            >
              <h3 className="font-semibold text-xl mb-4 text-brand-purple">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
