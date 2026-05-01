/**
 * PRX Startup OS — Content Generator
 * Templates for X threads and LinkedIn case studies
 */

export interface ContentInput {
  orgName: string;
  category: string;
  metrics?: {
    waitlistCount?: number;
    daysLive?: number;
    revenue?: string;
  };
}

export function generateXThread(input: ContentInput): string[] {
  const { orgName, category, metrics } = input;

  const tweets = [
    `🚀 We just launched ${orgName} — a ${category} platform built in under a week using @PRXStartupOS\n\nHere's how we did it 🧵`,

    `Step 1: We picked our business category (${category}) and the system auto-generated:\n\n• Landing page with waitlist\n• Client portal\n• Appointment booking\n• Invoice system with GST\n\nAll pre-configured for the Indian market.`,

    `Step 2: Brand customization took 30 seconds.\n\nWe picked our accent color, entered the business name, and got a live URL instantly.\n\nNo code. No designer. No BS.`,

    metrics?.waitlistCount
      ? `Results so far:\n\n📋 ${metrics.waitlistCount} waitlist signups\n📅 Live for ${metrics.daysLive || "?"} days\n${metrics.revenue ? `💰 ${metrics.revenue} revenue` : ""}\n\nAll from a single boilerplate.`
      : `The best part? Everything is production-ready from day one.\n\nRazorpay + UPI payments ✅\nGST invoicing ✅\nWhatsApp notifications ✅\nMulti-tenant architecture ✅`,

    `If you're building a startup or digitizing a local business in India, check out PRX Startup OS.\n\nIt's the fastest way to go from idea → live product.\n\n🔗 prxos.com`,
  ];

  return tweets;
}

export function generateLinkedInPost(input: ContentInput): string {
  const { orgName, category, metrics } = input;

  return `🏗️ Case Study: How ${orgName} launched a ${category} platform in under a week

The challenge: Build a production-ready business platform with payments, client management, and GST compliance — fast.

The solution: PRX Startup OS

What we shipped:
→ Multi-tenant landing page with waitlist capture
→ Client portal with document management
→ Appointment booking system
→ Razorpay integration with UPI support
→ Automated GST invoicing (CGST/SGST/IGST)
→ WhatsApp notification system

${metrics?.waitlistCount ? `📊 Results: ${metrics.waitlistCount} waitlist signups in ${metrics.daysLive || "?"} days` : ""}

The Indian startup ecosystem moves fast. Your infrastructure should too.

#StartupOS #IndiaStartups #SaaS #BusinessDigitization #PRX`;
}
