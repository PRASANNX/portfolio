import { NextRequest, NextResponse } from "next/server";
import { razorpay, getPlanId, createCustomer, createCheckoutSession } from "../_lib/razorpay";
import { createClient } from "@/lib/supabase/server";
import type { PlanKey } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, organizationId } = body as { plan: PlanKey; organizationId: string };

    // Validate input
    if (!plan || !organizationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get organization
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", organizationId)
      .single();

    if (orgError || !org) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // Check if user is owner/admin of this organization
    const { data: membership } = await supabase
      .from("organization_members")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("user_id", user.id)
      .single();

    if (!membership || !["owner", "admin"].includes(membership.role)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    // Get user's profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Get Razorpay plan ID
    let planId: string;
    try {
      planId = getPlanId(plan);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    // Check if customer exists in Razorpay (stored in subscriptions table)
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", organizationId)
      .single();

    let customerId: string;

    if (existingSub?.razorpay_customer_id) {
      customerId = existingSub.razorpay_customer_id;
    } else {
      // Create new customer in Razorpay
      const customer = await createCustomer(
        profile.email,
        profile.full_name || "User",
        organizationId
      );
      customerId = customer.id;
    }

    // Create subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_id: customerId,
      customer_notify: 1,
      notify_info: {
        notify_email: 1,
      },
      metadata: {
        organization_id: organizationId,
        user_id: user.id,
      },
    });

    // Create checkout session
    const { checkoutUrl } = await createCheckoutSession(customerId, subscription.id);

    // Update or create subscription record in database
    if (existingSub) {
      await supabase
        .from("subscriptions")
        .update({
          razorpay_subscription_id: subscription.id,
          razorpay_customer_id: customerId,
          plan,
          status: "trialing",
        })
        .eq("id", existingSub.id);
    } else {
      await supabase.from("subscriptions").insert({
        organization_id: organizationId,
        razorpay_subscription_id: subscription.id,
        razorpay_customer_id: customerId,
        plan,
        status: "trialing",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        checkoutUrl,
      },
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}