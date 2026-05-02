# PRX_FEATURE_ROADMAP.md
**Version:** 2.0 | **Classification:** Advanced Architecture Handoff
**Author:** Lead Product Architect & Brand Strategist
**Audience:** Antigravity (Coding Agent), Engineering Team
**Objective:** Implement 9 Jarvis-level infrastructure features to bridge the "India Gap", automate brand psychology, and establish PRX OS as an elite, agency-scale multi-tenant engine. Maintain the strict "Executive Minimalist" (B&W + Neon Orange `#FF5F1F`, Montserrat/Inter) design system.

---

## Feature 1: The "Magic Deploy" CLI (`npx prx-os init`)
**Primary Goal:** Reduce setup time from 30 minutes to 3 minutes by eliminating manual database migrations and environment variable configuration.

### 1. User Experience (UX) Flow
1. Developer opens the terminal in an empty directory and runs `npx prx-os init`.
2. A sleek, minimal CLI prompts for `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, and `VERCEL_TOKEN`.
3. The CLI automatically links the Supabase project, pushes the `001` through `005` SQL migrations, sets up the `auth` configurations (Google/Phone), and populates `.env.local`.
4. It connects to Vercel, creates the project, and injects the same environment variables.
5. Returns a live URL and local `npm run dev` readiness message.

### 2. Technical Architecture
*   **Libraries:** `commander` (CLI scaffolding), `@clack/prompts` (for elegant, minimalist terminal UI), `execa` (for executing Supabase/Vercel CLI commands).
*   **API Usage:** Supabase Management API (to configure auth providers programmatically), Vercel REST API (to provision the project and env vars).
*   **Security:** Tokens are held in memory during execution and written strictly to `.env.local` (which is `.gitignore`d).

### 3. Implementation Code (Skeleton)
```typescript
// packages/cli/src/index.ts
import { Command } from 'commander';
import { intro, text, spinner, outro } from '@clack/prompts';
import { execa } from 'execa';
import fs from 'fs/promises';

const program = new Command();

program
  .name('prx-os')
  .description('Magic Deploy CLI for PRX Startup OS')
  .action(async () => {
    intro('🚀 Initializing PRX Startup OS - Executive Engine');

    const supabaseToken = await text({
      message: 'Enter your Supabase Personal Access Token:',
      placeholder: 'sbp_...',
    });

    const dbRef = await text({
      message: 'Enter your Supabase Project Reference ID:',
    });

    const s = spinner();
    s.start('Linking Supabase and running migrations...');
    
    // Execute Supabase CLI commands securely
    await execa('npx', ['supabase', 'link', '--project-ref', dbRef as string], {
      env: { SUPABASE_ACCESS_TOKEN: supabaseToken as string }
    });
    await execa('npx', ['supabase', 'db', 'push'], {
      env: { SUPABASE_ACCESS_TOKEN: supabaseToken as string }
    });

    s.stop('Database migrations applied successfully.');

    // Generate .env.local
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://${dbRef}.supabase.co\n...`;
    await fs.writeFile('.env.local', envContent);

    outro('✅ PRX OS is ready. Run `npm run dev` to begin.');
  });

program.parse();
```

### 4. Antigravity Instructions
*   **Task:** Create a `packages/cli` workspace. Implement the CLI using `@clack/prompts` to ensure the terminal output looks as clean and minimalist as our UI. 
*   **Constraint:** Ensure the CLI explicitly maps to the migration files detailed in `4_SYSTEM_ARCHITECTURE.md`. Do not skip the `seed.sql` injection.

---

## Feature 2: Indian DPDP Compliance Engine
**Primary Goal:** Remove Razorpay KYC bottlenecks by auto-generating localized, DPDP-compliant legal documents (Privacy, ToS, Refund).

### 1. User Experience (UX) Flow
1. During the "Business Digitizer" flow, the consultant inputs the client's GSTIN and Business Category.
2. The system hits a public GSTIN validation API to pull the exact registered business name and address.
3. A "Legal Docs" module generates exact, compliant Terms of Service, Privacy Policy, and Refund Policy pages.
4. The consultant clicks "Export for Razorpay", generating a clean, branded PDF for instant KYC upload.

### 2. Technical Architecture
*   **Libraries:** `jspdf` and `jspdf-autotable` for client-side PDF generation.
*   **Database Schema Impact:** Add `legal_configs` JSONB column to `business_configs` table to store grievance officer details and refund windows (e.g., 5-7 working days).
*   **Dynamic Routes:** Map `/legal/terms`, `/legal/privacy`, `/legal/refund` dynamically based on the `orgSlug`.

### 3. Implementation Code (Skeleton)
```typescript
// lib/compliance/pdf-generator.ts
import { jsPDF } from 'jspdf';

