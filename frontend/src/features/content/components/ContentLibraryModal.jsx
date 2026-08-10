import React from "react";
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

export default function ContentLibraryModal({
  isModalOpen,
  setIsModalOpen,
  editingContent,
  contentTitle,
  setContentTitle,
  contentBody,
  setContentBody,
  contentType,
  setContentType,
  videoUrl,
  setVideoUrl,
  pdfUrl,
  setPdfUrl,
  targetSubModuleId,
  setTargetSubModuleId,
  submodules,
  handleSaveContent,
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-[450px] text-left">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800">
            {editingContent ? "Edit Content Block" : "Create New Content Block"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="contTitle" className="text-[12px] font-semibold text-slate-500">
              Content Title *
            </Label>
            <Input
              id="contTitle"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              placeholder="e.g. Overview of Machine Learning"
              className="text-[13px] h-10 border-slate-200"
              required
            />
          </div>

          {/* Description / Body */}
          <div className="space-y-1.5">
            <Label htmlFor="contBody" className="text-[12px] font-semibold text-slate-500">
              Content Description / Body
            </Label>
            <Textarea
              id="contBody"
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              placeholder="Write a brief description or insert your rich text content..."
              className="text-[13px] border-slate-200 focus:ring-[#6C1D5F]/20 resize-none min-h-[90px] animate-none"
              rows={3}
            />
          </div>

          {/* Type selection */}
          <div className="space-y-1.5">
            <Label htmlFor="contType" className="text-[12px] font-semibold text-slate-500">
              Content Type *
            </Label>
            <select
              id="contType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg px-3 py-2 cursor-pointer outline-none h-10"
              required
            >
              <option value="Video">Video Link</option>
              <option value="PDF">PDF Link</option>
              <option value="Text">Article / Text</option>
            </select>
          </div>

          {/* Dynamic source inputs */}
          {contentType === "Video" && (
            <div className="space-y-1.5">
              <Label htmlFor="contVideo" className="text-[12px] font-semibold text-slate-500">
                Video URL (YouTube or Wistia) *
              </Label>
              <Input
                id="contVideo"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="text-[13px] h-10 border-slate-200"
                required
              />
            </div>
          )}

          {contentType === "PDF" && (
            <div className="space-y-1.5">
              <Label htmlFor="contPdf" className="text-[12px] font-semibold text-slate-500">
                PDF Resource URL *
              </Label>
              <Input
                id="contPdf"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://example.com/assets/slides.pdf"
                className="text-[13px] h-10 border-slate-200"
                required
              />
            </div>
          )}

          {/* Sub-module link selection */}
          <div className="space-y-1.5">
            <Label htmlFor="contSub" className="text-[12px] font-semibold text-slate-500">
              Attach to Sub-module
            </Label>
            <select
              id="contSub"
              value={targetSubModuleId}
              onChange={(e) => setTargetSubModuleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg px-3 py-2 cursor-pointer outline-none h-10"
            >
              <option value="">— Unassigned (Draft Library) —</option>
              {submodules.map((sub) => (
                <option key={sub.id} value={String(sub.dbId || sub.id)}>
                  {sub.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 mt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="text-[13px] border-slate-200 text-slate-600 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSaveContent}
            className="text-[13px] bg-[#6C1D5F] hover:bg-[#4A1E47] text-white cursor-pointer"
          >
            {editingContent ? "Save Changes" : "Create Block"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
