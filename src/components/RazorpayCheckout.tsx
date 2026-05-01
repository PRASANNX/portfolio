"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  orderId: string;
  amount: number; // in paise
  currency: string;
  keyId: string;
  orgName: string;
  accentColor?: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  onSuccess: (data: { orderId: string; paymentId: string; signature: string }) => void;
  onFailure: (error: any) => void;
  onDismiss?: () => void;
}

export function RazorpayCheckout({
  orderId,
  amount,
  currency,
  keyId,
  orgName,
  accentColor = "#FF5F1F",
  userEmail,
  userName,
  userPhone,
  onSuccess,
  onFailure,
  onDismiss,
}: RazorpayCheckoutProps) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePay = () => {
    if (!window.Razorpay) {
      onFailure({ error: "Razorpay SDK not loaded" });
      return;
    }

    const options = {
      key: keyId,
      amount,
      currency,
      name: orgName,
      order_id: orderId,
      prefill: {
        email: userEmail || "",
        contact: userPhone || "",
        name: userName || "",
      },
      theme: {
        color: accentColor,
      },
      modal: {
        ondismiss: onDismiss,
      },
      handler: (response: any) => {
        onSuccess({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: any) => {
      onFailure(response.error);
    });
    rzp.open();
  };

  return (
    <button onClick={handlePay} className="btn-primary w-full py-3 text-sm">
      Pay {currency === "INR" ? "₹" : currency}{" "}
      {(amount / 100).toLocaleString("en-IN")}
    </button>
  );
}
