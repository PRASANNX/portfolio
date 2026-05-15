"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useOrg } from "@/components/org-provider";
import {
  Home,
  PlusSquare,
  Inbox,
  TestTube,
  ShieldCheck,
  TrendingUp,
  PenTool,
  ImageIcon,
  LayoutDashboard,
  CreditCard,
  Settings,
  ChevronDown,
  LogOut,
  Check,
  PlusCircle,
  User,
} from "lucide-react";

// ─── Navigation Zone Definitions ──────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavZone {
  zone: string;
  items: NavItem[];
}

const NAV_ZONES: NavZone[] = [
  {
    zone: "CORE",
    items: [
      { label: "Home", href: "/dashboard", icon: Home },
      { label: "New Project", href: "/dashboard/new", icon: PlusSquare },
    ],
  },
  {
    zone: "AGENCY HUB",
    items: [
      { label: "Omni-Inbox", href: "/admin/inbox", icon: Inbox },
      { label: "Pre-Flight Sandbox", href: "/admin/sandbox", icon: TestTube },
      { label: "DPDP Compliance", href: "/admin/dpdp", icon: ShieldCheck },
    ],
  },
  {
    zone: "GROWTH ENGINE",
    items: [
      { label: "Viral Hook Gen", href: "/admin/hooks", icon: TrendingUp },
      { label: "Copywriting Co-Pilot", href: "/admin/copilot", icon: PenTool },
      { label: "Asset Generator", href: "/admin/assets", icon: ImageIcon },
    ],
  },
  {
    zone: "ORGANIZATION",
    items: [
      { label: "Client Portal", href: "/dashboard/portal", icon: LayoutDashboard },
      { label: "Invoices & Payments", href: "/dashboard/invoices", icon: CreditCard },
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
      {/* ─── Brand Header ──────────────────────────────── */}
      <div className="px-6 py-5 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-baseline gap-1.5">
          <span className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
            PRX
          </span>
          <span className="font-['Montserrat'] text-xl font-black text-[#FF5F1F] tracking-tight">
            OS
          </span>
        </Link>
      </div>

      {/* ─── Navigation Zones ──────────────────────────── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {NAV_ZONES.map((zone) => (
          <div key={zone.zone}>
            {/* Zone Title */}
            <p className="px-3 mb-2 text-[10px] font-['Inter'] font-bold text-gray-400 uppercase tracking-[0.15em]">
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
                    className={`
                      relative flex items-center gap-2.5 px-3 py-2 rounded-md text-sm
                      transition-all duration-150 group
                      ${
                        active
                          ? "font-['Montserrat'] font-semibold text-[#FF5F1F] bg-[#FF5F1F]/[0.06]"
                          : "font-['Inter'] text-gray-600 hover:text-black hover:bg-gray-50"
                      }
                    `}
                  >
                    {/* Left accent border for active state */}
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#FF5F1F]" />
                    )}

                    <Icon
                      className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                        active
                          ? "text-[#FF5F1F]"
                          : "text-gray-400 group-hover:text-gray-700"
                      }`}
                    />

                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ─── Org Switcher ──────────────────────────────── */}
      <div className="px-3 py-3 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setOrgMenuOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 text-left"
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: currentOrg?.accent_color || "#FF5F1F" }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-['Montserrat'] text-xs font-bold text-black truncate">
                {isLoading ? "Loading..." : currentOrg?.name || "No project selected"}
              </p>
              <p className="font-['Inter'] text-xs text-gray-400 truncate">
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
                    onClick={() => {
                      switchOrg(org.id);
                      setOrgMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors duration-100"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: org.accent_color }}
                    />
                    <span className="font-['Montserrat'] text-xs font-medium text-black truncate">
                      {org.name}
                    </span>
                    {currentOrg?.id === org.id && (
                      <Check className="w-3 h-3 ml-auto text-[#FF5F1F]" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-3 font-['Inter'] text-xs text-gray-400">
                  No projects yet
                </div>
              )}
              <div className="border-t border-gray-100">
                <Link
                  href="/dashboard/new"
                  className="flex items-center gap-2 px-3 py-2.5 font-['Montserrat'] text-xs font-bold text-[#FF5F1F] hover:bg-orange-50 transition-colors duration-100"
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

      {/* ─── User Footer ───────────────────────────────── */}
      <div className="px-3 pb-4 space-y-1">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Inter'] text-xs font-medium text-black truncate">
              Founder
            </p>
            <p className="font-['Inter'] text-[10px] text-gray-400 truncate">
              Admin
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 font-['Inter'] text-xs text-gray-400 hover:text-black transition-colors duration-150 rounded-lg hover:bg-gray-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
