"use client";

import { useState } from "react";
import { generateRazorpayKYCDocs } from "@/lib/compliance/pdf-generator";
import type { BusinessLegalData } from "@/lib/compliance/legal-templates";

export function ComplianceGenerator() {
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [grievanceOfficer, setGrievanceOfficer] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [refundDays, setRefundDays] = useState("7");
  const [isOpen, setIsOpen] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);

  const data: BusinessLegalData = {
    businessName: businessName || "Company Name",
    gstin: gstin || "PENDING_GSTIN",
    address: address || "Registered Address Pending",
    grievanceOfficer: grievanceOfficer || "Grievance Officer",
    contactEmail: contactEmail || "legal@example.com",
    refundWindowDays: parseInt(refundDays) || 7,
  };

  const isValid = businessName && gstin && contactEmail;

  const handleGenerate = async (type: "terms" | "privacy" | "refund") => {
    setGenerating(type);
    try {
      await generateRazorpayKYCDocs(data, type);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setTimeout(() => setGenerating(null), 1000);
    }
  };

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-8 py-6 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-1.5 h-6 rounded-full" 
            style={{ backgroundColor: "#FF5F1F" }} 
          />
          <div className="text-left">
            <h3
              className="text-sm font-black text-black uppercase tracking-widest"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              DPDP Compliance Engine
            </h3>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
              Automated Razorpay KYC Documentation
            </p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-50">
          {/* Input Form */}
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label
                  className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. MedCare Clinics Pvt. Ltd."
                  className="w-full px-0 py-2 border-b border-gray-100 text-sm font-semibold text-black bg-transparent focus:outline-none focus:border-[#FF5F1F] transition-colors placeholder:text-gray-200"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  GSTIN
                </label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="e.g. 27AADCB2230M1Z3"
                  className="w-full px-0 py-2 border-b border-gray-100 text-sm font-semibold text-black bg-transparent focus:outline-none focus:border-[#FF5F1F] transition-colors uppercase placeholder:text-gray-200"
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <label
                  className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Registered Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 123, MG Road, Mumbai, Maharashtra 400001"
                  className="w-full px-0 py-2 border-b border-gray-100 text-sm font-semibold text-black bg-transparent focus:outline-none focus:border-[#FF5F1F] transition-colors placeholder:text-gray-200"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Grievance Officer
                </label>
                <input
                  type="text"
                  value={grievanceOfficer}
                  onChange={(e) => setGrievanceOfficer(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-0 py-2 border-b border-gray-100 text-sm font-semibold text-black bg-transparent focus:outline-none focus:border-[#FF5F1F] transition-colors placeholder:text-gray-200"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. legal@medcare.in"
                  className="w-full px-0 py-2 border-b border-gray-100 text-sm font-semibold text-black bg-transparent focus:outline-none focus:border-[#FF5F1F] transition-colors placeholder:text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="bg-gray-50/50 px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <p className="text-[10px] font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Generation Hub
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Download certified B&W PDFs for Razorpay KYC
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { type: "terms" as const, label: "Terms" },
                    { type: "privacy" as const, label: "Privacy" },
                    { type: "refund" as const, label: "Refund" },
                  ] as const
                ).map((doc) => (
                  <button
                    key={doc.type}
                    onClick={() => handleGenerate(doc.type)}
                    disabled={!isValid || generating === doc.type}
                    className="group relative px-6 py-3 overflow-hidden bg-black text-white rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:hover:scale-100"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        {generating === doc.type ? "..." : `↓ ${doc.label}`}
                      </span>
                    </div>
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-[#FF5F1F] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
