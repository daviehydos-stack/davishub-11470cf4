import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
}

const SITE_NAME = "Azani ISP INFORMATION SYSTEM | KCSE 2026 COMPUTER STUDIES PROJECT";
const SITE_URL = "https://www.azaniispproject.co.ke";
const DEFAULT_OG_IMAGE = "https://www.azaniispproject.co.ke/og-image.jpg";
const DEFAULT_DESCRIPTION = "Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Free Download Milestone 1 and Milestone 2. Zero Plagiarism. Download Now.";

export const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  keywords = [],
  article,
  noindex = false,
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Use description or fallback to default - never empty
  const finalDescription = description && description.length > 0 ? description : DEFAULT_DESCRIPTION;
  
  // For blog posts (articles), use the title directly without appending site name
  // For other pages, append site name if not already included
  const isArticle = ogType === "article";
  const fullTitle = isArticle 
    ? title 
    : (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`);
  
  // Generate canonical URL properly - prefer explicit canonical, fallback to current path
  const getCanonicalUrl = () => {
    if (canonical) return canonical;
    const path = location.pathname.replace(/\/$/, '') || '/';
    return `${SITE_URL}${path}`;
  };
  
  const canonicalUrl = getCanonicalUrl();
  const finalOgImage = ogImage && ogImage.length > 0 ? ogImage : DEFAULT_OG_IMAGE;
  const finalOgTitle = ogTitle && ogTitle.length > 0 ? ogTitle : fullTitle;
  const finalOgDescription = ogDescription && ogDescription.length > 0 ? ogDescription : finalDescription;

  // Generate JSON-LD structured data
  const generateJsonLd = () => {
    if (ogType === "article" && article) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": finalOgTitle,
        "description": finalOgDescription,
        "image": finalOgImage,
        "url": canonicalUrl,
        "datePublished": article.publishedTime,
        "dateModified": article.modifiedTime || article.publishedTime,
        "author": {
          "@type": "Person",
          "name": article.author || "Azani ISP"
        },
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/favicon.ico`
          }
        },
        "articleSection": article.section || "Technology",
        "keywords": article.tags?.join(", ") || keywords.join(", "),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      };
    }

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": finalOgTitle,
      "description": finalOgDescription,
      "url": canonicalUrl,
      "image": finalOgImage,
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/favicon.ico`
        }
      }
    };
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="author" content="Azani ISP Project" />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Article specific meta tags */}
      {ogType === "article" && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          <meta property="article:author" content={article.author || "Azani ISP"} />
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateJsonLd())}
      </script>
    </Helmet>
  );
};
