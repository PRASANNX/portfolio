"use client";

import { useState } from "react";
import { PenTool, Eye, Copy, Loader2 } from "lucide-react";

const PLACEHOLDER = {
  problem: "My clients waste 10 hours a week on manual invoicing and miss GST deadlines...",
  agitate:
    "This leads to GST penalties, delayed vendor payments, and lost credibility with investors...",
  solution:
    "PRX Startup OS automates your entire billing cycle with one-click GST invoices, Razorpay integration, and DPDP compliance...",
};

function buildCopy(problem: string, agitate: string, solution: string): string {
  if (!problem && !agitate && !solution) return "";
  const p = problem || "[Your client's pain point]";
  const a = agitate || "[The real cost of inaction]";
  const s = solution || "[How you solve it]";
  return `❌ ${p}

And the worst part? ${a}

Every month you delay costs you credibility, revenue, and sanity.

But here's what changes when you get this right:

✅ ${s}

This isn't theory. This is the exact system I built in 48 hours using PRX Startup OS.

The question isn't "can I afford to fix this?" — it's "can I afford not to?"

Reply "SOLVE" and I'll show you exactly how.

#IndiaStartups #Consulting #ProductivityHack`;
}

export default function CopywritingPage() {
  const [problem, setProblem] = useState("");
  const [agitate, setAgitate] = useState("");
  const [solution, setSolution] = useState("");
  const [framework, setFramework] = useState<"PAS" | "AIDA">("PAS");
  const [isCopied, setIsCopied] = useState(false);

  const generatedCopy = buildCopy(problem, agitate, solution);
  const hasContent = problem || agitate || solution;

  const handleCopy = () => {
    if (!generatedCopy) return;
    navigator.clipboard?.writeText(generatedCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <PenTool className="w-6 h-6 text-[#FF5F1F]" />
          <h1
            className="text-2xl font-black text-black tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Copywriting Co-Pilot
          </h1>
        </div>
        <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          High-conversion copy using battle-tested frameworks. Preview updates as you type.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      {/* Framework Toggle */}
      <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
        {(["PAS", "AIDA"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFramework(f)}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-150 ${
              framework === f ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"
            }`}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {f} Framework
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Input */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
          <h2
            className="text-xs font-black text-gray-400 uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {framework} Inputs
          </h2>

          <div>
            <label
              className="block text-xs font-bold text-black mb-1.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {framework === "PAS" ? "🎯 PROBLEM" : "🎯 ATTENTION"}
            </label>
            <textarea
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder={PLACEHOLDER.problem}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold text-black mb-1.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {framework === "PAS" ? "🔥 AGITATE" : "📣 INTEREST"}
            </label>
            <textarea
              rows={3}
              value={agitate}
              onChange={(e) => setAgitate(e.target.value)}
              placeholder={PLACEHOLDER.agitate}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold text-black mb-1.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {framework === "PAS" ? "✅ SOLUTION" : "🚀 ACTION"}
            </label>
            <textarea
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder={PLACEHOLDER.solution}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span
                className="text-xs font-bold text-gray-500 uppercase tracking-widest"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Live Preview
              </span>
              {hasContent && (
                <span className="w-2 h-2 rounded-full bg-[#FF5F1F] animate-pulse" />
              )}
            </div>
            <button
              onClick={handleCopy}
              disabled={!generatedCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 ${
                generatedCopy
                  ? isCopied
                    ? "text-green-600 bg-green-50"
                    : "text-black bg-gray-100 hover:bg-black hover:text-white"
                  : "text-gray-300 bg-gray-50 cursor-not-allowed"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <Copy className="w-3 h-3" />
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="flex-1 p-5 min-h-[320px]">
            {generatedCopy ? (
              <p
                className="text-sm text-gray-800 whitespace-pre-line leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {generatedCopy}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <PenTool className="w-8 h-8 text-gray-200 mb-3" />
                <p
                  className="text-sm font-bold text-black mb-1"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Start typing to see your copy
                </p>
                <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  The preview updates in real-time as you fill in the fields.
                </p>
              </div>
            )}
          </div>

          {/* Word / Char count */}
          {generatedCopy && (
            <div className="px-5 pb-4 pt-2 border-t border-gray-100">
              <div className="flex gap-4 text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                <span>{generatedCopy.split(/\s+/).filter(Boolean).length} words</span>
                <span>{generatedCopy.length} characters</span>
                <span className="ml-auto text-green-600 font-semibold">
                  {generatedCopy.length < 3000 ? "✓ LinkedIn optimal" : "⚠ Consider trimming"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
