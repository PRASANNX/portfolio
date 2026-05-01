import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (for server components, API routes)
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // This will throw an error in Server Components
            // Ignore - middleware handles cookies
          }
        },
      },
    }
  );
}

/**
 * Get user from session (for API routes)
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Get profile with organization info
 */
export async function getProfileWithOrg() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  // Get primary organization
  const { data: membership } = await supabase
    .from("organization_members")
    .select(
      `
      *,
      organization:organizations(*)
    `
    )
    .eq("user_id", user.id)
    .eq("role", "owner")
    .single();

  return {
    profile,
    organization: membership?.organization || null,
  };
}