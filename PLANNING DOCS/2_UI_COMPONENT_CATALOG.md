# PRX STARTUP OS — FILE 2: UI COMPONENT CATALOG

**Version:** 2.0 | **Classification:** Design System  
**Author:** Lead UX Researcher + Product Strategist  
**Audience:** Engineering Team, Antigravity Coding Agent, Designers  
**Purpose:** Strict Tailwind CSS design system for the "Executive Minimalist" aesthetic with complete component specifications.

---

## 1. EXECUTIVE MINIMALIST DESIGN SYSTEM

### 1.1 Design Philosophy

The Executive Minimalist aesthetic strips away all decorative elements in favor of pure typographic authority. Every design decision must pass one test: "Does this add authority or distract from it?" This is NOT the friendly indie hacker aesthetic of ShipFast. This is the authoritative, no-nonsense aesthetic of serious infrastructure.

**Core Principles:**
1. Typography carries the visual weight — no illustrations, no decorative graphics
2. White space is a design element, not empty space
3. Borders and dividers separate content — never background colors
4. Single accent color used exclusively for action and attention
5. Data over decoration — tables and status trackers over charts and graphs
6. Mobile-first — 80%+ of Indian users access on mobile

### 1.2 Typography System

**Heading Font: Montserrat**
- Weights: 700 (Bold), 800 (ExtraBold), 900 (Black)
- Letter spacing: -0.02em to -0.05em (tight)
- Line height: 1.05 for H1, 1.15 for H2, 1.25 for H3+

| Level | Mobile | Tablet | Desktop | Tailwind Classes |
|-------|--------|--------|---------|-----------------|
| H1 | text-4xl | text-5xl | text-6xl lg:text-7xl | `font-['Montserrat'] font-extrabold tracking-tight leading-[1.05]` |
| H2 | text-3xl | text-4xl | text-5xl | `font-['Montserrat'] font-bold tracking-tight leading-tight` |
| H3 | text-2xl | text-3xl | text-4xl | `font-['Montserrat'] font-bold tracking-tight` |
| H4 | text-xl | text-2xl | text-3xl | `font-['Montserrat'] font-semibold tracking-tight` |
| H5 | text-lg | text-xl | text-2xl | `font-['Montserrat'] font-semibold` |
| H6 | text-base | text-lg | text-xl | `font-['Montserrat'] font-semibold` |

**Body Font: Inter**
- Weights: 400 (Regular), 500 (Medium)
- Line height: 1.6 to 1.75 (generous)

| Usage | Size | Tailwind Classes |
|-------|------|-----------------|
| Body text | text-base | `font-['Inter'] font-normal leading-relaxed` |
| Large body | text-lg | `font-['Inter'] font-normal leading-relaxed` |
| Small text | text-sm | `font-['Inter'] font-normal text-gray-500` |
| Caption | text-xs | `font-['Inter'] font-normal text-gray-400` |
| Label | text-sm | `font-['Inter'] font-medium` |
| Button text | text-base | `font-['Montserrat'] font-semibold` |

**Font Loading:**
```typescript
// app/layout.tsx
import { Montserrat, Inter } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 1.3 Color System

**Absolute Rules:**
- Backgrounds: ONLY `#FFFFFF` (white) or `#121212` (deep charcoal)
- Text: ONLY `#000000` (black) on white or `#FFFFFF` (white) on charcoal
- Secondary text: `#6B7280` (gray-500)
- Tertiary text: `#9CA3AF` (gray-400)
- Borders: `#E5E7EB` (gray-200)
- Accent: `#FF5F1F` (Neon Orange) — ONLY for CTAs, active states, focus rings

**NO gradients. NO decorative colors. NO colored backgrounds.**

```css
/* app/globals.css */
:root {
  --accent: #FF5F1F;
  --accent-hover: #E54E1A;
  --accent-light: #FF5F1F15;
  --bg-primary: #FFFFFF;
  --bg-dark: #121212;
  --text-primary: #000000;
  --text-on-dark: #FFFFFF;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;
  --border: #E5E7EB;
}

/* Semantic exception colors — ONLY for status indicators */
--success: #16A34A;    /* Payment completed, booking confirmed */
--warning: #CA8A04;    /* Payment pending, action required */
--error: #DC2626;      /* Payment failed, error state */
--info: #2563EB;       /* Informational messages */
--whatsapp: #25D366;   /* ONLY for WhatsApp icon */
```

