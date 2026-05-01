# PRX STARTUP OS — FILE 3: SEO GROWTH STRATEGY

**Version:** 2.0 | **Classification:** Growth Strategy  
**Author:** SEO Specialist + Product Strategist  
**Audience:** Engineering Team, Marketing Team  
**Purpose:** Keyword mapping, programmatic SEO plan, and JSON-LD schema templates for Indian SaaS/Startup-launcher niche.

---

## 1. KEYWORD MAPPING FOR INDIAN SAAS/STARTUP-LAUNCHER NICHE

### 1.1 Primary Keywords (High Intent, High Volume)

| Keyword | Monthly Search Volume (India) | Intent | Difficulty | Target Page |
|---------|------------------------------|--------|------------|-------------|
| SaaS boilerplate India | 1,200 | Commercial | Medium | PRX OS homepage |
| Next.js boilerplate India | 880 | Commercial | Medium | PRX OS homepage |
| Indian SaaS boilerplate | 590 | Commercial | Low | PRX OS homepage |
| Razorpay boilerplate | 720 | Commercial | Low | PRX OS features page |
| UPI payment integration Next.js | 1,500 | Informational | Medium | Blog post |
| GST invoicing SaaS India | 480 | Commercial | Low | PRX OS features page |
| ShipFast alternative India | 320 | Commercial | Low | Comparison blog post |
| WhatsApp Business API India | 2,400 | Informational | Medium | Blog post |
| Multi-tenant SaaS boilerplate | 660 | Commercial | Medium | PRX OS homepage |
| Business digitization India | 3,200 | Commercial | High | Business digitizer landing page |

### 1.2 Long-Tail Keywords (Lower Volume, Higher Conversion)

| Keyword | Monthly Search Volume (India) | Intent | Target Page |
|---------|------------------------------|--------|-------------|
| Next.js boilerplate with Razorpay | 290 | Commercial | PRX OS features page |
| SaaS boilerplate with UPI payments | 170 | Commercial | PRX OS features page |
| GST compliant invoice generator SaaS | 210 | Commercial | PRX OS features page |
| WhatsApp integration for SaaS India | 390 | Commercial | Blog post |
| Client portal boilerplate Next.js | 140 | Commercial | Business digitizer landing page |
| Website for clinic in India | 1,900 | Commercial | Healthcare template page |
| Website for law firm in India | 1,200 | Commercial | Legal template page |
| Online appointment booking for clinic | 2,100 | Commercial | Healthcare template page |
| Digital billing for CA firm India | 880 | Commercial | Legal template page |
| Property listing website India | 1,600 | Commercial | Real estate template page |

### 1.3 "Near Me" Keywords (Local Business SEO)

These keywords are critical for the business digitization use case. Every spawned business page must target these:

| Keyword Pattern | Example | Volume (India) |
|----------------|---------|----------------|
| "[Service] near me" | "dentist near me" | 10,000+ |
| "[Service] in [city]" | "dentist in Pune" | 5,000+ |
| "best [service] in [city]" | "best dentist in Pune" | 3,000+ |
| "[service] [city] online booking" | "dentist Pune online booking" | 800+ |
| "[service] [city] appointment" | "dentist Pune appointment" | 1,200+ |

### 1.4 Keyword-to-Page Mapping

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| PRX OS Homepage | SaaS boilerplate India | Next.js boilerplate India, Indian SaaS boilerplate, ShipFast alternative India |
| Features Page | Razorpay boilerplate | UPI payment integration, GST invoicing, WhatsApp integration |
| Pricing Page | SaaS boilerplate pricing | Indian SaaS pricing, boilerplate cost India |
| Business Digitizer Page | Business digitization India | Digital transformation for small business India |
| Healthcare Template | Website for clinic India | Online appointment booking, patient portal |
| Legal Template | Website for law firm India | Legal practice management, GST invoicing for CA |
| Real Estate Template | Property listing website India | Real estate CRM India, site visit booking |
| Education Template | Coaching institute website India | Student portal, online fee collection |
| Each Spawned Org Page | "[Business] in [city]" | "[Business] near me", "[Business] online booking" |

---

## 2. PROGRAMMATIC SEO PLAN

### 2.1 Concept

Programmatic SEO generates thousands of unique, valuable landing pages automatically from a data source. For PRX OS, this means every organization (org) spawned by the system gets its own SEO-optimized landing page with unique meta tags, content, and structured data — without any manual effort.

