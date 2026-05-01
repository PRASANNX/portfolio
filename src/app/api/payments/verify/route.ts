import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/payments/verify
 * Body: { orderId, paymentId, signature }
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { orderId, paymentId, signature } = body;

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { error: "orderId, paymentId, and signature are required" },
      { status: 400 }
    );
  }

  const isValid = verifyPaymentSignature({ orderId, paymentId, signature });

  if (!isValid) {
    // Mark as failed
    await supabase
      .from("payments")
      .update({ status: "failed", metadata: { reason: "Invalid signature" } })
      .eq("provider_order_id", orderId);

    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Mark payment as completed
  const { error } = await supabase
    .from("payments")
    .update({
      status: "completed",
      provider_payment_id: paymentId,
      provider_signature: signature,
    })
    .eq("provider_order_id", orderId);

  if (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Also mark the linked invoice as paid
  const { data: payment } = await supabase
    .from("payments")
    .select("invoice_id")
    .eq("provider_order_id", orderId)
    .single();

  if (payment?.invoice_id) {
    await supabase
      .from("invoices")
      .update({ status: "paid" })
      .eq("id", payment.invoice_id);
  }

  return NextResponse.json({ success: true, paymentId });
}
