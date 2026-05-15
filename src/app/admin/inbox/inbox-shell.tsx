"use client";

import { useState } from "react";
import {
  Inbox,
  MessageCircle,
  CreditCard,
  UserPlus,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────
interface OmniEvent {
  id: string;
  org_id: string;
  event_type: "inquiry" | "payment" | "message";
  contact_name: string;
  preview_text: string;
  status: string;
  created_at: string;
  organizations?: { name: string } | null;
}

interface Props {
  events: OmniEvent[];
  fetchError: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────
function getEventMeta(evt: OmniEvent) {
  switch (evt.event_type) {
    case "message":
      return {
        icon: MessageCircle,
        label: "WhatsApp",
        labelColor: "text-[#25D366]",
        bgColor: "bg-[#25D366]/10",
        borderColor: "border-[#25D366]/30",
      };
    case "payment":
      if (evt.status === "failed") {
        return {
          icon: CreditCard,
          label: "Failed Payment",
          labelColor: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
        };
      }
      return {
        icon: CreditCard,
        label: evt.status === "completed" ? "Payment Received" : "Payment " + evt.status,
        labelColor: "text-[#FF5F1F]",
        bgColor: "bg-[#FF5F1F]/10",
        borderColor: "border-[#FF5F1F]/30",
      };
    case "inquiry":
    default:
      return {
        icon: UserPlus,
        label: "Inquiry",
        labelColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
      };
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── Component ────────────────────────────────────────────────────
export function OmniInboxShell({ events, fetchError }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = events.find((e) => e.id === selectedId);

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-5">
        <Inbox className="w-5 h-5 text-[#FF5F1F]" />
        <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
          Omni-Inbox
        </h1>
        <span className="font-['Inter'] text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Live
        </span>
      </div>

      {/* Error State */}
      {fetchError && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 border border-red-200 bg-red-50 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="font-['Inter'] text-sm text-red-600">{fetchError}</p>
        </div>
      )}

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100%-3rem)] border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* ─── LEFT: Feed ─────────────────────────────── */}
        <div className="md:col-span-4 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              {events.length} Event{events.length !== 1 ? "s" : ""}
            </p>
          </div>

          {events.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <Inbox className="w-5 h-5 text-gray-300" />
              </div>
              <p className="font-['Montserrat'] text-sm font-bold text-black mb-1">
                No events found
              </p>
              <p className="font-['Inter'] text-xs text-gray-400">
                Waiting for client activity across your portals...
              </p>
            </div>
          ) : (
            events.map((evt) => {
              const meta = getEventMeta(evt);
              const Icon = meta.icon;
              const active = selectedId === evt.id;
              const orgName = evt.organizations?.name || "Unknown Org";

              return (
                <button
                  key={evt.id}
                  onClick={() => setSelectedId(evt.id)}
                  className={`
                    w-full text-left p-4 border-b border-gray-100 transition-all duration-150
                    ${active ? "bg-[#121212]" : "bg-white hover:bg-gray-50"}
                  `}
                >
                  {/* Badge Row */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border
                        ${active ? "bg-white/10 border-white/20 text-white" : `${meta.bgColor} ${meta.borderColor} ${meta.labelColor}`}
                      `}
                    >
                      <Icon className="w-3 h-3" />
                      {meta.label}
                    </span>
                    <span className={`font-['Inter'] text-[10px] ${active ? "text-gray-500" : "text-gray-400"}`}>
                      {timeAgo(evt.created_at)}
                    </span>
                  </div>

                  {/* Org Name */}
                  <p className={`font-['Inter'] text-[10px] font-bold uppercase tracking-[0.15em] mb-1 ${active ? "text-gray-500" : "text-gray-400"}`}>
                    {orgName}
                  </p>

                  {/* Contact */}
                  <p className={`font-['Montserrat'] text-sm font-bold truncate mb-0.5 ${active ? "text-white" : "text-black"}`}>
                    {evt.contact_name}
                  </p>

                  {/* Preview */}
                  <p className={`font-['Inter'] text-xs truncate ${active ? "text-gray-400" : "text-gray-500"}`}>
                    {evt.preview_text}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* ─── RIGHT: Detail / Command Center ─────────── */}
        <div className="hidden md:flex flex-col md:col-span-8 bg-white items-center justify-center p-8">
          {selected ? (
            <div className="max-w-md w-full">
              {(() => {
                const meta = getEventMeta(selected);
                const orgName = selected.organizations?.name || "Unknown Org";
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">
                          {orgName}
                        </p>
                        <h2 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
                          {selected.contact_name}
                        </h2>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${meta.bgColor} ${meta.borderColor} ${meta.labelColor}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-5 bg-white mb-5">
                      <p className="font-['Inter'] text-sm text-gray-700 leading-relaxed">
                        {selected.preview_text}
                      </p>
                      <p className="font-['Inter'] text-[10px] text-gray-400 mt-3">
                        {new Date(selected.created_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white px-6 py-3 font-['Montserrat'] font-bold rounded-md text-sm">
                        Reply via WhatsApp
                      </button>
                      <button className="px-4 py-3 font-['Montserrat'] font-bold text-sm text-black bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                        Resolve
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="max-w-md text-center">
              <div className="w-16 h-16 rounded-lg bg-[#121212] flex items-center justify-center mx-auto mb-6">
                <Inbox className="w-7 h-7 text-[#FF5F1F]" />
              </div>
              <h2 className="font-['Montserrat'] text-2xl font-black text-black tracking-tight mb-3">
                Your Agency Command Center
              </h2>
              <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed mb-2">
                Monitor all client portals, failed payments, and WhatsApp messages from a single pane of glass.
              </p>
              <p className="font-['Inter'] text-xs text-emerald-500 font-bold">
                ● Connected to live database
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
