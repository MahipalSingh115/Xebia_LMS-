import React from "react";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

export default function AnalyticsKpiCard({
  title,
  value,
  suffix = "",
  prefix = "",
  icon: IconComponent,
  trend,
  type = "default",
  tooltip
}) {
  const getAccentColors = () => {
    switch (type) {
      case "primary":
        return { bg: "bg-[#6C1D5F]/5 border-l-4 border-l-[#6C1D5F]", text: "text-[#6C1D5F]" };
      case "success":
        return { bg: "bg-emerald-50 border-l-4 border-l-emerald-500", text: "text-emerald-600" };
      case "warning":
        return { bg: "bg-amber-50 border-l-4 border-l-amber-500", text: "text-amber-600" };
      case "danger":
        return { bg: "bg-red-50 border-l-4 border-l-red-500", text: "text-red-600" };
      case "info":
        return { bg: "bg-[#01AC9F]/5 border-l-4 border-l-[#01AC9F]", text: "text-[#01AC9F]" };
      default:
        return { bg: "bg-slate-50 border-l-4 border-l-slate-400", text: "text-slate-500" };
    }
  };

  const accent = getAccentColors();
  const displayValue = typeof value === "number" ? value.toLocaleString() : (value ?? "—");

  const getTrendIcon = () => {
    if (!trend) return null;
    const isDown = trend.toString().startsWith("-");
    const trendColor = isDown ? "text-red-500 bg-red-50" : "text-emerald-600 bg-emerald-50";
    const Icon = isDown ? TrendingDown : TrendingUp;
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-1.5 py-0.5 rounded-md ${trendColor} shrink-0`}>
        <Icon size={10} />
        {trend}
      </span>
    );
  };

  return (
    <div className={`
      bg-white p-5 rounded-2xl border border-[#d5c1cc]/80
      shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)]
      hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(108,29,95,0.15)]
      transition-all duration-200 flex flex-col justify-between min-h-[120px] relative group
      ${accent.bg}
    `}>
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1 min-w-0">
          <p className="text-[#51434c] text-[10.5px] font-bold uppercase tracking-wider truncate" title={title}>
            {title}
          </p>
          <p className="text-2xl font-black text-slate-800 tracking-tight leading-none pt-1">
            {prefix}{displayValue}{suffix}
          </p>
        </div>
        {IconComponent && (
          <div className={`p-2.5 bg-white rounded-xl shadow-xs border border-slate-100/60 ${accent.text} group-hover:scale-105 transition-transform`}>
            <IconComponent size={16} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        {getTrendIcon()}
        {tooltip && (
          <div className="relative inline-block ml-auto group/tooltip cursor-help text-slate-350 hover:text-slate-500">
            <Info size={12} />
            <div className="absolute right-0 bottom-6 hidden group-hover/tooltip:block w-48 bg-slate-850 text-white text-[10px] font-medium p-2 rounded-lg shadow-lg z-50 pointer-events-none leading-relaxed">
              {tooltip}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
