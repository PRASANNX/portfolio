import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ClientPortalShell } from "@/components/executive/ClientPortalShell";
import { ThemeWrapper } from "@/components/theme-wrapper";

interface PortalLayoutProps {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}

export default async function PortalLayout({ children, params }: PortalLayoutProps) {
  const { orgSlug } = await params;
  const supabase = await createClient();

  // 1. Fetch Organization
  const { data: org } = await supabase
    .from("organizations")
    .select("id, name, slug, accent_color, is_active")
    .eq("slug", orgSlug)
    .eq("is_active", true)
    .single();

  if (!org) notFound();

  // 2. Fetch User & Verify Access
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/${orgSlug}/portal`);
  }

  // 3. Define Navigation Items
  const navItems = [
    { label: "Dashboard", href: `/${orgSlug}/portal` },
    { label: "Appointments", href: `/${orgSlug}/portal/appointments` },
    { label: "Documents", href: `/${orgSlug}/portal/documents` },
    { label: "Messages", href: `/${orgSlug}/portal/messages` },
    { label: "Invoices", href: `/${orgSlug}/portal/invoices` },
  ];

  return (
    <ThemeWrapper accentColor={org.accent_color || "#FF5F1F"}>
      <ClientPortalShell
        orgName={org.name}
        orgSlug={org.slug}
        accentColor={org.accent_color || "#FF5F1F"}
        navItems={navItems}
      >
        {children}
      </ClientPortalShell>
    </ThemeWrapper>
  );
}
