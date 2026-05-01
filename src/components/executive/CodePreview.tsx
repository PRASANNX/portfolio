interface CodePreviewProps {
  title?: string;
  subtitle?: string;
}

export function CodePreview({ title, subtitle }: CodePreviewProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#121212" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            {title || "See What You're Getting"}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Terminal / Code Window */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-white/10 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="ml-4 text-xs text-gray-500 font-mono">PRX Startup OS — Project Structure</span>
            </div>

            {/* Code content */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto" style={{ backgroundColor: "#0D0D0D" }}>
              <div className="text-gray-500">{"// Clone → Configure → Ship. That's it."}</div>
              <div className="mt-3" />
              <div><span className="text-gray-500">src/</span></div>
              <div><span className="text-gray-500">├── </span><span className="text-white">app/</span></div>
              <div><span className="text-gray-500">│   ├── </span><span className="text-white">[orgSlug]/</span><span className="text-gray-500">          ← Multi-tenant public pages</span></div>
              <div><span className="text-gray-500">│   │   ├── </span><span className="text-gray-400">portal/</span><span className="text-gray-500">           ← Client portal (RLS-scoped)</span></div>
              <div><span className="text-gray-500">│   │   └── </span><span className="text-gray-400">sitemap.xml/</span><span className="text-gray-500">      ← Programmatic SEO</span></div>
              <div><span className="text-gray-500">│   ├── </span><span className="text-white">dashboard/</span><span className="text-gray-500">            ← Admin dashboard</span></div>
              <div><span className="text-gray-500">│   └── </span><span className="text-white">api/</span></div>
              <div><span className="text-gray-500">│       ├── </span><span style={{ color: "#FF5F1F" }}>payments/</span><span className="text-gray-500">         ← Razorpay + UPI + Webhooks</span></div>
              <div><span className="text-gray-500">│       ├── </span><span style={{ color: "#FF5F1F" }}>waitlist/</span><span className="text-gray-500">          ← Waitlist capture API</span></div>
              <div><span className="text-gray-500">│       └── </span><span style={{ color: "#FF5F1F" }}>og/</span><span className="text-gray-500">               ← Dynamic OG images (Edge)</span></div>
              <div><span className="text-gray-500">├── </span><span className="text-white">components/executive/</span><span className="text-gray-500"> ← 16 premium UI components</span></div>
              <div><span className="text-gray-500">└── </span><span className="text-white">lib/</span></div>
              <div><span className="text-gray-500">    ├── </span><span className="text-gray-400">gst-calculator.ts</span><span className="text-gray-500">     ← CGST/SGST/IGST auto-split</span></div>
              <div><span className="text-gray-500">    ├── </span><span className="text-gray-400">invoice.ts</span><span className="text-gray-500">            ← 21-field GST invoice engine</span></div>
              <div><span className="text-gray-500">    ├── </span><span className="text-gray-400">whatsapp.ts</span><span className="text-gray-500">           ← Meta Cloud API + retry</span></div>
              <div><span className="text-gray-500">    └── </span><span className="text-gray-400">razorpay.ts</span><span className="text-gray-500">           ← Orders + HMAC verification</span></div>
              <div className="mt-4" />
              <div className="text-gray-500">{"// 5 DB migrations · 8 API routes · 16 components · 0 config headaches"}</div>
            </div>
          </div>

          {/* Stats row below terminal */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { value: "16", label: "UI Components" },
              { value: "8", label: "API Routes" },
              { value: "5", label: "DB Migrations" },
              { value: "0", label: "Config Headaches" },
            ].map((stat, i) => (
              <div key={i} className="text-center py-4 border border-white/10 rounded-lg">
                <p
                  className="text-2xl font-black text-white mb-1"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
