import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/qa/seed-sub-brands
 * 
 * Temporary QA route: Seeds the 4 target sub-brands into the database
 * to validate multi-tenant routing, dynamic CSS variable injection,
 * and brand archetype theming.
 * 
 * Uses the Supabase Admin (service role) client to bypass RLS.
 * DELETE THIS ROUTE BEFORE PRODUCTION DEPLOYMENT.
 */
export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL' },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  // Sub-brand definitions per PRD
  const subBrands = [
    {
      name: 'CHITRAGUPT',
      slug: 'chitragupt',
      accent_color: '#1A2238',      // Ruler Archetype — Deep Navy
      brand_archetype: 'Ruler',
      typography_config: { headingWeight: '900', headingTracking: '-0.05em' },
      billing_tier: 'professional',
      is_active: true,
    },
    {
      name: 'GYMOS',
      slug: 'gymos',
      accent_color: '#065F46',      // Sage Archetype — Forest Green
      brand_archetype: 'Sage',
      typography_config: { headingWeight: '700', headingTracking: '-0.02em' },
      billing_tier: 'professional',
      is_active: true,
    },
    {
      name: 'TNC',
      slug: 'tnc',
      accent_color: '#121212',      // Executive Dark
      brand_archetype: 'Outlaw',
      typography_config: { headingWeight: '800', headingTracking: '-0.05em' },
      billing_tier: 'professional',
      is_active: true,
    },
    {
      name: 'LRM',
      slug: 'lrm',
      accent_color: '#7C3AED',      // Creator Archetype — Deep Purple
      brand_archetype: 'Creator',
      typography_config: { headingWeight: '800', headingTracking: '-0.02em' },
      billing_tier: 'professional',
      is_active: true,
    },
  ];

  const results: Record<string, any> = {};

  for (const brand of subBrands) {
    // Upsert organization (using slug as the conflict key)
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .upsert(brand, { onConflict: 'slug' })
      .select()
      .single();

    if (orgError) {
      results[brand.slug] = { status: 'FAILED', error: orgError.message };
      continue;
    }

    // Create a default landing page with components for this org
    // First check if one already exists
    const { data: existingPage } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('org_id', org.id)
      .eq('page_type', 'landing')
      .single();

    if (!existingPage) {
      // Create the landing page
      const { data: page, error: pageError } = await supabaseAdmin
        .from('pages')
        .insert({
          org_id: org.id,
          page_type: 'landing',
          slug: 'home',
          is_published: true,
          seo_title: brand.name,
          seo_description: `${brand.name} — Powered by PRX Startup OS`,
        })
        .select()
        .single();

      if (page && !pageError) {
        // Inject default components
        await supabaseAdmin.from('page_components').insert([
          {
            page_id: page.id,
            component_type: 'HeroSection',
            sort_order: 1,
            config: {
              headline: `Welcome to ${brand.name}`,
              subheadline: `${brand.name} is your next-generation platform, built on PRX Startup OS.`,
              cta_text: 'Get Started',
            },
            is_visible: true,
          },
          {
            page_id: page.id,
            component_type: 'FeaturesGrid',
            sort_order: 2,
            config: {
              title: 'What We Offer',
              features: [
                { icon: 'zap', title: 'Lightning Fast', description: 'Built for speed and reliability.' },
                { icon: 'shield', title: 'Enterprise Security', description: 'Bank-grade security out of the box.' },
                { icon: 'chart', title: 'Analytics', description: 'Real-time insights into your business.' },
              ],
            },
            is_visible: true,
          },
          {
            page_id: page.id,
            component_type: 'WaitlistBlock',
            sort_order: 3,
            config: {
              title: 'Join the Waitlist',
              subtitle: `Be among the first to experience ${brand.name}.`,
            },
            is_visible: true,
          },
        ]);
      }

      results[brand.slug] = {
        status: 'CREATED',
        org_id: org.id,
        accent: brand.accent_color,
        archetype: brand.brand_archetype,
        page_created: !!page,
      };
    } else {
      results[brand.slug] = {
        status: 'ALREADY_EXISTS',
        org_id: org.id,
        accent: brand.accent_color,
        archetype: brand.brand_archetype,
        page_exists: true,
      };
    }
  }

  return NextResponse.json({
    success: true,
    message: 'Sub-brand seeding complete. Visit /{slug} to verify.',
    results,
    verification_urls: subBrands.map(b => ({
      brand: b.name,
      url: `/${b.slug}`,
      expected_accent: b.accent_color,
      expected_archetype: b.brand_archetype,
    })),
  });
}