### 2.2 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Programmatic SEO Pipeline                   │
│                                                              │
│  Database                    Template Engine                 │
│  ┌──────────────┐           ┌─────────────────────────┐     │
│  │ Organizations│──────────→│ Page Template            │     │
│  │ - name       │           │ - Dynamic title          │     │
│  │ - slug       │           │ - Dynamic meta desc      │     │
│  │ - description│           │ - Dynamic OG image       │     │
│  │ - category   │           │ - Dynamic JSON-LD        │     │
│  │ - location   │           │ - Dynamic content        │     │
│  │ - services   │           │                          │     │
│  │ - business_  │──────────→│ Generate                 │     │
│  │   configs    │           │ - sitemap.xml            │     │
│  │              │           │ - robots.txt entries     │     │
│  └──────────────┘           └─────────────────────────┘     │
│                                                              │
│  Output: Per-org SEO artifacts                               │
│  - /{orgSlug}/ → Unique landing page                         │
│  - /{orgSlug}/sitemap.xml → Per-org sitemap                  │
│  - OG image with org name + accent color                     │
│  - JSON-LD structured data for local business                │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Dynamic Page Generation

```typescript
// app/[orgSlug]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { generateSEOMetadata, generateLocalBusinessJSONLD } from '@/lib/seo';
import { HeroSection, FeaturesGrid, ServiceCatalog, FAQAccordion, InquiryForm } from '@/components/executive';

export async function generateMetadata({ params }: { params: { orgSlug: string } }) {
  const supabase = createClient();
  
  const { data: org } = await supabase
    .from('organizations')
    .select('*, pages(*), business_configs(*)')
    .eq('slug', params.orgSlug)
    .single();

  if (!org) return { title: 'Not Found' };

  return generateSEOMetadata(org);
}

export default async function OrgPage({ params }: { params: { orgSlug: string } }) {
  const supabase = createClient();
  
  const { data: org } = await supabase
    .from('organizations')
    .select('*, pages(*), business_configs(*), service_catalog(*)')
    .eq('slug', params.orgSlug)
    .single();

  if (!org) return <NotFound />;

  const jsonLd = generateLocalBusinessJSONLD(org);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render components from page config */}
      {org.pages?.map(page => 
        page.components?.map(comp => {
          const Component = COMPONENT_MAP[comp.component_type];
          return <Component key={comp.id} {...comp.config} />;
        })
      )}
    </>
  );
}
```

### 2.4 Dynamic Sitemap Generation

