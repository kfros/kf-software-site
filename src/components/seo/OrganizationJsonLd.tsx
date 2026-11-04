import React from "react";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://kf-software.com/#organization",
        name: "KF Software",
        url: "https://kf-software.com/",
        legalName: "KYRYL FROSYNIAK Solutions",
        description: "Independent software studio building focused consumer and business software.",
        founder: {
          "@type": "Person",
          "@id": "https://kf-software.com/about/#kyryl-frosyniak",
          name: "Kyryl Frosyniak",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Wrocław",
          addressCountry: "PL",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@kf-software.com",
          contactType: "customer service",
        },
      },
      {
        "@type": "Person",
        "@id": "https://kf-software.com/about/#kyryl-frosyniak",
        name: "Kyryl Frosyniak",
        url: "https://kf-software.com/about/",
        worksFor: {
          "@type": "Organization",
          "@id": "https://kf-software.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

