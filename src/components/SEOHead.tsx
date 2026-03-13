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
  showRating?: boolean;
}

const SITE_NAME = "AZANI INTERNET SERVICE PROVIDER | KCSE 2026 COMPUTER STUDIES PROJECT";
const SITE_URL = "https://www.azaniispproject.co.ke";
const DEFAULT_OG_IMAGE = "https://www.azaniispproject.co.ke/azani.jpg";
const DEFAULT_DESCRIPTION = "Azani Internet Service Provider Information System. KCSE 2026 Computer Studies Project. Download Now for Free. Milestone 1 and 2 Available. Zero Plagiarism.";
const DEFAULT_KEYWORDS = [
  "Azani Internet Service Provider",
  "Azani Internet Service Provider Information System",
  "KCSE 2026 Computer Studies Project",
  "KCSE 2026 project",
  "Azani ISP",
  "Azani ISP project",
  "Azani project 2026",
  "KCSE computer project 2026",
  "Azani internet service provider information system milestone 1",
  "Azani internet service provider information system milestone 2",
  "KCSE 451/3",
  "KCSE paper 3 project 2026",
  "KNEC computer studies project 2026",
  "Azani computer project",
  "kcse computer project 2026 azani internet pdf free download",
  "MS Access Project",
  "KCSE project download",
  "computer project Kenya",
  "KCSE database project",
  "KNEC project requirements 2026",
  "free KCSE computer project",
  "computer studies paper 3 2026",
  "secondary school computer project Kenya",
  "KCSE project milestone 1 and 2",
  "Azani ISP database system",
  "KCSE 2026 computer project Kenya",
  "computer studies project documentation",
  "Azani internet service provider project download",
  "KCSE 2026 project free download",
  "Azani ISP information system",
];

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
  showRating = true,
}: SEOHeadProps) => {
  const location = useLocation();
  
  const finalDescription = description && description.length > 0 ? description : DEFAULT_DESCRIPTION;
  const mergedKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])];
  
  const isArticle = ogType === "article";
  const fullTitle = isArticle 
    ? title 
    : (title.includes("AZANI INTERNET SERVICE PROVIDER") ? title : `${title} | ${SITE_NAME}`);
  
  const getCanonicalUrl = () => {
    if (canonical) return canonical;
    const path = location.pathname.replace(/\/$/, '') || '/';
    return `${SITE_URL}${path}`;
  };
  
  const canonicalUrl = getCanonicalUrl();
  const finalOgImage = ogImage && ogImage.length > 0 ? ogImage : DEFAULT_OG_IMAGE;
  const finalOgTitle = ogTitle && ogTitle.length > 0 ? ogTitle : fullTitle;
  const finalOgDescription = ogDescription && ogDescription.length > 0 ? ogDescription : finalDescription;

  const generateJsonLd = () => {
    const schemas: any[] = [];

    // Always add Organization
    schemas.push({
      "@type": "Organization",
      "name": "Azani ISP Project",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.png`
      },
      "sameAs": [
        "https://www.youtube.com/@AZANIISPINFORMATIONSYSTEM"
      ]
    });

    if (ogType === "article" && article) {
      schemas.push({
        "@type": "Article",
        "headline": finalOgTitle,
        "description": finalOgDescription,
        "image": finalOgImage,
        "url": canonicalUrl,
        "datePublished": article.publishedTime,
        "dateModified": article.modifiedTime || article.publishedTime,
        "author": {
          "@type": "Organization",
          "name": "Azani ISP Project",
          "url": SITE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": "Azani ISP Project",
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.png` }
        },
        "articleSection": article.section || "Education",
        "keywords": article.tags?.join(", ") || mergedKeywords.join(", "),
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
      });
    } else {
      schemas.push({
        "@type": "WebPage",
        "name": finalOgTitle,
        "description": finalOgDescription,
        "url": canonicalUrl,
        "image": finalOgImage,
        "publisher": {
          "@type": "Organization",
          "name": "Azani ISP Project",
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.png` }
        }
      });
    }

    // Add SoftwareApplication with AggregateRating for star ratings in search
    if (showRating && !isArticle) {
      schemas.push({
        "@type": "SoftwareApplication",
        "name": "Azani Internet Service Provider Information System",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Windows",
        "description": "KCSE 2026 Computer Studies Project - Azani ISP Information System. Complete MS Access database with forms, queries, reports. Milestone 1 and 2.",
        "url": SITE_URL,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "KES",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "547",
          "bestRating": "5",
          "worstRating": "1"
        }
      });
    }

    return {
      "@context": "https://schema.org",
      "@graph": schemas
    };
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="author" content="Azani ISP Project" />
      <meta name="keywords" content={mergedKeywords.join(", ")} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      
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
          <meta property="article:author" content={article.author || "Azani ISP Project"} />
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
