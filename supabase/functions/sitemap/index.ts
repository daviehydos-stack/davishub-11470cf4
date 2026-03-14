import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.azaniispproject.co.ke";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "index";

    if (type === "index") {
      // Return sitemap index
      const now = new Date().toISOString().split("T")[0];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/page-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/post-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/image-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

      return new Response(xml, {
        headers: { ...corsHeaders, "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
      });
    }

    if (type === "posts") {
      // Fetch published blog posts with images
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("slug, updated_at, created_at, title, featured_image, meta_description")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

      if (posts) {
        for (const post of posts) {
          const lastmod = post.updated_at
            ? new Date(post.updated_at).toISOString().split("T")[0]
            : new Date(post.created_at).toISOString().split("T")[0];

          xml += `  <url>
    <loc>${SITE_URL}/blogs/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.70</priority>`;

          if (post.featured_image) {
            xml += `
    <image:image>
      <image:loc>${post.featured_image}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.meta_description || post.title)}</image:caption>
    </image:image>`;
          }

          xml += `
  </url>
`;
        }
      }

      xml += `</urlset>`;

      return new Response(xml, {
        headers: { ...corsHeaders, "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
      });
    }

    // Default: return the full combined sitemap
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at, featured_image, title")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    const now = new Date().toISOString().split("T")[0];

    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "daily" },
      { url: "/kcse-2026-computer-studies-project", priority: "0.95", changefreq: "daily" },
      { url: "/kcse-2026-project", priority: "0.90", changefreq: "weekly" },
      { url: "/kcse", priority: "0.85", changefreq: "weekly" },
      { url: "/knowledge-bank", priority: "0.80", changefreq: "weekly" },
      { url: "/blogs", priority: "0.80", changefreq: "daily" },
      { url: "/community", priority: "0.70", changefreq: "daily" },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    for (const page of staticPages) {
      xml += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    if (posts) {
      for (const post of posts) {
        const lastmod = post.updated_at
          ? new Date(post.updated_at).toISOString().split("T")[0]
          : new Date(post.created_at).toISOString().split("T")[0];

        xml += `  <url>
    <loc>${SITE_URL}/blogs/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;

        if (post.featured_image) {
          xml += `
    <image:image>
      <image:loc>${post.featured_image}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>`;
        }

        xml += `
  </url>
`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: { ...corsHeaders, "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate sitemap" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
