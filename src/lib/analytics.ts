/**
 * Multi-Tenant Analytics Utility (PostHog Wrapper)
 * Strictly scopes events to org_id for agency-scale visibility.
 */

import posthog from 'posthog-js';

// Event Constants per PRD
export const ANALYTICS_EVENTS = {
  ORG_CREATED: 'organization_created',
  BUSINESS_DIGITIZED: 'business_digitized',
  PAYMENT_COMPLETED: 'payment_completed',
  WHATSAPP_NOTIFICATION_SENT: 'whatsapp_notification_sent',
  LEAD_INQUIRY_RECEIVED: 'lead_inquiry_received',
  DOC_UPLOADED: 'document_uploaded',
  APPOINTMENT_BOOKED: 'appointment_booked',
} as const;

/**
 * Multi-tenant capture wrapper.
 * Constraint: Forces org_id to be passed for every event.
 */
export function trackOrgEvent(
  eventName: string, 
  orgId: string, 
  properties: Record<string, any> = {}
) {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, {
      org_id: orgId,
      ...properties,
    });
  }
}

/**
 * Identify user with their email and current org
 */
export function identifyUser(userId: string, email: string, currentOrgId?: string) {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, {
      email,
      current_org_id: currentOrgId,
    });
  }
}
