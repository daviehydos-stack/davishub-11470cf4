import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Database, 
  FileText, 
  Search, 
  BarChart, 
  Layout,
  ClipboardList,
  Users,
  Calendar
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Database Tables",
    description: "4+ properly normalized tables with relationships - Students, Clubs, Memberships, Activities",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    icon: Layout,
    title: "Custom Forms",
    description: "User-friendly data entry forms with navigation, validation, and professional styling",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
  },
  {
    icon: Search,
    title: "Queries & Parameters",
    description: "5+ queries including parameter queries for dynamic data retrieval",
    color: "text-brand-pink",
    bg: "bg-brand-pink/10",
  },
  {
    icon: BarChart,
    title: "Professional Reports",
    description: "3+ formatted reports with grouping, sorting, and calculated summaries",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
  {
    icon: FileText,
    title: "Complete Documentation",
    description: "Full project documentation from problem statement to user manual - exam ready",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: ClipboardList,
    title: "System Analysis",
    description: "ERD diagrams, data dictionary, DFDs, and system flow charts included",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Club Membership Tracking",
    description: "Track student enrollments, roles, and membership status across all clubs",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Calendar,
    title: "Activity Management",
    description: "Record and report on club activities, events, and student participation",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export function ProjectFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-brand-purple font-medium text-sm uppercase tracking-wider">
            What's Included
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Victory School Club{" "}
            <span className="gradient-text">Membership System</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            The complete KCSE 2025/2026 Computer Studies project with all components 
            required by KNEC. Ready for submission and built to score maximum marks.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass rounded-xl p-5 hover:border-brand-purple/50 transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
