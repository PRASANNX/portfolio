import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — PRX Startup OS",
  description: "Privacy policy for PRX Startup OS platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
          Privacy Policy
        </h1>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>1. Information We Collect</h2>
            <p className="leading-relaxed">We collect information you provide directly to us, including your name, email address, phone number, and payment information. When you use our platform, we also collect usage data, device information, and IP addresses.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To process transactions and send related information</li>
              <li>To send you technical notices, updates, and support messages</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To monitor and analyze trends, usage, and activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>3. Data Storage & Security</h2>
            <p className="leading-relaxed">Your data is stored on Supabase infrastructure in the ap-south-1 (Mumbai) region. We implement industry-standard security measures including encryption at rest, row-level security (RLS), and regular security audits. Payment data is processed by Razorpay and never stored on our servers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>4. Third-Party Services</h2>
            <p className="leading-relaxed">We use the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> — Database and authentication</li>
              <li><strong>Razorpay</strong> — Payment processing</li>
              <li><strong>Vercel</strong> — Hosting and deployment</li>
              <li><strong>Resend</strong> — Email communications</li>
              <li><strong>Meta (WhatsApp)</strong> — Notification delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>5. Your Rights</h2>
            <p className="leading-relaxed">You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a complete export of your data by contacting us.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mt-8 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>6. Contact</h2>
            <p className="leading-relaxed">For any privacy-related questions, contact us at <a href="mailto:privacy@prxos.com" className="font-semibold text-black hover:underline">privacy@prxos.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
