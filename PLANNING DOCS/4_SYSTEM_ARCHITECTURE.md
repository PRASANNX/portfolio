# PRX STARTUP OS — FILE 4: SYSTEM ARCHITECTURE

**Version:** 2.0 | **Classification:** Founding Document  
**Author:** Principal Product Strategist | **Audience:** Engineering Team, Antigravity Coding Agent  
**Purpose:** Complete technical architecture — folder structure, database schema, RLS policies, API routes, integration patterns, and deployment configuration.

---

## 0. KEY TECHNICAL REFERENCES

### Phone Authentication References (Used in Auth Module)
- [Supabase Phone Login Official Docs](https://supabase.com/docs/guides/auth/phone-login) — Primary implementation reference for Supabase phone auth
- [Phone Authentication with Twilio, NextJS and Supabase (HackerOne)](https://www.hackerone.com/blog/phone-authentication-twilio-nextjs-and-supabase) — Security considerations and implementation patterns
- [OTP Authentication with Supabase and Twilio in React (Refine.dev)](https://refine.dev/blog/supabase-twilio-otp-authentication-in-react/) — Complete tutorial with React integration and OTP verification UI
- [Supabase Custom Phone Auth Provider Discussion (GitHub)](https://github.com/orgs/supabase/discussions/14774) — Community discussion on integrating custom phone auth providers
- [Supabase Twilio Phone Auth (Stack Overflow)](https://stackoverflow.com/questions/74793778/supabase-twilio-phone-auth) — Common implementation issues and solutions

### Shadcn UI Component References (Used in UI Library)
- [Shadcn UI Official Components](https://ui.shadcn.com/docs/components) — Full component library documentation
- [Shadcn Accordion Component](https://ui.shadcn.com/docs/components/accordion) — Official accordion docs (used for FAQAccordion)
- [Shadcn Accordion Variants](https://shadcnspace.com/components/accordion) — Alternative styling patterns
- [Shadcn Accordion Blocks](https://www.shadcnblocks.com/) — Pre-built accordion block patterns for FAQ sections
- [Shadcn Accordion UIKit](https://shadcnuikit.com/components/accordion) — Additional accordion variants
- [Shadcn Accordion Design](https://www.shadcndesign.com/components/accordion) — Design-focused accordion patterns

---

## 1. COMPLETE NEXT.JS APP ROUTER FOLDER STRUCTURE

```
prx-os/
├── app/
│   ├── (auth)/                          # Auth routes (no dashboard layout)
│   │   ├── login/
│   │   │   └── page.tsx                 # Login page
│   │   ├── signup/
│   │   │   └── page.tsx                 # Signup page
│   │   ├── forgot-password/
│   │   │   └── page.tsx                 # Password reset request
│   │   ├── reset-password/
│   │   │   └── page.tsx                 # Password reset form (with token)
│   │   ├── verify-phone/
│   │   │   └── page.tsx                 # Phone OTP verification
│   │   └── layout.tsx                   # Auth layout: centered card on charcoal bg
│   │
│   ├── (dashboard)/                     # Dashboard routes (authenticated)
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # Main dashboard home
│   │   ├── settings/
│   │   │   └── page.tsx                 # Org settings
│   │   ├── billing/
│   │   │   └── page.tsx                 # Billing and subscription
│   │   ├── members/
│   │   │   └── page.tsx                 # Member management
│   │   ├── [orgId]/
│   │   │   ├── inquiries/
│   │   │   │   └── page.tsx             # Inquiry management
│   │   │   ├── services/
│   │   │   │   └── page.tsx             # Service catalog management
│   │   │   ├── documents/
│   │   │   │   └── page.tsx             # Document management
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx             # Appointment management
│   │   │   ├── invoices/
│   │   │   │   └── page.tsx             # Invoice management
│   │   │   └── clients/
│   │   │       └── page.tsx             # Client management
│   │   ├── admin/
│   │   │   ├── page.tsx                 # Admin God Mode dashboard
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx             # Cross-org analytics
│   │   │   └── health/
│   │   │       └── page.tsx             # System health monitoring
│   │   ├── layout.tsx                   # Dashboard layout: sidebar + header
│   │   └── components/
│   │       ├── DashboardShell.tsx       # Dashboard wrapper with sidebar
│   │       ├── Sidebar.tsx              # Navigation sidebar
│   │       ├── Header.tsx               # Top header with org switcher
│   │       ├── CreateProjectModal.tsx   # Startup spawner modal
│   │       ├── DigitizeBusinessModal.tsx# Business digitizer modal
│   │       └── OrgProvider.tsx          # Organization context provider
│   │
│   ├── (public)/                        # Public-facing routes
│   │   ├── layout.tsx                   # Public layout: minimal, no sidebar
│   │   └── page.tsx                     # PRX OS landing page (marketing)
│   │
│   ├── [orgSlug]/                       # Dynamic org routes (public pages)
│   │   ├── layout.tsx                   # Org layout with ThemeWrapper
│   │   ├── page.tsx                     # Landing page (home)
│   │   ├── sitemap.xml/
│   │   │   └── route.ts                 # Per-org sitemap
│   │   ├── portal/                      # Client portal routes
│   │   │   ├── layout.tsx               # Portal layout with ClientPortalShell
│   │   │   ├── page.tsx                 # Portal dashboard
│   │   │   ├── register/
│   │   │   │   └── page.tsx             # Client registration
│   │   │   ├── documents/
│   │   │   │   └── page.tsx             # Client document vault
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx             # Client appointment booking
│   │   │   ├── messages/
│   │   │   │   └── page.tsx             # Client messaging
│   │   │   ├── invoices/
│   │   │   │   └── page.tsx             # Client invoice view
│   │   │   └── profile/
│   │   │       └── page.tsx             # Client profile settings
│   │   └── [pageSlug]/                  # Dynamic page routes
│   │       └── page.tsx                 # Renders page components
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts             # OAuth callback handler
│   │   ├── org/
│   │   │   ├── route.ts                 # GET/POST organizations
│   │   │   └── members/
│   │   │       └── route.ts             # Member management
│   │   ├── projects/
│   │   │   └── create/
│   │   │       └── route.ts             # Project creation
│   │   ├── businesses/
│   │   │   └── deploy/
│   │   │       └── route.ts             # Business deployment
│   │   ├── payments/
│   │   │   ├── create-order/
│   │   │   │   └── route.ts             # Razorpay order creation
│   │   │   ├── verify/
│   │   │   │   └── route.ts             # Payment verification
│   │   │   └── webhook/
│   │   │       └── route.ts             # Razorpay webhook handler
│   │   ├── whatsapp/
│   │   │   ├── send/
│   │   │   │   └── route.ts             # Send WhatsApp message
│   │   │   └── webhook/
│   │   │       └── route.ts             # WhatsApp delivery status webhook
│   │   ├── email/
│   │   │   └── send/
│   │   │       └── route.ts             # Send transactional email
│   │   ├── waitlist/
│   │   │   └── route.ts                 # Waitlist submission
│   │   ├── og/
│   │   │   └── route.tsx                # OG image generation
│   │   └── favicon/
│   │       └── route.tsx                # Favicon generation
│   │
│   ├── globals.css                      # Global styles + CSS variables
│   ├── layout.tsx                       # Root layout with fonts and providers
│   ├── middleware.ts                     # Auth + org context middleware
│   └── providers.tsx                    # PostHog, theme, and auth providers
│
├── components/
│   ├── ui/                              # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── separator.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── sheet.tsx
│   │   ├── alert.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── accordion.tsx                # Shadcn Accordion — ref: https://ui.shadcn.com/docs/components/accordion
│   │   ├── avatar.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── calendar.tsx
│   │   └── table.tsx
│   │
│   ├── executive/                       # Executive UI component library
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── PricingTable.tsx
│   │   ├── FAQAccordion.tsx             # Uses Shadcn Accordion underneath
│   │   ├── WaitlistBlock.tsx
│   │   ├── TestimonialBlock.tsx
│   │   ├── StatusTracker.tsx
│   │   ├── ClientPortalShell.tsx
│   │   ├── DocumentVault.tsx
│   │   ├── AppointmentBooking.tsx
│   │   ├── ServiceCatalog.tsx
│   │   ├── InvoicePreview.tsx
│   │   ├── WhatsAppCTA.tsx
│   │   ├── InquiryForm.tsx
│   │   ├── ProjectProgressBar.tsx
│   │   └── PaymentStatusCard.tsx
│   │
│   └── ThemeWrapper.tsx                 # Dynamic theme injection
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                    # Browser Supabase client
│   │   ├── server.ts                    # Server Supabase client
│   │   └── middleware.ts                # Supabase middleware helpers
│   ├── supabase/
│   │   └── auth.ts                      # Phone OTP auth helpers — ref: https://supabase.com/docs/guides/auth/phone-login
│   ├── analytics.ts                     # PostHog initialization and tracking
│   ├── razorpay.ts                      # Razorpay SDK wrapper
│   ├── whatsapp.ts                      # WhatsApp Business API wrapper
│   ├── email.ts                         # Resend email wrapper
│   ├── email-templates.ts               # HTML email templates
│   ├── invoice.ts                       # GST invoice generation
│   ├── seo.ts                           # SEO metadata generation
│   ├── theme.ts                         # Theme calculation utilities
│   ├── templates.ts                     # Business template configurations
│   ├── spawner.ts                       # Startup spawner orchestration
│   ├── utils.ts                         # Shared utility functions
│   └── constants.ts                     # App-wide constants
│
├── types/
│   └── database.ts                      # TypeScript database types
│
├── public/
│   └── fonts/                           # Self-hosted font files (optional)
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql       # Sprint 1: Auth, orgs, RLS
│   │   ├── 002_startup_spawner.sql      # Sprint 2: Pages, components
│   │   ├── 003_ui_library.sql           # Sprint 3: Additional tables
│   │   ├── 004_business_digitizer.sql   # Sprint 4: Business tables
│   │   └── 005_revenue_layer.sql        # Sprint 5: Payments, invoices
│   └── seed.sql                         # Seed data for development
│
├── .env.local                           # Environment variables (gitignored)
├── .env.example                         # Environment variable template
├── next.config.js                       # Next.js configuration
├── tailwind.config.ts                   # Tailwind configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies
├── postcss.config.js                    # PostCSS configuration
├── components.json                      # Shadcn configuration
└── middleware.ts                        # Route middleware
```

### Folder Structure Explanation

| Folder | Purpose | Why |
|--------|---------|-----|
| `(auth)/` | Route group for authentication pages | Shares layout, excluded from dashboard navigation |
| `(dashboard)/` | Route group for authenticated dashboard | Protected by middleware, shares sidebar/header layout |
| `(public)/` | Route group for public marketing pages | No auth required, minimal layout |
| `[orgSlug]/` | Dynamic route for org-specific public pages | Enables `/{org-slug}` URL pattern for landing pages |
| `[orgSlug]/portal/` | Client portal routes under org | Enables `/{org-slug}/portal` for end-client access |
| `api/` | API routes for server-side operations | Next.js App Router API endpoints |
| `components/ui/` | Shadcn UI primitives | Reusable base components from https://ui.shadcn.com/docs/components |
| `components/executive/` | PRX-specific UI components | Domain-specific components that compose pages |
| `lib/` | Utility functions and service wrappers | Business logic separated from UI |
| `lib/supabase/auth.ts` | Phone OTP auth helpers | Reference: https://supabase.com/docs/guides/auth/phone-login |
| `supabase/migrations/` | Database migration files | Version-controlled schema changes |
| `types/` | TypeScript type definitions | Type safety across the application |

---

## 2. COMPLETE SUPABASE DATABASE SCHEMA

### Table Definitions

#### profiles
Extends Supabase auth.users with additional user information.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK, FK → auth.users(id) ON DELETE CASCADE | — | Links to Supabase auth user |
| email | TEXT | NOT NULL | — | User email address |
| full_name | TEXT | — | NULL | User's display name |
| phone | TEXT | — | NULL | Phone number in E.164 format |
| avatar_url | TEXT | — | NULL | Profile picture URL |
| created_at | TIMESTAMPTZ | — | NOW() | Account creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

#### organizations
Core multi-tenant entity. Every project/business is an organization.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Unique organization ID |
| name | TEXT | NOT NULL | — | Organization/business name |
| slug | TEXT | UNIQUE, NOT NULL | — | URL-safe identifier |
| accent_color | TEXT | — | '#FF5F1F' | Brand accent color (hex) |
| logo_url | TEXT | — | NULL | Logo URL (optional) |
| is_active | BOOLEAN | — | true | Whether org is active |
| billing_tier | TEXT | CHECK (billing_tier IN ('free','starter','professional','enterprise')) | 'free' | Subscription tier |
| created_by | UUID | FK → profiles(id) | — | Creator user ID |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

#### org_memberships
Links users to organizations with role-based access control.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Membership ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| user_id | UUID | FK → profiles(id) ON DELETE CASCADE, NOT NULL | — | User reference |
| role | TEXT | NOT NULL, CHECK (role IN ('owner','admin','staff','client')) | — | Access role |
| status | TEXT | CHECK (status IN ('active','pending','suspended')) | 'active' | Membership status |
| invited_by | UUID | FK → profiles(id) | NULL | Who invited this member |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| UNIQUE(org_id, user_id) | — | — | — | Prevents duplicate memberships |

#### pages
Stores page configurations for org landing pages.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Page ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| page_type | TEXT | NOT NULL, CHECK (page_type IN ('landing','pricing','faq','contact','blog','custom')) | — | Type of page |
| slug | TEXT | NOT NULL | — | URL slug for the page |
| is_published | BOOLEAN | — | false | Whether page is live |
| config | JSONB | NOT NULL | '{}' | Page-level configuration |
| seo_title | TEXT | — | NULL | SEO title override |
| seo_description | TEXT | — | NULL | SEO description override |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |
| UNIQUE(org_id, slug) | — | — | — | Prevents duplicate slugs per org |

#### page_components
Individual component configurations within a page.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Component ID |
| page_id | UUID | FK → pages(id) ON DELETE CASCADE, NOT NULL | — | Parent page reference |
| component_type | TEXT | NOT NULL | — | Component identifier (e.g., 'HeroSection') |
| sort_order | INTEGER | NOT NULL | 0 | Rendering order |
| config | JSONB | NOT NULL | '{}' | Component-specific configuration |
| is_visible | BOOLEAN | — | true | Whether component is shown |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |

#### waitlist_entries
Stores waitlist signups for startup projects.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Entry ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| email | TEXT | NOT NULL | — | Waitlist email |
| name | TEXT | — | NULL | Waitlist name |
| source | TEXT | — | 'organic' | Signup source |
| status | TEXT | CHECK (status IN ('pending','contacted','converted','rejected')) | 'pending' | Follow-up status |
| metadata | JSONB | — | '{}' | Additional data |
| created_at | TIMESTAMPTZ | — | NOW() | Signup timestamp |

#### business_categories
Template definitions for the 10 business digitization categories.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Category ID |
| slug | TEXT | UNIQUE, NOT NULL | — | URL-safe identifier |
| name | TEXT | NOT NULL | — | Display name |
| description | TEXT | — | NULL | Category description |
| icon | TEXT | — | NULL | Lucide icon name |
| default_config | JSONB | NOT NULL | '{}' | Default template configuration |
| is_active | BOOLEAN | — | true | Whether category is available |

#### business_configs
Per-organization business settings for digitized businesses.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Config ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, UNIQUE, NOT NULL | — | Organization reference |
| category_id | UUID | FK → business_categories(id) | NULL | Business category |
| phone | TEXT | — | NULL | Business phone |
| email | TEXT | — | NULL | Business email |
| address | TEXT | — | NULL | Business address |
| whatsapp_number | TEXT | — | NULL | WhatsApp Business number |
| working_hours | JSONB | — | NULL | Operating hours config |
| gstin | TEXT | — | NULL | GST identification number |
| custom_config | JSONB | — | '{}' | Category-specific settings |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

#### appointments
Appointment bookings for service businesses.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Appointment ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| client_id | UUID | FK → profiles(id) | NULL | Client who booked |
| title | TEXT | NOT NULL | — | Appointment title |
| description | TEXT | — | NULL | Additional details |
| start_time | TIMESTAMPTZ | NOT NULL | — | Appointment start |
| end_time | TIMESTAMPTZ | NOT NULL | — | Appointment end |
| status | TEXT | CHECK (status IN ('pending','confirmed','completed','cancelled','no_show')) | 'pending' | Appointment status |
| notes | TEXT | — | NULL | Internal notes |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

#### service_catalog
Business service/product listings.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Service ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| name | TEXT | NOT NULL | — | Service name |
| description | TEXT | — | NULL | Service description |
| category | TEXT | — | NULL | Service category |
| price | NUMERIC(10, 2) | — | NULL | Service price |
| duration_minutes | INTEGER | — | NULL | Service duration |
| is_active | BOOLEAN | — | true | Whether service is listed |
| sort_order | INTEGER | — | 0 | Display order |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |

#### documents
File management for document vault.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Document ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| uploaded_by | UUID | FK → profiles(id) | NULL | Who uploaded |
| client_id | UUID | FK → profiles(id) | NULL | Client this doc is for |
| name | TEXT | NOT NULL | — | File display name |
| file_path | TEXT | NOT NULL | — | Supabase Storage path |
| file_type | TEXT | — | NULL | MIME type |
| file_size | BIGINT | — | NULL | File size in bytes |
| category | TEXT | — | NULL | Document category |
| is_shared_with_client | BOOLEAN | — | false | Whether client can access |
| created_at | TIMESTAMPTZ | — | NOW() | Upload timestamp |

#### client_messages
In-portal messaging between business and clients.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Message ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| sender_id | UUID | FK → profiles(id), NOT NULL | — | Message sender |
| recipient_id | UUID | FK → profiles(id) | NULL | Message recipient |
| content | TEXT | NOT NULL | — | Message content |
| is_read | BOOLEAN | — | false | Whether message is read |
| created_at | TIMESTAMPTZ | — | NOW() | Send timestamp |

#### inquiries
Lead/inquiry capture from public website forms.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Inquiry ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| name | TEXT | NOT NULL | — | Inquirer name |
| email | TEXT | — | NULL | Inquirer email |
| phone | TEXT | — | NULL | Inquirer phone |
| message | TEXT | NOT NULL | — | Inquiry message |
| status | TEXT | CHECK (status IN ('new','contacted','qualified','converted','lost')) | 'new' | Inquiry status |
| assigned_to | UUID | FK → profiles(id) | NULL | Assigned staff member |
| created_at | TIMESTAMPTZ | — | NOW() | Submission timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

#### payments
Payment transaction records.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Payment ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| client_id | UUID | FK → profiles(id) | NULL | Paying client |
| razorpay_order_id | TEXT | UNIQUE | NULL | Razorpay order reference |
| razorpay_payment_id | TEXT | — | NULL | Razorpay payment reference |
| razorpay_signature | TEXT | — | NULL | Payment verification signature |
| amount | NUMERIC(10, 2) | NOT NULL | — | Payment amount |
| currency | TEXT | — | 'INR' | Currency code |
| type | TEXT | NOT NULL, CHECK (type IN ('one-time','milestone','subscription')) | — | Payment type |
| status | TEXT | CHECK (status IN ('pending','completed','failed','refunded','cancelled')) | 'pending' | Payment status |
| description | TEXT | — | NULL | Payment description |
| metadata | JSONB | — | '{}' | Additional payment data |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

#### invoices
GST-compliant invoice records.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Invoice ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| invoice_number | TEXT | NOT NULL | — | Unique invoice number |
| invoice_date | DATE | NOT NULL | CURRENT_DATE | Invoice date |
| due_date | DATE | — | NULL | Payment due date |
| client_id | UUID | FK → profiles(id) | NULL | Billed client |
| client_name | TEXT | NOT NULL | — | Client name |
| client_email | TEXT | — | NULL | Client email |
| client_phone | TEXT | — | NULL | Client phone |
| client_address | TEXT | — | NULL | Client address |
| client_gstin | TEXT | — | NULL | Client GSTIN (B2B) |
| business_name | TEXT | NOT NULL | — | Business name |
| business_gstin | TEXT | — | NULL | Business GSTIN |
| business_address | TEXT | — | NULL | Business address |
| business_pan | TEXT | — | NULL | Business PAN |
| items | JSONB | NOT NULL | — | Line items array |
| subtotal | NUMERIC(10, 2) | NOT NULL | — | Pre-tax total |
| cgst_total | NUMERIC(10, 2) | — | 0 | CGST amount |
| sgst_total | NUMERIC(10, 2) | — | 0 | SGST amount |
| igst_total | NUMERIC(10, 2) | — | 0 | IGST amount (interstate) |
| discount_total | NUMERIC(10, 2) | — | 0 | Total discount |
| grand_total | NUMERIC(10, 2) | NOT NULL | — | Final total with tax |
| status | TEXT | CHECK (status IN ('unpaid','paid','partial','overdue','cancelled')) | 'unpaid' | Invoice status |
| payment_id | UUID | FK → payments(id) | NULL | Linked payment |
| notes | TEXT | — | NULL | Invoice notes |
| terms | TEXT | — | NULL | Payment terms |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |
| UNIQUE(org_id, invoice_number) | — | — | — | Prevents duplicate invoice numbers |

#### whatsapp_notifications
Log of all WhatsApp notifications sent.

| Column | Type | Constraint | Default | Description |
|--------|------|------------|---------|-------------|
| id | UUID | PK | uuid_generate_v4() | Notification ID |
| org_id | UUID | FK → organizations(id) ON DELETE CASCADE, NOT NULL | — | Organization reference |
| recipient_phone | TEXT | NOT NULL | — | Recipient phone (E.164) |
| template_name | TEXT | NOT NULL | — | WhatsApp template name |
| template_data | JSONB | — | '{}' | Template variables |
| status | TEXT | CHECK (status IN ('pending','sent','delivered','read','failed')) | 'pending' | Delivery status |
| message_sid | TEXT | — | NULL | WhatsApp message ID |
| error_message | TEXT | — | NULL | Error details if failed |
| created_at | TIMESTAMPTZ | — | NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | — | NOW() | Last update timestamp |

### Index Strategy

| Table | Index | Why |
|-------|-------|-----|
| org_memberships | `idx_org_memberships_org_id` on (org_id) | Fast membership lookup by org |
| org_memberships | `idx_org_memberships_user_id` on (user_id) | Fast org lookup by user |
| pages | `idx_pages_org_id` on (org_id) | Fast page lookup by org |
| pages | `idx_pages_org_published` on (org_id, is_published) | Fast published page queries |
| page_components | `idx_page_components_page_id` on (page_id) | Fast component lookup by page |
| waitlist_entries | `idx_waitlist_entries_org_id` on (org_id) | Fast waitlist by org |
| waitlist_entries | `idx_waitlist_entries_email` on (email) | Duplicate email detection |
| waitlist_entries | `idx_waitlist_entries_org_status` on (org_id, status) | Filtered waitlist queries |
| appointments | `idx_appointments_org_id` on (org_id) | Fast appointments by org |
| appointments | `idx_appointments_client_id` on (client_id) | Fast appointments by client |
| appointments | `idx_appointments_status` on (status) | Status filtering |
| appointments | `idx_appointments_start_time` on (start_time) | Time-based queries |
| service_catalog | `idx_service_catalog_org_id` on (org_id) | Fast catalog by org |
| documents | `idx_documents_org_id` on (org_id) | Fast documents by org |
| documents | `idx_documents_client_id` on (client_id) | Fast documents by client |
| client_messages | `idx_client_messages_org_id` on (org_id) | Fast messages by org |
| client_messages | `idx_client_messages_sender` on (sender_id) | Fast messages by sender |
| inquiries | `idx_inquiries_org_id` on (org_id) | Fast inquiries by org |
| inquiries | `idx_inquiries_status` on (status) | Status filtering |
| payments | `idx_payments_org_id` on (org_id) | Fast payments by org |
| payments | `idx_payments_client_id` on (client_id) | Fast payments by client |
| payments | `idx_payments_status` on (status) | Status filtering |
| payments | `idx_payments_razorpay_order_id` on (razorpay_order_id) | Webhook lookup |
| invoices | `idx_invoices_org_id` on (org_id) | Fast invoices by org |
| invoices | `idx_invoices_client_id` on (client_id) | Fast invoices by client |
| invoices | `idx_invoices_status` on (status) | Status filtering |
| invoices | `idx_invoices_invoice_number` on (org_id, invoice_number) | Invoice number uniqueness |
| whatsapp_notifications | `idx_whatsapp_notifications_org_id` on (org_id) | Fast logs by org |
| whatsapp_notifications | `idx_whatsapp_notifications_status` on (status) | Status filtering |

### Database Functions and Triggers

#### handle_new_user()
Auto-creates a profile record when a new user signs up via Supabase Auth.
```sql
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

#### update_updated_at_column()
Auto-updates the `updated_at` column on any row modification.
```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Applied to: profiles, organizations, business_configs, appointments, inquiries, payments, invoices, whatsapp_notifications
```

#### create_organization()
Creates an organization and auto-assigns the creator as owner.
```sql
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
```

#### create_landing_page()
Auto-generates a landing page with default components for a new organization.
```sql
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
  INSERT INTO public.pages (org_id, page_type, slug, is_published, seo_title, seo_description)
  VALUES (p_org_id, 'landing', 'home', true, p_org_name, 'Join ' || p_org_name || ' — Early access waitlist')
  RETURNING id INTO v_page_id;

  INSERT INTO public.page_components (page_id, component_type, sort_order, config) VALUES
    (v_page_id, 'HeroSection', 1, jsonb_build_object('headline', 'Build Something Extraordinary', 'subheadline', p_org_name || ' is the future of your industry.', 'cta_text', 'Join Waitlist')),
    (v_page_id, 'FeaturesGrid', 2, jsonb_build_object('title', 'Why Choose Us', 'features', '[]'::jsonb)),
    (v_page_id, 'WaitlistBlock', 3, jsonb_build_object('title', 'Get Early Access', 'subtitle', 'Be among the first to experience ' || p_org_name)),
    (v_page_id, 'TestimonialBlock', 4, jsonb_build_object('title', 'What People Are Saying', 'testimonials', '[]'::jsonb)),
    (v_page_id, 'FAQAccordion', 5, jsonb_build_object('title', 'Frequently Asked Questions', 'faqs', '[]'::jsonb));

  RETURN v_page_id;
END;
$$;
```

---

## 3. ROW LEVEL SECURITY POLICIES (COMPLETE SQL)

```sql
-- ============================================
-- PROFILES
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- ORGANIZATIONS
-- ============================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read their organizations"
  ON public.organizations FOR SELECT
  USING (id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Anyone can create an organization"
  ON public.organizations FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Owners and admins can update their organizations"
  ON public.organizations FOR UPDATE
  USING (id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
  ));

-- ============================================
-- ORG MEMBERSHIPS
-- ============================================
ALTER TABLE public.org_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read org memberships"
  ON public.org_memberships FOR SELECT
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Owners and admins can manage memberships"
  ON public.org_memberships FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
  ));

-- ============================================
-- PAGES
-- ============================================
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published pages"
  ON public.pages FOR SELECT
  USING (is_published = true);

CREATE POLICY "Org members can read all their pages"
  ON public.pages FOR SELECT
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Owners and admins can manage pages"
  ON public.pages FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
  ));

-- ============================================
-- PAGE COMPONENTS
-- ============================================
ALTER TABLE public.page_components ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read components of published pages"
  ON public.page_components FOR SELECT
  USING (page_id IN (
    SELECT id FROM public.pages WHERE is_published = true
  ));

CREATE POLICY "Org members can read all their page components"
  ON public.page_components FOR SELECT
  USING (page_id IN (
    SELECT id FROM public.pages WHERE org_id IN (
      SELECT org_id FROM public.org_memberships
      WHERE user_id = auth.uid() AND status = 'active'
    )
  ));

CREATE POLICY "Owners and admins can manage page components"
  ON public.page_components FOR ALL
  USING (page_id IN (
    SELECT id FROM public.pages WHERE org_id IN (
      SELECT org_id FROM public.org_memberships
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
    )
  ));

-- ============================================
-- WAITLIST ENTRIES
-- ============================================
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit to waitlist"
  ON public.waitlist_entries FOR INSERT WITH CHECK (true);

CREATE POLICY "Org members can read waitlist"
  ON public.waitlist_entries FOR SELECT
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Org members can manage waitlist"
  ON public.waitlist_entries FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
  ));

-- ============================================
-- BUSINESS CATEGORIES
-- ============================================
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active business categories"
  ON public.business_categories FOR SELECT USING (is_active = true);

-- ============================================
-- BUSINESS CONFIGS
-- ============================================
ALTER TABLE public.business_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can read business config"
  ON public.business_configs FOR SELECT
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Owners and admins can manage business config"
  ON public.business_configs FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
  ));

-- ============================================
-- APPOINTMENTS
-- ============================================
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members and assigned clients can read appointments"
  ON public.appointments FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_memberships
      WHERE user_id = auth.uid() AND status = 'active'
    )
    OR client_id = auth.uid()
  );

CREATE POLICY "Org members can manage appointments"
  ON public.appointments FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Clients can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (client_id = auth.uid());

-- ============================================
-- SERVICE CATALOG
-- ============================================
ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active service catalog"
  ON public.service_catalog FOR SELECT
  USING (is_active = true);

CREATE POLICY "Org members can manage service catalog"
  ON public.service_catalog FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND status = 'active'
  ));

