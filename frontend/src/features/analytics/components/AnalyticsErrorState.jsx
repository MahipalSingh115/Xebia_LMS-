import React from "react";
import { AlertTriangle } from "lucide-react";

export default function AnalyticsErrorState({
  message = "Something went wrong while fetching data.",
  onRetry
}) {
  return (
    <div className="min-h-[400px] bg-[#ffdad6]/20 rounded-3xl border border-[#ba1a1a]/30 p-8 flex flex-col items-center justify-center text-center max-w-[600px] mx-auto space-y-4">
      <div className="p-4 bg-[#ffdad6] rounded-full text-[#ba1a1a] animate-bounce">
        <AlertTriangle size={32} />
      </div>
      <div>
        <h3 className="text-lg font-black text-[#ba1a1a] uppercase tracking-wide">
          Something went wrong
        </h3>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#6C1D5F]/90 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
