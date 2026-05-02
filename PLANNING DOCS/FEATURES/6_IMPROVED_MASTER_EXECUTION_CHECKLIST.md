# 🚀 PRX STARTUP OS — IMPROVED MASTER EXECUTION CHECKLIST

### Phase 0: Environment & Infrastructure Prep (Pre-Requisites)
- [ ] **Supabase Setup:** Verify project is in `ap-south-1` (Mumbai) for low latency. Configure Twilio credentials in Supabase Auth settings for Phone OTP.
- [ ] **Vercel Setup:** Connect repository. Add all 17 environment variables (Razorpay, Supabase, Twilio, WhatsApp, Resend, PostHog).
- [ ] **Shadcn Init:** Run `npx shadcn@latest init` (Style: New York, Base: Neutral, CSS variables: true).
- [ ] **Component Installs:** Run `npx shadcn@latest add button input label card avatar dropdown-menu dialog separator badge tabs sheet alert toast skeleton accordion`.
- [ ] **[ADVANCED] Magic Deploy CLI:** Create `packages/cli` workspace. Implement CLI using `@clack/prompts` and `execa` to automate Supabase migrations and `.env.local` population.

### Phase 1: Foundation & Auth (Sprint 1)
- [ ] **Database Migration (001):** Execute `rename_and_extend_schema` (rename `organization_members` to `org_memberships`, drop `subscriptions`, add `waitlist_entries`, add phone to `profiles`).
- [ ] **Security & Triggers:** Implement RLS policies for all 4 base tables. Implement `handle_new_user()`, `update_updated_at_column()`, and `create_organization()` RPCs.
- [ ] **Design System:** Replace `globals.css` with the Executive Minimalist theme. Add CSS vars: `--accent: #FF5F1F`, `--bg-dark: #121212`. Remove all default gradients.
- [ ] **Typography:** Update `layout.tsx` to load Next.js Google Fonts: `Montserrat` (700-900) for headings, `Inter` (400-500) for body.
- [ ] **Auth Refactor:** Build `login/page.tsx` and `register/page.tsx` (Email, Google OAuth, Phone OTP). Build `verify-phone/page.tsx` with 6-digit auto-advance input and 30s resend cooldown.
- [ ] **[ADVANCED] WhatsApp Magic Links:** Implement `/api/auth/wa-verify/route.ts` to validate tokens, bypass passwords using Supabase Admin Client, and redirect securely.
- [ ] **Routing & Context:** Implement `org-provider.tsx`. Update `middleware.ts` to detect `/[orgSlug]` routes and set `x-org-id` headers. Add org switcher dropdown to `sidebar.tsx`.

### Phase 2: The Startup Spawner (Sprint 2)
- [ ] **Database Migration (002):** Execute `002_startup_spawner.sql` (`pages`, `page_components` tables).
- [ ] **RPC Implementation:** Deploy `create_landing_page()` RPC to auto-inject the 5 default components into new orgs.
- [ ] **[ADVANCED] Psychology Brand Engine:** Build `ArchetypeSelector.tsx` mapping specific archetypes (Ruler/Outlaw/Sage/Creator) to exact Hex codes and typography variables.
- [ ] **Spawner UI:** Build `CreateProjectModal.tsx` wizard (Project Type → Brand Config → Feature Selection).
- [ ] **Dynamic Theme Engine:** Build `ThemeWrapper.tsx` to inject colors and `--heading-weight` / `--heading-tracking` into the DOM.
- [ ] **Public Routing:** Implement `app/[orgSlug]/layout.tsx` and `app/[orgSlug]/page.tsx`.
- [ ] **Core Components:** Build `HeroSection`, `FeaturesGrid`, `PricingTable` (with INR/USD toggle), `WaitlistBlock`, and `FAQAccordion`.
- [ ] **[ADVANCED] Executive Asset Generator:** Build `/api/og/executive` using `@vercel/og`, rendering data-dense images with strict grid layouts and Montserrat fonts.
- [ ] **[ADVANCED] Copywriting Co-Pilot:** Implement `zod`-validated PAS/AIDA form fields within the CMS admin panel to enforce conversion-optimized copywriting.

