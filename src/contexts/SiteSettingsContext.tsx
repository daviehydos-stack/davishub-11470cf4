import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  redirectMode: "shop" | "whatsapp";
  whatsappNumber: string;
  isLoading: boolean;
}

interface SiteSettingsContextType extends SiteSettings {
  getDownloadUrl: () => string;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  redirectMode: "shop",
  whatsappNumber: "+254115475543",
  isLoading: true,
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  ...defaultSettings,
  getDownloadUrl: () => "https://shop.azaniispproject.co.ke/",
  refreshSettings: async () => {},
});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

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

  const getDownloadUrl = () => {
    if (settings.redirectMode === "whatsapp") {
      const cleanNumber = settings.whatsappNumber.replace(/\D/g, "");
      const message = encodeURIComponent("Hello, I am a Form Four student currently working on my KCSE 2026 Computer Studies Paper 3.\n\nKindly let me know the cost for a comprehensive Milestone 1, a complete Milestone 2, and the full project. Thank you.");
      return `https://wa.me/${cleanNumber}?text=${message}`;
    }
    return "https://shop.azaniispproject.co.ke/";
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        ...settings,
        getDownloadUrl,
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
