/**
 * TypeScript Types for The Engine
 */
import type { Json } from "@supabase/supabase-js";

// ============================================
// Database Types (match Supabase schema)
// ============================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: PlanKey;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: RoleKey;
  created_at: string;
  // Joined fields
  profile?: Profile;
  organization?: Organization;
}

export interface Subscription {
  id: string;
  organization_id: string;
  razorpay_subscription_id: string | null;
  razorpay_customer_id: string | null;
  plan: PlanKey;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// Enums and Constants
// ============================================

export type PlanKey = "free" | "starter" | "pro" | "enterprise";

export type RoleKey = "owner" | "admin" | "member";

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "paused";

// ============================================
// API Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface RazorpayCheckoutRequest {
  plan: PlanKey;
  organizationId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface RazorpayCheckoutResponse {
  sessionId: string;
  paymentUrl: string;
}

export interface RazorpayWebhookPayload {
  event: string;
  payload: {
    subscription?: {
      entity: {
        id: string;
        status: string;
        current_period_start: number;
        current_period_end: number;
        plan_id: string;
      };
    };
    invoice?: {
      entity: {
        id: string;
        subscription_id: string;
        amount_paid: number;
        status: string;
      };
    };
  };
}

// ============================================
// Context Types
// ============================================

export interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  isActive: boolean;
  plan: PlanKey;
  refreshSubscription: () => Promise<void>;
}

// ============================================
// Component Props Types
// ============================================

export interface DashboardNavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: DashboardNavItem[];
}

// ============================================
// Next.js Page Props
// ============================================

export interface LayoutParams {
  params: Promise<{
    slug?: string;
    id?: string;
  }>;
}