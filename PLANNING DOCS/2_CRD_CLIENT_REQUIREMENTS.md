# PRX STARTUP OS — FILE 2: CLIENT REQUIREMENTS DOCUMENT (CRD)

**Version:** 2.0 | **Classification:** Founding Document  
**Author:** Principal Product Strategist | **Audience:** Product Team, Engineering, Design  
**Purpose:** Complete requirements specification — personas, brands, templates, brand identity, success metrics, and scope boundaries.

---

## 1. BUSINESS VISION STATEMENT

PRX Startup OS exists to eliminate the gap between business ideas and live products in the Indian market. Every day, thousands of Indian founders abandon promising ideas because setting up authentication, payments, databases, and deployment infrastructure takes weeks instead of hours. Simultaneously, tens of millions of Indian businesses — law firms, medical clinics, real estate agencies, coaching centers, restaurants, and manufacturers — operate entirely offline, losing credibility, customers, and revenue to competitors who have gone digital. PRX OS solves both problems with a single engine: a multi-tenant Next.js boilerplate that spawns production-ready startup landing pages for new ideas AND deploys complete digital transformation packages for existing businesses — both from the same codebase, both in under 48 hours. We are not a website builder. We are not a no-code tool. We are the infrastructure layer that turns business intent into digital reality at the speed of thought.

---

## 2. FOUNDER PROFILE AND OPERATING CONTEXT

The founder is a Creative Director and Growth Consultant based in India with a BBA background. This means the founder thinks in business outcomes — revenue, client acquisition, market positioning — rather than technical abstractions. The founder operates as a solo technical entrepreneur, building on a MacBook M4 with a strong preference for UI-driven workflows and zero terminal dependency for routine operations. The founder's philosophy is that ideas must flow into execution without hitting technical walls, and the reference model is Marc Lou's ShipFast boilerplate — but reimagined for the Indian market with Razorpay instead of Stripe, UPI instead of credit cards, GST compliance instead of US tax handling, and a complete business digitization engine that ShipFast does not offer. The founder also runs a web development and app development services business, selling digital transformation to existing offline businesses — making PRX OS both a product for other founders and a delivery engine for the founder's own consulting practice.

---

## 3. TARGET AUDIENCE PERSONAS

### Persona 1: The Indian Indie Hacker (New Startup Founder)

**Name:** Arjun  
**Age:** 26  
**Location:** Bangalore  
**Occupation:** Software engineer at a mid-size tech company, building side projects  
**Income:** ₹12-18 LPA  
**Technical skill:** Intermediate — can build with Next.js, struggles with infrastructure setup  

**Goals:**
- Launch a SaaS or micro-SaaS product within 30 days
- Validate his idea with real users before investing months of development
- Collect payments in INR without international payment complexity
- Maintain full ownership of his codebase
- Ship fast, iterate faster, and kill failing ideas quickly

**Frustrations:**
- Spends 2-3 weeks on boilerplate (auth, database, payments, SEO, emails) before building actual product features
- ShipFast costs $199 (₹16,500) — too expensive for a side project
- ShipFast uses Stripe, which doesn't work smoothly for Indian founders
- No existing boilerplate handles GST compliance
- Tutorials are scattered across YouTube, blogs, and documentation — no unified system
- Feels isolated — no Indian-specific community for SaaS founders

**How Arjun discovers tools:**
- X (Twitter) — follows Indian indie hackers, build-in-public accounts
- YouTube — searches "Next.js boilerplate India", "Razorpay integration tutorial"
- WhatsApp developer groups — active in 3-5 groups
- GitHub — explores open-source starter kits
- Product Hunt — browses weekly launches

**What Arjun needs from PRX OS:**
- One-click auth setup with Supabase (email, Google OAuth, phone OTP)
- Razorpay integration that works on day one
- GST-compliant invoice generation
- SEO configuration with OG images
- Waitlist module for pre-launch validation
- Pricing page template
- Deployment to Vercel in under 5 minutes
- Documentation that assumes Indian context

**Willingness to pay:** ₹3,000 - ₹10,000 one-time for a complete boilerplate

### Persona 2: The Service Consultant / Web Developer

