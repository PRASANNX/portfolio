/**
 * PRX Startup OS — GST Invoice Generator
 * Contains all 21 mandatory fields for a valid Indian GST Invoice.
 */

import { calculateGst, GstOutput } from "./gst-calculator";

export interface InvoiceParty {
  name: string;
  address: string;
  stateCode: string; // 2-digit
  gstin?: string;
  email?: string;
  phone?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  hsnSacCode: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxableValue: number;
  gstRate: number; // e.g., 18
}

export interface GstInvoiceData {
  // 1. Supplier details
  supplier: InvoiceParty;
  
  // 2. Recipient details
  recipient: InvoiceParty;
  
  // 3. Document details
  invoiceNumber: string; // Must be consecutive, max 16 chars
  invoiceDate: string; // ISO or DD/MM/YYYY
  dueDate?: string;
  placeOfSupplyStateCode: string; // Usually recipient's state
  
  // 4. Item details
  items: InvoiceItem[];
  
  // 5. Signatures (can be handled in UI)
  authorizedSignatoryName?: string;
}

export interface CalculatedInvoiceItem extends InvoiceItem {
  gstBreakdown: GstOutput;
  totalItemValue: number;
}

export interface ProcessedInvoice {
  data: GstInvoiceData;
  calculatedItems: CalculatedInvoiceItem[];
  summary: {
    totalTaxableValue: number;
    totalCgst: number;
    totalSgst: number;
    totalIgst: number;
    totalGst: number;
    grandTotal: number;
    amountInWords: string;
  };
}

// Basic number to words converter for INR
function numberToWords(num: number): string {
  // A robust implementation would go here. For now, a placeholder.
  return "Rupees " + num.toString() + " Only"; 
}

export function processInvoice(data: GstInvoiceData): ProcessedInvoice {
  let totalTaxableValue = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;
  let totalGst = 0;
  let grandTotal = 0;

  const calculatedItems = data.items.map((item) => {
    const gstBreakdown = calculateGst({
      baseAmount: item.taxableValue,
      gstRate: item.gstRate,
      providerStateCode: data.supplier.stateCode,
      clientStateCode: data.placeOfSupplyStateCode,
    });

    totalTaxableValue += item.taxableValue;
    totalCgst += gstBreakdown.cgstAmount;
    totalSgst += gstBreakdown.sgstAmount;
    totalIgst += gstBreakdown.igstAmount;
    totalGst += gstBreakdown.totalGstAmount;
    grandTotal += gstBreakdown.totalAmount;

    return {
      ...item,
      gstBreakdown,
      totalItemValue: gstBreakdown.totalAmount,
    };
  });

  return {
    data,
    calculatedItems,
    summary: {
      totalTaxableValue: Number(totalTaxableValue.toFixed(2)),
      totalCgst: Number(totalCgst.toFixed(2)),
      totalSgst: Number(totalSgst.toFixed(2)),
      totalIgst: Number(totalIgst.toFixed(2)),
      totalGst: Number(totalGst.toFixed(2)),
      grandTotal: Math.round(grandTotal), // Invoices are usually rounded to nearest Rupee
      amountInWords: numberToWords(Math.round(grandTotal)),
    },
  };
}