-- ============================================
-- DOCUMENTS
-- ============================================
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members and document clients can read documents"
  ON public.documents FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_memberships
      WHERE user_id = auth.uid() AND status = 'active'
    )
    OR (client_id = auth.uid() AND is_shared_with_client = true)
  );

CREATE POLICY "Org members can manage documents"
  ON public.documents FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

-- ============================================
-- CLIENT MESSAGES
-- ============================================
ALTER TABLE public.client_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sender and recipient can read messages"
  ON public.client_messages FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON public.client_messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can mark their received messages as read"
  ON public.client_messages FOR UPDATE
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- ============================================
-- INQUIRIES
-- ============================================
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create inquiries"
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Org members can read inquiries"
  ON public.inquiries FOR SELECT
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "Org members can manage inquiries"
  ON public.inquiries FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

-- ============================================
-- PAYMENTS
-- ============================================
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members and paying clients can read payments"
  ON public.payments FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_memberships
      WHERE user_id = auth.uid() AND status = 'active'
    )
    OR client_id = auth.uid()
  );

CREATE POLICY "Org members can manage payments"
  ON public.payments FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

-- ============================================
-- INVOICES
-- ============================================
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members and invoiced clients can read invoices"
  ON public.invoices FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_memberships
      WHERE user_id = auth.uid() AND status = 'active'
    )
    OR client_id = auth.uid()
  );

