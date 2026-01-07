import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-cyan font-medium text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Questions?{" "}
            <span className="gradient-text">We're here to help</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Reach out anytime. We typically respond within a few hours.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold mb-6">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="bg-secondary/50 border-border/50 focus:border-brand-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="bg-secondary/50 border-border/50 focus:border-brand-purple"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@school.ac.ke" 
                    className="bg-secondary/50 border-border/50 focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project needs..."
                    rows={4}
                    className="bg-secondary/50 border-border/50 focus:border-brand-purple"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark font-semibold"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-brand-purple/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp (Fastest)</h3>
                <p className="text-sm text-muted-foreground">+254 700 000 000</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-brand-purple/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">hello@victoryproject.co.ke</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 group hover:border-brand-purple/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Support Hours</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-foreground">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground">WhatsApp only</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}