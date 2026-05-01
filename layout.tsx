import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SEO_CONFIG } from "@/lib/seo/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}