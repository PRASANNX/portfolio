# FEATURE_09_THE_COPYWRITING_CO_PILOT.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** The Copywriting Co-Pilot (PAS / AIDA Enforcer)

## 1. FEATURE OVERVIEW & UX
**Problem:** The boilerplate provides great code, but founders write terrible, feature-obsessed copy that fails to convert. A blank WYSIWYG editor paralyzes them. They don't know how to sell the "hole" instead of the "drill."
**UX Flow:**
1. Founder goes to the PRX Dashboard to edit their Landing Page content.
2. They click "Edit Hero Section".
3. Instead of a blank text box, the UI forces a structured framework. They select a toggle: "Use PAS Framework" or "Use AIDA Framework".
4. The form splits into 3 strict fields. For PAS: 
   - `Problem`: "What is the specific pain your user feels right now?"
   - `Agitate`: "Why is this pain costing them money or time?"
   - `Solution`: "How does your tool fix this instantly?"
5. The UI compiles these 3 fields into the final `subheadline` or `description` data block automatically, ensuring the landing page reads like an expert copywriter wrote it.

## 2. TECHNICAL ARCHITECTURE
**Database:** No schema changes. This modifies how data is written to the `config JSONB` column in the `page_components` table.
**Next.js Integration:** Use `react-hook-form` and `zod` to strictly type and validate the PAS/AIDA structures in the admin dashboard.
**Logic Flow:**
1. Dashboard loads the edit view for `HeroSection` or `FeaturesGrid`.
2. Form renders the Co-Pilot UI. 
3. User types into the structured inputs. Helper text guides them (pulled from `4_COPYWRITING_FRAMEWORKS.md`).
4. On submit, the 3 fields are concatenated (with appropriate line breaks/spacing) into the single `description` string expected by the public component.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `src/components/dashboard/cms/CopywritingCoPilot.tsx` (The specific form component).
- `src/lib/content/copywriting-schemas.ts` (Zod schemas for validation).

**Files to Modify:**
- `src/app/(dashboard)/[orgId]/pages/edit/page.tsx` (Integrate the Co-Pilot into the page editor).

**Step-by-Step Instructions:**
1. Step 1: Define Zod schemas in `copywriting-schemas.ts` for the PAS and AIDA structures.
2. Step 2: Build the `CopywritingCoPilot.tsx` React component. 
3. Step 3: Design Constraint: The editor should look like a developer's IDE or a high-end financial form, not a toy. Use `bg-[#121212]` for the input areas, stark white text, and Neon Orange borders on focus. Include micro-copy placeholders that coach the user.
4. Step 4: Add a "Compile" function that takes the `Problem`, `Agitate`, and `Solution` strings and merges them into a single string to save into the Supabase `config` JSONB.

**Verification:**
In the dashboard, open the Co-Pilot. Select "PAS". Leave "Agitate" blank and attempt to save. Zod should throw a strict error: "You must agitate the problem to drive conversion." Fill all fields, save, and check the public landing page to see the perfectly structured copy.

## 4. SKELETON CODE
```typescript
// src/lib/content/copywriting-schemas.ts
import { z } from 'zod';

export const PAS_Schema = z.object({
  problem: z.string().min(10, "State the problem clearly (min 10 chars)."),
  agitate: z.string().min(10, "You must agitate the problem to drive conversion."),
  solution: z.string().min(10, "Present your solution clearly."),
});

export const AIDA_Schema = z.object({
  attention: z.string().min(10, "Grab their attention with a bold claim."),
  interest: z.string().min(10, "Build interest with facts or features."),
  desire: z.string().min(10, "Create desire with an outcome or transformation."),
  action: z.string().min(5, "Give a clear call to action."),
});

// Helper to compile down to the string expected by the database
export function compilePAS(data: z.infer<typeof PAS_Schema>): string {
  return `${data.problem}\n\n${data.agitate}\n\n${data.solution}`;
}
```

```tsx
// src/components/dashboard/cms/CopywritingCoPilot.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAS_Schema, compilePAS } from '@/lib/content/copywriting-schemas';

interface CoPilotProps {
  onSave: (compiledCopy: string) => void;
  initialData?: any;
}

export function CopywritingCoPilot({ onSave }: CoPilotProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(PAS_Schema)
  });

  const onSubmit = (data: any) => {
    const finalCopy = compilePAS(data);
    onSave(finalCopy);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 border border-gray-200 rounded-lg">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-['Montserrat'] font-bold text-lg">PAS Framework Co-Pilot</h3>
        <p className="text-sm text-gray-500 font-['Inter']">Stop writing features. Start writing conversions.</p>
      </div>

      <div className="space-y-2">
        <label className="font-['Montserrat'] font-semibold text-sm">1. Problem</label>
        <textarea 
          {...register('problem')} 
          placeholder="e.g., You're spending weeks setting up boilerplate code..."
          className="input w-full min-h-[80px]"
        />
        {errors.problem && <span className="text-xs text-red-600">{errors.problem.message as string}</span>}
      </div>

      <div className="space-y-2">
        <label className="font-['Montserrat'] font-semibold text-sm">2. Agitate</label>
        <textarea 
          {...register('agitate')} 
          placeholder="e.g., Meanwhile, your competitors are shipping and your dopamine is dropping..."
          className="input w-full min-h-[80px]"
        />
        {errors.agitate && <span className="text-xs text-red-600">{errors.agitate.message as string}</span>}
      </div>

      <div className="space-y-2">
        <label className="font-['Montserrat'] font-semibold text-sm">3. Solution</label>
        <textarea 
          {...register('solution')} 
          placeholder="e.g., PRX OS gives you Razorpay, Auth, and GST invoices out of the box in 48 hours."
          className="input w-full min-h-[80px]"
        />
        {errors.solution && <span className="text-xs text-red-600">{errors.solution.message as string}</span>}
      </div>

      <button type="submit" className="btn-primary w-full py-3">
        Compile & Save Copy
      </button>
    </form>
  );
}
```