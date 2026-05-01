# PRX STARTUP OS — FILE 1: FINTECH COMPLIANCE INDIA

**Version:** 2.0 | **Classification:** Technical Reference  
**Author:** Fintech Specialist + Product Strategist  
**Audience:** Engineering Team, Antigravity Coding Agent  
**Purpose:** Complete Indian payment integration, RBI compliance, GST invoicing, and tax calculation logic.

---

## 1. RAZORPAY INTEGRATION TECHNICAL WORKFLOW

### 1.1 Why Razorpay Over Stripe for India

| Factor | Stripe India | Razorpay |
|--------|-------------|----------|
| Access | Invite-only | Open signup |
| UPI Support | Limited (no intent flow) | Native UPI intent + QR |
| RBI E-Mandate | Complex setup | Built-in e-mandate flow |
| Settlement | T+7 days | T+2 days |
| UPI Success Rate | ~70% | 92-95% |
| Fees | 2% + ₹3 | 2% (no per-transaction fee) |
| Indian Support | Limited | Dedicated Indian support |
| GST on Fees | Manual tracking | Auto-GST on fees |

**Decision:** Razorpay is the primary payment gateway. Stripe may be added later for international customers but is not viable for Indian market entry.

### 1.2 Razorpay Integration Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    PRX OS Payment Flow                        │
│                                                               │
│  Client Portal                    Server                      │
│  ┌─────────────┐                 ┌──────────────────────┐    │
│  │ Click "Pay" │────POST────────→│ /api/payments/       │    │
│  │             │                 │ create-order          │    │
│  │             │←───{order_id}───│                       │    │
│  │ Razorpay    │                 │ Creates Razorpay      │    │
│  │ Checkout    │                 │ order server-side     │    │
│  │ SDK opens   │                 │                       │    │
│  │             │────payment─────→│ /api/payments/        │    │
│  │             │   success       │ verify                │    │
│  │             │                 │ Verifies signature    │    │
│  │             │                 │ Updates DB            │    │
│  │             │←───success──────│                       │    │
│  │ Show receipt│                 │ Triggers:             │    │
│  │             │                 │ - Invoice generation  │    │
│  │             │                 │ - WhatsApp receipt    │    │
│  │             │                 │ - Email receipt       │    │
│  └─────────────┘                 └──────────────────────┘    │
│                                                               │
│  Razorpay Webhook (async):                                    │
│  payment.captured → /api/payments/webhook → update status     │
└──────────────────────────────────────────────────────────────┘
```

### 1.3 Server-Side Order Creation

```typescript
// lib/razorpay.ts
import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createPaymentOrder(params: {
  amount: number;        // INR amount (e.g., 5000.00)
  currency: string;      // 'INR'
  receipt: string;       // Unique receipt number
  orgId: string;         // Organization ID
  clientId: string;      // Client user ID
  description: string;   // Payment description
  type: 'one-time' | 'milestone';
  metadata?: Record<string, string>;
}) {
  const order = await razorpay.orders.create({
    amount: Math.round(params.amount * 100), // Razorpay expects paise
    currency: params.currency,
    receipt: params.receipt,
    notes: {
      org_id: params.orgId,
      client_id: params.clientId,
      description: params.description,
      type: params.type,
      ...params.metadata,
    },
    payment_capture: 1, // Auto-capture
  });

  return order;
}

export function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean {
  const crypto = require('crypto');
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex');
  return expectedSignature === razorpaySignature;
}
```

### 1.4 Client-Side Checkout Integration

```typescript
// components/executive/RazorpayCheckout.tsx
'use client';

import { useState } from 'react';

