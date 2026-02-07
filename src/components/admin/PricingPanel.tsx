import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Loader2, Percent, Tag } from "lucide-react";

interface PricingPackage {
  id: string;
  package_key: string;
  milestone: string;
  title: string;
  default_price: number;
  current_price: number;
  description: string | null;
  features: string[];
  is_popular: boolean;
  offer_label: string | null;
  offer_active: boolean;
}

export function PricingPanel({ refreshSession }: { refreshSession: () => void }) {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_packages')
        .select('*')
        .order('default_price', { ascending: true });

      if (error) throw error;
      
      const formattedData = (data || []).map(pkg => ({
        ...pkg,
        features: Array.isArray(pkg.features) ? (pkg.features as string[]) : []
      })) as PricingPackage[];
      
      setPackages(formattedData);
    } catch (error) {
      console.error('Error fetching pricing packages:', error);
      toast.error('Failed to load pricing packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleUpdate = async (pkg: PricingPackage) => {
    refreshSession();
    setSaving(pkg.id);

    try {
      const { error } = await supabase
        .from('pricing_packages')
        .update({
          current_price: pkg.current_price,
          offer_label: pkg.offer_label || null,
          offer_active: pkg.offer_active,
          is_popular: pkg.is_popular,
        })
        .eq('id', pkg.id);

      if (error) throw error;
      toast.success(`${pkg.milestone} pricing updated!`);
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Failed to update pricing');
    } finally {
      setSaving(null);
    }
  };

  const updatePackage = (id: string, updates: Partial<PricingPackage>) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id ? { ...pkg, ...updates } : pkg
    ));
  };

  const calculateDiscount = (defaultPrice: number, currentPrice: number) => {
    if (currentPrice >= defaultPrice) return 0;
    return Math.round(((defaultPrice - currentPrice) / defaultPrice) * 100);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading pricing...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Pricing Management</h2>
        <p className="text-muted-foreground">
          Manage package prices and special offers. Changes reflect immediately on the website.
        </p>
      </div>

      <div className="space-y-6">
        {packages.map((pkg) => {
          const discount = calculateDiscount(pkg.default_price, pkg.current_price);
          
          return (
            <div
              key={pkg.id}
              className="p-6 border border-border rounded-xl bg-card/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{pkg.milestone}</h3>
                    {pkg.is_popular && (
                      <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                    )}
                    {pkg.offer_active && pkg.offer_label && (
                      <Badge variant="destructive">{pkg.offer_label}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Default: Ksh {pkg.default_price.toLocaleString()}</p>
                  {discount > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      -{discount}% off
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor={`price-${pkg.id}`} className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    Current Price (Ksh)
                  </Label>
                  <Input
                    id={`price-${pkg.id}`}
                    type="number"
                    value={pkg.current_price}
                    onChange={(e) => updatePackage(pkg.id, { current_price: parseInt(e.target.value) || 0 })}
                    min={0}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`offer-${pkg.id}`} className="flex items-center gap-1">
                    <Percent className="w-4 h-4" />
                    Offer Label
                  </Label>
                  <Input
                    id={`offer-${pkg.id}`}
                    placeholder="e.g., Holiday Sale 🎉"
                    value={pkg.offer_label || ''}
                    onChange={(e) => updatePackage(pkg.id, { offer_label: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Offer Active</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      checked={pkg.offer_active}
                      onCheckedChange={(checked) => updatePackage(pkg.id, { offer_active: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {pkg.offer_active ? 'Showing offer' : 'Hidden'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Most Popular</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      checked={pkg.is_popular}
                      onCheckedChange={(checked) => updatePackage(pkg.id, { is_popular: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {pkg.is_popular ? 'Highlighted' : 'Normal'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleUpdate(pkg)}
                  disabled={saving === pkg.id}
                  className="bg-primary hover:bg-primary/90"
                >
                  {saving === pkg.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