export async function generateRazorpayKYCDocs(businessConfig: any) {
  const doc = new jsPDF();
  
  // Executive Minimalist Styling inside PDF
  doc.setFont("helvetica", "bold"); // Fallback for Montserrat
  doc.setFontSize(22);
  doc.text(`${businessConfig.business_name} - Legal Compliance`, 20, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`GSTIN: ${businessConfig.gstin}`, 20, 30);
  
  // DPDP Clause Injection
  const privacyText = `Under the Digital Personal Data Protection Act, 2023, ${businessConfig.business_name} appoints ${businessConfig.grievance_officer} as the primary Data Fiduciary...`;
  
  const splitText = doc.splitTextToSize(privacyText, 170);
  doc.text(splitText, 20, 50);

  doc.save(`${businessConfig.slug}-razorpay-kyc.pdf`);
}
```

### 4. Antigravity Instructions
*   **Task:** Implement the `jsPDF` generator and the dynamic Next.js React pages for the legal routes. 
*   **Constraint:** The PDF and Web pages must strictly utilize B&W aesthetics. Headers must be bold and authoritative. Auto-fill the Refund Policy to strictly state "5-7 working days" as required by standard Razorpay merchant guidelines.

---

## Feature 3: Consultant Omni-Inbox
**Primary Goal:** Transform PRX OS into an agency-scale OS by aggregating all client events into a single, multi-tenant global feed.

### 1. User Experience (UX) Flow
1. Agency owner logs into `/admin/inbox`.
2. A high-density, split-pane data table loads. Left pane: Unified feed of all events (Lead Inquiry, Payment Failed, WhatsApp Reply) across *all* 10 digitized client portals.
3. Right pane: Action view. The consultant can reply to a WhatsApp message or resend a payment link *on behalf of* the specific client, without switching org contexts manually.

### 2. Technical Architecture
*   **Components:** Next.js Server Components for initial load, Supabase Realtime for live UI updates.
*   **Database Schema Impact:** Create a PostgreSQL Database View (`vw_omni_events`) that uses `UNION ALL` to merge `inquiries`, `payments`, and `client_messages`, strictly scoped via RLS to orgs where the user is an `owner`.
*   **API Logic:** Edge Functions to handle the context-switching seamlessly when dispatching a reply.

### 3. Implementation Code (Skeleton)
```sql
-- Supabase SQL: View for Omni-Inbox
CREATE OR REPLACE VIEW vw_omni_events AS
SELECT id, org_id, 'inquiry' as event_type, created_at, status FROM inquiries
UNION ALL
SELECT id, org_id, 'payment' as event_type, created_at, status FROM payments
UNION ALL
SELECT id, org_id, 'message' as event_type, created_at, is_read::text as status FROM client_messages;

-- RLS for View (via base tables) relies on the user's org_memberships
```

```typescript
// app/(dashboard)/admin/inbox/page.tsx
import { createClient } from '@/lib/supabase/server';

export default async function OmniInbox() {
  const supabase = createClient();
  // Fetch cross-org events where user is owner
  const { data: events } = await supabase
    .from('vw_omni_events')
    .select('*, organizations(name, logo_url)')
    .order('created_at', { ascending: false });

  return (
     <div className="grid grid-cols-12 h-screen bg-[#121212] text-white">
        {/* Render Executive Minimalist Data Table */}
     </div>
  )
}
```

### 4. Antigravity Instructions
*   **Task:** Build the `vw_omni_events` view and the `OmniInbox` split-pane UI.
*   **Constraint:** Use the Shadcn `Table` component. No charts. Pure data density. Active states must utilize `--accent` (`#FF5F1F`) borders. Ensure RLS absolutely prevents a consultant from seeing events for organizations they do not own.

---

## Feature 4: Pre-Flight QA Sandbox
**Primary Goal:** Guarantee flawless handovers by automating "Success Simulations" for payments, GST, and WhatsApp before client delivery.

### 1. User Experience (UX) Flow
1. Before taking a client's portal live, the consultant hits a "Run Diagnostics" button.
2. A `ProjectProgressBar` component appears.
3. The system fires a mock Razorpay payload to the webhook, verifies the webhook signature logic, generates a mock GST PDF, and sends a test WhatsApp message to the consultant's phone.
4. If all turn green, the "Deploy to Production" button unlocks.

