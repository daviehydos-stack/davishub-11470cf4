import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Database, FolderOpen, Download, Calendar, Eye } from "lucide-react";
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

const FILE_TYPE_CONFIG = {
  document: { icon: FileText, label: "Documentation", color: "text-brand-cyan" },
  database: { icon: Database, label: "Database", color: "text-brand-purple" },
  full_project: { icon: FolderOpen, label: "Full Project", color: "text-brand-orange" },
} as const;

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
    await supabase
      .from('past_projects')
      .update({ download_count: project.download_count + 1 })
      .eq('id', project.id);

    const urlParts = project.download_url.split('/');
    const filename = decodeURIComponent(urlParts[urlParts.length - 1]);

    const link = document.createElement('a');
    link.href = project.download_url;
    link.download = filename;
    link.target = '_self';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projectsByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, PastProject[]>);

  const years = Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);

  if (loading) {
    return (
      <section id="past-projects" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-40 bg-muted rounded-xl" />
                ))}
              </div>
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
    <section id="past-projects" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-xs">
            <FolderOpen className="w-3 h-3 mr-1" />
            Past Projects Archive
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Download Past Project Files
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access previous years' KCSE Computer Studies project materials for reference and study.
            Learn from real exam-scoring projects.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          {years.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  KCSE {year} Projects
                </h3>
                <div className="flex-1 h-px bg-border" />
                <Badge variant="secondary" className="text-xs">
                  {projectsByYear[year].length} {projectsByYear[year].length === 1 ? 'file' : 'files'}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projectsByYear[year].map((project) => {
                  const config = FILE_TYPE_CONFIG[project.file_type as keyof typeof FILE_TYPE_CONFIG] || { icon: FileText, label: project.file_type, color: "text-primary" };
                  const Icon = config.icon;

                  return (
                    <div
                      key={project.id}
                      className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors">
                          <Icon className={`w-6 h-6 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm line-clamp-2 mb-1.5">
                            {project.title}
                          </h4>
                          <Badge variant="outline" className="text-[10px] mb-2">
                            {config.label}
                          </Badge>
                          {project.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>{project.download_count.toLocaleString()} downloads</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 text-xs text-primary hover:text-primary hover:bg-primary/10 font-medium"
                          onClick={() => handleDownload(project)}
                        >
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Download
                        </Button>
                      </div>
                    </div>
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
