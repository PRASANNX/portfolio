"use client";

import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  noIndex = false,
}: SEOProps) {
  // Update meta tags dynamically
  useEffect(() => {
    if (!document) return;

    const updateMeta = (name: string, content: string, isProperty?: boolean) => {
      let meta = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(isProperty ? "property" : "name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    if (title) {
      document.title = title;
      updateMeta("og:title", title, true);
      updateMeta("twitter:title", title);
    }

    if (description) {
      updateMeta("description", description);
      updateMeta("og:description", description, true);
    }

    if (keywords?.length) {
      updateMeta("keywords", keywords.join(", "));
    }

    if (ogImage) {
      updateMeta("og:image", ogImage, true);
      updateMeta("twitter:image", ogImage);
    }

    if (noIndex) {
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    }
  }, [title, description, keywords, ogImage, noIndex]);

  return null;
}

/**
 * Generate full metadata object for Next.js
 * Use in your page files: export const metadata = generateMetadata()
 */
export function generateMetadata(props?: {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
}) {
  const { SEO_CONFIG, getTitle, getMetaDescription } = require("./config");

  return {
    title: props?.title || SEO_CONFIG.defaultTitle,
    description: props?.description || SEO_CONFIG.description,
    keywords: props?.keywords || SEO_CONFIG.keywords,
    metadataBase: new URL(SEO_CONFIG.website),
    openGraph: {
      title: getTitle(props?.title),
      description: getMetaDescription(props?.description),
      url: props?.path || SEO_CONFIG.website,
      siteName: SEO_CONFIG.appName,
      images: [
        {
          url: SEO_CONFIG.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: getTitle(props?.title),
      description: getMetaDescription(props?.description),
      site: SEO_CONFIG.twitterHandle,
      images: [SEO_CONFIG.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}