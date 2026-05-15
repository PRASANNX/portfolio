"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CONTENT = {
  founders: {
    h1: "Ship Startups in Hours, Not Weeks.",
    sub: "Stop stitching Stripe alternatives, fighting GST compliance, and paying in USD for tools that don't work in India. PRX Startup OS gives you Razorpay, UPI, GST invoicing, WhatsApp, and a multi-tenant portal — production-ready, out of the box.",
  },
  consultants: {
    h1: "Digitize Businesses in 48 Hours.",
    sub: "Your clients need branded portals, invoice systems, and legal compliance — but you can't afford to rebuild from scratch 8 times. One deployment, unlimited sub-brands, each with their own domain, design system, and revenue engine.",
  },
};

export function HeroSection() {
  const [mode, setMode] = useState<"founders" | "consultants">("founders");
  const c = CONTENT[mode];

  return (
    <section className="pt-28 pb-24 px-4 sm:px-6 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto text-center">
        {/* Toggle */}
        <div className="inline-flex p-1 border border-gray-200 rounded-md mb-12">
          {(["founders", "consultants"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`
                px-5 py-2 font-['Montserrat'] text-sm font-bold rounded-md transition-all duration-200
                ${mode === m ? "bg-[#121212] text-white" : "text-gray-500 hover:text-black"}
              `}
            >
              {m === "founders" ? "For Founders" : "For Consultants"}
            </button>
          ))}
        </div>

        {/* H1 */}
        <h1 className="font-['Montserrat'] text-5xl md:text-7xl font-black text-black tracking-tighter leading-[1.05] mb-6">
          {c.h1}
        </h1>

        {/* Subheadline */}
        <p className="font-['Inter'] text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
          {c.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white px-8 py-4 font-['Montserrat'] font-bold text-sm rounded-md"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#brands"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition-colors text-black px-8 py-4 font-['Montserrat'] font-bold text-sm rounded-md border border-gray-200"
          >
            View Live Demos
          </Link>
        </div>
      </div>
    </section>
  );
}
