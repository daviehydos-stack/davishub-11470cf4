import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Settings, ExternalLink, MessageCircle, ShoppingCart, AlertTriangle, Clock, PartyPopper, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  description: string | null;
}

export function SiteSettingsPanel({ refreshSession }: { refreshSession: () => void }) {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [redirectMode, setRedirectMode] = useState<"shop" | "whatsapp">("shop");
  const [whatsappNumber, setWhatsappNumber] = useState("+254115475543");
  const [holidayMode, setHolidayMode] = useState(false);
  const [forcingShop, setForcingShop] = useState(false);

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
      
      data?.forEach((setting: SiteSetting) => {
        if (setting.setting_key === "redirect_mode") {
          setRedirectMode(setting.setting_value as "shop" | "whatsapp");
        }
        if (setting.setting_key === "whatsapp_number") {
          setWhatsappNumber(setting.setting_value);
        }
        if (setting.setting_key === "holiday_mode") {
          setHolidayMode(setting.setting_value === "true");
        }
      });
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

  const handleSave = async () => {
    refreshSession();
    setSaving(true);

    try {
      await upsertSetting("redirect_mode", redirectMode, "Manual redirect mode override");
      await upsertSetting("whatsapp_number", whatsappNumber, "WhatsApp contact number");
      await upsertSetting("holiday_mode", holidayMode ? "true" : "false", "Holiday mode - forces WhatsApp across all pages");
      toast.success("Settings saved successfully!");
      fetchSettings();
    } catch (err) {
      console.error("Error saving settings:", err);
      toast.error("Failed to save settings");
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

  const handleForceShop = async () => {
    refreshSession();
    setForcingShop(true);
    try {
      // Turn OFF holiday mode AND set redirect_mode to shop
      await upsertSetting("holiday_mode", "false", "Holiday mode - forces WhatsApp across all pages");
      await upsertSetting("redirect_mode", "shop", "Manual redirect mode override");
      setHolidayMode(false);
      setRedirectMode("shop");
      toast.success("🛒 Site switched to Shop mode");
      fetchSettings();
    } catch (err) {
      console.error("Error forcing shop mode:", err);
      toast.error("Failed to switch to Shop");
    } finally {
      setForcingShop(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Force Shop Mode — quick action */}
      <Card className="p-4 md:p-6 border-2 border-emerald-400 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20">
        <div className="flex items-start gap-3 mb-4">
          <ShoppingCart className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-bold">Shop Mode (Quick Switch)</h2>
            <p className="text-sm text-muted-foreground mt-1">
              One-click to force the entire site to Shop mode. Turns off Holiday Mode and overrides the time schedule.
            </p>
          </div>
        </div>

        <Button
          onClick={handleForceShop}
          disabled={forcingShop}
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
        >
          {forcingShop ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Switching...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Switch Site to Shop Now
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Currently: <span className="font-semibold">{holidayMode ? "WhatsApp (Holiday)" : redirectMode === "shop" ? "Shop ✓" : "WhatsApp"}</span>
        </p>
      </Card>
      {/* Holiday Mode Card */}
      <Card className="p-4 md:p-6 border-2 border-dashed border-amber-400 dark:border-amber-600">
        <div className="flex items-start gap-3 mb-4">
          <PartyPopper className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-bold">Holiday Mode</h2>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, ALL links across the entire site redirect to WhatsApp — overrides the time-based schedule.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 md:p-4 bg-muted/50 rounded-lg">
          <Switch
            checked={holidayMode}
            onCheckedChange={(checked) => { refreshSession(); setHolidayMode(checked); }}
            className="data-[state=checked]:bg-amber-500"
          />
          <div>
            <p className="font-medium text-sm">
              {holidayMode ? "🎉 Holiday Mode is ON" : "Holiday Mode is OFF"}
            </p>
            <p className="text-xs text-muted-foreground">
              {holidayMode ? "All links go to WhatsApp now" : "Using automatic time-based schedule"}
            </p>
          </div>
        </div>
      </Card>

      {/* Time Schedule Info */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
          <h2 className="text-lg md:text-xl font-bold">Automatic Schedule (EAT)</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          The site automatically switches between Shop and WhatsApp based on this schedule. Holiday mode overrides this.
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
          <Settings className="h-5 w-5 text-primary flex-shrink-0" />
          <h2 className="text-lg md:text-xl font-bold">WhatsApp Settings</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">WhatsApp Number</label>
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
              When in WhatsApp mode, the footer shows your number. In Shop mode, no phone number appears on the site.
            </p>
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="mt-4 w-full sm:w-auto bg-brand-purple hover:bg-brand-purple-dark"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </Card>
    </div>
  );
}
