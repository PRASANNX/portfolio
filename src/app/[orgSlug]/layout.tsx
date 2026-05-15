import { createClient } from "@/lib/supabase/server";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface OrgLayoutProps {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}): Promise<Metadata> {
  const { orgSlug } = await params;
  const supabase = await createClient();

  const { data: org } = await supabase
    .from("organizations")
    .select("name, accent_color, slug")
    .eq("slug", orgSlug)
    .eq("is_active", true)
    .single();

  if (!org) return { title: "Not Found" };

  return {
    title: org.name,
    description: `Join ${org.name} — Early access waitlist`,
    openGraph: {
      title: org.name,
      description: `Join ${org.name} — Early access waitlist`,
      images: [
        `/api/og?title=${encodeURIComponent(org.name)}&accent=${encodeURIComponent(org.accent_color || "#FF5F1F")}`,
      ],
      type: "website",
    },
  };
}

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
  const { orgSlug } = await params;
  const supabase = await createClient();

  const { data: org } = await supabase
    .from("organizations")
    .select("id, name, slug, accent_color, brand_archetype, is_active")
    .eq("slug", orgSlug)
    .eq("is_active", true)
    .single();

  if (!org) {
    notFound();
  }

  return (
    <ThemeWrapper
      accentColor={org.accent_color || "#FF5F1F"}
      archetype={org.brand_archetype || "Outlaw"}
    >
      {children}
    </ThemeWrapper>
  );
}
