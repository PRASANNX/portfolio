"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOrg } from "@/components/org-provider";
import { useRouter } from "next/navigation";
import { ArchetypeSelector } from "./executive/ArchetypeSelector";
import { BrandArchetype, ARCHETYPE_MAP } from "@/lib/brand-psychology";

type Step = "info" | "brand" | "confirm";

const PROJECT_TYPES = [
  { id: "startup", label: "Startup / SaaS", desc: "Launch a waitlist and landing page" },
  { id: "agency", label: "Agency / Freelancer", desc: "Client portal + invoicing" },
  { id: "local", label: "Local Business", desc: "Digitize a brick-and-mortar business" },
];

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const [step, setStep] = useState<Step>("info");
  const [projectType, setProjectType] = useState("startup");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brandArchetype, setBrandArchetype] = useState<BrandArchetype>("Outlaw");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  if (!isOpen) return null;

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 30);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(generateSlug(val));
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      // 1. Create organization via API
      const res = await fetch("/api/org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      const { data: org, error: apiError } = await res.json();
      if (apiError) throw new Error(apiError);

      // 2. Update accent color and archetype
      const config = ARCHETYPE_MAP[brandArchetype];
      await supabase
        .from("organizations")
        .update({ 
          accent_color: config.accentColor,
          brand_archetype: brandArchetype,
          typography_config: {
            headingWeight: config.headingWeight,
            headingTracking: config.headingTracking
          }
        })
        .eq("id", org.id);

      // 3. Create default landing page via RPC
      await supabase.rpc("create_landing_page", {
        p_org_id: org.id,
        p_org_name: name,
        p_accent_color: config.accentColor,
      });

      // 4. Redirect
      router.refresh();
      onClose();
      router.push(`/${slug}`);
    } catch (err: any) {
      setError(err.message || "Failed to create project");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h2
              className="text-xl font-bold text-black"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {step === "info" && "New Project"}
              {step === "brand" && "Brand Config"}
              {step === "confirm" && "Review & Launch"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          {/* Step indicator */}
          <div className="flex gap-1.5 mt-4">
            {(["info", "brand", "confirm"] as Step[]).map((s, i) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor:
                    (["info", "brand", "confirm"] as Step[]).indexOf(step) >= i
                      ? "var(--accent)"
                      : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Step 1: Info */}
          {step === "info" && (
            <div className="space-y-5">
              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Project Type
                </label>
                <div className="space-y-2">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 ${
                        projectType === t.id
                          ? "border-2"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={
                        projectType === t.id
                          ? { borderColor: "var(--accent)" }
                          : undefined
                      }
                    >
                      <p
                        className="text-sm font-semibold text-black"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Project Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="My Awesome Startup"
                  className="input"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  URL Slug
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 mr-1">prxos.com/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="my-startup"
                    className="input flex-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Brand */}
          {step === "brand" && (
            <div className="space-y-5">
              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 mb-3"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Choose Your Brand Archetype
                </label>
                <ArchetypeSelector 
                  selected={brandArchetype}
                  onChange={(a) => setBrandArchetype(a)}
                />
              </div>

              {/* Preview */}
              <div 
                className="border rounded-xl p-6 text-center transition-all duration-300"
                style={{ 
                  backgroundColor: ARCHETYPE_MAP[brandArchetype].bgPrimary,
                  borderColor: ARCHETYPE_MAP[brandArchetype].accentLight,
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ 
                    fontFamily: "Montserrat, sans-serif",
                    color: ARCHETYPE_MAP[brandArchetype].accentColor 
                  }}
                >
                  Live Preview
                </p>
                <p
                  className="text-2xl mb-4"
                  style={{ 
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: ARCHETYPE_MAP[brandArchetype].headingWeight,
                    letterSpacing: ARCHETYPE_MAP[brandArchetype].headingTracking,
                    color: ARCHETYPE_MAP[brandArchetype].textPrimary
                  }}
                >
                  {name || "Project Name"}
                </p>
                <button
                  className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: ARCHETYPE_MAP[brandArchetype].accentColor,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === "confirm" && (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Name</span>
                  <span className="text-sm font-semibold text-black">{name}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Slug</span>
                  <span className="text-sm font-mono text-black">/{slug}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Type</span>
                  <span className="text-sm text-black">
                    {PROJECT_TYPES.find((t) => t.id === projectType)?.label}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Archetype</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: ARCHETYPE_MAP[brandArchetype].accentColor }}
                    />
                    <span className="text-sm font-semibold text-black">
                      {ARCHETYPE_MAP[brandArchetype].name}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                A landing page with 4 default components will be auto-generated.
              </p>

              {error && (
                <p className="text-sm text-red-600 font-medium text-center">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex items-center justify-between gap-3">
          {step !== "info" ? (
            <button
              onClick={() =>
                setStep(step === "confirm" ? "brand" : "info")
              }
              className="btn-ghost text-sm"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step === "confirm" ? (
            <button
              onClick={handleCreate}
              disabled={loading || !name || !slug}
              className="btn-primary text-sm px-6"
            >
              {loading ? "Creating..." : "Launch Project"}
            </button>
          ) : (
            <button
              onClick={() =>
                setStep(step === "info" ? "brand" : "confirm")
              }
              disabled={step === "info" && (!name || !slug)}
              className="btn-primary text-sm px-6"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
