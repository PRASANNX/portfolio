import Razorpay from "razorpay";
import { PLANS, type PlanKey } from "@/lib/constants";

/**
 * Razorpay instance
 */
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Map plan keys to Razorpay plan IDs
 */
export function getPlanId(plan: PlanKey): string {
  const planConfig = PLANS[plan];
  if (!planConfig?.priceId) {
    throw new Error(`Plan ${plan} does not have a Razorpay plan ID`);
  }
  return planConfig.priceId;
}

/**
 * Get plan details from Razorpay
 */
export async function getPlanDetails(planId: string) {
  try {
    const plan = await razorpay.plans.fetch(planId);
    return plan;
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw error;
  }
}

/**
 * Create a customer in Razorpay
 */
export async function createCustomer(email: string, name: string, orgId: string) {
  try {
    const customer = await razorpay.customers.create({
      email,
      name,
      metadata: {
        organization_id: orgId,
      },
    });
    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

/**
 * Create a subscription
 */
export async function createSubscription(
  planId: string,
  customerId: string,
  organizationId: string
) {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_id: customerId,
      customer_notify: 1,
      notify_info: {
        notify_email: 1,
      },
      addons: [],
      metadata: {
        organization_id: organizationId,
      },
    });
    return subscription;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

/**
 * Create checkout URL for payment
 */
export async function createCheckoutSession(
  customerId: string,
  subscriptionId: string
) {
  try {
    // Get subscription details
    const subscription = await razorpay.subscriptions.fetch(subscriptionId);
    
    // Create an invoice and get checkout URL
    const invoice = await razorpay.invoices.create({
      type: "subscription",
      subscription_id: subscriptionId,
      customer_id: customerId,
    });

    return {
      invoiceId: invoice.id,
      checkoutUrl: invoice.short_url,
      amount: subscription.amount,
    };
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  
  return signature === expectedSignature;
}

/**
 * Handle webhook events
 */
export type WebhookEventType =
  | "subscription.activated"
  | "subscription.ancelled"
  | "subscription.paused"
  | "subscription.pending"
  | "invoice.paid"
  | "invoice.payment_failed";

export interface WebhookEventData {
  subscription?: {
    id: string;
    status: string;
    customer_id: string;
    plan_id: string;
    current_period_start: number;
    current_period_end: number;
  };
  invoice?: {
    id: string;
    subscription_id: string;
    amount_paid: number;
    status: string;
  };
}