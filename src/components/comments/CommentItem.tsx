import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { CommentForm } from "./CommentForm";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  pageType: 'blog' | 'kcse_guide' | 'discussion';
  pageId: string;
  onReplyAdded: () => void;
  depth?: number;
}

export const CommentItem = ({ 
  comment, 
  pageType, 
  pageId, 
  onReplyAdded,
  depth = 0 
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

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

  const maxDepth = 3;
  const canReply = depth < maxDepth;

  return (
    <div className={`${depth > 0 ? 'ml-4 sm:ml-8 border-l-2 border-border pl-4' : ''}`}>
      <div className="bg-card border border-border rounded-lg p-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-semibold text-foreground text-sm sm:text-base">
                {comment.author_name}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(comment.created_at)}
              </span>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base whitespace-pre-wrap break-words">
              {comment.content}
            </p>
            
            <div className="flex items-center gap-2 mt-3">
              {canReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-xs h-7 px-2"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Reply
                </Button>
              )}
              {comment.replies && comment.replies.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-xs h-7 px-2"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Hide {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {showReplyForm && (
          <div className="mt-4 pt-4 border-t border-border">
            <CommentForm
              pageType={pageType}
              pageId={pageId}
              parentId={comment.id}
              placeholder={`Reply to ${comment.author_name}...`}
              onSuccess={() => {
                setShowReplyForm(false);
                onReplyAdded();
              }}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
      </div>

      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="animate-fade-in">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              pageType={pageType}
              pageId={pageId}
              onReplyAdded={onReplyAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