**Name:** Priya  
**Age:** 32  
**Location:** Pune  
**Occupation:** Freelance web developer and digital consultant  
**Income:** ₹8-15 LPA from client projects  
**Technical skill:** Advanced — builds full-stack applications, but reinvents the wheel for every client  

**Goals:**
- Deliver professional digital products to clients faster
- Increase profit margins by reducing development time
- Build a portfolio of successful digitization projects
- Charge premium rates (₹35,000 - ₹1,00,000) per project
- Scale from solo freelancer to small agency

**Frustrations:**
- Every client project requires building auth, database, payments, email from scratch
- Spends 60-70% of project time on infrastructure, 30-40% on actual client features
- Client wants a "client portal" — has to build it custom every time
- Client wants GST invoices — has to figure out the format manually
- Client wants WhatsApp notifications — complex API integration every time
- Competing with cheap website builders (Wix, Dukaan) on price instead of value
- Cannot scale because each project takes 2-3 weeks

**How Priya discovers tools:**
- YouTube tutorials — "how to build client portals", "Next.js for agencies"
- LinkedIn — follows agency owners, reads case studies
- Developer communities — Discord, GitHub
- Client referrals — existing clients recommend her to other businesses
- Google searches — "white-label boilerplate", "client portal template"

**What Priya needs from PRX OS:**
- White-label boilerplate she can clone for every client
- Pre-built business templates (clinic, legal firm, real estate, education)
- Client portal system that makes her service feel premium
- GST invoicing built in — no manual configuration
- WhatsApp integration for client notifications
- Ability to brand the portal as her own (white-label)
- Documentation she can show to clients as proof of capability

**Willingness to pay:** ₹5,000 - ₹15,000 one-time (ROI is immediate — one client project covers the cost)

### Persona 3: The Existing Business Owner — Small Scale

**Name:** Dr. Mehta  
**Age:** 45  
**Location:** Ahmedabad  
**Business:** Dental clinic, single location, 3 employees (receptionist, 2 assistants)  
**Revenue:** ₹25-40 LPA  
**Technical skill:** Basic — uses WhatsApp, email, and basic phone. No website.  

**Goals:**
- Have a professional website that builds credibility
- Stop managing everything on WhatsApp and paper notebooks
- Accept online payments from patients
- Send appointment reminders automatically
- Look as professional as the big hospital chains
- Attract younger patients who expect digital services

**Frustrations:**
- Patients call at all hours asking about appointments, fees, services
- Competing clinic down the road has a website and Google listing — getting new patients
- Writing receipts by hand — looks unprofessional
- No way to share documents (X-rays, treatment plans) with patients digitally
- Depends entirely on word-of-mouth for new patients
- Younger patients expect to book online — losing them to competitors
- Everything is in a paper register — no backup, no search, no analytics

**How Dr. Mehta discovers solutions:**
- Google Search — "website for clinic", "online appointment booking"
- Friend/peer recommendations — other doctors who have gone digital
- Local web developers — found through Google Maps or referrals
- Facebook groups — local business owner groups
- His patients — younger patients suggest he get online

**What Dr. Mehta needs:**
- A professional website done FOR him (not a tool he uses himself)
- Patient portal where patients can see appointments and records
- Appointment booking system
- Digital document sharing (X-rays, treatment plans, prescriptions)
- GST-compliant billing
- UPI payment collection
- WhatsApp notifications for appointment confirmations
- Someone to set it all up and train him
- Phone support when something goes wrong

**Willingness to pay:** ₹20,000 - ₹50,000 for a complete package

### Persona 4: The Existing Business Owner — Medium Scale

**Name:** Rajesh Agarwal  
**Age:** 52  
**Business:** Real estate agency, 3 locations, 15 employees (agents, admin, management)  
**Revenue:** ₹3-8 Cr PA  
**Technical skill:** Low-Medium — uses Excel for lead tracking, WhatsApp for client communication, basic email  

**Goals:**
- Centralize lead management across 3 locations
- Professional website showcasing properties
- Client portal where buyers can track their purchase progress
- Digital document management (agreements, KYC, property documents)
- Payment milestone tracking for under-construction properties
- Reduce dependency on individual agents for client communication
- Build brand credibility to compete with NoBroker, MagicBricks