CREATE POLICY "Org members can manage invoices"
  ON public.invoices FOR ALL
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

-- ============================================
-- WHATSAPP NOTIFICATIONS
-- ============================================
ALTER TABLE public.whatsapp_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can read whatsapp logs"
  ON public.whatsapp_notifications FOR SELECT
  USING (org_id IN (
    SELECT org_id FROM public.org_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  ));

CREATE POLICY "System can create whatsapp notifications"
  ON public.whatsapp_notifications FOR INSERT WITH CHECK (true);
```

---

## 4. MULTI-TENANCY ARCHITECTURE

### org_id Flow Through Every Query

Every data operation follows this pattern:
```typescript
// 1. Get current org_id from context
const orgId = useOrgContext().orgId;

// 2. Query with org_id filter
const { data } = await supabase
  .from('table_name')
  .select('*')
  .eq('org_id', orgId);

// 3. RLS enforces at database level that user can only access their org's data
```

### Middleware for Org Context Detection

```typescript
// app/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(/* ... */);
  const { data: { session } } = await supabase.auth.getSession();

  // Auth protection
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Org context detection for public routes
  const orgSlug = request.nextUrl.pathname.split('/')[1];
  if (orgSlug && !['api', '_next', 'favicon.ico'].includes(orgSlug)) {
    // Resolve org from slug, set in response header for downstream use
    const { data: org } = await supabase
      .from('organizations')
      .select('id, accent_color')
      .eq('slug', orgSlug)
      .single();

    if (org) {
      response.headers.set('x-org-id', org.id);
      response.headers.set('x-org-accent', org.accent_color);
    }
  }

  return response;
}
```

### ThemeWrapper Component Logic

```typescript
// components/ThemeWrapper.tsx
'use client';

