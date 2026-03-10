
CREATE TABLE public.generated_articles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  category text DEFAULT 'Technology',
  meta_description text,
  keywords text[],
  is_published boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.generated_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles" ON public.generated_articles
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Service role can manage articles" ON public.generated_articles
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
