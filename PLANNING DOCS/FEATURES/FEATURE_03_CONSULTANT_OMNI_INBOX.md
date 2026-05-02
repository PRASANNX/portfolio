# FEATURE_03_CONSULTANT_OMNI_INBOX.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** Consultant Omni-Inbox (Admin God Mode Enhancement)

## 1. FEATURE OVERVIEW & UX
**Problem:** A consultant digitizing 10 local businesses (clinics, real estate) has to log into 10 different dashboards to check if a client's customer sent an inquiry, failed a payment, or replied on WhatsApp. This destroys agency scalability.
**UX Flow:**
1. Consultant clicks "Omni-Inbox" in their master PRX OS dashboard.
2. A data-dense, split-pane view loads. 
3. Left Pane: A unified, chronological feed of events (Inquiries, Failed Payments, Unread Messages) across ALL organizations where the consultant is an `owner` or `admin`.
4. Right Pane: Action detail. The consultant can reply to an inquiry or send a WhatsApp payment reminder directly from this screen, acting seamlessly on behalf of the sub-tenant.

## 2. TECHNICAL ARCHITECTURE
**Database:** Create a PostgreSQL View `vw_omni_events` utilizing `UNION ALL` to aggregate `inquiries`, `payments`, and `client_messages`. 
*Critical Security Note:* Supabase Views bypass RLS by default. We MUST create the view using `WITH (security_invoker = true)` (supported in Postgres 15+) so it inherits the RLS of the underlying tables.
**API Layer:** Direct Supabase Server Client queries in a Next.js Server Component. Action dispatches use existing API routes (`/api/whatsapp/send`).
**Logic Flow:** Query `vw_omni_events` -> filter by orgs owned by user -> map to Executive Minimalist Table -> dispatch Server Actions for replies.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `supabase/migrations/006_omni_inbox_view.sql`
- `src/app/(dashboard)/admin/inbox/page.tsx`
- `src/app/(dashboard)/admin/inbox/actions.ts` (Server Actions for replies)

**Files to Modify:**
- `src/components/dashboard/Sidebar.tsx` (Add Omni-Inbox link)

**Step-by-Step Instructions:**
1. Create the `006` migration. Define `vw_omni_events` with `security_invoker = true`.
2. Build `/admin/inbox/page.tsx` as a Server Component. Fetch data from the view.
3. Build the UI using a 2-column CSS Grid. Left column: Scrollable list of cards. Right column: Detail view using sticky positioning.
4. Apply the Executive Minimalist design constraint: Use `border-gray-200` to separate items, `badge-warning` for failed payments, and `text-[var(--accent)]` for active selections. No rounded shadows or floating cards—use sharp, clean borders.

**Verification:**
Create 2 test organizations. Create an inquiry in Org A and a failed payment in Org B. Log into the Admin dashboard. Ensure BOTH appear in the Omni-Inbox, sorted by `created_at` descending.

## 4. SKELETON CODE
```sql
-- supabase/migrations/006_omni_inbox_view.sql

-- MUST use security_invoker = true to respect underlying RLS policies
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
```

```typescript
// src/app/(dashboard)/admin/inbox/page.tsx
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';

export default async function OmniInbox() {
  const supabase = createClient();
  
  // Automatically respects RLS via security_invoker
  const { data: events, error } = await supabase
    .from('vw_omni_events')
    .select('*, organizations(name)')
    .order('created_at', { ascending: false });

  if (error) return <div>Error loading Omni-Inbox</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-4rem)] border-t border-gray-200">
      {/* LEFT PANE: Feed */}
      <div className="md:col-span-4 border-r border-gray-200 overflow-y-auto bg-white">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-['Montserrat'] font-bold text-lg">Omni-Inbox</h2>
        </div>
        {events?.map((evt) => (
          <div key={evt.id} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-['Inter'] font-semibold text-gray-500 uppercase tracking-wider">
                {evt.organizations.name}
              </span>
              {evt.status === 'failed' && <span className="badge-error">Failed</span>}
            </div>
            <p className="font-['Inter'] font-medium text-black truncate">{evt.contact_name}</p>
            <p className="font-['Inter'] text-sm text-gray-600 truncate">{evt.preview_text}</p>
          </div>
        ))}
      </div>
      
      {/* RIGHT PANE: Action Detail (Placeholder) */}
      <div className="hidden md:block md:col-span-8 bg-white p-8">
        <p className="text-gray-400 font-['Inter'] text-center mt-20">Select an event to view details and take action.</p>
      </div>
    </div>
  );
}
```