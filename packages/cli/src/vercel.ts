import { execa } from 'execa';

export async function linkVercel(token: string): Promise<void> {
  await execa('npx', ['vercel', 'link', '--yes'], {
    env: { ...process.env, VERCEL_TOKEN: token } as any,
  });
}

export async function addVercelEnv(key: string, value: string, token: string): Promise<void> {
  await execa('npx', ['vercel', 'env', 'add', key, 'production'], {
    input: value,
    env: { ...process.env, VERCEL_TOKEN: token } as any,
  });
}
