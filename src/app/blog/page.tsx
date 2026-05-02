import Link from "next/link";
import { Header } from "@/components/header";

export const metadata = {
  title: "Startup Blog & Guides — PRX OS",
  description: "Learn how to build, launch, and scale startups in India.",
};

export default function BlogPage() {
  const posts = [
    {
      slug: "razorpay-vs-stripe-india",
      title: "Razorpay vs Stripe in India: Why Stripe fails for Indian Founders",
      excerpt: "A deep dive into RBI regulations, UPI intent routing, and why $199 USD boilerplates fail in the Indian market.",
      date: "14 Oct 2026",
      category: "Payments",
    },
    {
      slug: "programmatic-seo-guide",
      title: "Programmatic SEO for Indian MSMEs",
      excerpt: "How to generate 10,000+ local landing pages using Supabase and Next.js dynamic routing.",
      date: "10 Oct 2026",
      category: "Growth",
    },
    {
      slug: "automate-gst-invoicing",
      title: "Automating 21-Field GST Invoices",
      excerpt: "The exact math and logic needed to correctly split CGST, SGST, and IGST based on the Place of Supply.",
      date: "05 Oct 2026",
      category: "Compliance",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-16">
          <h1
            className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            The PRX Blog
          </h1>
          <p className="text-lg text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            Tactical guides on building and scaling SaaS in India.
          </p>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--accent)" }}>
                  {post.category}
                </span>
                <h2
                  className="text-2xl font-black text-black mb-3 group-hover:text-gray-600 transition-colors"
                  style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em" }}
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs font-medium text-gray-400">
                  <span>{post.date}</span>
                  <span className="mx-2">·</span>
                  <span>5 min read</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
