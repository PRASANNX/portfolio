import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // MUST use standard Supabase JS for Admin bypass
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const redirectTo = req.nextUrl.searchParams.get('redirect_to') || '/portal';

  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Initialize Admin Client to bypass RLS and generate session
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Hash the incoming token to check against DB
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // 1. Verify token in DB
  const { data: magicLink, error } = await supabaseAdmin
    .from('magic_links')
    .select('*, profiles(email)')
    .eq('token_hash', hashedToken)
    .eq('is_used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !magicLink) {
    return NextResponse.redirect(new URL('/login?error=expired', req.url));
  }

  // 2. Mark as used to prevent replay attacks
  await supabaseAdmin
    .from('magic_links')
    .update({ is_used: true })
    .eq('id', magicLink.id);

  // 3. Generate Supabase Auth Session Link
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: magicLink.profiles.email,
  });

  if (authError || !authData.properties?.action_link) {
    return NextResponse.redirect(new URL('/login?error=auth_failed', req.url));
  }

  // 4. Construct final redirect URL
  // authData.properties.action_link establishes the cookie. We append next=redirectTo
  const actionLink = new URL(authData.properties.action_link);
  actionLink.searchParams.append('next', redirectTo);

  return NextResponse.redirect(actionLink);
}
