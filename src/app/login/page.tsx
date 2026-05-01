"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthMethod = "email" | "phone";

export default function LoginPage() {
  const [method, setMethod] = useState<AuthMethod>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handlePhoneOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    } else {
      router.push(`/verify-phone?phone=${encodeURIComponent(formattedPhone)}`);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="w-full max-w-md">
        {/* Wordmark */}
        <div className="text-center mb-10">
          <span
            className="prx-wordmark text-3xl text-white"
          >
            PRX
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-8 sm:p-10">
          <h1 className="heading-md text-black mb-1">Welcome back</h1>
          <p className="body text-gray-500 mb-8">
            Sign in to your PRX Startup OS account.
          </p>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full btn-secondary mb-6 flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="divider" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 body text-gray-400 text-xs">
              OR
            </span>
          </div>

          {/* Method Toggle */}
          <div className="flex rounded-lg border border-gray-200 p-1 mb-6">
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                method === "email"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-black"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Email
            </button>
            <button
              onClick={() => setMethod("phone")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                method === "phone"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-black"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Phone OTP
            </button>
          </div>

          {/* Email Form */}
          {method === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-semibold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Password
                  </label>
                  <Link href="#" className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
              </div>

              {message && (
                <p className={`text-sm font-medium ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                  {message.text}
                </p>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary mt-2">
                {loading ? "Signing in..." : "Continue"}
              </button>
            </form>
          )}

          {/* Phone OTP Form */}
          {method === "phone" && (
            <form onSubmit={handlePhoneOTP} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    required
                    maxLength={10}
                    className="input rounded-l-none"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">We'll send an OTP via SMS.</p>
              </div>

              {message && (
                <p className={`text-sm font-medium ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                  {message.text}
                </p>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary">
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Sign up link */}
          <p className="mt-6 text-center body text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-black hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
