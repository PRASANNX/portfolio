/**
 * PRX Startup OS — Dynamic SEO Metadata Generator
 */

export function generateOrgMetadata(org: {
  name: string;
  slug: string;
  accent_color: string;
}) {
  return {
    title: org.name,
    description: `Join ${org.name} — Early access waitlist`,
    openGraph: {
      title: org.name,
      description: `Join ${org.name} — Early access waitlist`,
      images: [
        `/api/og/executive?title=${encodeURIComponent(org.name)}&accent=${encodeURIComponent(org.accent_color)}&category=BUSINESS`,
      ],
      type: "website" as const,
    },
    icons: {
      icon: `/api/favicon?letter=${org.name.charAt(0).toUpperCase()}&color=${encodeURIComponent(org.accent_color)}`,
    },
  };
}

export function generatePageMetadata(
  org: { name: string; slug: string; accent_color: string },
  page: { seo_title?: string | null; seo_description?: string | null }
) {
  return {
    title: page.seo_title || org.name,
    description: page.seo_description || `Join ${org.name} — Early access waitlist`,
    openGraph: {
      title: page.seo_title || org.name,
      description: page.seo_description || `Join ${org.name}`,
      images: [
        `/api/og/executive?title=${encodeURIComponent(page.seo_title || org.name)}&accent=${encodeURIComponent(org.accent_color)}&category=PAGE`,
      ],
      type: "website" as const,
    },
  };
}
