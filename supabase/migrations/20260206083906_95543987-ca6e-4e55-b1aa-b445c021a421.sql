-- Create comments table for blog posts and KCSE guides
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL CHECK (page_type IN ('blog', 'kcse_guide', 'discussion')),
  page_id TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_mobile TEXT,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create discussions table for community page
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_mobile TEXT,
  category TEXT DEFAULT 'General',
  reply_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_comments_page ON public.comments(page_type, page_id);
CREATE INDEX idx_comments_parent ON public.comments(parent_id);
CREATE INDEX idx_discussions_category ON public.discussions(category);
CREATE INDEX idx_discussions_created ON public.discussions(created_at DESC);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Comments policies - anyone can read approved comments
CREATE POLICY "Anyone can read approved comments"
ON public.comments FOR SELECT
USING (is_approved = true);

-- Anyone can insert comments
CREATE POLICY "Anyone can insert comments"
ON public.comments FOR INSERT
WITH CHECK (true);

-- Discussions policies - anyone can read approved discussions
CREATE POLICY "Anyone can read approved discussions"
ON public.discussions FOR SELECT
USING (is_approved = true);

-- Anyone can insert discussions
CREATE POLICY "Anyone can insert discussions"
ON public.discussions FOR INSERT
WITH CHECK (true);

-- Admin policies for moderation (allow all operations)
CREATE POLICY "Allow all operations on comments"
ON public.comments FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on discussions"
ON public.discussions FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussions_updated_at
BEFORE UPDATE ON public.discussions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for instant updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.discussions;