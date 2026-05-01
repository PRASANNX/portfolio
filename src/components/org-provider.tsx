"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { createClient } from "@/lib/supabase/client";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  accent_color: string;
  logo_url: string | null;
  is_active: boolean;
  billing_tier: string;
  created_by: string;
}

export type UserRole = "owner" | "admin" | "staff" | "client";

interface OrgContextType {
  currentOrg: Organization | null;
  userOrgs: Organization[];
  userRole: UserRole | null;
  isLoading: boolean;
  switchOrg: (orgId: string) => void;
}

const OrgContext = createContext<OrgContextType>({
  currentOrg: null,
  userOrgs: [],
  userRole: null,
  isLoading: true,
  switchOrg: () => {},
});

const ORG_STORAGE_KEY = "prx_current_org_id";

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [userOrgs, setUserOrgs] = useState<Organization[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  const loadOrgs = useCallback(async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return;
    }

    // Fetch all orgs the user belongs to via memberships
    const { data: memberships } = await supabase
      .from("org_memberships")
      .select("org_id, role, organizations(*)")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (!memberships || memberships.length === 0) {
      setIsLoading(false);
      return;
    }

    const orgs = memberships
      .map((m) => m.organizations as unknown as Organization)
      .filter(Boolean);
    setUserOrgs(orgs);

    // Determine which org to activate
    const savedOrgId =
      typeof window !== "undefined"
        ? localStorage.getItem(ORG_STORAGE_KEY)
        : null;

    const targetOrg = savedOrgId
      ? orgs.find((o) => o.id === savedOrgId) ?? orgs[0]
      : orgs[0];

    if (targetOrg) {
      setCurrentOrg(targetOrg);
      const membership = memberships.find(
        (m) => (m.organizations as unknown as Organization)?.id === targetOrg.id
      );
      setUserRole((membership?.role as UserRole) ?? null);

      // Inject accent color CSS var
      if (typeof window !== "undefined") {
        document.documentElement.style.setProperty(
          "--accent",
          targetOrg.accent_color || "#FF5F1F"
        );
      }
    }

    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadOrgs();
  }, [loadOrgs]);

  const switchOrg = useCallback(
    (orgId: string) => {
      const org = userOrgs.find((o) => o.id === orgId);
      if (!org) return;
      setCurrentOrg(org);
      if (typeof window !== "undefined") {
        localStorage.setItem(ORG_STORAGE_KEY, orgId);
        document.documentElement.style.setProperty(
          "--accent",
          org.accent_color || "#FF5F1F"
        );
      }
    },
    [userOrgs]
  );

  return (
    <OrgContext.Provider
      value={{ currentOrg, userOrgs, userRole, isLoading, switchOrg }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  return useContext(OrgContext);
}
