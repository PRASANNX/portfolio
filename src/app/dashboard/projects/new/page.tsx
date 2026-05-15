import { PlusCircle } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <PlusCircle className="w-6 h-6 text-[#FF5F1F]" />
          <h1
            className="text-2xl font-black text-black tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            New Project
          </h1>
        </div>
        <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Launch a new startup or digitize an existing business. Your project gets its own multi-tenant workspace, branded portal, and analytics.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spawn a Startup */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white hover:border-black transition-colors duration-200 cursor-pointer group">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FF5F1F] transition-colors duration-200">
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <h2
            className="text-base font-black text-black mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Spawn a Startup
          </h2>
          <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Go from zero to a live, branded waitlist page with analytics in under 5 minutes. Perfect for new ventures.
          </p>
          <button
            className="w-full py-2.5 text-sm font-bold text-white bg-black rounded-lg group-hover:bg-[#FF5F1F] transition-colors duration-200"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Launch Spawner →
          </button>
        </div>

        {/* Digitize a Business */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white hover:border-black transition-colors duration-200 cursor-pointer group">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FF5F1F] transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2
            className="text-base font-black text-black mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Digitize a Business
          </h2>
          <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Take an existing offline business online. Choose from 10 business categories and get a full client portal, invoice system, and appointment booking.
          </p>
          <button
            className="w-full py-2.5 text-sm font-bold text-black bg-gray-100 rounded-lg hover:bg-[#FF5F1F] hover:text-white transition-colors duration-200"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Open Digitizer →
          </button>
        </div>
      </div>
    </div>
  );
}
