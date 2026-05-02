"use client";

import { DashboardPage, DashboardCard } from "@/components/shell";

export default function ClientsPage() {
  return (
    <DashboardPage>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Clients
          </h1>
          <p className="text-sm text-gray-500">
            View and manage all the client organizations and their portal access.
          </p>
        </div>
        <button className="btn-primary text-sm whitespace-nowrap">
          Add Client
        </button>
      </div>

      <DashboardCard title="Client Directory">
        <div className="text-center py-12">
          <p className="text-sm text-gray-400">You don't have any clients yet.</p>
        </div>
      </DashboardCard>
    </DashboardPage>
  );
}