### 2. Technical Architecture
*   **API Routes:** `/api/qa/simulate` which imports the actual business logic functions (`generateGSTInvoice`, `sendWhatsAppNotification`) but passes a `dryRun: true` flag or targets a Sandbox DB schema.
*   **Razorpay Webhooks (Mock):** A script that constructs a valid `payment.captured` Razorpay JSON payload, signs it with the local `RAZORPAY_WEBHOOK_SECRET` via HMAC SHA256, and POSTs it to the local Next.js API route to test the DB update pipeline.

### 3. Implementation Code (Skeleton)
```typescript
// app/api/qa/simulate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { org_id, test_phone } = await req.json();
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  
  // 1. Simulate Razorpay Webhook
  const mockPayload = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_test', amount: 500000, order_id: 'order_test' } } } });
  const signature = crypto.createHmac('sha256', secret).update(mockPayload).digest('hex');
  
  // POST to own webhook route internally
  const whRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`, {
    method: 'POST',
    headers: { 'x-razorpay-signature': signature, 'Content-Type': 'application/json' },
    body: mockPayload
  });

  // 2. Simulate WhatsApp
  const waRes = await sendTestWhatsApp(test_phone, org_id);

  return NextResponse.json({
    payment_webhook: whRes.ok,
    whatsapp_delivery: waRes.success,
    status: 'Ready for Flight'
  });
}
```

### 4. Antigravity Instructions
*   **Task:** Implement the QA API route and the UI using the `ProjectProgressBar` component.
*   **Constraint:** Visually, the progress bar should use grey `#E5E7EB` for pending, and neon orange `#FF5F1F` for successful steps. If a step fails, halt the simulation and display raw error logs in a monospace terminal block (for developer transparency).

---

## Feature 5: WhatsApp Magic Links
**Primary Goal:** Achieve frictionless, passwordless authentication for Indian end-consumers (patients, property buyers) directly via their primary app.

### 1. User Experience (UX) Flow
1. A doctor generates a prescription. The PRX OS triggers a WhatsApp message to the patient.
2. WhatsApp Message: *"Dr. Mehta shared a document with you. Tap here to view securely: prxos.com/auth/wa?token=abc..."*
3. The patient taps the link. The Next.js middleware verifies the token, establishes a secure Supabase session, and redirects them straight into their Client Portal Document Vault. Zero password typing.

### 2. Technical Architecture
*   **Libraries:** `jsonwebtoken` (JWT) for secure token generation.
*   **Database Schema Impact:** Add `magic_links` table with `token` (Hash), `client_id`, `org_id`, `expires_at`, and `is_used`.
*   **Security:** Tokens are short-lived (15 minutes), single-use. Upon clicking, the API route uses the Supabase Admin client to forcefully generate an access token for the `client_id` and sets the browser cookies.

### 3. Implementation Code (Skeleton)
```typescript
// app/api/auth/whatsapp-verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Admin client

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  
  // 1. Verify token in DB, ensure expires_at > NOW() and is_used = false
  const validLink = await verifyAndBurnToken(token);
  if (!validLink) return NextResponse.redirect('/unauthorized');

  // 2. Generate Supabase Session
  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  
  // Generate link for the user manually to establish session
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: validLink.client_email,
  });

  // Redirect to the generated hashed URL which establishes the cookie, 
  // then redirects to the portal.
  return NextResponse.redirect(data.properties.action_link);
}
```

### 4. Antigravity Instructions
*   **Task:** Create the token generation utility, the `magic_links` DB migration, and the `whatsapp-verify` API route. Update the `lib/whatsapp.ts` templates to append this dynamic token to outgoing messages.
*   **Constraint:** Security is paramount. Ensure the JWT token includes the `org_id` and the API route strictly enforces that the user is only redirected to their specific `/[orgSlug]/portal` route. The UI upon clicking must show a brief Neon Orange spinner while authenticating, maintaining the Executive Minimalist feel.

---

## Feature 6: Psychology-Driven Brand Engine
**Primary Goal:** Transform brand styling from arbitrary choices ("vibes") into conversion-tested psychological archetypes perfectly encoded as CSS variables.

