import { z } from 'zod';

// ─── PAS Framework ────────────────────────────────────────────────────
export const PAS_Schema = z.object({
  problem: z.string().min(10, "State the problem clearly (min 10 chars)."),
  agitate: z.string().min(10, "You must agitate the problem to drive conversion."),
  solution: z.string().min(10, "Present your solution clearly."),
});

// ─── AIDA Framework ──────────────────────────────────────────────────
export const AIDA_Schema = z.object({
  attention: z.string().min(10, "Grab their attention with a bold claim."),
  interest: z.string().min(10, "Build interest with facts or features."),
  desire: z.string().min(10, "Create desire with an outcome or transformation."),
  action: z.string().min(5, "Give a clear call to action."),
});

export type PASData = z.infer<typeof PAS_Schema>;
export type AIDAData = z.infer<typeof AIDA_Schema>;
export type CopyFramework = 'PAS' | 'AIDA';

// Compile PAS fields into a single marketing string
export function compilePAS(data: PASData): string {
  return `${data.problem}\n\n${data.agitate}\n\n${data.solution}`;
}

// Compile AIDA fields into a single marketing string
export function compileAIDA(data: AIDAData): string {
  return `${data.attention}\n\n${data.interest}\n\n${data.desire}\n\n${data.action}`;
}
