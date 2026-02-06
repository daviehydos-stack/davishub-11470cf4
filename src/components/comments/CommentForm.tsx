import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

const commentSchema = z.object({
  author_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  author_email: z.string().trim().email("Please enter a valid email"),
  author_mobile: z.string().optional(),
  content: z.string().trim().min(5, "Comment must be at least 5 characters").max(2000),
});

interface CommentFormProps {
  pageType: 'blog' | 'kcse_guide' | 'discussion';
  pageId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  placeholder?: string;
}

export const CommentForm = ({ 
  pageType, 
  pageId, 
  parentId, 
  onSuccess, 
  onCancel,
  placeholder = "Share your thoughts..."
}: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    author_mobile: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = commentSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert({
        page_type: pageType,
        page_id: pageId,
        parent_id: parentId || null,
        author_name: formData.author_name.trim(),
        author_email: formData.author_email.trim(),
        author_mobile: formData.author_mobile?.trim() || null,
        content: formData.content.trim(),
      });

      if (error) throw error;

      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully.",
      });

      setFormData({ author_name: "", author_email: "", author_mobile: "", content: "" });
      onSuccess?.();
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="author_name">Name *</Label>
          <Input
            id="author_name"
            placeholder="Your name"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            className={errors.author_name ? "border-destructive" : ""}
          />
          {errors.author_name && (
            <p className="text-xs text-destructive">{errors.author_name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="author_email">Email *</Label>
          <Input
            id="author_email"
            type="email"
            placeholder="your@email.com"
            value={formData.author_email}
            onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
            className={errors.author_email ? "border-destructive" : ""}
          />
          {errors.author_email && (
            <p className="text-xs text-destructive">{errors.author_email}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author_mobile">Phone (optional)</Label>
        <Input
          id="author_mobile"
          type="tel"
          placeholder="+254 7XX XXX XXX"
          value={formData.author_mobile}
          onChange={(e) => setFormData({ ...formData, author_mobile: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Comment *</Label>
        <Textarea
          id="content"
          placeholder={placeholder}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={`min-h-[100px] ${errors.content ? "border-destructive" : ""}`}
        />
        {errors.content && (
          <p className="text-xs text-destructive">{errors.content}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
