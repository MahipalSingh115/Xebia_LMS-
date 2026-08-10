import React from "react";
import { Edit, Trash2, Video, FileText, File } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import EmptyState from "@/shared/components/EmptyState";

export default function ContentLibraryGrid({
  filteredContents,
  selected,
  handleToggleSelect,
  handleToggleAll,
  getContentItemType,
  handleOpenModal,
  handleDeleteContent,
  submodules,
}) {
  
  const allSelected = filteredContents.length > 0 && filteredContents.every(c => selected.includes(c.id));

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-left">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-5 py-3.5 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleToggleAll}
                className="rounded border-slate-300 text-[#6C1D5F] focus:ring-[#6C1D5F] cursor-pointer"
              />
            </th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">Attached to Sub-module</th>
            <th className="px-5 py-3.5 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider w-28">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {filteredContents.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-8 text-center">
                <EmptyState
                  icon={FileText}
                  title="No content items found"
                  description="Try adjusting your search or filters, or upload a new content item to get started."
                  primaryAction={{
                    label: "Add Content",
                    onClick: () => handleOpenModal(),
                  }}
                />
              </td>
            </tr>
          ) : (
            filteredContents.map(c => {
              const isSelected = selected.includes(c.id);
              const typeLabel = getContentItemType(c);
              
              // Find submodule name
              const subModuleName = submodules.find(sub => String(sub.dbId || sub.id) === String(c.subModuleId))?.title || "Unassigned";

              return (
                <tr key={c.id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? "bg-[#6C1D5F]/5 hover:bg-[#6C1D5F]/5" : ""}`}>
                  <td className="px-5 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(c.id)}
                      className="rounded border-slate-300 text-[#6C1D5F] focus:ring-[#6C1D5F] cursor-pointer"
                    />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      {typeLabel === "Video" ? (
                        <span className="p-1.5 bg-red-50 text-red-600 rounded-lg flex items-center justify-center border border-red-100">
                          <Video size={14} />
                        </span>
                      ) : typeLabel === "PDF" ? (
                        <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
                          <FileText size={14} />
                        </span>
                      ) : (
                        <span className="p-1.5 bg-purple-50 text-[#6C1D5F] rounded-lg flex items-center justify-center border border-purple-100">
                          <File size={14} />
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{typeLabel}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[13px] font-semibold text-slate-800 leading-snug">{c.title}</span>
                  </td>
                  <td className="px-5 py-4 max-w-[200px]">
                    <span className="text-[12px] text-slate-400 font-medium line-clamp-1">{c.body || "No additional body details."}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${subModuleName === "Unassigned" ? "bg-slate-50 text-slate-400 border-slate-200" : "bg-purple-50 text-[#6C1D5F] border-purple-100"}`}>
                      {subModuleName}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenModal(c)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                        title="Edit Content"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteContent(c.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 cursor-pointer"
                        title="Delete Content"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
