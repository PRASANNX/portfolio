import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Founder";

  // Live count of all registered users (profiles)
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Count user's own orgs/projects
  const { count: projectCount } = await supabase
    .from("org_memberships")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id ?? "")
    .eq("status", "active");

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-1"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Welcome back, {firstName}.
        </h1>
        <p className="body text-gray-500">
          Here's what's happening across your projects today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {/* Total Users */}
        <div className="card p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Platform Users
          </p>
          <p className="text-4xl font-black text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {totalUsers ?? 0}
          </p>
          <p className="body text-gray-400 mt-1 text-xs">Live from database</p>
        </div>

        {/* My Projects */}
        <div className="card p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            My Projects
          </p>
          {(projectCount ?? 0) > 0 ? (
            <>
              <p className="text-4xl font-black text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {projectCount}
              </p>
              <p className="body text-gray-400 mt-1 text-xs">Active organizations</p>
            </>
          ) : (
            <div>
              <p className="text-sm text-gray-400 mb-3">No projects yet.</p>
              <button
                className="text-xs font-semibold hover:underline"
                style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
              >
                Launch your first project →
              </button>
            </div>
          )}
        </div>

        {/* Revenue */}
        <div className="card p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Revenue (MRR)
          </p>
          <div>
            <p className="text-sm text-gray-400 mb-3">Ready to earn?</p>
            <button
              className="text-xs font-semibold hover:underline"
              style={{ color: "var(--accent)", fontFamily: "Montserrat, sans-serif" }}
            >
              Setup Razorpay integration →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-200 pt-8">
        <h2
          className="text-sm font-bold text-black uppercase tracking-widest mb-5"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            className="btn-primary text-sm px-5 py-2.5"
          >
            New Project
          </button>
          <button className="btn-secondary text-sm px-5 py-2.5">
            Invite Member
          </button>
          <button className="btn-ghost text-sm px-4 py-2.5">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
