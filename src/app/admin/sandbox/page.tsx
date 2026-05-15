"use client";

import { useState, useEffect, useRef } from "react";
import {
  FlaskConical,
  ChevronDown,
  Check,
  Play,
  CheckCircle2,
  Loader2,
  Terminal,
} from "lucide-react";

const MOCK_ORGS = [
  { id: "1", name: "Chitragupt Legal", accent: "#1A2238" },
  { id: "2", name: "Gymos", accent: "#065F46" },
  { id: "3", name: "TNC Real Estate", accent: "#121212" },
];

const STEPS = [
  { label: "GST Tax Engine Validation", detail: "Verifying CGST/SGST/IGST split logic..." },
  { label: "Razorpay HMAC Signature Test", detail: "Validating webhook SHA-256 signature..." },
  { label: "WhatsApp API Delivery", detail: "Sending test message via Meta Cloud API..." },
];

const FAKE_LOGS = [
  { delay: 200, text: "$ prx-diagnostics --target=", dynamic: true },
  { delay: 600, text: "[INFO] Connecting to Supabase project jevoxcyrsozabijdlvtc...", dynamic: false },
  { delay: 400, text: "[INFO] Authenticated as service_role", dynamic: false },
  { delay: 800, text: "[TEST 1/3] GST Tax Engine — validating split logic", dynamic: false },
  { delay: 600, text: "  → intra_state: CGST 9% + SGST 9% = 18% ✓", dynamic: false },
  { delay: 400, text: "  → inter_state: IGST 18% ✓", dynamic: false },
  { delay: 300, text: "  → PASS", dynamic: false },
  { delay: 800, text: "[TEST 2/3] Razorpay HMAC — generating test signature", dynamic: false },
  { delay: 500, text: "  → payload: order_NkX5gT2xE8a4b2 | amount: 499900", dynamic: false },
  { delay: 400, text: "  → SHA-256 match: true ✓", dynamic: false },
  { delay: 300, text: "  → PASS", dynamic: false },
  { delay: 800, text: "[TEST 3/3] WhatsApp API — sending test notification", dynamic: false },
  { delay: 600, text: "  → template: prx_otp_verification", dynamic: false },
  { delay: 500, text: "  → delivery_status: sent ✓", dynamic: false },
  { delay: 300, text: "  → PASS", dynamic: false },
  { delay: 500, text: "", dynamic: false },
  { delay: 200, text: "══════════════════════════════════════", dynamic: false },
  { delay: 200, text: "  ALL TESTS PASSED (3/3) — System Ready", dynamic: false },
  { delay: 200, text: "══════════════════════════════════════", dynamic: false },
];

type StepStatus = "pending" | "active" | "success";

