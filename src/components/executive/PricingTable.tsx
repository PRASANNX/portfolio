import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  currency?: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta_text?: string;
}

interface PricingTableProps {
  title?: string;
  tiers: PricingTier[];
}

export function PricingTable({ title, tiers }: PricingTableProps) {
  return (
    <section className="section bg-gray-50">
      <div className="section-inner">
        {title && (
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black text-center mb-12"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg p-8 transition-transform duration-200 ${
                tier.highlighted
                  ? "border-2 md:scale-105 shadow-lg"
                  : "border border-gray-200"
              }`}
              style={
                tier.highlighted
                  ? { borderColor: "var(--accent)" }
                  : undefined
              }
            >
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {tier.name}
              </p>
              <div className="mb-2">
                <span
                  className="text-4xl font-black text-black"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {tier.currency || "₹"}{tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-gray-500 ml-2">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="body text-gray-500 mb-6">{tier.description}</p>

              <button
                className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors duration-200 mb-6 ${
                  tier.highlighted ? "btn-primary" : "btn-secondary"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {tier.cta_text || "Get Started"}
              </button>

              <ul className="space-y-3">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--accent)" }}
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
