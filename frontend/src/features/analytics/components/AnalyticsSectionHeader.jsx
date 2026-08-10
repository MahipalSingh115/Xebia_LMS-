import React from "react";

export default function AnalyticsSectionHeader({ title, description }) {
  return (
    <div className="pb-2 border-b border-[#d5c1cc]/20 mb-4 select-none">
      <h3 className="text-base font-extrabold text-[#6C1D5F] tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-slate-400 mt-0.5 font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
