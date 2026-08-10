import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AnalyticsTable({
  headers = [], // array of strings or { label, className }
  rows = [],
  renderRow, // function (row, index) => ReactNode
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  emptyMessage = "No records found.",
  isLoading = false
}) {
  const getHeaderLabel = (h) => (typeof h === "string" ? h : h.label);
  const getHeaderClass = (h) => (typeof h === "string" ? "" : h.className || "");

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden select-none">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/70 border-b border-slate-200">
            <tr className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
              {headers.map((h, i) => (
                <th key={i} className={`py-4 px-6 ${getHeaderClass(h)}`}>
                  {getHeaderLabel(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-sans">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {headers.map((_, idx) => (
                    <td key={idx} className="py-4 px-6">
                      <div className="h-4 bg-slate-100 rounded w-2/3" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="py-12 text-center text-slate-400 font-semibold italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => renderRow(row, idx))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && totalPages > 1 && onPageChange && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4 text-xs font-bold text-slate-450">
          <span>
            Page <span className="text-slate-800">{currentPage}</span> of <span className="text-slate-800">{totalPages}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#6C1D5F]/50 transition-all shadow-xs bg-white cursor-pointer"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#6C1D5F]/50 transition-all shadow-xs bg-white cursor-pointer"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
