/**
 * SEO Configuration
 * Update this file to change meta tags across the entire app
 */
export const SEO_CONFIG = {
  appName: "The Engine",
  defaultTitle: "The Engine — SaaS Boilerplate",
  titleTemplate: "%s | The Engine",
  description:
    "A production-ready SaaS boilerplate for solo founders. Launch your next idea in under 48 hours.",
  keywords: [
    "saas",
    "boilerplate",
    "nextjs",
    "typescript",
    "supabase",
    "razorpay",
    "starter kit",
    "react",
    "full-stack",
  ],
  website: "https://yourapp.com",
  ogImage: "/og-image.png",
  twitterHandle: "@yourtwitter",
} as const;

export const getTitle = (pageTitle?: string) => {
  if (!pageTitle) return SEO_CONFIG.defaultTitle;
  return pageTitle + " | " + SEO_CONFIG.appName;
};

export const getMetaDescription = (customDescription?: string) => {
  return customDescription || SEO_CONFIG.description;
};

export const getKeywords = (additionalKeywords?: string[]) => {
  return [...SEO_CONFIG.keywords, ...(additionalKeywords || [])];
};