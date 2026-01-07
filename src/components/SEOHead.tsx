import { Helmet } from 'react-helmet-async';

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
  };
  noindex?: boolean;
}

const SITE_NAME = "Victory School Project";
const SITE_URL = "https://kcse.lovable.app";
const DEFAULT_OG_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";

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
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  
  // Generate canonical URL properly - prefer explicit canonical, fallback to current path
  const getCanonicalUrl = () => {
    if (canonical) return canonical;
    if (typeof window !== 'undefined') {
      // Clean URL: remove trailing slashes, query params, and ensure HTTPS
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      return `${SITE_URL}${path}`;
    }
    return SITE_URL;
  };
  
  const canonicalUrl = getCanonicalUrl();
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;

  // Generate JSON-LD structured data
  const generateJsonLd = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": ogType === "article" ? "Article" : "WebPage",
      "name": ogTitle || title,
      "description": ogDescription || description,
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

    if (ogType === "article" && article) {
      return {
        ...baseData,
        "@type": "Article",
        "headline": ogTitle || title,
        "datePublished": article.publishedTime,
        "dateModified": article.modifiedTime || article.publishedTime,
        "author": {
          "@type": "Person",
          "name": article.author || "Victory Project Team"
        },
        "articleSection": article.section || "Education",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content="Victory School Project" />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      
      {/* Canonical - single canonical tag */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@VictorySchool" />
      
      {/* Article specific meta tags */}
      {ogType === "article" && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          <meta property="article:author" content={article.author || "Victory Project Team"} />
          {article.section && <meta property="article:section" content={article.section} />}
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateJsonLd())}
      </script>
    </Helmet>
  );
};
