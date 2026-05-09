-- ============================================
-- FEATURE 06: Psychology-Driven Brand Engine
-- ============================================

-- Add columns for brand psychology to organizations table
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS brand_archetype TEXT DEFAULT 'Outlaw',
ADD COLUMN IF NOT EXISTS typography_config JSONB DEFAULT '{"headingWeight": "800", "headingTracking": "-0.05em"}';

-- Add column for accent color if it doesn't exist (previously used but maybe not in schema)
ALTER TABLE public.organizations
ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#FF5F1F';