import { useEffect } from 'react';

export function ThemeWrapper({ accentColor, children }: { accentColor: string; children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', accentColor);

    // Calculate variants
    const num = parseInt(accentColor.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - 20);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - 20);
    const b = Math.max(0, (num & 0x0000FF) - 20);
    root.style.setProperty('--accent-hover', `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`);
    root.style.setProperty('--accent-light', `${accentColor}15`);
  }, [accentColor]);

  return <>{children}</>;
}
```

### Template Loading Logic

**How "Healthcare" template differs from "Legal" template:**

At the **database level:**
- Both use the same `pages` and `page_components` tables
- The difference is in the `config` JSONB field of each component
- `business_configs.category_id` determines which template to load
- `business_categories.default_config` contains the template definition

At the **component level:**
- The same `HeroSection` component renders for both
- Healthcare hero shows: "Your Health, Our Priority" with health-related subheadline
- Legal hero shows: "Expert Legal Counsel. Digital Convenience." with legal subheadline
- The `config` JSONB passed to each component determines the content
- Category-specific modules (e.g., `case-status` for legal, `health-records` for healthcare) are conditionally rendered based on `business_configs.category_id`

```typescript
// lib/templates.ts — Template loading
export function getTemplateConfig(categorySlug: string) {
  return BUSINESS_TEMPLATES[categorySlug as keyof typeof BUSINESS_TEMPLATES];
}

