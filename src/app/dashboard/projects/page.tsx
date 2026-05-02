"use client";

import { DashboardPage, DashboardCard } from "@/components/shell";

export default function ProjectsPage() {
  return (
    <DashboardPage>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Projects
        </h1>
        <p className="text-sm text-gray-500">
          Manage all your active and past projects in one place.
        </p>
      </div>

      <DashboardCard title="Active Projects">
        <div className="text-center py-12">
          <p className="text-sm text-gray-400">No active projects yet.</p>
          <button className="btn-primary text-sm mt-4">
            Create Project
          </button>
        </div>
      </DashboardCard>
    </DashboardPage>
  );
}
