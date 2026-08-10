import { useNavigate } from "react-router-dom";
import {
  CheckCircle, Star, Layers, BarChart, Copy,
  Pencil, Eye, Trash2, MoreHorizontal, BookOpen,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { DIFF_BADGE, STATUS_BADGE, getCatBadge } from "./courseConstants";
import CoursesBulkBar from "./CoursesBulkBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

import EmptyState from "@/shared/components/EmptyState";

export default function CoursesGridView({
  loading,
  filtered,
  allCourses,
  selected,
  openDropdown,
  onToggleAll,
  onToggleSelect,
  onToggleActive,
  onToggleFeatured,
  onOpenDropdown,
  onCloseDropdown,
  onDeleteTarget,
  onClearSelection,
  onBulkPublish,
  onBulkFeature,
  onBulkArchive,
  onBulkDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <CoursesBulkBar
          selectedCount={selected.size}
          onToggleAll={onToggleAll}
          onClearSelection={onClearSelection}
          onPublish={onBulkPublish}
          onFeature={onBulkFeature}
          onArchive={onBulkArchive}
          onDelete={onBulkDelete}
        />
      )}

      {/* Grid container */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-16 text-center text-[13px] text-slate-400">
          Loading courses…
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="Try adjusting your filters or create a new course to get started."
          primaryAction={{
            label: "Create New Course",
            onClick: () => navigate("/courses/create"),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((course) => {
            const isSelected = selected.has(course.id);
            const statusKey = course.status.toLowerCase();
            const status = STATUS_BADGE[statusKey] ?? STATUS_BADGE.draft;
            const diffCls = DIFF_BADGE[course.difficulty] ?? DIFF_BADGE.Intermediate;
            const catCls = getCatBadge(course.category);

            const menuItems = [
              {
                icon: Pencil,
                label: "Edit Course",
                action: () => {
                  navigate(`/courses/${course.id}/edit`);
                  onCloseDropdown();
                },
              },
              { icon: Eye, label: "Preview", action: () => onCloseDropdown() },
              {
                icon: Layers,
                label: "Curriculum",
                action: () => {
                  navigate(`/courses/${course.id}/curriculum`);
                  onCloseDropdown();
                },
              },
              { icon: BarChart, label: "Analytics", action: () => onCloseDropdown() },
              { icon: Copy, label: "Duplicate", action: () => onCloseDropdown() },
              null,
              {
                icon: Trash2,
                label: "Delete",
                danger: true,
                action: () => {
                  onDeleteTarget(course);
                  onCloseDropdown();
                },
              },
            ];

            return (
              <div
                key={course.id}
                className={`bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow relative flex flex-col h-full ${
                  isSelected ? "border-[#6C1D5F] ring-1 ring-[#6C1D5F]/10" : "border-slate-200"
                }`}
              >
                {/* Thumbnail Header */}
                <div className="h-40 w-full relative overflow-hidden bg-slate-50 border-b border-slate-100 flex-shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Selection Checkbox */}
                  <div
                    onClick={() => onToggleSelect(course.id)}
                    className={`absolute top-2.5 left-2.5 w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center cursor-pointer shadow-sm transition-all ${
                      isSelected ? "bg-[#6C1D5F] border-[#6C1D5F]" : "border-slate-300 bg-white/90 hover:bg-white hover:border-[#6C1D5F]"
                    }`}
                  >
                    {isSelected && <CheckCircle size={10} className="text-white" />}
                  </div>

                  {/* Overlay Featured Star */}
                  <button
                    onClick={() => onToggleFeatured(course.id)}
                    className="absolute top-2.5 right-2.5 w-[26px] h-[26px] rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                  >
                    <Star
                      size={13}
                      className={course.featured ? "text-amber-400 fill-amber-400" : "text-slate-400 hover:text-amber-400"}
                    />
                  </button>

                  {/* Overlay Status Badge */}
                  <span className={`absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${status.cls}`}>
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${status.dot}`} />
                    {status.label}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex flex-col flex-1 min-h-0">
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catCls}`}>
                      {course.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diffCls}`}>
                      {course.difficulty}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/courses/${course.id}/edit`)}
                    className="text-[13px] font-bold text-slate-900 mb-1 leading-snug line-clamp-2 hover:text-[#6C1D5F] transition-colors cursor-pointer"
                  >
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Layers size={10} /> {course.modules || "0"} modules
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Star size={10} className="text-amber-400 fill-amber-400" /> {course.rating}
                    </span>
                    <span>·</span>
                    <span>{course.duration}</span>
                  </div>

                  {/* Card Bottom Footer */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    {/* Active toggle and learners */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-[15px] rounded-full relative cursor-pointer transition-colors ${course.active ? "bg-emerald-500" : "bg-slate-200"}`}
                        onClick={() => onToggleActive(course.id)}
                      >
                        <div className={`w-[11px] h-[11px] rounded-full bg-white absolute top-[2px] transition-all shadow-sm ${course.active ? "left-[14px]" : "left-[2px]"}`} />
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        <span className="font-bold text-slate-700">{course.learners}</span> learners
                      </span>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="flex items-center">
                      <DropdownMenu open={openDropdown === course.id} onOpenChange={(open) => onOpenDropdown(open ? course.id : null)}>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="w-[26px] h-[26px] rounded-[4px] bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors focus:outline-hidden"
                          >
                            <MoreHorizontal size={12} className="text-slate-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[156px] bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                          {menuItems.map((item, i) =>
                            item === null ? (
                              <div key={i} className="h-px bg-slate-100 my-1" />
                            ) : (
                              <DropdownMenuItem
                                key={item.label}
                                onClick={item.action}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium hover:bg-slate-50 transition-colors ${item.danger ? "text-red-600 focus:text-red-600 focus:bg-red-50" : "text-slate-700"}`}
                              >
                                <item.icon size={12} className={item.danger ? "text-red-500" : "text-slate-400"} />
                                {item.label}
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-5 py-3 border border-slate-200 rounded-xl bg-slate-50">
        <span className="text-[12px] text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">1–{filtered.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{allCourses.length}</span>{" "}
          courses
        </span>
        <div className="flex items-center gap-1">
          <button
            className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40"
            disabled
          >
            <ChevronLeft size={13} />
          </button>
          <button className="w-7 h-7 rounded-md border border-[#6C1D5F] bg-[#6C1D5F] text-white text-[12px] font-semibold">
            1
          </button>
          <button
            className="w-7 h-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40"
            disabled
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
