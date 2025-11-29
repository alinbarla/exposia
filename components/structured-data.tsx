export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://exposia.se/#organization",
    name: "Exposia",
    legalName: "Exposia",
    url: "https://exposia.se",
    logo: "https://exposia.se/exposia%20logo.png",
    image: "https://exposia.se/image.png",
    description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. Vi erbjuder fastighetsfotografering, drönarfotografi, fastighetsvideo och 3D-planritning med garanterad 24-timmarsleverans.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressRegion: "Stockholm",
      addressLocality: "Stockholm",
    },
    areaServed: {
      "@type": "City",
      name: "Stockholm",
    },
    telephone: "+46763441168",
    email: "info@exposia.se",
    priceRange: "1400-4000 SEK",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    sameAs: [
      "https://www.facebook.com/exposia",
      "https://www.instagram.com/exposia",
      "https://www.linkedin.com/company/exposia",
    ],
    founder: {
      "@type": "Person",
      name: "Alin Barla",
      email: "info@exposia.se",
      telephone: "+46763441168",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fastighetsfotografi och Bostadsvideo",
    provider: {
      "@type": "LocalBusiness",
      name: "Exposia",
    },
    areaServed: {
      "@type": "City",
      name: "Stockholm",
    },
    description: "Professionell fastighetsfotografi och bostadsvideo i Stockholm. Vi erbjuder fastighetsfotografering, drönarfotografi, fastighetsvideo, 3D-planritning och skymningsbilder med garanterad 24-timmarsleverans.",
    offers: [
      {
        "@type": "Offer",
        name: "Fastighetsfotografi - Lägenhet",
        price: "1400",
        priceCurrency: "SEK",
        description: "1 session med 20-25 interiörfoton, 3 exteriörfoton, 1 skymningsbild, 3 drönarbilder och 1 planritning. 1 rum och alla övriga utrymmen ingår. 24h leverans.",
      },
      {
        "@type": "Offer",
        name: "Fastighetsfotografi - Villa",
        price: "2600",
        priceCurrency: "SEK",
        description: "1 session med 20-25 interiörfoton, 3 exteriörfoton, 1 skymningsbild, 3 drönarbilder och 1 planritning. 2 rum och alla övriga utrymmen ingår. 24h leverans.",
      },
      {
        "@type": "Offer",
        name: "Bostadsvideo - Lägenhet",
        price: "2200",
        priceCurrency: "SEK",
        description: "30 sekunders video (horisontell eller vertikal) med drönarvideo inkluderad. 24h leverans.",
      },
      {
        "@type": "Offer",
        name: "Bostadsvideo - Villa",
        price: "3200",
        priceCurrency: "SEK",
        description: "30 sekunders video (horisontell eller vertikal) med drönarvideo inkluderad. 24h leverans.",
      },
      {
        "@type": "Offer",
        name: "Fotografi + Video - Lägenhet",
        price: "2700",
        priceCurrency: "SEK",
        description: "Kombinerat paket med allt från fotografi och video. 1 rum och alla övriga utrymmen ingår. 24h leverans.",
      },
      {
        "@type": "Offer",
        name: "Fotografi + Video - Villa",
        price: "4000",
        priceCurrency: "SEK",
        description: "Kombinerat paket med allt från fotografi och video. 2 rum och alla övriga utrymmen ingår. 24h leverans.",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Exposia",
    url: "https://exposia.se",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://exposia.se/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Tjänster",
        url: "https://exposia.se/#features",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Så fungerar det",
        url: "https://exposia.se/#how-it-works",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Omdömen",
        url: "https://exposia.se/#testimonials",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Vanliga frågor",
        url: "https://exposia.se/#faq",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Priser",
        url: "https://exposia.se/#pricing",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Kontakt",
        url: "https://exposia.se/contact",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: "https://exposia.se",
      },
    ],
  };

  // Site Navigation Element schema for better sitelinks support
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Huvudmeny",
    url: "https://exposia.se",
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Tjänster",
        url: "https://exposia.se/#features",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Så fungerar det",
        url: "https://exposia.se/#how-it-works",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Omdömen",
        url: "https://exposia.se/#testimonials",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Vanliga frågor",
        url: "https://exposia.se/#faq",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Priser",
        url: "https://exposia.se/#pricing",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Kontakt",
        url: "https://exposia.se/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
    </>
  );
}

