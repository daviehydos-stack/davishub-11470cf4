import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Database, FolderOpen, Download, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PastProject {
  id: string;
  title: string;
  year: number;
  description: string | null;
  file_type: string;
  download_url: string;
  download_count: number;
}

const FILE_TYPE_ICONS = {
  document: FileText,
  database: Database,
  full_project: FolderOpen,
};

const FILE_TYPE_LABELS = {
  document: "Documentation",
  database: "Database",
  full_project: "Full Project",
};

export function PastProjectsSection() {
  const [projects, setProjects] = useState<PastProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('past_projects')
          .select('*')
          .eq('is_published', true)
          .order('year', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching past projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDownload = async (project: PastProject) => {
    // Increment download count
    await supabase
      .from('past_projects')
      .update({ download_count: project.download_count + 1 })
      .eq('id', project.id);

    // Check if it's an internal anchor link (like #download)
    if (project.download_url.includes('#')) {
      // Navigate to the anchor section
      window.location.href = project.download_url;
      return;
    }

    // Extract filename from URL
    const urlParts = project.download_url.split('/');
    const filename = decodeURIComponent(urlParts[urlParts.length - 1]);

    // Create invisible anchor and trigger download
    const link = document.createElement('a');
    link.href = project.download_url;
    link.download = filename;
    link.target = '_self';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, PastProject[]>);

  const years = Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);

  if (loading) {
    return (
      <section id="past-projects" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="past-projects" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <FolderOpen className="w-3 h-3 mr-1" />
            Past Projects Archive
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Download Past Project Files
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access previous years' KCSE Computer Studies project materials for reference and study.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {years.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {year} Projects
                </h3>
                <Badge variant="secondary" className="ml-auto">
                  {projectsByYear[year].length} files
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {projectsByYear[year].map((project) => {
                  const Icon = FILE_TYPE_ICONS[project.file_type as keyof typeof FILE_TYPE_ICONS] || FileText;
                  const typeLabel = FILE_TYPE_LABELS[project.file_type as keyof typeof FILE_TYPE_LABELS] || project.file_type;

                  return (
                    <Card
                      key={project.id}
                      className="p-4 hover:border-primary/30 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                            {project.title}
                          </h4>
                          <Badge variant="outline" className="text-xs mb-2">
                            {typeLabel}
                          </Badge>
                          {project.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {project.description}
                            </p>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-primary hover:text-primary"
                            onClick={() => handleDownload(project)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