// In page rendering
const template = getTemplateConfig(businessConfig.category_id);
const components = template.landing_components.map(comp => {
  const Component = COMPONENT_MAP[comp.type];
  return <Component key={comp.type} {...comp.config} />;
});
```

---

## 5. API ROUTE STRUCTURE

### Every Endpoint, Method, Inputs, Outputs

| Route | Method | Purpose | Inputs | Outputs |
|-------|--------|---------|--------|---------|
| `/api/org` | GET | List user's organizations | Auth session | `{ organizations: Org[] }` |
| `/api/org` | POST | Create new organization | `{ name, slug, accent_color }` | `{ organization: Org }` |
| `/api/org/members` | GET | List org members | `org_id` query param | `{ members: Membership[] }` |
| `/api/org/members` | POST | Invite member | `{ org_id, email, role }` | `{ membership: Membership }` |
| `/api/org/members` | DELETE | Remove member | `{ org_id, user_id }` | `{ success: boolean }` |
| `/api/projects/create` | POST | Create startup project | `{ name, slug, accent_color, features[] }` | `{ org_id, preview_url }` |
| `/api/businesses/deploy` | POST | Deploy business template | `{ category, business_info, brand_config }` | `{ org_id, public_url, portal_url }` |
| `/api/payments/create-order` | POST | Create Razorpay order | `{ org_id, amount, description, type }` | `{ order_id, amount, currency }` |
| `/api/payments/verify` | POST | Verify payment signature | `{ order_id, payment_id, signature }` | `{ verified: boolean }` |
| `/api/payments/webhook` | POST | Razorpay webhook handler | Razorpay webhook payload | `{ received: true }` |
| `/api/whatsapp/send` | POST | Send WhatsApp notification | `{ org_id, phone, template, data }` | `{ message_id, status }` |
| `/api/whatsapp/webhook` | POST | WhatsApp delivery status | WhatsApp webhook payload | `{ received: true }` |
| `/api/email/send` | POST | Send transactional email | `{ to, subject, template, data }` | `{ message_id }` |
| `/api/waitlist` | POST | Submit waitlist entry | `{ org_id, email, name }` | `{ success: boolean }` |
| `/api/og` | GET | Generate OG image | `title`, `accent` query params | Image response (PNG) |
| `/api/favicon` | GET | Generate favicon | `letter`, `color` query params | Image response (ICO) |
| `/api/admin/metrics` | GET | Admin aggregated metrics | Auth session (root admin) | `{ total_orgs, total_users, total_revenue }` |
| `/api/admin/orgs` | GET | List all organizations | Auth session (root admin), query params | `{ orgs: Org[], total }` |
| `/api/admin/health` | GET | System health check | Auth session (root admin) | `{ health: OrgHealth[] }` |

---

## 6. WHATSAPP API INTEGRATION ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                    PRX OS Application                    │
│                                                         │
│  Event Occurs                                           │
│  (inquiry, appointment, payment, document, status)      │
│       │                                                 │
│       ▼                                                 │
│  ┌─────────────────────┐                               │
│  │  Event Handler      │  Determines notification type  │
│  │  (server action)    │  and recipient                 │
│  └────────┬────────────┘                               │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────┐                               │
│  │  sendWhatsAppNotif()│  Formats phone to E.164       │
│  │  (lib/whatsapp.ts)  │  Selects template              │
│  └────────┬────────────┘  Builds template data          │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────────────────────────┐           │
│  │  POST to WhatsApp Cloud API             │           │
│  │  graph.facebook.com/v18.0/{phone_id}/   │           │
│  │  messages                               │           │
│  │  Headers: Authorization: Bearer {token} │           │
│  │  Body: messaging_product, to, template  │           │
│  └────────┬────────────────────────────────┘           │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────┐                               │
│  │  Log to DB          │  whatsapp_notifications table  │
│  │  (status, SID, err) │  status: sent/failed           │
│  └────────┬────────────┘                               │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────┐                               │
│  │  WhatsApp delivers  │  To recipient's WhatsApp app   │
│  │  to recipient       │                                │
│  └─────────────────────┘                               │
│                                                         │
│  Delivery status webhook → updates whatsapp_notifications│
└─────────────────────────────────────────────────────────┘
```

