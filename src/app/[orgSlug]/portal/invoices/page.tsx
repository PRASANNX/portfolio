"use client";

import { InvoicePreview } from "@/components/executive/InvoicePreview";

export default function InvoicesPage() {
  const invoice = {
    invoiceNumber: "INV-2026-001",
    date: "12 Oct 2026",
    dueDate: "26 Oct 2026",
    fromName: "PRX Startup OS",
    fromGstin: "07AABCT1234D1Z2",
    toName: "Acme Corp",
    toGstin: "09AAACC1234F1Z5",
    items: [
      {
        description: "Professional Plan License",
        quantity: 1,
        rate: "9999",
        amount: "9999",
      },
      {
        description: "Custom Domain Setup",
        quantity: 1,
        rate: "0",
        amount: "0",
      }
    ],
    subtotal: "9999",
    gstRate: "18%",
    gstAmount: "1799.82",
    total: "11798.82",
    status: "paid" as const,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Invoices
          </h1>
          <p className="body text-gray-500">
            View your payment history and download GST-compliant invoices.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <InvoicePreview {...invoice} />
      </div>
    </div>
  );
}
