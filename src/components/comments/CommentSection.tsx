import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { MessageSquare, Loader2 } from "lucide-react";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  replies?: Comment[];
}

interface CommentSectionProps {
  pageType: 'blog' | 'kcse_guide' | 'discussion';
  pageId: string;
  title?: string;
}

export const CommentSection = ({ pageType, pageId, title = "Discussion" }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('page_type', pageType)
        .eq('page_id', pageId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Build threaded comments
      const commentMap = new Map<string, Comment>();
      const rootComments: Comment[] = [];

      (data || []).forEach((c) => {
        commentMap.set(c.id, { ...c, replies: [] });
      });

      commentMap.forEach((comment) => {
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(comment);
          }
        } else {
          rootComments.push(comment);
        }
      });

      // Sort root comments newest first
      rootComments.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setComments(rootComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`comments-${pageType}-${pageId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `page_type=eq.${pageType}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageType, pageId]);

  const totalComments = comments.reduce((acc, c) => {
    return acc + 1 + (c.replies?.length || 0);
  }, 0);

  return (
    <section className="py-8 md:py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
              {title}
            </h2>
            <span className="text-sm text-muted-foreground">
              ({totalComments} {totalComments === 1 ? 'comment' : 'comments'})
            </span>
          </div>

          {/* Comment Form */}
          <div className="mb-8 bg-secondary/30 rounded-lg p-4 md:p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Join the conversation</h3>
            <CommentForm
              pageType={pageType}
              pageId={pageId}
              onSuccess={fetchComments}
              placeholder="Share your thoughts, ask a question, or help others..."
            />
          </div>

          {/* Comments List */}
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground mt-2">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 bg-secondary/20 rounded-lg border border-dashed border-border">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  pageType={pageType}
                  pageId={pageId}
                  onReplyAdded={fetchComments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
