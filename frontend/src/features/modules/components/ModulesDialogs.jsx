import React from "react";
import { Layers, BookOpen, FileEdit, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

export default function ModulesDialogs({
  isModuleModalOpen,
  setIsModuleModalOpen,
  editingModule,
  moduleTitle,
  setModuleTitle,
  moduleDescription,
  setModuleDescription,
  handleSaveModule,

  isSubModuleModalOpen,
  setIsSubModuleModalOpen,
  editingSubModule,
  subModuleTitle,
  setSubModuleTitle,
  subModuleDescription,
  setSubModuleDescription,
  handleSaveSubModule,

  cbDialogTarget,
  setCbDialogTarget,
  selectedCourseId,
  handleConfirmOpenContentLibrary,
}) {
  return (
    <>
      {/* Module Modal */}
      <Dialog open={isModuleModalOpen} onOpenChange={setIsModuleModalOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 text-left">
          <DialogHeader className="border-b border-slate-50 pb-4">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <Layers size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{editingModule ? "Edit Module" : "Add Module"}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  {editingModule ? "Modify the properties and details of this curriculum module." : "Create a new learning module for the selected course curriculum."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveModule} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="modTitle" className="text-[12px] font-semibold text-slate-500">
                Module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="modTitle"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="e.g. Module 01: Introduction to UX"
                className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="modDesc" className="text-[12px] font-semibold text-slate-500">
                Description
              </Label>
              <Textarea
                id="modDesc"
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Brief summary of what this module covers..."
                className="text-[13px] px-3.5 py-2.5 min-h-[90px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
              />
            </div>
            <DialogFooter className="pt-4 border-t border-slate-50 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModuleModalOpen(false)}
                className="text-[12.5px] font-semibold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm shadow-[#6C1D5F]/10 cursor-pointer"
              >
                Save Module
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Submodule Modal */}
      <Dialog open={isSubModuleModalOpen} onOpenChange={setIsSubModuleModalOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 text-left">
          <DialogHeader className="border-b border-slate-50 pb-4">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <BookOpen size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{editingSubModule ? "Edit Submodule" : "Add Submodule"}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  {editingSubModule ? "Modify the title and objectives of this submodule." : "Create a new submodule containing lessons and lectures."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveSubModule} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="subTitle" className="text-[12px] font-semibold text-slate-500">
                Submodule Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subTitle"
                value={subModuleTitle}
                onChange={(e) => setSubModuleTitle(e.target.value)}
                placeholder="e.g. Lesson 1.1: What is User Experience?"
                className="text-[13px] px-3.5 py-2.5 h-10 outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subDesc" className="text-[12px] font-semibold text-slate-500">
                Description
              </Label>
              <Textarea
                id="subDesc"
                value={subModuleDescription}
                onChange={(e) => setSubModuleDescription(e.target.value)}
                placeholder="Summary or objectives for this submodule..."
                className="text-[13px] px-3.5 py-2.5 min-h-[90px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
              />
            </div>
            <DialogFooter className="pt-4 border-t border-slate-50 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSubModuleModalOpen(false)}
                className="text-[12.5px] font-semibold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm shadow-[#6C1D5F]/10 cursor-pointer"
              >
                Save Submodule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Curriculum Confirmation Dialog */}
      <Dialog open={!!cbDialogTarget} onOpenChange={(open) => { if (!open) setCbDialogTarget(null); }}>
        <DialogContent className="max-w-[460px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 text-left">
          <DialogHeader className="pb-4 border-b border-slate-100">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <FileEdit size={16} />
              </div>
              <span>Open Curriculum</span>
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-3">
            {cbDialogTarget?.label && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <Layers size={13} className="text-[#6C1D5F] shrink-0" />
                <span className="text-[12px] font-semibold text-slate-700 truncate">{cbDialogTarget.label}</span>
              </div>
            )}
            <p className="text-[13px] text-slate-500 leading-relaxed">
              You are about to open the <span className="font-semibold text-slate-700">Curriculum Builder</span> for this module.
              Manage modules, sub-modules, content blocks, videos, PDFs, articles, quizzes, assignments, and other learning resources from there.
            </p>
            {!selectedCourseId && (
              <p className="text-[12px] text-amber-600 font-medium bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                ⚠ Please select a course first.
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCbDialogTarget(null)}
              className="text-[12.5px] font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!selectedCourseId}
              onClick={handleConfirmOpenContentLibrary}
              className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-5 shadow-sm shadow-[#6C1D5F]/10 flex items-center gap-1.5 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
            >
              <ExternalLink size={13} /> Open Curriculum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
