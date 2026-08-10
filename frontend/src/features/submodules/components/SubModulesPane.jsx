import React from "react";
import { Plus, Edit, Trash2, Layers, BookOpen, ExternalLink } from "lucide-react";
import EmptyState from "@/shared/components/EmptyState";

export default function SubModulesPane({
  activeModule,
  activeSubModules,
  openContentLibraryDialog,
  handleOpenSubModuleModal,
  handleDeleteSubModule,
}) {
  if (!activeModule) {
    return (
      <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[500px] justify-center items-center p-8">
        <EmptyState
          icon={Layers}
          title="No Module Selected"
          description="Select a course module from the left pane or click 'Add Module' to start structuring curriculum."
        />
      </div>
    );
  }

  return (
    <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[500px] text-left">
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">{activeModule.title}</h3>
          <p className="text-[12px] text-slate-400 font-medium mt-0.5">
            {activeModule.description || "No description provided for this module."}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openContentLibraryDialog(null, activeModule.title)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#6C1D5F] text-[#6C1D5F] hover:bg-[#6C1D5F]/5 rounded-lg text-[12px] font-bold transition-all shrink-0 cursor-pointer"
            title="Open Curriculum for this module"
          >
            <ExternalLink size={13} /> Curriculum
          </button>
          <button
            onClick={() => handleOpenSubModuleModal()}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#6C1D5F] hover:bg-[#521347] text-white rounded-lg text-[12px] font-bold shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <Plus size={14} /> Add Submodule
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {activeSubModules.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={Layers}
              title="No submodules added yet"
              description="Add a submodule to structure lessons within this module."
              primaryAction={{
                label: "Add Submodule",
                onClick: handleOpenSubModuleModal,
              }}
            />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="px-4 py-3 rounded-l-lg">Title & Description</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeSubModules.map((sm) => (
                <tr key={sm.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-4 py-4.5 max-w-[180px] sm:max-w-[320px]">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-800 truncate">{sm.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                          {sm.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4.5">
                    <span className="font-mono text-[11.5px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {sm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                    </span>
                  </td>
                  <td className="px-4 py-4.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openContentLibraryDialog(sm.id, sm.title)}
                        className="p-1.5 hover:bg-[#6C1D5F]/5 rounded text-slate-400 hover:text-[#6C1D5F] transition-colors cursor-pointer"
                        title="Open in Curriculum"
                      >
                        <ExternalLink size={13} />
                      </button>
                      <button
                        onClick={() => handleOpenSubModuleModal(sm)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteSubModule(sm.id)}
                        className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
