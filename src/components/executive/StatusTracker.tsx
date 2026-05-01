interface Step {
  label: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

interface StatusTrackerProps {
  title?: string;
  steps: Step[];
}

export function StatusTracker({ title, steps }: StatusTrackerProps) {
  return (
    <div className="card p-6">
      {title && (
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {title}
        </h3>
      )}
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            {/* Connector */}
            <div className="flex flex-col items-center">
              <span
                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  step.status === "completed" ? "" : step.status === "current" ? "ring-4" : "border-2 border-gray-300 bg-white"
                }`}
                style={{
                  backgroundColor: step.status === "completed" ? "var(--accent)" : step.status === "current" ? "var(--accent)" : undefined,
                  ["--tw-ring-color" as string]: step.status === "current" ? "var(--accent-light, #FF5F1F1A)" : undefined,
                }}
              />
              {i < steps.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${step.status === "completed" ? "" : "bg-gray-200"}`}
                  style={{ backgroundColor: step.status === "completed" ? "var(--accent)" : undefined }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-8 -mt-0.5">
              <p className={`text-sm font-semibold ${step.status === "upcoming" ? "text-gray-400" : "text-black"}`} style={{ fontFamily: "Montserrat, sans-serif" }}>
                {step.label}
              </p>
              {step.date && <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
