import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Loader2, Search, Mail, Phone, User, MessageSquare, Clock, ExternalLink } from "lucide-react";

interface Comment {
  id: string;
  page_type: string;
  page_id: string;
  author_name: string;
  author_email: string;
  author_mobile: string | null;
  content: string;
  is_approved: boolean | null;
  created_at: string;
  parent_id: string | null;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email: string;
  author_mobile: string | null;
  category: string | null;
  is_approved: boolean | null;
  is_pinned: boolean | null;
  created_at: string;
}

export function CommentsPanel({ refreshSession }: { refreshSession: () => void }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'comments' | 'discussions'>('comments');

  const fetchData = async () => {
    try {
      const [commentsRes, discussionsRes] = await Promise.all([
        supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('discussions')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (commentsRes.error) throw commentsRes.error;
      if (discussionsRes.error) throw discussionsRes.error;

      setComments(commentsRes.data || []);
      setDiscussions(discussionsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteComment = async (id: string) => {
    refreshSession();
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
      setComments(prev => prev.filter(c => c.id !== id));
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const handleDeleteDiscussion = async (id: string) => {
    refreshSession();
    if (!confirm('Are you sure you want to delete this discussion?')) return;

    try {
      // First delete all comments for this discussion
      await supabase.from('comments').delete().eq('page_id', id).eq('page_type', 'discussion');
      
      const { error } = await supabase.from('discussions').delete().eq('id', id);
      if (error) throw error;
      setDiscussions(prev => prev.filter(d => d.id !== id));
      toast.success('Discussion deleted');
    } catch (error) {
      console.error('Error deleting discussion:', error);
      toast.error('Failed to delete discussion');
    }
  };

  const handleTogglePin = async (id: string, currentPinned: boolean) => {
    refreshSession();
    try {
      const { error } = await supabase
        .from('discussions')
        .update({ is_pinned: !currentPinned })
        .eq('id', id);
      if (error) throw error;
      setDiscussions(prev => prev.map(d => d.id === id ? { ...d, is_pinned: !currentPinned } : d));
      toast.success(currentPinned ? 'Discussion unpinned' : 'Discussion pinned');
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Failed to update discussion');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredComments = comments.filter(c =>
    c.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.author_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscussions = discussions.filter(d =>
    d.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.author_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading comments...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Comments & Discussions</h2>
        <p className="text-muted-foreground">
          View all user-submitted comments and discussions. Access contact information for follow-up.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-secondary/30 rounded-lg text-center">
          <p className="text-2xl font-bold text-primary">{comments.length}</p>
          <p className="text-sm text-muted-foreground">Total Comments</p>
        </div>
        <div className="p-4 bg-secondary/30 rounded-lg text-center">
          <p className="text-2xl font-bold text-primary">{discussions.length}</p>
          <p className="text-sm text-muted-foreground">Total Discussions</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'comments' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('comments')}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Comments ({filteredComments.length})
        </Button>
        <Button
          variant={activeTab === 'discussions' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('discussions')}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Discussions ({filteredDiscussions.length})
        </Button>
      </div>

      {/* Comments Tab */}
      {activeTab === 'comments' && (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredComments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No comments found</p>
          ) : (
            filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 border border-border rounded-lg bg-card/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {comment.page_type}
                    </Badge>
                    {comment.parent_id && (
                      <Badge variant="secondary" className="text-xs">Reply</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-foreground line-clamp-3">{comment.content}</p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {comment.author_name}
                  </span>
                  <a
                    href={`mailto:${comment.author_email}`}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    {comment.author_email}
                  </a>
                  {comment.author_mobile && (
                    <a
                      href={`tel:${comment.author_mobile}`}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      {comment.author_mobile}
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(comment.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredDiscussions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No discussions found</p>
          ) : (
            filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="p-4 border border-border rounded-lg bg-card/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {discussion.category}
                    </Badge>
                    {discussion.is_pinned && (
                      <Badge className="bg-primary text-primary-foreground text-xs">Pinned</Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePin(discussion.id, discussion.is_pinned || false)}
                    >
                      {discussion.is_pinned ? 'Unpin' : 'Pin'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDiscussion(discussion.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h4 className="font-semibold text-foreground">{discussion.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{discussion.content}</p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {discussion.author_name}
                  </span>
                  <a
                    href={`mailto:${discussion.author_email}`}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    {discussion.author_email}
                  </a>
                  {discussion.author_mobile && (
                    <a
                      href={`tel:${discussion.author_mobile}`}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      {discussion.author_mobile}
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(discussion.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
}
