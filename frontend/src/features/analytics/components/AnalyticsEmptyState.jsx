import React from "react";
import { Inbox } from "lucide-react";

export default function AnalyticsEmptyState({
  title = "No Data Found",
  description = "No matching records found for the selected filter criteria.",
  onReset
}) {
  return (
    <div className="min-h-[350px] bg-white rounded-3xl border border-slate-200/60 p-8 flex flex-col items-center justify-center text-center max-w-[500px] mx-auto space-y-4">
      <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
        <Inbox size={32} />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-550 mt-1.5 leading-relaxed font-medium">
          {description}
        </p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="px-5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
