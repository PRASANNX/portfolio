# PRX STARTUP OS — FILE 3: MASTER PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Version:** 2.0 | **Classification:** Founding Document  
**Author:** Principal Product Strategist | **Audience:** Engineering Team, Antigravity Coding Agent  
**Purpose:** Complete product specification — user stories, module details, acceptance criteria, edge cases, and flow logic.

---

## 1. PRODUCT VISION AND NORTH STAR METRIC

**Product Vision:** PRX Startup OS is the dual-purpose infrastructure engine that transforms business intent into digital reality — spawning production-ready startups for new ideas AND deploying complete digital transformation packages for existing offline businesses — both from a single codebase, both in under 48 hours, both built for the Indian market.

**North Star Metric:** Number of active organizations (orgs) with at least one published page and one user interaction (waitlist signup, client registration, or payment) within 7 days of creation. This metric measures whether PRX OS successfully delivers on its core promise: turning blank organizations into live, functional digital products.

**Secondary Metrics:**
- Time from org creation to first published page (target: under 5 minutes for startups, under 48 hours for business digitization)
- Client portal adoption rate (percentage of digitized businesses with at least 5 active client users)
- Payment completion rate (percentage of initiated payments that complete successfully)

---

## 2. USER STORIES (30 STORIES — BOTH USE CASES)

### Startup Spawner User Stories

**US-1:** As an Indian indie hacker, I want to sign up with my Google account so that I can start using PRX OS without creating new credentials.

**US-2:** As a new user, I want to create my first organization by entering a name and URL slug so that I have a workspace for my startup.

**US-3:** As a startup founder, I want to click "New Project" and fill in my brand name and color so that the system generates a branded landing page automatically.

**US-4:** As a founder, I want my landing page to include a waitlist capture form so that I can collect early interest before launch.

**US-5:** As a founder, I want my landing page to have a pricing section so that visitors can see my planned pricing tiers.

**US-6:** As a founder, I want my landing page to have an FAQ section so that I can answer common questions from potential users.

**US-7:** As a founder, I want my landing page to have an automatically generated OG image with my brand name and color so that it looks professional when shared on social media.

**US-8:** As a founder, I want my landing page to be SEO-optimized with proper meta tags so that it ranks on Google for relevant searches.

**US-9:** As a founder, I want to view all my waitlist signups in a dashboard table so that I can follow up with interested users.

**US-10:** As a founder, I want to switch between multiple projects from a dropdown so that I can manage all my startups from one account.

### Business Digitizer User Stories

**US-11:** As a web developer consultant, I want to select a business category from 10 predefined templates so that I can deploy a pre-configured system for my client.

**US-12:** As a consultant, I want to configure my client's business details (name, phone, address, GSTIN, WhatsApp number) so that the system is personalized for their business.

**US-13:** As a consultant, I want to deploy a complete client portal for my client's business so that their customers can log in and interact digitally.

**US-14:** As a business client (end-user of a digitized business), I want to register for the client portal with my email and phone so that I can access my documents and appointments.

**US-15:** As a business client, I want to view the status of my case/order/appointment in the portal so that I don't have to call the business for updates.

**US-16:** As a business client, I want to upload and download documents securely in the portal so that I don't have to send sensitive files over WhatsApp.

**US-17:** As a business client, I want to book an appointment through the portal so that I can schedule a visit without calling.

**US-18:** As a business client, I want to receive a WhatsApp confirmation when my appointment is booked so that I have a record of the booking.

**US-19:** As a business client, I want to pay via UPI through the portal so that I can make payments digitally.

**US-20:** As a business client, I want to receive a GST-compliant invoice via email and WhatsApp after payment so that I have proper documentation for my records.

### Cross-Use-Case User Stories

**US-21:** As a business owner, I want to receive a WhatsApp notification when a new inquiry comes through my website so that I can respond quickly.

**US-22:** As a business owner, I want to manage my service catalog (add, edit, remove services) so that my website always shows accurate offerings.

**US-23:** As a business owner, I want to view all client inquiries in a dashboard with status tracking so that I can manage my sales pipeline.

**US-24:** As a PRX OS owner (founder), I want to see metrics across all organizations in an admin dashboard so that I can monitor the health of the entire platform.

**US-25:** As any user, I want the system to work smoothly on my mobile phone with slow 4G so that I can access it anywhere in India.

**US-26:** As a business owner, I want to send messages to my clients through the portal so that all communication is tracked and professional.

**US-27:** As a business owner, I want to generate a GST-compliant invoice for a client so that I can bill them properly.

**US-28:** As a founder, I want to customize the accent color of my project so that the landing page matches my brand identity.

**US-29:** As a consultant, I want to invite staff members to manage a client's portal so that the business owner's team can use the system.

**US-30:** As a business client, I want to receive a WhatsApp notification when a new document is shared with me so that I know to check my portal.

---

## 3. CORE MODULES WITH FULL FEATURE SPECIFICATIONS

### Module 1: Authentication

**Purpose:** Provide secure, flexible authentication that works for Indian users including phone-based OTP — critical because 80%+ of Indian users prefer phone-based login over email.

