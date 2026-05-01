# The Engine — SaaS Boilerplate Specification

## Overview
A reusable, production-ready SaaS boilerplate for solo founders to launch in under 48 hours. Clone this for any vertical (Legal, Health, Real Estate, etc.).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) + TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Database/Auth | Supabase (PostgreSQL + Auth) |
| Payments | Razorpay (Subscriptions) |
| Deployment | Vercel (recommended) |

---

## Part 1: Folder Structure

```
the-engine/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx          # Auth layout (no dashboard shell)
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx          # Dashboard shell with sidebar
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── billing/
│   │   │   │   └── page.tsx
│   │   │   └── [slug]/             # Dynamic industry modules
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...supabase]/
│   │   │   │       └── route.ts   # Supabase Auth handlers
│   │   │   ├── razorpay/
│   │   │   │   ├── create-checkout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   └── _lib/
│   │   │       └── razorpay.ts    # Shared Razorpay utilities
│   │   ├── layout.tsx             # Root layout (SEO + providers)
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── ui/                     # Shadcn components (button, card, etc.)
│   │   ├── auth/
│   │   │   ├── auth-provider.tsx  # Supabase provider
│   │   │   └── protected-route.tsx
│   │   ├── dashboard/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── shell.tsx          # Dashboard layout wrapper
│   │   └── shared/
│   │       ├── logo.tsx
│   │       └── seo.tsx            # Dynamic meta tags
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser client
│   │   │   ├── server.ts          # Server client
│   │   │   └── middleware.ts      # Auth middleware
│   │   ├── constants.ts           # App-wide constants
│   │   ├── utils.ts               # Utility functions (cn helper)
│   │   └── types.ts               # TypeScript types
│   ├── hooks/
│   │   ├── use-user.ts
│   │   ├── use-subscription.ts
│   │   └── use-organization.ts
│   └── types/
│       └── database.ts            # Supabase generated types
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── config.toml
├── .env.example
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Part 2: Database Schema (PostgreSQL)

### Entity Relationship

```
users (auth.users)
    ↓ (extends)
profiles ←→ organization_members → organizations
                                        ↓
                                  subscriptions
```

### Tables

```sql
-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORGANIZATIONS (multi-tenancy)
-- ============================================
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORGANIZATION MEMBERS (junction table)
-- ============================================
CREATE TABLE public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- ============================================
-- SUBSCRIPTIONS (Razorpay integration)
-- ============================================
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_customer_id TEXT,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'trialing' CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'paused')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_organization_members_user ON organization_members(user_id);
CREATE INDEX idx_organization_members_org ON organization_members(organization_id);
CREATE INDEX idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_razorpay ON subscriptions(razorpay_subscription_id);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ORGANIZATIONS: Members can view their organizations
CREATE POLICY "Members can view their organizations" ON organizations
  FOR SELECT USING (
    id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid())
  );

-- ORGANIZATION MEMBERS: Users can view their memberships
CREATE POLICY "Users can view own memberships" ON organization_members
  FOR SELECT USING (user_id = auth.uid());

-- SUBSCRIPTIONS: Organization members can view
CREATE POLICY "Members can view org subscriptions" ON subscriptions
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid())
  );
```

---

## Part 3: SEO Configuration

```typescript
// src/lib/seo/config.ts

export const SEO_CONFIG = {
  appName: "The Engine",
  defaultTitle: "The Engine — SaaS Boilerplate",
  titleTemplate: "%s | The Engine",
  description:
    "A production-ready SaaS boilerplate for solo founders. Launch your next idea in under 48 hours.",
  keywords: [
    "saas",
    "boilerplate",
    "nextjs",
    "typescript",
    "supabase",
    "razorpay",
    "starter kit",
  ],
  website: "https://yourapp.com",
  ogImage: "/og-image.png",
  twitterHandle: "@yourtwitter",
} as const;

export type SEOConfig = typeof SEO_CONFIG;
```

---

## Part 4: Module Structure (Industry-Agnostic)

Each cloned project can have industry-specific modules:

```
src/app/(dashboard)/[industry]/
├── clients/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── projects/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── reports/
│   └── page.tsx
└── settings/
    └── page.tsx
```

---

## Phase 1 Deliverables Checklist

- [ ] `src/lib/seo/config.ts` — SEO configuration file
- [ ] `src/lib/supabase/client.ts` — Browser Supabase client
- [ ] `src/lib/supabase/server.ts` — Server Supabase client
- [ ] `src/lib/constants.ts` — App constants (plans, limits)
- [ ] `src/components/dashboard/shell.tsx` — Dashboard layout
- [ ] `src/components/dashboard/sidebar.tsx` — Navigation sidebar
- [ ] `src/app/api/razorpay/create-checkout/route.ts` — Create checkout session
- [ ] `src/app/api/razorpay/webhook/route.ts` — Webhook handler
- [ ] `supabase/migrations/001_initial_schema.sql` — Database schema
- [ ] `src/middleware.ts` — Auth protection middleware

---

## Getting Started

1. Copy this folder structure
2. Run `supabase/migrations/001_initial_schema.sql` in your Supabase project
3. Copy `.env.example` to `.env.local` and fill in credentials
4. Run `npx shadcn-ui@latest init` to set up Shadcn
5. Start building your industry-specific features

---

*Last updated: 2024 | Version: 1.0*