---

## 7. ENVIRONMENT VARIABLE MAP

| Variable | Source | Public/Secret | Description |
|----------|--------|---------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard | Public | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | Secret | Supabase service role key (server only) |
| `NEXT_PUBLIC_APP_URL` | Deployment config | Public | App base URL (localhost:3000 dev, prxos.com prod) |
| `RAZORPAY_KEY_ID` | Razorpay Dashboard | Public | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay Dashboard | Secret | Razorpay secret key |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Dashboard | Secret | Webhook verification secret |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta Developers | Secret | WhatsApp Business phone number ID |
| `WHATSAPP_ACCESS_TOKEN` | Meta Developers | Secret | WhatsApp API access token |
| `WHATSAPP_VERIFY_TOKEN` | Meta Developers | Secret | Webhook verification token |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Meta Developers | Secret | WhatsApp Business Account ID |
| `RESEND_API_KEY` | Resend Dashboard | Secret | Resend API key |
| `RESEND_FROM_EMAIL` | Resend Dashboard | Public | Default from email address |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog Dashboard | Public | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog Dashboard | Public | PostHog API host |
| `DATABASE_URL` | Supabase Dashboard | Secret | Direct database connection string (for migrations) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Dashboard | Public | Razorpay key for client-side SDK |

---

