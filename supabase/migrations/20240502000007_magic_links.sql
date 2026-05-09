-- ============================================
-- FEATURE 05: WhatsApp Magic Links Schema
-- ============================================

CREATE TABLE IF NOT EXISTS public.magic_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + interval '15 minutes'),
  is_used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_magic_links_token_hash ON public.magic_links(token_hash);
CREATE INDEX IF NOT EXISTS idx_magic_links_client_id ON public.magic_links(client_id);
CREATE INDEX IF NOT EXISTS idx_magic_links_org_id ON public.magic_links(org_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.magic_links ENABLE ROW LEVEL SECURITY;

-- Magic links should ONLY be readable/writable by the service_role (backend API)
-- No public or authenticated user access
-- Supabase automatically grants all permissions to the service_role key, 
-- so enabling RLS without any policies effectively blocks public/authenticated access.
