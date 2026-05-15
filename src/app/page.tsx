import Link from "next/link";
import { Header } from "@/components/header";
import { HeroToggle } from "@/components/executive/HeroToggle";
import { BrandsShowcase } from "@/components/executive/BrandsShowcase";
import { TrustBar } from "@/components/executive/TrustBar";
import { CodePreview } from "@/components/executive/CodePreview";
import { PricingTable } from "@/components/executive/PricingTable";
import { FAQAccordion } from "@/components/executive/FAQAccordion";
import { TestimonialBlock } from "@/components/executive/TestimonialBlock";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Section 1: Interactive Hero — Founder/Consultant Toggle */}
        <HeroToggle />

        {/* Section 2: Trust Bar */}
        <TrustBar
          metrics={[
            "60M+ MSMEs Need Digitization",
            "Razorpay + UPI Built-in",
            "GST-Compliant",
            "95% Payment Success Rate",
          ]}
        />

        {/* Section 3: 4-Brand Showcase + Bento Features Grid */}
        <BrandsShowcase />

        {/* Section 4: Code Preview / Product Demo */}
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

        {/* Section 6: Pricing */}
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
              <span
                className="text-xl font-black text-black tracking-tighter"
                style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.05em" }}
              >
                PRX STARTUP OS
              </span>
              <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                Executive-grade infrastructure for Indian founders.
              </p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <p
                  className="text-xs font-bold text-black uppercase tracking-widest mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Platform
                </p>
                <Link href="/login" className="text-sm text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Login</Link>
                <Link href="/register" className="text-sm text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Register</Link>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Dashboard</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p
                  className="text-xs font-bold text-black uppercase tracking-widest mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Legal
                </p>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Privacy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Terms</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              © {new Date().getFullYear()} PRX Startup OS. Built by PRX.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}