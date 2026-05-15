import { createClient } from "@/lib/supabase/server";
import { OmniInboxClient } from "./inbox-client";

export default async function OmniInboxPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("vw_omni_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return <OmniInboxClient events={events || []} fetchError={error?.message} />;
}
