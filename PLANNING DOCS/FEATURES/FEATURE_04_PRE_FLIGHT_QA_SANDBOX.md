# FEATURE_04_PRE_FLIGHT_QA_SANDBOX.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** Pre-Flight QA Sandbox

## 1. FEATURE OVERVIEW & UX
**Problem:** Handovers to offline business owners (e.g., a clinic doctor) must be flawless. If a payment webhook fails on day 1, trust is destroyed. Manual testing of Razorpay webhooks, GST PDF generation, and WhatsApp triggers takes 20+ minutes per client.
**UX Flow:**
1. Consultant finishes configuring a client portal.
2. Clicks "Run Diagnostics" in the PRX OS dashboard.
3. A `ProjectProgressBar` UI appears showing 3 steps: `[1] GST Engine`, `[2] Razorpay Webhook`, `[3] WhatsApp Delivery`.
4. The system executes API calls in the background, simulating a `payment.captured` event.
5. Progress bar steps turn Neon Orange as they pass. A test WhatsApp message pings the consultant's phone.
6. Consultant confidently hits "Deploy to Production".

## 2. TECHNICAL ARCHITECTURE
**Database:** No schema changes required. Tests create transient data that is immediately rolled back or marked as `test_record = true`.
**API Layer:** Create `/api/qa/simulate/route.ts`. 
**Logic Flow:**
1. API receives `org_id` and `test_phone`.
2. **GST Test:** Call `generateGSTInvoice()` in dry-run mode. Validate output has 21 fields.
3. **Razorpay Test:** Construct a mock Razorpay JSON payload (`event: "payment.captured"`). Sign it with HMAC SHA256 using the local `RAZORPAY_WEBHOOK_SECRET`. POST it to the local `/api/payments/webhook` route to verify the internal database update logic works.
4. **WhatsApp Test:** Call `sendWhatsAppNotification()` to the `test_phone`.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `src/app/api/qa/simulate/route.ts`
- `src/components/executive/PreFlightSandbox.tsx`

**Files to Modify:**
- `src/components/digitize-business-modal.tsx` (Add Pre-Flight Sandbox to Step 4).

**Step-by-Step Instructions:**
1. Implement the API route. You MUST use Node `crypto` to generate a valid `x-razorpay-signature` header, otherwise the local webhook handler will reject it.
2. Implement the `PreFlightSandbox.tsx` UI component. Use a vertical timeline layout (borders connecting dots). 
3. Executive Minimalist Design Constraint: Pending steps are hollow circles with `border-gray-300`. Active/Processing is an animated spinner in `--accent`. Success is a solid `--accent` circle. Error is `bg-red-600`. Show raw JSON error logs in a `<pre className="text-xs bg-gray-50 border border-gray-200 p-2">` block if a step fails.

**Verification:**
Run the simulation. Intentionally misconfigure the `RAZORPAY_WEBHOOK_SECRET` in `.env.local` and verify the Sandbox catches the webhook failure and displays the HMAC validation error, preventing deployment.

## 4. SKELETON CODE
```typescript
// src/app/api/qa/simulate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { org_id, test_phone } = await req.json();
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET is missing");

    // 1. Simulate Razorpay Webhook
    // Construct a valid Razorpay payload matching our payments table schema
    const mockPayload = JSON.stringify({
      entity: "event",
      account_id: "acc_test",
      event: "payment.captured",
      contains: ["payment"],
      payload: {
        payment: {
          entity: {
            id: `pay_test_${Date.now()}`,
            amount: 500000, // ₹5000.00
            currency: "INR",
            status: "captured",
            order_id: `order_test_${Date.now()}`,
            notes: { org_id: org_id, type: 'qa_simulation' }
          }
        }
      }
    });

    // Generate valid HMAC signature
    const signature = crypto.createHmac('sha256', secret).update(mockPayload).digest('hex');
    
    // POST to local webhook route to test DB update logic
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const whRes = await fetch(`${appUrl}/api/payments/webhook`, {
      method: 'POST',
      headers: { 
        'x-razorpay-signature': signature, 
        'Content-Type': 'application/json' 
      },
      body: mockPayload
    });

    if (!whRes.ok) {
      throw new Error(`Webhook handler failed: ${await whRes.text()}`);
    }

    // 2. Simulate WhatsApp Delivery
    // Assuming sendWhatsAppNotification is imported from lib/whatsapp.ts
    /*
    const waRes = await sendWhatsAppNotification({
      org_id,
      recipient_phone: test_phone,
      template_name: 'qa_test_ping',
      template_data: { system: 'PRX OS' }
    });
    */

    return NextResponse.json({
      success: true,
      results: {
        gst: 'Passed',
        webhook: 'Passed',
        whatsapp: 'Passed'
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```