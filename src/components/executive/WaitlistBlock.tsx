"use client";

import { useState } from "react";

interface WaitlistBlockProps {
  title: string;
  subtitle: string;
  placeholder_text: string;
  orgSlug: string;
}

export function WaitlistBlock({
  title,
  subtitle,
  placeholder_text,
  orgSlug,
}: WaitlistBlockProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orgSlug }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--bg-dark, #121212)" }}
    >
      <div className="section-inner text-center">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h2>
        <p
          className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {subtitle}
        </p>

        {status === "success" ? (
          <p className="text-sm font-semibold text-green-400" style={{ fontFamily: "Montserrat, sans-serif" }}>
            ✓ {message}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder_text}
              required
              className="w-full sm:flex-1 px-4 py-3 border border-white/20 bg-white/10 text-white rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2"
              style={{ ["--tw-ring-color" as string]: "var(--accent)" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full sm:w-auto px-6 py-3 text-sm"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-red-400 mt-2">{message}</p>
        )}
      </div>
    </section>
  );
}
