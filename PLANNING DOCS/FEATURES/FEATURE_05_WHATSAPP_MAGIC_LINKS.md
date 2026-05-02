# FEATURE_05_WHATSAPP_MAGIC_LINKS.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** WhatsApp Magic Links (Passwordless Auth)

## 1. FEATURE OVERVIEW & UX
**Problem:** Indian end-clients (e.g., a patient viewing a prescription) abandon portals if forced to create and remember passwords. Email magic links fail because email open rates in rural/semi-urban India are exceptionally low.
**UX Flow:**
1. Business owner uploads a document to the vault for a client.
2. PRX OS triggers a WhatsApp message via Meta Cloud API: *"Your document is ready. Tap to view securely: prxos.com/wa/verify?token=xyz..."*
3. The client taps the link in WhatsApp.
4. The browser opens. Next.js validates the token, uses Supabase Admin Auth to forge a secure session cookie, and instantly redirects the client to their portal. Zero password typing.

## 2. TECHNICAL ARCHITECTURE
**Database:** Create `007_magic_links.sql`. Add table `magic_links` (`id`, `token` (Hash), `client_id`, `org_id`, `expires_at`, `is_used`).
**API Layer:** `/api/auth/wa-verify/route.ts`.
**Logic Flow:**
1. Event triggers token generation using `crypto.randomBytes`. Store hash in DB (expires in 15 mins).
2. Append raw token to WhatsApp message template URL.
3. Client clicks URL -> `/api/auth/wa-verify?token=raw_token`.
4. Backend hashes `raw_token`, checks DB. If valid and `!is_used`, mark `is_used = true`.
5. Backend invokes Supabase Admin Client `admin.generateLink({ type: 'magiclink', email: client_email })`.
6. Redirect client to the Supabase-generated magic link URL, which establishes the secure HTTP-only session cookie and redirects to the portal.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `supabase/migrations/007_magic_links.sql`
- `src/lib/auth/magic-links.ts` (Token generation logic)
- `src/app/api/auth/wa-verify/route.ts`

**Files to Modify:**
- `src/lib/whatsapp.ts` (Update notification triggers to generate and append tokens).

**Step-by-Step Instructions:**
1. Execute DB migration creating `magic_links` table with RLS (only service_role can manage).
2. Implement `lib/auth/magic-links.ts`. Use Node `crypto` to generate a secure random 32-byte hex string. Store a SHA256 hash of it in the DB to prevent database-level token theft.
3. Implement the GET route `/api/auth/wa-verify`. Validate the token, mark as used, and bridge the session using Supabase's `generateLink` admin function.
4. Ensure the redirect logic routes the user specifically to `/[orgSlug]/portal/documents` (or the relevant resource).

**Verification:**
Generate a test link via the server code. Open an incognito browser window and paste the link. Verify that you are instantly authenticated and redirected to the portal, and that reloading the original link yields an "Expired Link" error.

## 4. SKELETON CODE
```typescript
// src/app/api/auth/wa-verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // MUST use standard Supabase JS for Admin bypass
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const redirectTo = req.nextUrl.searchParams.get('redirect_to') || '/portal';

  if (!token) return NextResponse.redirect(new URL('/unauthorized', req.url));

  // Initialize Admin Client to bypass RLS and generate session
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Hash the incoming token to check against DB
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // 1. Verify token in DB
  const { data: magicLink, error } = await supabaseAdmin
    .from('magic_links')
    .select('*, profiles(email)')
    .eq('token_hash', hashedToken)
    .eq('is_used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !magicLink) {
    return NextResponse.redirect(new URL('/link-expired', req.url));
  }

  // 2. Mark as used to prevent replay attacks
  await supabaseAdmin
    .from('magic_links')
    .update({ is_used: true })
    .eq('id', magicLink.id);

  // 3. Generate Supabase Auth Session Link
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: magicLink.profiles.email,
  });

  if (authError || !authData.properties?.action_link) {
    return NextResponse.redirect(new URL('/auth-error', req.url));
  }

  // 4. Construct final redirect URL
  // authData.properties.action_link establishes the cookie. We append next=redirectTo
  const actionLink = new URL(authData.properties.action_link);
  actionLink.searchParams.append('next', redirectTo);

  return NextResponse.redirect(actionLink);
}
```