interface RazorpayCheckoutProps {
  orgId: string;
  amount: number;
  description: string;
  businessName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

export function RazorpayCheckout({
  orgId, amount, description, businessName,
  clientName, clientEmail, clientPhone,
  onSuccess, onFailure
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          org_id: orgId,
          amount,
          description,
          type: 'one-time',
        }),
      });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: businessName,
        description: description,
        order_id: data.order_id,
        handler: function (response: any) {
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: clientName,
          email: clientEmail,
          contact: clientPhone,
        },
        theme: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--accent').trim() || '#FF5F1F',
        },
        modal: {
          ondismiss: function () {
            onFailure('Payment cancelled by user');
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      onFailure('Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="btn-primary w-full py-4 rounded-lg text-base disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString('en-IN')}`}
    </button>
  );
}
```

### 1.5 UPI Integration Details

**UPI Intent Flow (Mobile):**
On mobile devices, Razorpay checkout automatically detects UPI apps installed and opens the intent directly. This is the highest-converting payment method in India (92-95% success rate).

Supported UPI apps:
- Google Pay (GPay)
- PhonePe
- Paytm
- BHIM
- WhatsApp Pay

**UPI QR Code (Desktop):**
For desktop users, generate a scannable QR code:

```typescript
// components/executive/UPIQRCode.tsx
'use client';

import QRCode from 'react-qr-code';

interface UPIQRCodeProps {
  upiId: string;
  name: string;
  amount?: number;
  description?: string;
}

export function UPIQRCode({ upiId, name, amount, description }: UPIQRCodeProps) {
  // UPI deep link format
  const upiURL = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}${
    amount ? `&am=${amount}` : ''
  }${description ? `&tn=${encodeURIComponent(description)}` : ''}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <QRCode value={upiURL} size={200} />
      </div>
      <p className="text-sm text-gray-500 font-['Inter']">Scan to pay via UPI</p>
      <p className="text-xs text-gray-400 font-['Inter']">UPI ID: {upiId}</p>
    </div>
  );
}
```

---

## 2. RBI E-MANDATE AUTHENTICATION LOGIC

### 2.1 Understanding RBI E-Mandate Regulations

The Reserve Bank of India's e-mandate framework (effective October 1, 2021) governs all recurring electronic payments:

| Rule | Detail |
|------|--------|
| **AFA Requirement** | Additional Factor of Authentication required for ALL recurring payments |
| **Maximum without AFA** | ₹5,000 per transaction (below this, no AFA needed for first transaction) |
| **Mandatory AFA** | All transactions above ₹5,000 require explicit AFA for EACH recurring charge |
| **Notice Period** | Merchant must send notice 24 hours before debit for amounts above ₹5,000 |
| **Opt-out** | Customer can cancel mandate at any time through their bank |
| **Mandate Registration** | Requires explicit customer consent via OTP or net banking |
| **Maximum Mandate Amount** | Set by customer during registration (can be higher than actual recurring amount) |

### 2.2 Impact on PRX OS Subscription Model

**Critical Insight:** The recurring subscription model that Western SaaS relies on does NOT work smoothly in India. RBI e-mandate regulations cause:

1. High drop-off during mandate registration (additional OTP step)
2. Failed recurring charges due to AFA requirements
3. Customer complaints when unexpected debits occur
4. Bank-level blocks on recurring mandates

**PRX OS Strategy:** Focus on **one-time payments** and **milestone-based payments** instead of recurring subscriptions.

### 2.3 One-Time Payment Flow (Recommended)

```
Client decides to purchase
       ↓
Clicks "Pay Now"
       ↓
Razorpay checkout opens (UPI intent on mobile, all methods on desktop)
       ↓
Completes payment in one step
       ↓
Razorpay confirms payment
       ↓
System generates GST invoice
       ↓
Sends receipt via WhatsApp + Email
       ↓
Payment complete — no recurring charges
```

### 2.4 Milestone-Based Payment Flow (For Service Businesses)

```
Business owner creates project with milestones:
  - Milestone 1: 30% upfront (₹15,000)
  - Milestone 2: 40% mid-project (₹20,000)
  - Milestone 3: 30% on delivery (₹15,000)

Client pays Milestone 1 → One-time payment via Razorpay
       ↓
Business completes milestone 1
       ↓
System notifies client via WhatsApp: "Milestone 2 is ready for payment"
       ↓
Client pays Milestone 2 → Separate one-time payment
       ↓
Business completes milestone 2
       ↓
Client pays Milestone 3 → Separate one-time payment
       ↓
Project complete — all invoices generated
```

### 2.5 If Recurring Payments Are Required

For cases where recurring billing is unavoidable (e.g., monthly maintenance contracts), use Razorpay's e-mandate flow:

```typescript
// lib/razorpay-subscriptions.ts
// ONLY use this for maintenance contracts where recurring is necessary

export async function createRazorpaySubscription(params: {
  planId: string;        // Razorpay plan ID
  customerId: string;    // Razorpay customer ID
  totalAmount: number;   // Total subscription value
  quantity: number;      // Number of billing cycles
}) {
  // Step 1: Create registration link
  const subscriptionLink = await razorpay.subscription.create({
    plan_id: params.planId,
    customer_notify: 1,
    quantity: params.quantity,
    total_count: params.quantity,
    notes: {
      org_id: params.customerId,
    },
  });

  // Step 2: Send registration link to customer
  // Customer must complete AFA (OTP) to activate mandate
  return subscriptionLink;
}