### 1. User Experience (UX) Flow
1. User enters the "Brand Engine" step during project spawning.
2. Instead of a color picker, the UI asks: *"How do you want your clients to feel?"* (Options: Protected & Secure, Fast & Disruptive, Calm & Guided, Premium & Exclusive).
3. The engine selects the corresponding Brand Archetype (e.g. Ruler, Outlaw).
4. It auto-generates the CSS palette (Base, Surface, Accent, Text) and typography settings (Weights, Tracking).
5. User sees a live preview of the Hero section transformed instantly. They click "Lock Identity".

### 2. Technical Architecture
*   **Database:** Modify `organizations` table to add `brand_archetype` (TEXT) and `typography_config` (JSONB).
*   **Next.js Integration:** Create `lib/brand-psychology.ts` to map Archetypes to exact hex codes and CSS variables. `ThemeWrapper.tsx` dynamically injects not just colors, but specific `--font-weight-display` and `--letter-spacing-display` variables.

### 3. Implementation Code (Skeleton)
```typescript
// src/lib/brand-psychology.ts
export type BrandArchetype = 'Ruler' | 'Outlaw' | 'Sage' | 'Creator';

export interface BrandConfig {
  accentColor: string;
  bgPrimary: string;
  headingWeight: '700' | '800' | '900';
  headingTracking: '-0.02em' | '-0.05em';
}

export const ARCHETYPE_MAP: Record<BrandArchetype, BrandConfig> = {
  Ruler: { accentColor: '#1A2238', bgPrimary: '#FFFFFF', headingWeight: '900', headingTracking: '-0.05em' },
  Outlaw: { accentColor: '#FF5F1F', bgPrimary: '#121212', headingWeight: '800', headingTracking: '-0.05em' },
  Sage: { accentColor: '#065F46', bgPrimary: '#FAFAF9', headingWeight: '700', headingTracking: '-0.02em' },
  Creator: { accentColor: '#7C3AED', bgPrimary: '#FFFFFF', headingWeight: '800', headingTracking: '-0.02em' }
};

export function getCSSVariablesForArchetype(archetype: BrandArchetype) {
  const config = ARCHETYPE_MAP[archetype];
  return {
    '--accent': config.accentColor,
    '--bg-primary': config.bgPrimary,
    '--heading-weight': config.headingWeight,
    '--heading-tracking': config.headingTracking,
  };
}
```

### 4. Antigravity Instructions
*   **Task:** Implement `brand-psychology.ts` with the 4 core archetypes. Update `ThemeWrapper.tsx` to read the archetype from the org config and inject `--heading-weight` and `--heading-tracking`. Build `ArchetypeSelector.tsx` UI.
*   **Constraint:** Hardcode the exact, conversion-tested hex values. No random generation. Enforce the Executive Minimalist typography constraints.

---

## Feature 7: LinkedIn Viral Hook Generator
**Primary Goal:** Enable consultants to automatically generate "Build in Public" content based on the precise PAS/Contrarian/Math Breakdown frameworks used by successful Indian founders.

### 1. User Experience (UX) Flow
1. Consultant completes a client digitization project.
2. In the Admin Dashboard, they click "Generate Case Study Assets".
3. A modal asks for 3 specific data points: `Time to build` (e.g., 48 hours), `Client price charged` (e.g., ₹60,000), `Previous workflow` (e.g., "WhatsApp and Excel").
4. The engine instantly generates 5 ready-to-copy LinkedIn/Twitter posts utilizing the strategic frameworks.

### 2. Technical Architecture
*   **API Layer:** `app/api/content/generate-hooks/route.ts`
*   **Logic Flow:** Receive `org_id` and custom metrics. Pass data into a purely deterministic template engine (TypeScript string literals) to guarantee high-converting copywriting without AI hallucinations.

