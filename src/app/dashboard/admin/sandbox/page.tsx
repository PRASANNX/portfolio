import { FlaskConical } from "lucide-react";

export default function SandboxPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-6 h-6 text-[#FF5F1F]" />
          <h1
            className="text-2xl font-black text-black tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Pre-Flight QA Sandbox
          </h1>
        </div>
        <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Simulate webhooks, test WhatsApp notifications, and validate your business logic before going live.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Razorpay Webhook", desc: "Simulate a payment.captured event", status: "Ready" },
          { label: "WhatsApp Notification", desc: "Fire a test message to your number", status: "Ready" },
          { label: "GST Invoice Gen", desc: "Generate a sample 21-field GST invoice", status: "Ready" },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-gray-200 rounded-xl p-5 bg-white hover:border-black transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <h3
                className="text-sm font-bold text-black"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {item.label}
              </h3>
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {item.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              {item.desc}
            </p>
            <button
              className="w-full py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Run Simulation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
