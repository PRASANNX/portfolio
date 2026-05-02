import { Header } from "@/components/header";
import { FAQAccordion } from "@/components/executive/FAQAccordion";

export const metadata = {
  title: "FAQ — PRX OS",
  description: "Frequently Asked Questions about PRX Startup OS.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-16 text-center">
          <h1
            className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            Got Questions?
          </h1>
          <p className="text-lg text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            Everything you need to know about the platform.
          </p>
        </div>

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
            {
              question: "What stack does it use?",
              answer: "Next.js 14 (App Router), Tailwind CSS, Supabase (PostgreSQL + Auth + Storage), and Razorpay for payments.",
            },
          ]}
        />
      </main>
    </div>
  );
}
