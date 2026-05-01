import Razorpay from "razorpay";
import crypto from "crypto";

/**
 * PRX Startup OS — Razorpay Integration
 * Order-based payment flow (not subscription-based)
 * Supports UPI, Cards, Net Banking for Indian market
 */

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

/**
 * Create a Razorpay Order (one-time payment)
 */
export async function createOrder(params: {
  amount: number; // in paise (e.g., 49900 = ₹499)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const order = await razorpay.orders.create({
    amount: params.amount,
    currency: params.currency || "INR",
    receipt: params.receipt,
    notes: params.notes || {},
  });
  return order;
}

/**
 * Verify Razorpay payment signature (HMAC SHA256)
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const body = `${params.orderId}|${params.paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(body)
    .digest("hex");

  return expectedSignature === params.signature;
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return signature === expectedSignature;
}

/**
 * Webhook event types for Razorpay
 */
export type WebhookEventType =
  | "payment.authorized"
  | "payment.captured"
  | "payment.failed"
  | "order.paid"
  | "refund.processed";

export interface WebhookEventData {
  payment?: {
    entity: {
      id: string;
      order_id: string;
      amount: number;
      currency: string;
      status: string;
      method: string;
      email: string;
      contact: string;
    };
  };
  order?: {
    entity: {
      id: string;
      amount: number;
      amount_paid: number;
      status: string;
      receipt: string;
    };
  };
}