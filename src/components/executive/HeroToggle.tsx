"use client";

import { useState } from "react";
import Link from "next/link";

const MODES = {
  founders: {
    label: "For Founders",
    tag: "🚀 Startups",
    headline: "ShipFast is $199 and doesn't support UPI.",
    bold: "We fixed that.",
    subheadline:
      "Indian founders waste weeks stitching Stripe alternatives, fighting GST compliance, and paying in USD for tools that don't work here. PRX Startup OS is the production-ready platform built exclusively for India — Razorpay, UPI, GST invoicing, WhatsApp, all baked in. One purchase. Ship this week.",
    cta: "Get PRX OS — ₹4,999",
    ctaHref: "#pricing",
    secondary: "See What's Included",
    secondaryHref: "#features",
  },
  consultants: {
    label: "For Consultants",
    tag: "🏢 Agencies",
    headline: "You manage 8 clients with 12 different tools.",
    bold: "One engine. Every brand.",
    subheadline:
      "As a consultant, every client needs its own branded portal, invoice system, and legal compliance — but you can't afford to rebuild from scratch 8 times. PRX Startup OS is a multi-tenant agency OS: one deployment, unlimited sub-brands, each with their own domain, design system, and GST engine. Charge ₹50,000/client for what costs you ₹0 extra to maintain.",
    cta: "Start Your Agency OS",
    ctaHref: "#pricing",
    secondary: "See the 4-Brand Demo",
    secondaryHref: "#brands",
  },
};

export function HeroToggle() {
  const [mode, setMode] = useState<"founders" | "consultants">("founders");
  const content = MODES[mode];

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 border-b border-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex p-1 bg-gray-100 rounded-xl gap-1">
            {(["founders", "consultants"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  mode === m
                    ? "bg-black text-white shadow-md"
                    : "text-gray-500 hover:text-black"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {MODES[m].label}
              </button>
            ))}
          </div>
        </div>

        {/* Tag */}
        <div className="flex justify-center mb-6">
          <span
            className="text-xs font-bold text-[#FF5F1F] bg-orange-50 border border-[#FF5F1F]/20 px-3 py-1 rounded-full uppercase tracking-widest"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {content.tag}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center text-4xl md:text-6xl font-black text-black tracking-tighter leading-tight mb-4 transition-all duration-300"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.04em" }}
        >
          {content.headline}
          <br />
          <span style={{ color: "#FF5F1F" }}>{content.bold}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-center text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-300"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {content.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={content.ctaHref}
            className="px-8 py-4 text-sm font-black text-white bg-black rounded-xl hover:bg-[#FF5F1F] transition-colors duration-200 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {content.cta} →
          </Link>
          <Link
            href={content.secondaryHref}
            className="px-8 py-4 text-sm font-bold text-black bg-white border border-gray-300 rounded-xl hover:border-black transition-colors duration-200 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {content.secondary}
          </Link>
        </div>

        {/* Proof strip */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-gray-100">
          {["Razorpay + UPI Built-in", "GST-Compliant Invoicing", "DPDP Act 2023 Ready", "WhatsApp Notifications", "Multi-Tenant by Default"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F1F]" />
              <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
