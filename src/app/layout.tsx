import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRX Startup OS — India's Executive Startup Engine",
  description:
    "Launch, digitize, and scale your business with PRX Startup OS. Multi-tenant infrastructure built for India's founders.",
  keywords: [
    "startup os",
    "india saas",
    "business digitization",
    "multi-tenant",
    "prx",
  ],
  openGraph: {
    title: "PRX Startup OS",
    description: "India's Executive Startup Engine",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-[Inter]`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}