**Frustrations:**
- Leads are scattered across WhatsApp, Excel sheets, and agent notebooks
- No visibility into which agents are performing
- Clients complain about lack of transparency in the buying process
- Document management is chaotic — physical files get lost
- Cannot track project progress digitally
- Losing credibility to PropTech platforms
- Existing CRM tools are too complex and expensive (₹10,000+/month)
- Staff resistance to adopting new technology

**How Rajesh discovers solutions:**
- Industry events and trade shows
- LinkedIn — follows real estate tech companies
- Peer network — other real estate owners
- Google searches — "CRM for real estate", "property management software"
- His children (next generation) who push for digital transformation

**What Rajesh needs:**
- Lead management system with status tracking
- Property listing website with search and filter
- Client portal for document sharing and progress tracking
- Site visit scheduling system
- Payment milestone tracker
- Integration with WhatsApp for automated notifications
- Something simple enough that his non-technical staff can use
- Training and onboarding support

**Willingness to pay:** ₹75,000 - ₹2,00,000 for a comprehensive solution

---

## 4. THE 4 ACTIVE SUB-BRANDS

### CHITRAGUPT — Legal Tech

**Industry:** Legal Services  
**Primary Use:** Document management portal for legal consultation clients  
**Business Category:** Legal & Compliance  

**Specific Portal Requirements:**
- **Case/Matter Tracker:** Clients can see the status of their legal case (Filed → In Progress → Hearing Scheduled → Resolved). Each status change triggers a WhatsApp notification.
- **Document Vault:** Secure storage for legal documents — agreements, court filings, evidence, correspondence. Documents are categorized by case. Clients can view and download. Lawyers can upload and share.
- **Client Portal:** Login-protected area where clients see their case status, documents, upcoming hearings, and invoices.
- **Appointment Scheduling:** Book consultation appointments with specific lawyers. Calendar view with available slots.
- **GST Invoice Generation:** Auto-generated invoices for legal services with proper SAC codes (99821 for legal services).
- **Secure File Sharing:** Lawyers can share sensitive documents with specific clients only. Files are encrypted at rest.

**Landing Page:** Professional, authoritative tone. Hero: "Expert Legal Counsel. Digital Convenience." Services: Legal Consultation, Document Review, Case Representation, Legal Opinion. Testimonials from clients. FAQ addressing common legal service questions.

**Aesthetic:** Montserrat Bold wordmark "CHITRAGUPT" — no gavel icon, no scales of justice graphic. Pure typography.

### GYMOS — Health & Fitness

**Industry:** Health & Wellness  
**Primary Use:** Resource library and schedule tracker for health service clients  
**Business Category:** Healthcare & Wellness  

**Specific Portal Requirements:**
- **Appointment Booking:** Clients book fitness consultations, training sessions, or health checkups. Calendar with available slots.
- **Patient Records (Non-Clinical):** Track health goals, progress metrics, workout schedules. No medical records (HIPAA compliance not required for wellness).
- **Prescription/Report Upload:** Health coaches upload diet plans, workout schedules, progress reports. Clients download from portal.
- **Health Resource Library:** Categorized library of articles, videos, and resources on nutrition, fitness, wellness.
- **Payment Collection:** One-time payments for consultation, monthly packages for ongoing coaching.

**Landing Page:** Energetic, motivating tone. Hero: "Your Health, Our Priority." Services: General Consultation, Personal Training, Diet Planning, Health Screening. Before/after testimonials. FAQ on health services.

**Aesthetic:** Montserrat Bold wordmark "GYMOS" — no dumbbell icon, no heart graphic. Pure typography.

### TNC — Real Estate

**Industry:** Real Estate & Property  
**Primary Use:** Lead tracking, site visit logs, and property inquiry portal  
**Business Category:** Real Estate & Property  

**Specific Portal Requirements:**
- **Property Listing:** Catalog of available properties with details (location, price, size, amenities, photos). Filter by type, budget, location.
- **Lead Capture:** Inquiry form on each property listing. Leads saved to CRM with status tracking (New → Contacted → Site Visit Scheduled → Negotiation → Closed).
- **Site Visit Scheduling:** Clients book site visits for specific properties. Calendar integration. WhatsApp confirmation sent automatically.
- **Document Management:** Store property documents — brochures, floor plans, agreement drafts, KYC documents. Shared with specific clients.
- **Project Progress Tracker:** For under-construction properties, show construction milestones (Foundation → Structure → Finishing → Handover). Each milestone update triggers notification.
- **Payment Milestone Tracking:** Track payments made by buyer against construction milestones. Shows what's paid, what's pending.

