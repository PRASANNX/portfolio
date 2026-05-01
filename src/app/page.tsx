import Link from "next/link";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/executive/HeroSection";
import { FeaturesGrid } from "@/components/executive/FeaturesGrid";
import { PricingTable } from "@/components/executive/PricingTable";
import { FAQAccordion } from "@/components/executive/FAQAccordion";
import { TestimonialBlock } from "@/components/executive/TestimonialBlock";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          headline="ShipFast is $199 and doesn't support UPI. We fixed that."
          subheadline="Indian founders waste weeks stitching Stripe alternatives, fighting GST compliance, and paying in USD for tools that don't work here. PRX Startup OS is the production-ready platform built exclusively for India — Razorpay, UPI, GST invoicing, WhatsApp, all baked in. One purchase. Ship this week."
          cta_text="Get PRX OS — ₹4,999"
          cta_secondary_text="See What's Included"
        />

        {/* Features Section */}
        <FeaturesGrid
          title="Everything You Need to Ship"
          features={[
            {
              icon: "zap",
              title: "Startup Spawner",
              description: "Instantly generate landing pages, waitlists, and client portals with one click.",
            },
            {
              icon: "shield",
              title: "Executive UI",
              description: "16+ premium components designed for high-conversion and professional credibility.",
            },
            {
              icon: "chart",
              title: "Revenue Layer",
              description: "Razorpay + UPI integration with automated GST-compliant invoicing.",
            },
            {
              icon: "zap",
              title: "Growth Engine",
              description: "Programmatic SEO, JSON-LD schemas, and dynamic sitemaps baked in.",
            },
            {
              icon: "shield",
              title: "Digitizer Mode",
              description: "Turn any service business into a digital powerhouse with appointments and vault.",
            },
            {
              icon: "chart",
              title: "Multi-Tenant",
              description: "Strict RLS-based isolation for managing multiple brands from one dashboard.",
            },
          ]}
        />

        {/* Testimonials */}
        <TestimonialBlock
          title="Trusted by Founders"
          testimonials={[
            {
              name: "Aryan Sharma",
              title: "CEO",
              company: "TechFlow India",
              quote: "The PRX Startup OS allowed us to go from idea to a revenue-generating platform in less than 4 days. The GST compliance alone saved us weeks of headaches.",
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

        {/* Pricing Section */}
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

        {/* FAQ Section */}
        <FAQAccordion
          title="Frequently Asked Questions"
          faqs={[
            {
              question: "What is PRX Startup OS?",
              answer: "It is a premium multi-tenant boilerplate designed specifically for the Indian market, focusing on speed, design, and compliance.",
            },
            {
              question: "Does it support Indian payments?",
              answer: "Yes, it has deep integration with Razorpay, supporting UPI Intent on mobile and QR codes on desktop.",
            },
            {
              question: "Is it GST compliant?",
              answer: "Absolutely. It calculates CGST/SGST vs IGST based on the place of supply and generates valid 21-field GST invoices.",
            },
            {
              question: "Can I use it for multiple clients?",
              answer: "Yes, the architecture is strictly multi-tenant. You can manage multiple business projects under one account.",
            },
          ]}
        />
      </main>


      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="prx-wordmark text-xl text-black">PRX STARTUP OS</span>
              <p className="text-sm text-gray-400 mt-2">Executive-grade infrastructure for modern founders.</p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Platform</p>
                <Link href="/login" className="text-sm text-gray-500 hover:text-black">Login</Link>
                <Link href="/register" className="text-sm text-gray-500 hover:text-black">Register</Link>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black">Dashboard</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Legal</p>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-black">Privacy</Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-black">Terms</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} PRX Startup OS. Built by PRX.</p>
            <div className="flex gap-4">
               {/* Social links could go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}