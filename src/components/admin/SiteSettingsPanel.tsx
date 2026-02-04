import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Settings, ExternalLink, MessageCircle, ShoppingCart } from "lucide-react";
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
      });
    } catch (err) {
      console.error("Error fetching settings:", err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    refreshSession();
    setSaving(true);

    try {
      // Update redirect_mode
      const { error: modeError } = await supabase
        .from("site_settings")
        .update({ setting_value: redirectMode })
        .eq("setting_key", "redirect_mode");

      if (modeError) throw modeError;

      // Update whatsapp_number
      const { error: numberError } = await supabase
        .from("site_settings")
        .update({ setting_value: whatsappNumber })
        .eq("setting_key", "whatsapp_number");

      if (numberError) throw numberError;

      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleRedirectMode = () => {
    refreshSession();
    setRedirectMode((prev) => (prev === "shop" ? "whatsapp" : "shop"));
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-brand-purple" />
        <h2 className="text-xl font-bold">Site Download Settings</h2>
      </div>

      <p className="text-muted-foreground mb-6">
        Control where all download/purchase links redirect. Switch between your shop website and WhatsApp.
      </p>

      {/* Current Mode Display */}
      <div className="bg-muted/50 p-6 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-lg mb-1">Redirect Mode</p>
            <p className="text-sm text-muted-foreground">
              All "Download Now" and pricing buttons will redirect to:
            </p>
          </div>
          <Badge 
            className={`text-base px-4 py-2 ${
              redirectMode === "shop" 
                ? "bg-blue-600 text-white" 
                : "bg-green-600 text-white"
            }`}
          >
            {redirectMode === "shop" ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop Website
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
          <div className="flex items-center gap-3 flex-1">
            <ShoppingCart className={`h-5 w-5 ${redirectMode === "shop" ? "text-blue-600" : "text-muted-foreground"}`} />
            <span className={redirectMode === "shop" ? "font-semibold" : "text-muted-foreground"}>
              Shop Website
            </span>
          </div>
          
          <Switch
            checked={redirectMode === "whatsapp"}
            onCheckedChange={toggleRedirectMode}
            className="data-[state=checked]:bg-green-600"
          />
          
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className={redirectMode === "whatsapp" ? "font-semibold" : "text-muted-foreground"}>
              WhatsApp
            </span>
            <MessageCircle className={`h-5 w-5 ${redirectMode === "whatsapp" ? "text-green-600" : "text-muted-foreground"}`} />
          </div>
        </div>
      </div>

      {/* Preview URLs */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className={`p-4 rounded-lg border-2 transition-all ${
          redirectMode === "shop" 
            ? "border-blue-600 bg-blue-50 dark:bg-blue-950" 
            : "border-muted"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="font-medium">Shop URL</span>
            {redirectMode === "shop" && (
              <Badge variant="outline" className="text-xs border-blue-600 text-blue-600">Active</Badge>
            )}
          </div>
          <a 
            href="https://shop.azaniispproject.co.ke/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            shop.azaniispproject.co.ke
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className={`p-4 rounded-lg border-2 transition-all ${
          redirectMode === "whatsapp" 
            ? "border-green-600 bg-green-50 dark:bg-green-950" 
            : "border-muted"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-4 w-4" />
            <span className="font-medium">WhatsApp Number</span>
            {redirectMode === "whatsapp" && (
              <Badge variant="outline" className="text-xs border-green-600 text-green-600">Active</Badge>
            )}
          </div>
          <Input
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="+254115475543"
            className="mt-2"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mb-6">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Note:</strong> When WhatsApp mode is active, the footer will also display your WhatsApp number 
          for direct contact. All "Download Now", "Order Now", and pricing buttons site-wide will redirect to WhatsApp.
        </p>
      </div>

      <Button 
        onClick={handleSave} 
        disabled={saving}
        className="bg-brand-purple hover:bg-brand-purple-dark"
      >
        <Save className="h-4 w-4 mr-2" />
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </Card>
  );
}