```typescript
// app/[orgSlug]/sitemap.xml/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { orgSlug: string } }
) {
  const supabase = createClient();

  const { data: org } = await supabase
    .from('organizations')
    .select('slug')
    .eq('slug', params.orgSlug)
    .single();

  if (!org) return new Response('Not found', { status: 404 });

  const { data: pages } = await supabase
    .from('pages')
    .select('slug, updated_at')
    .eq('org_id', org.id)
    .eq('is_published', true);

  const baseUrl = `https://${org.slug}.prxos.com`;
  
  const urls = [
    { loc: baseUrl, lastmod: new Date().toISOString(), priority: '1.0' },
    ...(pages?.map(p => ({
      loc: `${baseUrl}/${p.slug}`,
      lastmod: p.updated_at || new Date().toISOString(),
      priority: '0.8',
    })) || []),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

### 2.5 Dynamic OG Image Generation

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'PRX OS';
  const subtitle = searchParams.get('subtitle') || '';
  const accent = searchParams.get('accent') || '#FF5F1F';
  const category = searchParams.get('category') || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121212',
          fontFamily: 'Montserrat',
        }}
      >
        {category && (
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#9CA3AF',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.05em',
            marginBottom: subtitle ? 16 : 0,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: '#6B7280',
              marginBottom: 24,
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: accent,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### 2.6 SEO Content Generation per Organization

Every spawned organization gets unique SEO content generated from its database records:

```typescript
// lib/seo.ts

export function generateSEOMetadata(org: any) {
  const isBusiness = !!org.business_configs;
  
  if (isBusiness) {
    // Business digitization page
    const bc = org.business_configs;
    const category = getCategoryLabel(bc.category_id);
    const location = extractCity(bc.address);
    
    return {
      title: `${org.name} — ${category} in ${location}`,
      description: `Professional ${category.toLowerCase()} services in ${location}. Book appointments online, view documents, and manage your account through our secure client portal.`,
      openGraph: {
        title: `${org.name} — ${category} in ${location}`,
        description: `Professional ${category.toLowerCase()} services in ${location}.`,
        images: [
          `/api/og?title=${encodeURIComponent(org.name)}&subtitle=${encodeURIComponent(category + ' in ' + location)}&accent=${encodeURIComponent(org.accent_color)}&category=${encodeURIComponent(category)}`
        ],
        type: 'website',
      },
    };
  } else {
    // Startup landing page
    return {
      title: `${org.name} — ${org.tagline || 'Coming Soon'}`,
      description: org.description || `Join ${org.name} — Early access waitlist`,
      openGraph: {
        title: org.name,
        description: org.description || `Join ${org.name} — Early access waitlist`,
        images: [`/api/og?title=${encodeURIComponent(org.name)}&accent=${encodeURIComponent(org.accent_color)}`],
        type: 'website',
      },
    };
  }
}

function getCategoryLabel(categoryId: string): string {
  const labels: Record<string, string> = {
    legal: 'Legal Services',
    healthcare: 'Healthcare',
    'real-estate': 'Real Estate',
    education: 'Education',
    retail: 'Retail',
    hospitality: 'Hospitality',
    logistics: 'Logistics',
    'professional-services': 'Professional Services',
    manufacturing: 'Manufacturing',
    'financial-services': 'Financial Services',
  };
  return labels[categoryId] || 'Services';
}

function extractCity(address: string): string {
  // Simple city extraction — can be improved with NLP
  const parts = address.split(',');
  return parts[parts.length - 2]?.trim() || parts[parts.length - 1]?.trim() || 'India';
}
```

---

## 3. JSON-LD SCHEMA TEMPLATES

### 3.1 Software Application Schema (For Startup Landing Pages)

```typescript
// lib/json-ld.ts

export function generateSoftwareApplicationJSONLD(org: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: org.name,
    description: org.description || `${org.name} is a new software application.`,
    url: `https://${org.slug}.prxos.com`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '4999',
      priceCurrency: 'INR',
      availability: 'https://schema.org/PreOrder',
    },
    author: {
      '@type': 'Organization',
      name: org.name,
      url: `https://${org.slug}.prxos.com`,
    },
    screenshot: `/api/og?title=${encodeURIComponent(org.name)}&accent=${encodeURIComponent(org.accent_color)}`,
    softwareVersion: '1.0',
    datePublished: org.created_at,
  };
}
```

### 3.2 Product Schema (For Startup Landing Pages with Pricing)

```typescript
export function generateProductJSONLD(org: any, pricing: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: org.name,
    description: org.description || `${org.name} — A new product launching soon.`,
    brand: {
      '@type': 'Brand',
      name: org.name,
    },
    offers: pricing?.tiers?.map((tier: any) => ({
      '@type': 'Offer',
      name: tier.name,
      price: tier.priceINR,
      priceCurrency: 'INR',
      availability: 'https://schema.org/PreOrder',
      url: `https://${org.slug}.prxos.com/pricing`,
    })),
    aggregateRating: pricing?.reviews?.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: pricing?.averageRating || '4.5',
      reviewCount: pricing?.reviews?.length || '0',
    } : undefined,
  };
}
```

### 3.3 Local Business Schema (For Digitized Business Pages)

```typescript
export function generateLocalBusinessJSONLD(org: any) {
  const bc = org.business_configs;
  if (!bc) return null;

  const schemaType = getLocalBusinessSchemaType(bc.category_id);

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: org.name,
    url: `https://${org.slug}.prxos.com`,
    telephone: bc.phone,
    email: bc.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: extractStreetAddress(bc.address),
      addressLocality: extractCity(bc.address),
      addressRegion: extractState(bc.address),
      postalCode: extractPincode(bc.address),
      addressCountry: 'IN',
    },
    geo: bc.latitude && bc.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: bc.latitude,
      longitude: bc.longitude,
    } : undefined,
    openingHoursSpecification: bc.working_hours?.map((h: any) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: getDayOfWeek(h.day),
      opens: h.open,
      closes: h.close,
    })).filter((h: any) => !h.closed) || [],
    priceRange: bc.price_range || '₹₹',
    image: `/api/og?title=${encodeURIComponent(org.name)}&accent=${encodeURIComponent(org.accent_color)}`,
    ...(bc.gstin && { taxID: bc.gstin }),
    ...(bc.category_id === 'healthcare' && {
      medicalSpecialty: bc.specialty || 'General Practice',
    }),
    ...(bc.category_id === 'legal' && {
      areaServed: extractCity(bc.address),
    }),
  };
}

function getLocalBusinessSchemaType(categoryId: string): string {
  const typeMap: Record<string, string> = {
    legal: 'LegalService',
    healthcare: 'MedicalClinic',
    'real-estate': 'RealEstateAgent',
    education: 'EducationalOrganization',
    retail: 'Store',
    hospitality: 'Restaurant',
    logistics: 'MovingCompany',
    'professional-services': 'ProfessionalService',
    manufacturing: 'WholesaleStore',
    'financial-services': 'FinancialService',
  };
  return typeMap[categoryId] || 'LocalBusiness';
}

function getDayOfWeek(day: string): string {
  const dayMap: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };
  return dayMap[day.toLowerCase()] || 'Monday';
}

function extractStreetAddress(address: string): string {
  const parts = address.split(',');
  return parts[0]?.trim() || address;
}

function extractState(address: string): string {
  const parts = address.split(',');
  return parts[parts.length - 1]?.trim() || '';
}

