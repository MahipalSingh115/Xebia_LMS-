import { useNavigate } from "react-router-dom";
import {
  CheckCircle, Star, Layers, BarChart, Copy,
  Pencil, Eye, Trash2, MoreHorizontal,
} from "lucide-react";
import { DIFF_BADGE, STATUS_BADGE, getCatBadge } from "./courseConstants";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

export default function CoursesTableRow({
  course,
  isSelected,
  isOpen,
  onToggleSelect,
  onToggleActive,
  onToggleFeatured,
  onOpenDropdown,
  onCloseDropdown,
  onDeleteTarget,
}) {
  const navigate = useNavigate();
  const statusKey = course.status.toLowerCase();
  const status    = STATUS_BADGE[statusKey] ?? STATUS_BADGE.draft;
  const diffCls   = DIFF_BADGE[course.difficulty] ?? DIFF_BADGE.Intermediate;
  const catCls    = getCatBadge(course.category);

  const menuItems = [
    { icon: Pencil,   label: "Edit Course",  action: () => { navigate(`/courses/${course.id}/edit`); onCloseDropdown(); } },
    { icon: Eye,      label: "Preview",      action: () => onCloseDropdown() },
    { icon: Layers,   label: "Curriculum",   action: () => { navigate(`/courses/${course.id}/curriculum`); onCloseDropdown(); } },
    { icon: BarChart, label: "Analytics",    action: () => onCloseDropdown() },
    { icon: Copy,     label: "Duplicate",    action: () => onCloseDropdown() },
    null,
    { icon: Trash2,   label: "Delete",       danger: true, action: () => { onDeleteTarget(course); onCloseDropdown(); } },
  ];

  return (
    <tr className={`transition-colors hover:bg-slate-50/60 ${isSelected ? "bg-[#fafaff]" : ""}`}>
      {/* Checkbox */}
      <td className="w-9 pl-4 py-3">
        <div
          className={`w-[15px] h-[15px] rounded-[3px] border flex items-center justify-center cursor-pointer ${
            isSelected ? "bg-[#6C1D5F] border-[#6C1D5F]" : "border-slate-300 bg-white hover:border-[#6C1D5F]"
          }`}
          onClick={() => onToggleSelect(course.id)}
        >
          {isSelected && <CheckCircle size={9} className="text-white" />}
        </div>
      </td>

      {/* ID */}
      <td className="px-3.5 py-3">
        <span className="text-[12px] font-mono text-slate-400">{course.id}</span>
      </td>

      {/* Course */}
      <td className="px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-12 h-8 rounded-[4px] object-cover flex-shrink-0 border border-slate-200"
          />
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-slate-900 truncate max-w-[200px]">{course.title}</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <Layers size={10} /> {course.modules || "—"} modules
              {course.rating && (
                <><span className="text-slate-200">·</span> <Star size={10} className="text-amber-400 fill-amber-400" /> {course.rating}</>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-3.5 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${catCls}`}>
          {course.category}
        </span>
      </td>

      {/* Difficulty */}
      <td className="px-3.5 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${diffCls}`}>
          {course.difficulty}
        </span>
      </td>

      {/* Duration */}
      <td className="px-3.5 py-3 text-[12px] text-slate-600">{course.duration}</td>

      {/* Published status */}
      <td className="px-3.5 py-3">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${status.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
          {status.label}
        </span>
      </td>

      {/* Active toggle */}
      <td className="px-3.5 py-3">
        <div
          className={`w-7 h-[15px] rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${course.active ? "bg-emerald-500" : "bg-slate-200"}`}
          onClick={() => onToggleActive(course.id)}
        >
          <div className={`w-[11px] h-[11px] rounded-full bg-white absolute top-[2px] transition-all shadow-sm ${course.active ? "left-[14px]" : "left-[2px]"}`} />
        </div>
      </td>

      {/* Featured star */}
      <td className="px-3.5 py-3 text-center">
        <button onClick={() => onToggleFeatured(course.id)}>
          <Star
            size={14}
            className={course.featured ? "text-amber-400 fill-amber-400" : "text-slate-300 hover:text-amber-300"}
          />
        </button>
      </td>

      {/* Learners */}
      <td className="px-3.5 py-3 text-[13px] font-bold text-slate-900">
        {course.learners || "—"}
      </td>

      {/* Updated */}
      <td className="px-3.5 py-3 text-[12px] text-slate-400">{course.updated}</td>

      {/* Actions dropdown */}
      <td className="px-3.5 py-3">
        <div className="relative flex items-center justify-center">
          <DropdownMenu open={isOpen} onOpenChange={(open) => onOpenDropdown(open ? course.id : null)}>
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
      </td>
    </tr>
  );
}
