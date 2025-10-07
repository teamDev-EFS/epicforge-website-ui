import React from "react";

interface SEOSchemasProps {
  pageType?:
    | "homepage"
    | "about"
    | "portfolio"
    | "contact"
    | "blog"
    | "case-study";
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
}

const SEOSchemas: React.FC<SEOSchemasProps> = ({
  pageType = "homepage",
  title = "EpicForge Software — AI-Powered IT Solutions | Blockchain Development | Automation Tools",
  description = "EpicForge Software is a futuristic IT company building AI-powered, Blockchain-integrated web & mobile applications. We specialize in AI SEO, automation, CRM tools, HRM systems, and omnichannel brand growth solutions for enterprises and startups worldwide.",
  image = "https://epicforgesoftware.com/Epicforgesoftware_logo.png",
  url = "https://epicforgesoftware.com",
  publishedDate,
  modifiedDate,
  author = "EpicForge Software",
}) => {
  const getBreadcrumbSchema = () => {
    const breadcrumbs = [
      { name: "Home", url: "https://epicforgesoftware.com" },
    ];

    if (pageType === "about") {
      breadcrumbs.push({
        name: "About",
        url: "https://epicforgesoftware.com/about",
      });
    } else if (pageType === "portfolio") {
      breadcrumbs.push({
        name: "Portfolio",
        url: "https://epicforgesoftware.com/portfolio",
      });
    } else if (pageType === "contact") {
      breadcrumbs.push({
        name: "Contact",
        url: "https://epicforgesoftware.com/contact",
      });
    } else if (pageType === "blog") {
      breadcrumbs.push({
        name: "Blog",
        url: "https://epicforgesoftware.com/blog",
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  };

  const getFAQSchema = () => {
    const faqs = [
      {
        question: "What services does EpicForge Software provide?",
        answer:
          "EpicForge Software provides AI-powered web development, blockchain integration, automation tools, AI SEO optimization, CRM systems, HRM systems, and omnichannel brand growth solutions for enterprises and startups worldwide.",
      },
      {
        question: "Where are EpicForge Software's offices located?",
        answer:
          "EpicForge Software has branches in Indore, Bhopal, Hyderabad, and Visakhapatnam, India.",
      },
      {
        question: "What technologies does EpicForge Software specialize in?",
        answer:
          "We specialize in AI, Blockchain, Automation, React.js, Node.js, Python, Machine Learning, and modern web technologies.",
      },
      {
        question: "How can I contact EpicForge Software?",
        answer:
          "You can contact us via email at contact@epicforgesoftware.com, WhatsApp, LinkedIn, or Instagram. We also offer free consultation calls.",
      },
    ];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  };

  const getArticleSchema = () => {
    if (pageType !== "blog" && pageType !== "case-study") return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: image,
      url: url,
      datePublished: publishedDate || new Date().toISOString(),
      dateModified: modifiedDate || new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: author,
      },
      publisher: {
        "@type": "Organization",
        name: "EpicForge Software",
        logo: {
          "@type": "ImageObject",
          url: "https://epicforgesoftware.com/Epicforgesoftware_logo.png",
        },
      },
    };
  };

  const getSoftwareApplicationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "EpicForge Software Platform",
      description:
        "AI-powered web development and automation platform for businesses",
      url: "https://epicforgesoftware.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
          "Free consultation and custom pricing for enterprise solutions",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "50",
      },
    };
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema()),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema()),
        }}
      />

      {/* Article Schema (for blog/case studies) */}
      {getArticleSchema() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getArticleSchema()),
          }}
        />
      )}

      {/* Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSoftwareApplicationSchema()),
        }}
      />
    </>
  );
};

export default SEOSchemas;
