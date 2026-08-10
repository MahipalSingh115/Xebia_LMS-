import React from "react";

export default function CourseCompletionChart({
  completionData,
}) {
  const completed = completionData?.completed ?? 0;
  const inProgress = completionData?.inProgress ?? 0;
  const dropped = completionData?.dropped ?? 0;

  const total = completed + inProgress + dropped;

  const completedPct =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const inProgressPct =
    total > 0 ? Math.round((inProgress / total) * 100) : 0;

  const droppedPct =
    total > 0 ? Math.round((dropped / total) * 100) : 0;

  const legend = [
    {
      label: "Completed",
      pct: completedPct,
      color: "#6C1D5F",
      dot: "bg-[#6C1D5F]",
    },
    {
      label: "In Progress",
      pct: inProgressPct,
      color: "#2ebdaf",
      dot: "bg-[#2ebdaf]",
    },
    {
      label: "Dropped",
      pct: droppedPct,
      color: "#d5c1cc",
      dot: "bg-[#d5c1cc]",
    },
  ];

  const R = 85;
  const CX = 112;
  const CY = 112;
  const C = 2 * Math.PI * R;

  const completedOffset = C * (1 - completedPct / 100);
  const inProgressOffset = C * (1 - inProgressPct / 100);

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#d5c1cc] flex flex-col">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-[#6C1D5F]">
          Course Completion
        </h3>
        <p className="text-sm text-[#51434c]">
          Global performance status
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <svg
          className="w-52 h-52 -rotate-90"
          viewBox={`0 0 ${CX * 2} ${CY * 2}`}
        >
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#f5f3f3"
            strokeWidth="20"
          />

          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#6C1D5F"
            strokeWidth="20"
            strokeDasharray={C}
            strokeDashoffset={completedOffset}
            strokeLinecap="round"
          />

          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#2ebdaf"
            strokeWidth="20"
            strokeDasharray={C}
            strokeDashoffset={inProgressOffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-[#6C1D5F]">
            {completedPct}%
          </span>

          <span className="text-xs text-[#51434c] font-medium tracking-wide">
            AVG SUCCESS
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {legend.map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center p-3 rounded-2xl hover:bg-[#f5f3f3] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${item.dot}`}
              />
              <span className="text-sm font-medium text-[#1b1c1c]">
                {item.label}
              </span>
            </div>

            <span className="text-sm font-bold text-[#6C1D5F]">
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}