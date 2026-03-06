import { MessageCircle, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function WhatsAppButton() {
  const { getDownloadUrl, getActiveMode } = useSiteSettings();
  
  const activeMode = getActiveMode();
  const isWhatsAppMode = activeMode === "whatsapp";
  const href = isWhatsAppMode ? "https://wa.link/jox26j" : getDownloadUrl();
  const label = isWhatsAppMode ? "Chat on WhatsApp" : "Download Project";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
        isWhatsAppMode 
          ? "bg-green-500 hover:bg-green-600" 
          : "bg-primary hover:bg-primary/90"
      } text-primary-foreground`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      {isWhatsAppMode ? (
        <MessageCircle className="h-6 w-6" />
      ) : (
        <Download className="h-6 w-6" />
      )}
    </motion.a>
  );
}
