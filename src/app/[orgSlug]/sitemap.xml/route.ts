import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orgSlug: string }> }
) {
  const { orgSlug } = await params;
  const supabase = await createClient();

  // Fetch org
  const { data: org } = await supabase
    .from("organizations")
    .select("id, name, slug")
    .eq("slug", orgSlug)
    .eq("is_active", true)
    .single();

  if (!org) {
    return new Response("Not found", { status: 404 });
  }

  // Fetch published pages
  const { data: pages } = await supabase
    .from("pages")
    .select("slug, updated_at")
    .eq("org_id", org.id)
    .eq("is_published", true);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prxos.com";

  const urls = [
    // Main landing
    {
      loc: `${baseUrl}/${orgSlug}`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: "1.0",
    },
    // All published pages
    ...(pages || []).map((page) => ({
      loc: `${baseUrl}/${orgSlug}/${page.slug}`,
      lastmod: page.updated_at ? new Date(page.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      priority: "0.8",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