// Alternative: Use Razorpay Payment Links for manual recurring
// This avoids e-mandate complexity entirely
export async function createPaymentLink(params: {
  amount: number;
  description: string;
  customer: { name: string; email: string; contact: string };
}) {
  const paymentLink = await razorpay.paymentLink.create({
    amount: Math.round(params.amount * 100),
    currency: 'INR',
    description: params.description,
    customer: {
      name: params.customer.name,
      email: params.customer.email,
      contact: params.customer.contact,
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
  });

  return paymentLink;
}
```

### 2.6 Payment Failure Handling

Indian payment failure rates are higher than global averages (8-12% for UPI, 15-20% for cards). Implement graceful handling:

```typescript
// lib/payment-handler.ts

export async function handlePaymentFailure(params: {
  paymentId: string;
  orgId: string;
  clientId: string;
  amount: number;
  attempt: number;
}) {
  const supabase = createClient();

  // Log failed payment
  await supabase.from('payments').update({
    status: 'failed',
    metadata: {
      failure_reason: params.reason,
      attempt_number: params.attempt,
    },
  }).eq('razorpay_payment_id', params.paymentId);

  // If first failure, send WhatsApp with retry link
  if (params.attempt === 1) {
    await sendWhatsAppNotification({
      org_id: params.orgId,
      recipient_phone: getClientPhone(params.clientId),
      template_name: 'payment_failed',
      template_data: {
        amount: params.amount.toLocaleString('en-IN'),
        retry_url: `https://${await getOrgSlug(params.orgId)}.prxos.com/portal/payments/retry/${params.paymentId}`,
      },
    });
  }

  // If third failure, mark as abandoned and notify business owner
  if (params.attempt >= 3) {
    await supabase.from('payments').update({
      status: 'cancelled',
    }).eq('razorpay_payment_id', params.paymentId);

    await notifyBusinessOwner({
      orgId: params.orgId,
      message: `Client payment of ₹${params.amount} failed after 3 attempts. Follow up manually.`,
    });
  }
}
```

---

## 3. GST-COMPLIANT INVOICING SYSTEM

### 3.1 GST Requirements for Indian SaaS

| Requirement | Detail |
|-------------|--------|
| **GST Rate** | 18% for IT/SaaS services (SAC code: 998314) |
| **Same State** | CGST 9% + SGST 9% |
| **Different State** | IGST 18% |
| **B2B with GSTIN** | Reverse charge may apply; GSTIN must be validated |
| **B2C** | Standard 18% GST |
| **E-Invoicing** | Mandatory for turnover >₹5 crore (B2B transactions) |
| **Invoice Fields** | 21 mandatory fields (see below) |
| **Penalty** | ₹10,000+ per non-compliant invoice |

### 3.2 21 Mandatory GST Invoice Fields

Every GST-compliant invoice MUST include:

1. **Invoice Number** — Unique, sequential, format: ORG-YYYY-NNNN
2. **Invoice Date** — Date of issue
3. **Due Date** — Payment due date (typically 30 days)
4. **Supplier Name** — Business name
5. **Supplier GSTIN** — 15-character GST identification number
6. **Supplier Address** — Complete business address
7. **Supplier PAN** — Permanent Account Number
8. **Recipient Name** — Client/customer name
9. **Recipient Address** — Complete client address
10. **Recipient GSTIN** — Client's GSTIN (if B2B, mandatory)
11. **Place of Supply** — State name (determines CGST/SGST vs IGST)
12. **Item Description** — Clear description of service/product
13. **HSN/SAC Code** — 998314 for IT services
14. **Quantity** — Number of units
15. **Rate** — Price per unit
16. **Taxable Amount** — Quantity × Rate (before GST)
17. **CGST Rate & Amount** — 9% (same state)
18. **SGST Rate & Amount** — 9% (same state)
19. **IGST Rate & Amount** — 18% (different state)
20. **Total Tax Amount** — Sum of all GST components
21. **Grand Total** — Taxable amount + total tax

### 3.3 Database Schema for GST Invoices

```sql
-- INVOICES TABLE (GST-compliant)
CREATE TABLE public.invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  client_id UUID REFERENCES public.profiles(id),
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  client_address TEXT,
  client_gstin TEXT,                    -- Mandatory for B2B
  client_state TEXT,                    -- Determines CGST/SGST vs IGST
  business_name TEXT NOT NULL,
  business_gstin TEXT NOT NULL,         -- Business GSTIN (mandatory)
  business_address TEXT NOT NULL,
  business_pan TEXT NOT NULL,           -- Business PAN (mandatory)
  business_state TEXT NOT NULL,         -- Business state
  place_of_supply TEXT NOT NULL,        -- Client's state
  items JSONB NOT NULL,                 -- Line items array
  subtotal NUMERIC(10, 2) NOT NULL,     -- Pre-tax total
  cgst_rate NUMERIC(5, 2) DEFAULT 9,
  cgst_amount NUMERIC(10, 2) DEFAULT 0,
  sgst_rate NUMERIC(5, 2) DEFAULT 9,
  sgst_amount NUMERIC(10, 2) DEFAULT 0,
  igst_rate NUMERIC(5, 2) DEFAULT 0,
  igst_amount NUMERIC(10, 2) DEFAULT 0,
  discount_total NUMERIC(10, 2) DEFAULT 0,
  grand_total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'partial', 'overdue', 'cancelled')),
  payment_id UUID REFERENCES public.payments(id),
  notes TEXT,
  terms TEXT DEFAULT 'Payment due within 30 days of invoice date.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, invoice_number)
);

