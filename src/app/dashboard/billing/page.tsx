"use client";

import { DashboardPage, DashboardCard } from "@/components/shell";

export default function BillingPage() {
  return (
    <DashboardPage>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Billing
        </h1>
        <p className="text-sm text-gray-500">
          Manage your subscription, invoices, and billing details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <DashboardCard title="Current Plan">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="font-semibold text-black">Plan</span>
              <span className="text-sm text-gray-600">Free Tier</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-black">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                Active
              </span>
            </div>
            <button className="btn-primary w-full text-sm mt-4">
              Upgrade Plan
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Payment Methods">
          <div className="text-center py-8">
            <p className="text-sm text-gray-400">No payment methods added.</p>
            <button className="btn-secondary text-sm mt-4">
              Add Payment Method
            </button>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Billing History">
        <div className="text-center py-12">
          <p className="text-sm text-gray-400">No billing history available.</p>
        </div>
      </DashboardCard>
    </DashboardPage>
  );
}
