interface Milestone {
  label: string;
  completed: boolean;
}

interface ProjectProgressBarProps {
  title?: string;
  progress: number; // 0 to 100
  milestones?: Milestone[];
}

export function ProjectProgressBar({ title, progress, milestones }: ProjectProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="card p-6">
      {title && (
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {title}
        </h3>
      )}
      
      <div className="flex items-end justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Overall Progress</span>
        <span className="text-xl font-black text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>{safeProgress}%</span>
      </div>

      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${safeProgress}%`, backgroundColor: "var(--accent)" }}
        />
      </div>

      {milestones && milestones.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-gray-100">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div 
                className={`w-4 h-4 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-colors ${
                  m.completed ? "border-transparent" : "border-gray-200"
                }`}
                style={m.completed ? { backgroundColor: "var(--accent)" } : {}}
              >
                {m.completed && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 14 14" fill="none">
                    <path d="M11.6667 3.5L5.25001 9.91667L2.33334 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-sm ${m.completed ? "text-black font-medium" : "text-gray-500"}`} style={{ fontFamily: "Inter, sans-serif" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
