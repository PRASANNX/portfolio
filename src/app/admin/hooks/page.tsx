"use client";

import { useState } from "react";
import { TrendingUp, Zap, ThumbsUp, MessageSquare, Share2, Repeat2, Loader2 } from "lucide-react";

// ─── Demo Presets ─────────────────────────────────────────────────
const DEMO = {
  timeToBuild: "48 hours",
  clientPrice: "₹60,000",
  previousWorkflow: "WhatsApp and Excel",
};

function generateHook(time: string, price: string, workflow: string): string {
  if (!time && !price && !workflow) return "";
  const t = time || "[time]";
  const p = price || "[price]";
  const w = workflow || "[workflow]";

  return `Most consultants charge ${p} for something that takes them weeks.

I built it in ${t}.

Here's the math:

→ Previous workflow: ${w}
→ Time spent per client: 3-4 weeks minimum
→ Hidden costs: missed deadlines, manual follow-ups, zero automation

What we replaced it with:
→ Branded portal: 10 min setup
→ GST invoicing: automated
→ WhatsApp notifications: built-in
→ Client dashboard: shipped, not "coming soon"

The real flex isn't building fast.
It's charging ${p} for something you shipped in ${t} — and delivering 10x more value than the 4-week version.

Speed is the new moat.

#StartupOS #IndiaStartups #Consulting #BuildInPublic`;
}

export default function ViralHooksPage() {
  const [timeToBuild, setTimeToBuild] = useState("");
  const [clientPrice, setClientPrice] = useState("");
  const [previousWorkflow, setPreviousWorkflow] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");

  const loadDemo = () => {
    setTimeToBuild(DEMO.timeToBuild);
    setClientPrice(DEMO.clientPrice);
    setPreviousWorkflow(DEMO.previousWorkflow);
    setGeneratedPost("");
  };

  const generate = () => {
    if (!timeToBuild && !clientPrice && !previousWorkflow) return;
    setIsGenerating(true);
    setGeneratedPost("");
    setTimeout(() => {
      setGeneratedPost(generateHook(timeToBuild, clientPrice, previousWorkflow));
      setIsGenerating(false);
    }, 1500);
  };

  const hasSomeInput = timeToBuild || clientPrice || previousWorkflow;

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-[#FF5F1F]" />
          <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
            Viral Hook Generator
          </h1>
        </div>
        <button
          onClick={loadDemo}
          className="font-['Montserrat'] text-xs font-bold text-[#FF5F1F] border border-dashed border-[#FF5F1F]/40 px-4 py-2 rounded-md hover:bg-[#FF5F1F]/5 hover:border-[#FF5F1F] transition-all"
        >
          Load Demo Data
        </button>
      </div>

      {/* Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-3rem)] border border-gray-200 rounded-lg overflow-hidden">
        {/* ─── LEFT: Form (Dark) ────────────────────────── */}
        <div className="bg-[#121212] p-8 overflow-y-auto flex flex-col">
          <p className="font-['Inter'] text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-6">
            Your Build Stats
          </p>

          <div className="space-y-5 flex-1">
            {/* Time to Build */}
            <div>
              <label className="font-['Inter'] text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                ⚡ Time to Build
              </label>
              <input
                type="text"
                value={timeToBuild}
                onChange={(e) => setTimeToBuild(e.target.value)}
                placeholder="e.g. 48 hours, 3 weekends, 2 sprints..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors"
              />
            </div>

            {/* Client Price */}
            <div>
              <label className="font-['Inter'] text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                💸 Client Price Charged
              </label>
              <input
                type="text"
                value={clientPrice}
                onChange={(e) => setClientPrice(e.target.value)}
                placeholder="e.g. ₹60,000, $2,000, free tier..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors"
              />
            </div>

            {/* Previous Workflow */}
            <div>
              <label className="font-['Inter'] text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                🐌 Previous Workflow
              </label>
              <textarea
                rows={3}
                value={previousWorkflow}
                onChange={(e) => setPreviousWorkflow(e.target.value)}
                placeholder="e.g. WhatsApp and Excel, Notion + Stripe + Google Forms..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={!hasSomeInput || isGenerating}
            className={`
              w-full mt-6 py-3.5 font-['Montserrat'] text-sm font-black rounded-md
              flex items-center justify-center gap-2 transition-all duration-200
              ${
                hasSomeInput && !isGenerating
                  ? "bg-[#FF5F1F] hover:bg-[#E54E1A] text-white"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }
            `}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Hooks...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Generate Viral Hooks
              </>
            )}
          </button>
        </div>

        {/* ─── RIGHT: LinkedIn Preview (Light) ─────────── */}
        <div className="bg-gray-50 p-8 overflow-y-auto flex items-start justify-center">
          <div className="w-full max-w-md">
            <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">
              LinkedIn Post Preview
            </p>

            {/* LinkedIn Card */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Card Header */}
              <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-11 h-11 rounded-full bg-[#121212] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Montserrat'] text-sm font-black text-white">P</span>
                </div>
                <div>
                  <p className="font-['Montserrat'] text-sm font-bold text-black">
                    Prasann — PRX
                  </p>
                  <p className="font-['Inter'] text-xs text-gray-400">
                    Founder, PRX Startup OS · 1st
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 min-h-[280px]">
                {isGenerating ? (
                  <div className="space-y-2.5 animate-pulse">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="h-3 bg-gray-100 rounded"
                        style={{ width: `${55 + Math.random() * 45}%` }}
                      />
                    ))}
                  </div>
                ) : generatedPost ? (
                  <p className="font-['Inter'] text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                    {generatedPost}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <TrendingUp className="w-8 h-8 text-gray-200 mb-3" />
                    <p className="font-['Inter'] text-sm text-gray-400 italic">
                      Enter your build stats on the left and hit <strong className="text-black not-italic">Generate Viral Hooks</strong> to preview your LinkedIn post here.
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer — only when post exists */}
              {generatedPost && !isGenerating && (
                <>
                  <div className="px-4 pb-2 border-t border-gray-100 pt-2">
                    <div className="flex items-center gap-4 font-['Inter'] text-xs text-gray-400">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 847</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 124</span>
                      <span className="ml-auto">12.4K impressions</span>
                    </div>
                  </div>

                  <div className="flex border-t border-gray-100">
                    {[
                      { icon: ThumbsUp, label: "Like" },
                      { icon: MessageSquare, label: "Comment" },
                      { icon: Repeat2, label: "Repost" },
                      { icon: Share2, label: "Send" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-['Inter'] text-xs text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Copy CTA */}
                  <div className="p-3 border-t border-gray-100">
                    <button
                      onClick={() => navigator.clipboard?.writeText(generatedPost)}
                      className="w-full bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white py-2.5 font-['Montserrat'] font-bold text-sm rounded-md"
                    >
                      Copy Post
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
