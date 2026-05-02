# FEATURE_06_PSYCHOLOGY_BRAND_ENGINE.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** Psychology-Driven Brand Engine

## 1. THE CREATIVE LOGIC (The "Brain")
**Problem:** Solo founders and consultants default to picking colors based on "vibes" or generic palettes, resulting in landing pages that look like amateur templates. They lack the creative direction to align color theory and typographic weight with the specific psychological intent of their business.
**Psychological Basis:** Colors and font weights dictate authority before a single word is read. 
- **The Ruler (Corporate/Legal):** Deep Navy/Charcoal base, subtle Gold/Slate accents, Heavy (900) tracking-tight fonts to project unshakeable stability.
- **The Outlaw (Disruptor/Startup):** High-contrast Pitch Black base, Neon Orange (`#FF5F1F`) accent, stark B&W photography. Projects speed and disruption.
- **The Sage (Healthcare/Education):** Forest Green or Deep Teal, muted off-white backgrounds. Projects wisdom, healing, and calm authority.

**UX Flow ("No Brand" to "Series A" in 5 Mins):**
1. User enters the "Brand Engine" step during project spawning.
2. Instead of a color picker, the UI asks: *"How do you want your clients to feel?"* (Options: Protected & Secure, Fast & Disruptive, Calm & Guided, Premium & Exclusive).
3. The engine selects the corresponding Brand Archetype.
4. It auto-generates the CSS palette (Base, Surface, Accent, Text) and typography settings (Weights, Tracking).
5. User sees a live preview of the Hero section transformed instantly. They click "Lock Identity".

## 2. TECHNICAL ARCHITECTURE (The "Bones")
**Database:** 
- Modify `organizations` table: Add `brand_archetype` (TEXT) and `typography_config` (JSONB).

**Next.js Integration:**
- Create `lib/brand-psychology.ts` to map Archetypes to exact hex codes and CSS variables.
- `ThemeWrapper.tsx` dynamically injects not just colors, but specific `--font-weight-display` and `--letter-spacing-display` variables based on the chosen archetype.

## 3. ANTIGRAVITY EXECUTION PLAN (The "Action")
**Files to Create:**
- `src/lib/brand-psychology.ts` (The archetype-to-CSS mapper)
- `src/components/executive/ArchetypeSelector.tsx` (The UI for the Spawner wizard)

**Files to Modify:**
- `src/components/ThemeWrapper.tsx` (To inject typography variables alongside colors)
- `src/components/CreateProjectModal.tsx` (Replace the hex color picker with the ArchetypeSelector)
- `tailwind.config.ts` (Map new CSS variables for letter-spacing and font-weight)

**Step-by-Step Instructions:**
1. Step 1: Implement `brand-psychology.ts` with the 4 core archetypes (Ruler, Outlaw, Sage, Creator). Hardcode the exact, conversion-tested hex values. No random generation.
2. Step 2: Update `ThemeWrapper.tsx` to read the archetype from the org config and inject `--heading-weight` and `--heading-tracking`.
3. Step 3: Build the `ArchetypeSelector.tsx` UI. Use `card` components that describe the psychological feeling, not just the colors.
4. Step 4: Ensure the `CreateProjectModal` saves this data to the `organizations` table upon deployment.

**Verification:**
Select "The Ruler". Verify the DOM injects a deep navy accent and `font-weight: 900`. Select "The Outlaw" and verify it injects `#FF5F1F` and sharp, stark contrast.

## 4. SKELETON CODE
```typescript
// src/lib/brand-psychology.ts

export type BrandArchetype = 'Ruler' | 'Outlaw' | 'Sage' | 'Creator';

export interface BrandConfig {
  accentColor: string;
  accentHover: string;
  accentLight: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  headingWeight: '700' | '800' | '900';
  headingTracking: '-0.02em' | '-0.05em';
}

export const ARCHETYPE_MAP: Record<BrandArchetype, BrandConfig> = {
  Ruler: {
    // Legal, Finance, Enterprise SaaS
    accentColor: '#1A2238',     // Deep Navy
    accentHover: '#111827',
    accentLight: '#1A223815',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F9FAFB',
    textPrimary: '#111827',
    headingWeight: '900',       // Unshakeable authority
    headingTracking: '-0.05em',
  },
  Outlaw: {
    // Disruptive SaaS, Indie Hackers (PRX Default)
    accentColor: '#FF5F1F',     // Neon Orange
    accentHover: '#E54E1A',
    accentLight: '#FF5F1F15',
    bgPrimary: '#121212',       // Stark Charcoal/Black
    bgSecondary: '#1F2937',
    textPrimary: '#FFFFFF',
    headingWeight: '800',
    headingTracking: '-0.05em',
  },
  Sage: {
    // Healthcare, Education, Coaching
    accentColor: '#065F46',     // Forest Green
    accentHover: '#047857',
    accentLight: '#065F4615',
    bgPrimary: '#FAFAF9',       // Softer off-white
    bgSecondary: '#F3F4F6',
    textPrimary: '#1F2937',
    headingWeight: '700',       // Calm, approachable
    headingTracking: '-0.02em',
  },
  Creator: {
    // Design, Marketing, Professional Services
    accentColor: '#7C3AED',     // Deep Purple
    accentHover: '#6D28D9',
    accentLight: '#7C3AED15',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F3F4F6',
    textPrimary: '#000000',
    headingWeight: '800',
    headingTracking: '-0.02em',
  }
};

export function getCSSVariablesForArchetype(archetype: BrandArchetype): Record<string, string> {
  const config = ARCHETYPE_MAP[archetype];
  return {
    '--accent': config.accentColor,
    '--accent-hover': config.accentHover,
    '--accent-light': config.accentLight,
    '--bg-primary': config.bgPrimary,
    '--bg-secondary': config.bgSecondary,
    '--text-primary': config.textPrimary,
    '--heading-weight': config.headingWeight,
    '--heading-tracking': config.headingTracking,
  };
}
```