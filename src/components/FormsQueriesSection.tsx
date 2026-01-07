import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { FormInput, Search, Filter, Settings2 } from "lucide-react";

const items = [
  {
    icon: FormInput,
    title: "Custom Forms",
    description: "User-friendly data entry forms with validation",
    features: ["Member registration", "Payment processing", "Activity booking"],
  },
  {
    icon: Search,
    title: "Select Queries",
    description: "Powerful queries for data retrieval",
    features: ["Member search", "Activity reports", "Payment history"],
  },
  {
    icon: Filter,
    title: "Parameter Queries",
    description: "Interactive queries with user input",
    features: ["Date range filters", "Category selection", "Status filters"],
  },
  {
    icon: Settings2,
    title: "Action Queries",
    description: "Automated data manipulation",
    features: ["Update records", "Append data", "Delete operations"],
  },
];

export function FormsQueriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="forms" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Forms & Queries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete set of forms and queries designed for club management operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                  <ul className="space-y-1">
                    {item.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
