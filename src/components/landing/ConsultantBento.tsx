import {
  Inbox,
  ShieldCheck,
  MessageCircle,
  CreditCard,
  UserPlus,
  MessageSquare,
} from "lucide-react";

// ─── Mini mock feed for the Omni-Inbox card ───────────────────────
const MOCK_EVENTS = [
  {
    icon: MessageCircle,
    badge: "WhatsApp",
    badgeColor: "text-emerald-400",
    org: "TNC",
    name: "Arjun K.",
    preview: "Interested in 3BHK listing...",
    time: "2m",
  },
  {
    icon: CreditCard,
    badge: "Payment",
    badgeColor: "text-red-400",
    org: "GYMOS",
    name: "Priya M.",
    preview: "₹15,000 renewal declined",
    time: "14m",
  },
  {
    icon: UserPlus,
    badge: "Inquiry",
    badgeColor: "text-blue-400",
    org: "CHITRAGUPT",
    name: "Vikram D.",
    preview: "Need GST audit for FY24...",
    time: "1h",
  },
];

export function ConsultantBento() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#121212] border-b border-[#333]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-['Inter'] text-xs font-bold text-[#FF5F1F] uppercase tracking-[0.15em] mb-3">
            The Agency Toolkit
          </p>
          <h2 className="font-['Montserrat'] text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Jarvis for <span className="text-[#FF5F1F]">Consultants.</span>
          </h2>
          <p className="font-['Inter'] text-base text-gray-500 max-w-2xl mx-auto">
            9 advanced tools built into one dashboard. Not features you&apos;ll &ldquo;maybe use someday&rdquo; — systems that directly reduce your operational overhead.
          </p>
        </div>

        {/* Bento Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ─── Large Card: Omni-Inbox (spans 2 cols) ─── */}
          <div className="md:col-span-2 border border-[#333] rounded-lg p-6 bg-[#1A1A1A] flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-md bg-[#FF5F1F]/10 flex items-center justify-center">
                <Inbox className="w-5 h-5 text-[#FF5F1F]" />
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-lg font-black text-white tracking-tight">
                  Consultant Omni-Inbox
                </h3>
                <p className="font-['Inter'] text-xs text-gray-500">
                  All client events — one feed
                </p>
              </div>
            </div>

            {/* Mini Mock Feed */}
            <div className="mt-4 border border-[#333] rounded-md overflow-hidden flex-1">
              {MOCK_EVENTS.map((evt, i) => {
                const Icon = evt.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i < MOCK_EVENTS.length - 1 ? "border-b border-[#333]" : ""
                    } hover:bg-white/[0.02] transition-colors`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${evt.badgeColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-['Inter'] text-[10px] font-bold uppercase tracking-wider ${evt.badgeColor}`}>
                          {evt.badge}
                        </span>
                        <span className="font-['Inter'] text-[10px] text-gray-600">
                          {evt.org}
                        </span>
                      </div>
                      <p className="font-['Inter'] text-sm text-gray-300 truncate">
                        <span className="font-semibold text-white">{evt.name}</span>{" "}
                        — {evt.preview}
                      </p>
                    </div>
                    <span className="font-['Inter'] text-[10px] text-gray-600 flex-shrink-0">
                      {evt.time}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="font-['Inter'] text-xs text-gray-600 mt-4">
              WhatsApp replies, failed payments, and lead inquiries — across every sub-brand you manage.
            </p>
          </div>

          {/* ─── Small Card 1: DPDP Legal Engine ──────── */}
          <div className="border border-[#333] rounded-lg p-6 bg-[#1A1A1A] flex flex-col">
            <div className="w-9 h-9 rounded-md bg-[#FF5F1F]/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#FF5F1F]" />
            </div>
            <h3 className="font-['Montserrat'] text-lg font-black text-white tracking-tight mb-2">
              DPDP Legal Engine
            </h3>
            <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed flex-1">
              Auto-generates Privacy Policies, Terms of Service, and Data Processing Agreements — pre-filled with your GSTIN, grievance officer, and org details. India-compliant by default.
            </p>
            <div className="mt-4 pt-4 border-t border-[#333]">
              <div className="flex gap-2">
                {["Privacy Policy", "ToS", "DPA"].map((doc) => (
                  <span
                    key={doc}
                    className="font-['Inter'] text-[10px] font-bold text-gray-500 bg-white/5 border border-[#333] px-2 py-1 rounded-md"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Small Card 2: WhatsApp Magic Links ──── */}
          <div className="md:col-span-1 border border-[#333] rounded-lg p-6 bg-[#1A1A1A] flex flex-col">
            <div className="w-9 h-9 rounded-md bg-[#FF5F1F]/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-[#FF5F1F]" />
            </div>
            <h3 className="font-['Montserrat'] text-lg font-black text-white tracking-tight mb-2">
              WhatsApp Magic Links
            </h3>
            <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed flex-1">
              Passwordless client authentication via WhatsApp OTP. No email friction, no password resets. Pure Indian UX — one tap, logged in.
            </p>
            <div className="mt-4 pt-4 border-t border-[#333]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-['Inter'] text-[10px] text-emerald-400 font-bold">
                  Meta Cloud API Connected
                </span>
              </div>
            </div>
          </div>

          {/* ─── Bonus: Viral Hook Gen ─────────────────── */}
          <div className="md:col-span-2 border border-[#333] rounded-lg p-6 bg-[#1A1A1A] flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-md bg-[#FF5F1F]/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#FF5F1F]" />
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-lg font-black text-white tracking-tight">
                  Growth Engine Suite
                </h3>
                <p className="font-['Inter'] text-xs text-gray-500">
                  Viral Hook Gen + Copywriting Co-Pilot + Asset Generator
                </p>
              </div>
            </div>
            <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed">
              Turn your build stats into 10K+ impression LinkedIn posts. Generate PAS/AIDA copy with live preview. Create branded OG images and social cards — all from inside the dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
