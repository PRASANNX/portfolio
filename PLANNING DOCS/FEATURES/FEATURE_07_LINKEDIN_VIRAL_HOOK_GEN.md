# FEATURE_07_LINKEDIN_VIRAL_HOOK_GEN.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** LinkedIn Viral Hook Generator

## 1. FEATURE OVERVIEW & UX
**Problem:** Consultants deliver incredible digital transformations but fail to market them because they don't know how to write "Build in Public" hooks. They stare at a blank LinkedIn post and end up writing boring corporate updates that get 3 likes.
**UX Flow:**
1. Consultant completes a client digitization project (e.g., a real estate portal).
2. On the project's success page (or in the Admin Dashboard), they click "Generate Case Study Assets".
3. A modal asks for 3 specific data points: 
   - `Time to build` (e.g., 48 hours)
   - `Client price charged` (e.g., ₹60,000)
   - `Previous workflow` (e.g., "WhatsApp and Excel").
4. The engine instantly generates 5 ready-to-copy LinkedIn/Twitter posts utilizing the exact frameworks from `5_CONTENT_REPURPOSING_LOGIC.md` (The Math Breakdown, The Contrarian, The Mistake I Made).
5. Consultant clicks "Copy" and posts.

## 2. TECHNICAL ARCHITECTURE
**Database:** No strict schema changes required, though saving `generated_hooks` in the `generated_content` table is recommended for history.
**API Layer:** `app/api/content/generate-hooks/route.ts`
**Logic Flow:**
1. Receive `org_id` and the 3 custom metrics from the frontend.
2. Fetch `business_configs` (industry, category, features enabled) for the org.
3. Pass data into a purely deterministic template engine (TypeScript string literals) to guarantee high-converting copywriting without AI hallucinations.
4. (Optional Phase 2) Pass the deterministically generated string to an LLM (e.g., OpenAI) for a "polishing" pass, constrained by a strict system prompt.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `src/lib/content/hook-templates.ts` (String builder logic based on the 4_COPYWRITING_FRAMEWORKS.md).
- `src/app/api/content/generate-hooks/route.ts`
- `src/components/executive/ViralHookGenerator.tsx` (Dashboard UI widget).

**Files to Modify:**
- `src/app/(dashboard)/admin/page.tsx` (Embed the `ViralHookGenerator` widget).

**Step-by-Step Instructions:**
1. Step 1: Create `hook-templates.ts`. Implement the `generateMathBreakdown` and `generateContrarianTake` functions. Use strict string interpolation.
2. Step 2: Build the API route to handle the request, fetch the org data, and return the array of 5 formatted posts.
3. Step 3: Build the `ViralHookGenerator.tsx` UI. Use the Executive Minimalist style: dark borders, monospace typography for the generated text blocks, and an accent-colored "Copy to Clipboard" button.
4. Step 4: Integrate the widget into the Consultant dashboard view for quick access post-deployment.

**Verification:**
Input mock data: "48 hours", "₹75,000", "Paper receipts". Click generate. Verify the output perfectly matches the "Math Breakdown" thread structure defined in the founder's strategy documentation.

## 4. SKELETON CODE
```typescript
// src/lib/content/hook-templates.ts

export interface ProjectMetrics {
  businessName: string;
  industry: string;
  timeToBuild: string;
  clientPrice: string;
  oldWorkflow: string;
  prxCost: string; // usually '₹9,999'
}

export function generateMathBreakdown(metrics: ProjectMetrics): string {
  const profit = calculateProfit(metrics.clientPrice, metrics.prxCost);

  return `The math that changed my ${metrics.industry} consulting business 🧵

BEFORE:
• Client used: ${metrics.oldWorkflow}
• My time spent: 2-3 weeks building from scratch
• Constant debugging and API headaches

AFTER PRX OS:
• Delivered a full ${metrics.industry} portal to ${metrics.businessName}
• Time spent: ${metrics.timeToBuild}
• Client charged: ${metrics.clientPrice}
• Infrastructure cost: ${metrics.prxCost}
• Pure Profit: ₹${profit}

The bridge? I stopped building boilerplate and started building businesses.
It's not a tool. It's a business model change.

If you're an Indian developer, stop reinventing auth and payments. 
Ship faster. 🇮🇳👇`;
}

export function generateContrarianTake(metrics: ProjectMetrics): string {
  return `Unpopular opinion: Indian web agencies are dying because they sell "websites" instead of "systems." 🧵

Yesterday, I delivered a project for ${metrics.businessName} (${metrics.industry}).
They didn't want a brochure website. They wanted to escape ${metrics.oldWorkflow}.

So in ${metrics.timeToBuild}, I deployed:
✅ Razorpay + UPI integration
✅ GST-compliant auto-invoicing
✅ A secure client portal
✅ WhatsApp notifications

I charged ${metrics.clientPrice}. The client was thrilled because it solves an operational nightmare.

Stop competing with Wix and Shopify on price.
Start selling operational infrastructure.

Built the entire thing on PRX OS. 
Developers, the game has changed. 🇮🇳👇`;
}

// Utility to calculate profit string
function calculateProfit(price: string, cost: string): string {
  const p = parseInt(price.replace(/[^0-9]/g, ''), 10);
  const c = parseInt(cost.replace(/[^0-9]/g, ''), 10);
  return (p - c).toLocaleString('en-IN');
}

export function generateAllHooks(metrics: ProjectMetrics): string[] {
  return [
    generateMathBreakdown(metrics),
    generateContrarianTake(metrics),
    // ... implement generateCaseStudy, generateMistakeHook
  ];
}
```