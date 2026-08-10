import { Minus, CheckCircle, Star, Archive, Trash2 } from "lucide-react";

export default function CoursesBulkBar({
  selectedCount,
  onToggleAll,
  onClearSelection,
  onPublish,
  onFeature,
  onArchive,
  onDelete,
}) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#eef2ff] border-b border-[#c7d2fe] flex-wrap">
      <div
        className="w-[15px] h-[15px] rounded-[3px] bg-[#6C1D5F] border-[#6C1D5F] border flex items-center justify-center cursor-pointer flex-shrink-0"
        onClick={onToggleAll}
      >
        <Minus size={9} className="text-white" />
      </div>
      <span className="text-[13px] font-semibold text-[#6C1D5F]">{selectedCount} selected</span>
      <span className="text-[#c7d2fe]">|</span>
      <button
        onClick={() => {
          console.log("Publish button clicked in CoursesBulkBar");
          if (onPublish) onPublish();
        }}
        className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer"
      >
        <CheckCircle size={12} /> Publish
      </button>
      <button
        onClick={() => {
          console.log("Feature button clicked in CoursesBulkBar");
          if (onFeature) onFeature();
        }}
        className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer"
      >
        <Star size={12} /> Feature
      </button>
      <button
        onClick={() => {
          console.log("Archive button clicked in CoursesBulkBar");
          if (onArchive) onArchive();
        }}
        className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-slate-700 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer"
      >
        <Archive size={12} /> Archive
      </button>
      <button
        onClick={() => {
          console.log("Delete button clicked in CoursesBulkBar");
          if (onDelete) onDelete();
        }}
        className="flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-medium text-red-600 border border-red-200 bg-red-50 rounded-md hover:bg-red-100 cursor-pointer"
      >
        <Trash2 size={12} /> Delete
      </button>
      <button
        className="ml-auto text-[12px] font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md px-2.5 py-1 bg-white cursor-pointer"
        onClick={onClearSelection}
      >
        Clear selection
      </button>
    </div>
  );
}
