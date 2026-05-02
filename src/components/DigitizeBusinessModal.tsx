"use client";

import { useState } from "react";
import { BUSINESS_CATEGORIES } from "@/lib/templates";
import { PreFlightSandbox } from "@/components/executive/PreFlightSandbox";

interface DigitizeBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgId: string;
}

export function DigitizeBusinessModal({ isOpen, onClose, orgId }: DigitizeBusinessModalProps) {
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  // Simple GSTIN Regex: 2 digits, 10 alphanumeric (PAN), 1 alphanumeric, 1 Z, 1 alphanumeric
  const isValidGstin = (val: string) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val);
  
  // Simple Phone Regex: +[1-9]\d{1,14}
  const isValidPhone = (val: string) => !val || /^\+[1-9]\d{1,14}$/.test(val);

  const handleNext = () => {
    if (step === 2) {
      if (gstin && !isValidGstin(gstin)) return alert("Invalid GSTIN format.");
      if (phone && !isValidPhone(phone)) return alert("Invalid phone format (E.164 required, e.g. +919876543210).");
    }
    setStep(step + 1);
  };

  const handleDigitize = async () => {
    // API Call to save org_configs
    console.log({
      orgId, categoryId, businessName, gstin, phone, email, address
    });
    // Move to Pre-Flight Sandbox step instead of closing immediately
    setStep(4);
  };

  const handleDeploy = () => {
    alert("Deployed to Production!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Digitize Business (Step {step}/4)
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
          </div>
        </div>

        <div className="px-8 py-6">
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-gray-700">Select Business Category</label>
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                {BUSINESS_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryId(cat.id)}
                    className={`p-3 text-left rounded-lg border text-sm ${categoryId === cat.id ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <p className="font-bold text-black">{cat.name}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Legal Business Name</label>
                <input value={businessName} onChange={e => setBusinessName(e.target.value)} className="input" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">GSTIN (Optional)</label>
                <input value={gstin} onChange={e => setGstin(e.target.value.toUpperCase())} className="input uppercase" placeholder="22AAAAA0000A1Z5" maxLength={15} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Phone (E.164)</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="input" placeholder="+919876543210" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
               <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Registered Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} className="input resize-none" rows={3} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Summary</p>
                <p className="text-xs text-gray-600">Name: {businessName}</p>
                <p className="text-xs text-gray-600">Category: {BUSINESS_CATEGORIES.find(c => c.id === categoryId)?.name}</p>
                {gstin && <p className="text-xs text-gray-600">GSTIN: {gstin}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex justify-center">
              <PreFlightSandbox orgId={orgId} onDeploy={handleDeploy} />
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="px-8 pb-8 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-ghost text-sm">Back</button>
            ) : <div />}
            
            {step < 3 ? (
              <button onClick={handleNext} disabled={step === 1 && !categoryId} className="btn-primary text-sm px-6">Next</button>
            ) : (
              <button onClick={handleDigitize} disabled={!businessName} className="btn-primary text-sm px-6">Review & Test</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
