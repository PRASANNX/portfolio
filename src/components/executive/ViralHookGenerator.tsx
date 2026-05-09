"use client";

import { useState } from "react";

interface HookResult {
  title: string;
  content: string;
  framework: string;
}

export function ViralHookGenerator() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [timeToBuild, setTimeToBuild] = useState("");
  const [clientPrice, setClientPrice] = useState("");
  const [oldWorkflow, setOldWorkflow] = useState("");
  const [prxCost, setPrxCost] = useState("₹9,999");

  const [hooks, setHooks] = useState<HookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setHooks([]);

    try {
      const res = await fetch("/api/content/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          timeToBuild,
          clientPrice,
          oldWorkflow,
          prxCost,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      setHooks(data.hooks);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isValid = businessName && industry && timeToBuild && clientPrice && oldWorkflow;

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#FF5F1F" }}
          />
          <h3
            className="text-sm font-bold text-black uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Viral Hook Generator
          </h3>
        </div>
        <span className="text-gray-400 text-xs">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200">
          {/* Input Form */}
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-500 mb-4">
              Enter your project data. We'll generate 5 ready-to-post LinkedIn/Twitter hooks using proven frameworks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. MedCare Clinics"
                  className="w-full px-3 py-2 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-[#FF5F1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Healthcare"
                  className="w-full px-3 py-2 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-[#FF5F1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Time to Build
                </label>
                <input
                  type="text"
                  value={timeToBuild}
                  onChange={(e) => setTimeToBuild(e.target.value)}
                  placeholder="e.g. 48 hours"
                  className="w-full px-3 py-2 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-[#FF5F1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Client Price Charged
                </label>
                <input
                  type="text"
                  value={clientPrice}
                  onChange={(e) => setClientPrice(e.target.value)}
                  placeholder="e.g. ₹75,000"
                  className="w-full px-3 py-2 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-[#FF5F1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Previous Workflow
                </label>
                <input
                  type="text"
                  value={oldWorkflow}
                  onChange={(e) => setOldWorkflow(e.target.value)}
                  placeholder="e.g. WhatsApp and Excel"
                  className="w-full px-3 py-2 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-[#FF5F1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  PRX OS Cost
                </label>
                <input
                  type="text"
                  value={prxCost}
                  onChange={(e) => setPrxCost(e.target.value)}
                  placeholder="₹9,999"
                  className="w-full px-3 py-2 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-[#FF5F1F] transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!isValid || loading}
              className="w-full py-2.5 text-sm font-bold text-white uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#FF5F1F",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {loading ? "Generating..." : "Generate 5 Viral Hooks"}
            </button>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
          </div>

          {/* Generated Hooks */}
          {hooks.length > 0 && (
            <div className="border-t border-gray-200">
              <div className="px-6 py-4">
                <p
                  className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Generated Hooks ({hooks.length})
                </p>
              </div>

              {hooks.map((hook, i) => (
                <div
                  key={i}
                  className="border-t border-gray-100 px-6 py-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold text-black"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {hook.title}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest border border-gray-200 px-1.5 py-0.5">
                        {hook.framework}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(hook.content, i)}
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 transition-all"
                      style={{
                        backgroundColor: copiedIndex === i ? "#121212" : "#FF5F1F",
                        color: "#FFFFFF",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {copiedIndex === i ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                  <pre
                    className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 border border-gray-200 p-4 overflow-x-auto"
                    style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                  >
                    {hook.content}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
