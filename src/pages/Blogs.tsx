import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, FileText, Users, Award, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  created_at: string;
}

interface SEOSettings {
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
}

const Blogs = () => {
  const { tag: tagParam } = useParams<{ tag?: string }>();
  const activeTag = tagParam ? decodeURIComponent(tagParam) : null;

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState<SEOSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs and SEO settings in parallel
        const blogsQuery = supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, category, created_at')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        const filteredBlogsQuery = activeTag
          ? blogsQuery.contains('keywords', [activeTag])
          : blogsQuery;

        const [blogsResult, seoResult] = await Promise.all([
          filteredBlogsQuery,
          supabase
            .from('seo_settings')
            .select('*')
            .eq('page_path', '/blogs')
            .single()
        ]);

        if (blogsResult.error) throw blogsResult.error;
        setBlogs(blogsResult.data || []);

        if (seoResult.data) setSeo(seoResult.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTag]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={
          activeTag
            ? `${activeTag} KCSE Guides`
            : seo?.meta_title || "KCSE Computer Studies Resources & Guides"
        }
        description={
          activeTag
            ? `Read KCSE Computer Studies guides tagged "${activeTag}". Practical tips, database work, and project support.`
            : seo?.meta_description ||
              "Expert guides and resources for KCSE Computer Studies. Learn database design, programming concepts, and project documentation tips to score A in your exams."
        }
        canonical={
          activeTag
            ? `https://kcse.lovable.app/tags/${encodeURIComponent(activeTag)}`
            : seo?.canonical_url || "https://kcse.lovable.app/blogs"
        }
        ogTitle={
          activeTag
            ? `${activeTag} Guides | Victory School Project`
            : seo?.og_title || "KCSE Computer Studies Guides | Victory School Project"
        }
        ogDescription={
          activeTag
            ? `Browse guides tagged "${activeTag}" and find related KCSE Computer Studies materials.`
            : seo?.og_description ||
              "Step-by-step guides to help you ace your KCSE Computer Studies project. Database design, programming tips, and exam preparation resources."
        }
        ogImage={seo?.og_image || undefined}
        keywords={
          activeTag
            ? [activeTag, "KCSE", "Computer Studies", "Kenya", "Project"]
            : seo?.keywords || [
                "KCSE",
                "Computer Studies",
                "database project",
                "programming",
                "Kenya education",
                "KCSE 2026",
                "student guides",
              ]
        }
      />
      <Header />
      <main className="flex-1 pt-16">
        {/* Compact Hero */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {activeTag ? `Guides tagged: ${activeTag}` : "KCSE Computer Studies Resources"}
                </h1>
                {activeTag && (
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    aria-label="Clear tag filter"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Link>
                )}
              </div>
              <p className="text-muted-foreground text-lg">
                {activeTag
                  ? "Browse related articles and continue learning."
                  : "Step-by-step guides to help you score A in your project."}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-6 bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm"><strong>{blogs.length}</strong> guides available</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm"><strong>500+</strong> students helped</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm">KCSE 2025/2026 aligned</span>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground mt-4">Loading guides...</p>
            </div>
          </section>
        ) : blogs.length === 0 ? (
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No guides yet</h2>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Post */}
            {featuredBlog && (
              <section className="py-10">
                <div className="container mx-auto px-4">
                  <Link to={`/blogs/${featuredBlog.slug}`} className="group block">
                    <article className="grid md:grid-cols-2 gap-6 items-center bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <img
                          src={featuredBlog.featured_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
                          alt={featuredBlog.title}
                          loading="eager"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                      <div className="p-6 md:p-8">
                        <Badge variant="outline" className="mb-3">
                          {featuredBlog.category || 'General'}
                        </Badge>
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {formatDate(featuredBlog.created_at)}
                          </div>
                          <span className="flex items-center text-primary font-medium text-sm">
                            Read guide
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              </section>
            )}

            {/* Other Posts */}
            {otherBlogs.length > 0 && (
              <section className="py-10 bg-secondary/20">
                <div className="container mx-auto px-4">
                  <h2 className="font-display text-xl font-semibold mb-6 text-foreground">More Guides</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {otherBlogs.map((blog) => (
                      <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group block">
                        <article className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors h-full">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={blog.featured_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'}
                              alt={blog.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge variant="secondary" className="mb-2 text-xs">
                              {blog.category || 'General'}
                            </Badge>
                            <h3 className="font-display font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {formatDate(blog.created_at)}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
              <h2 className="font-display text-2xl font-bold mb-2 text-foreground">Need the complete project?</h2>
              <p className="text-muted-foreground mb-4">Get original, exam-ready materials with full documentation.</p>
              <Link 
                to="/#download" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blogs;
