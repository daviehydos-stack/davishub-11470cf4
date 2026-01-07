import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featured_image: string | null;
  category: string | null;
  created_at: string;
}

export function RecentBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, featured_image, category, created_at')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Free KCSE Guides
            </h2>
            <p className="text-muted-foreground mt-1">
              Learn from our tutorials before you buy
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link to="/blogs">
              All guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group block">
              <article className="bg-card border border-border rounded-xl overflow-hidden h-full hover:border-primary/30 transition-colors">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={blog.featured_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {blog.category || 'General'}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="w-3 h-3" />
                    {formatDate(blog.created_at)}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <span className="flex items-center text-primary text-sm font-medium">
                    Read guide
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Button asChild variant="outline">
            <Link to="/blogs">
              View all guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