**Research References:**
- [Supabase Phone Login Official Docs](https://supabase.com/docs/guides/auth/phone-login) — Primary reference for Supabase's built-in phone auth implementation
- [Phone Authentication with Twilio, NextJS and Supabase (HackerOne)](https://www.hackerone.com/blog/phone-authentication-twilio-nextjs-and-supabase) — Security considerations and implementation pattern for phone auth flow
- [OTP Authentication with Supabase and Twilio in React (Refine.dev)](https://refine.dev/blog/supabase-twilio-otp-authentication-in-react/) — Complete tutorial with React integration, OTP verification UI patterns
- [Supabase Custom Phone Auth Provider Discussion (GitHub)](https://github.com/orgs/supabase/discussions/14774) — Community discussion on integrating custom phone auth providers beyond Twilio
- [Supabase Twilio Phone Auth (Stack Overflow)](https://stackoverflow.com/questions/74793778/supabase-twilio-phone-auth) — Common implementation issues and solutions for phone auth

**Technical Specification:**
- Provider: Supabase Auth
- Methods: Email/Password, Email Magic Link, Google OAuth, Phone OTP (via Supabase Phone Auth with Twilio as SMS provider)
- Session management: JWT-based sessions with 1-hour expiry, auto-refresh via Supabase client
- Password requirements: Minimum 8 characters, at least 1 uppercase, 1 number, 1 special character
- **Phone OTP Flow (India-specific):**
  1. User enters phone number in E.164 format (+91XXXXXXXXXX)
  2. Supabase sends OTP via Twilio SMS (6-digit code, expires in 60 seconds)
  3. User enters OTP in verification UI
  4. Supabase verifies OTP, creates session, redirects to dashboard
  5. On subsequent logins, user can use "Remember this device" for passwordless access
- **Why phone OTP for India:** Email adoption among Indian small business owners (Segment 3) is low. Phone number is the primary digital identity. OTP via SMS is the most familiar authentication pattern for non-technical users.

**Role-Based Access Control:**
- `owner`: Full access to org settings, member management, billing, deletion. Created the org.
- `admin`: Can manage all org features (services, documents, inquiries, invoices) but cannot delete org or change billing.
- `staff`: Can view and update inquiries, manage appointments, upload documents. Cannot access billing or member management.
- `client`: End-user of a digitized business. Can access client portal, view documents, book appointments, make payments. Cannot access admin dashboard.

**Key Files:**
- `app/(auth)/login/page.tsx` — Login page
- `app/(auth)/signup/page.tsx` — Signup page
- `app/(auth)/forgot-password/page.tsx` — Password reset
- `app/(auth)/verify-phone/page.tsx` — Phone OTP verification page
- `lib/supabase/auth.ts` — Auth helper functions
- `app/middleware.ts` — Route protection

**Acceptance Criteria:**
- [ ] User can sign up with email/password and receive confirmation email
- [ ] User can sign up with Google OAuth
- [ ] User can sign up with phone number and receive OTP via SMS
- [ ] User can verify phone OTP and complete registration
- [ ] User can log in with email magic link
- [ ] User can reset password via email
- [ ] Session persists across page refreshes
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Authenticated users are redirected away from auth pages
- [ ] "Remember this device" option works for returning phone users

**Edge Cases:**
- User tries to sign up with email that already exists → Show "Account already exists. Log in or reset password."
- OTP expires before user enters it (60-second window) → Show "OTP expired. Request new OTP." button with resend cooldown of 30 seconds
- Google OAuth popup is blocked → Show fallback: "Please allow popups or use email signup."
- User's session expires mid-action → Redirect to login, preserve return URL, redirect back after re-auth
- Phone number format invalid → Validate against E.164 format, show "Enter a valid Indian phone number (e.g., +91 98765 43210)."
- Twilio SMS fails to deliver → Show "SMS delivery failed. Please try email signup or contact support." with fallback to email auth
- OTP entered incorrectly 3 times → Lock for 5 minutes, show "Too many attempts. Please wait 5 minutes or request a new OTP."

### Module 2: Multi-Tenant Organization System

**Purpose:** Enable multiple isolated organizations within a single codebase with data scoping, subdomain routing, and member management.

**Technical Specification:**
- Each organization has a unique `id` (UUID) and `slug` (URL-safe string)
- All data tables include `org_id` foreign key for scoping
- Row Level Security (RLS) policies enforce data isolation at the database level
- Subdomain routing: `{org-slug}.prxos.com` resolves to the organization's public pages
- Path-based routing: `/[orgSlug]/` also resolves to the organization's pages (for custom domain support later)

**Organization Settings:**
- Name, slug, accent color, logo URL (optional — wordmark-only preferred)
- Billing tier (free, starter, professional, enterprise)
- Active/inactive status
- Created by (user ID), created at, updated at

**Member Management:**
- Invite members by email
- Assign roles (owner, admin, staff, client)
- Pending invitations expire after 7 days
- Members can be suspended or removed
- Owner role cannot be removed (must be transferred first)

**Client Access Control:**
- Clients are invited by business owners to access the client portal
- Clients receive an invitation email/SMS with registration link
- Client accounts are scoped to a single organization
- Clients can only see their own data (documents, appointments, invoices)

**Key Files:**
- `lib/org-context.ts` — Organization context provider
- `components/OrgSwitcher.tsx` — Org switcher dropdown
- `components/InviteMemberModal.tsx` — Invite member modal
- `app/api/org/route.ts` — Org CRUD API
- `app/api/org/members/route.ts` — Member management API

**Acceptance Criteria:**
- [ ] User can create an organization with name, slug, and accent color
- [ ] Slug is validated for uniqueness and format (alphanumeric + hyphens, 3-30 chars)
- [ ] All data queries are scoped by org_id via RLS
- [ ] User can switch between organizations they belong to
- [ ] User can invite members by email and assign roles
- [ ] Invited members receive invitation email with registration link
- [ ] Client portal access is restricted to invited clients only
- [ ] Cross-org data access is blocked by RLS (verified with test queries)

**Edge Cases:**
- User tries to create org with duplicate slug → Show "This URL is already taken. Try adding numbers or a different word."
- User tries to access another org's data → RLS blocks the query, returns empty result
- Last owner tries to leave org → Show "Transfer ownership to another member first."
- Invitation email bounces → Mark invitation as "failed", allow resend
- Org slug contains invalid characters → Auto-sanitize (remove special chars, lowercase, hyphenate spaces)

### Module 3: The Project Spawner UI

**Purpose:** Guide users through creating a new startup project with branded landing page in under 5 minutes.

**Technical Specification:**

**Modal Wizard Flow (3 Steps):**

**Step 1: Project Type**
- Two large selection cards:
  - "New Startup" — "Launch a SaaS or micro-SaaS product with auth, payments, and waitlist."
  - "Digitize a Business" — "Build a client portal and operational system for an existing business."
- Clicking "New Startup" proceeds to Step 2 of spawner flow.
- Clicking "Digitize a Business" redirects to the Business Digitizer modal (Module 4).

**Step 2: Brand Configuration**
- Project Name (text input, required, max 50 chars)
- URL Slug (auto-generated from name, editable, validated)
- Brand Accent Color (color picker with 5 presets: #FF5F1F, #000000, #2563EB, #7C3AED, #059669, plus custom hex input)
- Tagline (optional, text input, max 100 chars)

**Step 3: Feature Selection**
- Checkboxes for features to include:
  - [x] Waitlist module (default: checked)
  - [x] Pricing page (default: checked)
  - [ ] Blog (default: unchecked — out of scope for v1)
  - [x] FAQ section (default: checked)
  - [ ] Testimonials (default: unchecked)
- "Create Project" button (btn-primary)

**On Submit:**
1. Validate all inputs
2. Call `create_organization(name, slug, user_id)` RPC
3. Update organization `accent_color` with selected color
4. Call `create_landing_page(org_id, name, accent_color)` RPC to create pages with default components
5. Generate OG image via `/api/og` route
6. Generate favicon via `/api/favicon` route
7. Show success state: "Your startup is live!" with preview link
8. Redirect to `/{org.slug}` to view the live landing page

**Key Files:**
- `components/CreateProjectModal.tsx` — Modal wizard component
- `lib/spawner.ts` — Spawner orchestration functions
- `app/api/projects/create/route.ts` — Project creation API

**Acceptance Criteria:**
- [ ] Modal opens when "New Project" button is clicked
- [ ] Step 1 shows two project type options
- [ ] Step 2 auto-generates slug from name, allows editing
- [ ] Color picker shows presets and accepts custom hex
- [ ] Step 3 shows feature checkboxes with correct defaults
- [ ] Submit creates org, pages, and components in under 10 seconds
- [ ] Success state shows preview link
- [ ] User is redirected to live landing page

**Edge Cases:**
- Network failure during creation → Show "Something went wrong. Your progress was not saved. Please try again." with retry button
- Duplicate slug → Inline validation error: "This URL is already taken."
- User closes modal mid-wizard → All progress is lost (no draft saving in v1)
- Org creation succeeds but page creation fails → Rollback org creation, show error

### Module 4: The Business Digitizer UI

**Purpose:** Guide consultants through deploying a complete digital transformation package for an existing offline business.

**Technical Specification:**

**Modal Wizard Flow (4 Steps):**

**Step 1: Select Business Category**
- Grid of 10 category cards (2 columns mobile, 3 tablet, 5 desktop):
  - Legal & Compliance (scale icon)
  - Healthcare & Wellness (heart-pulse icon)
  - Real Estate & Property (building icon)
  - Education & Coaching (graduation-cap icon)
  - Retail & E-Commerce (shopping-bag icon)
  - Hospitality & Food (utensils icon)
  - Logistics & Supply Chain (truck icon)
  - Professional Services (briefcase icon)
  - Manufacturing & B2B (factory icon)
  - Financial Services (piggy-bank icon)
- Each card shows: icon, category name, 1-line description
- Selected card has `border-2 border-[var(--accent)]` and `bg-[var(--accent-light)]`
- Clicking advances to Step 2

**Step 2: Business Information**
- Business Name (text, required)
- Business Phone (tel, required, E.164 format)
- Business Email (email, required)
- Business Address (textarea, required)
- WhatsApp Number (tel, required — this is the number clients will message)
- GSTIN (text, optional, validated: `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$`)
- Working Hours: JSONB config — array of 7 days with open/close times and closed flag

**Step 3: Brand Configuration**
- Same as Project Spawner Step 2: name, slug, accent color
- Auto-suggests slug from business name
- Preview card showing wordmark in selected color

**Step 4: Review & Deploy**
- Summary card: category, business name, WhatsApp number, accent color, working hours
- "Deploy Now" button (btn-primary)
- Estimated deployment time: "Your business portal will be live in under 48 hours."

**On Deploy:**
1. Create organization
2. Create `business_config` with selected category and business details
3. Load category-specific template from `lib/templates.ts`
4. Create pages with category-specific component configurations
5. Seed `service_catalog` with default services for the category
6. Generate OG image and favicon
7. Connect WhatsApp number (store in `business_configs.whatsapp_number`)
8. Show deployment success with:
   - Public website URL
   - Client portal URL
   - Admin dashboard URL
   - Next steps checklist

**Key Files:**
- `components/DigitizeBusinessModal.tsx` — Modal wizard component
- `lib/templates.ts` — Template configurations for all 10 categories
- `app/api/businesses/deploy/route.ts` — Business deployment API

**Acceptance Criteria:**
- [ ] Category grid displays all 10 categories with icons
- [ ] Selected category is visually highlighted
- [ ] Business information form validates all fields
- [ ] GSTIN validation accepts valid format, rejects invalid
- [ ] Working hours config saves correctly
- [ ] Deploy creates org, business_config, pages, and service_catalog
- [ ] Success state shows all URLs and next steps
- [ ] Healthcare template deploys with patient portal, appointment booking, and report upload

**Edge Cases:**
- WhatsApp number already linked to another org → Show "This WhatsApp number is already in use."
- Deployment partially fails → Rollback all changes, show error with specific failed step
- User tries to deploy without required fields → Inline validation errors on each missing field
- Template loading fails for a category → Show "Template temporarily unavailable. Please try another category or contact support."

### Module 5: Dynamic Theme Engine

**Purpose:** Inject org-specific branding (accent color, wordmark) dynamically into all pages and components.

**Technical Specification:**
- CSS Variables approach: `--accent`, `--accent-hover`, `--accent-light` set on `:root` per org
- ThemeWrapper component reads org's `accent_color` and sets CSS variables on mount
- All components reference CSS variables instead of hardcoded colors
- Wordmark rendering: org name in Montserrat Bold/Black, no icons
- Mobile responsive enforcement: all breakpoints defined at component level

**ThemeWrapper Component Logic:**
```typescript
// On mount, read org.accent_color from context
// Set CSS variables on document.documentElement
// Calculate --accent-hover (20 units darker)
// Calculate --accent-light (10% opacity)
// Re-render on accent_color change
```

**Color Calculation:**
```typescript
function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
  const b = Math.max(0, (num & 0x0000FF) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
```

**Key Files:**
- `components/ThemeWrapper.tsx` — Theme injection component
- `app/globals.css` — CSS variable definitions and component classes
- `lib/theme.ts` — Theme calculation utilities

**Acceptance Criteria:**
- [ ] ThemeWrapper sets CSS variables on mount
- [ ] All components use `var(--accent)` for primary actions
- [ ] Changing org accent color updates all pages instantly
- [ ] Wordmark renders correctly in Montserrat
- [ ] Mobile layouts use accent color correctly

**Edge Cases:**
- Invalid hex color provided → Fall back to default `#FF5F1F`
- CSS variable not set → Fallback in Tailwind config to `#FF5F1F`
- Dark mode toggle (future) → Ensure accent color works on both light and dark backgrounds

### Module 6: The Executive UI Component Library

**Purpose:** 16 reusable UI components that power both startup landing pages AND business digitization templates. Every component is drop-in ready.

**Complete Component List:**

1. **HeroSection** — Full-width hero with headline, subheadline, CTA buttons, optional badge
2. **FeaturesGrid** — 3-column feature cards with icons, titles, descriptions
3. **PricingTable** — Tiered pricing cards with highlighted tier
4. **FAQAccordion** — Collapsible FAQ items using Shadcn Accordion component
5. **WaitlistBlock** — Email capture form with accent CTA
6. **TestimonialBlock** — Testimonial cards with quotes, authors, roles
7. **StatusTracker** — Horizontal step tracker (completed/current/upcoming)
8. **ClientPortalShell** — Portal layout with sidebar navigation
9. **DocumentVault** — File upload/download interface with categories
10. **AppointmentBooking** — Calendar + time slot picker
11. **ServiceCatalog** — Service/product cards with pricing
12. **InvoicePreview** — GST-compliant invoice display
13. **WhatsAppCTA** — Inline and floating WhatsApp chat button
14. **InquiryForm** — Contact form with configurable fields
15. **ProjectProgressBar** — Vertical timeline with milestones
16. **PaymentStatusCard** — Payment details with status badge and pay button

**Component Architecture:**
- Each component is a standalone file in `components/executive/`
- Each component accepts props via TypeScript interface
- Each component uses CSS variables for accent color
- Each component has mobile-first responsive breakpoints
- Each component handles loading and error states

**FAQAccordion — Specific Implementation Reference:**
- Base component: [Shadcn UI Accordion](https://ui.shadcn.com/docs/components/accordion) — Official shadcn/ui accordion component with accessibility support
- Variant reference: [ShadcnSpace Accordion](https://shadcnspace.com/components/accordion) — Alternative styling patterns and variants
- Block patterns: [ShadcnBlocks](https://www.shadcnblocks.com/) — Pre-built accordion block patterns for FAQ sections
- Implementation: Use `@radix-ui/react-accordion` as the underlying primitive (shadcn dependency)
- Structure: Each FAQ item is an `AccordionItem` with `AccordionTrigger` (question in Montserrat 600) and `AccordionContent` (answer in Inter 400)
- Styling: border-b border-gray-200 between items, py-4 padding, accent color on expanded state
- Mobile: Full-width accordion, tap-friendly trigger areas (minimum 44px height)

**Aesthetic Enforcement:**
- All headings: Montserrat Bold/Black, tracking-tight
- All body: Inter Regular/Medium, leading-relaxed
- Primary actions: `bg-[var(--accent)] text-white`
- Separators: `border-b border-gray-200`
- Cards: `bg-white border border-gray-200 rounded-lg`
- No gradients, no decorative images, no colored backgrounds

**Key Files:**
- `components/executive/HeroSection.tsx`
- `components/executive/FeaturesGrid.tsx`
- `components/executive/PricingTable.tsx`
- `components/executive/FAQAccordion.tsx`
- `components/executive/WaitlistBlock.tsx`
- `components/executive/TestimonialBlock.tsx`
- `components/executive/StatusTracker.tsx`
- `components/executive/ClientPortalShell.tsx`
- `components/executive/DocumentVault.tsx`
- `components/executive/AppointmentBooking.tsx`
- `components/executive/ServiceCatalog.tsx`
- `components/executive/InvoicePreview.tsx`
- `components/executive/WhatsAppCTA.tsx`
- `components/executive/InquiryForm.tsx`
- `components/executive/ProjectProgressBar.tsx`
- `components/executive/PaymentStatusCard.tsx`

**Acceptance Criteria:**
- [ ] All 16 components render correctly in isolation
- [ ] All components accept accent color via CSS variables
- [ ] All components are responsive at 360px, 768px, 1440px
- [ ] Components can be composed to build complete pages
- [ ] No component uses hardcoded colors outside the aesthetic system
- [ ] Components handle empty states gracefully
- [ ] FAQAccordion uses Shadcn Accordion with accessible keyboard navigation

**Edge Cases:**
- Component receives empty data array → Show appropriate empty state message
- Component receives very long text → Truncate with ellipsis, full text on hover
- Component loads on slow network → Show skeleton loading state
- Component renders without CSS variables → Fall back to default accent color
- FAQAccordion with 20+ items → Virtualize rendering or paginate to prevent performance issues

### Module 7: The Client Portal System

**Purpose:** Provide a login-protected area where end-clients of digitized businesses can interact with the business digitally.

**Technical Specification:**

**Portal Structure:**
- Access: `{org-slug}.prxos.com/portal` or `{org-slug}.prxos.com/[orgSlug]/portal`
- Authentication required: client role or higher
- Layout: ClientPortalShell with sidebar navigation

**Portal Modules (varies by business category):**

**Common Modules (all categories):**
- Dashboard — Overview of upcoming appointments, recent documents, unread messages
- Documents — Upload and download files, view shared documents
- Messages — Send and receive messages from the business
- Invoices — View invoice history, download invoices, make payments
- Profile — Edit personal information, change password

**Category-Specific Modules:**

| Category | Additional Modules |
|----------|-------------------|
| Legal | Case Status — View case pipeline, hearing dates, lawyer notes |
| Healthcare | Appointments — Book and manage appointments; Health Records — View health goals and progress |
| Real Estate | Properties — View listed properties, shortlist; Payment Milestones — Track construction payments; Project Progress — View construction milestones |
| Education | Courses — View enrolled courses; Resources — Access study materials; Progress — View attendance and grades |
| Retail | Orders — View order history and status; Products — Browse product catalog |
| Hospitality | Reservations — Book tables/rooms; Orders — Track food orders |
| Logistics | Shipments — Track shipment status and delivery |
| Professional Services | Projects — View project milestones and status; Approvals — Review and approve designs/proposals |
| Manufacturing | Orders — Track B2B orders; Quotations — View and accept quotations |
| Financial Services | Portfolio — View investments/policies; Compliance — Access compliance documents |

**Client Registration Flow:**
1. Business owner invites client via email/SMS
2. Client receives invitation link
3. Client registers with name, email, phone, password
4. Phone OTP verification (using Supabase Phone Auth — see Module 1 references)
5. Account status: "pending" until approved by business owner
6. Once approved, client gets full portal access

**Key Files:**
- `app/[orgSlug]/portal/layout.tsx` — Portal layout wrapper
- `app/[orgSlug]/portal/page.tsx` — Portal dashboard
- `app/[orgSlug]/portal/documents/page.tsx` — Document management
- `app/[orgSlug]/portal/appointments/page.tsx` — Appointment booking
- `app/[orgSlug]/portal/messages/page.tsx` — Messaging interface
- `app/[orgSlug]/portal/invoices/page.tsx` — Invoice management
- `app/[orgSlug]/portal/register/page.tsx` — Client registration

**Acceptance Criteria:**
- [ ] Client can register via invitation link
- [ ] Client can login with email/password or phone OTP
- [ ] Client sees only their own data (not other clients')
- [ ] Client can upload and download documents
- [ ] Client can book appointments
- [ ] Client can send and receive messages
- [ ] Client can view invoices and make payments
- [ ] Portal is fully responsive at 360px viewport
- [ ] Loading states show skeleton screens for all async data

**Edge Cases:**
- Client tries to access another client's documents → RLS blocks, shows "Access denied"
- Client uploads file exceeding size limit (10MB) → Show "File too large. Maximum size is 10MB."
- Client tries to book an already-booked time slot → Show "This slot is no longer available. Please choose another time."
- Client account is pending approval → Show "Your account is pending approval. You'll receive a notification once approved."
- Client forgets password → Password reset via email link

### Module 8: Payments

**Purpose:** Enable one-time and milestone-based payment collection via Razorpay with UPI support, automatic GST invoice generation, and payment status tracking.

**Technical Specification:**

**Payment Types:**
- One-time: Single payment for a service or product
- Milestone: Payment tied to project milestones (e.g., 30% upfront, 40% mid-project, 30% on delivery)

**Razorpay Integration:**
- Order creation: Server-side API creates Razorpay order
- Checkout: Client-side Razorpay checkout opens with order details
- Webhook: Razorpay sends payment confirmation to `/api/payments/webhook`
- Verification: Server verifies payment signature before updating status
- Theme: Razorpay checkout theme color matches org accent color

**UPI Integration:**
- UPI Intent: On mobile, opens UPI app directly (Google Pay, PhonePe, Paytm)
- UPI QR Code: Desktop generates scannable QR code with UPI deep link
- UPI deep link format: `upi://pay?pa={upi_id}&pn={name}&am={amount}&tn={description}`

**GST Invoice Auto-Generation:**
- Triggered automatically on successful payment
- Invoice includes all 21 mandatory GST fields:
  1. Invoice number (format: ORG-YYYY-NNNN)
  2. Invoice date
  3. Due date (30 days from invoice date)
  4. Business name
  5. Business GSTIN
  6. Business address
  7. Business PAN
  8. Client name
  9. Client address
  10. Client GSTIN (if applicable)
  11. Item description
  12. HSN/SAC code
  13. Quantity
  14. Rate
  15. Taxable amount
  16. CGST rate and amount
  17. SGST rate and amount
  18. IGST rate and amount (for interstate)
  19. Total tax amount
  20. Grand total
  21. Terms and conditions

**Payment Status Tracking:**
- States: pending → completed / failed / refunded / cancelled
- Status updates trigger notifications (WhatsApp + email)
- Payment history visible in client portal

**Key Files:**
- `lib/razorpay.ts` — Razorpay SDK wrapper
- `app/api/payments/create-order/route.ts` — Order creation API
- `app/api/payments/webhook/route.ts` — Webhook handler
- `lib/invoice.ts` — GST invoice generation
- `components/executive/RazorpayCheckout.tsx` — Checkout component
- `components/executive/UPIQRCode.tsx` — QR code component

**Acceptance Criteria:**
- [ ] Razorpay checkout opens with correct amount and org accent color
- [ ] UPI intent flow works on mobile (Google Pay, PhonePe, Paytm)
- [ ] UPI QR code generates correct deep link on desktop
- [ ] Payment webhook updates status to "completed" on success
- [ ] Payment webhook handles failures gracefully
- [ ] GST invoice is auto-generated with all 21 mandatory fields
- [ ] Invoice is sent via email and WhatsApp to client
- [ ] Payment status is visible in client portal
- [ ] Failed payments show retry option

**Edge Cases:**
- Payment succeeds but webhook fails → Implement webhook retry (Razorpay retries up to 3 times). Also implement periodic order status polling as fallback.
- Client closes Razorpay checkout without paying → Payment remains "pending", show "Complete your payment" reminder
- Refund requested → Manual refund via Razorpay dashboard, status updates to "refunded"
- Partial payment for milestone → Create separate payment record for each milestone
- Razorpay API rate limit → Implement exponential backoff for retries
- Currency mismatch → All transactions in INR. Reject non-INR requests.

### Module 9: WhatsApp Integration

**Purpose:** Provide WhatsApp notification delivery for all critical business events — the primary communication layer for Indian market.

**Technical Specification:**

**Provider:** WhatsApp Business Cloud API (Meta)
**Phone Number ID:** Registered business phone number
**Access Token:** Meta app access token
**Template Messages:** Pre-approved templates for each notification type

**Notification Templates:**

**To Business Owner:**
1. `new_inquiry` — "New inquiry from {{1}}. Phone: {{2}}. Message: {{3}}. Log in to your dashboard to respond."
2. `appointment_booked` — "New appointment booked by {{1}} on {{2}} at {{3}}. Log in to confirm."
3. `payment_received` — "Payment of ₹{{1}} received from {{2}}. Invoice {{3}} generated."

**To End Client/Customer:**
4. `appointment_confirm` — "Your appointment with {{1}} is confirmed for {{2}} at {{3}}. Location: {{4}}."
5. `payment_receipt` — "Payment of ₹{{1}} received. Invoice {{2}} from {{3}}. Thank you!"
6. `document_shared` — "{{1}} has shared a new document: '{{2}}'. Log in to your portal to view it."
7. `status_update` — "Update from {{1}}: Your {{2}} is now '{{3}}'. Log in to your portal for details."

**Notification Flow:**
1. Event occurs in the system (inquiry submitted, appointment booked, payment received, etc.)
2. Server calls `sendWhatsAppNotification()` function
3. Function formats phone number to E.164 (+91XXXXXXXXXX)
4. Function sends POST request to WhatsApp Cloud API
5. Response logged to `whatsapp_notifications` table
6. If failed, retry after 5 minutes (max 3 retries)

**Fallback:** If WhatsApp API is unavailable or template is not approved, send SMS via alternate provider (MSG91 or TextLocal) as fallback.

**Key Files:**
- `lib/whatsapp.ts` — WhatsApp API wrapper
- `app/api/whatsapp/send/route.ts` — WhatsApp send API
- `app/api/whatsapp/webhook/route.ts` — WhatsApp webhook for delivery status

**Acceptance Criteria:**
- [ ] WhatsApp notification sent on new inquiry submission
- [ ] WhatsApp notification sent on appointment booking
- [ ] WhatsApp notification sent on payment receipt
- [ ] WhatsApp notification sent on document sharing
- [ ] WhatsApp notification sent on status update
- [ ] Failed notifications are retried (max 3 times)
- [ ] All notifications logged in database
- [ ] Phone number formatted correctly to E.164

**Edge Cases:**
- WhatsApp template not yet approved → Fall back to SMS or email notification
- Phone number invalid → Log error, skip notification, alert business owner
- WhatsApp API rate limited (800 messages/minute for tier 1) → Queue notifications, send in batches
- Recipient has blocked business number → Log "failed" status, alert business owner
- Message contains special characters → URL-encode template variables

### Module 10: Email System

**Purpose:** Transactional email delivery for welcome emails, appointment confirmations, payment receipts, status updates, document delivery, and invoice emails.

**Technical Specification:**
- Provider: Resend API
- From address: Configurable per org, default `noreply@prxos.com`
- Template system: HTML templates with variable injection
- Delivery tracking: Resend provides delivery status via webhook

**Email Templates:**
1. `welcome` — Sent to new client upon portal registration
2. `appointment-confirm` — Sent when appointment is booked/confirmed
3. `payment-receipt` — Sent after successful payment
4. `status-update` — Sent when case/order/project status changes
5. `document-delivery` — Sent when a document is shared
6. `invoice` — Sent with invoice PDF attachment

**Template Structure:**
- Header: Business wordmark (Montserrat 800), accent color underline
- Body: Inter font, line-height 1.6, max-width 600px
- CTA button: Accent color, rounded corners
- Footer: Business contact info, unsubscribe link, "Powered by PRX OS"

**Key Files:**
- `lib/email.ts` — Resend API wrapper
- `lib/email-templates.ts` — HTML template definitions
- `app/api/email/send/route.ts` — Email send API

**Acceptance Criteria:**
- [ ] Welcome email sent on client registration
- [ ] Appointment confirmation email sent on booking
- [ ] Payment receipt email sent after payment
- [ ] Invoice email sent with PDF attachment
- [ ] All emails render correctly on Gmail, Outlook, Apple Mail
- [ ] All emails are responsive on mobile email clients

**Edge Cases:**
- Email delivery fails → Log error, retry after 5 minutes
- Recipient email bounces → Mark email as "bounced", notify business owner
- Email template variable missing → Show placeholder text "[Variable Name]"
- Email sent to wrong recipient → Implement double-check on recipient email before sending

### Module 11: SEO Engine

**Purpose:** Automatic SEO optimization for all org-generated pages including dynamic meta tags, OG images, sitemaps, and JSON-LD structured data for local businesses.

**Technical Specification:**

**Dynamic Meta Tags (per org):**
- `<title>`: `{org_name} — {tagline}`
- `<meta name="description">`: Auto-generated from org description or page content
- `<meta name="keywords">`: Category-specific keywords
- `<meta name="robots">`: `index, follow`

**OG Image Generation:**
- Route: `/api/og?title={org_name}&accent={accent_color}`
- Returns: 1200x630px PNG image
- Design: Dark background (#121212), org name in Montserrat Black (white), accent color underline

**Sitemap Generation:**
- Route: `/{org-slug}/sitemap.xml`
- Includes all published pages for the org
- Auto-regenerates when pages are published/unpublished

**JSON-LD Structured Data:**
- Type: Based on business category (LegalService, MedicalClinic, RealEstateAgent, etc.)
- Properties: name, url, telephone, email, address, openingHours, taxID (GSTIN)
- Critical for "near me" and local business searches on Google

**Key Files:**
- `lib/seo.ts` — SEO metadata generation
- `app/api/og/route.tsx` — OG image generation
- `app/[orgSlug]/sitemap.xml/route.ts` — Sitemap generation
- `app/[orgSlug]/layout.tsx` — Metadata injection

**Acceptance Criteria:**
- [ ] Meta tags are org-specific and unique
- [ ] OG image generates correctly with org name and accent color
- [ ] OG image passes Twitter Card Validator
- [ ] Sitemap.xml includes all published pages
- [ ] JSON-LD structured data renders correctly for each category
- [ ] Google Rich Results Test passes for structured data

**Edge Cases:**
- Org has no tagline → Use default: "Professional services by {org_name}"
- OG image generation fails → Fallback to default PRX OS OG image
- Sitemap has no published pages → Return minimal sitemap with just root URL
- JSON-LD missing required fields → Omit optional fields, include only available data

### Module 12: Analytics

**Purpose:** Track user behavior, conversion funnels, and per-org metrics using PostHog for data-driven product decisions.

**Technical Specification:**
- Provider: PostHog (self-hosted option available later)
- SDK: `posthog-js` for client-side tracking
- Server-side: PostHog Python SDK for server events
- Event naming: `SNACK_CASE` convention (e.g., `org_created`, `waitlist_submitted`)

**Event Tracking:**
```typescript
export const EVENTS = {
  ORG_CREATED: 'org_created',
  LANDING_PAGE_VIEWED: 'landing_page_viewed',
  WAITLIST_SUBMITTED: 'waitlist_submitted',
  PROJECT_CREATED: 'project_created',
  BUSINESS_DIGITIZED: 'business_digitized',
  CLIENT_REGISTERED: 'client_registered',
  APPOINTMENT_BOOKED: 'appointment_booked',
  DOCUMENT_UPLOADED: 'document_uploaded',
  INQUIRY_SUBMITTED: 'inquiry_submitted',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  INVOICE_GENERATED: 'invoice_generated',
  WHATSAPP_NOTIFICATION_SENT: 'whatsapp_notification_sent',
};
```

**Per-Org Analytics Isolation:**
- All events include `org_id` as a property
- Dashboard filters by org_id
- Business owners see only their org's analytics
- PRX OS admin sees aggregated analytics across all orgs

**Funnels to Track:**
1. Signup → Org Creation → First Project → First Waitlist Signup
2. Business Category Selection → Info Entry → Deployment → First Client Registration
3. Appointment Booking → Payment Initiation → Payment Completion

**Key Files:**
- `lib/analytics.ts` — PostHog initialization and event tracking
- `app/providers.tsx` — Analytics provider wrapper
- `app/(dashboard)/admin/analytics/page.tsx` — Admin analytics dashboard

**Acceptance Criteria:**
- [ ] All defined events are tracked correctly
- [ ] Events include org_id property
- [ ] Funnel reports are accurate
- [ ] Per-org analytics isolation works
- [ ] Analytics does not impact page load performance

**Edge Cases:**
- PostHog API unavailable → Queue events locally, send when available
- User opts out of analytics → Respect Do Not Track, disable tracking
- Event payload exceeds size limit → Truncate large properties, log warning

### Module 13: Admin God Mode

**Purpose:** Cross-project dashboard for the PRX OS owner showing all organizations, total users, revenue across all projects, and health status of each deployment.

**Technical Specification:**
- Access: Restricted to root admin (founder) only
- Route: `/admin`
- Data: Aggregated from all organizations

**Sections:**
1. **Overview Metrics:**
   - Total Organizations (count)
   - Total Active Users (count)
   - Total Waitlist Signups (count)
   - Total Revenue (INR sum)

2. **Organizations Table:**
   - Columns: Name, Slug, Category, Created, Status, Members, Revenue
   - Sortable by date, name
   - Filter by category, status
   - Click to drill into org details

3. **Recent Activity Feed:**
   - Timeline of recent events across all orgs
   - Event types: org created, waitlist signup, payment received, business digitized

4. **Health Status:**
   - Per-org health indicator (green/yellow/red)
   - Green: no errors in last 24 hours
   - Yellow: warnings (high payment failure rate, low activity)
   - Red: errors (webhook failures, database errors)

**Key Files:**
- `app/(dashboard)/admin/page.tsx` — Admin dashboard
- `app/api/admin/metrics/route.ts` — Metrics API
- `app/api/admin/orgs/route.ts` — Organizations list API
- `app/api/admin/health/route.ts` — Health status API

**Acceptance Criteria:**
- [ ] Admin dashboard loads with accurate metrics
- [ ] Organizations table shows all orgs with correct data
- [ ] Recent activity feed updates in real-time
- [ ] Health status indicators are accurate
- [ ] Only root admin can access admin routes
- [ ] Dashboard is responsive at 360px viewport

**Edge Cases:**
- Database query timeout for metrics → Show cached data with "Last updated: X minutes ago"
- Health check fails for an org → Show "Unable to determine health status" with retry
- Admin tries to access admin route without root admin role → 403 Forbidden

---

## 4. COMPLETE LOGIC FLOWS

### Startup Spawner Flow

```
1. User clicks "New Project" button in dashboard
   ↓
2. CreateProjectModal opens at Step 1 (Project Type)
   ↓
3. User selects "New Startup"
   ↓
4. Modal advances to Step 2 (Brand Configuration)
   ↓
5. User enters: Project Name, URL Slug (auto-generated), Accent Color, Tagline
   ↓
6. Real-time validation:
   - Name: required, max 50 chars
   - Slug: required, unique, alphanumeric + hyphens, 3-30 chars
   - Color: valid hex format
   ↓
7. User clicks "Next" → Step 3 (Feature Selection)
   ↓
8. User selects features (waitlist, pricing, FAQ checked by default)
   ↓
9. User clicks "Create Project"
   ↓
10. System calls create_organization() RPC:
    - Creates org record with name, slug, accent_color
    - Creates org_membership with role "owner"
    ↓
11. System calls create_landing_page() RPC:
    - Creates landing page record
    - Creates default page components (Hero, Features, Waitlist, Testimonials, FAQ)
    ↓
12. System generates OG image via /api/og
    ↓
13. System generates favicon via /api/favicon
    ↓
14. Modal shows success state: "Your startup is live!" with preview link
    ↓
15. User clicks preview link → redirected to /{org-slug}
    ↓
16. Landing page renders with org-specific theme, components, and SEO tags
    ↓
17. Visitor fills waitlist form → saved to waitlist_entries table
    ↓
18. User sees waitlist signup in dashboard
```

### Business Digitizer Flow

```
1. User clicks "New Project" button in dashboard
   ↓
2. CreateProjectModal opens at Step 1 (Project Type)
   ↓
3. User selects "Digitize a Business"
   ↓
4. Modal switches to DigitizeBusinessModal at Step 1 (Category Selection)
   ↓
5. User selects business category from 10 options
   ↓
6. Modal advances to Step 2 (Business Information)
   ↓
7. User enters: Business Name, Phone, Email, Address, WhatsApp Number, GSTIN, Working Hours
   ↓
8. Real-time validation:
   - All required fields filled
   - Phone in E.164 format
   - Email valid format
   - GSTIN valid format (if provided)
   ↓
9. User clicks "Next" → Step 3 (Brand Configuration)
   ↓
10. User enters: Slug (auto-generated), Accent Color
    ↓
11. User clicks "Next" → Step 4 (Review & Deploy)
    ↓
12. Summary card displays all entered information
    ↓
13. User clicks "Deploy Now"
    ↓
14. System creates organization
    ↓
15. System creates business_config with category and business details
    ↓
16. System loads category-specific template from lib/templates.ts
    ↓
17. System creates pages with category-specific component configurations
    ↓
18. System seeds service_catalog with default services
    ↓
19. System generates OG image and favicon
    ↓
20. System connects WhatsApp number
    ↓
21. Modal shows success state with:
    - Public website URL
    - Client portal URL
    - Admin dashboard URL
    - Next steps checklist
    ↓
22. Business owner receives welcome email with login credentials
    ↓
23. Business owner receives WhatsApp notification: "Your business portal is live!"
    ↓
24. Business owner logs in, configures services, invites first clients
    ↓
25. Client registers via invitation link
    ↓
26. Client logs in, books appointment
    ↓
27. Business owner receives WhatsApp: "New appointment booked by {client}"
    ↓
28. Client receives WhatsApp: "Your appointment is confirmed for {date} at {time}"
    ↓
29. Client pays via UPI
    ↓
30. GST invoice auto-generated and sent via email + WhatsApp
```

---

**END OF FILE 3: MASTER PRODUCT REQUIREMENTS DOCUMENT**
