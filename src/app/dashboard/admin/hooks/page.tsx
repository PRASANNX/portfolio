"use client";

import { useState } from "react";
import { Zap, ThumbsUp, MessageSquare, Share2, Repeat2, BarChart2, Loader2 } from "lucide-react";

// ─── Demo Data ─────────────────────────────────────────────────────
const DEMO_DATA = {
  timeToBuild: "48 hours",
  cost: "₹0 (open source stack)",
  oldWorkflow: "6 tools, 3 freelancers, 4 weeks to launch",
  result: `Most founders spend ₹2L+ and 4 weeks to launch a business. We did it in 48 hours with ₹0 in tools.

Here's what changed when we replaced our 6-tool stack with PRX Startup OS:

→ Landing page: 48 hrs → 10 mins
→ GST invoicing: 3 hrs/week → automated
→ Client portal: 6 weeks dev → 1 click
→ DPDP compliance: ₹50k lawyer → auto-generated

The game isn't "work harder". It's "remove the friction entirely".

If you're a consultant or founder still duct-taping Notion + Razorpay + Google Forms together — this is your sign.

DM me "ENGINE" and I'll share the exact setup.

#StartupOS #IndiaStartups #Consulting #ProductivityHack #FounderLife`,
};

function LinkedInPostCard({ content, isLoading }: { content: string; isLoading: boolean }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-black text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
            P
          </span>
        </div>
        <div>
          <p className="text-sm font-bold text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Prasann — PRX
          </p>
          <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
            Founder, PRX Startup OS · 1st
          </p>
        </div>
      </div>

      {/* Post Body */}
      <div className="p-4 min-h-[240px]">
        {isLoading ? (
          <div className="space-y-2.5 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-100 rounded"
                style={{ width: `${70 + Math.random() * 30}%` }}
              />
            ))}
          </div>
        ) : content ? (
          <p
            className="text-sm text-gray-800 whitespace-pre-line leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {content}
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <Zap className="w-8 h-8 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Fill in the inputs and click Generate Hook →
            </p>
            <p className="text-xs text-gray-300 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Or load demo data to see an example
            </p>
          </div>
        )}
      </div>

      {/* Post Footer */}
      {content && !isLoading && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-4 text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5" /> <span>847</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> <span>124 comments</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <BarChart2 className="w-3.5 h-3.5" /> <span>12.4K views</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            {[
              { icon: ThumbsUp, label: "Like" },
              { icon: MessageSquare, label: "Comment" },
              { icon: Repeat2, label: "Repost" },
              { icon: Share2, label: "Send" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors flex-1 justify-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              onClick={() => navigator.clipboard?.writeText(content)}
            >
              Copy Post
            </button>
            <button
              className="px-4 py-2 text-xs font-bold text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Post to LinkedIn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ViralHookPage() {
  const [timeToBuild, setTimeToBuild] = useState("");
  const [cost, setCost] = useState("");
  const [oldWorkflow, setOldWorkflow] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const loadDemoData = () => {
    setTimeToBuild(DEMO_DATA.timeToBuild);
    setCost(DEMO_DATA.cost);
    setOldWorkflow(DEMO_DATA.oldWorkflow);
    setGeneratedPost("");
  };

  const generateHook = () => {
    if (!timeToBuild && !cost && !oldWorkflow) return;
    setIsGenerating(true);
    setGeneratedPost("");
    // Simulate generation delay
    setTimeout(() => {
      setGeneratedPost(DEMO_DATA.result);
      setIsGenerating(false);
    }, 1800);
  };

  const isFormFilled = timeToBuild || cost || oldWorkflow;

  return (
    <div className="max-w-6xl">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#FF5F1F]" />
            <h1
              className="text-2xl font-black text-black tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Viral Hook Generator
            </h1>
          </div>
          <button
            onClick={loadDemoData}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#FF5F1F] border border-dashed border-[#FF5F1F]/40 rounded-lg hover:bg-orange-50 hover:border-[#FF5F1F] transition-all duration-200"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Load Demo Data
          </button>
        </div>
        <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Turn your build stats into a LinkedIn post that gets 10K+ impressions. No fluff, just proof.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Input Form */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <h2
              className="text-sm font-black text-black mb-4 uppercase tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Your Build Stats
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  ⚡ Time to Build
                </label>
                <input
                  type="text"
                  value={timeToBuild}
                  onChange={(e) => setTimeToBuild(e.target.value)}
                  placeholder="e.g. 48 hours, 3 weekends, 2 sprints..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  💸 Cost
                </label>
                <input
                  type="text"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g. ₹0, ₹2,999/mo, bootstrapped..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  🐌 Old Workflow (What You Replaced)
                </label>
                <textarea
                  rows={3}
                  value={oldWorkflow}
                  onChange={(e) => setOldWorkflow(e.target.value)}
                  placeholder="e.g. 6 tools, 3 freelancers, 4 weeks to launch a simple landing page..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            <button
              onClick={generateHook}
              disabled={!isFormFilled || isGenerating}
              className={`w-full mt-4 py-3 text-sm font-black rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isFormFilled && !isGenerating
                  ? "text-white bg-black hover:bg-[#FF5F1F]"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Hook...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Viral Hook →
                </>
              )}
            </button>
          </div>

          {/* Framework tags */}
          <div className="flex gap-2 flex-wrap">
            {["Before / After", "Proof of Work", "Contrarian Take", "Number-Led", "Story Arc"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors duration-150"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* RIGHT: LinkedIn Preview */}
        <LinkedInPostCard content={generatedPost} isLoading={isGenerating} />
      </div>
    </div>
  );
}
