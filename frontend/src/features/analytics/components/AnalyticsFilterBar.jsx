import React from "react";
import { Filter, RotateCcw, ShieldAlert, Sparkles, Loader } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import {
  YEARS,
  QUARTERS,
  REGIONS,
  DEPARTMENTS,
  BUSINESS_UNITS,
  PRACTICES
} from "../constants/filterConstants";

export default function AnalyticsFilterBar({
  showSandbox = true,
  isLoading,
  setIsLoading,
  isError,
  setIsError,
  isEmpty,
  setIsEmpty
}) {
  const { filters, setFilters, resetFilters } = useAnalyticsFilters();

  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white p-5 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] space-y-4 select-none">
      {/* Reset & Toggles Row */}
      <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-[#d5c1cc]/30">
        <div className="flex items-center gap-2 text-[#6C1D5F] font-extrabold text-sm">
          <Filter size={15} />
          <span>Dashboard Filters</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {showSandbox && (setIsLoading || setIsError || setIsEmpty) && (
            <>
              <span className="text-[10px] uppercase font-bold text-[#83727c] mr-2">Simulate UI:</span>
              {setIsLoading && (
                <button
                  onClick={() => setIsLoading(!isLoading)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    isLoading 
                      ? "bg-[#6C1D5F] border-[#6C1D5F] text-white shadow-xs" 
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Loader size={11} className={isLoading ? "animate-spin" : ""} />
                  <span>Loading</span>
                </button>
              )}
              {setIsError && (
                <button
                  onClick={() => setIsError(!isError)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    isError 
                      ? "bg-[#ba1a1a] border-[#ba1a1a] text-white shadow-xs" 
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ShieldAlert size={11} />
                  <span>Error</span>
                </button>
              )}
              {setIsEmpty && (
                <button
                  onClick={() => setIsEmpty(!isEmpty)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    isEmpty 
                      ? "bg-[#FF6200] border-[#FF6200] text-white shadow-xs" 
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Sparkles size={11} />
                  <span>Empty</span>
                </button>
              )}
              <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden sm:block" />
            </>
          )}

          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#83727c] hover:text-[#6C1D5F] bg-slate-50 hover:bg-[#6C1D5F]/5 border border-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Selects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Year Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#83727c]">Year</label>
          <select
            value={filters.year || "2026"}
            onChange={(e) => handleSelectChange("year", e.target.value)}
            className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Quarter Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#83727c]">Quarter</label>
          <select
            value={filters.quarter || "All Quarters"}
            onChange={(e) => handleSelectChange("quarter", e.target.value)}
            className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
          >
            {QUARTERS.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* Region Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#83727c]">Region</label>
          <select
            value={filters.region || "All Regions"}
            onChange={(e) => handleSelectChange("region", e.target.value)}
            className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Department Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#83727c]">Department</label>
          <select
            value={filters.department || "All Departments"}
            onChange={(e) => handleSelectChange("department", e.target.value)}
            className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* BU Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#83727c]">Business Unit</label>
          <select
            value={filters.bu || "All BUs"}
            onChange={(e) => handleSelectChange("bu", e.target.value)}
            className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
          >
            {BUSINESS_UNITS.map((bu) => (
              <option key={bu} value={bu}>{bu}</option>
            ))}
          </select>
        </div>

        {/* Practice Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#83727c]">Practice</label>
          <select
            value={filters.practice || "All Practices"}
            onChange={(e) => handleSelectChange("practice", e.target.value)}
            className="w-full bg-slate-50 border border-[#d5c1cc] rounded-xl px-3 py-2 text-xs font-bold text-[#51434c] focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 cursor-pointer"
          >
            {PRACTICES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
