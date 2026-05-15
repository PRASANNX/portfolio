import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

/**
 * Seeds the Supabase DB with a test user profile and org
 * so the diagnostic suite can run end-to-end.
 */
async function seed() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('🌱 Seeding test data...\n');

  // Step 1: Create a test user in auth.users via admin API
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: 'qa-test@prx-os.dev',
    password: 'QATest@2024!',
    email_confirm: true,
    user_metadata: { full_name: 'QA Test User' }
  });

  if (authError && !authError.message.includes('already')) {
    console.error('❌ Failed to create test user:', authError.message);
    process.exit(1);
  }

  const userId = authUser?.user?.id;
  if (!userId) {
    // If user already exists, fetch it
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'qa-test@prx-os.dev')
      .single();
    
    if (existing) {
      console.log('✅ Test user already exists:', existing.id);
    } else {
      console.error('❌ Could not find or create test user.');
      process.exit(1);
    }
  } else {
    console.log('✅ Test user created:', userId);
  }

  // Step 2: Ensure profile exists (trigger should handle this, but be safe)
  const finalUserId = userId || (await supabase.from('profiles').select('id').eq('email', 'qa-test@prx-os.dev').single()).data?.id;
  
  if (finalUserId) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ id: finalUserId, email: 'qa-test@prx-os.dev', full_name: 'QA Test User' })
      .eq('id', finalUserId);
    
    if (profileError) console.warn('⚠️ Profile upsert:', profileError.message);
    else console.log('✅ Profile record confirmed.');
  }

  console.log('\n✅ Seed complete. Run diagnostics again.');
}

seed().catch(console.error);
