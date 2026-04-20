import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MessageCircle, Loader2, Repeat } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

type Mode = "shop" | "whatsapp";

export function RedirectModePanel({ refreshSession }: { refreshSession: () => void }) {
  const { refreshSettings } = useSiteSettings();
  const [mode, setMode] = useState<Mode>("shop");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMode();
  }, []);

  const fetchMode = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "redirect_mode")
        .maybeSingle();

      if (error) throw error;
      if (data?.setting_value === "whatsapp" || data?.setting_value === "shop") {
        setMode(data.setting_value);
      }
    } catch (err) {
      console.error("Error fetching redirect mode:", err);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = async (newMode: Mode) => {
    if (newMode === mode || saving) return;
    refreshSession();
    setSaving(true);

    try {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("setting_key", "redirect_mode")
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("site_settings")
          .update({ setting_value: newMode })
          .eq("setting_key", "redirect_mode");
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert({
            setting_key: "redirect_mode",
            setting_value: newMode,
            description: "Manual site-wide redirect mode (Shop or WhatsApp)",
          });
        if (error) throw error;
      }

      setMode(newMode);
      await refreshSettings();
      toast.success(
        newMode === "shop"
          ? "Switched to Shop mode 🛒"
          : "Switched to WhatsApp mode 💬"
      );
    } catch (err) {
      console.error("Error switching mode:", err);
      toast.error("Failed to switch mode");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  const toggleTo: Mode = mode === "shop" ? "whatsapp" : "shop";

  return (
    <Card className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Repeat className="h-6 w-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold">Site Redirect</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        One-click toggle for the entire site. Switches all download / order buttons between the Shop and WhatsApp.
      </p>

      <div className="rounded-xl border border-border p-5 bg-muted/30 mb-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Current mode</p>
        <div className="flex items-center gap-3">
          {mode === "shop" ? (
            <>
              <ShoppingCart className="h-7 w-7 text-emerald-600" />
              <div>
                <p className="text-lg font-bold">Shop</p>
                <p className="text-xs text-muted-foreground">All buttons send users to the shop</p>
              </div>
              <Badge className="ml-auto bg-emerald-600 hover:bg-emerald-600">Active</Badge>
            </>
          ) : (
            <>
              <MessageCircle className="h-7 w-7 text-green-600" />
              <div>
                <p className="text-lg font-bold">WhatsApp</p>
                <p className="text-xs text-muted-foreground">All buttons open WhatsApp chat</p>
              </div>
              <Badge className="ml-auto bg-green-600 hover:bg-green-600">Active</Badge>
            </>
          )}
        </div>
      </div>

      <Button
        onClick={() => switchMode(toggleTo)}
        disabled={saving}
        size="lg"
        className="w-full text-base font-semibold"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Switching...
          </>
        ) : toggleTo === "whatsapp" ? (
          <>
            <MessageCircle className="mr-2 h-5 w-5" />
            Switch to WhatsApp
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Switch to Shop
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Note: Holiday Mode (in Settings) overrides this and forces WhatsApp.
      </p>
    </Card>
  );
}
