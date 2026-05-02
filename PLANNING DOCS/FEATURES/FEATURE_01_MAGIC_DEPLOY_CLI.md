# FEATURE_01_MAGIC_DEPLOY_CLI.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** Magic Deploy CLI (`npx prx-os init`)

## 1. FEATURE OVERVIEW & UX
**Problem:** Setting up a production-ready Supabase backend, running 5 sequential SQL migrations, applying RLS policies, and connecting Vercel environment variables takes 30-45 minutes and is highly prone to human error (e.g., missing a trigger or mistyping a webhook secret).
**UX Flow:** 
1. Developer runs `npx prx-os init` in their terminal.
2. A sleek, minimalist CLI (using `@clack/prompts`) asks for `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, and `VERCEL_TOKEN`.
3. The CLI securely connects to Supabase, pushes `001` through `005` migrations, and sets up auth providers.
4. It connects to Vercel, links the repository, and injects the `.env.local` variables.
5. Displays a success message: "✅ Executive Engine Ready. Run npm run dev."

## 2. TECHNICAL ARCHITECTURE
**Database:** No schema changes. This tool interacts with the Supabase Management API and local Supabase CLI to push existing migrations.
**API Layer:** Interacts with `https://api.supabase.com/v1/projects` and Vercel REST API (`https://api.vercel.com/v9/projects`).
**Logic Flow:**
1. Capture inputs securely (masked terminal inputs).
2. Execute `npx supabase link --project-ref <ID>` via `execa`.
3. Execute `npx supabase db push`.
4. Generate `.env.local` via `fs.writeFile`.
5. Execute `vercel link` and `vercel env add`.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `packages/cli/package.json`
- `packages/cli/tsconfig.json`
- `packages/cli/src/index.ts` (Main CLI entry point)
- `packages/cli/src/supabase.ts` (Supabase command wrappers)
- `packages/cli/src/vercel.ts` (Vercel command wrappers)

**Files to Modify:**
- `/package.json` (Add workspace definition and `bin` command for `prx-os`).

**Step-by-Step Instructions:**
1. Create the `packages/cli` directory and initialize it as an npm workspace.
2. Install dependencies: `commander`, `@clack/prompts`, `execa`, `dotenv`.
3. Implement `src/index.ts` to handle the terminal UI and sequential execution.
4. Implement `src/supabase.ts` to wrap `execa` calls to the Supabase CLI, ensuring `SUPABASE_ACCESS_TOKEN` is passed via the `env` object to prevent token leakage in shell history.
5. Build the CLI using `tsc` and link it globally for local testing.

**Verification:** 
Run `node packages/cli/dist/index.js`. Verify it prompts for tokens, creates a `.env.local` file with the correct keys, and successfully executes a mock `execa` call without crashing.

## 4. SKELETON CODE
```typescript
// packages/cli/src/index.ts
import { Command } from 'commander';
import { intro, text, isCancel, cancel, spinner, outro } from '@clack/prompts';
import { execa } from 'execa';
import fs from 'fs/promises';

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
      // Securely execute Supabase CLI without exposing token in command string
      await execa('npx', ['supabase', 'link', '--project-ref', dbRef as string], {
        env: { SUPABASE_ACCESS_TOKEN: supabaseToken as string }
      });
      await execa('npx', ['supabase', 'db', 'push'], {
        env: { SUPABASE_ACCESS_TOKEN: supabaseToken as string }
      });
      
      s.stop('✔ Database migrations applied successfully.');
    } catch (error) {
      s.stop('✖ Database push failed.');
      console.error(error);
      process.exit(1);
    }

    // Generate strict .env.local
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://${dbRef}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
# Update secret keys manually in Vercel dashboard
`;
    await fs.writeFile('.env.local', envContent);

    outro('✅ PRX OS is ready. Start building.');
  });

program.parse();
```