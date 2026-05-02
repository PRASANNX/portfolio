"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";

interface PreFlightSandboxProps {
  orgId: string;
  onDeploy: () => void;
}

type StepStatus = "pending" | "processing" | "success" | "error";

interface Step {
  id: string;
  name: string;
  status: StepStatus;
  description: string;
}

export function PreFlightSandbox({ orgId, onDeploy }: PreFlightSandboxProps) {
  const [steps, setSteps] = useState<Step[]>([
    { id: "gst", name: "GST Engine", status: "pending", description: "Validating 21-point compliance" },
    { id: "webhook", name: "Razorpay Webhook", status: "pending", description: "Simulating payment.captured & HMAC signature" },
    { id: "whatsapp", name: "WhatsApp Delivery", status: "pending", description: "Triggering test ping" }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setErrorLog(null);
    
    // Reset steps
    setSteps(s => s.map(step => ({ ...step, status: "pending" })));

    try {
      // Run GST
      setSteps(s => s.map(step => step.id === "gst" ? { ...step, status: "processing" } : step));
      await new Promise(r => setTimeout(r, 1000));
      setSteps(s => s.map(step => step.id === "gst" ? { ...step, status: "success" } : step));

      // Run Webhook via API
      setSteps(s => s.map(step => step.id === "webhook" ? { ...step, status: "processing" } : step));
      
      const res = await fetch("/api/qa/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ org_id: orgId, test_phone: "+910000000000" })
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Webhook simulation failed");
      }
      
      setSteps(s => s.map(step => step.id === "webhook" ? { ...step, status: "success" } : step));

      // Run WhatsApp
      setSteps(s => s.map(step => step.id === "whatsapp" ? { ...step, status: "processing" } : step));
      await new Promise(r => setTimeout(r, 800));
      setSteps(s => s.map(step => step.id === "whatsapp" ? { ...step, status: "success" } : step));

    } catch (err: any) {
      setSteps(s => s.map(step => step.status === "processing" ? { ...step, status: "error" } : step));
      setErrorLog(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const isAllSuccess = steps.every(s => s.status === "success");

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-none w-full max-w-md mt-6 font-['Inter']">
      <div className="mb-6">
        <h3 className="font-['Montserrat'] font-black text-lg text-black uppercase tracking-tight">Pre-Flight Sandbox</h3>
        <p className="text-sm text-gray-500">Run diagnostics before handing over to the client.</p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {steps.map((step) => (
          <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
              {step.status === "pending" && <Circle className="w-5 h-5 text-gray-300" />}
              {step.status === "processing" && <Loader2 className="w-5 h-5 text-[#FF5F1F] animate-spin" />}
              {step.status === "success" && <CheckCircle2 className="w-5 h-5 text-[#FF5F1F]" />}
              {step.status === "error" && <XCircle className="w-5 h-5 text-red-600" />}
            </div>
            
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0 md:group-odd:text-right md:group-even:text-left">
              <h4 className="font-bold text-gray-900 text-sm">{step.name}</h4>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {errorLog && (
        <div className="mt-6 p-3 bg-gray-50 border border-gray-200">
          <p className="text-xs font-bold text-red-600 mb-1">Diagnostic Failure Log:</p>
          <pre className="text-[10px] text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto">
            {JSON.stringify({ error: errorLog }, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className="flex-1 bg-black hover:bg-gray-800 text-white font-['Montserrat'] font-bold text-sm py-2 px-4 transition-colors disabled:opacity-50"
        >
          {isRunning ? "Running..." : "Run Diagnostics"}
        </button>
        
        <button
          onClick={onDeploy}
          disabled={!isAllSuccess || isRunning}
          className="flex-1 bg-[#FF5F1F] hover:bg-[#E04D12] text-white font-['Montserrat'] font-bold text-sm py-2 px-4 transition-colors disabled:opacity-50"
        >
          Deploy to Production
        </button>
      </div>
    </div>
  );
}
