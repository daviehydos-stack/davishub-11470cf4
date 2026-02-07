-- Create pricing packages table for admin control
CREATE TABLE public.pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_key TEXT NOT NULL UNIQUE,
  milestone TEXT NOT NULL,
  title TEXT NOT NULL,
  default_price INTEGER NOT NULL,
  current_price INTEGER NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_popular BOOLEAN DEFAULT false,
  offer_label TEXT,
  offer_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pricing
CREATE POLICY "Anyone can read pricing packages"
ON public.pricing_packages
FOR SELECT
USING (true);

-- Allow anyone to update pricing (admin will use this)
CREATE POLICY "Anyone can update pricing packages"
ON public.pricing_packages
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow insert for initial setup
CREATE POLICY "Anyone can insert pricing packages"
ON public.pricing_packages
FOR INSERT
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_pricing_packages_updated_at
BEFORE UPDATE ON public.pricing_packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default packages
INSERT INTO public.pricing_packages (package_key, milestone, title, default_price, current_price, description, features, is_popular, offer_label, offer_active)
VALUES 
  ('milestone1', 'Milestone 1', 'Basic', 500, 500, 'Basic ISP system implementation with core features', '["Complete Documentation", "Project Overview", "Problem Statement", "System Design & Flow Designs", "User Interface"]'::jsonb, false, null, false),
  ('milestone2', 'Milestone 2', 'Advanced', 1000, 1000, 'Enhanced ISP system with additional features', '["Fully Customized Forms & Reports", "Data/Table Modeling", "Database Structure", "Query Processing", "Performance Optimization"]'::jsonb, true, null, false),
  ('complete', 'Complete Project', 'Full', 1400, 1400, 'Full ISP system with complete documentation', '["Fully Customized Forms & Reports", "Project Overview", "Documentation Clarity", "Performance Optimization", "WhatsApp Chat for Support"]'::jsonb, false, null, false);

-- Enable realtime for pricing packages
ALTER PUBLICATION supabase_realtime ADD TABLE public.pricing_packages;