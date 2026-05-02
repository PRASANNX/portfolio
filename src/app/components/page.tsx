import { Header } from "@/components/header";
import { TrustBar } from "@/components/executive/TrustBar";
import { FeaturesGrid } from "@/components/executive/FeaturesGrid";
import { PricingTable } from "@/components/executive/PricingTable";

export const metadata = {
  title: "Executive UI Components — PRX OS",
  description: "Preview the 16+ production-ready components included in PRX Startup OS.",
};

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <h1
            className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            Executive UI Showcase
          </h1>
          <p className="text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            We don't use generic DaisyUI or soft Tailwind templates. Every component is designed for maximum authority and trust.
          </p>
        </div>

        <div className="space-y-16">
          {/* Component 1 */}
          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              1. Trust Bar
            </h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <TrustBar metrics={["60M+ MSMEs", "Razorpay Built-in", "GST Compliant"]} />
            </div>
          </section>

          {/* Component 2 */}
          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              2. Features Grid (Cards)
            </h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white p-4">
              <FeaturesGrid
                title="Platform Features"
                features={[
                  { icon: "zap", title: "Speed", description: "Ship in 4 days." },
                  { icon: "shield", title: "Security", description: "RLS protected." }
                ]}
              />
            </div>
          </section>

          {/* Component 3 */}
          <section>
            <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              3. Pricing Table (One-Time)
            </h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white p-4">
              <PricingTable
                title="Simple Pricing"
                tiers={[
                  {
                    name: "Starter",
                    price: "4,999",
                    period: "one-time",
                    description: "Standard features.",
                    features: ["Feature A", "Feature B"],
                    cta_text: "Buy Now"
                  }
                ]}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