export default function SandboxPage() {
  const [selectedOrg, setSelectedOrg] = useState(MOCK_ORGS[0]);
  const [orgOpen, setOrgOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(["pending", "pending", "pending"]);
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setLogs([]);
    setStepStatuses(["pending", "pending", "pending"]);

    // Simulate step progression
    const stepTimings = [
      { stepIdx: 0, status: "active" as StepStatus, delay: 400 },
      { stepIdx: 0, status: "success" as StepStatus, delay: 2800 },
      { stepIdx: 1, status: "active" as StepStatus, delay: 3000 },
      { stepIdx: 1, status: "success" as StepStatus, delay: 5200 },
      { stepIdx: 2, status: "active" as StepStatus, delay: 5400 },
      { stepIdx: 2, status: "success" as StepStatus, delay: 7800 },
    ];

    for (const { stepIdx, status, delay } of stepTimings) {
      await new Promise((r) => setTimeout(r, delay === stepTimings[0].delay ? delay : delay - (stepTimings[stepTimings.indexOf({ stepIdx, status, delay }) - 1]?.delay || 0)));
      setStepStatuses((prev) => {
        const next = [...prev];
        next[stepIdx] = status;
        return next;
      });
    }

    // Simulate logs
    let totalDelay = 0;
    for (const log of FAKE_LOGS) {
      totalDelay += log.delay;
      const logText = log.dynamic ? log.text + selectedOrg.name : log.text;
      setTimeout(() => {
        setLogs((prev) => [...prev, logText]);
      }, totalDelay);
    }

    // Steps complete after all logs
    setTimeout(() => {
      setStepStatuses(["success", "success", "success"]);
    }, 3000);

    setTimeout(() => {
      setIsRunning(false);
    }, totalDelay + 500);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FlaskConical className="w-5 h-5 text-[#FF5F1F]" />
        <h1 className="font-['Montserrat'] text-xl font-black text-black tracking-tight">
          Pre-Flight QA Sandbox
        </h1>
      </div>

      {/* Config Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Org Dropdown */}
        <div>
          <label className="font-['Inter'] text-xs font-bold text-black block mb-2">
            Organization to Test
          </label>
          <div className="relative">
            <button
              onClick={() => setOrgOpen((v) => !v)}
              className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedOrg.accent }} />
              <span className="font-['Inter'] text-sm text-black flex-1">{selectedOrg.name}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${orgOpen ? "rotate-180" : ""}`} />
            </button>
            {orgOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {MOCK_ORGS.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => { setSelectedOrg(org); setOrgOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: org.accent }} />
                    <span className="font-['Inter'] text-sm text-black">{org.name}</span>
                    {selectedOrg.id === org.id && <Check className="w-3 h-3 ml-auto text-[#FF5F1F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="font-['Inter'] text-xs font-bold text-black block mb-2">
            Test Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 border border-gray-200 rounded-md font-['Inter'] text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Run Button */}
        <div className="flex items-end">
          <button
            onClick={runDiagnostics}
            disabled={isRunning}
            className="w-full bg-[#FF5F1F] hover:bg-[#E54E1A] transition-colors text-white py-3 font-['Montserrat'] font-black text-sm rounded-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isRunning ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Running...</>
            ) : (
              <><Play className="w-4 h-4" /> Run Diagnostics</>
            )}
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white mb-5">
        <p className="font-['Inter'] text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">
          Diagnostic Progress
        </p>
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              {/* Status Icon */}
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                {stepStatuses[i] === "success" ? (
                  <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : stepStatuses[i] === "active" ? (
                  <Loader2 className="w-6 h-6 text-[#FF5F1F] animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                )}
              </div>
              {/* Label */}
              <div className="flex-1">
                <p className={`font-['Montserrat'] text-sm font-bold tracking-tight ${
                  stepStatuses[i] === "success" ? "text-black" : stepStatuses[i] === "active" ? "text-[#FF5F1F]" : "text-gray-400"
                }`}>
                  {step.label}
                </p>
                {stepStatuses[i] === "active" && (
                  <p className="font-['Inter'] text-xs text-gray-500 mt-0.5">{step.detail}</p>
                )}
              </div>
              {/* Result */}
              {stepStatuses[i] === "success" && (
                <span className="font-['Inter'] text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md uppercase">
                  Pass
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Console */}
      <div className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800">
          <Terminal className="w-3.5 h-3.5 text-gray-500" />
          <span className="font-['Inter'] text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
            Diagnostic Console
          </span>
          <div className="ml-auto flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
        </div>
        <div
          ref={terminalRef}
          className="p-4 h-48 overflow-y-auto font-mono text-xs leading-relaxed"
        >
          {logs.length === 0 ? (
            <p className="text-gray-600">
              Awaiting diagnostics... Click &quot;Run Diagnostics&quot; to begin.
            </p>
          ) : (
            logs.map((line, i) => (
              <p
                key={i}
                className={`${
                  line.includes("PASS") || line.includes("ALL TESTS")
                    ? "text-emerald-400"
                    : line.includes("→")
                    ? "text-gray-400"
                    : line.includes("═")
                    ? "text-[#FF5F1F]"
                    : "text-gray-300"
                }`}
              >
                {line || "\u00A0"}
              </p>
            ))
          )}
          {isRunning && (
            <span className="inline-block w-2 h-4 bg-[#FF5F1F] animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
