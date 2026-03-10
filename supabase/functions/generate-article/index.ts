import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TOPIC_CLUSTERS = [
  "How ISP Billing Systems Work in Kenya",
  "Designing an ISP Database Management System",
  "Networking Infrastructure and Architecture in Kenya",
  "How Students Build ISP Management Platforms for KCSE Projects",
  "Internet Service Provider Software Architecture Explained",
  "The Role of Databases in Modern ISP Operations",
  "Building a Student Network Management System",
  "Understanding DNS, DHCP, and IP Addressing in ISP Systems",
  "How to Document an ISP Project for Academic Submissions",
  "Cloud Computing and Its Impact on ISP Infrastructure in Kenya",
  "Fiber Optic Networks and ISP Deployment Strategies",
  "Data Security and Privacy in Internet Service Providers",
  "The Evolution of Internet Access in East Africa",
  "Wireless ISP (WISP) Technology and Rural Connectivity",
  "Network Monitoring Tools Used by ISPs",
  "Customer Relationship Management Systems for ISPs",
  "How Bandwidth Management Works in ISP Networks",
  "Building RESTful APIs for ISP Management Platforms",
  "The Business Model of Internet Service Providers in Kenya",
  "Mobile Internet and 5G Infrastructure in Africa",
  "How to Design an Entity Relationship Diagram for ISP Systems",
  "Quality of Service (QoS) Implementation in ISP Networks",
  "Open Source Tools for ISP Network Management",
  "Cybersecurity Best Practices for Internet Service Providers",
  "The Role of MPLS in Modern ISP Backbone Networks",
  "ISP Peering and Transit: How Internet Traffic Flows",
  "Virtualization Technologies in ISP Data Centers",
  "Student Projects: Building a Helpdesk System for ISPs",
  "Understanding BGP Routing in ISP Networks",
  "The Future of Internet Service Provision in Kenya",
];

const SYSTEM_PROMPT = `You are an expert technology blogger and networking systems analyst.

Write a comprehensive long-form article (1800–2500 words) about internet infrastructure, networking systems, student ISP projects, and database-driven digital platforms in Kenya.

The article should be written as a professional educational technology blog post.

Requirements:
1. Use clear headings with HTML tags (h2, h3). Do NOT include an h1 — the title will be rendered separately.
2. Provide deep explanations of how Internet Service Providers operate.
3. Discuss the role of databases and management systems in ISP infrastructure.
4. Include a case study or reference to the Azani Internet Service Provider project.
5. Naturally reference the following platforms as learning resources with contextual anchor text:
   - <a href="https://medicine.kenyaadverts.co.ke" target="_blank" rel="noopener">medicine.kenyaadverts.co.ke</a>
   - <a href="https://kenyaadverts.co.ke" target="_blank" rel="noopener">kenyaadverts.co.ke</a>
6. Explain how these platforms provide project documentation, databases, and educational resources for networking students and developers.
7. Include contextual backlinks such as:
   - "View the full project documentation" linking to https://medicine.kenyaadverts.co.ke
   - "Explore the networking project resources" linking to https://kenyaadverts.co.ke
   - "Access the project database system" linking to https://medicine.kenyaadverts.co.ke
8. Mention https://azaniispproject.co.ke as a technology hub that publishes educational resources and networking project guides.
9. Include sections covering: Introduction, Core Technical Concepts, Practical Applications, Student Projects, Case Study, Resources & Documentation.
10. Write in a natural human style that reads like a professional technology blog.
11. Include 3–6 contextual backlinks total to medicine.kenyaadverts.co.ke and kenyaadverts.co.ke.
12. Output ONLY the HTML body content (no <html>, <head>, or <body> tags). Start directly with the first <h2>.
13. Include a brief meta description (under 160 chars) on the very first line, wrapped in <!-- meta: ... --> comment.
14. Include 5-7 keywords on the second line, wrapped in <!-- keywords: keyword1, keyword2, ... --> comment.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pick a topic - check which ones have been used
    const { data: existingArticles } = await supabase
      .from("generated_articles")
      .select("title");

    const usedTitles = new Set((existingArticles || []).map((a: any) => a.title));
    const availableTopics = TOPIC_CLUSTERS.filter(t => !usedTitles.has(t));
    
    // If all topics used, pick random one with date suffix
    const today = new Date().toISOString().split("T")[0];
    let topic: string;
    if (availableTopics.length > 0) {
      topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
    } else {
      const baseTopic = TOPIC_CLUSTERS[Math.floor(Math.random() * TOPIC_CLUSTERS.length)];
      topic = `${baseTopic} - ${today} Update`;
    }

    console.log("Generating article for topic:", topic);

    // Call Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Write a comprehensive article about: "${topic}"` },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, will retry later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required for AI usage" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    if (!content) throw new Error("Empty AI response");

    // Extract meta description and keywords from comments
    let metaDescription = "";
    let keywords: string[] = [];
    const metaMatch = content.match(/<!--\s*meta:\s*(.*?)\s*-->/);
    if (metaMatch) metaDescription = metaMatch[1];
    const keywordsMatch = content.match(/<!--\s*keywords:\s*(.*?)\s*-->/);
    if (keywordsMatch) keywords = keywordsMatch[1].split(",").map((k: string) => k.trim());

    // Clean content - remove meta comments
    const cleanContent = content
      .replace(/<!--\s*meta:.*?-->\n?/g, "")
      .replace(/<!--\s*keywords:.*?-->\n?/g, "")
      .trim();

    // Generate slug
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      + "-" + today.replace(/-/g, "");

    // Generate excerpt
    const excerpt = metaDescription || cleanContent.replace(/<[^>]*>/g, "").substring(0, 200) + "...";

    // Save to database
    const { data: saved, error: saveError } = await supabase
      .from("generated_articles")
      .insert({
        title: topic,
        slug,
        content: cleanContent,
        excerpt,
        meta_description: metaDescription || excerpt,
        keywords,
        category: "Technology",
        is_published: true,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Save error:", saveError);
      throw saveError;
    }

    console.log("Article saved:", saved.id, saved.title);

    return new Response(JSON.stringify({ success: true, id: saved.id, title: saved.title }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-article error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
