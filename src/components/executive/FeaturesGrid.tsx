import { Zap, Shield, BarChart3, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  shield: Shield,
  chart: BarChart3,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  title: string;
  features: Feature[];
}

export function FeaturesGrid({ title, features }: FeaturesGridProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black text-center mb-12 lg:mb-16"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div
                key={i}
                className={`py-8 ${i < features.length - 1 ? "border-b border-gray-200 md:border-b-0" : ""}`}
              >
                <Icon
                  className="w-6 h-6 mb-4"
                  style={{ color: "var(--accent)" }}
                  strokeWidth={2}
                />
                <h3
                  className="text-lg font-bold text-black mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="body text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
