# FEATURE_02_DPDP_COMPLIANCE_ENGINE.md
**Version:** 1.0 | **Classification:** Architectural Blueprint
**Target:** Antigravity Coding Agent
**Feature:** DPDP Compliance & Legal Docs Generator

## 1. FEATURE OVERVIEW & UX
**Problem:** Razorpay KYC requires specific, localized legal documents (Terms of Service, Privacy Policy aligned with India's DPDP Act, and a Refund Policy explicitly stating a 5-7 working days timeline). Consultants waste hours drafting these for every offline business they digitize.
**UX Flow:**
1. Consultant deploys a business via the Digitizer Wizard.
2. In the Admin Dashboard, they navigate to the client's `Legal & Compliance` tab.
3. System reads the client's `business_configs` (GSTIN, Address, Category).
4. System auto-generated compliant HTML pages at `/[orgSlug]/legal/terms` etc.
5. Consultant clicks "Download KYC PDFs" -> `jsPDF` generates Razorpay-ready PDFs instantly.

## 2. TECHNICAL ARCHITECTURE
**Database:** Modify `004_business_digitizer.sql` to add a `legal_configs` JSONB column to the `business_configs` table. Keys must include: `grievance_officer_name`, `grievance_officer_email`, `refund_window_days` (default 7).
**API Layer:** `app/api/legal/generate-pdf/route.ts` (Optional, though client-side `jsPDF` is preferred to save server resources).
**Logic Flow:**
1. Fetch `business_configs` by `org_id`.
2. Inject variables into static markdown/string templates tuned for Indian law.
3. Render as React pages for the public website.
4. Render as a PDF Blob for the consultant dashboard download.

## 3. ANTIGRAVITY EXECUTION PLAN
**Files to Create:**
- `src/lib/compliance/legal-templates.ts` (Contains raw text templates).
- `src/lib/compliance/pdf-generator.ts` (jsPDF logic).
- `src/app/[orgSlug]/legal/privacy/page.tsx` (Public React page).
- `src/app/[orgSlug]/legal/terms/page.tsx`
- `src/app/[orgSlug]/legal/refund/page.tsx`

**Files to Modify:**
- `supabase/migrations/004_business_digitizer.sql` (Add `legal_configs` JSONB column).

**Step-by-Step Instructions:**
1. Update DB schema and run `supabase db push`.
2. Install `jspdf` and `jspdf-autotable`.
3. Create `legal-templates.ts`. Write rigorous, authoritative text templates with placeholders (e.g., `{{BUSINESS_NAME}}`, `{{GRIEVANCE_OFFICER}}`). Ensure the Refund Policy explicitly states "Refunds will be processed within 5-7 working days to the original source of payment."
4. Build the dynamic `/[orgSlug]/legal/*` pages using the Executive Minimalist typography (Montserrat H1/H2, Inter Body).
5. Implement `pdf-generator.ts` to output a B&W, purely typographic PDF.

**Verification:**
Navigate to `/[orgSlug]/legal/refund`. Verify the page renders perfectly in B&W with the correct business name injected. Trigger the PDF generation and verify the output contains no styling bloat—only clean, legal text.

## 4. SKELETON CODE
```typescript
// src/lib/compliance/pdf-generator.ts
import { jsPDF } from 'jspdf';

export interface BusinessLegalData {
  businessName: string;
  gstin: string;
  address: string;
  grievanceOfficer: string;
  contactEmail: string;
}

export async function generateRazorpayKYCDocs(data: BusinessLegalData) {
  const doc = new jsPDF();
  
  // Design Constraint: Executive Minimalist (Pure Typography)
  doc.setFont("helvetica", "bold"); 
  doc.setFontSize(22);
  doc.text(`${data.businessName} - Privacy Policy`, 20, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // text-gray-500
  doc.text(`GSTIN: ${data.gstin} | Address: ${data.address}`, 20, 28);
  
  doc.setTextColor(0, 0, 0); // text-black
  doc.setFontSize(12);

  // DPDP Act 2023 Specific Clause
  const privacyText = `1. Data Fiduciary\nUnder the Digital Personal Data Protection (DPDP) Act, 2023, ${data.businessName} acts as the Data Fiduciary. We appoint ${data.grievanceOfficer} as the primary Grievance Officer (${data.contactEmail}).\n\n2. Refund Policy\nAll refunds for services rendered will be processed strictly within 5-7 working days to the original source of payment, in compliance with RBI and payment gateway guidelines.`;
  
  const splitText = doc.splitTextToSize(privacyText, 170);
  doc.text(splitText, 20, 45);

  // Auto-save file
  doc.save(`${data.businessName.replace(/\s+/g, '-').toLowerCase()}-kyc-docs.pdf`);
}
```