import Link from "next/link";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/executive/HeroSection";
import { TrustBar } from "@/components/executive/TrustBar";
import { FeaturesGrid } from "@/components/executive/FeaturesGrid";
import { CodePreview } from "@/components/executive/CodePreview";
import { PricingTable } from "@/components/executive/PricingTable";
import { FAQAccordion } from "@/components/executive/FAQAccordion";
import { TestimonialBlock } from "@/components/executive/TestimonialBlock";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Section 1: Hero — PAS Framework */}
        <HeroSection
          headline="ShipFast is $199 and doesn't support UPI. We fixed that."
          subheadline="Indian founders waste weeks stitching Stripe alternatives, fighting GST compliance, and paying in USD for tools that don't work here. PRX Startup OS is the production-ready platform built exclusively for India — Razorpay, UPI, GST invoicing, WhatsApp, all baked in. One purchase. Ship this week."
          cta_text="Get PRX OS — ₹4,999"
          cta_secondary_text="See What's Included"
        />

        {/* Section 2: Trust / Social Proof Bar */}
        <TrustBar
          metrics={[
            "60M+ MSMEs Need Digitization",
            "Razorpay + UPI Built-in",
            "GST-Compliant",
            "95% Payment Success Rate",
          ]}
        />

        {/* Section 3: Features Grid (bordered cards) */}
        <FeaturesGrid
          title="Everything You Need to Ship"
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

        {/* Section 4: Code Preview / Product Demo (dark mode) */}
        <CodePreview
          title="See What You're Getting"
          subtitle="A complete, production-grade codebase — not a tutorial project. Clone it, configure your .env, and deploy."
        />

        {/* Section 5: Social Proof */}
        <TestimonialBlock
          title="Trusted by Founders"
          testimonials={[
            {
              name: "Aryan Sharma",
              title: "CEO",
              company: "TechFlow India",
              quote: "We went from idea to a revenue-generating platform in 4 days. The GST compliance alone saved us weeks of headaches.",
            },
            {
              name: "Priya Nair",
              title: "Founder",
              company: "DesignScale",
              quote: "The Executive Minimalist design system is stunning. Our clients are consistently impressed by the portal's professional feel.",
            },
            {
              name: "Vikram Mehta",
              title: "CTO",
              company: "LegalEase",
              quote: "Finally, a boilerplate that understands the Indian market. The Razorpay + WhatsApp integration is seamless.",
            },
          ]}
        />

        {/* Section 6: Pricing — One-time, not subscription */}
        <div id="pricing">
          <PricingTable
            title="One Price. Lifetime Access. No Subscriptions."
            tiers={[
              {
                name: "Starter",
                price: "4,999",
                period: "one-time",
                description: "Everything you need to validate and launch.",
                features: [
                  "3 Organizations",
                  "Waitlist + Landing Pages",
                  "Full Executive UI Library",
                  "Razorpay + UPI Payments",
                  "GST Invoicing Engine",
                  "6 Months of Updates",
                ],
                cta_text: "Get Starter",
              },
              {
                name: "Professional",
                price: "9,999",
                period: "one-time",
                description: "For agencies and serial builders.",
                features: [
                  "Unlimited Organizations",
                  "Full Executive UI Library",
                  "Razorpay + UPI Integration",
                  "GST Invoicing + WhatsApp",
                  "Client Portal + Document Vault",
                  "Custom Domains",
                  "Lifetime Updates",
                  "Priority Support",
                ],
                cta_text: "Get Professional",
                highlighted: true,
              },
            ]}
          />
        </div>

        {/* Section 7: FAQ */}
        <div id="faq">
          <FAQAccordion
            title="Frequently Asked Questions"
            faqs={[
              {
                question: "How is this different from ShipFast or other boilerplates?",
                answer: "ShipFast costs $199, uses Stripe (which has limited India support), and doesn't handle GST invoicing. PRX OS is built ground-up for the Indian market with Razorpay, UPI, WhatsApp, and CGST/SGST/IGST compliance.",
              },
              {
                question: "Is this a subscription?",
                answer: "No. One-time purchase. You own the code forever. Updates are included for the duration specified in your plan.",
              },
              {
                question: "Does it support UPI payments?",
                answer: "Yes. UPI Intent on mobile (auto-opens Google Pay / PhonePe), QR code scanning on desktop, and standard Razorpay checkout as fallback.",
              },
              {
                question: "Is it GST compliant?",
                answer: "Fully. It auto-calculates CGST/SGST for intra-state and IGST for inter-state transactions. Generates invoices with all 21 mandatory fields including GSTIN, HSN/SAC codes, and place of supply.",
              },
              {
                question: "Can I use it for multiple clients?",
                answer: "Yes. The architecture is strictly multi-tenant with row-level security. Each organization is completely isolated. You can run unlimited brands from one dashboard.",
              },
            ]}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="prx-wordmark text-xl text-black">PRX STARTUP OS</span>
              <p className="text-sm text-gray-400 mt-2">Executive-grade infrastructure for Indian founders.</p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Platform</p>
                <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors">Login</Link>
                <Link href="/register" className="text-sm text-gray-500 hover:text-black transition-colors">Register</Link>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black transition-colors">Dashboard</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Legal</p>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">Privacy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">Terms</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} PRX Startup OS. Built by PRX.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}