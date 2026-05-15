"use client";

import { useState } from "react";
import {
  ImageIcon,
  ChevronDown,
  Check,
  Download,
  Copy,
  CheckCircle2,
} from "lucide-react";

const MOCK_ORGS = [
  { id: "1", name: "Chitragupt", accent: "#1A2238", category: "Legal Tech" },
  { id: "2", name: "Gymos", accent: "#065F46", category: "Health & Fitness" },
  { id: "3", name: "TNC", accent: "#121212", category: "Real Estate" },
  { id: "4", name: "LRM", accent: "#7C3AED", category: "Education" },
];

export default function AssetGeneratorPage() {
  const [selectedOrg, setSelectedOrg] = useState(MOCK_ORGS[0]);
  const [orgOpen, setOrgOpen] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);

  const ogUrl = `/api/og/executive?title=${encodeURIComponent(selectedOrg.name)}&accent=${encodeURIComponent(selectedOrg.accent)}&category=${encodeURIComponent(selectedOrg.category)}`;

  const metaTags = `<meta property="og:image" content="https://yourdomain.com${ogUrl}" />
<meta property="og:title" content="${selectedOrg.name} — PRX Startup OS" />
<meta property="og:description" content="${selectedOrg.category} portal powered by PRX" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yourdomain.com${ogUrl}" />`;

  const handleCopyMeta = () => {
    navigator.clipboard?.writeText(metaTags);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="w-5 h-5 text-[#FF5F1F]" />
        <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
          Executive Asset Generator
        </h1>
      </div>

      {/* Org Selector */}
      <div className="mb-6 max-w-sm">
        <label className="font-['Inter'] text-xs font-bold text-black block mb-2">
          Organization
        </label>
        <div className="relative">
          <button
            onClick={() => setOrgOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: selectedOrg.accent }}
            />
            <span className="font-['Inter'] text-sm text-black flex-1">
              {selectedOrg.name}
            </span>
            <span className="font-['Inter'] text-xs text-gray-400">
              {selectedOrg.category}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${orgOpen ? "rotate-180" : ""}`} />
          </button>
          {orgOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {MOCK_ORGS.map((org) => (
                <button
                  key={org.id}
                  onClick={() => { setSelectedOrg(org); setOrgOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: org.accent }} />
                  <span className="font-['Inter'] text-sm text-black flex-1">{org.name}</span>
                  <span className="font-['Inter'] text-xs text-gray-400">{org.category}</span>
                  {selectedOrg.id === org.id && <Check className="w-3 h-3 ml-auto text-[#FF5F1F]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-5">
        {/* Mock Social Card Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: selectedOrg.accent }}
          >
            <span className="font-['Montserrat'] text-sm font-black text-white">
              {selectedOrg.name[0]}
            </span>
          </div>
          <div>
            <p className="font-['Montserrat'] text-sm font-bold text-black">
              {selectedOrg.name}
            </p>
            <p className="font-['Inter'] text-xs text-gray-400">
              {selectedOrg.category} · Shared via PRX Startup OS
            </p>
          </div>
        </div>

        {/* OG Image Preview */}
        <div className="relative aspect-[1200/630] bg-gray-50">
          {/* Rendered OG card mock */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
            style={{ backgroundColor: selectedOrg.accent }}
          >
            <p className="font-['Inter'] text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
              {selectedOrg.category}
            </p>
            <h2 className="font-['Montserrat'] text-5xl md:text-7xl font-black text-white tracking-tighter text-center leading-none mb-4">
              {selectedOrg.name}
            </h2>
            <p className="font-['Inter'] text-sm text-white/60">
              Powered by PRX Startup OS
            </p>
            <div className="absolute bottom-6 right-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5F1F]" />
              <span className="font-['Montserrat'] text-xs font-bold text-white/50">
                PRX OS
              </span>
            </div>
          </div>

          {/* Dimensions badge */}
          <div className="absolute top-3 left-3">
            <span className="font-['Inter'] text-[10px] font-bold text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
              1200 × 630px
            </span>
          </div>
        </div>

        {/* Card footer */}
        <div className="p-4 border-t border-gray-100">
          <p className="font-['Montserrat'] text-sm font-bold text-black truncate">
            {selectedOrg.name} — {selectedOrg.category} Portal
          </p>
          <p className="font-['Inter'] text-xs text-gray-400">
            yourdomain.com/{selectedOrg.name.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <a
          href={ogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white py-3 font-['Montserrat'] font-bold text-sm rounded-md flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download High-Res Banner
        </a>
        <button
          onClick={handleCopyMeta}
          className={`
            flex-1 py-3 font-['Montserrat'] font-bold text-sm rounded-md flex items-center justify-center gap-2 border transition-all
            ${copiedMeta
              ? "text-emerald-600 bg-emerald-50 border-emerald-200"
              : "text-black bg-white border-gray-200 hover:border-black"
            }
          `}
        >
          {copiedMeta ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedMeta ? "Copied to Clipboard" : "Copy OG Meta Tags"}
        </button>
      </div>

      {/* Meta Tags Preview */}
      <div className="bg-[#121212] border border-gray-800 rounded-lg p-4">
        <p className="font-['Inter'] text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-3">
          Generated Meta Tags
        </p>
        <pre className="font-mono text-xs text-gray-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {metaTags}
        </pre>
      </div>
    </div>
  );
}
