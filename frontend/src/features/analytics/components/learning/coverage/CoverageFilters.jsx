import React from "react";
import { Search, RotateCcw, Calendar, Globe, Building2, Briefcase, Filter } from "lucide-react";

export default function CoverageFilters({
  filters,
  onFilterChange,
  onReset,
}) {
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const regions = ["All", "India", "AMER", "EMEA", "APAC"];
  const businessUnits = ["All", "Digital", "Cloud", "Data", "Agile", "Salesforce"];
  const departments = ["All", "Engineering", "Consulting", "HR", "Operations", "QA", "Marketing"];
  const practices = ["All", "Frontend", "Backend", "DevOps", "QA", "Cloud Native", "Agile Coaching"];
  const datePresets = ["All", "This Year", "Last Year"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#6C1D5F]" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Filter Analytics
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#6C1D5F] hover:bg-slate-50 rounded-lg border border-slate-200 hover:border-[#6C1D5F] transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw size={12} />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Search Employee / Project
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
              className="w-full border border-slate-200 rounded-lg pl-8.5 pr-3 py-1.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all bg-slate-50/50 focus:bg-white"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Calendar size={11} className="text-slate-400" />
            Date Period
          </label>
          <select
            value={filters.datePreset || "All"}
            onChange={(e) => handleChange("datePreset", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all bg-slate-50/50 focus:bg-white"
          >
            {datePresets.map((preset) => (
              <option key={preset} value={preset}>
                {preset === "All" ? "All Time" : preset}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Globe size={11} className="text-slate-400" />
            Region
          </label>
          <select
            value={filters.region || "All"}
            onChange={(e) => handleChange("region", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all bg-slate-50/50 focus:bg-white"
          >
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg === "All" ? "All Regions" : reg}
              </option>
            ))}
          </select>
        </div>

        {/* Business Unit Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Building2 size={11} className="text-slate-400" />
            Business Unit
          </label>
          <select
            value={filters.businessUnit || "All"}
            onChange={(e) => handleChange("businessUnit", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all bg-slate-50/50 focus:bg-white"
          >
            {businessUnits.map((bu) => (
              <option key={bu} value={bu}>
                {bu === "All" ? "All BUs" : bu}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Building2 size={11} className="text-slate-400" />
            Department
          </label>
          <select
            value={filters.department || "All"}
            onChange={(e) => handleChange("department", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all bg-slate-50/50 focus:bg-white"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "All" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Practice Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Briefcase size={11} className="text-slate-400" />
            Practice
          </label>
          <select
            value={filters.practice || "All"}
            onChange={(e) => handleChange("practice", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all bg-slate-50/50 focus:bg-white"
          >
            {practices.map((prac) => (
              <option key={prac} value={prac}>
                {prac === "All" ? "All Practices" : prac}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
