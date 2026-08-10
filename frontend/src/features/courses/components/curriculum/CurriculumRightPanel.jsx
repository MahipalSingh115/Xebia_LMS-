import React from "react";
import {
  User,
  Globe,
  Clock,
  Tag,
  Plus,
  HelpCircle,
  BookOpen,
  Trash2,
} from "lucide-react";
import { Separator } from "@/shared/components/ui/separator";
import { getContentLabel } from "@/features/courses/utils/curriculumHelpers";

export default function CurriculumRightPanel({
  activeSubModule,
  activeRightTab,
  setActiveRightTab,
  openEditSubModuleDrawer,
  requestDelete,
  openAddModuleModal,
  activeBlock,
}) {
  return (
    <aside className="w-[264px] bg-white border-l border-slate-200 flex flex-col shrink-0">
      {/* Tab bar */}
      <div className="px-3 pt-3 pb-0 border-b border-slate-100">
        <div className="flex bg-slate-100 p-0.5 rounded-lg">
          {["submodule", "block"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveRightTab(tab)}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all capitalize cursor-pointer ${
                activeRightTab === tab
                  ? "bg-white shadow-sm text-[#6C1D5F]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "submodule" ? "Properties" : "Block Settings"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeSubModule ? (
          activeRightTab === "submodule" ? (
            /* ── Sub-module properties ── */
            <div className="p-4 space-y-5">
              {/* Publishing status */}
              <section className="space-y-2">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</h3>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-[12px] font-semibold text-slate-700 flex-1">Draft</span>
                  <button className="text-[10px] font-bold text-[#6C1D5F] hover:underline cursor-pointer">Change</button>
                </div>
              </section>

              <Separator className="bg-slate-100" />

              {/* Metadata */}
              <section className="space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sub-module Info</h3>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-semibold text-slate-500 flex items-center gap-1"><User size={10} /> Author</label>
                  <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700">
                    <option>Admin</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-semibold text-slate-500 flex items-center gap-1"><Globe size={10} /> Visibility</label>
                  <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700">
                    <option>Everyone</option>
                    <option>Enrolled Only</option>
                    <option>Draft</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-semibold text-slate-500 flex items-center gap-1"><Clock size={10} /> Estimated Duration</label>
                  <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700">
                    <option>10 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-semibold text-slate-500 flex items-center gap-1"><Tag size={10} /> Tag</label>
                  <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700">
                    <option>Theory</option>
                    <option>Practical</option>
                    <option>Quiz</option>
                  </select>
                </div>
              </section>

              <Separator className="bg-slate-100" />

              {/* Completion rules */}
              <section className="space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completion Rules</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Mark done on scroll", desc: "Auto-complete when reached footer", checked: true },
                    { label: "Requires quiz pass", desc: "Must pass the block quiz", checked: false },
                    { label: "Minimum time", desc: "Spend at least the estimated time", checked: false },
                  ].map(({ label, desc, checked }) => (
                    <label key={label} className="flex items-start gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked={checked}
                        className="mt-0.5 w-3.5 h-3.5 rounded accent-[#6C1D5F] cursor-pointer"
                      />
                      <div>
                        <span className="text-[12px] font-semibold text-slate-700 block leading-tight">{label}</span>
                        <span className="text-[10.5px] text-slate-400 leading-tight">{desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <Separator className="bg-slate-100" />

              {/* Quick actions */}
              <section className="space-y-2">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</h3>
                <button
                  onClick={() => openEditSubModuleDrawer(activeSubModule)}
                  className="w-full flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-[12px] font-semibold">Edit Sub-module Details</span>
                </button>
                <button
                  onClick={() => requestDelete("submodule", activeSubModule)}
                  className="w-full flex items-center gap-2 px-3 py-2 border border-red-200 rounded-lg text-[12px] font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={12} /> Delete Sub-module
                </button>
              </section>
            </div>
          ) : (
            /* ── Block properties ── */
            (() => {
              const displayBlock = activeBlock || activeSubModule.blocks?.[0] || activeSubModule.content;
              return (
                <div className="p-4 space-y-5">
                  {displayBlock?.videoUrl ? (
                    <>
                      <section className="space-y-3">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Video Settings</h3>
                        <div className="space-y-3">
                          {[
                            { label: "Autoplay", on: false },
                            { label: "Allow seeking", on: true },
                            { label: "Loop video", on: false },
                          ].map(({ label, on }) => (
                            <div key={label} className="flex items-center justify-between">
                              <span className="text-[12px] font-semibold text-slate-700">{label}</span>
                              <button className={`w-9 h-5 rounded-full relative transition-colors ${on ? "bg-[#6C1D5F]" : "bg-slate-200"}`}>
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${on ? "right-0.5" : "left-0.5"}`} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10.5px] font-semibold text-slate-500">Aspect Ratio</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {["16:9", "4:3", "1:1"].map((r, i) => (
                              <button
                                key={r}
                                className={`py-1.5 border text-[11px] font-bold rounded-lg transition-colors ${
                                  i === 0
                                    ? "border-[#6C1D5F] bg-[#6C1D5F]/5 text-[#6C1D5F]"
                                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>
                      </section>
                      <Separator className="bg-slate-100" />
                    </>
                  ) : displayBlock?.pdfUrl ? (
                    <section className="space-y-3">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF Settings</h3>
                      <div className="space-y-3">
                        {[
                          { label: "Allow download", on: true },
                          { label: "Show annotations", on: false },
                        ].map(({ label, on }) => (
                          <div key={label} className="flex items-center justify-between">
                            <span className="text-[12px] font-semibold text-slate-700">{label}</span>
                            <button className={`w-9 h-5 rounded-full relative transition-colors ${on ? "bg-[#6C1D5F]" : "bg-slate-200"}`}>
                              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${on ? "right-0.5" : "left-0.5"}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : (
                    <div className="py-8 text-center text-slate-400">
                      <HelpCircle size={24} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-[12px] font-medium">No block selected</p>
                      <p className="text-[11px] text-slate-300 mt-1">Click a block in the editor to see its settings.</p>
                    </div>
                  )}

                  {/* Metadata (always shown in block tab) */}
                  {displayBlock && (
                    <section className="space-y-2">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Block Metadata</h3>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Type</span>
                        <span className="text-slate-700 font-semibold capitalize">{getContentLabel(displayBlock)}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Last modified</span>
                        <span className="text-slate-700 font-semibold">Just now</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Version</span>
                        <span className="text-slate-700 font-semibold">v1.0</span>
                      </div>
                    </section>
                  )}
                </div>
              );
            })()
          )
        ) : (
          <div className="p-6 text-center text-slate-400 pt-12">
            <BookOpen size={24} className="mx-auto mb-3 text-slate-200" />
            <p className="text-[12px] font-medium">Select a lesson to see its properties.</p>
          </div>
        )}
      </div>

      {/* Right panel footer */}
      <div className="border-t border-slate-100 p-3">
        <button
          onClick={openAddModuleModal}
          className="w-full flex items-center gap-2 p-2 text-slate-400 hover:text-[#6C1D5F] hover:bg-[#6C1D5F]/5 border border-dashed border-slate-200 hover:border-[#6C1D5F]/30 rounded-lg transition-all text-[11.5px] font-semibold cursor-pointer"
        >
          <Plus size={12} /> Add Module
        </button>
      </div>
    </aside>
  );
}
