import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./dashboard-client";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Founder";

  // Live count of all registered users
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // User's orgs/projects with details
  const { data: memberships } = await supabase
    .from("org_memberships")
    .select("org_id, role, organizations(id, name, slug, accent_color, billing_tier, created_at)")
    .eq("user_id", user?.id ?? "")
    .eq("status", "active");

  const projects =
    memberships?.map((m) => ({
      ...(m.organizations as any),
      role: m.role,
    })) || [];

  return (
    <DashboardClient
      firstName={firstName}
      totalUsers={totalUsers ?? 0}
      projects={projects}
    />
  );
}
