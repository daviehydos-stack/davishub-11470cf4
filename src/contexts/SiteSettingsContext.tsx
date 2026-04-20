import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type ForceMode = "schedule" | "whatsapp" | "shop";

interface SiteSettings {
  redirectMode: "shop" | "whatsapp"; // legacy compat
  whatsappNumber: string;
  holidayMode: boolean; // legacy compat
  forceMode: ForceMode;
  isLoading: boolean;
}

interface SiteSettingsContextType extends SiteSettings {
  getDownloadUrl: () => string;
  getActiveMode: () => "shop" | "whatsapp";
  refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  redirectMode: "shop",
  whatsappNumber: "+254115475543",
  holidayMode: false,
  forceMode: "schedule",
  isLoading: true,
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  ...defaultSettings,
  getDownloadUrl: () => "https://shop.azaniispproject.co.ke/",
  getActiveMode: () => "shop",
  refreshSettings: async () => {},
});

/**
 * Time-based schedule (EAT / UTC+3) — only used when forceMode === "schedule"
 */
function getScheduledMode(): "shop" | "whatsapp" {
  const now = new Date();
  const eatOffset = 3 * 60;
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const eatMinutes = (utcMinutes + eatOffset) % 1440;
  const eatHours = eatMinutes / 60;

  const utcDay = now.getUTCDay();
  const eatDay = (utcMinutes + eatOffset >= 1440) ? (utcDay + 1) % 7 : utcDay;

  if (eatDay >= 1 && eatDay <= 5) {
    if (eatHours >= 16 && eatHours < 19) return "whatsapp";
    return "shop";
  }

  if (eatDay === 6) {
    if (eatHours < 7) return "whatsapp";
    if (eatHours < 12) return "shop";
    if (eatHours < 14) return "whatsapp";
    if (eatHours < 16) return "shop";
    return "whatsapp";
  }

  if (eatHours < 9.5) return "whatsapp";
  if (eatHours < 12) return "shop";
  if (eatHours < 14) return "whatsapp";
  if (eatHours < 16) return "shop";
  return "whatsapp";
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [scheduledMode, setScheduledMode] = useState<"shop" | "whatsapp">(getScheduledMode());

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value");

      if (error) throw error;

      const map: Record<string, string> = {};
      data?.forEach((row: { setting_key: string; setting_value: string }) => {
        map[row.setting_key] = row.setting_value;
      });

      // Resolve forceMode (new) with backwards-compat fallback to old keys
      let forceMode: ForceMode = "schedule";
      if (map.force_mode === "schedule" || map.force_mode === "whatsapp" || map.force_mode === "shop") {
        forceMode = map.force_mode;
      } else if (map.holiday_mode === "true") {
        forceMode = "whatsapp";
      }

      setSettings({
        redirectMode: (map.redirect_mode as "shop" | "whatsapp") || "shop",
        whatsappNumber: map.whatsapp_number || "+254115475543",
        holidayMode: map.holiday_mode === "true",
        forceMode,
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching site settings:", err);
      setSettings((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Tick scheduled mode every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setScheduledMode(getScheduledMode());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getActiveMode = useCallback((): "shop" | "whatsapp" => {
    if (settings.forceMode === "shop") return "shop";
    if (settings.forceMode === "whatsapp") return "whatsapp";
    return scheduledMode;
  }, [settings.forceMode, scheduledMode]);

  const getDownloadUrl = useCallback(() => {
    const mode = getActiveMode();
    if (mode === "whatsapp") {
      const cleanNumber = settings.whatsappNumber.replace(/\D/g, "");
      const message = encodeURIComponent("Hello, I am a Form Four student currently working on my KCSE 2026 Computer Studies Paper 3.\n\nKindly let me know the cost for a comprehensive Milestone 1, a complete Milestone 2, and the full project. Thank you.");
      return `https://wa.me/${cleanNumber}?text=${message}`;
    }
    return "https://shop.azaniispproject.co.ke/";
  }, [getActiveMode, settings.whatsappNumber]);

  return (
    <SiteSettingsContext.Provider
      value={{
        ...settings,
        getDownloadUrl,
        getActiveMode,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

