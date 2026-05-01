"use client";

import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const quickActions = [
  { title: "Create New Project", href: "/dashboard/projects/new", description: "Start a fresh project" },
  { title: "View Analytics", href: "/dashboard/analytics", description: "Track your metrics" },
  { title: "Invite Team Member", href: "/dashboard/team/invite", description: "Collaborate with others" },
];

const recentActivity = [
  { id: 1, action: "Project created", time: "2 hours ago", project: "Client Portal Redesign" },
  { id: 2, action: "Team member added", time: "5 hours ago", project: "Marketing Dashboard" },
  { id: 3, action: "Subscription upgraded", time: "1 day ago", project: null },
];

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user?.full_name?.split(" ")[0] || "Founder"} 👋
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>
          <Button>Create Project</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Projects</CardDescription>
              <CardTitle className="text-4xl">0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">+0 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Team Members</CardDescription>
              <CardTitle className="text-4xl">1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Free tier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Subscription</CardDescription>
              <CardTitle className="text-xl flex items-center gap-2">
                Free
                <Badge variant="secondary">Current Plan</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 h-auto text-sm">
                Upgrade to Pro →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start h-auto py-4"
                  asChild
                >
                  <a href={action.href}>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      {activity.project && (
                        <p className="text-xs text-muted-foreground">{activity.project}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}