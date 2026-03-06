import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  redirectMode: "shop" | "whatsapp";
  whatsappNumber: string;
  holidayMode: boolean;
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
  isLoading: true,
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  ...defaultSettings,
  getDownloadUrl: () => "https://shop.azaniispproject.co.ke/",
  getActiveMode: () => "shop",
  refreshSettings: async () => {},
});

/**
 * Time-based schedule (EAT / UTC+3):
 * WEEKDAYS (Mon-Fri):
 *   00:00–16:00 → shop
 *   16:00–19:00 → whatsapp
 *   19:00–00:00 → shop
 *
 * SATURDAY:
 *   00:00–07:00 → whatsapp
 *   07:00–12:00 → shop
 *   12:00–14:00 → whatsapp
 *   14:00–16:00 → shop
 *   16:00–00:00 (Sun) → whatsapp (handled as sat 16-24)
 *
 * SUNDAY:
 *   00:00–09:30 → whatsapp (carried from sat)
 *   09:30–12:00 → shop
 *   12:00–14:00 → whatsapp
 *   14:00–16:00 → shop
 *   16:00–00:00 → whatsapp
 */
function getScheduledMode(): "shop" | "whatsapp" {
  // Get current time in EAT (UTC+3)
  const now = new Date();
  const eatOffset = 3 * 60; // minutes
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const eatMinutes = (utcMinutes + eatOffset) % 1440;
  const eatHours = eatMinutes / 60;

  // Get EAT day of week (0=Sun, 6=Sat)
  const utcDay = now.getUTCDay();
  const eatDay = (utcMinutes + eatOffset >= 1440) ? (utcDay + 1) % 7 : utcDay;

  // Weekdays: Mon(1) - Fri(5)
  if (eatDay >= 1 && eatDay <= 5) {
    if (eatHours >= 16 && eatHours < 19) return "whatsapp";
    return "shop";
  }

  // Saturday (6)
  if (eatDay === 6) {
    if (eatHours < 7) return "whatsapp";
    if (eatHours < 12) return "shop";
    if (eatHours < 14) return "whatsapp";
    if (eatHours < 16) return "shop";
    return "whatsapp"; // 16:00 onwards
  }

  // Sunday (0)
  if (eatHours < 9.5) return "whatsapp";
  if (eatHours < 12) return "shop";
  if (eatHours < 14) return "whatsapp";
  if (eatHours < 16) return "shop";
  return "whatsapp"; // 16:00 onwards
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

      const settingsMap: Record<string, string> = {};
      data?.forEach((row: { setting_key: string; setting_value: string }) => {
        settingsMap[row.setting_key] = row.setting_value;
      });

      setSettings({
        redirectMode: (settingsMap.redirect_mode as "shop" | "whatsapp") || "shop",
        whatsappNumber: settingsMap.whatsapp_number || "+254115475543",
        holidayMode: settingsMap.holiday_mode === "true",
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

  // Update scheduled mode every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setScheduledMode(getScheduledMode());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getActiveMode = useCallback((): "shop" | "whatsapp" => {
    // Holiday mode overrides everything → always whatsapp
    if (settings.holidayMode) return "whatsapp";
    // Otherwise use time-based schedule
    return scheduledMode;
  }, [settings.holidayMode, scheduledMode]);

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
