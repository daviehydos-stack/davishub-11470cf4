import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Save, X, Edit, Trash2, Eye, EyeOff, 
  FileText, Database, FolderOpen, ExternalLink 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PastProject {
  id: string;
  title: string;
  year: number;
  description: string | null;
  file_type: string;
  download_url: string;
  is_published: boolean;
  download_count: number;
  created_at: string;
}

const FILE_TYPES = [
  { value: "document", label: "Documentation", icon: FileText },
  { value: "database", label: "Database", icon: Database },
  { value: "full_project", label: "Full Project", icon: FolderOpen },
];

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export function PastProjectsPanel({ refreshSession }: { refreshSession: () => void }) {
  const [projects, setProjects] = useState<PastProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    description: "",
    file_type: "document",
    download_url: "",
    is_published: true,
  });

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('past_projects')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    refreshSession();

    if (!formData.title || !formData.download_url) {
      toast.error('Please fill in title and download URL');
      return;
    }

    setLoading(true);

    try {
      if (editing) {
        const { error } = await supabase
          .from('past_projects')
          .update({
            title: formData.title,
            year: formData.year,
            description: formData.description || null,
            file_type: formData.file_type,
            download_url: formData.download_url,
            is_published: formData.is_published,
          })
          .eq('id', editing);

        if (error) throw error;
        toast.success('Project updated');
      } else {
        const { error } = await supabase
          .from('past_projects')
          .insert({
            title: formData.title,
            year: formData.year,
            description: formData.description || null,
            file_type: formData.file_type,
            download_url: formData.download_url,
            is_published: formData.is_published,
          });

        if (error) throw error;
        toast.success('Project created');
      }

      resetForm();
      fetchProjects();
    } catch (err: any) {
      console.error('Error saving project:', err);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: PastProject) => {
    refreshSession();
    setFormData({
      title: project.title,
      year: project.year,
      description: project.description || "",
      file_type: project.file_type,
      download_url: project.download_url,
      is_published: project.is_published,
    });
    setEditing(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    refreshSession();

    try {
      const { error } = await supabase
        .from('past_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project');
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    refreshSession();
    try {
      const { error } = await supabase
        .from('past_projects')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(currentStatus ? 'Project hidden' : 'Project published');
      fetchProjects();
    } catch (err) {
      console.error('Error toggling status:', err);
      toast.error('Failed to update project');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      description: "",
      file_type: "document",
      download_url: "",
      is_published: true,
    });
  };

  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) acc[project.year] = [];
    acc[project.year].push(project);
    return acc;
  }, {} as Record<number, PastProject[]>);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Past Projects</h2>
          <p className="text-muted-foreground text-sm">
            Manage downloadable past project files for students
          </p>
        </div>
        {!showForm && (
          <Button 
            onClick={() => { setShowForm(true); refreshSession(); }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {editing ? "Edit Project" : "Add New Project"}
            </h3>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., KCSE 2024 Full Documentation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year *</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">File Type *</label>
                <select
                  value={formData.file_type}
                  onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  {FILE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Download URL *</label>
                <Input
                  value={formData.download_url}
                  onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this file"
                rows={2}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="project-published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="rounded border-input mr-2"
                />
                <label htmlFor="project-published" className="text-sm font-medium">
                  Published (visible on website)
                </label>
              </div>
              <div className="flex-1" />
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : editing ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading && !showForm ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8">
          <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No past projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.keys(projectsByYear)
            .map(Number)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline">{year}</Badge>
                  <span className="text-muted-foreground text-sm">
                    ({projectsByYear[year].length} files)
                  </span>
                </h3>
                <div className="space-y-2">
                  {projectsByYear[year].map((project) => {
                    const TypeIcon = FILE_TYPES.find(t => t.value === project.file_type)?.icon || FileText;
                    return (
                      <div 
                        key={project.id} 
                        className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                      >
                        <TypeIcon className="w-5 h-5 text-primary" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{project.title}</p>
                            <Badge variant={project.is_published ? "default" : "secondary"}>
                              {project.is_published ? "Live" : "Hidden"}
                            </Badge>
                          </div>
                          {project.description && (
                            <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Downloads: {project.download_count}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            asChild
                          >
                            <a href={project.download_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => togglePublished(project.id, project.is_published)}
                          >
                            {project.is_published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      )}
    </Card>
  );
}
