import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { FileText, BarChart3, Users, CreditCard } from "lucide-react";

const reports = [
  {
    icon: Users,
    title: "Member Reports",
    description: "Comprehensive member listings with activity status",
    color: "brand-purple",
  },
  {
    icon: CreditCard,
    title: "Payment Reports",
    description: "Detailed payment records and outstanding balances",
    color: "brand-cyan",
  },
  {
    icon: BarChart3,
    title: "Activity Reports",
    description: "Club activity participation and attendance tracking",
    color: "brand-orange",
  },
  {
    icon: FileText,
    title: "Summary Reports",
    description: "Executive summaries with key metrics and statistics",
    color: "brand-pink",
  },
];

export function SampleReportsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reports" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Sample Reports
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional reports generated from the database, showcasing proper formatting and data presentation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-xl p-6 border border-border hover:border-brand-purple/50 transition-all hover:shadow-lg cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg bg-${report.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <report.icon className={`w-6 h-6 text-${report.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
              <p className="text-muted-foreground text-sm">{report.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
