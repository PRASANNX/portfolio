"use client";

import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Download,
  ChevronDown,
  Check,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const MOCK_ORGS = [
  { id: "1", name: "Chitragupt Legal", accent: "#1A2238" },
  { id: "2", name: "Gymos", accent: "#065F46" },
  { id: "3", name: "TNC Real Estate", accent: "#121212" },
];

const DOCUMENTS = [
  {
    name: "Privacy Policy (DPDP Compliant)",
    desc: "Digital Personal Data Protection Act 2023. Auto-fills GSTIN, grievance officer, and data retention terms.",
    tag: "Required",
  },
  {
    name: "Terms of Service",
    desc: "Consumer Protection Act & IT Act compliant. Covers refunds, liability, and dispute resolution.",
    tag: "Required",
  },
  {
    name: "Refund Policy (5-7 Days)",
    desc: "RBI-compliant refund policy. Auto-populates processing timelines and Razorpay gateway terms.",
    tag: "Recommended",
  },
];

export default function DPDPCompliancePage() {
  const [selectedOrg, setSelectedOrg] = useState(MOCK_ORGS[0]);
  const [orgOpen, setOrgOpen] = useState(false);
  const [gstin, setGstin] = useState("");
  const [grievanceOfficer, setGrievanceOfficer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [downloadedIdx, setDownloadedIdx] = useState<number | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const handleDownload = (idx: number) => {
    setDownloadedIdx(idx);
    setTimeout(() => setDownloadedIdx(null), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-5 h-5 text-[#FF5F1F]" />
        <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
          DPDP Compliance Engine
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ─── LEFT: Input Form ──────────────────────────── */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-5">
            Organization Details
          </p>

          {/* Org Dropdown */}
          <div className="mb-4">
            <label className="font-['Inter'] text-xs font-bold text-black block mb-2">
              Target Organization
            </label>
            <div className="relative">
              <button
                onClick={() => setOrgOpen((v) => !v)}
                className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedOrg.accent }}
                />
                <span className="font-['Inter'] text-sm text-black flex-1">
                  {selectedOrg.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${orgOpen ? "rotate-180" : ""}`}
                />
              </button>
              {orgOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {MOCK_ORGS.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => { setSelectedOrg(org); setOrgOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: org.accent }} />
                      <span className="font-['Inter'] text-sm text-black">{org.name}</span>
                      {selectedOrg.id === org.id && <Check className="w-3 h-3 ml-auto text-[#FF5F1F]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GSTIN */}
          <div className="mb-4">
            <label className="font-['Inter'] text-xs font-bold text-black block mb-2">
              GSTIN
            </label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              placeholder="e.g. 27AADCB2230M1ZV"
              className="w-full px-4 py-3 border border-gray-200 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Grievance Officer */}
          <div className="mb-6">
            <label className="font-['Inter'] text-xs font-bold text-black block mb-2">
              Grievance Officer Name
            </label>
            <input
              type="text"
              value={grievanceOfficer}
              onChange={(e) => setGrievanceOfficer(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full px-4 py-3 border border-gray-200 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white py-3.5 font-['Montserrat'] font-black text-sm rounded-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating Legal Docs...</>
            ) : (
              <><FileText className="w-4 h-4" /> Generate Legal Docs</>
            )}
          </button>
        </div>

        {/* ─── RIGHT: Document Output (Dark) ─────────────── */}
        <div className="bg-[#121212] border border-gray-800 rounded-lg p-6">
          <p className="font-['Inter'] text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">
            Generated Documents
          </p>
          <h2 className="font-['Montserrat'] text-lg font-black text-white tracking-tight mb-6">
            Razorpay KYC Documents
          </h2>

          <div className="space-y-3">
            {DOCUMENTS.map((doc, i) => (
              <div
                key={doc.name}
                className={`
                  border rounded-lg p-4 transition-all duration-300
                  ${generated ? "border-gray-700 bg-white/[0.03]" : "border-gray-800 bg-white/[0.01] opacity-50"}
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {generated ? (
                        <CheckCircle2 className="w-4 h-4 text-[#FF5F1F] flex-shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      )}
                      <span className="font-['Montserrat'] text-sm font-bold text-white truncate">
                        {doc.name}
                      </span>
                    </div>
                    <p className="font-['Inter'] text-xs text-gray-500 leading-relaxed pl-6">
                      {doc.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`font-['Inter'] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      doc.tag === "Required"
                        ? "text-[#FF5F1F] bg-[#FF5F1F]/10 border border-[#FF5F1F]/20"
                        : "text-gray-500 bg-white/5 border border-gray-700"
                    }`}>
                      {doc.tag}
                    </span>
                    <button
                      onClick={() => handleDownload(i)}
                      disabled={!generated}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 font-['Montserrat'] text-xs font-bold rounded-md transition-all
                        ${generated
                          ? downloadedIdx === i
                            ? "text-emerald-400 border border-emerald-500/30 bg-emerald-500/10"
                            : "text-white border border-gray-700 hover:border-[#FF5F1F] hover:text-[#FF5F1F]"
                          : "text-gray-700 border border-gray-800 cursor-not-allowed"
                        }
                      `}
                    >
                      {downloadedIdx === i ? <Check className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                      {downloadedIdx === i ? "Done" : "PDF"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
