import React from "react";

export default function AnalyticsLoadingState({ type = "dashboard" }) {
  const shimmerClass = "animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%] bg-slate-100 rounded-2xl";

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-32 flex flex-col justify-between">
            <div className={`h-8 w-8 ${shimmerClass}`} />
            <div className="space-y-2">
              <div className={`h-3 w-16 ${shimmerClass}`} />
              <div className={`h-6 w-24 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "charts") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className={`h-5 w-40 ${shimmerClass}`} />
              <div className={`h-3 w-64 ${shimmerClass}`} />
            </div>
            <div className={`flex-1 mt-6 w-full ${shimmerClass}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-32 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className={`h-8 w-8 rounded-lg ${shimmerClass}`} />
              <div className={`h-4 w-12 ${shimmerClass}`} />
            </div>
            <div className="space-y-1.5">
              <div className={`h-3 w-20 ${shimmerClass}`} />
              <div className={`h-6 w-16 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-[380px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className={`h-5 w-48 ${shimmerClass}`} />
            <div className={`h-3.5 w-72 ${shimmerClass}`} />
          </div>
          <div className={`flex-1 mt-6 w-full ${shimmerClass}`} />
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/50 h-[380px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className={`h-5 w-32 ${shimmerClass}`} />
            <div className={`h-3.5 w-48 ${shimmerClass}`} />
          </div>
          <div className={`flex-1 mt-6 w-full ${shimmerClass}`} />
        </div>
      </div>
    </div>
  );
}
