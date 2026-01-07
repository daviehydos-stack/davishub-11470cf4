import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trash2, Edit, Plus, ArrowLeft, Save, X, Eye, EyeOff, 
  Lock, LogOut, Upload, Search, Settings, FileText, ExternalLink, Play, Video, FolderOpen
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PastProjectsPanel } from "@/components/admin/PastProjectsPanel";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { toast } from "sonner";

const ADMIN_PASSWORD = "Davis";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const CATEGORIES = ["KCSE", "Programming", "Database", "Tips", "News", "Education", "Technology"];

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  is_published: boolean | null;
  is_draft: boolean | null;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

interface SEOSettings {
  id: string;
  page_path: string;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
  robots_directives: string | null;
}

const RichTextEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-input rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-muted/50 border-b border-input">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-secondary' : ''}
        >
          <strong>B</strong>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-secondary' : ''}
        >
          <em>I</em>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary' : ''}
        >
          H2
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary' : ''}
        >
          H3
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
        >
          • List
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-secondary' : ''}
        >
          1. List
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-secondary' : ''}
        >
          Quote
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          Table
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
        >
          +Col
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
        >
          +Row
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          className="text-destructive"
        >
          ×Table
        </Button>
      </div>
      <EditorContent
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror]:focus:outline-none"
      />
    </div>
  );
};

