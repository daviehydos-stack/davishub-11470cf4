import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Download, FileText, Video, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: FileText,
    title: "KCSE Past Papers",
    description: "Computer Studies past papers with marking schemes",
    link: "#",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step MS Access tutorials for beginners",
    link: "#guides",
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Comprehensive notes covering the syllabus",
    link: "/blogs",
  },
  {
    icon: Download,
    title: "Sample Databases",
    description: "Practice with sample Access databases",
    link: "#",
  },
];

export function FreeResourcesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resources" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Free Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helpful resources to supplement your KCSE computer studies preparation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href={resource.link}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-xl p-6 border border-border hover:border-brand-cyan/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4 group-hover:bg-brand-cyan/20 transition-colors">
                <resource.icon className="w-6 h-6 text-brand-cyan" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
              <p className="text-muted-foreground text-sm">{resource.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button asChild variant="outline" size="lg">
            <a href="/blogs">View All Resources</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
