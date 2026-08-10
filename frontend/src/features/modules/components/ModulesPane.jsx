import React from "react";
import { Plus, Edit, Trash2, Layers } from "lucide-react";
import EmptyState from "@/shared/components/EmptyState";

export default function ModulesPane({
  modules,
  submodules,
  activeModuleId,
  setActiveModuleId,
  selectedCourseId,
  handleOpenModuleModal,
  handleDeleteModule,
}) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[500px] text-left">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <span className="text-[13px] font-bold text-slate-700">
          Course Modules ({modules.length})
        </span>
        <button
          onClick={() => handleOpenModuleModal()}
          disabled={!selectedCourseId}
          className="flex items-center gap-1 text-[11px] font-bold text-[#6C1D5F] hover:text-[#521347] uppercase tracking-wider disabled:opacity-50 cursor-pointer"
        >
          <Plus size={12} /> Add Module
        </button>
      </div>

      <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-[550px] flex flex-col">
        {modules.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              size="sm"
              icon={Layers}
              title="No modules defined"
              description="Click 'Add Module' to start building this course curriculum."
              primaryAction={{
                label: "Add Module",
                disabled: !selectedCourseId,
                onClick: () => handleOpenModuleModal(),
              }}
            />
          </div>
        ) : (
          modules.map((mod) => {
            const isActive = mod.id === activeModuleId;
            const subCount = submodules.filter((sm) => sm.moduleId === mod.id).length;
            return (
              <div
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`group flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-50/55 border-purple-100 text-[#6C1D5F]"
                    : "border-slate-100 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-[13.5px] font-semibold truncate ${isActive ? "text-[#6C1D5F]" : "text-slate-800"}`}>
                    {mod.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {subCount} {subCount === 1 ? "submodule" : "submodules"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModuleModal(mod);
                    }}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModule(mod.id);
                    }}
                    className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
