"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useOrg } from "@/components/org-provider";
import {
  LayoutDashboard,
  PlusCircle,
  Inbox,
  FlaskConical,
  ShieldCheck,
  Zap,
  PenTool,
  ImageIcon,
  Users,
  CreditCard,
  Settings,
  ChevronDown,
  LogOut,
  Check,
} from "lucide-react";

// ─── Nav Zone Structure ────────────────────────────────────────────
const NAV_ZONES = [
  {
    zone: "CORE",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "New Project", href: "/dashboard/projects/new", icon: PlusCircle, accent: true },
    ],
  },
  {
    zone: "AGENCY HUB",
    items: [
      { label: "Omni-Inbox", href: "/dashboard/admin/inbox", icon: Inbox },
      { label: "Pre-Flight Sandbox", href: "/dashboard/admin/sandbox", icon: FlaskConical },
      { label: "DPDP Compliance", href: "/dashboard/admin/compliance", icon: ShieldCheck },
    ],
  },
  {
    zone: "GROWTH ENGINE",
    items: [
      { label: "Viral Hook Gen", href: "/dashboard/admin/hooks", icon: Zap },
      { label: "Copywriting Co-Pilot", href: "/dashboard/admin/copywriting", icon: PenTool },
      { label: "Asset Generator", href: "/dashboard/admin/assets", icon: ImageIcon },
    ],
  },
  {
    zone: "ORGANIZATION",
    items: [
      { label: "Client Portal", href: "/dashboard/clients", icon: Users },
      { label: "Invoices & Payments", href: "/dashboard/billing", icon: CreditCard },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { currentOrg, userOrgs, switchOrg, isLoading } = useOrg();
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-gray-200 flex-shrink-0">
      {/* Wordmark */}
      <div className="px-6 py-5 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span
            className="text-xl font-black text-black tracking-tighter"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.05em" }}
          >
            PRX
          </span>
          <span
            className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            OS
          </span>
        </Link>
      </div>

      {/* Navigation Zones */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {NAV_ZONES.map((zone) => (
          <div key={zone.zone}>
            {/* Zone Label */}
            <p
              className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {zone.zone}
            </p>

            {/* Zone Items */}
            <div className="space-y-0.5">
              {zone.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group ${
                      active
                        ? "bg-black text-white font-semibold"
                        : item.accent
                        ? "text-[#FF5F1F] hover:bg-orange-50 font-semibold border border-dashed border-[#FF5F1F]/40 hover:border-[#FF5F1F]"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                    style={{ fontFamily: active ? "Montserrat, sans-serif" : "Inter, sans-serif" }}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        active
                          ? "text-white"
                          : item.accent
                          ? "text-[#FF5F1F]"
                          : "text-gray-400 group-hover:text-gray-700"
                      }`}
                    />
                    {item.label}
                    {active && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF5F1F] flex-shrink-0"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Org Switcher */}
      <div className="px-3 py-3 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setOrgMenuOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 text-left"
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: currentOrg?.accent_color || "#FF5F1F",
              }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-bold text-black truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {isLoading ? "Loading..." : currentOrg?.name || "No project selected"}
              </p>
              <p className="text-xs text-gray-400 truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                {currentOrg?.billing_tier || "free"} plan
              </p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150 ${
                orgMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {orgMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              {userOrgs.length > 0 ? (
                userOrgs.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => { switchOrg(org.id); setOrgMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors duration-100"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: org.accent_color }}
                    />
                    <span
                      className="text-xs font-medium text-black truncate"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {org.name}
                    </span>
                    {currentOrg?.id === org.id && (
                      <Check className="w-3 h-3 ml-auto text-gray-400" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-3 text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  No projects yet
                </div>
              )}
              <div className="border-t border-gray-100">
                <Link
                  href="/dashboard/projects/new"
                  className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-[#FF5F1F] hover:bg-orange-50 transition-colors duration-100"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  onClick={() => setOrgMenuOpen(false)}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  New Project
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sign out */}
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-black transition-colors duration-150 rounded-lg hover:bg-gray-50"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}