-- Line items structure (JSONB):
-- [
--   {
--     "description": "Website Development - Homepage",
--     "hsn_sac": "998314",
--     "qty": 1,
--     "rate": 25000,
--     "discount": 0,
--     "taxable_amount": 25000,
--     "cgst_rate": 9,
--     "sgst_rate": 9,
--     "igst_rate": 0,
--     "cgst_amount": 2250,
--     "sgst_amount": 2250,
--     "igst_amount": 0,
--     "total": 29500
--   }
-- ]
```

### 3.4 Dynamic Tax Calculation Logic

```typescript
// lib/gst-calculator.ts

interface TaxCalculationInput {
  businessState: string;      // e.g., "Maharashtra"
  clientState: string;        // e.g., "Karnataka"
  items: Array<{
    description: string;
    hsn_sac: string;
    qty: number;
    rate: number;
    discount?: number;
  }>;
  cgstRate?: number;          // Default 9
  sgstRate?: number;          // Default 9
  igstRate?: number;          // Default 18
}

interface TaxCalculationOutput {
  items: Array<{
    description: string;
    hsn_sac: string;
    qty: number;
    rate: number;
    discount: number;
    taxable_amount: number;
    cgst_rate: number;
    sgst_rate: number;
    igst_rate: number;
    cgst_amount: number;
    sgst_amount: number;
    igst_amount: number;
    total: number;
  }>;
  subtotal: number;
  cgst_total: number;
  sgst_total: number;
  igst_total: number;
  discount_total: number;
  grand_total: number;
}

export function calculateGST(input: TaxCalculationInput): TaxCalculationOutput {
  const isSameState = input.businessState === input.clientState;
  const cgstRate = input.cgstRate ?? 9;
  const sgstRate = input.sgstRate ?? 9;
  const igstRate = input.igstRate ?? 18;

  let subtotal = 0;
  let cgstTotal = 0;
  let sgstTotal = 0;
  let igstTotal = 0;
  let discountTotal = 0;

  const calculatedItems = input.items.map(item => {
    const discount = item.discount ?? 0;
    const taxableAmount = (item.qty * item.rate) - discount;

    let cgstAmount = 0, sgstAmount = 0, igstAmount = 0;

    if (isSameState) {
      // CGST + SGST (same state)
      cgstAmount = (taxableAmount * cgstRate) / 100;
      sgstAmount = (taxableAmount * sgstRate) / 100;
    } else {
      // IGST (different state)
      igstAmount = (taxableAmount * igstRate) / 100;
    }

    const total = taxableAmount + cgstAmount + sgstAmount + igstAmount;

    subtotal += taxableAmount;
    cgstTotal += cgstAmount;
    sgstTotal += sgstAmount;
    igstTotal += igstAmount;
    discountTotal += discount;

    return {
      description: item.description,
      hsn_sac: item.hsn_sac,
      qty: item.qty,
      rate: item.rate,
      discount,
      taxable_amount: taxableAmount,
      cgst_rate: isSameState ? cgstRate : 0,
      sgst_rate: isSameState ? sgstRate : 0,
      igst_rate: isSameState ? 0 : igstRate,
      cgst_amount: cgstAmount,
      sgst_amount: sgstAmount,
      igst_amount: igstAmount,
      total,
    };
  });

  return {
    items: calculatedItems,
    subtotal,
    cgst_total: cgstTotal,
    sgst_total: sgstTotal,
    igst_total: igstTotal,
    discount_total: discountTotal,
    grand_total: subtotal + cgstTotal + sgstTotal + igstTotal,
  };
}
```

### 3.5 Invoice Generation Function

```typescript
// lib/invoice.ts
import { createClient } from '@/lib/supabase/server';
import { calculateGST } from '@/lib/gst-calculator';

