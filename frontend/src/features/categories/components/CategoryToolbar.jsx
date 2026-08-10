import { Search } from "lucide-react";

export default function CategoryToolbar({
  filterText,
  onFilterChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center gap-4 shadow-sm">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] outline-none transition-all"
            placeholder="Filter by name..."
          />
        </div>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
          Status:
        </span>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {["All", "Active", "Inactive"].map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                statusFilter === s
                  ? "bg-white shadow-sm text-[#6C1D5F]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
}
