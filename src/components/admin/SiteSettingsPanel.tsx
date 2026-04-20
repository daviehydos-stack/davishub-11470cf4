import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Settings, MessageCircle, ShoppingCart, AlertTriangle, Clock, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  description: string | null;
}

type ForceMode = "schedule" | "whatsapp" | "shop";

export function SiteSettingsPanel({ refreshSession }: { refreshSession: () => void }) {
  const { refreshSettings } = useSiteSettings();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [switchingMode, setSwitchingMode] = useState<ForceMode | null>(null);
  const [forceMode, setForceMode] = useState<ForceMode>("schedule");
  const [whatsappNumber, setWhatsappNumber] = useState("+254115475543");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;
      setSettings(data || []);

      let resolvedMode: ForceMode = "schedule";
      data?.forEach((setting: SiteSetting) => {
        if (setting.setting_key === "force_mode") {
          if (["schedule", "whatsapp", "shop"].includes(setting.setting_value)) {
            resolvedMode = setting.setting_value as ForceMode;
          }
        }
        if (setting.setting_key === "whatsapp_number") {
          setWhatsappNumber(setting.setting_value);
        }
      });

      // Backwards compat: if force_mode missing, derive from old keys
      if (!data?.find(s => s.setting_key === "force_mode")) {
        const holiday = data?.find(s => s.setting_key === "holiday_mode")?.setting_value === "true";
        const redirect = data?.find(s => s.setting_key === "redirect_mode")?.setting_value;
        if (holiday) resolvedMode = "whatsapp";
        else if (redirect === "shop" || redirect === "whatsapp") resolvedMode = "schedule"; // default to schedule unless explicit
      }
      setForceMode(resolvedMode);
    } catch (err) {
      console.error("Error fetching settings:", err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const upsertSetting = async (key: string, value: string, description?: string) => {
    const existing = settings.find(s => s.setting_key === key);
    if (existing) {
      const { error } = await supabase
        .from("site_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("site_settings")
        .insert({ setting_key: key, setting_value: value, description: description || null });
      if (error) throw error;
    }
  };

  const handleSwitchMode = async (mode: ForceMode) => {
    if (mode === forceMode || switchingMode) return;
    refreshSession();
    setSwitchingMode(mode);
    try {
      await upsertSetting("force_mode", mode, "Site mode: schedule | whatsapp | shop");
      // Keep legacy keys in sync so any leftover code paths still work
      await upsertSetting("holiday_mode", mode === "whatsapp" ? "true" : "false", "Legacy: forces WhatsApp");
      await upsertSetting("redirect_mode", mode === "shop" ? "shop" : "whatsapp", "Legacy redirect mode");

      setForceMode(mode);
      await refreshSettings();
      await fetchSettings();

      const labels = {
        schedule: "⏰ Switched to Automatic Schedule",
        whatsapp: "💬 Switched to WhatsApp Only",
        shop: "🛒 Switched to Shop Only",
      };
      toast.success(labels[mode]);
    } catch (err) {
      console.error("Error switching mode:", err);
      toast.error("Failed to switch mode");
    } finally {
      setSwitchingMode(null);
    }
  };

  const handleSaveNumber = async () => {
    refreshSession();
    setSaving(true);
    try {
      await upsertSetting("whatsapp_number", whatsappNumber, "WhatsApp contact number");
      await refreshSettings();
      await fetchSettings();
      toast.success("WhatsApp number saved");
    } catch (err) {
      console.error("Error saving number:", err);
      toast.error("Failed to save number");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  const modes: Array<{
    key: ForceMode;
    title: string;
    desc: string;
    icon: typeof Clock;
    activeClasses: string;
    btnClasses: string;
  }> = [
    {
      key: "schedule",
      title: "Automatic Schedule",
      desc: "Site switches between Shop and WhatsApp based on the time of day (EAT).",
      icon: Clock,
      activeClasses: "border-blue-500 bg-blue-50/60 dark:bg-blue-950/30",
      btnClasses: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      key: "whatsapp",
      title: "WhatsApp Only",
      desc: "Force ALL site links to WhatsApp 24/7. Overrides the schedule.",
      icon: MessageCircle,
      activeClasses: "border-green-500 bg-green-50/60 dark:bg-green-950/30",
      btnClasses: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      key: "shop",
      title: "Shop Only",
      desc: "Force ALL site links to the Shop 24/7. Overrides the schedule.",
      icon: ShoppingCart,
      activeClasses: "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30",
      btnClasses: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
  ];

  const currentLabel = modes.find(m => m.key === forceMode)?.title ?? "—";

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Active mode banner */}
      <Card className="p-4 md:p-5 bg-primary/5 border-primary/30">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm md:text-base">
            <span className="text-muted-foreground">Active site mode:</span>{" "}
            <span className="font-bold text-foreground">{currentLabel}</span>
          </p>
        </div>
      </Card>

      {/* Mode selector — 3 cards */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="h-5 w-5 text-primary flex-shrink-0" />
          <h2 className="text-lg md:text-xl font-bold">Site Mode</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Choose how all download / order buttons across the entire site behave.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {modes.map(({ key, title, desc, icon: Icon, activeClasses, btnClasses }) => {
            const isActive = forceMode === key;
            const isSwitching = switchingMode === key;
            return (
              <div
                key={key}
                className={`rounded-xl border-2 p-4 transition-all ${
                  isActive ? activeClasses : "border-border bg-muted/20"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`h-7 w-7 ${isActive ? "" : "text-muted-foreground"}`} />
                  {isActive && (
                    <Badge className="bg-emerald-600 hover:bg-emerald-600 gap-1">
                      <Check className="h-3 w-3" /> Active
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground mb-4 min-h-[3rem]">{desc}</p>
                <Button
                  onClick={() => handleSwitchMode(key)}
                  disabled={isActive || !!switchingMode}
                  size="sm"
                  className={`w-full ${isActive ? "" : btnClasses}`}
                  variant={isActive ? "outline" : "default"}
                >
                  {isSwitching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Switching...
                    </>
                  ) : isActive ? (
                    "Currently Active"
                  ) : (
                    `Switch to ${title.split(" ")[0]}`
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Schedule reference (only useful when on Automatic) */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
          <h2 className="text-lg md:text-xl font-bold">Automatic Schedule (EAT)</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Used only when the active mode is <strong>Automatic Schedule</strong>.
        </p>
        <div className="space-y-3 text-xs md:text-sm">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="font-semibold mb-2">Monday – Friday</p>
            <div className="grid grid-cols-1 gap-1">
              <span>🛒 12am–4pm → Shop</span>
              <span>💬 4pm–7pm → WhatsApp</span>
              <span>🛒 7pm–12am → Shop</span>
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="font-semibold mb-2">Saturday</p>
            <div className="grid grid-cols-1 gap-1">
              <span>💬 12am–7am → WhatsApp</span>
              <span>🛒 7am–12pm → Shop</span>
              <span>💬 12pm–2pm → WhatsApp</span>
              <span>🛒 2pm–4pm → Shop</span>
              <span>💬 4pm–12am → WhatsApp</span>
            </div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="font-semibold mb-2">Sunday</p>
            <div className="grid grid-cols-1 gap-1">
              <span>💬 12am–9:30am → WhatsApp</span>
              <span>🛒 9:30am–12pm → Shop</span>
              <span>💬 12pm–2pm → WhatsApp</span>
              <span>🛒 2pm–4pm → Shop</span>
              <span>💬 4pm–12am → WhatsApp</span>
            </div>
          </div>
        </div>
      </Card>

      {/* WhatsApp Number */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
          <h2 className="text-lg md:text-xl font-bold">WhatsApp Number</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Contact Number</label>
            <Input
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+254115475543"
            />
            <p className="text-xs text-muted-foreground mt-1">Include country code (e.g. +254)</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
            <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              In WhatsApp mode, the footer displays this number. In Shop mode, no phone number appears.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSaveNumber}
          disabled={saving}
          className="mt-4 w-full sm:w-auto bg-brand-purple hover:bg-brand-purple-dark"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Number"}
        </Button>
      </Card>
    </div>
  );
}
