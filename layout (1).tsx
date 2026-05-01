import type { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: `Login | ${SEO_CONFIG.appName}`,
  description: "Sign in to your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}