### 1.4 Component Class Definitions

```css
/* app/globals.css — Component classes */

@layer components {
  /* Buttons */
  .btn-primary {
    @apply bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] 
           transition-colors duration-200 font-['Montserrat'] font-semibold 
           rounded-lg inline-flex items-center justify-center;
  }
  
  .btn-secondary {
    @apply border border-gray-300 text-black hover:bg-gray-50 
           transition-colors duration-200 rounded-lg 
           inline-flex items-center justify-center;
  }
  
  .btn-ghost {
    @apply text-[var(--accent)] hover:text-[var(--accent-hover)] 
           transition-colors duration-200 font-['Montserrat'] font-semibold;
  }

  /* Cards */
  .card {
    @apply bg-white border border-gray-200 rounded-lg;
  }
  
  .card-dark {
    @apply bg-[#121212] border border-gray-800 rounded-lg;
  }

  /* Inputs */
  .input {
    @apply w-full border border-gray-300 rounded-lg px-4 py-3 
           font-['Inter'] text-base
           focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent
           focus:outline-none transition-all duration-200;
  }

  /* Text */
  .heading-xl {
    @apply text-6xl lg:text-7xl font-['Montserrat'] font-extrabold tracking-tight leading-[1.05];
  }
  
  .heading-lg {
    @apply text-4xl sm:text-5xl font-['Montserrat'] font-bold tracking-tight leading-tight;
  }
  
  .heading-md {
    @apply text-3xl sm:text-4xl font-['Montserrat'] font-bold tracking-tight;
  }
  
  .body-lg {
    @apply text-lg font-['Inter'] font-normal leading-relaxed text-gray-600;
  }
  
  .body {
    @apply text-base font-['Inter'] font-normal leading-relaxed;
  }

  /* Badges */
  .badge-accent {
    @apply bg-[var(--accent-light)] text-[var(--accent)] text-xs font-semibold px-3 py-1 rounded-full;
  }
  
  .badge-success {
    @apply bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full;
  }
  
  .badge-warning {
    @apply bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full;
  }
  
  .badge-error {
    @apply bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full;
  }

  /* Sections */
  .section {
    @apply py-16 lg:py-24;
  }
  
  .section-dark {
    @apply py-16 lg:py-24 bg-[#121212];
  }

  /* Separators */
  .divider {
    @apply border-b border-gray-200;
  }
  
  .divider-dark {
    @apply border-b border-gray-800;
  }
}
```

### 1.5 Strict Rules Summary

