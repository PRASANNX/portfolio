import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (for client components)
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Singleton pattern for client-side usage
 */
let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!client && typeof window !== "undefined") {
    client = createClient();
  }
  return client;
}