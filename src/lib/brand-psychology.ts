// src/lib/brand-psychology.ts

export type BrandArchetype = 'Ruler' | 'Outlaw' | 'Sage' | 'Creator';

export interface BrandConfig {
  name: string;
  description: string;
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
    name: 'The Ruler',
    description: 'Corporate, Legal, Enterprise. Projects unshakeable stability.',
    accentColor: '#1A2238',     // Deep Navy
    accentHover: '#111827',
    accentLight: '#1A223815',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F9FAFB',
    textPrimary: '#111827',
    headingWeight: '900',
    headingTracking: '-0.05em',
  },
  Outlaw: {
    name: 'The Outlaw',
    description: 'Disruptive SaaS, Indie Hackers. Projects speed and change.',
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
    name: 'The Sage',
    description: 'Healthcare, Education, Coaching. Projects wisdom and calm.',
    accentColor: '#065F46',     // Forest Green
    accentHover: '#047857',
    accentLight: '#065F4615',
    bgPrimary: '#FAFAF9',       // Softer off-white
    bgSecondary: '#F3F4F6',
    textPrimary: '#1F2937',
    headingWeight: '700',
    headingTracking: '-0.02em',
  },
  Creator: {
    name: 'The Creator',
    description: 'Design, Marketing, Creative. Projects innovation and style.',
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
  const config = ARCHETYPE_MAP[archetype] || ARCHETYPE_MAP.Outlaw;
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
