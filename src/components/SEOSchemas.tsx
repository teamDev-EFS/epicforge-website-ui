import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = "EpicForge Software",
  description = "AI-driven IT solutions, website development, and enterprise automation services",
  url = "https://epicforgesoftware.com",
  logo = "https://epicforgesoftware.com/logo.png",
  email = "info@epicforgesoftware.com",
  phone = "+1-555-123-4567",
  address = "San Francisco, CA, USA"
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "description": description,
    "url": url,
    "logo": logo,
    "email": email,
    "telephone": phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": address
    },
    "sameAs": [
      "https://www.linkedin.com/company/epicforgesoftware",
      "https://twitter.com/epicforgesoft",
      "https://www.facebook.com/epicforgesoftware"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "38"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface ReviewSchemaProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  reviews: {
    author: string;
    rating: number;
    datePublished: string;
    reviewBody: string;
  }[];
}

export const ReviewSchema: React.FC<ReviewSchemaProps> = ({
  itemName,
  ratingValue,
  reviewCount,
  reviews
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface BlogPostSchemaProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
}

export const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "image": image,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "EpicForge Software",
      "logo": {
        "@type": "ImageObject",
        "url": "https://epicforgesoftware.com/logo.png"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  steps
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
