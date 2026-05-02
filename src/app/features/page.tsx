import { Header } from "@/components/header";
import { FeaturesGrid } from "@/components/executive/FeaturesGrid";
import { CodePreview } from "@/components/executive/CodePreview";

export const metadata = {
  title: "Features — PRX OS",
  description: "Everything you need to ship your startup in India.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-16">
          <h1
            className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            Platform Features
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
            The complete toolkit for Indian founders to bypass Stripe failures, handle GST natively, and deploy in hours instead of weeks.
          </p>
        </div>

        <FeaturesGrid
          title="Core Capabilities"
          features={[
            {
              icon: "zap",
              title: "Startup Spawner",
              description: "Generate landing pages, waitlists, and client portals with one click. Database-driven, not hard-coded.",
            },
            {
              icon: "shield",
              title: "16 Executive Components",
              description: "Invoice previews, appointment booking, document vaults, payment status cards — all production-ready.",
            },
            {
              icon: "chart",
              title: "Razorpay + UPI",
              description: "Order-based payments, UPI QR codes on desktop, UPI Intent on mobile. Webhook verification included.",
            },
            {
              icon: "zap",
              title: "GST Invoicing Engine",
              description: "Auto-splits CGST/SGST vs IGST based on place of supply. All 21 mandatory fields. GSTIN validation.",
            },
            {
              icon: "shield",
              title: "WhatsApp + Email",
              description: "Meta Cloud API integration with retry logic. Resend-compatible HTML email templates. Notification queues.",
            },
            {
              icon: "chart",
              title: "Multi-Tenant RLS",
              description: "Strict row-level security. Each org is isolated. Clients see only their data. Zero data leakage by design.",
            },
          ]}
        />

        <div className="mt-24">
          <CodePreview
            title="Production Codebase"
            subtitle="A clean, type-safe Next.js 14 App Router architecture. No messy context providers, just pure React Server Components where it matters."
          />
        </div>
      </main>
    </div>
  );
}
