import { NextResponse } from "next/server";
import { verifyWebhookSignature, WebhookEventData, WebhookEventType } from "@/lib/razorpay";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Use a generic secret for the platform webhook, or fetch org-specific if needed
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    const isValid = verifyWebhookSignature(bodyText, signature, webhookSecret);
    
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);
    const eventType = payload.event as WebhookEventType;
    const data = payload.payload as WebhookEventData;

    const supabase = await createClient();

    // 1. Process payment successful
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const orderId = eventType === "order.paid" 
        ? data.order?.entity.id 
        : data.payment?.entity.order_id;
        
      if (orderId) {
        // Update payment status in DB
        const { error } = await supabase
          .from("payments")
          .update({ 
            status: "completed",
            provider_payment_id: data.payment?.entity.id,
            metadata: { webhook_payload: payload }
          })
          .eq("provider_order_id", orderId);

        if (error) console.error("Error updating payment:", error);

        // Here we would also typically look up the invoice and mark it paid,
        // trigger email receipts, and send WhatsApp notifications.
      }
    }

    // 2. Process payment failed
    if (eventType === "payment.failed") {
      const orderId = data.payment?.entity.order_id;
      if (orderId) {
        await supabase
          .from("payments")
          .update({ 
            status: "failed",
            metadata: { error: payload.error_description || "Payment failed via webhook" }
          })
          .eq("provider_order_id", orderId);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
