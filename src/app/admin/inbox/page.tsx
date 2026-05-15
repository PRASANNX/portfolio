import { createClient } from "@/lib/supabase/server";
import { OmniInboxShell } from "./inbox-shell";

export default async function OmniInboxPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("vw_omni_events")
    .select("*, organizations(name)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <OmniInboxShell
      events={events || []}
      fetchError={error?.message || null}
    />
  );
}
