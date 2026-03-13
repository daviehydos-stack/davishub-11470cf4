import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  created_at: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("generated_articles")
        .select("id, title, slug, excerpt, category, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <Helmet>
        <title>AZANI INTERNET SERVICE PROVIDER | KCSE 2026 COMPUTER STUDIES PROJECT</title>
        <meta name="description" content="Azani Internet Service Provider. KCSE 2026 Computer Studies Project. Download Now for Free. Milestone 1 and 2 Available. Zero Plagiarism." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.azaniispproject.co.ke/articles" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Technology & Networking Articles
          </h1>
          <p className="text-muted-foreground mb-10">
            In-depth guides on ISP infrastructure, database systems, and student networking projects in Kenya.
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">No articles published yet. Check back soon!</p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{article.category || "Technology"}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDate(article.created_at)}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                  )}
                  <span className="flex items-center text-primary text-sm font-medium">
                    Read article
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
