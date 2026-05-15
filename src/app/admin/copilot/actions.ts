"use server";

import { createClient } from "@/lib/supabase/server";

interface SaveResult {
  success: boolean;
  error?: string;
}

/**
 * Saves the compiled copilot text as the `subheadline` of the
 * HeroSection component on the org's landing page.
 */
export async function saveCopilotText(
  orgId: string,
  compiledText: string
): Promise<SaveResult> {
  if (!orgId) return { success: false, error: "No organization selected." };
  if (!compiledText.trim()) return { success: false, error: "Copy text is empty." };

  const supabase = await createClient();

  // 1. Find the landing page for this org
  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("id")
    .eq("org_id", orgId)
    .eq("page_type", "landing")
    .single();

  if (pageError || !page) {
    return {
      success: false,
      error: pageError?.message || "No landing page found for this organization.",
    };
  }

  // 2. Find the HeroSection component on that page
  const { data: component, error: compError } = await supabase
    .from("page_components")
    .select("id, config")
    .eq("page_id", page.id)
    .eq("component_type", "HeroSection")
    .single();

  if (compError || !component) {
    return {
      success: false,
      error: compError?.message || "No HeroSection component found on this landing page.",
    };
  }

  // 3. Merge the subheadline into existing config JSONB
  const existingConfig = (component.config as Record<string, unknown>) || {};
  const updatedConfig = {
    ...existingConfig,
    subheadline: compiledText,
  };

  const { error: updateError } = await supabase
    .from("page_components")
    .update({ config: updatedConfig })
    .eq("id", component.id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true };
}

/**
 * Fetches all organizations the current user belongs to,
 * for the org selector dropdown.
 */
export async function getUserOrgs(): Promise<{
  orgs: { id: string; name: string; accent_color: string }[];
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { orgs: [], error: "Not authenticated." };

  const { data: memberships, error } = await supabase
    .from("organization_members")
    .select("organization_id, organizations(id, name, accent_color)")
    .eq("user_id", user.id);

  if (error) return { orgs: [], error: error.message };

  const orgs = (memberships || [])
    .map((m: any) => m.organizations)
    .filter(Boolean);

  return { orgs };
}
