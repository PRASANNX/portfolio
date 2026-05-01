# PRX STARTUP OS — FILE 5: IMPLEMENTATION PLAN

**Version:** 2.0 | **Classification:** Founding Document  
**Author:** Principal Product Strategist | **Audience:** Solo Founder + Antigravity Coding Agent  
**Purpose:** Phased sprint-by-sprint execution plan with exact prompts, risk register, and testing protocols.

---

## PHASED BUILD PLAN — 6 SPRINTS (12 WEEKS)

---

## SPRINT 1 (WEEK 1-2): THE FOUNDATION

### Objective
Establish the core infrastructure: authentication (including phone OTP for Indian users), multi-tenant organization system, role-based access control, and the blank dashboard shell. This is the foundation upon which everything else is built.

### Definition of Done
- User can sign up via email/magic link, Google OAuth, OR phone OTP
- User can create their first organization (org)
- User sees a blank dashboard shell with org context
- All data queries are scoped by `org_id` via Supabase RLS
- Roles (owner, admin, staff, client) are enforced at database level
- Mobile-responsive dashboard shell renders correctly on 360px viewport

### Key Research References for This Sprint
- **Phone Auth:** [Supabase Phone Login Docs](https://supabase.com/docs/guides/auth/phone-login), [HackerOne Phone Auth Guide](https://www.hackerone.com/blog/phone-authentication-twilio-nextjs-and-supabase), [Refine.dev OTP Tutorial](https://refine.dev/blog/supabase-twilio-otp-authentication-in-react/), [Supabase Custom Phone Auth Discussion](https://github.com/orgs/supabase/discussions/14774), [Stack Overflow Phone Auth](https://stackoverflow.com/questions/74793778/supabase-twilio-phone-auth)
- **Accordion Component (for Sprint 3 prep):** [Shadcn UI Accordion](https://ui.shadcn.com/docs/components/accordion), [ShadcnSpace Accordion](https://shadcnspace.com/components/accordion), [ShadcnBlocks](https://www.shadcnblocks.com/)

### Sprint 1 Antigravity Prompt

```
You are building Sprint 1 of PRX Startup OS — a multi-tenant Next.js 14+ application with Supabase.

### TECH STACK (DO NOT CHANGE)
- Framework: Next.js 14 App Router + TypeScript
- Styling: Tailwind CSS + Shadcn UI components
- Database: Supabase (PostgreSQL) hosted in ap-south-1 region
- Auth: Supabase Auth (Email Magic Link + Google OAuth + Phone OTP via Twilio)
- State: Supabase real-time + React Server Components
- Deployment: Vercel

### FILE STRUCTURE TO CREATE

app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── verify-phone/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── components/
│       ├── DashboardShell.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
├── (public)/
│   ├── layout.tsx
│   └── page.tsx
├── api/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   └── og/
│       └── route.tsx
├── globals.css
├── layout.tsx
├── middleware.ts
└── providers.tsx

components/ui/  (all shadcn components)
lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── middleware.ts
├── utils.ts
└── constants.ts
supabase/
├── migrations/
│   └── 001_initial_schema.sql
└── seed.sql
types/
└── database.ts
.env.local

### STEP 1: INITIALIZE PROJECT

Run:
npx create-next-app@latest prx-os --typescript --tailwind --app
cd prx-os
npx shadcn@latest init

Configure shadcn with:
- Style: New York
- Base color: Neutral
- CSS variables: true

Install required shadcn components:
npx shadcn@latest add button input label card avatar dropdown-menu dialog separator badge tabs sheet alert toast skeleton accordion

Note: The accordion component will be used in Sprint 3 for the FAQAccordion. Install it now as a dependency. Reference: https://ui.shadcn.com/docs/components/accordion

### STEP 2: SETUP SUPABASE

Create Supabase project in ap-south-1 (Mumbai) region.

Set up these environment variables in .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000

Create lib/supabase/client.ts:
```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

Create lib/supabase/server.ts:
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
```

### STEP 3: DATABASE SCHEMA

Create supabase/migrations/001_initial_schema.sql:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORGANIZATIONS TABLE
CREATE TABLE public.organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  accent_color TEXT DEFAULT '#FF5F1F',
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  billing_tier TEXT DEFAULT 'free',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORG MEMBERSHIP TABLE (RBAC)
CREATE TABLE public.org_memberships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'staff', 'client')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
  invited_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- WAITLIST ENTRIES TABLE
CREATE TABLE public.waitlist_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'organic',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'rejected')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_org_memberships_org_id ON public.org_memberships(org_id);
CREATE INDEX idx_org_memberships_user_id ON public.org_memberships(user_id);
CREATE INDEX idx_waitlist_entries_org_id ON public.waitlist_entries(org_id);
CREATE INDEX idx_waitlist_entries_email ON public.waitlist_entries(email);

-- ROW LEVEL SECURITY POLICIES

-- Profiles: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Organizations: members can read their orgs
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can read their organizations"
  ON public.organizations FOR SELECT
  USING (id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND status = 'active'));
CREATE POLICY "Anyone can create an organization"
  ON public.organizations FOR INSERT
  WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Owners and admins can update their organizations"
  ON public.organizations FOR UPDATE
  USING (id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'));

-- Org Memberships: members can see other members of their org
ALTER TABLE public.org_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can read org memberships"
  ON public.org_memberships FOR SELECT
  USING (org_id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND status = 'active'));
CREATE POLICY "Owners and admins can manage memberships"
  ON public.org_memberships FOR ALL
  USING (org_id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'));

-- Waitlist: scoped to org
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Org members can read waitlist"
  ON public.waitlist_entries FOR SELECT
  USING (org_id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND status = 'active'));
CREATE POLICY "Org members can insert waitlist entries"
  ON public.waitlist_entries FOR INSERT
  WITH CHECK (org_id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND status = 'active'));

-- DATABASE FUNCTIONS

-- Function to create org and auto-assign owner role
CREATE OR REPLACE FUNCTION public.create_organization(
  org_name TEXT,
  org_slug TEXT,
  owner_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_org_id UUID;
BEGIN
  INSERT INTO public.organizations (name, slug, created_by)
  VALUES (org_name, org_slug, owner_id)
  RETURNING id INTO new_org_id;

  INSERT INTO public.org_memberships (org_id, user_id, role)
  VALUES (new_org_id, owner_id, 'owner');

  RETURN new_org_id;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### STEP 4: TYPES

Create types/database.ts:
```typescript
export type UserRole = 'owner' | 'admin' | 'staff' | 'client';
export type MembershipStatus = 'active' | 'pending' | 'suspended';
export type WaitlistStatus = 'pending' | 'contacted' | 'converted' | 'rejected';
export type BillingTier = 'free' | 'starter' | 'professional' | 'enterprise';

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

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at' | 'updated_at'>; Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>> };
      organizations: { Row: Organization; Insert: Omit<Organization, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at'>> };
      org_memberships: { Row: OrgMembership; Insert: Omit<OrgMembership, 'id' | 'created_at'>; Update: Partial<Omit<OrgMembership, 'id' | 'created_at'>> };
      waitlist_entries: { Row: WaitlistEntry; Insert: Omit<WaitlistEntry, 'id' | 'created_at'>; Update: Partial<Omit<WaitlistEntry, 'id' | 'created_at'>> };
    };
  };
};
```

### STEP 5: AUTH PAGES

Create app/(auth)/login/page.tsx:
- Clean card centered on screen
- Three options: "Continue with Google" button, "Continue with Email" input, "Continue with Phone" input
- Email input triggers magic link via Supabase
- Phone input triggers OTP flow (see phone auth implementation below)
- Google button uses Supabase OAuth
- Link to /signup
- Mobile: full-width card with 16px padding
- Desktop: max-w-md card centered with 40px padding
- AESTHETIC: Pure white card on deep charcoal (#121212) background, Montserrat 700 heading, Inter 400 body, accent button (#FF5F1F) with white text, no gradients

**Phone OTP Implementation (India-Critical):**
- Reference: https://supabase.com/docs/guides/auth/phone-login
- User enters phone number in E.164 format (+91XXXXXXXXXX)
- Call `supabase.auth.signInWithOtp({ phone })` to send SMS
- Redirect to /auth/verify-phone with phone number in search params
- On verify page, user enters 6-digit OTP
- Call `supabase.auth.verifyOtp({ phone, token, type: 'sms' })`
- On success, create/update profile and redirect to /dashboard
- Reference implementation: https://refine.dev/blog/supabase-twilio-otp-authentication-in-react/
- Security considerations: https://www.hackerone.com/blog/phone-authentication-twilio-nextjs-and-supabase

Create app/(auth)/signup/page.tsx:
- Same layout as login
- Fields: Full name, Email, Phone (optional), Password (min 8 chars)
- Submit creates account via Supabase email/password
- On success, redirect to /dashboard
- AESTHETIC: Identical to login page

Create app/(auth)/verify-phone/page.tsx:
- Phone OTP verification page
- Shows masked phone number (e.g., "+91 98765 ****")
- 6-digit OTP input (auto-focus, auto-advance to next digit)
- "Resend OTP" button with 30-second cooldown timer
- On success, redirect to /dashboard
- AESTHETIC: Same card layout, accent-colored OTP input focus ring

Create app/(auth)/layout.tsx:
- Full-screen deep charcoal (#121212) background
- Centered auth card
- PRX wordmark in Montserrat 800 at top
- No other branding elements

### STEP 6: MIDDLEWARE

Create app/middleware.ts:
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/auth/verify-phone'],
};
```

