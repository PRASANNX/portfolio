interface TrustBarProps {
  metrics: string[];
}

export function TrustBar({ metrics }: TrustBarProps) {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-x-8">
              <span
                className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {metric}
              </span>
              {i < metrics.length - 1 && (
                <span className="hidden sm:block w-px h-4 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