## 8. PERFORMANCE ARCHITECTURE

### Server vs Client Components

**Server Components (default):**
- `app/[orgSlug]/layout.tsx` — Fetches org data server-side, passes to ThemeWrapper
- `app/[orgSlug]/page.tsx` — Fetches pages and components server-side, renders statically
- `app/[orgSlug]/[pageSlug]/page.tsx` — Same pattern
- `app/(dashboard)/dashboard/page.tsx` — Fetches org memberships server-side
- `app/api/*` — All API routes are server-side by default

**Client Components ('use client'):**
- `components/ThemeWrapper.tsx` — Needs DOM access for CSS variables
- `components/executive/*` — Interactive components (forms, buttons, modals)
- `app/(dashboard)/layout.tsx` — Client-side org switching, sidebar state
- `components/CreateProjectModal.tsx` — Interactive wizard
- `components/DigitizeBusinessModal.tsx` — Interactive wizard
- `components/executive/RazorpayCheckout.tsx` — Razorpay SDK requires client
- `components/executive/UPIQRCode.tsx` — QR code rendering
- `components/executive/AppointmentBooking.tsx` — Calendar interaction
- `components/executive/FAQAccordion.tsx` — Shadcn Accordion interaction — ref: https://ui.shadcn.com/docs/components/accordion
- `app/providers.tsx` — PostHog client initialization

