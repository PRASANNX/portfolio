import React from "react";
import Link from "next/link";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { createClient } from "@/lib/supabase/server";

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgSlug: string };
}) {
  const supabase = await createClient();
  const { data: org } = await supabase
    .from("organizations")
    .select("name, accent_color, brand_archetype")
    .eq("slug", params.orgSlug)
    .single();

  if (!org) {
    return <div>Organization not found</div>;
  }

  return (
    <ThemeWrapper accentColor={org.accent_color} archetype={org.brand_archetype as any}>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-['Inter'] selection:bg-[var(--accent)] selection:text-white">
        {/* Minimalist Header */}
        <header className="border-b border-gray-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link 
              href={`/${params.orgSlug}`}
              className="font-['Montserrat'] font-black tracking-tighter text-xl flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-sm bg-[var(--accent)]" />
              {org.name}
            </Link>
            <div className="flex gap-6 text-sm font-medium text-gray-500">
              <Link href={`/${params.orgSlug}/legal/terms`} className="hover:text-black transition-colors">Terms</Link>
              <Link href={`/${params.orgSlug}/legal/privacy`} className="hover:text-black transition-colors">Privacy</Link>
              <Link href={`/${params.orgSlug}/legal/refund`} className="hover:text-black transition-colors">Refund Policy</Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="max-w-3xl mx-auto px-6 py-16">
          {children}
        </main>

        {/* Executive Footer */}
        <footer className="border-t border-gray-200/50 py-12 mt-20">
          <div className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-400 font-medium tracking-wide">
            POWERED BY PRX OS • SECURE INFRASTRUCTURE
          </div>
        </footer>
      </div>
    </ThemeWrapper>
  );
}
