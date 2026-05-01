import { DashboardPage, DashboardCard } from "@/components/shell";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  // Fetch current user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch live user count from profiles table
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "PRX";

  const revenue = 0;
  const subscriptions = 0;

  return (
    <DashboardPage>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, {firstName}. Here's what's happening today.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="Total Users" 
          description="Active users across your app"
        >
          <div className="text-3xl font-bold">{totalUsers || 1}</div>
          <p className="text-xs text-muted-foreground mt-1">Live from database</p>
        </DashboardCard>

        <DashboardCard 
          title="Revenue" 
          description="Monthly recurring revenue"
        >
          {revenue > 0 ? (
            <>
              <div className="text-3xl font-bold">${revenue}</div>
              <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
            </>
          ) : (
            <div className="flex flex-col h-full justify-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Ready to earn?</p>
              <button className="text-sm font-medium hover:underline text-left" style={{ color: '#FF5F1F' }}>
                Setup Stripe integration &rarr;
              </button>
            </div>
          )}
        </DashboardCard>

        <DashboardCard 
          title="Active Subscriptions" 
          description="Paying customers"
        >
          {subscriptions > 0 ? (
            <>
              <div className="text-3xl font-bold">{subscriptions}</div>
              <p className="text-xs text-muted-foreground mt-1">+24 new this week</p>
            </>
          ) : (
            <div className="flex flex-col h-full justify-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">No active plans</p>
              <button className="text-sm font-medium hover:underline text-left" style={{ color: '#FF5F1F' }}>
                Create your first project &rarr;
              </button>
            </div>
          )}
        </DashboardCard>
      </div>
    </DashboardPage>
  );
}
