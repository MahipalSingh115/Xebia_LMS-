import { Search, ArrowUpDown, ChevronDown, List, LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";

export default function CoursesFilterBar({
  searchQuery,
  setSearch,
  selectedCat,
  setSelectedCat,
  selectedDiff,
  setSelectedDiff,
  viewMode,
  setViewMode,
  categories,
  filteredCount,
}) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap pt-1">
      {/* Search */}
      <div className="relative flex-1 max-w-[280px]">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full bg-white border border-slate-200 rounded-md pl-8 pr-2.5 py-1.5 text-[13px] text-slate-700 outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F]/20"
        />
      </div>

      {/* Category dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-8 border border-slate-200 font-semibold text-slate-600 text-[12px] bg-white hover:bg-slate-50 hover:text-slate-800 transition-all rounded-md px-3 flex items-center gap-1.5"
          >
            <span>{selectedCat === "All" ? "Category" : selectedCat}</span>
            <ChevronDown size={11} className="opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-md z-50 max-h-60 overflow-y-auto">
          <DropdownMenuRadioGroup value={selectedCat} onValueChange={setSelectedCat}>
            <DropdownMenuRadioItem
              value="All"
              className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded cursor-pointer"
            >
              All Categories
            </DropdownMenuRadioItem>
            {categories.map((c) => (
              <DropdownMenuRadioItem
                key={c.id}
                value={c.name}
                className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded cursor-pointer"
              >
                {c.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Difficulty */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-8 border border-slate-200 font-semibold text-slate-600 text-[12px] bg-white hover:bg-slate-50 hover:text-slate-800 transition-all rounded-md px-3 flex items-center gap-1.5"
          >
            <span>{selectedDiff === "All" ? "Difficulty" : selectedDiff}</span>
            <ChevronDown size={11} className="opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-slate-200 shadow-md rounded-md z-50">
          <DropdownMenuRadioGroup value={selectedDiff} onValueChange={setSelectedDiff}>
            <DropdownMenuRadioItem
              value="All"
              className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded cursor-pointer"
            >
              All Difficulties
            </DropdownMenuRadioItem>
            {["Beginner", "Intermediate", "Advanced", "Expert"].map((d) => (
              <DropdownMenuRadioItem
                key={d}
                value={d}
                className="text-slate-700 text-xs hover:bg-slate-50 py-1.5 px-3 rounded cursor-pointer"
              >
                {d}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort */}
      <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 h-8 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
        <ArrowUpDown size={12} /> Sort: Updated <ChevronDown size={11} />
      </button>

      {/* Result count + view toggle */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-[12px] text-slate-400 whitespace-nowrap">{filteredCount} results</span>
        <div className="flex border border-slate-200 rounded-md overflow-hidden h-8">
          <button
            onClick={() => setViewMode("list")}
            className={`w-[30px] flex items-center justify-center transition-colors ${
              viewMode === "list" ? "bg-slate-100 text-slate-700" : "bg-white text-slate-400 hover:bg-slate-50"
            }`}
          >
            <List size={13} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`w-[30px] flex items-center justify-center transition-colors ${
              viewMode === "grid" ? "bg-slate-100 text-slate-700" : "bg-white text-slate-400 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
