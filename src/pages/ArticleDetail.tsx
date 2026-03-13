import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  created_at: string;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("generated_articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (!error && data) setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
        <Link to="/articles" className="text-primary hover:underline">← Back to articles</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${article.title} | AZANI INTERNET SERVICE PROVIDER | ARTICLES`}</title>
        <meta name="description" content="Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Download Now for Free. Milestone 1 and 2 Available. Zero Plagiarism." />
        {article.keywords && <meta name="keywords" content={article.keywords.join(", ")} />}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={`https://www.azaniispproject.co.ke/articles/${article.slug}`} />
        <meta property="og:title" content={`${article.title} | AZANI INTERNET SERVICE PROVIDER | ARTICLES`} />
        <meta property="og:description" content="Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Download Now for Free. Milestone 1 and 2 Available. Zero Plagiarism." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.azaniispproject.co.ke/articles/${article.slug}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.meta_description || article.excerpt,
            datePublished: article.created_at,
            publisher: {
              "@type": "Organization",
              name: "Azani ISP Project",
              url: "https://azaniispproject.co.ke",
            },
            mainEntityOfPage: `https://azaniispproject.co.ke/articles/${article.slug}`,
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
          <Link
            to="/articles"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> All articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{article.category || "Technology"}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {formatDate(article.created_at)}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {article.title}
          </h1>

          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:text-foreground
              prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Published by{" "}
              <a href="https://azaniispproject.co.ke" className="text-primary hover:underline">
                Azani ISP Project
              </a>
              {" "}— Your hub for networking and ISP education resources.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
