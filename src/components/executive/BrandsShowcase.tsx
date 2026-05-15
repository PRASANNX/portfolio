import Link from "next/link";
import {
  Inbox,
  ShieldCheck,
  MessageCircleMore,
  Zap,
  PenTool,
  Users,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

// ─── 4-Brand Showcase ─────────────────────────────────────────────
const SUB_BRANDS = [
  {
    name: "CHITRAGUPT",
    category: "Legal Tech",
    archetype: "Ruler Archetype",
    description: "Automated legal documentation, GST compliance, and data protection for law firms and CA practices.",
    accent: "#1A2238",
    bg: "#F0F2F8",
    textColor: "#1A2238",
    headingWeight: "900",
    slug: "chitragupt",
    tag: "Legal",
  },
  {
    name: "GYMOS",
    category: "Health & Fitness",
    archetype: "Sage Archetype",
    description: "Client portals, appointment booking, and membership billing for gyms, wellness studios, and coaches.",
    accent: "#065F46",
    bg: "#F0FAF5",
    textColor: "#065F46",
    headingWeight: "700",
    slug: "gymos",
    tag: "Health",
  },
  {
    name: "TNC",
    category: "Real Estate",
    archetype: "Executive Dark",
    description: "Property listing portals, lead management, and commission invoicing for brokers and developers.",
    accent: "#121212",
    bg: "#F5F5F5",
    textColor: "#121212",
    headingWeight: "800",
    slug: "tnc",
    tag: "Real Estate",
  },
  {
    name: "LRM",
    category: "Education",
    archetype: "Creator Archetype",
    description: "Course portals, cohort management, and payment processing for edtech founders and coaching institutes.",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    textColor: "#7C3AED",
    headingWeight: "800",
    slug: "lrm",
    tag: "Education",
  },
];

// ─── Bento Features ───────────────────────────────────────────────
const BENTO_FEATURES = [
  {
    icon: Inbox,
    title: "Omni-Inbox",
    description: "One unified feed for WhatsApp replies, failed payments, and new inquiries — across every sub-brand you manage.",
    size: "large",
    tag: "Agency Hub",
  },
  {
    icon: ShieldCheck,
    title: "DPDP Legal Engine",
    description: "Auto-generates Privacy Policies, ToS, and Data Processing Agreements — pre-populated with your GSTIN and org details.",
    size: "small",
    tag: "Compliance",
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp Magic Links",
    description: "Passwordless client authentication via WhatsApp OTP. No email friction. Pure Indian UX.",
    size: "small",
    tag: "Auth",
  },
  {
    icon: Zap,
    title: "Viral Hook Generator",
    description: "Turn your build stats (48 hrs, ₹0 cost) into high-impression LinkedIn posts automatically.",
    size: "small",
    tag: "Growth",
  },
  {
    icon: PenTool,
    title: "Copywriting Co-Pilot",
    description: "PAS + AIDA frameworks with live preview. Type your problem — watch the post write itself.",
    size: "small",
    tag: "Growth",
  },
  {
    icon: Users,
    title: "Multi-Tenant RLS",
    description: "Row-level security ensures zero data leakage. Each org sees only its own data — always.",
    size: "small",
    tag: "Security",
  },
];

// ─── Sub-Brand Card ────────────────────────────────────────────────
function BrandCard({ brand }: { brand: typeof SUB_BRANDS[0] }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
      style={{ borderColor: brand.accent + "30", backgroundColor: brand.bg }}
    >
      {/* Tag */}
      <div className="absolute top-4 right-4">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
          style={{
            backgroundColor: brand.accent,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {brand.tag}
        </span>
      </div>

      <div className="p-6 pt-7">
        {/* Archetype */}
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60"
          style={{ fontFamily: "Inter, sans-serif", color: brand.textColor }}
        >
          {brand.archetype}
        </p>

        {/* Name */}
        <h3
          className="text-3xl mb-1 leading-none"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: brand.headingWeight,
            color: brand.textColor,
            letterSpacing: "-0.04em",
          }}
        >
          {brand.name}
        </h3>

        {/* Category */}
        <p
          className="text-sm font-semibold mb-4"
          style={{ fontFamily: "Montserrat, sans-serif", color: brand.accent }}
        >
          {brand.category}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6 opacity-75"
          style={{ fontFamily: "Inter, sans-serif", color: brand.textColor }}
        >
          {brand.description}
        </p>

        {/* CTA */}
        <Link
          href={`/${brand.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all duration-200 group-hover:gap-3"
          style={{
            fontFamily: "Montserrat, sans-serif",
            backgroundColor: brand.accent,
            color: "#fff",
          }}
        >
          View Demo Portal
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Accent bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 group-hover:h-1"
        style={{ backgroundColor: brand.accent }}
      />
    </div>
  );
}

// ─── Bento Card ───────────────────────────────────────────────────
function BentoCard({ feature }: { feature: typeof BENTO_FEATURES[0] }) {
  const Icon = feature.icon;
  const isLarge = feature.size === "large";

  return (
    <div
      className={`border border-gray-200 rounded-2xl p-6 bg-white hover:border-black transition-all duration-200 group ${
        isLarge ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-black transition-colors duration-200"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <Icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-200" />
        </div>
        <span
          className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-widest"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {feature.tag}
        </span>
      </div>
      <h3
        className="font-black text-black mb-2 tracking-tight"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: isLarge ? "1.25rem" : "1rem",
        }}
      >
        {feature.title}
      </h3>
      <p
        className="text-sm text-gray-500 leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {feature.description}
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────
export function BrandsShowcase() {
  return (
    <>
      {/* ── Section A: 4-Brand Proof of Concept ── */}
      <section id="brands" className="py-24 px-4 sm:px-6 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <span
              className="text-xs font-bold text-[#FF5F1F] uppercase tracking-widest"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Proof of Concept
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-black tracking-tighter mt-3 mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.04em" }}
            >
              4 Brands.{" "}
              <span style={{ color: "#FF5F1F" }}>1 Engine.</span>
            </h2>
            <p
              className="text-base text-gray-500 max-w-2xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Each sub-brand has its own archetype, color palette, typography weight, and client portal —
              all running from the same PRX OS deployment. This is the multi-tenant engine in production.
            </p>
          </div>

          {/* 2×2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUB_BRANDS.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>

          {/* Engine footnote */}
          <p
            className="text-center text-xs text-gray-400 mt-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Each portal is dynamically themed via CSS variables injected at the org level.{" "}
            <span className="font-semibold text-black">Zero code duplication.</span>
          </p>
        </div>
      </section>

      {/* ── Section B: Jarvis for Consultants — Bento Grid ── */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 border-b border-gray-200"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <span
              className="text-xs font-bold text-[#FF5F1F] uppercase tracking-widest"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              The Agency Toolkit
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-black tracking-tighter mt-3 mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.04em" }}
            >
              Jarvis for{" "}
              <span style={{ color: "#FF5F1F" }}>Consultants.</span>
            </h2>
            <p
              className="text-base text-gray-500 max-w-2xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              9 advanced tools built into one dashboard. Not features you'll "maybe use someday" — 
              systems that directly reduce your operational overhead and increase client perceived value.
            </p>
          </div>

          {/* Bento Grid — 3 cols, mixed sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENTO_FEATURES.map((feature) => (
              <BentoCard key={feature.title} feature={feature} />
            ))}
          </div>

          {/* Dashboard CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black text-white bg-black rounded-xl hover:bg-[#FF5F1F] transition-colors duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Open the Dashboard
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
