import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Users, Clock, Plus, Send, Loader2, Eye, MessageCircle, Pin, Search, ArrowRight, User } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CommentSection } from "@/components/comments/CommentSection";
interface Discussion {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string | null;
  reply_count: number;
  view_count: number;
  is_pinned: boolean;
  created_at: string;
}
const discussionSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
  content: z.string().trim().min(10, "Content must be at least 10 characters").max(5000),
  author_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  author_email: z.string().trim().email("Please enter a valid email"),
  author_mobile: z.string().optional(),
  category: z.string().optional()
});
const CATEGORIES = ["General", "Database Design", "MS Access", "Documentation", "Queries & SQL", "Forms & Reports", "Project Help"];
const Community = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_name: "",
    author_email: "",
    author_mobile: "",
    category: "General"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fetchDiscussions = async () => {
    try {
      let query = supabase.from('discussions').select('*').eq('is_approved', true).order('is_pinned', {
        ascending: false
      }).order('created_at', {
        ascending: false
      });
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      const {
        data,
        error
      } = await query;
      if (error) throw error;
      setDiscussions(data || []);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDiscussions();
    const channel = supabase.channel('discussions-realtime').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'discussions'
    }, () => fetchDiscussions()).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedCategory]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validation = discussionSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('discussions').insert({
        title: formData.title.trim(),
        content: formData.content.trim(),
        author_name: formData.author_name.trim(),
        author_email: formData.author_email.trim(),
        author_mobile: formData.author_mobile?.trim() || null,
        category: formData.category
      });
      if (error) throw error;
      toast({
        title: "Discussion created!",
        description: "Your question has been posted successfully."
      });
      setFormData({
        title: "",
        content: "",
        author_name: "",
        author_email: "",
        author_mobile: "",
        category: "General"
      });
      setShowNewDialog(false);
      fetchDiscussions();
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast({
        title: "Error",
        description: "Failed to create discussion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };
  const filteredDiscussions = discussions.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.content.toLowerCase().includes(searchQuery.toLowerCase()));
  if (selectedDiscussion) {
    return <div className="flex min-h-screen flex-col">
        <SEOHead title={`${selectedDiscussion.title} | Community`} description={selectedDiscussion.content.slice(0, 160)} />
        <Header />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={() => setSelectedDiscussion(null)} className="mb-6">
              ← Back to discussions
            </Button>

            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {selectedDiscussion.is_pinned && <Badge className="bg-primary text-primary-foreground">
                      <Pin className="w-3 h-3 mr-1" />
                      Pinned
                    </Badge>}
                  <Badge variant="secondary">{selectedDiscussion.category}</Badge>
                </div>
                
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {selectedDiscussion.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedDiscussion.author_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTimeAgo(selectedDiscussion.created_at)}
                  </div>
                </div>

                <p className="text-muted-foreground whitespace-pre-wrap">
                  {selectedDiscussion.content}
                </p>
              </div>

              <CommentSection pageType="discussion" pageId={selectedDiscussion.id} title="Replies" />
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>;
  }
  return <div className="flex min-h-screen flex-col">
      <SEOHead title="Community | KCSE Project Discussion" description="Join the KCSE Computer Studies project community. Ask questions, share knowledge, and get help from fellow students." keywords={["KCSE", "community", "discussion", "project help", "Computer Studies"]} />
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-8 md:py-12 border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Student Community</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Project Discussion</h1>
              <p className="text-muted-foreground mb-6">Ask questions, share knowledge, and connect with fellow students...</p>
              <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Start a Discussion
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Start a New Discussion</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input id="title" placeholder="What's your question or topic?" value={formData.title} onChange={e => setFormData({
                      ...formData,
                      title: e.target.value
                    })} className={errors.title ? "border-destructive" : ""} />
                      {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select id="category" value={formData.category} onChange={e => setFormData({
                      ...formData,
                      category: e.target.value
                    })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Details *</Label>
                      <Textarea id="content" placeholder="Describe your question in detail..." value={formData.content} onChange={e => setFormData({
                      ...formData,
                      content: e.target.value
                    })} className={`min-h-[120px] ${errors.content ? "border-destructive" : ""}`} />
                      {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="author_name">Your Name *</Label>
                        <Input id="author_name" placeholder="Your name" value={formData.author_name} onChange={e => setFormData({
                        ...formData,
                        author_name: e.target.value
                      })} className={errors.author_name ? "border-destructive" : ""} />
                        {errors.author_name && <p className="text-xs text-destructive">{errors.author_name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="author_email">Email *</Label>
                        <Input id="author_email" type="email" placeholder="your@email.com" value={formData.author_email} onChange={e => setFormData({
                        ...formData,
                        author_email: e.target.value
                      })} className={errors.author_email ? "border-destructive" : ""} />
                        {errors.author_email && <p className="text-xs text-destructive">{errors.author_email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author_mobile">Phone (optional)</Label>
                      <Input id="author_mobile" type="tel" placeholder="+254 7XX XXX XXX" value={formData.author_mobile} onChange={e => setFormData({
                      ...formData,
                      author_mobile: e.target.value
                    })} />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Posting...
                        </> : <>
                          <Send className="w-4 h-4 mr-2" />
                          Post Discussion
                        </>}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-4 border-b border-border bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search discussions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={selectedCategory === null ? "default" : "secondary"} className="cursor-pointer" onClick={() => setSelectedCategory(null)}>
                  All
                </Badge>
                {CATEGORIES.slice(0, 4).map(cat => <Badge key={cat} variant={selectedCategory === cat ? "default" : "secondary"} className="cursor-pointer" onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </Badge>)}
              </div>
            </div>
          </div>
        </section>

        {/* Discussions List */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {loading ? <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground mt-4">Loading discussions...</p>
                </div> : filteredDiscussions.length === 0 ? <div className="text-center py-12 bg-secondary/20 rounded-xl border border-dashed border-border">
                  <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-bold mb-2">No discussions yet</h2>
                  <p className="text-muted-foreground mb-4">
                    Be the first to start a conversation!
                  </p>
                  <Button onClick={() => setShowNewDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Button>
                </div> : <div className="space-y-3">
                  {filteredDiscussions.map((discussion, index) => <div key={discussion.id} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer animate-fade-in" style={{
                animationDelay: `${index * 50}ms`
              }} onClick={() => setSelectedDiscussion(discussion)}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {discussion.is_pinned && <Badge variant="outline" className="text-xs">
                                <Pin className="w-3 h-3 mr-1" />
                                Pinned
                              </Badge>}
                            <Badge variant="secondary" className="text-xs">
                              {discussion.category}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                            {discussion.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {discussion.content}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {discussion.author_name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTimeAgo(discussion.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {discussion.reply_count} replies
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>)}
                </div>}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                Need the complete project with all materials?
              </p>
              <Button asChild>
                <Link to="/#download">
                  Get Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>;
};
export default Community;