import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/org — List current user's organizations
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: memberships, error } = await supabase
    .from("org_memberships")
    .select("org_id, role, status, organizations(*)")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const orgs = memberships?.map((m) => ({
    ...m.organizations,
    role: m.role,
  }));

  return NextResponse.json({ data: orgs });
}

/**
 * POST /api/org — Create a new organization
 * Body: { name: string, slug: string }
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Name and slug are required" },
      { status: 400 }
    );
  }

  // Validate slug format
  const slugRegex = /^[a-z0-9-]{3,30}$/;
  if (!slugRegex.test(slug)) {
    return NextResponse.json(
      { error: "Slug must be 3-30 characters, lowercase alphanumeric and hyphens only" },
      { status: 400 }
    );
  }

  // Use the RPC function to create org + auto-assign owner
  const { data: orgId, error } = await supabase.rpc("create_organization", {
    org_name: name,
    org_slug: slug,
    owner_id: user.id,
  });

  if (error) {
    if (error.message.includes("duplicate")) {
      return NextResponse.json(
        { error: "An organization with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: { id: orgId, name, slug } }, { status: 201 });
}