**Landing Page:** Professional, trust-building tone. Hero: "Find Your Dream Property. Transparently." Featured properties grid. Lead capture form. FAQ on property buying process.

**Aesthetic:** Montserrat Bold wordmark "TNC" — no building icon, no house graphic. Pure typography.

### LRM — Learning & Education

**Industry:** Education & Coaching  
**Primary Use:** Course and resource roadmap for learning service clients  
**Business Category:** Education & Coaching  

**Specific Portal Requirements:**
- **Course/Batch Management:** List available courses with schedule, instructor, fee, duration. Students enroll through portal.
- **Student Portal:** Login-protected area where students see enrolled courses, schedule, study materials, attendance, and progress.
- **Study Material Library:** Categorized repository of notes, assignments, recorded lectures, practice papers. Downloadable by enrolled students.
- **Attendance/Progress Tracking:** Track student attendance and academic progress. Visible to both student and parent (if applicable).
- **Fee Collection:** Track fee payments, pending dues, due dates. Accept payments via UPI/Razorpay. Auto-generate fee receipts.

**Landing Page:** Educational, approachable tone. Hero: "Learn. Grow. Succeed." Course catalog. Instructor profiles. Student testimonials. FAQ on admissions and fees.

**Aesthetic:** Montserrat Bold wordmark "LRM" — no book icon, no graduation cap graphic. Pure typography.

---

## 5. THE 10 BUSINESS DIGITIZATION TEMPLATES

### Template 1: Legal & Compliance Firms

**Target:** Law firms, CA firms, CS firms, tax consultants  
**Business Size:** 2-20 professionals  
**Typical Price:** ₹35,000 - ₹1,00,000  

**Required Features:**
1. Case/matter tracker with status pipeline (Filed → In Progress → Hearing → Resolved)
2. Document vault with case-level organization and client access control
3. Client portal with login for case status, documents, and invoices
4. Appointment scheduling for consultations
5. GST invoice generation with SAC code 99821
6. Secure file sharing with download tracking
7. Inquiry form with case type categorization
8. WhatsApp notifications for hearing dates and document sharing

**Deployment Checklist:**
- [ ] Create org with legal category
- [ ] Configure business details (name, address, GSTIN, phone)
- [ ] Set up case status pipeline stages
- [ ] Configure document categories (Agreements, Court Filings, Correspondence, Evidence)
- [ ] Set up appointment slots (consultation hours)
- [ ] Connect WhatsApp Business API
- [ ] Configure GST invoice template
- [ ] Test client registration and portal access
- [ ] Deploy landing page with legal-specific components
- [ ] Train staff on case management and document upload

### Template 2: Healthcare & Wellness

**Target:** Medical clinics, hospitals, physiotherapy, yoga studios, gyms, diagnostic labs  
**Business Size:** 1-30 practitioners  
**Typical Price:** ₹25,000 - ₹75,000  

**Required Features:**
1. Appointment booking with practitioner selection and time slots
2. Patient records (non-clinical: goals, progress, schedules)
3. Prescription/report upload and download
4. Health resource library (articles, videos, guides)
5. Payment collection for consultations and packages
6. WhatsApp appointment confirmations and reminders
7. Patient portal with appointment history and health records

**Deployment Checklist:**
- [ ] Create org with healthcare category
- [ ] Configure practitioner profiles and availability
- [ ] Set up appointment types (consultation, follow-up, screening)
- [ ] Configure resource library categories
- [ ] Set up payment packages (single consultation, monthly, quarterly)
- [ ] Connect WhatsApp Business API
- [ ] Test appointment booking flow end-to-end
- [ ] Deploy landing page with healthcare-specific components

### Template 3: Real Estate & Property

**Target:** Builders, brokers, property managers, interior designers  
**Business Size:** 3-50 agents  
**Typical Price:** ₹50,000 - ₹2,00,000  

