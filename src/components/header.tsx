"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const fullName: string =
    user?.user_metadata?.full_name || user?.email || "User";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {title && (
            <h1
              className="text-base font-bold text-black"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Custom actions slot */}
          {actions}

          {/* User avatar dropdown */}
          <div className="relative group">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-bold transition-opacity hover:opacity-80" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {initials}
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <p className="text-xs font-semibold text-black truncate" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {fullName}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <Link
                href="/dashboard/settings"
                className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-3 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}