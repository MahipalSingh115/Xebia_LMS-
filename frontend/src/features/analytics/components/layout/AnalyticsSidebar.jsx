import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  LayoutDashboard,
  BarChart3,
  Briefcase,
  GraduationCap,
  Target,
  LineChart,
  TrendingUp,
  Clock,
  FolderOpen,
  Brain,
  Award,
  BookOpen,
  Trophy,
  RefreshCw,
  ChevronsLeft,
  ChevronsRight,
  ArrowLeft,
  FileText
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

import { ANALYTICS_EXPLORER_CONFIG as ANALYTICS_CATEGORIES } from "@/features/analytics/config/analyticsExplorerConfig";

const ICON_MAP = {
  LayoutDashboard,
  BarChart3,
  Briefcase,
  GraduationCap,
  Target,
  LineChart,
  TrendingUp,
  Clock,
  FolderOpen,
  Brain,
  Award,
  BookOpen,
  Trophy
};

export default function AnalyticsSidebar({
  loading = false,
  isCollapsed = false,
  onToggleCollapse,
  onRefresh,
  onAddCustomReport
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Search logic to search category titles and indexed category keywords
  const filteredCategories = searchQuery.trim()
    ? ANALYTICS_CATEGORIES.filter((cat) => {
        const matchTitle = cat.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchKeywords = cat.keywords?.some((kw) =>
          kw.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchTitle || matchKeywords;
      })
    : ANALYTICS_CATEGORIES;

  return (
    <aside className={`bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 ${
      isCollapsed ? "w-[60px]" : "w-[300px]"
    }`}>
      {isCollapsed ? (
        <>
          {/* ── Collapsed Header ── */}
          <div className="p-3 border-b border-slate-200/60 flex items-center justify-center shrink-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              aria-label="Expand Sidebar"
              className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          </div>

          {/* ── Collapsed Icons List ── */}
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-3 custom-scrollbar flex flex-col items-center select-none">
            {ANALYTICS_CATEGORIES.map((c) => {
              const CategoryIcon = ICON_MAP[c.iconName] || FileText;
              const isCategoryActive = location.pathname === c.path;
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(c.path)}
                  title={c.title}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-205 border-0 outline-none cursor-pointer ${
                    isCategoryActive
                      ? "bg-[#6C1D5F]/10 text-[#6C1D5F] font-bold"
                      : "text-slate-500 hover:bg-slate-100 hover:text-[#6C1D5F]"
                  }`}
                >
                  <CategoryIcon size={16} />
                </button>
              );
            })}
          </div>
          {/* ── Collapsed Back to Admin Switch ── */}
          <div className="flex-shrink-0 border-t border-[#d5c1cc]/60 p-3 bg-white flex justify-center w-full">
            <Link
              to="/admin"
              title="Back to Admin"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#6C1D5F] hover:bg-[#521347] text-white transition-all cursor-pointer shadow-sm shadow-[#6C1D5F]/15"
            >
              <ArrowLeft size={16} />
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* ── Header Toolbar ── */}
          <div className="p-4 border-b border-slate-200/60 flex flex-col gap-2.5 shrink-0 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Analytics Explorer
              </span>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onRefresh}
                  title="Refresh Dashboard"
                  aria-label="Refresh Dashboard"
                  className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onAddCustomReport}
                  title="Add Custom Report"
                  aria-label="Add Custom Report"
                  className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <Plus className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onToggleCollapse}
                  title="Collapse Sidebar"
                  aria-label="Collapse Sidebar"
                  className="text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  <ChevronsLeft className="size-3.5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports, KPIs..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F] focus:border-[#6C1D5F] outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* ── Tree Categories Content ── */}
          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar select-none py-3 font-sans">
            {filteredCategories.map((c) => {
              const isCategoryActive = location.pathname === c.path;
              const CategoryIcon = ICON_MAP[c.iconName] || FileText;

              return (
                <div key={c.id} className="space-y-0.5 px-3">
                  <div
                    onClick={() => navigate(c.path)}
                    className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all border border-transparent ${
                      isCategoryActive
                        ? "bg-[#6C1D5F]/10 border border-[#6C1D5F]/10 font-semibold text-[#6C1D5F]"
                        : "hover:bg-white hover:shadow-xs text-slate-700 hover:text-[#6C1D5F]"
                    }`}
                  >
                    <CategoryIcon
                      size={14}
                      className={`shrink-0 ${isCategoryActive ? "text-[#6C1D5F]" : "text-slate-450"}`}
                    />

                    <span className="text-[12px] truncate flex-1 font-semibold">
                      {c.title}
                    </span>
                  </div>
                </div>
              );
            })}
            {filteredCategories.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-[11px] text-slate-400">No matching reports found</p>
              </div>
            )}
          </div>
          {/* ── Expanded Back to Admin Switch ── */}
          <div className="flex-shrink-0 border-t border-[#d5c1cc]/60 p-3 bg-white">
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12px] font-semibold transition-all shadow-sm shadow-[#6C1D5F]/15 hover:shadow-md cursor-pointer text-center w-full"
            >
              <ArrowLeft size={13} className="shrink-0" />
              <span>Back to Admin</span>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}