**Required Features:**
1. Property listing with search, filter, and detailed views
2. Lead capture from website inquiries with CRM status tracking
3. Site visit scheduling with calendar and WhatsApp confirmation
4. Document management (brochures, floor plans, agreements)
5. Project progress tracker for under-construction properties
6. Payment milestone tracking for buyers
7. Client portal with property shortlist and document access

**Deployment Checklist:**
- [ ] Create org with real-estate category
- [ ] Configure property listing fields (type, location, price, size, amenities)
- [ ] Set up lead status pipeline (New → Contacted → Site Visit → Negotiation → Closed)
- [ ] Configure document categories
- [ ] Set up project milestones for under-construction properties
- [ ] Connect WhatsApp Business API
- [ ] Import existing property data (CSV upload)
- [ ] Deploy landing page with property search

### Template 4: Education & Coaching

**Target:** Coaching institutes, tutors, skill training centers, online educators  
**Business Size:** 1-20 instructors, 50-500 students  
**Typical Price:** ₹25,000 - ₹75,000  

**Required Features:**
1. Course/batch management with schedule and fee structure
2. Student portal with enrolled courses, schedule, and materials
3. Study material library with categorized content
4. Attendance and progress tracking
5. Fee collection with payment tracking and auto-receipts
6. Parent portal (for K-12 coaching) with child's progress view
7. WhatsApp notifications for class schedules and fee reminders

**Deployment Checklist:**
- [ ] Create org with education category
- [ ] Configure courses with batches, schedules, and fees
- [ ] Set up study material library structure
- [ ] Configure attendance tracking
- [ ] Set up fee payment schedule and reminders
- [ ] Connect WhatsApp Business API
- [ ] Import existing student data
- [ ] Deploy landing page with course catalog

### Template 5: Retail & E-Commerce Transition

**Target:** Kirana stores, clothing shops, electronics retailers  
**Business Size:** 1-10 employees  
**Typical Price:** ₹15,000 - ₹50,000  

**Required Features:**
1. Product catalog with categories, images, and pricing
2. Order management with status tracking
3. UPI payment collection
4. WhatsApp integration for order notifications
5. Basic inventory tracking
6. Customer order history in portal
7. Digital receipt generation

**Deployment Checklist:**
- [ ] Create org with retail category
- [ ] Configure product catalog structure
- [ ] Set up order status pipeline (Placed → Confirmed → Packed → Delivered)
- [ ] Configure UPI payment details
- [ ] Set up WhatsApp order notification templates
- [ ] Import existing product inventory
- [ ] Deploy landing page with product catalog

### Template 6: Hospitality & Food

**Target:** Restaurants, cloud kitchens, hotels, event venues, catering services  
**Business Size:** 5-50 employees  
**Typical Price:** ₹25,000 - ₹75,000  

**Required Features:**
1. Menu display with categories and pricing
2. Table/room booking with calendar
3. Order tracking for delivery/takeaway
4. Digital menu QR code generation
5. UPI payment collection
6. Customer feedback collection
7. Reservation management dashboard

**Deployment Checklist:**
- [ ] Create org with hospitality category
- [ ] Configure menu structure with categories and items
- [ ] Set up booking/reservation system
- [ ] Generate QR code for digital menu
- [ ] Configure UPI payment details
- [ ] Set up feedback collection form
- [ ] Deploy landing page with menu display

### Template 7: Logistics & Supply Chain

**Target:** Transporters, courier services, freight companies, warehouses  
**Business Size:** 5-30 employees  
**Typical Price:** ₹35,000 - ₹1,00,000  

**Required Features:**
1. Shipment tracking portal with status updates
2. Delivery status notifications via WhatsApp
3. Invoice generation for shipments
4. Route/order management dashboard
5. Customer portal for tracking shipments
6. POD (Proof of Delivery) document upload
7. Rate calculator for shipment pricing

**Deployment Checklist:**
- [ ] Create org with logistics category
- [ ] Configure shipment status pipeline (Booked → In Transit → Out for Delivery → Delivered)
- [ ] Set up tracking number generation
- [ ] Configure invoice templates
- [ ] Connect WhatsApp Business API for delivery notifications
- [ ] Deploy landing page with shipment tracking

### Template 8: Professional Services

