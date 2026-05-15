"use client";

import { useState } from "react";
import {
  Inbox,
  MessageCircle,
  CreditCard,
  UserPlus,
  ChevronRight,
  Play,
} from "lucide-react";

// ─── Demo Events ──────────────────────────────────────────────────
const DEMO_EVENTS = [
  {
    id: 1,
    type: "whatsapp",
    org: "TNC Real Estate",
    sender: "Arjun Kapoor",
    preview: "Interested in the 3BHK Andheri West listing. Please share floor plan.",
    amount: null,
    time: "2 min ago",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: MessageCircle,
    badge: "WhatsApp Reply",
  },
  {
    id: 2,
    type: "payment",
    org: "Gymos",
    sender: "Priya Mehta",
    preview: "Subscription renewal failed. Card ending 4821 declined.",
    amount: "₹15,000",
    time: "14 min ago",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: CreditCard,
    badge: "Failed Payment",
  },
  {
    id: 3,
    type: "inquiry",
    org: "Chitragupt Legal",
    sender: "Vikram Desai",
    preview: "Need GST compliance audit for FY2024-25. Urgent before deadline.",
    amount: null,
    time: "1 hr ago",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: UserPlus,
    badge: "Lead Inquiry",
  },
];

export default function OmniInboxPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = DEMO_EVENTS.find((e) => e.id === selectedId);

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-5">
        <Inbox className="w-5 h-5 text-[#FF5F1F]" />
        <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
          Omni-Inbox
        </h1>
        <span className="font-['Inter'] text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Demo Mode
        </span>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100%-3rem)] border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* ─── LEFT: Feed ─────────────────────────────── */}
        <div className="md:col-span-4 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              {DEMO_EVENTS.length} Simulated Events
            </p>
          </div>

          {DEMO_EVENTS.map((evt) => {
            const Icon = evt.icon;
            const active = selectedId === evt.id;

            return (
              <button
                key={evt.id}
                onClick={() => setSelectedId(evt.id)}
                className={`
                  w-full text-left p-4 border-b border-gray-100 transition-all duration-150
                  ${active ? "bg-[#121212]" : "bg-white hover:bg-gray-50"}
                  ${!active ? "opacity-80" : ""}
                `}
                style={{ filter: !active && selectedId !== null ? "blur(0.5px)" : "none" }}
              >
                {/* Badge Row */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`
                      inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                      ${active ? "bg-white/10 border-white/20 text-white" : `${evt.bgColor} ${evt.borderColor} ${evt.color}`}
                    `}
                  >
                    <Icon className="w-3 h-3" />
                    {evt.badge}
                  </span>
                  <span className={`font-['Inter'] text-[10px] ${active ? "text-gray-500" : "text-gray-400"}`}>
                    {evt.time}
                  </span>
                </div>

                {/* Org */}
                <p className={`font-['Inter'] text-[10px] font-bold uppercase tracking-[0.15em] mb-1 ${active ? "text-gray-500" : "text-gray-400"}`}>
                  {evt.org}
                </p>

                {/* Sender */}
                <p className={`font-['Montserrat'] text-sm font-bold truncate mb-0.5 ${active ? "text-white" : "text-black"}`}>
                  {evt.sender}
                  {evt.amount && (
                    <span className={`ml-2 font-['Inter'] text-xs ${active ? "text-red-400" : "text-red-600"}`}>
                      {evt.amount}
                    </span>
                  )}
                </p>

                {/* Preview */}
                <p className={`font-['Inter'] text-xs truncate ${active ? "text-gray-400" : "text-gray-500"}`}>
                  {evt.preview}
                </p>
              </button>
            );
          })}
        </div>

        {/* ─── RIGHT: Detail / CTA ────────────────────── */}
        <div className="hidden md:flex flex-col md:col-span-8 bg-white items-center justify-center p-8">
          {selected ? (
            /* Selected Event Detail */
            <div className="max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">
                    {selected.org}
                  </p>
                  <h2 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
                    {selected.sender}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${selected.bgColor} ${selected.borderColor} ${selected.color}`}
                >
                  {selected.badge}
                </span>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white mb-5">
                <p className="font-['Inter'] text-sm text-gray-700 leading-relaxed">
                  {selected.preview}
                </p>
                {selected.amount && (
                  <p className="font-['Montserrat'] text-2xl font-black text-red-600 mt-3">
                    {selected.amount}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white px-6 py-3 font-['Montserrat'] font-bold rounded-md text-sm">
                  Reply via WhatsApp
                </button>
                <button className="px-4 py-3 font-['Montserrat'] font-bold text-sm text-black bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  Resolve
                </button>
              </div>
            </div>
          ) : (
            /* Empty CTA State */
            <div className="max-w-md text-center">
              <div className="w-16 h-16 rounded-lg bg-[#121212] flex items-center justify-center mx-auto mb-6">
                <Inbox className="w-7 h-7 text-[#FF5F1F]" />
              </div>
              <h2 className="font-['Montserrat'] text-2xl font-black text-black tracking-tight mb-3">
                Your Agency Command Center
              </h2>
              <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed mb-8">
                Monitor all client portals, failed payments, and WhatsApp messages from a single pane of glass.
              </p>
              <button className="bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white px-6 py-3 font-['Montserrat'] font-bold rounded-md inline-flex items-center gap-2">
                <Play className="w-4 h-4" />
                Run Simulator to Generate Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
