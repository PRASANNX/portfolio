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
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white min-h-screen text-black">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-gray-200 pb-8 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </h1>
          <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
            {businessData.businessName} • GSTIN: {businessData.gstin}
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shrink-0"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div 
        className="prose prose-gray max-w-none text-gray-700 whitespace-pre-wrap"
        style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.8" }}
      >
        {content}
      </div>
    </div>
  );
}
