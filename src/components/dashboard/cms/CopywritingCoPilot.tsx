"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PAS_Schema,
  AIDA_Schema,
  compilePAS,
  compileAIDA,
  type PASData,
  type AIDAData,
  type CopyFramework,
} from "@/lib/content/copywriting-schemas";

interface CoPilotProps {
  onSave: (compiledCopy: string) => void;
  initialData?: string;
}

const FRAMEWORK_TABS: { id: CopyFramework; label: string; desc: string }[] = [
  { id: "PAS", label: "PAS", desc: "Problem → Agitate → Solution" },
  { id: "AIDA", label: "AIDA", desc: "Attention → Interest → Desire → Action" },
];

export function CopywritingCoPilot({ onSave, initialData }: CoPilotProps) {
  const [framework, setFramework] = useState<CopyFramework>("PAS");
  const [preview, setPreview] = useState<string>("");
  const [saved, setSaved] = useState(false);

  // PAS Form
  const pasForm = useForm<PASData>({
    resolver: zodResolver(PAS_Schema),
    defaultValues: { problem: "", agitate: "", solution: "" },
  });

  // AIDA Form
  const aidaForm = useForm<AIDAData>({
    resolver: zodResolver(AIDA_Schema),
    defaultValues: { attention: "", interest: "", desire: "", action: "" },
  });

  const onSubmitPAS = (data: PASData) => {
    const compiled = compilePAS(data);
    setPreview(compiled);
    onSave(compiled);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const onSubmitAIDA = (data: AIDAData) => {
    const compiled = compileAIDA(data);
    setPreview(compiled);
    onSave(compiled);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputBaseClass =
    "w-full min-h-[80px] px-4 py-3 bg-[#121212] text-white text-sm border border-gray-700 focus:border-[#FF5F1F] focus:outline-none transition-colors resize-y placeholder-gray-600";

  return (
    <div className="border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF5F1F" }} />
          <h3
            className="text-sm font-bold text-black uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Copywriting Co-Pilot
          </h3>
        </div>
        <p className="text-xs text-gray-500 ml-5">
          Stop writing features. Start writing conversions.
        </p>
      </div>

      {/* Framework Toggle */}
      <div className="flex border-b border-gray-200">
        {FRAMEWORK_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFramework(tab.id)}
            className={`flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
              framework === tab.id
                ? "text-black border-[#FF5F1F]"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {tab.label}
            <span className="block text-[10px] font-normal tracking-normal lowercase text-gray-400 mt-0.5">
              {tab.desc}
            </span>
          </button>
        ))}
      </div>

      {/* PAS Form */}
      {framework === "PAS" && (
        <form onSubmit={pasForm.handleSubmit(onSubmitPAS)} className="p-6 space-y-5">
          <div>
            <label
              className="block text-xs font-bold text-black uppercase tracking-widest mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              1. Problem
            </label>
            <p className="text-[10px] text-gray-400 mb-2">
              What specific pain is your user feeling right now?
            </p>
            <textarea
              {...pasForm.register("problem")}
              placeholder="e.g., You're spending weeks setting up boilerplate auth, payments, and dashboards…"
              className={inputBaseClass}
            />
            {pasForm.formState.errors.problem && (
              <span className="text-xs text-red-500 mt-1 block">
                {pasForm.formState.errors.problem.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="block text-xs font-bold text-black uppercase tracking-widest mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              2. Agitate
            </label>
            <p className="text-[10px] text-gray-400 mb-2">
              Why is this pain costing them money, time, or sanity?
            </p>
            <textarea
              {...pasForm.register("agitate")}
              placeholder="e.g., Meanwhile, your competitors ship in days and your clients are losing patience…"
              className={inputBaseClass}
            />
            {pasForm.formState.errors.agitate && (
              <span className="text-xs text-red-500 mt-1 block">
                {pasForm.formState.errors.agitate.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="block text-xs font-bold text-black uppercase tracking-widest mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              3. Solution
            </label>
            <p className="text-[10px] text-gray-400 mb-2">
              How does your product fix this instantly?
            </p>
            <textarea
              {...pasForm.register("solution")}
              placeholder="e.g., PRX OS gives you Razorpay, Auth, GST invoicing, and a client portal — deployed in 48 hours."
              className={inputBaseClass}
            />
            {pasForm.formState.errors.solution && (
              <span className="text-xs text-red-500 mt-1 block">
                {pasForm.formState.errors.solution.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold text-white uppercase tracking-widest transition-all"
            style={{
              backgroundColor: saved ? "#121212" : "#FF5F1F",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {saved ? "Saved ✓" : "Compile & Save Copy"}
          </button>
        </form>
      )}

      {/* AIDA Form */}
      {framework === "AIDA" && (
        <form onSubmit={aidaForm.handleSubmit(onSubmitAIDA)} className="p-6 space-y-5">
          {(
            [
              {
                field: "attention" as const,
                label: "1. Attention",
                hint: "Grab them with a bold, specific claim.",
                placeholder: "e.g., What if you could launch a full SaaS product in 48 hours?",
              },
              {
                field: "interest" as const,
                label: "2. Interest",
                hint: "Build interest with facts, data, or features.",
                placeholder: "e.g., PRX OS includes Razorpay, GST, WhatsApp, and a client portal pre-built.",
              },
              {
                field: "desire" as const,
                label: "3. Desire",
                hint: "Create desire with a transformation or outcome.",
                placeholder: "e.g., Imagine charging ₹75,000 per project while your infrastructure cost is ₹9,999.",
              },
              {
                field: "action" as const,
                label: "4. Action",
                hint: "Give them a clear call to action.",
                placeholder: "e.g., Start building today →",
              },
            ] as const
          ).map((item) => (
            <div key={item.field}>
              <label
                className="block text-xs font-bold text-black uppercase tracking-widest mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {item.label}
              </label>
              <p className="text-[10px] text-gray-400 mb-2">{item.hint}</p>
              <textarea
                {...aidaForm.register(item.field)}
                placeholder={item.placeholder}
                className={inputBaseClass}
              />
              {aidaForm.formState.errors[item.field] && (
                <span className="text-xs text-red-500 mt-1 block">
                  {aidaForm.formState.errors[item.field]?.message}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold text-white uppercase tracking-widest transition-all"
            style={{
              backgroundColor: saved ? "#121212" : "#FF5F1F",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {saved ? "Saved ✓" : "Compile & Save Copy"}
          </button>
        </form>
      )}

      {/* Live Preview */}
      {preview && (
        <div className="border-t border-gray-200 p-6">
          <p
            className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Compiled Output
          </p>
          <pre
            className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 border border-gray-200 p-4"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            {preview}
          </pre>
        </div>
      )}
    </div>
  );
}
