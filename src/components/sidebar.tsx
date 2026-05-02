"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useOrg } from "@/components/org-provider";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Clients", href: "/dashboard/clients" },
  { label: "Omni-Inbox", href: "/dashboard/admin/inbox" },
  { label: "Billing", href: "/dashboard/billing" },
  { label: "Settings", href: "/dashboard/settings" },
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
    <aside className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      {/* Wordmark */}
      <div className="px-6 py-5 border-b border-gray-200">
        <Link href="/dashboard">
          <span
            className="prx-wordmark text-xl text-black"
          >
            PRX
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
              isActive(item.href)
                ? "font-semibold text-black bg-gray-100 border-l-2"
                : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
            style={
              isActive(item.href)
                ? { borderColor: "var(--accent)", fontFamily: "Montserrat, sans-serif" }
                : { fontFamily: "Inter, sans-serif" }
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Org Switcher */}
      <div className="px-3 py-3 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setOrgMenuOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 text-left"
          >
            {/* Accent dot */}
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: currentOrg?.accent_color || "var(--accent)",
              }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold text-black truncate"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {isLoading
                  ? "Loading..."
                  : currentOrg?.name || "No project selected"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentOrg?.billing_tier || "free"} plan
              </p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-150 ${orgMenuOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
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
                    <span
                      className="text-xs font-medium text-black truncate"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {org.name}
                    </span>
                    {currentOrg?.id === org.id && (
                      <svg className="w-3 h-3 ml-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-3 text-xs text-gray-400">
                  No projects yet
                </div>
              )}
              <div className="border-t border-gray-100">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-black hover:bg-gray-50 transition-colors duration-100"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  onClick={() => setOrgMenuOpen(false)}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  New Project
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-xs text-gray-500 hover:text-black text-left transition-colors duration-150"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}