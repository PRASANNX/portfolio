import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ViralHookGenerator } from "@/components/executive/ViralHookGenerator";
import { CopywritingCoPilot } from "@/components/dashboard/cms/CopywritingCoPilot";
import { ComplianceGenerator } from "@/components/executive/ComplianceGenerator";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Verify root owner (first user created OR env-specified admin)
  const rootAdminEmail = process.env.ROOT_ADMIN_EMAIL;
  if (rootAdminEmail && user.email !== rootAdminEmail) {
    redirect("/dashboard");
  }

  // Cross-org metrics
  const { count: totalOrgs } = await supabase
    .from("organizations")
    .select("*", { count: "exact", head: true });

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: totalWaitlist } = await supabase
    .from("waitlist_entries")
    .select("*", { count: "exact", head: true });

  const { count: totalPayments } = await supabase
    .from("payments")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  const { count: totalInquiries } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true });

  const { data: recentOrgs } = await supabase
    .from("organizations")
    .select("id, name, slug, accent_color, billing_tier, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-1"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Admin — God Mode
        </h1>
        <p className="body text-gray-500">Cross-organization platform metrics.</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 mb-10">
        {[
          { label: "Organizations", value: totalOrgs ?? 0 },
          { label: "Users", value: totalUsers ?? 0 },
          { label: "Waitlist", value: totalWaitlist ?? 0 },
          { label: "Payments", value: totalPayments ?? 0 },
          { label: "Inquiries", value: totalInquiries ?? 0 },
        ].map((metric) => (
          <div key={metric.label} className="card p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {metric.label}
            </p>
            <p className="text-3xl font-black text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orgs */}
      <div>
        <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Recent Organizations
        </h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Tier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentOrgs?.map((org) => (
                <tr key={org.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: org.accent_color || "#FF5F1F" }} />
                    <span className="font-semibold text-black">{org.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">/{org.slug}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{org.billing_tier}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(org.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {(!recentOrgs || recentOrgs.length === 0) && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No organizations yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Engine */}
      <div className="mt-12 space-y-12">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Content Engine
            </h2>
            <div className="h-px bg-gray-100 flex-1" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ViralHookGenerator />
            <CopywritingCoPilot onSave={(copy) => console.log('Compiled copy:', copy)} />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Legal & Compliance
            </h2>
            <div className="h-px bg-gray-100 flex-1" />
          </div>
          <ComplianceGenerator />
        </section>
      </div>
    </div>
  );
}