**Target:** Architects, engineers, interior designers, event planners, photographers  
**Business Size:** 1-15 professionals  
**Typical Price:** ₹35,000 - ₹1,00,000  

**Required Features:**
1. Portfolio showcase with project gallery
2. Project inquiry form with requirements capture
3. Milestone tracker for active projects
4. Client approval workflow for designs/proposals
5. File delivery system for final deliverables
6. Invoice generation with GST
7. Client portal with project status and documents

**Deployment Checklist:**
- [ ] Create org with professional-services category
- [ ] Configure portfolio project structure
- [ ] Set up project milestone templates
- [ ] Configure client approval workflow
- [ ] Set up file delivery system
- [ ] Connect WhatsApp Business API
- [ ] Deploy landing page with portfolio showcase

### Template 9: Manufacturing & B2B Trade

**Target:** Small manufacturers, distributors, wholesalers  
**Business Size:** 10-100 employees  
**Typical Price:** ₹50,000 - ₹2,00,000  

**Required Features:**
1. Product/service catalog with specifications
2. Quotation generation with PDF output
3. Order tracking with status updates
4. B2B client portal with order history
5. Payment tracking with invoice generation
6. Inventory status dashboard
7. Lead management for new business inquiries

**Deployment Checklist:**
- [ ] Create org with manufacturing category
- [ ] Configure product catalog with specifications
- [ ] Set up quotation template
- [ ] Configure order status pipeline
- [ ] Set up B2B client portal access
- [ ] Configure inventory tracking fields
- [ ] Deploy landing page with product catalog

### Template 10: Financial Services

**Target:** Insurance agents, mutual fund distributors, loan agents, financial planners  
**Business Size:** 1-10 advisors  
**Typical Price:** ₹35,000 - ₹1,00,000  

**Required Features:**
1. Client portfolio tracker (policies, investments, loans)
2. Document collection (KYC, applications, statements)
3. Appointment booking for consultations
4. Compliance document management
5. Policy/investment tracker with maturity alerts
6. Client portal with portfolio overview
7. WhatsApp notifications for policy renewals and investment updates

**Deployment Checklist:**
- [ ] Create org with financial-services category
- [ ] Configure client portfolio fields
- [ ] Set up document collection workflow
- [ ] Configure appointment booking
- [ ] Set up compliance document categories
- [ ] Configure renewal/maturity alert system
- [ ] Connect WhatsApp Business API
- [ ] Deploy landing page with services overview

---

## 6. BRAND IDENTITY GUIDELINES

### The PRX Aesthetic System — Non-Negotiable Enforcement

These rules apply to PRX OS itself AND every project spawned by PRX OS. There are zero exceptions.

### Typography

**Headings:**
- Font: Montserrat
- Weight: 700 (Bold) to 900 (Black)
- Letter spacing: -0.02em to -0.05em (tight)
- Tailwind: `font-['Montserrat'] font-bold tracking-tight`
- H1: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]`
- H2: `text-3xl sm:text-4xl font-bold tracking-tight leading-tight`
- H3: `text-2xl sm:text-3xl font-bold tracking-tight`

**Body:**
- Font: Inter
- Weight: 400 (Regular) to 500 (Medium)
- Line height: 1.6 to 1.75 (generous)
- Tailwind: `font-['Inter'] font-normal leading-relaxed`
- Small text: `text-sm text-gray-500 font-['Inter']`
- Captions: `text-xs text-gray-400 font-['Inter']`

**Prohibited:**
- Decorative fonts
- Serif fonts
- Handwritten/cursive styles
- Display fonts other than Montserrat
- Mixed font families within a single component

### Color System

**Backgrounds:**
- Light: Pure White `#FFFFFF` — Tailwind: `bg-white`
- Dark: Deep Charcoal `#121212` — Tailwind: `bg-[#121212]`
- NO gray-50, gray-100, or any tinted backgrounds for main surfaces

**Text:**
- On white: Pure Black `#000000` — Tailwind: `text-black`
- On charcoal: Pure White `#FFFFFF` — Tailwind: `text-white`
- Secondary text: `#6B7280` — Tailwind: `text-gray-500` (for descriptions, captions)
- Tertiary text: `#9CA3AF` — Tailwind: `text-gray-400` (for placeholders, labels)