### Phase 3: Executive UI Component Library (Sprint 3)
- [ ] **Component Buildout:** Build the 11 remaining drop-in components: `TestimonialBlock`, `StatusTracker`, `ClientPortalShell`, `DocumentVault`, `AppointmentBooking`, `ServiceCatalog`, `InvoicePreview`, `WhatsAppCTA`, `InquiryForm`, `ProjectProgressBar`, `PaymentStatusCard`.
- [ ] **Mobile-First Validation:** Ensure every component explicitly defines `sm:`, `md:`, `lg:` breakpoints and functions perfectly on a `360px` viewport (Android mobile baseline).
- [ ] **Aesthetic Enforcement:** Verify 100% compliance with wordmarks only (no icons in logos), borders instead of background colors, and NO hardcoded colors outside of `var(--accent)`, `white`, and `#121212`.

### Phase 4: The Business Digitizer (Sprint 4)
- [ ] **Database Migration (004):** Execute `004_business_digitizer.sql` (`business_categories`, `business_configs`, `appointments`, `service_catalog`, `documents`, `client_messages`, `inquiries`).
- [ ] **Template Configuration:** Create `lib/templates.ts` containing the JSONB default configs for all 10 business categories (Legal, Health, Real Estate, etc.).
- [ ] **Digitizer Wizard:** Build `DigitizeBusinessModal.tsx` with business info collection.
- [ ] **[ADVANCED] DPDP Compliance Engine:** Implement `pdf-generator.ts` (`jsPDF`) to auto-generate Privacy/ToS/Refund docs dynamically based on GSTIN input, explicitly stating standard Razorpay refund timelines.
- [ ] **Client Portal Routes:** Implement `app/[orgSlug]/portal/*` (Dashboard, Documents, Appointments, Messages, Invoices).
- [ ] **Client Registration:** Build portal invite/registration flow.
- [ ] **[ADVANCED] Pre-Flight QA Sandbox:** Build `/api/qa/simulate/route.ts` to execute automated test validations (mocking Razorpay webhooks with HMAC and verifying GST outputs) via a `ProjectProgressBar` UI.

### Phase 5: Revenue & Communication Layer (Sprint 5)
- [ ] **Database Migration (005):** Execute `005_revenue_layer.sql` (`payments`, `invoices`, `whatsapp_notifications`).
- [ ] **Razorpay Server Actions:** Implement `/api/payments/create-order` and `/api/payments/verify`.
- [ ] **Razorpay Client UI:** Build `RazorpayCheckout.tsx` (forces UPI Intent on mobile) and `UPIQRCode.tsx`.
- [ ] **Webhook Security:** Implement `/api/payments/webhook` with `crypto` HMAC SHA256 signature verification.
- [ ] **GST Invoicing:** Implement `gst-calculator.ts` (dynamic CGST/SGST vs IGST based on states) and `invoice.ts` to auto-generate invoices with all **21 mandatory Indian GST fields**.
- [ ] **WhatsApp & Email:** Implement Meta Cloud API integration in `lib/whatsapp.ts` (with retry logic) and Resend HTML templates.

### Phase 6: Growth, SEO & Content Engine (Sprint 6)
- [ ] **Admin God Mode:** Build `app/(dashboard)/admin/page.tsx` restricted to root `owner`.
- [ ] **[ADVANCED] Consultant Omni-Inbox:** Create PostgreSQL view `vw_omni_events` with `security_invoker = true` to securely aggregate multi-tenant inquiries, messages, and payments in one dashboard feed.
- [ ] **[ADVANCED] LinkedIn Viral Hook Generator:** Build deterministic template engine to automatically generate 5 "Math Breakdown" and "Contrarian" LinkedIn/X posts using deployed client data.
- [ ] **Analytics:** Integrate `posthog-js` with `SNACK_CASE` event tracking.
- [ ] **Programmatic SEO:** Implement `app/[orgSlug]/sitemap.xml/route.ts` and dynamic `<head>` metadata.
- [ ] **JSON-LD Structured Data:** Inject `SoftwareApplication` schema for startups and `LocalBusiness` schema for digitized businesses based on their category.
- [ ] **Sub-Brand Deployment:** Use the engine to deploy the 4 proof-of-concept brands to production (`CHITRAGUPT`, `GYMOS`, `TNC`, `LRM`).