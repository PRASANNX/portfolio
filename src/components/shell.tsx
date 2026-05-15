import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/header";

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

export function DashboardShell({ children, title, actions }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} actions={actions} />
        <main className="flex-1 p-6 bg-[#FAFAFA]">
          {children}
        </main>
      </div>
    </div>
  );
}

interface DashboardPageProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardPage({ children, className }: DashboardPageProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function DashboardCard({
  title,
  description,
  children,
  className,
  action,
}: DashboardCardProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="bg-card rounded-lg border p-6">
        {children}
      </div>
    </div>
  );
}