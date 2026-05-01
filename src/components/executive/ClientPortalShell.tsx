"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface ClientPortalShellProps {
  orgName: string;
  orgSlug: string;
  accentColor?: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

export function ClientPortalShell({
  orgName,
  orgSlug,
  navItems,
  children,
}: ClientPortalShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={`/${orgSlug}/portal`}>
            <span className="prx-wordmark text-lg text-black">{orgName}</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
                    isActive ? "text-black bg-gray-100" : "text-gray-500 hover:text-black"
                  }`}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    ...(isActive ? { color: "var(--accent)" } : {}),
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Mobile nav */}
        <div className="sm:hidden border-t border-gray-100 overflow-x-auto">
          <div className="flex px-4 gap-1 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                    isActive ? "text-black bg-gray-100" : "text-gray-500"
                  }`}
                  style={isActive ? { color: "var(--accent)" } : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>
      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
