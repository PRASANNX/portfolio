export interface BusinessLegalData {
  businessName: string;
  gstin: string;
  address: string;
  grievanceOfficer: string;
  contactEmail: string;
  refundWindowDays?: number;
}

export const getTermsTemplate = (data: BusinessLegalData) => `
TERMS OF SERVICE
Effective Date: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS
By accessing and using the services provided by ${data.businessName} (hereinafter referred to as "the Company"), you agree to abide by these Terms of Service.

2. SERVICE PROVISION & GST COMPLIANCE
The Company is registered under GSTIN: ${data.gstin}. All invoices generated will adhere to the CGST/SGST and IGST rules as prescribed by the Government of India. The registered address for all correspondence is: ${data.address}.

3. LIMITATION OF LIABILITY
The Company shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our services.
`;

export const getPrivacyTemplate = (data: BusinessLegalData) => `
PRIVACY POLICY & DPDP COMPLIANCE
Effective Date: ${new Date().toLocaleDateString()}

1. DATA FIDUCIARY
Under the Digital Personal Data Protection (DPDP) Act, 2023, ${data.businessName} acts as the Data Fiduciary. 

2. GRIEVANCE REDRESSAL
We appoint ${data.grievanceOfficer} as the primary Grievance Officer. For any data requests, deletions, or concerns, please contact the officer directly at: ${data.contactEmail}.

3. DATA COLLECTION & CONSENT
We collect minimal personal data strictly necessary for service delivery and GST invoicing. Consent is explicitly obtained prior to collection, in full compliance with the DPDP Act.
`;

export const getRefundTemplate = (data: BusinessLegalData) => `
REFUND POLICY
Effective Date: ${new Date().toLocaleDateString()}

1. REFUND TIMELINE
All refunds for services rendered or products returned will be processed strictly within ${data.refundWindowDays || 7} working days.

2. ORIGINAL SOURCE OF PAYMENT
Refunds will only be credited back to the original source of payment used during the transaction, in compliance with RBI and payment gateway guidelines (Razorpay).

3. CONTACT
For refund disputes, contact our support team at ${data.contactEmail}.
`;
