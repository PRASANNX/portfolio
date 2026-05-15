import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const BRANDS = [
  {
    name: "CHITRAGUPT",
    category: "Legal Tech",
    archetype: "The Ruler",
    color: "#1A2238",
    description:
      "Automated legal documentation, GST compliance audits, and DPDP data protection for law firms and CA practices.",
    slug: "chitragupt",
  },
  {
    name: "GYMOS",
    category: "Health & Fitness",
    archetype: "The Sage",
    color: "#065F46",
    description:
      "Client portals, appointment booking, and membership billing for gyms, wellness studios, and personal coaches.",
    slug: "gymos",
  },
  {
    name: "TNC",
    category: "Real Estate",
    archetype: "The Executive",
    color: "#121212",
    description:
      "Property listing portals, lead management, commission invoicing, and site visit scheduling for brokers and developers.",
    slug: "tnc",
  },
  {
    name: "LRM",
    category: "Education",
    archetype: "The Creator",
    color: "#7C3AED",
    description:
      "Course portals, cohort management, fee collection, and certificate generation for edtech founders and coaching institutes.",
    slug: "lrm",
  },
];

export function SubBrandShowcase() {
  return (
    <section id="brands" className="py-24 px-4 sm:px-6 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-['Inter'] text-xs font-bold text-[#FF5F1F] uppercase tracking-[0.15em] mb-3">
            Proof of Concept
          </p>
          <h2 className="font-['Montserrat'] text-4xl md:text-5xl font-black text-black tracking-tighter mb-4">
            4 Brands. <span className="text-[#FF5F1F]">1 Engine.</span>
          </h2>
          <p className="font-['Inter'] text-base text-gray-500 max-w-2xl mx-auto">
            Each sub-brand runs on the same PRX OS deployment with its own archetype, color palette, typography, and client portal. Zero code duplication.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand.slug}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-all duration-200"
            >
              {/* Colored Header */}
              <div
                className="px-6 py-8"
                style={{ backgroundColor: brand.color }}
              >
                <p className="font-['Inter'] text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">
                  {brand.archetype}
                </p>
                <h3 className="font-['Montserrat'] text-4xl font-black text-white tracking-tighter leading-none">
                  {brand.name}
                </h3>
                <p className="font-['Montserrat'] text-sm font-bold text-white/70 mt-2">
                  {brand.category}
                </p>
              </div>

              {/* Description + CTA */}
              <div className="px-6 py-5 bg-white">
                <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed mb-4">
                  {brand.description}
                </p>
                <Link
                  href={`/${brand.slug}`}
                  className="inline-flex items-center gap-2 font-['Montserrat'] text-xs font-bold text-black border border-gray-200 px-4 py-2.5 rounded-md hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all duration-200 group-hover:gap-3"
                >
                  View Demo Portal
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="font-['Inter'] text-center text-xs text-gray-400 mt-8">
          Each portal is dynamically themed via CSS variables injected at the database level.{" "}
          <span className="font-bold text-black">Zero code duplication.</span>
        </p>
      </div>
    </section>
  );
}
