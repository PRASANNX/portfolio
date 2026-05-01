interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company?: string;
}

interface TestimonialBlockProps {
  title?: string;
  testimonials: Testimonial[];
}

export function TestimonialBlock({ title, testimonials }: TestimonialBlockProps) {
  return (
    <section className="section">
      <div className="section-inner">
        {title && (
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black text-center mb-12"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6 flex flex-col">
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.title}{t.company ? `, ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
