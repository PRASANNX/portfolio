// src/lib/content/hook-templates.ts
// Deterministic LinkedIn/Twitter hook generator — no AI, no hallucinations.

export interface ProjectMetrics {
  businessName: string;
  industry: string;
  timeToBuild: string;
  clientPrice: string;
  oldWorkflow: string;
  prxCost: string; // usually '₹9,999'
}

// Utility to calculate profit string
function calculateProfit(price: string, cost: string): string {
  const p = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
  const c = parseInt(cost.replace(/[^0-9]/g, ''), 10) || 0;
  return (p - c).toLocaleString('en-IN');
}

// ─── HOOK 1: The Math Breakdown ───────────────────────────────────────
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

If you're an Indian developer, stop reinventing auth and payments. Ship faster. 🇮🇳👇`;
}

// ─── HOOK 2: The Contrarian Take ──────────────────────────────────────
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

// ─── HOOK 3: The Case Study ───────────────────────────────────────────
export function generateCaseStudy(metrics: ProjectMetrics): string {
  const profit = calculateProfit(metrics.clientPrice, metrics.prxCost);

  return `Case Study: How I digitized a ${metrics.industry} business in ${metrics.timeToBuild} 📊

Client: ${metrics.businessName}
Problem: Running on ${metrics.oldWorkflow}. No online payments. No invoicing. No client portal.

What I delivered:
→ Full-stack portal with Razorpay payments
→ Automated GST invoicing
→ WhatsApp notifications on every transaction
→ Secure document vault for clients

Numbers:
• Build time: ${metrics.timeToBuild}
• Revenue: ${metrics.clientPrice}
• Cost: ${metrics.prxCost}
• Net: ₹${profit}

The client didn't just get a website. They got an operating system for their business.

This is the future of Indian tech consulting.
Stop selling hours. Start selling outcomes. 🚀`;
}

// ─── HOOK 4: The Mistake I Made ───────────────────────────────────────
export function generateMistakeHook(metrics: ProjectMetrics): string {
  return `The biggest mistake I made as a developer was building everything from scratch.

For years, I spent weeks on:
❌ Auth systems
❌ Payment integrations
❌ Dashboard layouts
❌ Deployment pipelines

Then I discovered something:
My clients don't care about my code. They care about their ${metrics.oldWorkflow} being fixed.

So when ${metrics.businessName} came to me with a ${metrics.industry} problem, I didn't start from zero.

I shipped their complete business portal in ${metrics.timeToBuild}.
I charged ${metrics.clientPrice}.

The lesson? Your value isn't in writing code.
It's in solving problems fast.

Indian devs — the ₹500/hour freelancing era is over.
The ₹50,000+ project era is here. 🇮🇳`;
}

// ─── HOOK 5: The Thread Opener (PAS Framework) ───────────────────────
export function generatePASThread(metrics: ProjectMetrics): string {
  const profit = calculateProfit(metrics.clientPrice, metrics.prxCost);

  return `"We've been using ${metrics.oldWorkflow} for 5 years."

That's what the founder of ${metrics.businessName} told me.

Here's what that actually means:
• Lost invoices
• No payment tracking
• Zero client portal
• Manual follow-ups every single day

And they're not alone. 80% of Indian ${metrics.industry} businesses run like this.

The fix wasn't a ₹5 lakh custom build.
It was a ${metrics.timeToBuild} deployment on PRX OS.

Result:
→ ${metrics.clientPrice} project
→ ₹${profit} profit
→ A client who now runs their business from a dashboard instead of WhatsApp groups

If you're a developer or consultant, there's a goldmine in digitizing traditional Indian businesses.

The tech is ready. The market is massive. 🇮🇳🔥`;
}

// ─── MASTER GENERATOR ─────────────────────────────────────────────────
export function generateAllHooks(metrics: ProjectMetrics): { title: string; content: string; framework: string }[] {
  return [
    { title: 'The Math Breakdown', content: generateMathBreakdown(metrics), framework: 'Math/ROI' },
    { title: 'The Contrarian Take', content: generateContrarianTake(metrics), framework: 'Contrarian' },
    { title: 'The Case Study', content: generateCaseStudy(metrics), framework: 'Case Study' },
    { title: 'The Mistake I Made', content: generateMistakeHook(metrics), framework: 'Storytelling' },
    { title: 'The PAS Thread', content: generatePASThread(metrics), framework: 'PAS' },
  ];
}
