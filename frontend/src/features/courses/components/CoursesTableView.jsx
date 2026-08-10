import {
  Minus, CheckCircle, ChevronsUpDown, BookOpen,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CoursesTableRow from "./CoursesTableRow";
import CoursesBulkBar from "./CoursesBulkBar";
import EmptyState from "@/shared/components/EmptyState";

const COLUMNS = [
  ["ID",       "w-16"],
  ["Course",   "min-w-[260px]"],
  ["Category", ""],
  ["Difficulty",""],
  ["Duration", ""],
  ["Published",""],
  ["Active",   ""],
  ["Featured", ""],
  ["Learners", ""],
  ["Updated",  ""],
  ["",         "w-10"],
];

export default function CoursesTableView({
  loading,
  filtered,
  allCourses,
  selected,
  allSelected,
  someSelected,
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
  onBulkArchive,
  onBulkFeature,
  onBulkDelete,
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {/* Select-all checkbox */}
              <th className="w-9 pl-4 py-2.5">
                <div
                  className={`w-[15px] h-[15px] rounded-[3px] border flex items-center justify-center cursor-pointer ${
                    allSelected || someSelected
                      ? "bg-[#6C1D5F] border-[#6C1D5F]"
                      : "border-slate-300 bg-white"
                  }`}
                  onClick={onToggleAll}
                >
                  {(allSelected || someSelected) && (
                    someSelected && !allSelected
                      ? <Minus size={9} className="text-white" />
                      : <CheckCircle size={9} className="text-white" />
                  )}
                </div>
              </th>

              {/* Column headers */}
              {COLUMNS.map(([h, cls]) => (
                <th
                  key={h}
                  className={`px-3.5 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap ${cls}`}
                >
                  {h && (
                    <div className="flex items-center gap-1 cursor-pointer">
                      {h} {h !== "" && <ChevronsUpDown size={10} className="text-slate-300" />}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={12} className="py-8 text-center text-[13px] text-slate-400">
                  Loading courses…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-8 px-4 text-center">
                  <EmptyState
                    icon={BookOpen}
                    title="No courses found"
                    description="Try adjusting your filters or create a new course to get started."
                    primaryAction={{
                      label: "Create New Course",
                      onClick: () => navigate("/courses/create"),
                    }}
                  />
                </td>
              </tr>
            ) : (
              filtered.map((course) => (
                <CoursesTableRow
                  key={course.id}
                  course={course}
                  isSelected={selected.has(course.id)}
                  isOpen={openDropdown === course.id}
                  onToggleSelect={onToggleSelect}
                  onToggleActive={onToggleActive}
                  onToggleFeatured={onToggleFeatured}
                  onOpenDropdown={onOpenDropdown}
                  onCloseDropdown={onCloseDropdown}
                  onDeleteTarget={onDeleteTarget}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
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