**Primary Accent:**
- Color: Neon Orange `#FF5F1F` — Tailwind: `text-[#FF5F1F]` or `text-[var(--accent)]`
- Used EXCLUSIVELY for:
  - Primary CTA buttons (bg-[var(--accent)])
  - Active navigation states (text-[var(--accent)], border-l-2 border-[var(--accent)])
  - Key metric highlights (text-[var(--accent)])
  - Focus/hover borders on inputs (focus:ring-2 focus:ring-[var(--accent)])
  - Status indicators for active/current states
  - Links in body text

**Accent Variants (auto-calculated by ThemeWrapper):**
- Hover: `--accent-hover` — 20 units darker than base accent
- Light: `--accent-light` — accent color at 10% opacity (e.g., `#FF5F1F15`)
- Background tint: `--accent-light` for subtle highlights (badges, selected states)

**Prohibited:**
- Gradients of any kind
- Color saturation beyond the one accent orange
- Decorative color palettes
- Blue buttons, green buttons, purple buttons (except semantic status colors)
- Background colors other than white and charcoal
- Color-coded categories or tags (use text labels instead)

### Semantic Exception Colors

These colors are permitted ONLY for status indicators and system feedback:
- Success: `#16A34A` (green-600) — payment completed, booking confirmed
- Warning: `#CA8A04` (yellow-600) — payment pending, action required
- Error: `#DC2626` (red-600) — payment failed, error state
- Info: `#2563EB` (blue-600) — informational messages

WhatsApp icon: `#25D366` — ONLY for the WhatsApp icon, never for any other element.

### Logo & Branding Rules

- ALL logos must be pure wordmarks (text only)
- ABSOLUTELY NO icons, emojis, literal graphic representations, or decorative marks
- The wordmark IS the brand. Nothing else.
- Example: "CHITRAGUPT" in Montserrat Bold 700 is the logo. Not a gavel icon + text.
- Each business template can have its own wordmark but must follow this system
- PRX OS logo: "PRX" in Montserrat Black (900), tracking-tight
- Sub-brand logos: Brand name in Montserrat Bold (700), tracking-tight

### UI Philosophy

Every UI decision must ask: "Does this add authority or distract from it?"

- White space is a design element, not empty space. Minimum py-12 between sections.
- Borders and dividers over background colors for separation.
- Data tables and status trackers over charts and graphs (clarity over decoration).
- Mobile-first design mandatory — 80%+ of Indian users access on mobile.
- Network resilience mandatory — skeleton screens, loading states, offline-friendly patterns.
- No decorative illustrations, no stock photos, no gradient backgrounds.
- Typography carries the visual weight. Let the words do the design.

### CSS Variable Map

```css
:root {
  --accent: #FF5F1F;
  --accent-hover: #E54E1A;
  --accent-light: #FF5F1F15;
  --bg-primary: #FFFFFF;
  --bg-dark: #121212;
  --text-primary: #000000;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;
  --border: #E5E7EB;
  --success: #16A34A;
  --warning: #CA8A04;
  --error: #DC2626;
  --info: #2563EB;
  --whatsapp: #25D366;
}
```

### Tailwind Class Reference

```
Headings: font-['Montserrat'] font-bold tracking-tight
Body: font-['Inter'] font-normal leading-relaxed
Primary Button: bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]
Secondary Button: border border-gray-300 text-black hover:bg-gray-50
Card: bg-white border border-gray-200 rounded-lg
Input: border border-gray-300 focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent
Active Nav: text-[var(--accent)] border-l-2 border-[var(--accent)]
Status Badge (success): bg-green-100 text-green-800
Status Badge (warning): bg-yellow-100 text-yellow-800
Status Badge (error): bg-red-100 text-red-800
Badge (accent): bg-[var(--accent-light)] text-[var(--accent)]
```

---

## 7. SUCCESS METRICS

### Track A: PRX OS as a Product (Developer Adoption Metrics)

**30-Day Metrics (Sprint 1-3 completion):**
- GitHub stars: 100+
- Waitlist signups: 200+
- Beta users onboarded: 20+
- First project spawned: 10+
- Time from signup to first deploy: Under 15 minutes
- Documentation page views: 500+

