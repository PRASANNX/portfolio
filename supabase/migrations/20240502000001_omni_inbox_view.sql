-- Create underlying tables if they don't exist
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_messages ENABLE ROW LEVEL SECURITY;

-- Simple RLS policies based on organization_members
CREATE POLICY "Users can view org inquiries" ON public.inquiries
  FOR SELECT USING (org_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can view org payments" ON public.payments
  FOR SELECT USING (org_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can view org messages" ON public.client_messages
  FOR SELECT USING (org_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

-- Create the View with security_invoker = true
CREATE OR REPLACE VIEW public.vw_omni_events WITH (security_invoker = true) AS
SELECT 
    id, 
    org_id, 
    'inquiry' AS event_type, 
    name AS contact_name, 
    message AS preview_text, 
    status, 
    created_at 
FROM public.inquiries

UNION ALL

SELECT 
    id, 
    org_id, 
    'payment' AS event_type, 
    client_id::text AS contact_name, 
    'Payment: ₹' || amount::text AS preview_text, 
    status, 
    created_at 
FROM public.payments

UNION ALL

SELECT 
    id, 
    org_id, 
    'message' AS event_type, 
    sender_id::text AS contact_name, 
    content AS preview_text, 
    CASE WHEN is_read THEN 'read' ELSE 'unread' END AS status, 
    created_at 
FROM public.client_messages;
