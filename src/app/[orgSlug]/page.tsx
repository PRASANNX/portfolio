import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/executive/HeroSection";
import { FeaturesGrid } from "@/components/executive/FeaturesGrid";
import { PricingTable } from "@/components/executive/PricingTable";
import { WaitlistBlock } from "@/components/executive/WaitlistBlock";
import { FAQAccordion } from "@/components/executive/FAQAccordion";

const componentMap: Record<string, React.ComponentType<any>> = {
  HeroSection,
  FeaturesGrid,
  PricingTable,
  WaitlistBlock,
  FAQAccordion,
};

interface OrgPageProps {
  params: Promise<{ orgSlug: string }>;
}

export default async function OrgLandingPage({ params }: OrgPageProps) {
  const { orgSlug } = await params;
  const supabase = await createClient();

  // Fetch org
  const { data: org } = await supabase
    .from("organizations")
    .select("id, name, slug")
    .eq("slug", orgSlug)
    .eq("is_active", true)
    .single();

  if (!org) notFound();

  // Fetch published landing page
  const { data: page } = await supabase
    .from("pages")
    .select("id, slug, seo_title")
    .eq("org_id", org.id)
    .eq("page_type", "landing")
    .eq("is_published", true)
    .single();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <h1
            className="text-3xl font-black text-black mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {org.name}
          </h1>
          <p className="body text-gray-500">
            This project is being set up. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  // Fetch page components in sort order
  const { data: components } = await supabase
    .from("page_components")
    .select("*")
    .eq("page_id", page.id)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  return (
    <div className="min-h-screen bg-white">
      {components?.map((comp) => {
        const Component = componentMap[comp.component_type];
        if (!Component) return null;

        // Inject orgSlug for components that need it (WaitlistBlock)
        const props = {
          ...comp.config,
          ...(comp.component_type === "WaitlistBlock" ? { orgSlug } : {}),
        };

        return <Component key={comp.id} {...props} />;
      })}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <p
          className="text-center text-xs text-gray-400"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Powered by{" "}
          <span className="font-semibold text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
            PRX
          </span>
        </p>
      </footer>
    </div>
  );
}
