import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * PRX Startup OS Middleware
 * - Refreshes Supabase sessions
 * - Protects dashboard routes
 * - Detects org slugs and sets x-org-id headers for public pages
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // ── Auth routes ────────────────────────────────────────────────────────────
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-phone");

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ── Static / public assets ─────────────────────────────────────────────────
  const isStaticRoute =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".");

  // ── Protected dashboard routes ─────────────────────────────────────────────
  const isDashboardRoute = pathname.startsWith("/dashboard");
  if (isDashboardRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // ── Org slug detection for public pages (/[orgSlug]) ──────────────────────
  const reservedPaths = [
    "login",
    "register",
    "verify-phone",
    "dashboard",
    "api",
    "_next",
    "favicon.ico",
    "admin",
  ];

  const segments = pathname.split("/").filter(Boolean);
  const potentialSlug = segments[0];

  if (
    potentialSlug &&
    !reservedPaths.includes(potentialSlug) &&
    !isStaticRoute
  ) {
    // Look up org by slug to inject x-org headers
    const { data: org } = await supabase
      .from("organizations")
      .select("id, accent_color, is_active")
      .eq("slug", potentialSlug)
      .single();

    if (org) {
      supabaseResponse.headers.set("x-org-id", org.id);
      supabaseResponse.headers.set(
        "x-org-accent",
        org.accent_color || "#FF5F1F"
      );
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};