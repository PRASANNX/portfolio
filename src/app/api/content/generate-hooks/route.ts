import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateAllHooks, ProjectMetrics } from '@/lib/content/hook-templates';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { org_id, businessName, industry, timeToBuild, clientPrice, oldWorkflow, prxCost } = body;

    // Validate required fields
    if (!businessName || !industry || !timeToBuild || !clientPrice || !oldWorkflow) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, industry, timeToBuild, clientPrice, oldWorkflow' },
        { status: 400 }
      );
    }

    const metrics: ProjectMetrics = {
      businessName,
      industry,
      timeToBuild,
      clientPrice,
      oldWorkflow,
      prxCost: prxCost || '₹9,999',
    };

    // Generate all 5 hooks
    const hooks = generateAllHooks(metrics);

    return NextResponse.json({ hooks, metrics });
  } catch (error: any) {
    console.error('Hook generation failed:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
