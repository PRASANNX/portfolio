"use client";

import { useState } from "react";
import { PenTool, Eye, Copy, Check } from "lucide-react";

type Framework = "PAS" | "AIDA";

const LABELS: Record<Framework, { a: string; b: string; c: string }> = {
  PAS: { a: "🎯 PROBLEM", b: "🔥 AGITATE", c: "✅ SOLUTION" },
  AIDA: { a: "👀 ATTENTION", b: "📣 INTEREST", c: "🚀 ACTION" },
};

const PLACEHOLDERS: Record<Framework, { a: string; b: string; c: string }> = {
  PAS: {
    a: "e.g., You're spending weeks setting up boilerplate code...",
    b: "e.g., Meanwhile, your competitors are shipping and your dopamine is dropping...",
    c: 'e.g., PRX OS gives you Razorpay, Auth, and GST invoices out of the box in 48 hours.',
  },
  AIDA: {
    a: "e.g., What if you could launch a full SaaS in 48 hours?",
    b: "e.g., Every Indian founder wastes ₹2L+ wiring Stripe alternatives that don't support UPI...",
    c: "e.g., Get PRX OS today — one purchase, lifetime access, ship this week.",
  },
};

export default function CopywritingCoPilotPage() {
  const [framework, setFramework] = useState<Framework>("PAS");
  const [fieldA, setFieldA] = useState("");
  const [fieldB, setFieldB] = useState("");
  const [fieldC, setFieldC] = useState("");
  const [copied, setCopied] = useState(false);

  const labels = LABELS[framework];
  const placeholders = PLACEHOLDERS[framework];

  const hasContent = fieldA || fieldB || fieldC;

  // ─── Build live preview ─────────────────────────────
  const buildPreview = (): string => {
    if (!hasContent) return "";
    const a = fieldA || "[waiting for input...]";
    const b = fieldB || "[waiting for input...]";
    const c = fieldC || "[waiting for input...]";

    if (framework === "PAS") {
      return `${a}

${b}

Every month you delay costs you credibility, revenue, and sanity.

But here's what changes when you get this right:

${c}

This isn't theory. This is the exact system powering PRX Startup OS — built in 48 hours and charging ₹60,000/client.

The question isn't "can I afford to fix this?" — it's "can I afford not to?"

DM me "ENGINE" and I'll show you exactly how.

#StartupOS #IndiaFounders #Consulting #BuildInPublic`;
    }

    return `${a}

${b}

The founders who move fast don't have more resources. They have better systems.

${c}

We've already helped 50+ consultants digitize their entire business in under an hour. The only question is — are you next?

Comment "READY" and I'll share the playbook.

#AIDA #Consulting #IndiaStartups #ProductivityHack`;
  };

  const preview = buildPreview();

  const handleCopy = () => {
    if (!preview) return;
    navigator.clipboard?.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <PenTool className="w-5 h-5 text-[#FF5F1F]" />
          <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
            Copywriting Co-Pilot
          </h1>
        </div>

        {/* Framework Toggle */}
        <div className="flex p-0.5 bg-gray-100 rounded-md border border-gray-200">
          {(["PAS", "AIDA"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFramework(f)}
              className={`
                px-4 py-1.5 font-['Montserrat'] text-xs font-bold rounded-md transition-all duration-150
                ${framework === f ? "bg-[#121212] text-white" : "text-gray-500 hover:text-black"}
              `}
            >
              {f} Framework
            </button>
          ))}
        </div>
      </div>

      {/* Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-3rem)] border border-gray-200 rounded-lg overflow-hidden">
        {/* ─── LEFT: Editor (Dark) ──────────────────────── */}
        <div className="bg-[#121212] p-8 overflow-y-auto flex flex-col">
          <p className="font-['Inter'] text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-6">
            {framework} Editor
          </p>

          <div className="space-y-5 flex-1">
            {/* Field A */}
            <div>
              <label className="font-['Inter'] text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                {labels.a}
              </label>
              <textarea
                rows={4}
                value={fieldA}
                onChange={(e) => setFieldA(e.target.value)}
                placeholder={placeholders.a}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors resize-none"
              />
            </div>

            {/* Field B */}
            <div>
              <label className="font-['Inter'] text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                {labels.b}
              </label>
              <textarea
                rows={4}
                value={fieldB}
                onChange={(e) => setFieldB(e.target.value)}
                placeholder={placeholders.b}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors resize-none"
              />
            </div>

            {/* Field C */}
            <div>
              <label className="font-['Inter'] text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                {labels.c}
              </label>
              <textarea
                rows={4}
                value={fieldC}
                onChange={(e) => setFieldC(e.target.value)}
                placeholder={placeholders.c}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Live Preview (Light) ─────────────── */}
        <div className="bg-white p-8 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                Live Landing Page Preview
              </p>
              {hasContent && (
                <span className="w-2 h-2 rounded-full bg-[#FF5F1F] animate-pulse" />
              )}
            </div>
            <button
              onClick={handleCopy}
              disabled={!preview}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 font-['Montserrat'] text-xs font-bold rounded-md transition-all
                ${
                  preview
                    ? copied
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-200"
                      : "text-black bg-gray-100 border border-gray-200 hover:bg-[#121212] hover:text-white hover:border-[#121212]"
                    : "text-gray-300 bg-gray-50 border border-gray-100 cursor-not-allowed"
                }
              `}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Preview Card */}
          <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white">
            {preview ? (
              <div className="space-y-1">
                <p className="font-['Inter'] text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {preview}
                </p>

                {/* Stats bar */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex gap-6 font-['Inter'] text-xs text-gray-400">
                    <span>{preview.split(/\s+/).filter(Boolean).length} words</span>
                    <span>{preview.length} chars</span>
                    <span className={`ml-auto font-bold ${preview.length < 3000 ? "text-emerald-600" : "text-amber-600"}`}>
                      {preview.length < 3000 ? "✓ LinkedIn optimal" : "⚠ Consider trimming"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <PenTool className="w-8 h-8 text-gray-200 mb-3" />
                <p className="font-['Montserrat'] text-sm font-bold text-black mb-1">
                  Start typing to see your copy
                </p>
                <p className="font-['Inter'] text-xs text-gray-400">
                  The preview builds in real-time as you fill in the {framework} fields.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
