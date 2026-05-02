"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  actions?: React.ReactNode;
  variant?: "landing" | "dashboard";
}

export function Header({ title, actions, variant = "landing" }: HeaderProps) {
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
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left — Wordmark */}
        <Link href="/" className="flex items-center">
          <span
            className="prx-wordmark text-lg text-black"
          >
            PRX
          </span>
        </Link>

        {/* Center — Nav links (landing only) */}
        {variant === "landing" && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Features
            </Link>
            <Link
              href="/proof"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Proof
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              FAQ
            </Link>
          </nav>
        )}

        {/* Dashboard title */}
        {variant === "dashboard" && title && (
          <h1
            className="text-base font-bold text-black"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {title}
          </h1>
        )}

        {/* Right — Actions */}
        <div className="flex items-center gap-3">
          {actions}

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="btn-secondary text-xs sm:text-sm px-3 py-1.5 hidden sm:inline-flex">
                Dashboard
              </Link>
              <div className="relative group">
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-bold transition-opacity hover:opacity-80"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {initials}
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-3 py-2.5 border-b border-gray-100">
                  <p
                    className="text-xs font-semibold text-black truncate"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {fullName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  Dashboard
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
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="btn-ghost text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-primary text-sm px-4 py-2"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}