**90-Day Metrics (Sprint 4-6 completion):**
- Paying users: 50+ (across all tiers)
- Total projects spawned: 150+
- Revenue: ₹2,50,000+ (50 users × average ₹5,000)
- Business digitization projects delivered: 10+
- Consultant users actively delivering client projects: 15+
- NPS score: 40+ (from beta users)
- Support ticket resolution time: Under 24 hours

**1-Year Metrics:**
- Paying users: 500+
- Total projects spawned: 2,000+
- Revenue: ₹25,00,000+ (500 users × average ₹5,000)
- Business digitization projects delivered: 200+
- Active consultants using PRX OS for client work: 100+
- Viral loop conversion rate: 1%+ (from footer clicks to signups)
- Churn: Under 5% (one-time purchases, so churn = lack of repeat purchases)
- NPS score: 60+
- Product Hunt ranking: Top 3 in Developer Tools category

### Track B: PRX OS as a Service (Client Digitization Delivery Metrics)

**30-Day Metrics:**
- First client digitization project completed: 1
- Client satisfaction score: 4.5/5+
- Delivery time: Under 48 hours
- Client training session completed: 1

**90-Day Metrics:**
- Total clients digitized: 10+
- Average delivery time: Under 36 hours
- Client retention (still active after 30 days): 90%+
- Client referrals generated: 3+
- Average client project value: ₹40,000+
- Monthly recurring revenue from maintenance contracts: ₹25,000+

**1-Year Metrics:**
- Total clients digitized: 100+
- Client retention (still active after 90 days): 85%+
- Client referrals generated: 30+ (30% referral rate)
- Average client project value: ₹50,000+
- Monthly recurring revenue from maintenance contracts: ₹2,00,000+
- Industry coverage: All 10 business categories with at least 5 clients each
- Geographic coverage: 10+ Indian cities

---

## 8. OUT-OF-SCOPE ITEMS

The following are explicitly NOT part of PRX OS v1.0. They may be considered for future versions but are excluded from the current build:

1. **AI Features** — No AI chatbots, no AI content generation, no AI-powered recommendations. This is a solo founder on a MacBook M4. AI adds complexity, cost, and maintenance burden without proportional value.

2. **Blockchain/Web3** — No crypto payments, no smart contracts, no token-based systems. Not relevant for Indian MSME digitization.

3. **Microservices Architecture** — Monolithic Next.js app with Supabase backend. No Kubernetes, no Docker orchestration, no service mesh. Complexity killer for solo founder.

4. **Native Mobile Apps** — React Native or Flutter apps are out of scope. The product is web-first, mobile-responsive. PWAs can be considered later.

5. **Multi-language Support** — v1 is English only. Hindi and regional language support is valuable but adds significant complexity. Plan for v2.

6. **White-Label Reseller Program** — White-label rights are included in the Bundle tier, but a formal reseller program with revenue sharing is v2.

7. **Advanced Analytics Dashboard** — PostHog integration is included. Custom analytics dashboards with cohort analysis, A/B testing, and predictive modeling are v2.

8. **E-Commerce Full Stack** — Product catalog and order management are included for retail template. Full e-commerce with inventory management, shipping integration, and marketplace features are out of scope.

9. **Video Conferencing** — Appointment booking is included. Integrated video calls (like Zoom/Google Meet) are out of scope. Use external links for video consultations.

10. **ERP Integration** — No SAP, Tally, or Zoho integration. The system is standalone. API endpoints can be built later for integration.

11. **Subscription Management** — Focus is on one-time and milestone-based payments. Subscription management with dunning, proration, and trial periods is out of scope for v1.

12. **Multi-Region Deployment** — Vercel + Supabase Mumbai (ap-south-1) is the only deployment configuration. Multi-region for global expansion is v2.

13. **Custom Domain Management** — Subdomain routing ({org}.prxos.com) is included. Custom domain (yourbusiness.com) setup assistance is included in Bundle tier, but automated custom domain provisioning is v2.

14. **Team Collaboration Features** — Real-time collaborative editing, shared workspaces, and team chat are out of scope. Basic messaging between business and client is included.

15. **Marketplace/Directory** — A directory of all PRX OS-powered businesses is out of scope for v1. This could be a future growth feature.

---

**END OF FILE 2: CLIENT REQUIREMENTS DOCUMENT**
