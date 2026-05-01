import { DashboardShell } from "@/components/shell";
import { ProtectedRoute } from "@/components/protected-route";
import { OrgProvider } from "@/components/org-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <OrgProvider>
        <DashboardShell>{children}</DashboardShell>
      </OrgProvider>
    </ProtectedRoute>
  );
}
