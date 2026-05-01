/**
 * PRX Startup OS — TypeScript Types
 * Updated schema: org_memberships (not organization_members), no subscriptions table
 */

// ============================================
// Database Types (match current Supabase schema)
// ============================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  accent_color: string;
  logo_url: string | null;
  is_active: boolean;
  billing_tier: BillingTier;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface OrgMembership {
  id: string;
  org_id: string;
  user_id: string;
  role: UserRole;
  status: MembershipStatus;
  invited_by: string | null;
  created_at: string;
  // Joined fields
  profile?: Profile;
  organization?: Organization;
}

export interface WaitlistEntry {
  id: string;
  org_id: string;
  email: string;
  name: string | null;
  source: string;
  status: WaitlistStatus;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ============================================
// Enums / Literal Types
// ============================================

export type UserRole = "owner" | "admin" | "staff" | "client";
export type MembershipStatus = "active" | "pending" | "suspended";
export type WaitlistStatus = "pending" | "contacted" | "converted" | "rejected";
export type BillingTier = "free" | "starter" | "professional" | "enterprise";

// ============================================
// API Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// Component Props Types
// ============================================

export interface DashboardNavItem {
  title: string;
  href: string;
  badge?: string;
  children?: DashboardNavItem[];
}

// ============================================
// Next.js Page Props
// ============================================

export interface LayoutParams {
  params: Promise<{
    orgSlug?: string;
    slug?: string;
    id?: string;
  }>;
}