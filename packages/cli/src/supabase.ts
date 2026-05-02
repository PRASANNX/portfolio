import { execa } from 'execa';

export async function linkSupabase(projectRef: string, token: string): Promise<void> {
  await execa('npx', ['supabase', 'link', '--project-ref', projectRef], {
    env: { ...process.env, SUPABASE_ACCESS_TOKEN: token } as any,
  });
}

export async function pushMigrations(token: string): Promise<void> {
  await execa('npx', ['supabase', 'db', 'push'], {
    env: { ...process.env, SUPABASE_ACCESS_TOKEN: token } as any,
  });
}