| Rule | Detail | Exception |
|------|--------|-----------|
| Logos | Pure wordmarks only — text in Montserrat Bold | None |
| Icons | NO icons in logos or branding | Lucide icons ONLY within UI components |
| Gradients | Absolutely NO gradients of any kind | None |
| Backgrounds | White (#FFFFFF) or Charcoal (#121212) only | Semantic status badges |
| Accent Usage | ONLY for CTAs, active states, focus rings, key metrics | WhatsApp icon (#25D366) |
| Button Colors | Primary: accent only. Secondary: outline only | Status buttons (pay, cancel) |
| Decorative Elements | No illustrations, stock photos, decorative marks | None |
| Charts/Graphs | No charts — use data tables and status trackers | None |
| Color Saturation | One accent color only | Semantic status colors |

---

## 2. COMPONENT SPECIFICATIONS

### 2.1 HeroSection

**Purpose:** Full-width hero with headline, subheadline, CTA buttons, and optional eyebrow badge.

**Props Interface:**
```typescript
interface HeroSectionProps {
  eyebrow?: string;          // Optional badge text
  headline: string;          // Main headline (max 8 words)
  subheadline: string;       // Supporting text (max 25 words)
  ctaText: string;           // Primary CTA text
  ctaHref?: string;          // Primary CTA link
  ctaSecondaryText?: string; // Secondary CTA text
  ctaSecondaryHref?: string; // Secondary CTA link
  showWaitlist?: boolean;    // Show inline waitlist form
}
```

**Layout:**
- Mobile: `min-h-[80vh] flex items-center justify-center px-4`
- Desktop: `min-h-[90vh] flex items-center justify-center`
- Content: `max-w-4xl mx-auto text-center`
- Eyebrow badge: Centered, margin-bottom 4 (mb-4)
- Headline: H1 size, margin-bottom 6 (mb-6)
- Subheadline: Body-lg size, max-w-2xl mx-auto, margin-bottom 8 (mb-8)
- CTA buttons: Flex row on desktop, stacked on mobile
- Waitlist form: Below CTAs, max-w-lg mx-auto

**Mobile (360px):**
```
┌─────────────────────────┐
│   [Launch in 48 hrs]    │  ← Eyebrow badge (centered)
│                         │
│  Ship Your Startup      │  ← H1: text-4xl
│  in 48 Hours            │
│                         │
│  The complete Next.js   │  ← Subheadline: text-base
│  boilerplate with       │
│  Razorpay, UPI, GST.    │
│                         │
│  ┌───────────────────┐  │
│  │  Get Started      │  │  ← CTA: full-width
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  View Demo        │  │  ← Secondary: full-width
│  └───────────────────┘  │
└─────────────────────────┘
```

**Desktop (1440px):**
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                    [Launch in 48 hours]                          │
│                                                                  │
│              Ship Your Startup in 48 Hours                       │
│                                                                  │
│    The complete Next.js boilerplate with Razorpay, UPI, GST.     │
│                                                                  │
│         [Get Started — ₹4,999]    [View Features]                │
│                                                                  │
│              Trusted by 1,000+ Indian founders                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Implementation:**
```tsx
// components/executive/HeroSection.tsx
import { WaitlistBlock } from './WaitlistBlock';

export function HeroSection({
  eyebrow, headline, subheadline, ctaText, ctaHref,
  ctaSecondaryText, ctaSecondaryHref, showWaitlist, orgId
}: HeroSectionProps) {
  return (
    <section className="min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <span className="badge-accent mb-4 inline-block">{eyebrow}</span>
        )}
        <h1 className="heading-xl mb-6">{headline}</h1>
        <p className="body-lg max-w-2xl mx-auto mb-8">{subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={ctaHref} className="btn-primary px-8 py-4 text-lg">
            {ctaText}
          </a>
          {ctaSecondaryText && (
            <a href={ctaSecondaryHref} className="btn-secondary px-8 py-4 text-lg">
              {ctaSecondaryText}
            </a>
          )}
        </div>
        {showWaitlist && orgId && (
          <div className="mt-8">
            <WaitlistBlock orgId={orgId} />
          </div>
        )}
      </div>
    </section>
  );
}
```

### 2.2 PricingTable

**Purpose:** Tiered pricing cards with INR default, USD toggle, highlighted recommended tier.

**Props Interface:**
```typescript
interface PricingTableProps {
  title: string;
  subtitle?: string;
  currency: 'INR' | 'USD';
  tiers: Array<{
    name: string;
    priceINR: number;
    priceUSD?: number;
    description: string;
    features: string[];
    ctaText: string;
    ctaHref?: string;
    highlighted?: boolean;
    badge?: string;
  }>;
}
```

**Layout:**
- Mobile: Stacked cards, full-width each, margin-bottom 6
- Desktop: 3-column grid, highlighted tier has scale-105 and accent border
- Each card: White background, border-gray-200, rounded-lg, padding 8
- Price: Montserrat 800, large, black
- Features: Checkmark icon (accent color) + Inter body text
- CTA: Accent button for highlighted tier, outline for others

**Mobile (360px):**
```
┌─────────────────────────┐
│     Starter             │
│     ₹4,999              │
│     one-time            │
│                         │
│  ✓ Auth + Payments      │
│  ✓ SEO + Email          │
│  ✓ Waitlist Module      │
│                         │
│  ┌───────────────────┐  │
│  │  Get Started      │  │
│  └───────────────────┘  │
└─────────────────────────┘
┌─────────────────────────┐
│  ⭐ Most Popular        │
│     Professional        │
│     ₹9,999              │
│     one-time            │
│                         │
│  ✓ Everything in Starter│
│  ✓ 10 Business Templates│
│  ✓ Client Portal        │
│  ✓ WhatsApp Integration │
│  ✓ GST Invoicing        │
│                         │
│  ┌───────────────────┐  │
│  │  Get Professional │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

**Implementation:**
```tsx
// components/executive/PricingTable.tsx
import { Check } from 'lucide-react';

export function PricingTable({ title, subtitle, currency, tiers }: PricingTableProps) {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="heading-lg text-center mb-4">{title}</h2>
        {subtitle && <p className="body-lg text-center max-w-2xl mx-auto mb-12">{subtitle}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card p-6 lg:p-8 relative ${
                tier.highlighted ? 'border-2 border-[var(--accent)] md:scale-105' : ''
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}
              
              <h3 className="font-['Montserrat'] font-bold text-xl mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-['Montserrat'] font-extrabold">
                  ₹{tier.priceINR.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-500 text-sm ml-1">one-time</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={tier.ctaHref || '#'}
                className={tier.highlighted ? 'btn-primary w-full py-3' : 'btn-secondary w-full py-3'}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 2.3 Testimonials

**Purpose:** Social proof from relatable personas with specific outcomes.

**Props Interface:**
```typescript
interface TestimonialsProps {
  title: string;
  subtitle?: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company?: string;
    outcome?: string;    // Specific metric or result
  }>;
}
```

**Layout:**
- Mobile: Horizontal scroll with snap points (snap-x snap-mandatory)
- Desktop: 3-column grid
- Each testimonial: Card with border, padding 6
- Quote: Inter italic, text-gray-700
- Author: Montserrat 600, black
- Role: Inter 400, gray-500
- Outcome: Accent color badge

**Mobile (360px):**
```
← [Swipe to see more] →
┌─────────────────────────┐
│ "This saved me 3 weeks  │
│ of boilerplate setup."  │
│                         │
│ Arjun Sharma            │
│ Indie Hacker, Bangalore │
│                         │
│ ┌─────────────────────┐ │
│ │ ₹45K earned in 30d  │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

**Implementation:**
```tsx
// components/executive/Testimonials.tsx
export function Testimonials({ title, subtitle, testimonials }: TestimonialsProps) {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="heading-lg text-center mb-4">{title}</h2>
        {subtitle && <p className="body-lg text-center max-w-2xl mx-auto mb-12">{subtitle}</p>}
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card p-6 min-w-[85vw] md:min-w-0 snap-center flex-shrink-0"
            >
              <blockquote className="font-['Inter'] italic text-gray-700 leading-relaxed mb-4">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-['Montserrat'] font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                </div>
              </div>
              {t.outcome && (
                <div className="mt-4">
                  <span className="badge-accent">{t.outcome}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 2.4 WaitlistBlock

**Purpose:** Email capture form with accent CTA for pre-launch validation.

**Props Interface:**
```typescript
interface WaitlistBlockProps {
  title: string;
  subtitle?: string;
  placeholderText?: string;
  orgId: string;
}
```

**Layout:**
- Mobile: Centered stack, full-width input, full-width button
- Desktop: Centered, max-w-lg, inline input + button
- Input: Border-gray-300, focus ring accent color
- Button: Accent color, text "Join Waitlist"
- Success state: Checkmark + confirmation message

**Mobile (360px):**
```
┌─────────────────────────┐
│    Get Early Access     │
│                         │
│ ┌─────────────────────┐ │
│ │ Enter your email    │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │   Join Waitlist     │ │
│ └─────────────────────┘ │
│                         │
│  ✓ You're on the list!  │
│  We'll notify you.      │
└─────────────────────────┘
```

**Implementation:**
```tsx
// components/executive/WaitlistBlock.tsx
'use client';

import { useState } from 'react';

export function WaitlistBlock({ title, subtitle, placeholderText, orgId }: WaitlistBlockProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ org_id: orgId, email }),
      });
      
      if (!response.ok) throw new Error('Failed to join waitlist');
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-[var(--accent)] mb-2">✓</div>
        <p className="font-['Montserrat'] font-semibold">You're on the list!</p>
        <p className="text-sm text-gray-500 mt-1">We'll notify you when we launch.</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <h3 className="heading-md mb-2">{title}</h3>
      {subtitle && <p className="body text-gray-600 mb-6">{subtitle}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholderText || 'Enter your email'}
          className="input flex-1"
          required
        />
        <button type="submit" disabled={loading} className="btn-primary px-6 py-3 whitespace-nowrap">
          {loading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
```

### 2.5 FeaturesGrid

**Purpose:** Feature cards with icons, titles, and descriptions.

**Props Interface:**
```typescript
interface FeaturesGridProps {
  title: string;
  subtitle?: string;
  features: Array<{
    icon: string;      // Lucide icon name
    title: string;
    description: string;
  }>;
}
```

**Layout:**
- Mobile: 1 column, each feature separated by border-b border-gray-200
- Desktop: 3 columns with gap-8
- Icon: 24x24, accent color
- Title: Montserrat 700, text-lg
- Description: Inter 400, text-gray-600

**Implementation:**
```tsx
// components/executive/FeaturesGrid.tsx
import * as Icons from 'lucide-react';

export function FeaturesGrid({ title, subtitle, features }: FeaturesGridProps) {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="heading-lg text-center mb-4">{title}</h2>
        {subtitle && <p className="body-lg text-center max-w-2xl mx-auto mb-12">{subtitle}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <div key={i} className="border-b border-gray-200 md:border-0 py-6 md:py-0">
                {IconComponent && (
                  <IconComponent className="w-6 h-6 text-[var(--accent)] mb-4" />
                )}
                <h3 className="font-['Montserrat'] font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### 2.6 FAQAccordion

**Purpose:** Collapsible FAQ section using Shadcn Accordion component.

**Reference:** [Shadcn UI Accordion](https://ui.shadcn.com/docs/components/accordion)

**Props Interface:**
```typescript
interface FAQAccordionProps {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
}
```

**Layout:**
- Mobile: Full-width accordion items
- Desktop: Max-w-3xl centered
- Questions: Montserrat 600, text-base
- Answers: Inter 400, text-gray-600, leading-relaxed
- Separator: border-b border-gray-200 between items

**Implementation:**
```tsx
// components/executive/FAQAccordion.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQAccordion({ title, faqs }: FAQAccordionProps) {
  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="heading-lg text-center mb-8">{title}</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left font-['Montserrat'] font-semibold text-base py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-['Inter'] text-gray-600 leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

### 2.7 Final CTA Section

**Purpose:** Last-chance conversion section with urgency and clear action.

**Props Interface:**
```typescript
interface FinalCTAProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  trustSignal?: string;
}
```

**Layout:**
- Mobile: py-16, centered
- Desktop: py-24 lg:py-32
- Headline: Montserrat 800, text-4xl sm:text-5xl
- CTA: Large accent button
- Trust signal: Below CTA, gray text

**Implementation:**
```tsx
// components/executive/FinalCTA.tsx
export function FinalCTA({ headline, subheadline, ctaText, ctaHref, trustSignal }: FinalCTAProps) {
  return (
    <section className="py-24 lg:py-32 text-center px-4">
      <h2 className="heading-lg mb-4">{headline}</h2>
      <p className="body-lg max-w-2xl mx-auto mb-8">{subheadline}</p>
      <a href={ctaHref} className="btn-primary px-10 py-4 text-lg">
        {ctaText}
      </a>
      {trustSignal && (
        <p className="text-sm text-gray-500 mt-4">{trustSignal}</p>
      )}
    </section>
  );
}
```

---

## 3. COMPLETE COMPONENT INVENTORY

| # | Component | File Path | Purpose | Mobile | Desktop |
|---|-----------|-----------|---------|--------|---------|
| 1 | HeroSection | `components/executive/HeroSection.tsx` | Primary hero with CTA | Full-width stack | Centered, large type |
| 2 | FeaturesGrid | `components/executive/FeaturesGrid.tsx` | Feature showcase | 1-col, bordered | 3-col grid |
| 3 | PricingTable | `components/executive/PricingTable.tsx` | Tiered pricing | Stacked cards | 3-col, highlighted |
| 4 | Testimonials | `components/executive/Testimonials.tsx` | Social proof | Horizontal scroll | 3-col grid |
| 5 | WaitlistBlock | `components/executive/WaitlistBlock.tsx` | Email capture | Stacked | Inline |
| 6 | FAQAccordion | `components/executive/FAQAccordion.tsx` | FAQ section | Full-width | Max-w-3xl centered |
| 7 | FinalCTA | `components/executive/FinalCTA.tsx` | Last-chance CTA | Centered, py-16 | Centered, py-32 |
| 8 | StatusTracker | `components/executive/StatusTracker.tsx` | Step progress tracker | Horizontal scroll | Inline steps |
| 9 | ClientPortalShell | `components/executive/ClientPortalShell.tsx` | Portal layout wrapper | Hamburger menu | Fixed sidebar |
| 10 | DocumentVault | `components/executive/DocumentVault.tsx` | File management | Card list | Table view |
| 11 | AppointmentBooking | `components/executive/AppointmentBooking.tsx` | Calendar booking | Scrollable calendar | Full calendar |
| 12 | ServiceCatalog | `components/executive/ServiceCatalog.tsx` | Service listing | 1-col cards | 2-3 col grid |
| 13 | InvoicePreview | `components/executive/InvoicePreview.tsx` | GST invoice display | Scrollable | A4 layout |
| 14 | WhatsAppCTA | `components/executive/WhatsAppCTA.tsx` | WhatsApp chat button | Floating bottom-right | Floating bottom-right |
| 15 | InquiryForm | `components/executive/InquiryForm.tsx` | Contact form | Full-width | Max-w-lg |
| 16 | ProjectProgressBar | `components/executive/ProjectProgressBar.tsx` | Milestone timeline | Vertical timeline | Vertical timeline |

---

## 4. WORDMARK-ONLY LOGO RULES

### 4.1 The Rule

ALL logos must be pure wordmarks. Text only. No icons. No emojis. No graphic marks. The word IS the brand.

### 4.2 Examples

| ✅ Correct | ❌ Wrong |
|------------|----------|
| **CHITRAGUPT** in Montserrat Bold 700 | ⚖️ CHITRAGUPT (with scales icon) |
| **GYMOS** in Montserrat Bold 700 | 💪 GYMOS (with muscle emoji) |
| **TNC** in Montserrat Bold 700 | 🏠 TNC (with house icon) |
| **LRM** in Montserrat Bold 700 | 📚 LRM (with book icon) |
| **PRX** in Montserrat Black 900 | ◆ PRX (with diamond mark) |

### 4.3 Implementation

```tsx
// components/Wordmark.tsx
interface WordmarkProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  weight?: 'bold' | 'extrabold' | 'black';
}

export function Wordmark({ text, size = 'md', weight = 'bold' }: WordmarkProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  const weightClasses = {
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  return (
    <span className={`font-['Montserrat'] ${sizeClasses[size]} ${weightClasses[weight]} tracking-tight`}>
      {text}
    </span>
  );
}
```

### 4.4 Usage

```tsx
<Wordmark text="PRX" size="lg" weight="black" />
<Wordmark text="CHITRAGUPT" size="md" weight="bold" />
<Wordmark text="GYMOS" size="sm" weight="extrabold" />
```

---

## 5. INR/USD PRICING TOGGLE

**Purpose:** Allow visitors to view pricing in their preferred currency. Default to INR for Indian market.

**Implementation:**
```tsx
// components/executive/CurrencyToggle.tsx
'use client';

import { useState } from 'react';

export function CurrencyToggle({ onChange }: { onChange: (currency: 'INR' | 'USD') => void }) {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const handleToggle = () => {
    const newCurrency = currency === 'INR' ? 'USD' : 'INR';
    setCurrency(newCurrency);
    onChange(newCurrency);
  };

  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      <span className={`text-sm ${currency === 'INR' ? 'font-semibold' : 'text-gray-500'}`}>₹ INR</span>
      <button
        onClick={handleToggle}
        className="relative w-12 h-6 bg-gray-200 rounded-full transition-colors"
        aria-label="Toggle currency"
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-[var(--accent)] rounded-full transition-transform ${
            currency === 'USD' ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className={`text-sm ${currency === 'USD' ? 'font-semibold' : 'text-gray-500'}`}>$ USD</span>
    </div>
  );
}
```

**Conversion Rates (fixed for display):**
- ₹4,999 = $59
- ₹9,999 = $119
- ₹14,999 = $179

These rates are fixed for pricing display purposes. Actual payment is processed in INR for Indian customers and USD for international customers.

---

**END OF FILE 2: UI COMPONENT CATALOG**
