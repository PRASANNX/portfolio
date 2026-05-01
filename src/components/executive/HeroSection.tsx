interface HeroSectionProps {
  headline: string;
  subheadline: string;
  cta_text: string;
  cta_secondary_text?: string;
  onCtaClick?: () => void;
  onSecondaryClick?: () => void;
}

export function HeroSection({
  headline,
  subheadline,
  cta_text,
  cta_secondary_text,
  onCtaClick,
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-black mb-6"
          style={{ fontFamily: "Montserrat, sans-serif", lineHeight: 1.05 }}
        >
          {headline}
        </h1>
        <p
          className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCtaClick}
            className="btn-primary px-8 py-4 rounded-lg text-base sm:text-lg w-full sm:w-auto"
          >
            {cta_text}
          </button>
          {cta_secondary_text && (
            <button
              onClick={onSecondaryClick}
              className="btn-secondary px-8 py-4 rounded-lg text-base sm:text-lg w-full sm:w-auto"
            >
              {cta_secondary_text}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