export async function generateGSTInvoice(params: {
  orgId: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  clientGstin?: string;
  clientState: string;
  items: Array<{
    description: string;
    hsn_sac: string;
    qty: number;
    rate: number;
    discount?: number;
  }>;
  paymentId?: string;
}) {
  const supabase = createClient();

  // Get business details from organization
  const { data: org } = await supabase
    .from('organizations')
    .select('*, business_configs(*)')
    .eq('id', params.orgId)
    .single();

  if (!org || !org.business_configs) {
    throw new Error('Organization or business config not found');
  }

  const businessConfig = org.business_configs;

  // Validate required business fields
  if (!businessConfig.gstin) {
    throw new Error('Business GSTIN is required for invoice generation');
  }
  if (!businessConfig.address) {
    throw new Error('Business address is required for invoice generation');
  }

  // Determine place of supply
  const placeOfSupply = params.clientState;

  // Calculate GST
  const taxCalc = calculateGST({
    businessState: businessConfig.state,
    clientState: params.clientState,
    items: params.items,
  });

  // Generate invoice number: ORG-YYYY-NNNN
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from('invoices')
    .select('*', { count: 'exact', head: true })
    .eq('org_id', params.orgId);
  const sequence = String((count || 0) + 1).padStart(4, '0');
  const invoiceNumber = `${org.slug.toUpperCase()}-${year}-${sequence}`;

  // Create invoice record
  const invoiceData = {
    org_id: params.orgId,
    invoice_number: invoiceNumber,
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client_id: params.clientId,
    client_name: params.clientName,
    client_email: params.clientEmail,
    client_phone: params.clientPhone,
    client_address: params.clientAddress,
    client_gstin: params.clientGstin,
    client_state: params.clientState,
    business_name: org.name,
    business_gstin: businessConfig.gstin,
    business_address: businessConfig.address,
    business_pan: businessConfig.pan || '',
    business_state: businessConfig.state,
    place_of_supply: placeOfSupply,
    items: JSON.stringify(taxCalc.items),
    subtotal: taxCalc.subtotal,
    cgst_rate: taxCalc.items[0]?.cgst_rate || 9,
    cgst_amount: taxCalc.cgst_total,
    sgst_rate: taxCalc.items[0]?.sgst_rate || 9,
    sgst_amount: taxCalc.sgst_total,
    igst_rate: taxCalc.items[0]?.igst_rate || 0,
    igst_amount: taxCalc.igst_total,
    discount_total: taxCalc.discount_total,
    grand_total: taxCalc.grand_total,
    status: paymentId ? 'paid' : 'unpaid',
    payment_id: paymentId || null,
  };

  const { data, error } = await supabase
    .from('invoices')
    .insert(invoiceData)
    .select()
    .single();

  if (error) throw error;

  return data;
}
```

### 3.6 GSTIN Validation

```typescript
// lib/gstin-validator.ts

export function validateGSTIN(gstin: string): boolean {
  // GSTIN format: 2 digits (state code) + 10 chars (PAN) + 1 digit (entity) + 1 char (default Z) + 1 char/number (checksum)
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin.toUpperCase());
}

// Optional: Validate against GST portal API
export async function validateGSTINOnline(gstin: string): Promise<{
  valid: boolean;
  businessName?: string;
  state?: string;
}> {
  // Use government GST portal API or third-party service
  // This requires API access and is optional for v1
  return { valid: validateGSTIN(gstin) };
}
```

### 3.7 Environment Variables for Payment Configuration

```env
# Razorpay (Primary - India)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# Cashfree (Backup - India)
CASHFREE_APP_ID=xxxxxxxxxxxxxxxxxxxx
CASHFREE_SECRET_KEY=xxxxxxxxxxxxxxxxxxxx
CASHFREE_MODE=test

# Stripe (Secondary - International, future)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
```

---

**END OF FILE 1: FINTECH COMPLIANCE INDIA**
