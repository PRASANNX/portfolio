import { Header } from "@/components/header";
import { TrustBar } from "@/components/executive/TrustBar";
import { TestimonialBlock } from "@/components/executive/TestimonialBlock";

export const metadata = {
  title: "Social Proof — PRX OS",
  description: "See what founders are saying about PRX Startup OS.",
};

export default function ProofPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <h1
            className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            Proof of Work
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
            Don't just take our word for it. Here is the data and the founders who have successfully launched using PRX OS.
          </p>
        </div>

        <div className="mb-24">
          <TrustBar
            metrics={[
              "60M+ MSMEs Need Digitization",
              "Razorpay + UPI Built-in",
              "GST-Compliant",
              "95% Payment Success Rate",
            ]}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <TestimonialBlock
            title="Trusted by Indian Builders"
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
              {
                name: "Rohan Gupta",
                title: "Indie Hacker",
                company: "GrowthX",
                quote: "I was struggling with Stripe atlas and foreign entity setups. PRX OS let me launch my SaaS locally with zero friction.",
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
