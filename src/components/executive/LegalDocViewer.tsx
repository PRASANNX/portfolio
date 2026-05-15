"use client";

import { generateRazorpayKYCDocs } from "@/lib/compliance/pdf-generator";
import { BusinessLegalData } from "@/lib/compliance/legal-templates";
import { Download } from "lucide-react";

interface LegalDocViewerProps {
  title: string;
  content: string;
  businessData: BusinessLegalData;
  docType: "terms" | "privacy" | "refund";
}

export function LegalDocViewer({ title, content, businessData, docType }: LegalDocViewerProps) {
  const handleDownload = async () => {
    await generateRazorpayKYCDocs(businessData, docType);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 bg-white min-h-screen">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-8 bg-black rounded-full" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Official Documentation
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tighter" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <span>{businessData.businessName}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full" />
            <span className="text-[#FF5F1F]">GSTIN: {businessData.gstin}</span>
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <div className="relative z-10 flex items-center gap-3">
            <Download className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Download PDF</span>
          </div>
          <div className="absolute inset-0 bg-[#FF5F1F] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </button>
      </div>

      {/* Content Block */}
      <div 
        className="prose prose-stone max-w-none text-gray-600 whitespace-pre-wrap selection:bg-[#FF5F1F] selection:text-white"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: "1.8" }}
      >
        <div className="bg-gray-50/50 p-8 sm:p-12 rounded-3xl border border-gray-100/50">
          {content}
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-20 pt-12 border-t border-gray-50 flex flex-col items-center gap-4 opacity-30 grayscale">
        <p className="text-[10px] font-black text-black uppercase tracking-[0.4em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
          PRX INFRASTRUCTURE SECURED
        </p>
        <div className="w-1 h-8 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
