import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, FileText, Users, Award, Loader2, X, Play } from "lucide-react";
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
            ? `${activeTag} ISP Project Guides`
            : seo?.meta_title || "ISP Project Resources & Guides"
        }
        description={
          activeTag
            ? `Read ISP project guides tagged "${activeTag}". Database design, network management, and project support.`
            : seo?.meta_description ||
              "Expert guides and resources for ISP management systems. Learn database design, network concepts, and project documentation tips."
        }
        canonical={
          activeTag
            ? `https://azaniispproject.co.ke/tags/${encodeURIComponent(activeTag)}`
            : seo?.canonical_url || "https://azaniispproject.co.ke/blogs"
        }
        ogTitle={
          activeTag
            ? `${activeTag} Guides | Azani ISP Project`
            : seo?.og_title || "ISP Project Guides | Azani ISP Project"
        }
        ogDescription={
          activeTag
            ? `Browse guides tagged "${activeTag}" and find related ISP project materials.`
            : seo?.og_description ||
              "Step-by-step guides to help you ace your ISP project. Database design, network management, and documentation resources."
        }
        ogImage={seo?.og_image || "https://azaniispproject.co.ke/og-image.jpg"}
        keywords={
          activeTag
            ? [activeTag, "ISP", "Computer Science", "Kenya", "Project"]
            : seo?.keywords || [
                "ISP project",
                "Internet Service Provider",
                "database project",
                "network management",
                "Kenya education",
                "2025 project",
                "student guides",
              ]
        }
      />
      <Header />
      <main className="flex-1 pt-16">
        {/* Compact Hero */}
        <section className="py-8 md:py-12 border-b border-border animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {activeTag ? `Guides tagged: ${activeTag}` : "KCSE Project Guides"}
                </h1>
                {activeTag && (
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground w-fit"
                    aria-label="Clear tag filter"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Link>
                )}
              </div>
              <p className="text-muted-foreground text-base md:text-lg">
                {activeTag
                  ? "Browse related articles and continue learning."
                  : "Step-by-step guides to help you score A in your project."}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-4 md:py-6 bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 md:gap-12">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm"><strong>{blogs.length}</strong> guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm"><strong>500+</strong> students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm">KCSE 2026</span>
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
              <section className="py-6 md:py-10 animate-fade-in">
                <div className="container mx-auto px-4">
                  <Link to={`/blogs/${featuredBlog.slug}`} className="group block">
                    <article className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 items-stretch bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                      <div className="relative h-48 md:h-80 overflow-hidden">
                        <img
                          src={featuredBlog.featured_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
                          alt={featuredBlog.title}
                          loading="eager"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary text-primary-foreground text-xs">
                          Featured
                        </Badge>
                      </div>
                      <div className="p-4 md:p-8 flex flex-col justify-center">
                        <Badge variant="outline" className="mb-2 md:mb-3 w-fit text-xs">
                          {featuredBlog.category || 'General'}
                        </Badge>
                        <h2 className="font-display text-xl md:text-3xl font-bold mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-muted-foreground mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 text-sm md:text-base">
                          {featuredBlog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            {formatDate(featuredBlog.created_at)}
                          </div>
                          <span className="flex items-center text-primary font-medium text-xs md:text-sm">
                            Read guide
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
              <section className="py-6 md:py-10 bg-secondary/20">
                <div className="container mx-auto px-4">
                  <h2 className="font-display text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">More Guides</h2>
                  <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {otherBlogs.map((blog, index) => (
                      <Link 
                        key={blog.id} 
                        to={`/blogs/${blog.slug}`} 
                        className="group block animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <article className="flex gap-3 md:gap-4 p-3 md:p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors h-full">
                          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={blog.featured_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'}
                              alt={blog.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge variant="secondary" className="mb-1 md:mb-2 text-xs">
                              {blog.category || 'General'}
                            </Badge>
                            <h3 className="font-display font-semibold text-xs md:text-sm mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2">
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

        {/* YouTube Video Section */}
        <section className="py-8 md:py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4 text-center text-foreground">
                Watch: Azani ISP Project Documentation Guide
              </h2>
              <p className="text-muted-foreground text-center mb-6 text-sm md:text-base">
                Learn how to properly document your KCSE Computer Studies project
              </p>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-secondary/30">
                <iframe
                  src="https://www.youtube.com/embed/TMUg9BFWn_g?rel=0"
                  title="Azani ISP Database System | KCSE 2026 Computer Project"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Documentation</Badge>
                <Badge variant="secondary">MS Access</Badge>
                <Badge variant="secondary">KCSE 2026</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-2 text-foreground">Need the complete project?</h2>
              <p className="text-muted-foreground mb-4 text-sm md:text-base">Get original, exam-ready materials with full documentation.</p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
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
    </div>
  );
};

export default Blogs;
