import { NextResponse } from "next/server";
import { createOrder } from "@/lib/razorpay";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/payments/create-order
 * Body: { invoiceId: string, amount: number, currency?: string }
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

  const { invoiceId, amount, currency = "INR" } = body;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  try {
    // Create Razorpay order (amount in paise)
    const order = await createOrder({
      amount: Math.round(amount * 100),
      currency,
      receipt: invoiceId || `receipt_${Date.now()}`,
      notes: {
        user_id: user.id,
        invoice_id: invoiceId || "",
      },
    });

    // Save payment record
    const { error: dbError } = await supabase.from("payments").insert({
      org_id: body.orgId,
      invoice_id: invoiceId || null,
      client_id: user.id,
      amount,
      currency,
      status: "pending",
      provider: "razorpay",
      provider_order_id: order.id,
    });

    if (dbError) {
      console.error("Error saving payment:", dbError);
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
