#!/usr/bin/env node
import { Command } from 'commander';
import { intro, text, isCancel, cancel, spinner, outro } from '@clack/prompts';
import fs from 'fs/promises';
import { linkSupabase, pushMigrations } from './supabase.js';
import { linkVercel } from './vercel.js';

const program = new Command();

program
  .name('prx-os')
  .description('Magic Deploy CLI for PRX Startup OS')
  .action(async () => {
    intro('⬛ PRX Startup OS: Executive Infrastructure Setup ⬛');

    const supabaseToken = await text({
      message: 'Enter your Supabase Personal Access Token:',
      placeholder: 'sbp_...',
    });
    if (isCancel(supabaseToken)) { cancel('Setup aborted.'); return; }

    const dbRef = await text({
      message: 'Enter your Supabase Project Reference ID (e.g., abcdefghijklm):',
    });
    if (isCancel(dbRef)) { cancel('Setup aborted.'); return; }

    const s = spinner();
    s.start('Linking Supabase and pushing migrations (001 to 005)...');
    
    try {
      await linkSupabase(dbRef as string, supabaseToken as string);
      await pushMigrations(supabaseToken as string);
      
      s.stop('✔ Database migrations applied successfully.');
    } catch (error: any) {
      s.stop('✖ Database push failed.');
      console.error(error?.message || error);
      process.exit(1);
    }

    // Generate strict .env.local
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://${dbRef}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
# Update secret keys manually in Vercel dashboard
`;
    await fs.writeFile('.env.local', envContent);

    const vercelToken = await text({
      message: 'Enter your Vercel Access Token (optional, press enter to skip):',
      placeholder: '...',
    });

    if (!isCancel(vercelToken) && vercelToken) {
      const vSpinner = spinner();
      vSpinner.start('Linking Vercel project...');
      try {
        await linkVercel(vercelToken as string);
        vSpinner.stop('✔ Vercel project linked successfully.');
      } catch (error: any) {
        vSpinner.stop('✖ Vercel linking failed. You can do this later.');
        console.error(error?.message || error);
      }
    }

    outro('✅ PRX OS is ready. Start building.');
  });

program.parse();
