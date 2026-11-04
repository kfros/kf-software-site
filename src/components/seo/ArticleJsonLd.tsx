import React from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorType?: "Organization" | "Person";
  authorName?: string;
  authorUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished = "2026-07-06",
  dateModified = "2026-07-06",
  authorType = "Organization",
  authorName = "KF Software",
  authorUrl = "https://kf-software.com",
  breadcrumbs,
  faqs = [],
}: ArticleJsonLdProps) {
  const authorSchema =
    authorType === "Person"
      ? {
          "@type": "Person",
          name: authorName,
          url: authorUrl || "https://kf-software.com/about/",
          worksFor: {
            "@type": "Organization",
            "@id": "https://kf-software.com/#organization",
          },
        }
      : {
          "@type": "Organization",
          name: authorName,
          url: authorUrl || "https://kf-software.com",
          "@id": "https://kf-software.com/#organization",
        };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      "@id": "https://kf-software.com/#organization",
      name: "KF Software",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { name: "Home", item: "https://kf-software.com/" },
    { name: "Blog", item: "https://kf-software.com/blog/" },
    { name: title, item: url },
  ];

  const activeBreadcrumbs =
    breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: activeBreadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  const faqSchema =
    faqs.length > 0
      ? {
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
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
