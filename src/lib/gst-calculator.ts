/**
 * PRX Startup OS — GST Calculator (India)
 * Handles CGST, SGST, IGST calculations based on place of supply.
 */

export interface GstInput {
  baseAmount: number;
  gstRate: number; // e.g., 18 for 18%
  providerStateCode: string; // 2-digit GST state code
  clientStateCode: string;
}

export interface GstOutput {
  baseAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalGstAmount: number;
  totalAmount: number;
  isInterState: boolean;
}

export function calculateGst({
  baseAmount,
  gstRate,
  providerStateCode,
  clientStateCode,
}: GstInput): GstOutput {
  const isInterState = providerStateCode !== clientStateCode;
  
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;
  
  const totalGstAmount = (baseAmount * gstRate) / 100;

  if (isInterState) {
    igstAmount = totalGstAmount;
  } else {
    cgstAmount = totalGstAmount / 2;
    sgstAmount = totalGstAmount / 2;
  }

  return {
    baseAmount: Number(baseAmount.toFixed(2)),
    cgstAmount: Number(cgstAmount.toFixed(2)),
    sgstAmount: Number(sgstAmount.toFixed(2)),
    igstAmount: Number(igstAmount.toFixed(2)),
    totalGstAmount: Number(totalGstAmount.toFixed(2)),
    totalAmount: Number((baseAmount + totalGstAmount).toFixed(2)),
    isInterState,
  };
}

export const GST_STATE_CODES: Record<string, string> = {
  "01": "Jammu & Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "26": "Dadra & Nagar Haveli & Daman & Diu",
  "27": "Maharashtra",
  "29": "Karnataka",
  "30": "Goa",
  "31": "Lakshadweep",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "34": "Puducherry",
  "35": "Andaman & Nicobar Islands",
  "36": "Telangana",
  "37": "Andhra Pradesh",
  "38": "Ladakh"
};
