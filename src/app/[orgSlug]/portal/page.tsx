import { createClient } from "@/lib/supabase/server";

export default async function PortalDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "Client";

  return (
    <div className="space-y-6">
      <div className="card p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Welcome back, {firstName}.
        </h1>
        <p className="body text-gray-500">
          This is your central hub for managing your interactions and documents with us.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Recent Documents
          </h2>
          <p className="text-sm text-gray-400">No recent documents.</p>
        </div>

        <div className="card p-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Upcoming Appointments
          </h2>
          <p className="text-sm text-gray-400">No upcoming appointments.</p>
        </div>

        <div className="card p-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Recent Messages
          </h2>
          <p className="text-sm text-gray-400">No recent messages.</p>
        </div>
      </div>
    </div>
  );
}