// SEO Settings Panel Component
const SEOSettingsPanel = ({ 
  seoSettings, 
  fetchSEOSettings,
  refreshSession,
  blogs 
}: { 
  seoSettings: SEOSettings[]; 
  fetchSEOSettings: () => Promise<void>;
  refreshSession: () => void;
  blogs: BlogPost[];
}) => {
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    meta_title: "",
    meta_description: "",
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
    keywords: "",
    robots_directives: "index, follow",
  });

  // Static pages + dynamic blog post pages
  const staticPages = [
    { path: "/", label: "Home Page" },
    { path: "/blogs", label: "Blog Listing" },
  ];
  
  const blogPages = blogs.map(blog => ({
    path: `/blogs/${blog.slug}`,
    label: `Blog: ${blog.title.substring(0, 40)}${blog.title.length > 40 ? '...' : ''}`
  }));

  const PAGE_PATHS = [...staticPages, ...blogPages];

  const getSettingsForPage = (path: string) => {
    return seoSettings.find(s => s.page_path === path);
  };

  const handleEditPage = (path: string) => {
    refreshSession();
    const existing = getSettingsForPage(path);
    if (existing) {
      setFormData({
        meta_title: existing.meta_title || "",
        meta_description: existing.meta_description || "",
        og_title: existing.og_title || "",
        og_description: existing.og_description || "",
        og_image: existing.og_image || "",
        canonical_url: existing.canonical_url || "",
        keywords: existing.keywords?.join(", ") || "",
        robots_directives: existing.robots_directives || "index, follow",
      });
    } else {
      setFormData({
        meta_title: "",
        meta_description: "",
        og_title: "",
        og_description: "",
        og_image: "",
        canonical_url: "",
        keywords: "",
        robots_directives: "index, follow",
      });
    }
    setEditingPage(path);
  };

  const handleSaveSEO = async () => {
    if (!editingPage) return;
    setLoading(true);
    refreshSession();

    const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
    const existing = getSettingsForPage(editingPage);

    try {
      if (existing) {
        const { error } = await supabase
          .from('seo_settings')
          .update({
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || null,
            og_title: formData.og_title || null,
            og_description: formData.og_description || null,
            og_image: formData.og_image || null,
            canonical_url: formData.canonical_url || null,
            keywords: keywordsArray.length > 0 ? keywordsArray : null,
            robots_directives: formData.robots_directives || "index, follow",
          })
          .eq('id', existing.id);

        if (error) throw error;
        toast.success('SEO settings updated');
      } else {
        const { error } = await supabase
          .from('seo_settings')
          .insert({
            page_path: editingPage,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || null,
            og_title: formData.og_title || null,
            og_description: formData.og_description || null,
            og_image: formData.og_image || null,
            canonical_url: formData.canonical_url || null,
            keywords: keywordsArray.length > 0 ? keywordsArray : null,
            robots_directives: formData.robots_directives || "index, follow",
          });

        if (error) throw error;
        toast.success('SEO settings created');
      }

      setEditingPage(null);
      fetchSEOSettings();
    } catch (err: any) {
      console.error('Error saving SEO settings:', err);
      toast.error('Failed to save SEO settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Page SEO Settings</h2>
      <p className="text-muted-foreground mb-6">
        Configure SEO settings for each page of your website.
      </p>

      {editingPage ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Editing: <span className="text-brand-purple">{editingPage}</span>
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setEditingPage(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <Input
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Page title for search engines (max 60 chars)"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.meta_title.length}/60</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Canonical URL</label>
              <Input
                value={formData.canonical_url}
                onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                placeholder="https://example.com/page"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <Textarea
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              placeholder="Brief description for search results (max 160 chars)"
              maxLength={160}
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1">{formData.meta_description.length}/160</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">OG Title</label>
              <Input
                value={formData.og_title}
                onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                placeholder="Title for social sharing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">OG Image URL</label>
              <Input
                value={formData.og_image}
                onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                placeholder="https://example.com/og-image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">OG Description</label>
            <Textarea
              value={formData.og_description}
              onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
              placeholder="Description for social sharing"
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Keywords</label>
              <Input
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Robots Directives</label>
              <select
                value={formData.robots_directives}
                onChange={(e) => setFormData({ ...formData, robots_directives: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="index, follow">index, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setEditingPage(null)}>
              Cancel
            </Button>
            <Button 
              className="bg-brand-purple hover:bg-brand-purple-dark"
              onClick={handleSaveSEO}
              disabled={loading}
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save SEO Settings'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {PAGE_PATHS.map(({ path, label }) => {
            const settings = getSettingsForPage(path);
            return (
              <div key={path} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{label}</p>
                  <p className="font-mono text-sm text-muted-foreground">{path}</p>
                </div>
                <Badge variant={settings ? "default" : "secondary"}>
                  {settings ? "Configured" : "Not Set"}
                </Badge>
                <Button size="sm" variant="ghost" onClick={() => handleEditPage(path)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

// Video Guides Panel Component
const VideoGuidesPanel = ({ refreshSession }: { refreshSession: () => void }) => {
  const [videos, setVideos] = useState([
    {
      id: "Rhp84_oP6bU",
      title: "Getting Started",
      description: "Set up your project environment and understand the basics.",
      badge: "Beginner",
    },
    {
      id: "GMP0Fn3WJpk",
      title: "Database Design",
      description: "Master database structures and relationships for your project.",
      badge: "Core",
    },
    {
      id: "Zj57vFeaO-A",
      title: "KCSE Prep",
      description: "Prepare your project presentation for the exam.",
      badge: "Essential",
    },
  ]);
  const [editingVideo, setEditingVideo] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    badge: "Beginner",
  });

  const BADGES = ["Beginner", "Core", "Essential", "Advanced", "New"];

  // Load videos from localStorage on mount
  useEffect(() => {
    const savedVideos = localStorage.getItem("admin-video-guides");
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, []);

  // Save videos to localStorage whenever they change
  const saveVideos = (newVideos: typeof videos) => {
    setVideos(newVideos);
    localStorage.setItem("admin-video-guides", JSON.stringify(newVideos));
    toast.success("Videos updated");
  };

  const handleEdit = (index: number) => {
    refreshSession();
    setFormData(videos[index]);
    setEditingVideo(index);
    setShowAddForm(false);
  };

  const handleAdd = () => {
    refreshSession();
    setFormData({ id: "", title: "", description: "", badge: "Beginner" });
    setShowAddForm(true);
    setEditingVideo(null);
  };

  const handleSave = () => {
    refreshSession();
    if (!formData.id || !formData.title) {
      toast.error("Please fill in YouTube ID and Title");
      return;
    }

    if (editingVideo !== null) {
      const newVideos = [...videos];
      newVideos[editingVideo] = formData;
      saveVideos(newVideos);
      setEditingVideo(null);
    } else if (showAddForm) {
      saveVideos([...videos, formData]);
      setShowAddForm(false);
    }
    setFormData({ id: "", title: "", description: "", badge: "Beginner" });
  };

  const handleDelete = (index: number) => {
    if (!confirm("Delete this video?")) return;
    refreshSession();
    const newVideos = videos.filter((_, i) => i !== index);
    saveVideos(newVideos);
  };

  const handleCancel = () => {
    setEditingVideo(null);
    setShowAddForm(false);
    setFormData({ id: "", title: "", description: "", badge: "Beginner" });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Video Guides</h2>
          <p className="text-muted-foreground text-sm">
            Manage the video tutorials shown in the "Learn from our video guides" section.
          </p>
        </div>
        {!showAddForm && editingVideo === null && (
          <Button onClick={handleAdd} className="bg-brand-purple hover:bg-brand-purple-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        )}
      </div>

      {(showAddForm || editingVideo !== null) && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg space-y-4">
          <h3 className="font-semibold">
            {editingVideo !== null ? "Edit Video" : "Add New Video"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">YouTube Video ID *</label>
              <Input
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="e.g., dQw4w9WgXcQ"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The ID from the YouTube URL (after v=)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Video title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge</label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                {BADGES.map((badge) => (
                  <option key={badge} value={badge}>{badge}</option>
                ))}
              </select>
            </div>
          </div>
          {formData.id && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img
                src={`https://img.youtube.com/vi/${formData.id}/mqdefault.jpg`}
                alt="Video thumbnail"
                className="rounded-lg w-48"
              />
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} className="bg-brand-purple hover:bg-brand-purple-dark">
              <Save className="mr-2 h-4 w-4" />
              Save Video
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {videos.map((video, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="w-24 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{video.title}</h4>
                <Badge variant="secondary">{video.badge}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{video.description}</p>
              <a 
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
              >
                <Play className="w-3 h-3" />
                Watch on YouTube
              </a>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => handleEdit(index)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Changes to video guides are saved locally. To make them appear on the website, 
          you'll need to update the GuidesSection component code with the new video IDs.
        </p>
      </div>
    </Card>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category: "KCSE",
    is_published: false,
    meta_title: "",
    meta_description: "",
    og_title: "",
    og_description: "",
    canonical_url: "",
    keywords: "",
  });

  // Session management
  useEffect(() => {
    const savedSession = localStorage.getItem("admin-session");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (Date.now() - session.timestamp < SESSION_TIMEOUT) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("admin-session");
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        const savedSession = localStorage.getItem("admin-session");
        if (savedSession) {
          const session = JSON.parse(savedSession);
          if (Date.now() - session.timestamp >= SESSION_TIMEOUT) {
            handleLogout();
            toast.error("Session expired. Please login again.");
          }
        }
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Lock timer
  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockTimer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (isLocked) {
      setLoginError(`Too many attempts. Wait ${lockTimer} seconds.`);
      return;
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin-session", JSON.stringify({ timestamp: Date.now() }));
      setPassword("");
      setLoginAttempts(0);
      toast.success("Welcome back, Admin!");
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setIsLocked(true);
        setLockTimer(300); // 5 minutes lockout
        setLoginError("Too many failed attempts. Locked for 5 minutes.");
      } else {
        setLoginError(`Invalid password. ${5 - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-session");
    toast.info("Logged out successfully");
  };

  const refreshSession = useCallback(() => {
    if (isAuthenticated) {
      localStorage.setItem("admin-session", JSON.stringify({ timestamp: Date.now() }));
    }
  }, [isAuthenticated]);

  // Fetch blogs from database
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSEOSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('page_path', { ascending: true });
      
      if (error) throw error;
      setSeoSettings(data || []);
    } catch (err) {
      console.error('Error fetching SEO settings:', err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
      fetchSEOSettings();
    }
  }, [isAuthenticated, fetchBlogs, fetchSEOSettings]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    refreshSession();

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, featured_image: publicUrl });
      toast.success('Image uploaded successfully');
    } catch (err) {
      console.error('Error uploading image:', err);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    refreshSession();

    if (!formData.title || !formData.excerpt || !formData.content) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const slug = generateSlug(formData.title);
    const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
    
    // Auto-generate canonical URL if not provided
    const canonicalUrl = formData.canonical_url || `https://kcse.lovable.app/blogs/${slug}`;

    try {
      if (editing) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: formData.title,
            slug,
            content: formData.content,
            excerpt: formData.excerpt,
            featured_image: formData.featured_image || null,
            category: formData.category,
            is_published: formData.is_published,
            is_draft: !formData.is_published,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || formData.excerpt || null,
            og_title: formData.og_title || formData.title || null,
            og_description: formData.og_description || formData.excerpt || null,
            og_image: formData.featured_image || null,
            canonical_url: canonicalUrl,
            keywords: keywordsArray.length > 0 ? keywordsArray : null,
            published_at: formData.is_published ? new Date().toISOString() : null,
          })
          .eq('id', editing);

        if (error) throw error;
        toast.success('Post updated successfully');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: formData.title,
            slug,
            content: formData.content,
            excerpt: formData.excerpt,
            featured_image: formData.featured_image || null,
            category: formData.category,
            is_published: formData.is_published,
            is_draft: !formData.is_published,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || formData.excerpt || null,
            og_title: formData.og_title || formData.title || null,
            og_description: formData.og_description || formData.excerpt || null,
            og_image: formData.featured_image || null,
            canonical_url: canonicalUrl,
            keywords: keywordsArray.length > 0 ? keywordsArray : null,
            published_at: formData.is_published ? new Date().toISOString() : null,
          });

        if (error) throw error;
        toast.success('Post created successfully');
      }

      resetForm();
      fetchBlogs();
    } catch (err: any) {
      console.error('Error saving post:', err);
      setError(err.message || 'Failed to save post');
      toast.error('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    refreshSession();
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featured_image: blog.featured_image || "",
      category: blog.category || "KCSE",
      is_published: blog.is_published || false,
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      og_title: blog.og_title || "",
      og_description: blog.og_description || "",
      canonical_url: blog.canonical_url || "",
      keywords: blog.keywords?.join(", ") || "",
    });
    setEditing(blog.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    refreshSession();

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Post deleted successfully');
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean | null) => {
    refreshSession();
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          is_published: !currentStatus,
          is_draft: currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;
      toast.success(currentStatus ? 'Post unpublished' : 'Post published');
      fetchBlogs();
    } catch (err) {
      console.error('Error toggling publish status:', err);
      toast.error('Failed to update post');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      featured_image: "",
      category: "KCSE",
      is_published: false,
      meta_title: "",
      meta_description: "",
      og_title: "",
      og_description: "",
      canonical_url: "",
      keywords: "",
    });
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-muted/30">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24 pb-8">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-brand-purple" />
              </div>
              <h1 className="text-2xl font-bold">Admin Login</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Enter your password to access the dashboard
              </p>
            </div>

            {loginError && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                  className="text-center text-lg h-12"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-purple hover:bg-brand-purple-dark"
                disabled={isLocked}
              >
                {isLocked ? `Locked (${lockTimer}s)` : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button asChild variant="link">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />
      <main className="flex-1 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage blog posts and SEO settings</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Past Projects
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Video Guides
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                SEO Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <PastProjectsPanel refreshSession={refreshSession} />
            </TabsContent>

            <TabsContent value="posts">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                {!showForm && (
                  <Button
                    onClick={() => { setShowForm(true); refreshSession(); }}
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                )}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {showForm && (
                <Card className="p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">
                      {editing ? "Edit Post" : "Create New Post"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={resetForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Blog post title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Excerpt *</label>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Brief summary of the post"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Content *</label>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports copy-paste from ChatGPT and other tools with formatting preserved.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Featured Image</label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.featured_image}
                          onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                          placeholder="Image URL or upload"
                          className="flex-1"
                        />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Button type="button" variant="outline" disabled={uploadingImage} asChild>
                            <span>
                              {uploadingImage ? (
                                "Uploading..."
                              ) : (
                                <>
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload
                                </>
                              )}
                            </span>
                          </Button>
                        </label>
                      </div>
                      {formData.featured_image && (
                        <div className="mt-2">
                          <img
                            src={formData.featured_image}
                            alt="Preview"
                            className="h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        SEO Settings
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Meta Title</label>
                          <Input
                            value={formData.meta_title}
                            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                            placeholder="SEO title (max 60 chars)"
                            maxLength={60}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Canonical URL</label>
                          <Input
                            value={formData.canonical_url}
                            onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                            placeholder="https://example.com/page"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Meta Description</label>
                          <Textarea
                            value={formData.meta_description}
                            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                            placeholder="SEO description (max 160 chars)"
                            maxLength={160}
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">OG Title</label>
                          <Input
                            value={formData.og_title}
                            onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                            placeholder="Open Graph title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Keywords</label>
                          <Input
                            value={formData.keywords}
                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            placeholder="keyword1, keyword2, keyword3"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">OG Description</label>
                          <Textarea
                            value={formData.og_description}
                            onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                            placeholder="Open Graph description"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="published"
                          checked={formData.is_published}
                          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                          className="rounded border-input mr-2"
                        />
                        <label htmlFor="published" className="text-sm font-medium">
                          Publish this post
                        </label>
                      </div>
                      <div className="flex-1" />
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-brand-purple hover:bg-brand-purple-dark"
                        disabled={loading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? 'Saving...' : editing ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              <div className="space-y-4">
                <h2 className="text-xl font-bold">All Posts ({filteredBlogs.length})</h2>
                
                {loading && !showForm ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">Loading posts...</p>
                  </Card>
                ) : filteredBlogs.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {searchTerm ? 'No posts match your search.' : 'No blog posts yet. Create your first post!'}
                    </p>
                  </Card>
                ) : (
                  filteredBlogs.map((blog) => (
                    <Card key={blog.id} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          {blog.featured_image && (
                            <img
                              src={blog.featured_image}
                              alt={blog.title}
                              className="w-20 h-20 object-cover rounded-lg shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg font-semibold">{blog.title}</h3>
                              <Badge variant={blog.is_published ? "default" : "secondary"}>
                                {blog.is_published ? "Published" : "Draft"}
                              </Badge>
                              <Badge variant="outline">{blog.category}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{blog.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                              {blog.meta_title && <span className="text-green-600">✓ SEO</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {blog.is_published && (
                            <Button
                              size="icon"
                              variant="ghost"
                              asChild
                              title="View post"
                            >
                              <Link to={`/blogs/${blog.slug}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => togglePublished(blog.id, blog.is_published)}
                            title={blog.is_published ? "Unpublish" : "Publish"}
                          >
                            {blog.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(blog)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <VideoGuidesPanel refreshSession={refreshSession} />
            </TabsContent>

            <TabsContent value="seo">
              <SEOSettingsPanel 
                seoSettings={seoSettings} 
                fetchSEOSettings={fetchSEOSettings}
                refreshSession={refreshSession}
                blogs={blogs}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
