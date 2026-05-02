import { createClient } from "@/lib/supabase/server";

export default async function OmniInbox() {
  const supabase = await createClient();
  
  // Automatically respects RLS via security_invoker
  const { data: events, error } = await supabase
    .from("vw_omni_events")
    .select("*, organizations(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-500 font-['Inter']">
        Error loading Omni-Inbox: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-8rem)] border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* LEFT PANE: Feed */}
      <div className="md:col-span-4 border-r border-gray-200 overflow-y-auto bg-white">
        <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <h2 className="font-['Montserrat'] font-black text-lg text-black tracking-tight">Omni-Inbox</h2>
          <p className="text-xs text-gray-500 mt-1 font-['Inter']">Global feed across all client portals</p>
        </div>
        
        {events && events.length > 0 ? (
          events.map((evt: any) => (
            <div key={evt.id + evt.event_type} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-['Montserrat'] font-bold text-gray-500 uppercase tracking-widest">
                  {evt.organizations?.name || "Unknown Org"}
                </span>
                {evt.status === "failed" ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wider">
                    Failed
                  </span>
                ) : evt.status === "new" || evt.status === "unread" ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF5F1F]/10 text-[#FF5F1F] uppercase tracking-wider">
                    New
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                    {evt.status}
                  </span>
                )}
              </div>
              <p className="font-['Inter'] font-semibold text-black text-sm truncate mb-1 group-hover:text-[#FF5F1F] transition-colors">
                {evt.contact_name}
              </p>
              <p className="font-['Inter'] text-xs text-gray-500 truncate">{evt.preview_text}</p>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-gray-400 font-['Inter']">
            No events found.
          </div>
        )}
      </div>
      
      {/* RIGHT PANE: Action Detail */}
      <div className="hidden md:flex flex-col md:col-span-8 bg-white items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 border border-gray-100">
          <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-400 font-['Inter'] text-sm">Select an event from the feed to view details and take action.</p>
      </div>
    </div>
  );
}
