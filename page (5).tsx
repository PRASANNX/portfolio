"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch user profile
  useState(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setFullName(profile.full_name || "");
          setEmail(profile.email);
        }
      }
    };

    fetchProfile();
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const initials = fullName ? getInitials(fullName) : email?.[0] || "U";

  return (
    <DashboardShell title="Settings">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and avatar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" disabled>
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form */}
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Contact support to change your email
                    </p>
                  </div>
                </div>

                {success && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg">
                    Profile updated successfully!
                  </div>
                )}

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Password</Label>
                <Button variant="outline">Change Password</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Sessions</Label>
                <p className="text-sm text-muted-foreground">
                  Manage your active sessions across devices
                </p>
                <Button variant="outline" disabled>
                  View Active Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage your organization members and roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Upgrade to Pro to add team members
                </p>
                <Button variant="outline" onClick={() => router.push("/dashboard/billing")}>
                  View Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}