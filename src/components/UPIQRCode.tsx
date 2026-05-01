"use client";

import { useEffect, useState } from "react";

interface UPIQRCodeProps {
  upiUrl: string; // UPI deep link: upi://pay?pa=...&am=...
  amount: string;
  currency?: string;
  orgName: string;
  onComplete?: () => void;
}

export function UPIQRCode({ upiUrl, amount, currency = "₹", orgName, onComplete }: UPIQRCodeProps) {
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    // Use a public QR API for generating the QR code
    const encoded = encodeURIComponent(upiUrl);
    setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encoded}`);
  }, [upiUrl]);

  return (
    <div className="card p-8 max-w-sm mx-auto text-center">
      <h3
        className="text-sm font-bold text-black uppercase tracking-widest mb-2"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Scan to Pay
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        Use any UPI app to scan this QR code
      </p>

      {/* QR Code */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 inline-block mb-6">
        {qrSrc ? (
          <img src={qrSrc} alt="UPI QR Code" width={240} height={240} className="mx-auto" />
        ) : (
          <div className="w-60 h-60 bg-gray-100 animate-pulse rounded" />
        )}
      </div>

      {/* Amount */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Amount</p>
        <p
          className="text-3xl font-black text-black"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {currency}{amount}
        </p>
        <p className="text-xs text-gray-400 mt-1">to {orgName}</p>
      </div>

      {/* Payment confirmation */}
      {onComplete && (
        <button
          onClick={onComplete}
          className="btn-primary w-full text-sm py-3"
        >
          I've completed the payment
        </button>
      )}

      {/* UPI Apps hint */}
      <p className="text-xs text-gray-400 mt-4">
        Works with Google Pay, PhonePe, Paytm, BHIM & more
      </p>
    </div>
  );
}
