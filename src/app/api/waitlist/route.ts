import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/waitlist — Submit email to waitlist
 * Body: { email: string, orgSlug: string, name?: string }
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, orgSlug, name } = body;

  if (!email || !orgSlug) {
    return NextResponse.json(
      { error: "Email and orgSlug are required" },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Fetch org by slug (public read — this bypasses RLS since pages are public)
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("id")
    .eq("slug", orgSlug)
    .eq("is_active", true)
    .single();

  if (orgError || !org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  // Check for duplicate email in this org
  const { data: existing } = await supabase
    .from("waitlist_entries")
    .select("id")
    .eq("org_id", org.id)
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "You're already on the waitlist!" },
      { status: 409 }
    );
  }

  // Insert waitlist entry
  const { error: insertError } = await supabase.from("waitlist_entries").insert({
    org_id: org.id,
    email,
    name: name || null,
    source: "landing_page",
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Added to waitlist" });
}
