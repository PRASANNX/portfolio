import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "../_lib/razorpay";
import { createClient } from "@/lib/supabase/server";
import { SUBSCRIPTION_STATUS, type PlanKey } from "@/lib/constants";

export const config = {
  api: {
    bodyParser: false, // Required for signature verification
  },
};

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Parse webhook payload
    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log(`Processing webhook event: ${event}`);

    const supabase = await createClient();

    // Handle different events
    switch (event) {
      case "subscription.activated":
      case "subscription.created": {
        const subscription = payload.payload.subscription.entity;
        
        // Update subscription status in database
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "active",
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq("razorpay_subscription_id", subscription.id);

        if (error) {
          console.error("Error updating subscription:", error);
        }

        // Update organization plan
        const planMap: Record<string, PlanKey> = {
          [process.env.RAZORPAY_STARTER_PLAN_ID!]: "starter",
          [process.env.RAZORPAY_PRO_PLAN_ID!]: "pro",
          [process.env.RAZORPAY_ENTERPRISE_PLAN_ID!]: "enterprise",
        };

        const newPlan = planMap[subscription.plan_id] || "starter";

        await supabase
          .from("organizations")
          .update({ plan: newPlan })
          .eq("id", subscription.metadata.organization_id);

        break;
      }

      case "subscription.cancelled": {
        const subscription = payload.payload.subscription.entity;

        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            cancel_at_period_end: true,
          })
          .eq("razorpay_subscription_id", subscription.id);

        break;
      }

      case "subscription.paused": {
        const subscription = payload.payload.subscription.entity;

        await supabase
          .from("subscriptions")
          .update({
            status: "paused",
          })
          .eq("razorpay_subscription_id", subscription.id);

        break;
      }

      case "subscription.resumed": {
        const subscription = payload.payload.subscription.entity;

        await supabase
          .from("subscriptions")
          .update({
            status: "active",
          })
          .eq("razorpay_subscription_id", subscription.id);

        break;
      }

      case "invoice.paid": {
        const invoice = payload.payload.invoice.entity;
        const subscriptionId = invoice.subscription_id;

        // Get subscription from database
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("razorpay_subscription_id", subscriptionId)
          .single();

        if (sub) {
          await supabase
            .from("subscriptions")
            .update({
              status: "active",
              current_period_end: new Date(invoice.period_end * 1000).toISOString(),
            })
            .eq("id", sub.id);

          // Update organization plan
          const planMap: Record<string, PlanKey> = {
            [process.env.RAZORPAY_STARTER_PLAN_ID!]: "starter",
            [process.env.RAZORPAY_PRO_PLAN_ID!]: "pro",
            [process.env.RAZORPAY_ENTERPRISE_PLAN_ID!]: "enterprise",
          };

          const newPlan = planMap[invoice.plan_id] || sub.plan;

          await supabase
            .from("organizations")
            .update({ plan: newPlan })
            .eq("id", sub.organization_id);
        }

        break;
      }

      case "invoice.payment_failed": {
        const invoice = payload.payload.invoice.entity;
        const subscriptionId = invoice.subscription_id;

        await supabase
          .from("subscriptions")
          .update({
            status: "past_due",
          })
          .eq("razorpay_subscription_id", subscriptionId);

        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}