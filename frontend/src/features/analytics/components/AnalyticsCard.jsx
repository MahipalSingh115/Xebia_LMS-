import React from "react";

export default function AnalyticsCard({
  title,
  subtitle,
  headerAction,
  className = "",
  children
}) {
  return (
    <div className={`bg-white rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] overflow-hidden flex flex-col justify-between ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4.5 border-b border-[#d5c1cc]/30 flex items-center justify-between select-none">
          <div>
            {title && (
              <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight leading-snug">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[11.5px] text-slate-400 mt-0.5 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
