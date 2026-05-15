import { ShieldCheck } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-6 h-6 text-[#FF5F1F]" />
          <h1
            className="text-2xl font-black text-black tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            DPDP Compliance Engine
          </h1>
        </div>
        <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Generate India-compliant Privacy Policies, Terms of Service, and DPDP Data Processing Agreements — auto-populated with your org details.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Privacy Policy", desc: "DPDP Act 2023 compliant. Auto-fills GSTIN, grievance officer details.", tag: "Required" },
          { label: "Terms of Service", desc: "Consumer Protection Act & IT Act compliant. Covers refunds, liability.", tag: "Required" },
          { label: "Data Processing Agreement", desc: "For B2B clients requiring DPA. Covers data retention and processor duties.", tag: "B2B" },
        ].map((doc) => (
          <div
            key={doc.label}
            className="border border-gray-200 rounded-xl p-5 bg-white hover:border-black transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <h3
                className="text-sm font-bold text-black"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {doc.label}
              </h3>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${doc.tag === "B2B" ? "text-blue-600 bg-blue-50" : "text-orange-600 bg-orange-50"}`}>
                {doc.tag}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              {doc.desc}
            </p>
            <button
              className="w-full py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Generate PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
