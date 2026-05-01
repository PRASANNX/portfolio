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
    <section id="features" className="section">
      <div className="section-inner">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black text-center mb-12 lg:mb-16"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-150"
              >
                <Icon
                  className="w-5 h-5 mb-4"
                  style={{ color: "var(--accent)" }}
                  strokeWidth={2}
                />
                <h3
                  className="text-base font-bold text-black mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em" }}
                >
                  {feature.title}
                </h3>
                <p className="body text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
