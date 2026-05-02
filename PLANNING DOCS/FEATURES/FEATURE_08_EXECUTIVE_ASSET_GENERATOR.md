# FEATURE_08_EXECUTIVE_ASSET_GENERATOR.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** Executive Asset Generator (OG Images & Social Banners)

## 1. FEATURE OVERVIEW & UX
**Problem:** Startups and consultants share their links on Twitter/LinkedIn, and the preview cards look generic, empty, or use cheap, auto-generated gradients. This destroys the "Executive Authority" required to charge ₹75,000 for a project.
**UX Flow:**
1. A new project is spawned via the dashboard.
2. The PRX OS automatically creates a `/api/og/executive?org=slug` route.
3. When the link is shared on social media, Twitter/LinkedIn requests this route.
4. The engine renders a highly-structured, data-dense SVG/PNG. It uses strict grid lines, the Montserrat font, the exact Brand Archetype colors, and displays key data (e.g., "Verified Partner", "GST Compliant", "Powered by PRX").
5. The founder looks instantly like a well-funded Series A startup.

## 2. TECHNICAL ARCHITECTURE
**Database:** Reads from `organizations` and `business_configs`.
**API Layer:** `app/api/og/executive/route.tsx` utilizing `@vercel/og` (Satori).
**Logic Flow:**
1. Extract `orgSlug` from URL parameters.
2. Fetch org details (Name, Tagline, Archetype colors, Category).
3. Construct a JSX tree that Satori compiles to SVG, then PNG.
4. Design constraints: Use CSS Grid/Flexbox heavily. Add thin `1px` borders to create a "dashboard/terminal" aesthetic. Inject the Neon Orange accent strictly for data points or borders.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `src/app/api/og/executive/route.tsx`
- `src/lib/fonts/Montserrat-Black.ttf` (Must bundle the font for Satori to render it properly).
- `src/lib/fonts/Inter-Medium.ttf`.

**Files to Modify:**
- `src/lib/seo.ts` (Update the OG image generator link to point to `/api/og/executive`).

**Step-by-Step Instructions:**
1. Step 1: Install `@vercel/og`.
2. Step 2: Download local `.ttf` files for Montserrat Black and Inter Medium to the `src/lib/fonts` directory (Satori requires raw font files buffer).
3. Step 3: Implement `route.tsx`. Use the Executive Minimalist design: a dark background (`#121212`), a strict 2-column or grid layout using `border-color: #333`, large Montserrat typography, and a bright accent color bar.
4. Step 4: Ensure the OG image includes a "trust badge" layout in the corner (e.g., "SECURE PORTAL" or "PRX INFRASTRUCTURE").

**Verification:**
Navigate to `http://localhost:3000/api/og/executive?title=Test&accent=%23FF5F1F&category=Legal`. You should see a highly professional, grid-based image rendering instantly without errors.

## 4. SKELETON CODE
```tsx
// src/app/api/og/executive/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// NOTE: Antigravity - You must fetch these ArrayBuffers locally in production
// import montserratBlack from '@/lib/fonts/Montserrat-Black.ttf'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'PRX Startup OS';
    const subtitle = searchParams.get('subtitle') || 'Executive Infrastructure';
    const accent = searchParams.get('accent') || '#FF5F1F';
    const category = searchParams.get('category') || 'SYSTEM';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            fontFamily: 'Montserrat',
            borderTop: `16px solid ${accent}`,
            padding: '60px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Bar: Grid Layout Simulation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '20px', width: '100%' }}>
            <div style={{ display: 'flex', letterSpacing: '0.1em', fontSize: 24, color: '#9CA3AF', textTransform: 'uppercase' }}>
              // {category}_PORTAL
            </div>
            <div style={{ display: 'flex', color: accent, fontSize: 24, fontWeight: 'bold' }}>
              SECURE 
            </div>
          </div>

          {/* Main Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
            <h1
              style={{
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              {title}
            </h1>
            <p style={{ fontSize: 32, color: '#9CA3AF', fontFamily: 'Inter', maxWidth: '80%' }}>
              {subtitle}
            </p>
          </div>

          {/* Bottom Data Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #333', paddingTop: '30px', width: '100%' }}>
            <div style={{ display: 'flex', fontSize: 20, color: '#6B7280', fontFamily: 'Inter' }}>
              RAZORPAY ENABLED • GST COMPLIANT • END-TO-END ENCRYPTED
            </div>
            <div style={{ display: 'flex', fontSize: 20, color: '#6B7280', fontFamily: 'Inter', fontWeight: 'bold' }}>
              POWERED BY PRX
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [ { name: 'Montserrat', data: fontBuffer, weight: 900 } ] // Add font buffer here
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
```