### 3. Implementation Code (Skeleton)
```typescript
// src/lib/content/hook-templates.ts
export function generateMathBreakdown(metrics: ProjectMetrics): string {
  const profit = calculateProfit(metrics.clientPrice, metrics.prxCost);

  return `The math that changed my ${metrics.industry} consulting business 🧵\n\nBEFORE:\n• Client used: ${metrics.oldWorkflow}\n• My time spent: 2-3 weeks building from scratch\n• Constant debugging and API headaches\n\nAFTER PRX OS:\n• Delivered a full ${metrics.industry} portal to ${metrics.businessName}\n• Time spent: ${metrics.timeToBuild}\n• Client charged: ${metrics.clientPrice}\n• Infrastructure cost: ${metrics.prxCost}\n• Pure Profit: ₹${profit}\n\nThe bridge? I stopped building boilerplate and started building businesses.\nIt's not a tool. It's a business model change.\n\nIf you're an Indian developer, stop reinventing auth and payments. Ship faster. 🇮🇳👇`;
}
```

### 4. Antigravity Instructions
*   **Task:** Create `hook-templates.ts` with strict string interpolation functions for Math Breakdown and Contrarian posts. Build `ViralHookGenerator.tsx` dashboard widget.
*   **Constraint:** Use the Executive Minimalist style for the generator UI: dark borders, monospace typography for generated text, accent-colored "Copy" button.

---

## Feature 8: Executive Asset Generator
**Primary Goal:** Prevent cheap, auto-generated gradients from ruining a startup's brand authority when links are shared on social media. 

### 1. User Experience (UX) Flow
1. A new project is spawned.
2. The PRX OS creates an `/api/og/executive?org=slug` route.
3. When the link is shared on Twitter/LinkedIn, the engine renders a highly-structured, data-dense SVG/PNG.
4. The founder looks instantly like a well-funded Series A startup.

### 2. Technical Architecture
*   **API Layer:** `app/api/og/executive/route.tsx` utilizing `@vercel/og` (Satori).
*   **Logic Flow:** Extract URL parameters, fetch org details, and construct a JSX tree heavily utilizing Flexbox and grid-like borders to create a "dashboard/terminal" aesthetic.

### 3. Implementation Code (Skeleton)
```tsx
// src/app/api/og/executive/route.tsx
import { ImageResponse } from 'next/og';
// Load Montserrat font buffer here...

export async function GET(req: Request) {
  // Parse params...
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#121212', color: '#FFFFFF', padding: '60px', borderTop: `16px solid ${accent}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
          <span style={{ color: '#9CA3AF' }}>// {category}_PORTAL</span>
          <span style={{ color: accent, fontWeight: 'bold' }}>SECURE</span>
        </div>
        <h1 style={{ fontSize: 84, fontWeight: 900, marginTop: 'auto' }}>{title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #333', paddingTop: '30px' }}>
          <span style={{ color: '#6B7280' }}>RAZORPAY ENABLED • GST COMPLIANT</span>
          <span style={{ color: '#6B7280', fontWeight: 'bold' }}>POWERED BY PRX</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

### 4. Antigravity Instructions
*   **Task:** Install `@vercel/og`. Download local `.ttf` files for Montserrat Black and Inter Medium to `src/lib/fonts`. Implement `route.tsx`.
*   **Constraint:** Use strict 1px borders and sharp grid lines to create the "Executive/Terminal" look. The Neon Orange accent is strictly for data points/borders.

---

## Feature 9: The Copywriting Co-Pilot
**Primary Goal:** Stop founders from writing feature-obsessed copy by enforcing proven marketing frameworks (PAS/AIDA) directly inside the CMS editor.

### 1. User Experience (UX) Flow
1. Founder clicks "Edit Hero Section" in the CMS.
2. Instead of a blank text box, they select "Use PAS Framework".
3. The form splits into 3 strict fields: Problem, Agitate, Solution.
4. The UI compiles these fields into the final descriptive block and saves it.

### 2. Technical Architecture
*   **Next.js Integration:** Use `react-hook-form` and `zod` to strictly type and validate the PAS/AIDA structures.
*   **Logic Flow:** Form renders Co-Pilot UI. User types. Zod validates (e.g. "You must agitate the problem"). On submit, strings are concatenated into the database JSONB.

### 3. Implementation Code (Skeleton)
```typescript
// src/lib/content/copywriting-schemas.ts
import { z } from 'zod';

export const PAS_Schema = z.object({
  problem: z.string().min(10, "State the problem clearly (min 10 chars)."),
  agitate: z.string().min(10, "You must agitate the problem to drive conversion."),
  solution: z.string().min(10, "Present your solution clearly."),
});

export function compilePAS(data: z.infer<typeof PAS_Schema>): string {
  return `${data.problem}\n\n${data.agitate}\n\n${data.solution}`;
}
```

### 4. Antigravity Instructions
*   **Task:** Define Zod schemas. Build `CopywritingCoPilot.tsx`. Integrate it into the `[orgId]/pages/edit/page.tsx` view.
*   **Constraint:** Design the editor to look like a high-end financial form (`bg-[#121212]`, stark white text, Neon Orange focus borders). Include micro-copy placeholders to coach the user.