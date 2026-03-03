import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function CtaSection() {
  const { getDownloadUrl } = useSiteSettings();
  const downloadUrl = getDownloadUrl();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-pink to-brand-orange opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Limited offer for KCSE 2026</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to ace your project?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join 500+ students who scored top marks. Get your project today 
            and start preparing for KCSE success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-purple hover:bg-white/90 font-semibold px-8 h-14 text-lg group"
            >
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                Download Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 h-14 text-lg"
            >
              <a
                href="https://shop.azaniispproject.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Our Shop
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