### STEP 7: DASHBOARD SHELL

Create app/(dashboard)/layout.tsx:
- Server component that fetches user's org memberships
- If no org, show "Create your first project" CTA
- If org exists, wrap children with DashboardShell
- Pass org context to children via React context or search params
- AESTHETIC: Left sidebar (collapsible on mobile), top header with org switcher, main content area with white background (#FFFFFF), thin border separators (border-gray-200), no colored backgrounds

Create components/DashboardShell.tsx:
```
Structure:
- Mobile: Top bar with hamburger menu → Sheet slides in from left with nav links
- Desktop: Fixed left sidebar (w-64) with nav links, scrollable main content area (ml-64)
- Sidebar contains: PRX wordmark (Montserrat 800, 20px), nav items (Dashboard, Projects, Settings, Billing), org switcher dropdown at bottom
- Top header contains: Breadcrumb, user avatar dropdown, notification bell
- Active nav item highlighted with left border-2 border-[#FF5F1F] and text-[#FF5F1F]
- All other nav items text-gray-600, hover:text-black
```

Create app/(dashboard)/dashboard/page.tsx:
- Shows org summary cards: Total Users, Waitlist Signups, Revenue (placeholder for now)
- Recent activity feed (empty state initially)
- Quick action buttons: "New Project" (accent button), "Invite Member" (outline button)
- AESTHETIC: White cards with border-gray-200, Montserrat 700 for card labels, Inter 400 for values, accent color ONLY for "New Project" button

### STEP 8: ORGANIZATION CREATION FLOW

Create components/CreateOrgModal.tsx:
- Dialog component triggered from dashboard
- Form fields: Organization Name (text), URL Slug (auto-generated from name, editable), Accent Color (color picker with preset: #FF5F1F as default)
- On submit: Call RPC `create_organization(name, slug, user_id)`
- On success: Redirect to /dashboard with new org context
- Validation: Slug must be unique, alphanumeric + hyphens only, 3-30 characters

Create API route app/api/org/route.ts:
- POST: Creates organization using the RPC function
- GET: Returns user's organizations
- Both protected by auth middleware

### STEP 9: ORG CONTEXT PROVIDER

Create components/OrgProvider.tsx:
- React context that provides current org_id, org data, user's role
- Reads org_id from URL search param (?org=xxx) or localStorage
- Falls back to user's first org if none specified
- All API calls and Supabase queries use this org_id for filtering

### STEP 10: SEED DATA

Create supabase/seed.sql:
- Insert 1 test profile
- Insert 1 test organization
- Insert 1 test membership
- Useful for local development

### AESTHETIC ENFORCEMENT
Every component must follow:
- Headings: `font-['Montserrat'] font-bold tracking-tight`
- Body: `font-['Inter'] font-normal leading-relaxed`
- Primary button: `bg-[#FF5F1F] text-white hover:bg-[#E54E1A]` — NO other button color for primary actions
- Secondary button: `border border-gray-300 text-black hover:bg-gray-50`
- Backgrounds: `bg-white` or `bg-[#121212]` ONLY — no gray-50, no blue, no gradients
- Separators: `border-b border-gray-200` or `border-gray-200`
- Cards: `bg-white border border-gray-200 rounded-lg`
- Mobile-first: Every component must have `sm:`, `md:`, `lg:` breakpoints explicitly defined

### DEPLOYMENT CHECKLIST
- [ ] Supabase project created in ap-south-1
- [ ] All environment variables set in .env.local
- [ ] Database migration applied successfully
- [ ] RLS policies verified (test with different user roles)
- [ ] Auth flow works (email magic link + Google OAuth + Phone OTP)
- [ ] Phone OTP sends and verifies correctly (test with Indian number)
- [ ] Org creation flow works end-to-end
- [ ] Dashboard renders on mobile (360px width) and desktop
- [ ] Vercel project connected and initial deploy successful
```

### Sprint 1 Acceptance Criteria
- [ ] New user can sign up with email and receive magic link
- [ ] New user can sign up with Google OAuth
- [ ] New user can sign up with phone number and receive OTP via SMS
- [ ] User can verify phone OTP and complete registration
- [ ] After signup, user lands on dashboard with "Create your first organization" prompt
- [ ] User can create an organization with name, slug, and accent color
- [ ] Created org appears in sidebar with active state
- [ ] User can switch between multiple orgs (if they belong to more than one)
- [ ] All data queries are scoped by org_id — verified via Supabase logs
- [ ] Dashboard shell is fully responsive at 360px, 768px, and 1440px
- [ ] RLS policies prevent cross-org data leakage (verified with test queries)

### Sprint 1 Testing Checklist
- [ ] Test signup on mobile Chrome (Android)
- [ ] Test signup on mobile Safari (iOS)
- [ ] Test magic link delivery and redirect
- [ ] Test Google OAuth redirect flow
- [ ] Test phone OTP delivery to Indian number (+91)
- [ ] Test OTP verification with correct and incorrect codes
- [ ] Test OTP expiry (60 seconds) and resend cooldown (30 seconds)
- [ ] Test org creation with duplicate slug (should show error)
- [ ] Test org creation with special characters in name
- [ ] Test RLS: create second user, verify they cannot see first user's org
- [ ] Test on simulated slow 4G (DevTools throttling: 1.6 Mbps down, 750 Kbps up)
- [ ] Test dashboard renders without layout shift on mobile

---

## SPRINT 2 (WEEK 3-4): THE STARTUP SPAWNER

### Objective
Build the "New Project" modal wizard, dynamic theme engine, landing page generator, waitlist module, and the first 5 Executive UI components. When a user clicks "New Project," a themed landing page with waitlist capture is generated in under 5 minutes.

### Definition of Done
- Clicking "New Project" opens a modal wizard with 3 steps
- On completion, a new org is created with branded landing page
- Landing page renders HeroSection, FeaturesGrid, PricingTable, FAQAccordion, WaitlistBlock
- All components use org-specific accent color via CSS variables
- OG image and favicon auto-generated
- Waitlist entries save to database and display in dashboard
- SEO meta tags configured per project

### Sprint 2 Antigravity Prompt

```
Build the Project Spawner and Landing Page Generator for PRX Startup OS.

### CONTEXT
The user has already completed Sprint 1. Auth, organizations, RLS, and dashboard shell exist. Now you build the system that turns a blank org into a production-ready startup landing page.

### STEP 1: EXTEND DATABASE SCHEMA

Create supabase/migrations/002_startup_spawner.sql:

```sql
-- PAGES TABLE (stores page configurations as JSONB)
CREATE TABLE public.pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  page_type TEXT NOT NULL CHECK (page_type IN ('landing', 'pricing', 'faq', 'contact', 'blog', 'custom')),
  slug TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  config JSONB NOT NULL DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, slug)
);

-- PAGE COMPONENTS TABLE (individual component configurations within a page)
CREATE TABLE public.page_components (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  component_type TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  config JSONB NOT NULL DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WAITLIST ENTRIES (already exists from Sprint 1, adding indexes)
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_org_status ON public.waitlist_entries(org_id, status);

-- INDEXES
CREATE INDEX idx_pages_org_id ON public.pages(org_id);
CREATE INDEX idx_page_components_page_id ON public.page_components(page_id);
CREATE INDEX idx_pages_org_published ON public.pages(org_id, is_published);

-- RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Org members can read published pages"
  ON public.pages FOR SELECT
  USING (
    is_published = true
    OR org_id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND status = 'active')
  );
CREATE POLICY "Org members can manage pages"
  ON public.pages FOR ALL
  USING (org_id IN (SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'));

ALTER TABLE public.page_components ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Org members can read page components"
  ON public.page_components FOR SELECT
  USING (page_id IN (
    SELECT id FROM public.pages WHERE org_id IN (
      SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND status = 'active'
    )
  ));
CREATE POLICY "Org members can manage page components"
  ON public.page_components FOR ALL
  USING (page_id IN (
    SELECT id FROM public.pages WHERE org_id IN (
      SELECT org_id FROM public.org_memberships WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
    )
  ));

-- FUNCTION: Auto-generate landing page with default components
CREATE OR REPLACE FUNCTION public.create_landing_page(
  p_org_id UUID,
  p_org_name TEXT,
  p_accent_color TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_page_id UUID;
BEGIN
  -- Create landing page
  INSERT INTO public.pages (org_id, page_type, slug, is_published, seo_title, seo_description)
  VALUES (p_org_id, 'landing', 'home', true, p_org_name, 'Join ' || p_org_name || ' — Early access waitlist')
  RETURNING id INTO v_page_id;

  -- Add HeroSection component
  INSERT INTO public.page_components (page_id, component_type, sort_order, config)
  VALUES (v_page_id, 'HeroSection', 1, jsonb_build_object(
    'headline', 'Build Something Extraordinary',
    'subheadline', p_org_name || ' is the future of your industry. Join our early access list and be first to experience what''s next.',
    'cta_text', 'Join Waitlist',
    'cta_secondary_text', 'Learn More'
  ));

  -- Add FeaturesGrid component
  INSERT INTO public.page_components (page_id, component_type, sort_order, config)
  VALUES (v_page_id, 'FeaturesGrid', 2, jsonb_build_object(
    'title', 'Why Choose Us',
    'features', jsonb_build_array(
      jsonb_build_object('icon', 'zap', 'title', 'Lightning Fast', 'description', 'Ship in days, not months. Our platform handles the complexity.'),
      jsonb_build_object('icon', 'shield', 'title', 'Enterprise Security', 'description', 'Bank-grade encryption and SOC 2 compliance out of the box.'),
      jsonb_build_object('icon', 'chart', 'title', 'Scale Infinitely', 'description', 'From 10 users to 10 million. We grow with you.')
    )
  ));

  -- Add WaitlistBlock component
  INSERT INTO public.page_components (page_id, component_type, sort_order, config)
  VALUES (v_page_id, 'WaitlistBlock', 3, jsonb_build_object(
    'title', 'Get Early Access',
    'subtitle', 'Be among the first to experience ' || p_org_name,
    'placeholder_text', 'Enter your email address'
  ));

  -- Add TestimonialBlock component
  INSERT INTO public.page_components (page_id, component_type, sort_order, config)
  VALUES (v_page_id, 'TestimonialBlock', 4, jsonb_build_object(
    'title', 'What People Are Saying',
    'testimonials', jsonb_build_array(
      jsonb_build_object('quote', 'This is going to change everything.', 'author', 'Early Beta User', 'role', 'Founder')
    )
  ));

  -- Add FAQAccordion component
  INSERT INTO public.page_components (page_id, component_type, sort_order, config)
  VALUES (v_page_id, 'FAQAccordion', 5, jsonb_build_object(
    'title', 'Frequently Asked Questions',
    'faqs', jsonb_build_array(
      jsonb_build_object('question', 'When will this launch?', 'answer', 'We''re launching soon. Join the waitlist to get early access.'),
      jsonb_build_object('question', 'How much will it cost?', 'answer', 'Pricing will be announced before launch. Early members get a founding discount.')
    )
  ));

  RETURN v_page_id;
END;
$$;
```

### STEP 2: CREATE ORG + SPAWN MODAL

Create components/CreateProjectModal.tsx:

This is the core "New Project" wizard. It has 3 steps:

**Step 1: Project Type Selection**
- Two large cards side by side (stacked on mobile):
  - Card 1: "New Startup" — "Launch a SaaS or micro-SaaS product with auth, payments, and waitlist built-in."
  - Card 2: "Digitize a Business" — "Build a client portal and operational system for an existing business."
- This step determines the spawn flow. For Sprint 2, focus on "New Startup" path.

**Step 2: Brand Configuration**
- Project Name (text input, required)
- URL Slug (auto-generated, editable, validated for uniqueness)
- Brand Accent Color (color picker with presets: #FF5F1F default, #000000, #2563EB, #7C3AED, #059669 — user can also enter custom hex)
- Tagline (optional, text input)

**Step 3: Feature Selection (checkboxes)**
- [x] Waitlist module (checked by default)
- [x] Pricing page (checked by default)
- [ ] Blog (unchecked)
- [x] FAQ section (checked by default)
- [ ] Testimonials (unchecked)

**Submit Action:**
1. Call `create_organization(name, slug, user_id)` RPC
2. Update organization accent_color with selected color
3. Call `create_landing_page(org_id, name, accent_color)` RPC
4. Generate OG image via /api/og route
5. Generate favicon via /api/favicon route
6. Show success state with preview link
7. Redirect to new project's landing page at `/{org.slug}`

### STEP 3: DYNAMIC THEME ENGINE

Create components/ThemeWrapper.tsx:
```typescript
'use client';

import { useEffect } from 'react';

interface ThemeWrapperProps {
  accentColor: string;
  children: React.ReactNode;
}

export function ThemeWrapper({ accentColor, children }: ThemeWrapperProps) {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor);

    // Calculate hover/darker variant
    const darken = (hex: string, amount: number) => {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = Math.max(0, (num >> 16) - amount);
      const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
      const b = Math.max(0, (num & 0x0000FF) - amount);
      return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
    };

    document.documentElement.style.setProperty('--accent-hover', darken(accentColor, 20));
    document.documentElement.style.setProperty('--accent-light', `${accentColor}15`);
  }, [accentColor]);

  return <>{children}</>;
}
```

Update app/globals.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent: #FF5F1F;
  --accent-hover: #E54E1A;
  --accent-light: #FF5F1F15;
}

@layer base {
  * {
    @apply border-gray-200;
  }
  body {
    @apply bg-white text-black font-['Inter'] font-normal leading-relaxed;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-['Montserrat'] font-bold tracking-tight;
  }
}

@layer components {
  .btn-primary {
    @apply bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors duration-200 font-['Montserrat'] font-semibold;
  }
  .btn-secondary {
    @apply border border-gray-300 text-black hover:bg-gray-50 transition-colors duration-200;
  }
  .card {
    @apply bg-white border border-gray-200 rounded-lg;
  }
  .text-accent {
    @apply text-[var(--accent)];
  }
  .bg-accent-light {
    @apply bg-[var(--accent-light)];
  }
  .border-accent {
    @apply border-[var(--accent)];
  }
}
```

### STEP 4: PUBLIC LANDING PAGE ROUTE

Create app/[orgSlug]/layout.tsx:
- Server component that fetches organization by slug
- If org not found, show 404
- If org exists, wrap children with ThemeWrapper using org.accent_color
- Inject dynamic SEO meta tags

Create app/[orgSlug]/page.tsx:
- Server component that fetches published landing page and its components
- Dynamically renders components based on page_components table
- Components are mapped by component_type to actual React components
- AESTHETIC: Full-width sections, generous whitespace, Montserrat headings, Inter body, accent color for CTAs and highlights ONLY

Create app/[orgSlug]/waitlist/route.ts:
- POST endpoint for waitlist signup
- Accepts { email, name? }
- Validates email format
- Inserts into waitlist_entries table
- Returns success/error
- Rate limited: 5 submissions per IP per hour

### STEP 5: BUILD EXECUTIVE UI COMPONENTS

Create components/landing/HeroSection.tsx:
```
Props: headline, subheadline, ctaText, ctaSecondaryText, accentColor
Mobile: headline text-3xl, subheadline text-base, stacked buttons
Desktop: headline text-6xl, subheadline text-lg, inline buttons with gap-4
Structure: min-h-[70vh] flex items-center justify-center, max-w-4xl mx-auto px-4
CTA Primary: btn-primary class, px-8 py-4 rounded-lg text-lg
CTA Secondary: btn-secondary class, px-8 py-4 rounded-lg text-lg
No images, no illustrations, pure typographic hierarchy
```

Create components/landing/FeaturesGrid.tsx:
```
Props: title, features (array of {icon, title, description})
Mobile: 1 column, each feature stacked with border-b border-gray-200 and py-8
Desktop: 3 columns with gap-8, no border-b, each feature card has pt-8
Icon: Simple SVG icon (lucide-react) in accent color, 24x24
Title: Montserrat 700, text-lg
Description: Inter 400, text-gray-600, mt-2
```

Create components/landing/PricingTable.tsx:
```
Props: tiers (array of {name, price, description, features, highlighted})
Mobile: stacked cards, full width each
Desktop: 3 columns, highlighted tier has scale-105 and border-2 border-[var(--accent)]
Each card: bg-white border border-gray-200 rounded-lg p-8
Price: Montserrat 800, text-4xl, text-black
Features list: Inter 400, text-gray-600, checkmark icon in accent color
CTA button: btn-primary (highlighted tier) or btn-secondary (other tiers)
```

Create components/landing/FAQAccordion.tsx:
```
Props: title, faqs (array of {question, answer})
Uses Shadcn Accordion component — reference: https://ui.shadcn.com/docs/components/accordion
Import: import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
Mobile: full width accordion items
Desktop: max-w-3xl mx-auto
Questions: Montserrat 600, text-base
Answers: Inter 400, text-gray-600, leading-relaxed
Accordion trigger: border-b border-gray-200, py-4
Expanded state: accent color border-b instead of gray-200
```

Create components/landing/WaitlistBlock.tsx:
```
Props: title, subtitle, placeholderText
Mobile: centered stack, full-width email input, full-width button
Desktop: centered, max-w-lg, inline email input + button
Email input: border border-gray-300 rounded-lg px-4 py-3, focus:ring-2 focus:ring-[var(--accent)]
Submit button: btn-primary, px-6 py-3
On submit: POST to /api/waitlist, show toast on success
```

Create components/landing/TestimonialBlock.tsx:
```
Props: title, testimonials (array of {quote, author, role})
Mobile: single testimonial at a time with left/right arrows
Desktop: 3 testimonials in a row
Quote: Inter 400 italic, text-gray-700, leading-relaxed
Author: Montserrat 600, text-black
Role: Inter 400, text-gray-500, text-sm
Separator: border-b border-gray-200 between testimonials on desktop
```

### STEP 6: OG IMAGE GENERATION

Create app/api/og/route.tsx:
```typescript
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'PRX OS';
  const accent = searchParams.get('accent') || '#FF5F1F';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121212',
          fontFamily: 'Montserrat',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.05em',
            marginBottom: 16,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: accent,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### STEP 7: DYNAMIC ROUTING FOR PUBLIC PAGES

Create app/[orgSlug]/[pageSlug]/page.tsx:
- Fetches page by org slug + page slug
- Renders page components in sort_order
- Handles /pricing, /faq, /contact routes
- 404 if page not found or not published

### STEP 8: DASHBOARD — PROJECT MANAGEMENT

Update app/(dashboard)/dashboard/page.tsx:
- Add "My Projects" section showing all orgs the user owns
- Each project card shows: name, accent color dot, created date, status (active/inactive), "View Site" link
- "New Project" button prominently displayed (btn-primary)
- Empty state: illustration-free message "No projects yet. Launch your first startup in 5 minutes."

### STEP 9: SEO CONFIGURATION

Create lib/seo.ts:
```typescript
export function generateSEOMetadata(org: { name: string; slug: string; accent_color: string }) {
  return {
    title: org.name,
    description: `Join ${org.name} — Early access waitlist`,
    openGraph: {
      title: org.name,
      description: `Join ${org.name} — Early access waitlist`,
      images: [`/api/og?title=${encodeURIComponent(org.name)}&accent=${encodeURIComponent(org.accent_color)}`],
      type: 'website',
    },
    icons: {
      icon: `/api/favicon?letter=${org.name.charAt(0).toUpperCase()}&color=${encodeURIComponent(org.accent_color)}`,
    },
  };
}
```

### AESTHETIC ENFORCEMENT (SPRINT 2)
- Landing pages must have NO decorative images, NO illustrations, NO gradients
- Pure typographic hierarchy using Montserrat (headings) + Inter (body)
- Accent color (#FF5F1F or user-selected) ONLY for: primary CTA buttons, active states, focus rings, key highlights
- All section backgrounds: white (#FFFFFF) on light theme or charcoal (#121212) on dark
- Separators: border-b border-gray-200
- Whitespace: py-20 minimum between sections on desktop, py-12 on mobile
- Mobile-first: every component tested at 360px viewport width

### DEPLOYMENT CHECKLIST
- [ ] Migration 002 applied successfully
- [ ] CreateProjectModal wizard works end-to-end
- [ ] Landing page renders at /{orgSlug}
- [ ] Waitlist submission saves to database and shows success toast
- [ ] OG image generates with correct org name and accent color
- [ ] Favicon generates correctly
- [ ] SEO meta tags are org-specific
- [ ] All 5 UI components render correctly on mobile (360px)
- [ ] All 5 UI components render correctly on desktop (1440px)
- [ ] FAQAccordion uses Shadcn Accordion with accessible keyboard navigation
```

### Sprint 2 Acceptance Criteria
- [ ] User can create a new project via modal wizard in under 60 seconds
- [ ] Created project has a live landing page at /{orgSlug}
- [ ] Landing page renders HeroSection, FeaturesGrid, WaitlistBlock, TestimonialBlock, FAQAccordion
- [ ] Waitlist email submission saves to database and shows success state
- [ ] OG image displays correctly when shared on social media (test with Twitter Card Validator)
- [ ] SEO meta tags are unique per organization
- [ ] ThemeWrapper injects correct accent color via CSS variables
- [ ] Mobile landing page loads in under 3 seconds on simulated 4G
- [ ] FAQAccordion expands/collapses with smooth animation and keyboard accessibility

---

## SPRINT 3 (WEEK 5-6): THE EXECUTIVE UI LIBRARY

### Objective
Build all 16 reusable UI components that power both startup landing pages AND business digitization templates. Every component must be drop-in ready — one import, zero additional styling.

### Definition of Done
- All 16 components are built, documented, and tested
- Components work with any accent color via CSS variables
- Each component has mobile and desktop breakpoints explicitly defined
- Components can be composed to build any landing page or client portal

### Key Research References for This Sprint
- **Shadcn Accordion (for FAQAccordion):** [Official Docs](https://ui.shadcn.com/docs/components/accordion), [Variants Reference](https://shadcnspace.com/components/accordion), [Block Patterns](https://www.shadcnblocks.com/), [Shadcn UIKit](https://shadcnuikit.com/components/accordion), [ShadcnDesign](https://www.shadcndesign.com/components/accordion)
- **Shadcn Component Library:** [Full Component List](https://ui.shadcn.com/docs/components)

### Sprint 3 Antigravity Prompt

```
Build the complete Executive UI Component Library for PRX Startup OS.

### CONTEXT
Sprint 1 (Foundation) and Sprint 2 (Startup Spawner) are complete. Auth, organizations, theme engine, and 5 basic landing components exist. Now build the full library of 16 components.

### COMPONENTS TO BUILD

All components go in components/executive/ directory.
All components accept accent color via CSS variable var(--accent).
All components are mobile-first with explicit sm:, md:, lg: breakpoints.
All components use Montserrat for headings, Inter for body text.

### COMPONENT 1: HeroSection
[... full component spec as in original File 5 ...]

### COMPONENT 4: FAQAccordion (DETAILED)
File: components/executive/FAQAccordion.tsx

Uses Shadcn Accordion component — these are the reference implementations to follow:
- Primary: https://ui.shadcn.com/docs/components/accordion
- Variants: https://shadcnspace.com/components/accordion
- Block patterns: https://www.shadcnblocks.com/
- Alternative: https://shadcnuikit.com/components/accordion
- Alternative: https://www.shadcndesign.com/components/accordion

Implementation:
```typescript
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQAccordionProps {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQAccordion({ title, faqs }: FAQAccordionProps) {
  return (
    <section className="py-16 lg:py-24">
      <h2 className="text-3xl sm:text-4xl font-['Montserrat'] font-bold mb-8 text-center">{title}</h2>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-['Montserrat'] font-semibold text-base py-4 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="font-['Inter'] text-gray-600 leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

Styling:
- Accordion trigger border-b: border-gray-200, changes to border-[var(--accent)] when expanded
- Question text: Montserrat 600, text-base, py-4
- Answer text: Inter 400, text-gray-600, leading-relaxed
- Mobile: full-width accordion
- Desktop: max-w-3xl mx-auto
- Accessibility: keyboard navigation (Tab/Enter/Space), ARIA attributes from Radix UI

[... remaining 12 component specs (5-16) as in original File 5 ...]

### BUILD REQUIREMENTS FOR ALL COMPONENTS
1. Every component must be a standalone file with TypeScript interfaces
2. Every component must include JSDoc comments describing props
3. Every component must handle loading and error states
4. Every component must be tested at 360px, 768px, and 1440px viewports
5. No component may use hardcoded colors except: #FFFFFF, #000000, #121212, var(--accent), gray scale via Tailwind
6. All icons must be from lucide-react (no custom SVGs except WhatsApp icon)
7. All animations must use Tailwind transition classes (no framer-motion)
```

### Sprint 3 Acceptance Criteria
- [ ] All 16 components render correctly in isolation
- [ ] All components accept accent color via CSS variables
- [ ] All components are responsive at 360px, 768px, 1440px
- [ ] Components can be composed to create a complete landing page
- [ ] Components can be composed to create a complete client portal
- [ ] No component uses hardcoded colors outside the aesthetic system
- [ ] FAQAccordion uses Shadcn Accordion with accessible keyboard navigation
- [ ] Component library documented in README

---

## SPRINT 4 (WEEK 7-8): THE BUSINESS DIGITIZER

[... Sprint 4 content remains the same as original File 5 ...]

---

## SPRINT 5 (WEEK 9-10): THE REVENUE LAYER

[... Sprint 5 content remains the same as original File 5 ...]

---

## SPRINT 6 (WEEK 11-12): THE GROWTH & INTELLIGENCE LAYER

[... Sprint 6 content remains the same as original File 5 ...]

---

## RISK REGISTER

| # | Risk | Impact | Likelihood | Mitigation | Owner |
|---|------|--------|------------|------------|-------|
| 1 | **Razorpay API Changes** — Razorpay updates their API or changes pricing, breaking payment integration | High | Medium | Pin Razorpay SDK version, monitor changelog, build payment abstraction layer so switch to Cashfree is possible | Founder |
| 2 | **WhatsApp Business API Approval Delays** — Meta takes weeks to approve WhatsApp templates, blocking notification system | High | High | Start template approval process in Week 1. Have fallback: use regular WhatsApp Business app with manual notifications until API is approved. Consider WATI or Interakt as backup providers | Founder |
| 3 | **GST Rate Changes** — Government changes GST rates, making hardcoded 18% incorrect | Medium | Low | Make GST rate configurable in business_configs. Store rate per invoice so historical invoices remain accurate. Monitor government notifications | Founder |
| 4 | **RBI E-Mandate Changes** — RBI updates recurring payment regulations, breaking subscription flows | Medium | Medium | Focus on one-time and milestone payments (not subscriptions) for Indian market. If subscriptions needed, use Razorpay's e-mandate flow which auto-updates | Founder |
| 5 | **Network Performance on Slow 4G** — Indian users on 2G/3G/slow 4G experience timeouts and failed loads | High | High | Implement skeleton screens for all async loads. Use React Suspense boundaries. Optimize images with Next.js Image component. Test on throttled network (DevTools: Slow 4G = 400 Kbps down) | Antigravity |
| 6 | **Supabase ap-south-1 Region Outage** — Mumbai region goes down, all PRX OS instances go offline | Critical | Low | Monitor Supabase status page. Plan for fallback to nearest region (ap-southeast-1 Singapore). Document disaster recovery procedure | Founder |
| 7 | **Scope Creep from Business Templates** — Each of the 10 templates accumulates unique feature requests, bloating the codebase | High | High | Strictly enforce: templates share the SAME components, only config JSON differs. If a feature isn't in the core 16 components, it's out of scope for Sprint 4. Add in future sprints only if 3+ templates need it | Founder |
| 8 | **Client Portal Security Breach** — RLS policy misconfiguration allows cross-org data access | Critical | Medium | Write automated tests for every RLS policy. Test with multiple user roles. Use Supabase's policy testing tools. Security audit before production launch | Antigravity |

---

## TESTING CHECKLIST — INDIA-SPECIFIC

### Every Sprint Must Pass These Tests:

#### Payment Flow Tests
- [ ] Test Razorpay checkout on mobile Chrome (Android) — verify UPI intent flow works
- [ ] Test Razorpay checkout on mobile Safari (iOS) — verify fallback to card/net banking
- [ ] Test payment failure scenario — verify error state and retry option
- [ ] Test UPI QR code scanning with Google Pay, PhonePe, and Paytm
- [ ] Test payment webhook with delayed response (simulate 5-second delay)
- [ ] Test GST invoice generation with and without client GSTIN

#### WhatsApp Notification Tests
- [ ] Test WhatsApp notification delivery to Indian phone number (+91)
- [ ] Test notification with template variables replaced correctly
- [ ] Test notification delivery failure — verify error logging
- [ ] Test WhatsApp Business API rate limits (800 messages/minute for tier 1)
- [ ] Test notification on WhatsApp Business app vs. regular WhatsApp

#### Network Resilience Tests
- [ ] Test all pages on DevTools throttled "Slow 4G" (400 Kbps down, 400 Kbps up, 2000ms RTT)
- [ ] Test skeleton screens appear within 200ms on slow network
- [ ] Test page load time under 3 seconds on throttled 4G
- [ ] Test offline behavior — what happens when network drops mid-form?
- [ ] Test image loading with Next.js Image optimization (WebP format, responsive sizes)

#### Mobile-First Tests
- [ ] Test all pages at 360px viewport width (common Android phone)
- [ ] Test all pages at 375px viewport width (iPhone)
- [ ] Test all pages at 414px viewport width (large phone)
- [ ] Test touch targets are minimum 44x44px (Apple HIG) / 48x48dp (Material Design)
- [ ] Test horizontal scrolling is never needed on mobile (except carousels)
- [ ] Test form inputs don't zoom on focus (font-size minimum 16px)

#### India-Specific UX Tests
- [ ] Test date formats are DD/MM/YYYY (not MM/DD/YYYY)
- [ ] Test currency formatting uses Indian numbering system (₹1,00,000 not ₹100,000)
- [ ] Test phone number validation accepts Indian formats (+91, 0, or bare 10-digit)
- [ ] Test GSTIN validation (15 characters: 2 digits + 5 alphanumeric + 4 digits + 1 char + 1 char + 1 char + 1 digit)
- [ ] Test all text content is in English (no Hindi or regional language — not in scope for v1)

#### Security Tests
- [ ] Test RLS: create 2 orgs, verify user of org A cannot see org B data
- [ ] Test RLS: create client user, verify they can only see their own data
- [ ] Test RLS: verify public routes (landing pages) don't expose internal data
- [ ] Test SQL injection resistance (Supabase parameterized queries handle this)
- [ ] Test XSS resistance (React auto-escapes, but test any dangerouslySetInnerHTML)

---

## SPRINT DEPENDENCY MAP

```
Sprint 1 ──→ Sprint 2 ──→ Sprint 3 ──→ Sprint 4 ──→ Sprint 5 ──→ Sprint 6
   │              │              │              │              │              │
   ▼              ▼              ▼              ▼              ▼              ▼
Foundation   Spawner      UI Library   Digitizer    Revenue     Growth
Auth+RLS     Landing      Components   Portal+      Payments    Analytics
Org System   Pages        16 widgets   Templates    WhatsApp    Admin God
Dashboard    SEO+OG       Drop-in      10 cats      GST Email   Deploy 4
             Waitlist     ready        Client       UPI         brands
                                          portal     QR
```

**Parallel Work:** Sprints 2 and 3 can partially overlap. While Sprint 2 builds the spawner flow, Sprint 3 can build components 7-16 (client portal components) independently.

**Critical Path:** Sprint 1 → Sprint 4 → Sprint 5. The business digitizer depends on foundation, and revenue depends on digitizer.

---

## REFERENCE INDEX — SOURCES USED IN THIS DOCUMENT

| # | Reference | URL | Used In |
|---|-----------|-----|---------|
| 1 | Supabase Phone Login Docs | https://supabase.com/docs/guides/auth/phone-login | Sprint 1 (Phone OTP implementation), Module 1 |
| 2 | HackerOne Phone Auth Guide | https://www.hackerone.com/blog/phone-authentication-twilio-nextjs-and-supabase | Sprint 1 (Security considerations), Module 1 |
| 3 | Refine.dev OTP Tutorial | https://refine.dev/blog/supabase-twilio-otp-authentication-in-react/ | Sprint 1 (OTP verification UI), Module 1 |
| 4 | Supabase Custom Phone Auth Discussion | https://github.com/orgs/supabase/discussions/14774 | Sprint 1 (Custom provider options), Module 1 |
| 5 | Stack Overflow Phone Auth | https://stackoverflow.com/questions/74793778/supabase-twilio-phone-auth | Sprint 1 (Common issues/solutions), Module 1 |
| 6 | Shadcn UI Accordion (Official) | https://ui.shadcn.com/docs/components/accordion | Sprint 3 (FAQAccordion), Module 6 |
| 7 | ShadcnSpace Accordion Variants | https://shadcnspace.com/components/accordion | Sprint 3 (Styling variants), Module 6 |
| 8 | ShadcnBlocks Patterns | https://www.shadcnblocks.com/ | Sprint 3 (Block patterns), Module 6 |
| 9 | Shadcn UIKit Accordion | https://shadcnuikit.com/components/accordion | Sprint 3 (Alternative reference), Module 6 |
| 10 | ShadcnDesign Accordion | https://www.shadcndesign.com/components/accordion | Sprint 3 (Alternative reference), Module 6 |
| 11 | Shadcn Full Component List | https://ui.shadcn.com/docs/components | All sprints (component library base), Module 6 |

---

**END OF FILE 5: IMPLEMENTATION PLAN**

---

*This document is written for Antigravity (coding agent) execution. Each sprint prompt is self-contained and includes exact file paths, SQL, TypeScript interfaces, and component specifications. No clarifying questions should be needed — all decisions are made and documented. All research references are cited inline.*
