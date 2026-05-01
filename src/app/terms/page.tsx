import Link from "next/link";

export const metadata = {
  title: "Terms of Service — PRX Startup OS",
  description: "Terms of service for PRX Startup OS platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="prx-wordmark text-lg text-black">PRX</Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h1
          className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-8"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
        >
          Terms of Service
        </h1>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>1. Acceptance of Terms</h2>
            <p className="leading-relaxed">By accessing or using PRX Startup OS ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>2. License</h2>
            <p className="leading-relaxed">Upon purchase, you are granted a non-exclusive, non-transferable license to use the PRX Startup OS codebase for your own projects. You may deploy unlimited instances for your own businesses or your clients&apos; businesses. You may not redistribute, resell, or sublicense the source code itself as a boilerplate or template product.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>3. Payments & Refunds</h2>
            <p className="leading-relaxed">All payments are processed through Razorpay. Prices are listed in Indian Rupees (INR) and are one-time purchases, not subscriptions. Due to the digital nature of the product, all sales are final. No refunds will be issued after the source code has been delivered.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>4. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must not use the Platform for any unlawful purpose</li>
              <li>You are responsible for your own Supabase, Razorpay, and third-party API costs</li>
              <li>You must comply with all applicable Indian laws including GST regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>5. Intellectual Property</h2>
            <p className="leading-relaxed">The PRX Startup OS brand, name, logo, and marketing materials remain the property of PRX. The source code you purchase is licensed, not sold. You may modify the code for your own use but may not claim authorship of the original codebase.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>6. Limitation of Liability</h2>
            <p className="leading-relaxed">PRX Startup OS is provided "as is" without warranty of any kind. In no event shall PRX be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>7. Governing Law</h2>
            <p className="leading-relaxed">These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>8. Contact</h2>
            <p className="leading-relaxed">For questions about these Terms, contact us at <a href="mailto:legal@prxos.com" className="font-semibold text-black hover:underline">legal@prxos.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
