/**
 * PRX Startup OS — JSON-LD Schema Generators
 */

export function generateSoftwareApplicationSchema(org: {
  name: string;
  slug: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: org.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: org.description || `${org.name} — Powered by PRX Startup OS`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://prxos.com"}/${org.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };
}

export function generateLocalBusinessSchema(config: {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  gstin?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.name,
    description: config.description || config.name,
    url: config.url,
    ...(config.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: config.address,
        addressCountry: "IN",
      },
    }),
    ...(config.phone && { telephone: config.phone }),
    ...(config.email && { email: config.email }),
    ...(config.gstin && {
      taxID: config.gstin,
    }),
  };
}
