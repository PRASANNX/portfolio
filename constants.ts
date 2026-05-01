/**
 * Application Constants
 */
export const APP_CONFIG = {
  name: "The Engine",
  version: "1.0.0",
  maxOrganisations: 5,
  maxTeamMembers: 10,
} as const;

/**
 * Subscription Plans Configuration
 */
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null,
    features: [
      "1 Organization",
      "Up to 2 team members",
      "Basic features",
      "Community support",
    ],
    limits: {
      projects: 5,
      storage: "1GB",
    },
  },
  starter: {
    name: "Starter",
    price: 29,
    priceId: process.env.RAZORPAY_STARTER_PLAN_ID,
    interval: "month",
    features: [
      "1 Organization",
      "Up to 5 team members",
      "Advanced features",
      "Email support",
      "API access",
    ],
    limits: {
      projects: 25,
      storage: "10GB",
    },
  },
  pro: {
    name: "Pro",
    price: 79,
    priceId: process.env.RAZORPAY_PRO_PLAN_ID,
    interval: "month",
    features: [
      "Unlimited Organizations",
      "Up to 20 team members",
      "All advanced features",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    limits: {
      projects: -1, // unlimited
      storage: "100GB",
    },
  },
  enterprise: {
    name: "Enterprise",
    price: 199,
    priceId: process.env.RAZORPAY_ENTERPRISE_PLAN_ID,
    interval: "month",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Dedicated support",
      "Custom contracts",
      "SLA guarantee",
      "White-label options",
    ],
    limits: {
      projects: -1,
      storage: "1TB",
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;

/**
 * Subscription Status
 */
export const SUBSCRIPTION_STATUS = {
  TRIALING: "trialing",
  ACTIVE: "active",
  PAST_DUE: "past_due",
  CANCELED: "canceled",
  PAUSED: "paused",
} as const;

/**
 * User Roles
 */
export const ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  MEMBER: "member",
} as const;

export type RoleKey = (typeof ROLES)[keyof typeof ROLES];