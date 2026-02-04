-- Create site_settings table for global configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings (needed for the site to function)
CREATE POLICY "Anyone can read site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Allow anyone to update settings (simple admin without auth)
CREATE POLICY "Anyone can update site settings" 
ON public.site_settings 
FOR UPDATE 
USING (true);

-- Allow insert for initial setup
CREATE POLICY "Anyone can insert site settings" 
ON public.site_settings 
FOR INSERT 
WITH CHECK (true);

-- Insert default settings
INSERT INTO public.site_settings (setting_key, setting_value, description)
VALUES 
  ('redirect_mode', 'shop', 'Where download links redirect: shop or whatsapp'),
  ('whatsapp_number', '+254115475543', 'WhatsApp number for direct contact');

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();