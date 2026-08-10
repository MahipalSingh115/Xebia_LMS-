import React from "react";
import { Download } from "lucide-react";
import AnalyticsBreadcrumb from "./AnalyticsBreadcrumb";

export default function AnalyticsHeader({
  title,
  description,
  breadcrumbs = [],
  onExport
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {breadcrumbs.length > 0 && <AnalyticsBreadcrumb items={breadcrumbs} />}
        <h1 className="text-[21px] font-black text-slate-900 leading-snug tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] text-slate-500 mt-1 font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {onExport && (
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-650 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm text-xs cursor-pointer shrink-0"
        >
          <Download size={14} className="text-slate-400" />
          <span>Export Report</span>
        </button>
      )}
    </div>
  );
}
