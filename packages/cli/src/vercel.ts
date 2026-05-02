import { execa } from 'execa';

export async function linkVercel(token: string): Promise<void> {
  await execa('npx', ['vercel', 'link', '--yes'], {
    env: { VERCEL_TOKEN: token },
  });
}

export async function addVercelEnv(key: string, value: string, token: string): Promise<void> {
  await execa('npx', ['vercel', 'env', 'add', key, 'production'], {
    input: value,
    env: { VERCEL_TOKEN: token },
  });
}
