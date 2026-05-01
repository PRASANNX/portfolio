"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPhonePage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const supabase = createClient();

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newOtp.every((d) => d !== "") && value) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      handleVerify(pasted);
    }
  };

  const handleVerify = async (token: string) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } else {
      router.push("/dashboard");
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setResending(false);
    if (error) {
      setError(error.message);
    } else {
      setResendCountdown(30);
    }
  };

  const maskedPhone = phone.replace(/(\+\d{2})(\d+)(\d{4})/, "$1 ****$3");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="w-full max-w-md">
        {/* Wordmark */}
        <div className="text-center mb-10">
          <span className="prx-wordmark text-3xl text-white">PRX</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-8 sm:p-10 text-center">
          <h1 className="heading-md text-black mb-2">Verify your number</h1>
          <p className="body text-gray-500 mb-1">
            Enter the 6-digit OTP sent to
          </p>
          <p className="font-semibold text-black text-sm mb-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {maskedPhone || phone}
          </p>

          {/* OTP Input Grid */}
          <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={loading}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:outline-none transition-colors duration-150 disabled:opacity-50"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  borderColor: digit ? "var(--accent)" : undefined,
                }}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
          )}

          {loading && (
            <p className="body text-gray-500 mb-4">Verifying...</p>
          )}

          {/* Resend */}
          <div className="mt-2">
            {resendCountdown > 0 ? (
              <p className="body text-gray-400">
                Resend OTP in <span className="font-semibold text-black">{resendCountdown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="body font-semibold text-black hover:underline"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <a
              href="/login"
              className="body text-gray-400 hover:text-black transition-colors"
            >
              ← Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
