"use client";

import { useState } from "react";
import { Inbox, MessageCircle, CreditCard, AlertCircle, Play, ChevronRight } from "lucide-react";

// ─── Demo Data ─────────────────────────────────────────────────────
const DEMO_EVENTS = [
  {
    id: "demo-1",
    event_type: "message",
    contact_name: "Arjun Sharma",
    preview_text: "WhatsApp Reply — TNC Real Estate: Interested in the 3BHK Andheri listing.",
    status: "unread",
    org: "TNC",
    org_color: "#121212",
    icon: MessageCircle,
    time: "2m ago",
  },
  {
    id: "demo-2",
    event_type: "payment",
    contact_name: "Priya Mehta",
    preview_text: "Failed Payment — GYMOS: ₹4,999 subscription renewal declined.",
    status: "failed",
    org: "GYMOS",
    org_color: "#065F46",
    icon: CreditCard,
    time: "14m ago",
  },
  {
    id: "demo-3",
    event_type: "inquiry",
    contact_name: "Rahul Verma",
    preview_text: "New Inquiry — CHITRAGUPT: Needs GST compliance audit for FY2024.",
    status: "new",
    org: "CHITRAGUPT",
    org_color: "#1A2238",
    icon: AlertCircle,
    time: "1h ago",
  },
];

interface OmniEvent {
  id: string;
  event_type: string;
  contact_name: string;
  preview_text: string;
  status: string;
  created_at?: string;
}

interface Props {
  events: OmniEvent[];
  fetchError?: string;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "failed")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase tracking-wider">
        Failed
      </span>
    );
  if (status === "new" || status === "unread")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF5F1F]/10 text-[#FF5F1F] uppercase tracking-wider">
        New
      </span>
    );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 uppercase tracking-wider">
      {status}
    </span>
  );
}

export function OmniInboxClient({ events, fetchError }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(events.length === 0);

  const displayEvents = isDemo ? DEMO_EVENTS : events;
  const selected = isDemo
    ? DEMO_EVENTS.find((e) => e.id === selectedId)
    : events.find((e) => e.id === selectedId);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Inbox className="w-5 h-5 text-[#FF5F1F]" />
            <h1
              className="text-2xl font-black text-black tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Omni-Inbox
            </h1>
            {isDemo && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Demo Mode
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            {isDemo
              ? "No live events yet. Showing demo data across 3 sub-brands."
              : "Cross-org unified feed — all client activity, one view."}
          </p>
        </div>
        {isDemo && (
          <button
            onClick={() => setIsDemo(false)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Play className="w-3.5 h-3.5" />
            Run Simulator
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-hidden bg-white min-h-0">
        {/* LEFT PANE */}
        <div className="md:col-span-4 border-r border-gray-200 overflow-y-auto">
          <div
            className="p-3 border-b border-gray-200 bg-gray-50 sticky top-0 z-10 text-xs font-bold text-gray-500 uppercase tracking-widest"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {displayEvents.length} Events
          </div>

          {displayEvents.map((evt: any) => {
            const Icon = isDemo ? evt.icon : Inbox;
            const active = selectedId === evt.id;
            return (
              <button
                key={evt.id}
                onClick={() => setSelectedId(evt.id)}
                className={`w-full text-left p-4 border-b border-gray-100 transition-all duration-150 group ${
                  active ? "bg-black" : "hover:bg-gray-50"
                } ${isDemo ? "blur-none" : ""}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {isDemo && (
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: evt.org_color }}
                      >
                        <Icon className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${active ? "text-gray-400" : "text-gray-500"}`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {isDemo ? evt.org : evt.event_type}
                    </span>
                  </div>
                  <StatusBadge status={evt.status} />
                </div>
                <p
                  className={`text-sm font-semibold truncate mb-0.5 ${active ? "text-white" : "text-black group-hover:text-[#FF5F1F]"} transition-colors`}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {evt.contact_name}
                </p>
                <p
                  className={`text-xs truncate ${active ? "text-gray-400" : "text-gray-500"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {isDemo ? evt.preview_text : evt.preview_text}
                </p>
                {isDemo && (
                  <p className={`text-[10px] mt-1 ${active ? "text-gray-500" : "text-gray-400"}`} style={{ fontFamily: "Inter, sans-serif" }}>
                    {evt.time}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT PANE */}
        <div className="hidden md:flex flex-col md:col-span-8 bg-white">
          {selected ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p
                    className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {isDemo ? (selected as any).org : (selected as any).event_type}
                  </p>
                  <h2
                    className="text-xl font-black text-black"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {selected.contact_name}
                  </h2>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 mb-4">
                <p className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  {selected.preview_text}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Reply via WhatsApp
                </button>
                <button
                  className="px-4 py-2.5 text-sm font-bold text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                <ChevronRight className="w-6 h-6 text-gray-300" />
              </div>
              <p
                className="text-sm font-bold text-black mb-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Select an event
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                Click any item on the left to view details and take action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
