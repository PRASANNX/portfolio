import { Header } from "@/components/header";
import { PricingTable } from "@/components/executive/PricingTable";

export const metadata = {
  title: "Pricing — PRX OS",
  description: "Simple, one-time pricing for Indian startups.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-16">
          <h1
            className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            Invest Once. Ship Forever.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
            No recurring subscriptions. No hidden fees. Own the source code and deploy as many times as you want.
          </p>
        </div>

        <PricingTable
          title="Choose Your OS Plan"
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
      </main>
    </div>
  );
}
