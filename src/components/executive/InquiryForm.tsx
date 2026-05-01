"use client";

import { useState } from "react";

interface InquiryFormProps {
  title?: string;
  orgSlug: string;
  fields?: Array<{ name: string; label: string; type: string; required?: boolean; placeholder?: string }>;
  onSubmit?: (data: Record<string, string>) => void;
}

const DEFAULT_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "+91 9876543210" },
  { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
];

export function InquiryForm({ title, fields, onSubmit }: InquiryFormProps) {
  const formFields = fields || DEFAULT_FIELDS;
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    onSubmit?.(values);
    setTimeout(() => setStatus("success"), 500);
  };

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-bold text-black mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Thank you!</p>
        <p className="text-sm text-gray-500">We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      {title && (
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>{title}</h3>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {field.label} {field.required && <span style={{ color: "var(--accent)" }}>*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={values[field.name] || ""}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="input resize-none"
              />
            ) : (
              <input
                type={field.type}
                value={values[field.name] || ""}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                required={field.required}
                className="input"
              />
            )}
          </div>
        ))}
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full text-sm">
          {status === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