### Caching Strategy

- **Static Generation:** Public landing pages are statically generated at build time for SEO
- **ISR (Incremental Static Regeneration):** Pages revalidate every 60 seconds (`revalidate: 60`)
- **Client-side Cache:** Supabase client caches query results for 30 seconds
- **SWR Pattern:** Dashboard data uses Supabase real-time subscriptions for live updates
- **Image Optimization:** Next.js Image component with automatic WebP conversion and responsive sizing

### Why: Server Components reduce client bundle size and improve initial page load. Static generation ensures landing pages load instantly for SEO. Client components are used only where interactivity is required.

---

## 9. DEPLOYMENT ARCHITECTURE

### Vercel + Supabase Mumbai Configuration

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge Network                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Mumbai   │  │  Singapore│  │  US East  │  ← Edge caches │
│  │  (primary)│  │  (backup) │  │  (fallback)│               │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│       │              │              │                        │
│       └──────────────┼──────────────┘                        │
│                      │                                       │
│              ┌───────▼────────┐                             │
│              │  Next.js App   │                             │
│              │  (Serverless)  │                             │
│              └───────┬────────┘                             │
│                      │                                       │
└──────────────────────┼───────────────────────────────────────┘
                       │
              ┌────────▼────────┐
              │   Supabase      │
              │   ap-south-1    │  ← Mumbai region
              │   (PostgreSQL)  │
              │   (Auth)        │
              │   (Storage)     │
              └─────────────────┘
```

### Configuration Details

**Vercel:**
- Framework preset: Next.js
- Build command: `next build`
- Output directory: `.next`
- Node.js version: 18.x
- Environment variables: Set in Vercel dashboard (all from Section 7)
- Custom domains: `prxos.com`, `*.prxos.com` (wildcard for org subdomains)
- Preview deployments: Enabled for all PR branches

**Supabase:**
- Region: ap-south-1 (Mumbai) — Why: Lowest latency for Indian users (~20-40ms vs 150-200ms for US regions)
- Database: PostgreSQL 15
- Connection pooling: PgBouncer enabled (Transaction mode, pool size 25)
- Storage: Supabase Storage bucket for documents
- Auth: Email, Google OAuth, Phone OTP enabled — ref: https://supabase.com/docs/guides/auth/phone-login
- Backups: Daily automated backups, 7-day retention
- Monitoring: Database metrics dashboard, alert on CPU > 80%

**CDN:**
- Vercel Edge Network caches static assets and ISR pages
- OG images and favicons cached for 24 hours
- Public landing pages cached for 60 seconds (ISR)
- Dashboard pages not cached (dynamic, authenticated)

---

## 10. MOBILE-FIRST AND NETWORK-RESILIENCE ARCHITECTURE

### Mobile-First Design Decisions

**Why: 80%+ of Indian users access web on mobile devices. Desktop is secondary.**

- All components designed at 360px viewport first, then scaled up with `sm:`, `md:`, `lg:` breakpoints
- Touch targets minimum 44x44px (Apple HIG) / 48x48dp (Material Design)
- No horizontal scrolling on mobile (except carousels)
- Form inputs font-size minimum 16px to prevent iOS zoom on focus
- Bottom navigation on mobile for client portal (thumb-friendly)
- Sidebar collapses to hamburger menu on mobile
- Tables convert to card layout on mobile
- Images use `sizes` prop for responsive loading

### Network Resilience Decisions

**Why: Indian users frequently experience slow 4G (400 Kbps) and intermittent connectivity.**

- **Skeleton Screens:** All async data shows skeleton loading state within 200ms
  ```typescript
  if (isLoading) return <Skeleton className="h-4 w-full" />;
  ```
- **React Suspense:** Server components use Suspense boundaries for streaming
  ```typescript
  <Suspense fallback={<LoadingSkeleton />}>
    <DashboardContent />
  </Suspense>
  ```
- **Optimistic Updates:** Form submissions update UI immediately, revert on error
- **Error Boundaries:** Each major section wrapped in error boundary with retry
- **Offline Detection:** Detect offline state, show banner, queue actions
- **Image Optimization:** Next.js Image with `placeholder="blur"`, lazy loading, WebP format
- **Font Loading:** `next/font/google` with `display: 'swap'` to prevent FOIT
- **API Timeout:** All API calls have 10-second timeout with graceful fallback
- **Debounce:** Search inputs debounced at 300ms to reduce API calls
- **Pagination:** Large lists paginated at 20 items per page

### Testing on Slow Networks

```typescript
// DevTools throttling profile for testing:
// Slow 4G: 400 Kbps down, 400 Kbps up, 2000ms RTT
// Target: All pages load within 3 seconds on Slow 4G
// Target: First contentful paint within 1.5 seconds
// Target: Time to interactive within 3 seconds
```

---

**END OF FILE 4: SYSTEM ARCHITECTURE**