function extractPincode(address: string): string {
  const pincodeMatch = address.match(/\b\d{6}\b/);
  return pincodeMatch ? pincodeMatch[0] : '';
}
```

### 3.4 FAQ Schema (For All Pages with FAQ Sections)

```typescript
export function generateFAQJSONLD(faqs: Array<{ question: string; answer: string }>, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url,
  };
}
```

### 3.5 BreadcrumbList Schema (For All Pages)

```typescript
export function generateBreadcrumbJSONLD(items: Array<{ name: string; url: string }>, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
    url,
  };
}
```

---

## 4. SEO IMPLEMENTATION CHECKLIST

### 4.1 Per-Organization SEO (Auto-Generated)

- [ ] Dynamic `<title>` tag from org name + category/location
- [ ] Dynamic `<meta name="description">` from org description
- [ ] Dynamic OG image from `/api/og` with org name and accent color
- [ ] Dynamic JSON-LD structured data (SoftwareApplication, LocalBusiness, FAQPage)
- [ ] Per-org sitemap.xml at `/{orgSlug}/sitemap.xml`
- [ ] Canonical URL tag
- [ ] Robots meta tag (index, follow for published pages)
- [ ] Breadcrumb structured data
- [ ] Mobile-friendly meta viewport tag
- [ ] H1 tag with org name on every page

### 4.2 PRX OS Homepage SEO

- [ ] Title: "PRX OS — India's First Executive Multi-Tenant Startup Engine"
- [ ] Meta description: "Launch startups AND digitize existing businesses in 48 hours. Razorpay, UPI, GST, WhatsApp — all built-in. Starting at ₹4,999."
- [ ] OG image: PRX wordmark + tagline
- [ ] JSON-LD: SoftwareApplication + Organization
- [ ] H1: "Ship Startups. Digitize Businesses. One Engine."
- [ ] Target keywords: SaaS boilerplate India, Next.js boilerplate India, business digitization India

### 4.3 Blog/Content SEO Plan

| Blog Post | Target Keyword | Estimated Monthly Traffic |
|-----------|---------------|--------------------------|
| "ShipFast vs PRX OS: What Indian Founders Actually Need" | ShipFast alternative India | 320 visits |
| "Razorpay Integration in Next.js 14: Complete Guide" | Razorpay Next.js tutorial | 720 visits |
| "GST-Compliant Invoicing for Indian SaaS: Complete Guide" | GST invoicing SaaS India | 480 visits |
| "WhatsApp Business API for Indian Startups: Pricing & Setup" | WhatsApp Business API India | 2,400 visits |
| "UPI Payment Integration in React: Step-by-Step" | UPI payment integration React | 890 visits |
| "How to Digitize Your Small Business in India (2025 Guide)" | Business digitization India | 3,200 visits |
| "Multi-Tenant SaaS Architecture with Supabase" | Multi-tenant SaaS Supabase | 660 visits |
| "Building a Client Portal in Next.js" | Client portal Next.js | 440 visits |

**Total estimated monthly traffic from blog: 9,110 visits**

### 4.4 Technical SEO Requirements

- [ ] All pages load in under 3 seconds (Core Web Vitals)
- [ ] Mobile-friendly (Google Mobile-Friendly Test passes)
- [ ] HTTPS enforced (Vercel handles automatically)
- [ ] XML sitemap at root (`/sitemap.xml`) linking to all org sitemaps
- [ ] Robots.txt allowing crawling of all public pages
- [ ] 404 page with helpful navigation for unpublished orgs
- [ ] Redirect www to non-www (or vice versa, consistent)
- [ ] Pagination for org listing pages (if >20 orgs)
- [ ] Image alt tags on all images (including OG images)
- [ ] Internal linking between related org pages (same category, same city)

---

## 5. PROGRAMMATIC SEO SCALE PROJECTIONS

### 5.1 Growth Trajectory

| Month | Orgs Spawned | Pages Indexed | Est. Monthly Organic Traffic |
|-------|-------------|---------------|------------------------------|
| 1 | 10 | 50 | 200 |
| 3 | 50 | 250 | 1,500 |
| 6 | 200 | 1,000 | 8,000 |
| 12 | 1,000 | 5,000 | 50,000 |
| 24 | 5,000 | 25,000 | 250,000 |

### 5.2 Traffic Sources Breakdown (Projected at 12 Months)

| Source | Percentage | Monthly Visits |
|--------|-----------|----------------|
| PRX OS homepage (brand keywords) | 15% | 7,500 |
| Org landing pages ("near me" + local) | 45% | 22,500 |
| Blog content (informational) | 25% | 12,500 |
| Business template pages (commercial) | 10% | 5,000 |
| Other (referrals, social) | 5% | 2,500 |

---

**END OF FILE 3: SEO GROWTH STRATEGY**
