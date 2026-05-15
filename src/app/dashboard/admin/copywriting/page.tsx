import { PenTool } from "lucide-react";

export default function CopywritingPage() {
  return (
    <div className="max-w-5xl">
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
          Generate high-conversion copy using PAS (Problem-Agitate-Solution) and AIDA frameworks — tuned for the Indian consulting and startup market.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
          <h2
            className="text-sm font-bold text-black"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Define the Framework
          </h2>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              PROBLEM — What pain does your client face?
            </label>
            <textarea
              rows={3}
              placeholder="e.g. My clients waste 10 hours a week on manual invoicing and miss GST deadlines..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              AGITATE — What's the real consequence of inaction?
            </label>
            <textarea
              rows={3}
              placeholder="e.g. This leads to GST penalties, delayed vendor payments, and lost credibility with investors..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              SOLUTION — How do you solve it?
            </label>
            <textarea
              rows={3}
              placeholder="e.g. PRX Startup OS automates your entire billing cycle with one-click GST invoices, Razorpay integration, and DPDP compliance..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <button
            className="w-full py-2.5 text-sm font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Generate Copy →
          </button>
        </div>

        {/* Preview */}
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-sm font-bold text-black"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Live Preview
            </h2>
            <span className="text-[10px] text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
              PAS Framework
            </span>
          </div>
          <div className="space-y-3 text-sm text-gray-400 italic" style={{ fontFamily: "Inter, sans-serif" }}>
            <p className="border-l-2 border-gray-200 pl-3">Your copy will appear here as you generate...</p>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
