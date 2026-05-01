"use client";

import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  const messages = [
    {
      id: "msg-1",
      sender: "System",
      subject: "Welcome to your Client Portal",
      date: "12 Oct 2026",
      isRead: true,
      snippet: "Welcome aboard! Here you can manage your appointments, view documents, and track invoices securely...",
    },
    {
      id: "msg-2",
      sender: "Billing Team",
      subject: "Invoice INV-2026-001 Generated",
      date: "12 Oct 2026",
      isRead: false,
      snippet: "Your invoice for the Professional Plan License has been generated and marked as paid. You can view...",
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Messages
        </h1>
        <p className="body text-gray-500">
          Important updates and communications from our team.
        </p>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Inbox
          </h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
            {messages.filter(m => !m.isRead).length} Unread
          </span>
        </div>
        
        {messages.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`px-6 py-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors duration-100 ${
                  !msg.isRead ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <div className="mt-1">
                  {msg.isRead ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-transparent border border-gray-300" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" style={{ backgroundColor: "var(--accent)" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className={`text-sm truncate ${!msg.isRead ? "font-bold text-black" : "font-semibold text-gray-700"}`} style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {msg.sender}
                    </p>
                    <p className="text-xs text-gray-400 whitespace-nowrap ml-4">{msg.date}</p>
                  </div>
                  <p className={`text-sm mb-1 truncate ${!msg.isRead ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.snippet}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
