import type { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: `Dashboard | ${SEO_CONFIG.appName}`,
  description: "Your dashboard overview",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}