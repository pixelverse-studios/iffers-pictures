import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jennifer Matone",
    jobTitle: "Event & Portrait Photographer",
    url: `${SITE_CONFIG.url}/about`,
    image: `${SITE_CONFIG.url}/images/jennifer-headshot.jpg`,
    email: BUSINESS_INFO.email,
    sameAs: [
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.facebook,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      addressCountry: BUSINESS_INFO.address.country,
    },
    worksFor: {
      "@id": `${SITE_CONFIG.url}/#business`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
