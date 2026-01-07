-- Create table for past projects/files
CREATE TABLE public.past_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  file_type TEXT NOT NULL DEFAULT 'document', -- 'document', 'database', 'full_project'
  download_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.past_projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view published projects)
CREATE POLICY "Anyone can view published past projects" 
ON public.past_projects 
FOR SELECT 
USING (is_published = true);

-- Create policy for admin operations (using anon key for now since no auth)
CREATE POLICY "Allow all operations for past projects" 
ON public.past_projects 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_past_projects_updated_at
BEFORE UPDATE ON public.past_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();