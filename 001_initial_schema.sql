-- ============================================
-- THE ENGINE: Initial Schema
-- ============================================
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- Extends auth.users with additional profile data
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORGANIZATIONS TABLE
-- Multi-tenant support for different businesses/projects
-- ============================================
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORGANIZATION MEMBERS TABLE
-- Junction table for user-organization relationships
-- ============================================
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- Razorpay subscription management
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
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
-- Performance optimization
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_organization_members_user ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_org ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_org ON subscriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay ON subscriptions(razorpay_subscription_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can only access their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ORGANIZATIONS: Members can view their organizations
CREATE POLICY "Members can view their organizations" ON organizations
  FOR SELECT USING (
    id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Owners/admins can update organizations" ON organizations
  FOR UPDATE USING (
    id IN (
      SELECT organization_id FROM organization_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Authenticated users can create organizations" ON organizations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ORGANIZATION MEMBERS: Users can view their memberships
CREATE POLICY "Users can view own memberships" ON organization_members
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Owners can manage memberships" ON organization_members
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM organization_members 
      WHERE user_id = auth.uid() AND role = 'owner'
    )
  );

-- SUBSCRIPTIONS: Organization members can view
CREATE POLICY "Members can view org subscriptions" ON subscriptions
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid())
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user's current organization
CREATE OR REPLACE FUNCTION public.get_user_organization(p_user_id UUID)
RETURNS TABLE (
  organization_id UUID,
  organization_name TEXT,
  organization_slug TEXT,
  role TEXT,
  plan TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.name,
    o.slug,
    om.role,
    o.plan
  FROM organizations o
  INNER JOIN organization_members om ON o.id = om.organization_id
  WHERE om.user_id = p_user_id
  ORDER BY om.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get organization subscription
CREATE OR REPLACE FUNCTION public.get_organization_subscription(p_org_id UUID)
RETURNS TABLE (
  id UUID,
  plan TEXT,
  status TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.plan,
    s.status,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end
  FROM subscriptions s
  WHERE s.organization_id = p_org_id
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- INITIAL ORGANIZATION CREATION
-- Triggered when user creates their first profile
-- ============================================

-- Helper function to create initial organization
CREATE OR REPLACE FUNCTION public.create_initial_organization(p_user_id UUID, org_name TEXT)
RETURNS UUID AS $$
DECLARE
  v_org_id UUID;
  v_org_slug TEXT;
BEGIN
  -- Generate slug from org name
  v_org_slug := lower(regexp_replace(org_name, '[^a-zA-Z0-9]', '-', 'g'));
  v_org_slug := trim(regexp_replace(v_org_slug, '-+', '-', 'g'), '-');
  v_org_slug := v_org_slug || '-' || substr(p_user_id::text, 1, 4);
  
  -- Create organization
  INSERT INTO organizations (name, slug, plan)
  VALUES (org_name, v_org_slug, 'free')
  RETURNING id INTO v_org_id;
  
  -- Add user as owner
  INSERT INTO organization_members (organization_id, user_id, role)
  VALUES (v_org_id, p_user_id, 'owner');
  
  RETURN v_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;