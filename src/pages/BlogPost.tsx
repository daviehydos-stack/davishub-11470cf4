import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Share2,
  Calendar,
  FileQuestion,
  Loader2,
  BookOpen,
  ArrowRight,
  Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
}

interface SEOSettings {
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
  robots_directives: string | null;
}

const SITE_URL = "https://azaniispproject.co.ke";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [pageSeo, setPageSeo] = useState<SEOSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error || !data) {
          setNotFound(true);
          return;
        }

        setBlogPost(data);

        const pagePath = `/blogs/${data.slug}`;

        // Fetch related posts + optional per-page SEO overrides in parallel
        const [relatedResult, seoResult] = await Promise.all([
          supabase
            .from('blog_posts')
            .select('*')
            .eq('is_published', true)
            .neq('id', data.id)
            .order('created_at', { ascending: false })
            .limit(3),
          supabase
            .from('seo_settings')
            .select('*')
            .eq('page_path', pagePath)
            .maybeSingle(),
        ]);

        setRelatedPosts(relatedResult.data || []);
        setPageSeo(seoResult.data || null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const stripLeadingEmptyBlocks = (html: string) => {
    if (!html) return "";
    let out = html;
    out = out.replace(/^(?:\s|&nbsp;|<br\s*\/?>(?:\s)*)+/gi, "");
    out = out.replace(/^(?:<p>(?:\s|&nbsp;|<br\s*\/?>(?:\s)*)*<\/p>)+/gi, "");
    return out.trim();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost?.title,
          text: blogPost?.excerpt || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEOHead
          title="Loading Article..."
          description="Loading article content. Please wait."
          noindex={true}
        />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground mt-4">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEOHead
          title="Article Not Found"
          description="The article you're looking for doesn't exist or has been removed."
          noindex={true}
        />
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalUrl =
    pageSeo?.canonical_url || blogPost?.canonical_url || `${SITE_URL}/blogs/${blogPost?.slug}`;
  const seoTitle = pageSeo?.meta_title || blogPost?.meta_title || blogPost?.title || "Blog Post";
  const seoDescription =
    pageSeo?.meta_description ||
    blogPost?.meta_description ||
    blogPost?.excerpt ||
    "Read this insightful article about ISP systems and computer science projects.";
  const ogImage = pageSeo?.og_image || blogPost?.og_image || blogPost?.featured_image || undefined;
  const seoKeywords =
    pageSeo?.keywords ||
    blogPost?.keywords ||
    ["KCSE", "Computer Studies", blogPost?.category || "Education"];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        ogTitle={pageSeo?.og_title || blogPost?.og_title || blogPost?.title}
        ogDescription={
          pageSeo?.og_description || blogPost?.og_description || blogPost?.excerpt || seoDescription
        }
        ogImage={ogImage}
        ogType="article"
        keywords={seoKeywords}
        article={{
          publishedTime: blogPost?.created_at,
          modifiedTime: blogPost?.updated_at,
          author: "Azani ISP",
          section: blogPost?.category || "Education",
        }}
      />
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section - Desktop: Two column, Mobile: Stacked */}
        <section className="relative py-8 md:py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <Link
              to="/blogs"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to articles
            </Link>

            <div className="max-w-3xl mx-auto">
              {/* Centered Hero Content */}
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  {blogPost?.category || 'General'}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {blogPost?.title}
                </h1>
                
                {blogPost?.excerpt && (
                  <p className="text-lg text-muted-foreground mb-6">
                    {blogPost.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blogPost?.created_at || "")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {estimateReadingTime(blogPost?.content || "")} min read
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    KCSE Guide
                  </div>
                </div>

                {blogPost?.keywords && blogPost.keywords.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {blogPost.keywords.map((k) => (
                      <Link key={k} to={`/tags/${encodeURIComponent(k)}`} aria-label={`View posts tagged ${k}`}>
                        <Badge variant="secondary" className="hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                          {k}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.print()}>
                    <Download className="h-4 w-4 mr-2" />
                    Save PDF
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              {blogPost?.featured_image && (
                <div className="rounded-xl overflow-hidden border border-border">
                  <img
                    src={blogPost.featured_image}
                    alt={blogPost.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Content Section - Centered with proper width */}
        <article className="py-10 print-content" id="blog-content">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:marker:text-primary
                  prose-blockquote:border-l-primary prose-blockquote:bg-secondary/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                  prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-secondary prose-pre:border prose-pre:border-border
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-table:border prose-table:border-border prose-table:w-full
                  prose-th:bg-secondary prose-th:p-2 prose-th:border prose-th:border-border
                  prose-td:p-2 prose-td:border prose-td:border-border"
                dangerouslySetInnerHTML={{ __html: stripLeadingEmptyBlocks(blogPost?.content || "") }}
              />
            </div>
          </div>
        </article>

        {/* CTA Banner */}
        <section className="py-12 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to ace your KCSE project?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get the complete project with all documentation, source code, and expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/#download">
                    Get Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://chat.whatsapp.com/IO7QQrf6GH3IRHDMDAbNwm" target="_blank" rel="noopener noreferrer">
                    Join WhatsApp Group
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-display text-2xl font-bold mb-8 text-center">
                  Continue Reading
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} to={`/blogs/${post.slug}`} className="group block">
                      <article className="bg-card border border-border rounded-xl overflow-hidden h-full hover:border-primary/30 transition-colors">
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={post.featured_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {post.category || 'General'}
                          </Badge>
                          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <span className="flex items-center text-primary text-sm font-medium">
                            Read more
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Author Section */}
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Published {formatDate(blogPost?.created_at || "")}</p>
                <p>Victory Project Materials</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/blogs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All articles
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
