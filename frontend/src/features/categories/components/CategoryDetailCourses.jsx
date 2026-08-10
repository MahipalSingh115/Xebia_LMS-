import React from "react";
import { BookOpen, Plus, Search, ChevronLeft, ChevronRight, Pencil, Trash2, Activity } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";

import EmptyState from "@/shared/components/EmptyState";

const LEVEL_CLS = {
  Beginner:     "bg-emerald-100 text-emerald-700 border-transparent",
  Intermediate: "bg-blue-100 text-blue-700 border-transparent",
  Advanced:     "bg-amber-100 text-amber-800 border-transparent",
  Expert:       "bg-red-100 text-red-700 border-transparent",
};

export default function CategoryDetailCourses({
  courseSearch,
  setCourseSearch,
  statusFilter,
  setStatusFilter,
  levelFilter,
  setLevelFilter,
  page,
  setPage,
  PER_PAGE,
  filtered,
  totalPages,
  paginated,
  activities,
  navigate,
  loading,
}) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4 text-left">
      
      {/* Courses table card */}
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="flex-row items-center justify-between py-3.5 px-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-800">
            <BookOpen size={14} className="text-slate-400" />
            Courses in this Category
          </div>
          <Button variant="ghost" size="sm" className="text-[#6C1D5F] hover:text-[#4A1E47] gap-1 text-[12.5px] font-medium h-auto py-1 px-2 cursor-pointer">
            <Plus size={12} /> Add Course
          </Button>
        </CardHeader>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input
              value={courseSearch}
              onChange={(e) => { setCourseSearch(e.target.value); setPage(1); }}
              placeholder="Search courses..."
              className="pl-8 text-[12.5px] h-8 w-52 bg-slate-50 border-slate-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-8 px-2 pr-6 bg-slate-50 border border-slate-200 rounded-md text-[12.5px] font-medium text-slate-600 outline-none cursor-pointer appearance-none"
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <select
            value={levelFilter}
            onChange={(e) => { setLevelFilter(e.target.value); setPage(1); }}
            className="h-8 px-2 pr-6 bg-slate-50 border border-slate-200 rounded-md text-[12.5px] font-medium text-slate-600 outline-none cursor-pointer appearance-none"
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <span className="ml-auto text-[12px] text-slate-400 font-medium">
            {filtered.length} courses
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Course","Level","Duration","Learners","Status","Updated",""].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap first:pl-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="py-10 text-center text-[13px] text-slate-400">Loading…</td></tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 px-4 text-center">
                    <EmptyState
                      icon={BookOpen}
                      title="No courses found"
                      description="There are no courses in this category yet. Create a course to get started."
                      primaryAction={{
                        label: "Create Course",
                        onClick: () => navigate("/courses/create"),
                      }}
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((row) => (
                  <CourseRow key={row.id} row={row} navigate={navigate} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100">
          <span className="text-[12px] text-slate-400">
            Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} courses
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40 cursor-pointer">
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-md border text-[12.5px] font-medium transition-colors cursor-pointer ${page === p ? "bg-[#6C1D5F] text-white border-[#6C1D5F]" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-40 cursor-pointer">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </Card>

      {/* Recent Activity card */}
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="flex-row items-center gap-2 py-3.5 px-4 border-b border-slate-200">
          <Activity size={14} className="text-slate-400" />
          <span className="text-[13.5px] font-semibold text-slate-800">Recent Activity</span>
        </CardHeader>
        <CardContent className="px-4 py-1">
          {activities.length === 0 ? (
            <div className="text-[12px] text-slate-400 py-6 text-center">
              No recent activity.
            </div>
          ) : (
            activities.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 py-3 ${i < activities.length - 1 ? "border-b border-slate-100" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.color}`}>
                  <item.icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-slate-800 leading-snug">{item.title}</div>
                  <div className="text-[11.5px] text-slate-400 mt-0.5">{item.meta}</div>
                </div>
                <span className="text-[11.5px] text-slate-400 flex-shrink-0 whitespace-nowrap">{item.time}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

    </div>
  );
}

function CourseRow({ row, navigate }) {
  const levelCls = LEVEL_CLS[row.level] || LEVEL_CLS.Intermediate;
  const isPub    = row.status === "Published";

  return (
    <tr className="hover:bg-slate-50/60 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-8 rounded flex-shrink-0 bg-slate-200 overflow-hidden">
            {row.thumbnail && <img src={row.thumbnail} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-slate-800 truncate max-w-[180px]">{row.title}</div>
            <div className="text-[11.5px] text-slate-400 truncate max-w-[180px]">{row.subtitle || row.sub}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge className={`text-[11.5px] font-semibold ${levelCls}`}>{row.level}</Badge>
      </td>
      <td className="px-4 py-3 text-[13px] text-slate-500 whitespace-nowrap">{row.duration || row.dur}</td>
      <td className="px-4 py-3 text-[13px] font-semibold text-slate-800">{row.learners}</td>
      <td className="px-4 py-3">
        <Badge className={`text-[11.5px] font-semibold ${isPub ? "bg-emerald-100 text-emerald-700 border-transparent" : "bg-slate-100 text-slate-500 border-transparent"}`}>
          {row.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-[12px] text-slate-400 whitespace-nowrap">{row.updated}</td>
      <td className="px-4 py-3 pr-4">
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
            <BookOpen size={13} className="text-slate-500" />
          </button>
          <button onClick={() => navigate(`/courses/${row.id}/edit`)} className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-pointer">
            <Pencil size={13} className="text-slate-500" />
          </button>
          <button className="w-7 h-7 rounded-md border border-red-100 bg-red-50 flex items-center justify-center hover:bg-red-100 cursor-pointer">
            <Trash2 size={13} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
