import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  FolderOpen,
  BookOpen,
  FileText,
  GraduationCap,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Plus,
} from "lucide-react";
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
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import SafeMediaEmbed from "./SafeMediaEmbed";
import EmptyState from "@/shared/components/EmptyState";

export default function CurriculumDialogs({
  // Block picker
  blockPickerOpen,
  setBlockPickerOpen,
  blockSearch,
  setBlockSearch,
  filteredBlockCategories,
  selectedBlockType,
  setSelectedBlockType,
  // Block config dialog states & handlers
  blockConfigOpen,
  setBlockConfigOpen,
  blockConfigType,
  handleSelectBlockType,
  handleSaveBlock,
  showToast,

  // Block extra fields
  headingText,
  setHeadingText,
  quoteText,
  setQuoteText,
  dividerStyle,
  setDividerStyle,
  imageAlt,
  setImageAlt,
  imageCaption,
  setImageCaption,
  codeContent,
  setCodeContent,
  codeLanguage,
  setCodeLanguage,
  downloadUrl,
  setDownloadUrl,
  downloadDisplayName,
  setDownloadDisplayName,
  linkUrl,
  setLinkUrl,
  linkText,
  setLinkText,

  // Module modal
  isModuleModalOpen,
  setIsModuleModalOpen,
  editingModule,
  moduleTitle,
  setModuleTitle,
  moduleDescription,
  setModuleDescription,
  submittingModule,
  handleSaveModule,

  // Submodule modal
  isDrawerOpen,
  setIsDrawerOpen,
  editingSubModule,
  subModuleTitle,
  setSubModuleTitle,
  subModuleDescription,
  setSubModuleDescription,
  videoUrl,
  videoUrlError,
  handleVideoUrlChange,
  pdfUrl,
  setPdfUrl,
  pdfInputRef,
  handlePdfFileChange,
  uploadedFileName,
  setUploadedFileName,
  textContent,
  setTextContent,
  submittingSubModule,
  handleSaveSubModule,

  // Course Selector
  courseDialogOpen,
  setCourseDialogOpen,
  courseDialogTab,
  setCourseDialogTab,
  courseSearch,
  setCourseSearch,
  allCourses,
  loadingAllCourses,
  id,
  handleSelectCourse,
  newCourseTitle,
  setNewCourseTitle,
  newCourseDescription,
  setNewCourseDescription,
  newCourseCategory,
  setNewCourseCategory,
  creatingCourse,
  handleCreateAndSelectCourse,

  // Delete Target
  deleteTarget,
  setDeleteTarget,
  confirmDelete,

  // Toast
  toast,
  setToast,

  // Quiz & Assignment fields
  quizQuestions,
  setQuizQuestions,
  assignmentInstructions,
  setAssignmentInstructions,
  assignmentDueDate,
  setAssignmentDueDate,
  assignmentSubmissionType,
  setAssignmentSubmissionType,
  assignmentMaxScore,
  setAssignmentMaxScore,
}) {
  const navigate = useNavigate();
  // Image upload handler
  const imageInputRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const audioInputRef = React.useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const contentServiceMod = (await import("@/features/content/services/contentService")).default;
      const result = await contentServiceMod.uploadFile(file);
      setDownloadUrl(result.url);
      setUploadedFileName(result.filename || file.name);
      showToast("Image uploaded!");
    } catch (err) {
      console.error(err);
      showToast("Failed to upload image.", "error");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const contentServiceMod = (await import("@/features/content/services/contentService")).default;
      const result = await contentServiceMod.uploadFile(file);
      setDownloadUrl(result.url);
      setDownloadDisplayName(result.filename || file.name);
      showToast("File uploaded!");
    } catch (err) {
      console.error(err);
      showToast("Failed to upload file.", "error");
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const contentServiceMod = (await import("@/features/content/services/contentService")).default;
      const result = await contentServiceMod.uploadFile(file);
      setDownloadUrl(result.url);
      setDownloadDisplayName(result.filename || file.name);
      showToast("Audio uploaded!");
    } catch (err) {
      console.error(err);
      showToast("Failed to upload audio.", "error");
    }
  };
  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          BLOCK PICKER DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={blockPickerOpen} onOpenChange={setBlockPickerOpen}>
        <DialogContent className="max-w-[520px] rounded-xl shadow-2xl bg-white border border-slate-200 p-0 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-[#6C1D5F] focus-within:ring-1 focus-within:ring-[#6C1D5F]/30 transition-all">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={blockSearch}
                onChange={e => setBlockSearch(e.target.value)}
                placeholder="Search blocks..."
                className="flex-1 bg-transparent text-[13px] outline-none text-slate-700 placeholder:text-slate-400"
              />
              {blockSearch && (
                <button onClick={() => setBlockSearch("")} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X size={12} />
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-medium text-center">
              Select a block type to add to this submodule
            </p>
          </div>

          {/* Categories */}
          <ScrollArea className="max-h-[550px]">
            <div className="p-3 space-y-4">
              {filteredBlockCategories.map(cat => (
                <div key={cat.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1.5">{cat.label}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {cat.items.map(item => {
                      const Icon = item.icon;
                      const isSelected = selectedBlockType === item.type;
                      return (
                        <button
                          key={item.type}
                          onClick={() => {
                            setSelectedBlockType(item.type);
                            handleSelectBlockType(item.type);
                          }}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm cursor-pointer ${
                            isSelected
                              ? "border-[#6C1D5F] bg-[#6C1D5F]/5"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-[#6C1D5F] text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            <Icon size={15} />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-[12px] font-bold leading-tight ${isSelected ? "text-[#6C1D5F]" : "text-slate-700"}`}>{item.label}</p>
                            <p className="text-[10.5px] text-slate-400 leading-snug mt-0.5 line-clamp-2">{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {filteredBlockCategories.length === 0 && (
                <div className="py-8 text-center text-slate-400">
                  <Search size={20} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-[12px] font-medium">No blocks match "{blockSearch}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          MODULE DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={isModuleModalOpen} onOpenChange={setIsModuleModalOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6">
          <DialogHeader className="border-b border-slate-100 pb-4">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <FolderOpen size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{editingModule ? "Edit Module" : "Add Module"}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  {editingModule ? "Modify the properties of this curriculum module." : "Create a new learning module for this course."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveModule} className="space-y-4 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="moduleTitle" className="text-[12px] font-semibold text-slate-500">
                Module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="moduleTitle"
                value={moduleTitle}
                onChange={e => setModuleTitle(e.target.value)}
                placeholder="e.g. Module 1: Foundations of Design"
                className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="moduleDescription" className="text-[12px] font-semibold text-slate-500">Description</Label>
              <Textarea
                id="moduleDescription"
                value={moduleDescription}
                onChange={e => setModuleDescription(e.target.value)}
                placeholder="Briefly describe what this module covers."
                className="text-[13px] min-h-[80px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                rows={3}
              />
            </div>
            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" onClick={() => setIsModuleModalOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={submittingModule} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                {submittingModule ? "Saving..." : "Save Module"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          SUBMODULE DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DialogContent className="max-w-[480px] rounded-xl shadow-xl bg-white border border-slate-200 p-6 flex flex-col">
          <DialogHeader className="border-b border-slate-100 pb-4 shrink-0">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <BookOpen size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{editingSubModule ? "Edit Sub-module" : "Add Sub-module"}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 normal-case">
                  {editingSubModule ? "Modify the title and description of this sub-module." : "Create a new sub-module section in this module."}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveSubModule} className="space-y-4 py-3 flex-1 overflow-y-auto">
            <div className="space-y-1.5">
              <Label htmlFor="subModuleTitle" className="text-[12px] font-semibold text-slate-500">
                Sub-module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subModuleTitle"
                value={subModuleTitle}
                onChange={e => setSubModuleTitle(e.target.value)}
                placeholder="e.g. Introduction to Typography"
                className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subModuleDesc" className="text-[12px] font-semibold text-slate-500">Description</Label>
              <Textarea
                id="subModuleDesc"
                value={subModuleDescription}
                onChange={e => setSubModuleDescription(e.target.value)}
                placeholder="Brief description or learning objectives..."
                className="text-[13px] min-h-[80px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                rows={3}
              />
            </div>
            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" onClick={() => setIsDrawerOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={submittingSubModule} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                {submittingSubModule ? "Saving..." : "Save Sub-module"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          BLOCK CONFIGURATION DIALOG (Stitch Designs)
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={blockConfigOpen} onOpenChange={setBlockConfigOpen}>
        <DialogContent className="max-w-[640px] rounded-2xl shadow-2xl bg-white border border-slate-200 p-0 flex flex-col max-h-[90vh] overflow-hidden">
          {/* Header */}
          <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/5 text-[#6C1D5F] flex items-center justify-center shrink-0">
                <Plus size={16} />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-base font-bold text-slate-800 capitalize leading-tight">
                  {(blockConfigType === "text" || blockConfigType === "paragraph") ? "Paragraph Settings" : `${blockConfigType} Block Settings`}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium leading-none mt-1">
                  {blockConfigType === "video" && "Configure your multimedia video settings"}
                  {blockConfigType === "pdf" && "Configure your downloadable PDF settings"}
                  {(blockConfigType === "text" || blockConfigType === "paragraph") && "Configure your rich text content"}
                  {blockConfigType === "heading" && "Configure your section heading"}
                  {blockConfigType === "quote" && "Configure your inspirational quote block"}
                  {blockConfigType === "divider" && "Configure your visual divider"}
                  {blockConfigType === "image" && "Upload and configure your image"}
                  {blockConfigType === "code" && "Configure your code snippet block"}
                  {blockConfigType === "callout" && "Configure your callout/highlight block"}
                  {blockConfigType === "download" && "Configure your downloadable file"}
                  {blockConfigType === "file" && "Upload and configure your file attachment"}
                  {blockConfigType === "link" && "Configure your external link"}
                  {blockConfigType === "embed" && "Configure your embedded external resource"}
                  {blockConfigType === "audio" && "Configure your audio content"}
                </p>
              </div>
            </div>
          </header>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* 1. Video Form */}
            {blockConfigType === "video" && (
              <div className="space-y-4 text-left">
                {/* Preview */}
                {videoUrl.trim() && !videoUrlError && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
                    <SafeMediaEmbed url={videoUrl} title="Video Preview" />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="videoSourceUrl" className="text-[12px] font-bold text-slate-500">VIDEO SOURCE URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="videoSourceUrl"
                      type="url"
                      value={videoUrl}
                      onChange={e => handleVideoUrlChange(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className={`text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] flex-1 ${videoUrlError ? "border-red-400" : ""}`}
                    />
                  </div>
                  {videoUrlError && <p className="text-[11px] text-red-500 font-medium">{videoUrlError}</p>}
                  <p className="text-[10px] text-slate-400 font-medium">Supports YouTube, Vimeo, and Wistia links</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-700 block">Autoplay</span>
                      <span className="text-[10px] text-slate-400">Starts on load</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-700 block">Transcript</span>
                      <span className="text-[10px] text-slate-400">Enable text version</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. PDF Form */}
            {blockConfigType === "pdf" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="pdfSourceUrl" className="text-[12px] font-bold text-slate-500">DOCUMENT SOURCE URL</Label>
                  <Input
                    id="pdfSourceUrl"
                    type="url"
                    value={pdfUrl}
                    onChange={e => setPdfUrl(e.target.value)}
                    placeholder="https://example.com/document.pdf"
                    className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">Or Upload PDF File</Label>
                  <input type="file" ref={pdfInputRef} onChange={handlePdfFileChange} accept="application/pdf" className="hidden" />
                  {pdfUrl ? (
                    <div className="border border-emerald-200 rounded-xl p-3 bg-emerald-50/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-100 rounded-lg"><FileText size={14} className="text-emerald-700" /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[240px]">{uploadedFileName || "document.pdf"}</p>
                          <p className="text-[10px] text-emerald-700 font-bold">Attached</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => { setPdfUrl(""); setUploadedFileName(""); if (pdfInputRef.current) pdfInputRef.current.value = ""; }} className="px-2.5 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-[10px] font-bold border border-slate-200 bg-white cursor-pointer">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div onClick={() => pdfInputRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-[#6C1D5F] rounded-xl p-6 text-center hover:bg-slate-50/50 transition-all cursor-pointer space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/5 flex items-center justify-center text-[#6C1D5F] mx-auto"><FileText size={18} /></div>
                      <p className="text-xs font-bold text-slate-700">Click to upload PDF</p>
                      <p className="text-[10px] text-slate-400">PDF files only (Max. 50MB)</p>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pdfDisplayName" className="text-[12px] font-bold text-slate-500">DISPLAY NAME</Label>
                  <Input
                    id="pdfDisplayName"
                    placeholder="e.g. Course Syllabus 2024"
                    className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div>
                    <span className="text-[12.5px] font-bold text-slate-700 block">Enable Download</span>
                    <span className="text-[10px] text-slate-400">Allow students to save a local copy</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 3. Text/Article Form */}
            {(blockConfigType === "text" || blockConfigType === "paragraph") && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="articleContent" className="text-[12px] font-bold text-slate-500">ARTICLE CONTENT</Label>
                  <Textarea
                    id="articleContent"
                    value={textContent}
                    onChange={e => setTextContent(e.target.value)}
                    placeholder="Enter the article content for this lesson..."
                    className="text-[13px] min-h-[220px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                    rows={10}
                  />
                </div>
              </div>
            )}

            {/* 4. Heading Block Form */}
            {blockConfigType === "heading" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="headingText" className="text-[12px] font-bold text-slate-500">HEADING TEXT</Label>
                  <Input
                    id="headingText"
                    value={headingText}
                    onChange={e => setHeadingText(e.target.value)}
                    placeholder="Enter a section heading..."
                    className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  />
                </div>
                {headingText && (
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-bold text-slate-500">PREVIEW</Label>
                    <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
                      <h2 className="text-xl font-bold text-slate-800">{headingText}</h2>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Image Block Form */}
            {blockConfigType === "image" && (
              <div className="space-y-4 text-left">
                <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                {downloadUrl ? (
                  <div className="space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
                      <img src={downloadUrl} alt={imageAlt || "Uploaded image"} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-slate-500 font-medium truncate">{uploadedFileName}</p>
                      <button type="button" onClick={() => { setDownloadUrl(""); setUploadedFileName(""); if (imageInputRef.current) imageInputRef.current.value = ""; }} className="px-2.5 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-[10px] font-bold border border-slate-200 bg-white cursor-pointer">
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => imageInputRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-[#6C1D5F] rounded-xl p-8 text-center hover:bg-slate-50/50 transition-all cursor-pointer space-y-2">
                    <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/5 flex items-center justify-center text-[#6C1D5F] mx-auto">
                      <Plus size={18} />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Upload Image</p>
                    <p className="text-[10px] text-slate-400">Drag and drop your JPG, PNG or WebP image here, or click to browse</p>
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">Alt Text (Required for accessibility)</Label>
                  <Input value={imageAlt} onChange={e => setImageAlt(e.target.value)} placeholder="Describe the image for screen readers..." className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">Caption</Label>
                  <Input value={imageCaption} onChange={e => setImageCaption(e.target.value)} placeholder="Add a visible caption beneath the image" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 6. Code Block Form */}
            {blockConfigType === "code" && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-bold text-slate-500">LANGUAGE SPECIFICATION</Label>
                    <select
                      value={codeLanguage}
                      onChange={e => setCodeLanguage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700"
                    >
                      <option value="javascript">JavaScript (Node.js)</option>
                      <option value="python">Python</option>
                      <option value="html">HTML / CSS</option>
                      <option value="java">Java</option>
                      <option value="csharp">C#</option>
                      <option value="typescript">TypeScript</option>
                      <option value="sql">SQL</option>
                      <option value="bash">Bash</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#6C1D5F]" />
                      Read-only
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                      <input type="checkbox" className="rounded text-[#6C1D5F]" />
                      Show Output
                    </label>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">SNIPPET EDITOR</Label>
                  <Textarea
                    value={codeContent}
                    onChange={e => setCodeContent(e.target.value)}
                    placeholder="function initializeLMS() { ... }"
                    className="text-[13px] min-h-[140px] font-mono bg-slate-900 text-slate-100 focus:ring-1 focus:ring-[#6C1D5F]"
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* 7. Audio Block Form */}
            {blockConfigType === "audio" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">AUDIO TITLE</Label>
                  <Input value={downloadDisplayName} onChange={e => setDownloadDisplayName(e.target.value)} placeholder="e.g., Introduction to SEO Principles" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">AUDIO SOURCE URL</Label>
                  <Input value={downloadUrl} onChange={e => setDownloadUrl(e.target.value)} placeholder="https://example.com/audio.mp3" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">OR UPLOAD AUDIO FILE</Label>
                  <input type="file" ref={audioInputRef} onChange={handleAudioUpload} accept="audio/*" className="hidden" />
                  {downloadUrl ? (
                    <div className="border border-emerald-200 rounded-xl p-3 bg-emerald-50/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-100 rounded-lg"><FileText size={14} className="text-emerald-700" /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[240px]">{downloadDisplayName || "audio file"}</p>
                          <p className="text-[10px] text-emerald-700 font-bold">Attached</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => { setDownloadUrl(""); setDownloadDisplayName(""); if (audioInputRef.current) audioInputRef.current.value = ""; }} className="px-2.5 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-[10px] font-bold border border-slate-200 bg-white cursor-pointer">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div onClick={() => audioInputRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-[#6C1D5F] rounded-xl p-6 text-center hover:bg-slate-50/50 transition-all cursor-pointer">
                      <p className="text-xs font-bold text-slate-700">Click to upload or drag and drop</p>
                      <p className="text-[10px] text-slate-400 mt-1">MP3, WAV or OGG (max. 50MB)</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div>
                    <span className="text-[12.5px] font-bold text-slate-700 block">Enable Speed Controls</span>
                    <span className="text-[10px] text-slate-400">Allows users to adjust playback speed (0.5x - 2x)</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 8. Quote Block Form */}
            {blockConfigType === "quote" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">QUOTE TEXT</Label>
                  <Textarea value={quoteText} onChange={e => setQuoteText(e.target.value)} placeholder="Enter the wisdom you wish to share..." className="text-[13px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" rows={3} />
                </div>
                {quoteText && (
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-bold text-slate-500">BLOCK PREVIEW</Label>
                    <div className="p-4 border-l-4 border-[#6C1D5F] bg-slate-50/80 rounded-r-xl italic text-slate-600 text-xs">
                      "{quoteText}"
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 9. Divider Block Form */}
            {blockConfigType === "divider" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500 font-sans">Divider Settings</Label>
                  <div className="flex gap-2">
                    {["solid", "dashed", "dotted"].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setDividerStyle(style)}
                        className={`flex-1 py-2 text-[12px] font-bold rounded-xl border capitalize cursor-pointer ${
                          dividerStyle === style
                            ? "border-[#6C1D5F] bg-[#6C1D5F]/5 text-[#6C1D5F]"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl flex items-center justify-center">
                  <div className={`w-full h-0.5 bg-slate-300 ${
                    dividerStyle === "dashed" ? "border-t-2 border-dashed border-slate-300 bg-transparent h-0" :
                    dividerStyle === "dotted" ? "border-t-2 border-dotted border-slate-300 bg-transparent h-0" : ""
                  }`} />
                </div>
              </div>
            )}

            {/* 10. Callout Block Form */}
            {blockConfigType === "callout" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">CALLOUT MESSAGE</Label>
                  <Textarea value={textContent} onChange={e => setTextContent(e.target.value)} placeholder="Type your callout message here..." className="text-[13px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" rows={3} />
                </div>
                {textContent && (
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-bold text-slate-500">LIVE PREVIEW</Label>
                    <div className="p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-xs flex gap-2">
                      <span className="font-bold">Info</span>
                      <span>{textContent}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 11. File/Download Block Form */}
            {(blockConfigType === "file" || blockConfigType === "download") && (
              <div className="space-y-4 text-left">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">FILE URL</Label>
                  <Input value={downloadUrl} onChange={e => setDownloadUrl(e.target.value)} placeholder="https://example.com/file.pdf" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">OR UPLOAD FILE</Label>
                  {downloadUrl ? (
                    <div className="border border-emerald-200 rounded-xl p-3 bg-emerald-50/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-100 rounded-lg"><FileText size={14} className="text-emerald-700" /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[240px]">{downloadDisplayName || "file"}</p>
                          <p className="text-[10px] text-emerald-700 font-bold">Attached</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => { setDownloadUrl(""); setDownloadDisplayName(""); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="px-2.5 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-[10px] font-bold border border-slate-200 bg-white cursor-pointer">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 hover:border-[#6C1D5F] rounded-xl p-8 text-center hover:bg-slate-50/50 transition-all cursor-pointer">
                      <p className="text-xs font-bold text-slate-700">Drag and drop file here</p>
                      <p className="text-[10px] text-slate-400 mt-1">Max file size: 50MB. Supported formats: PDF, DOCX, ZIP, MP4.</p>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">DISPLAY NAME</Label>
                  <Input value={downloadDisplayName} onChange={e => setDownloadDisplayName(e.target.value)} placeholder="Add a brief name for this file..." className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 12. Link Block Form */}
            {blockConfigType === "link" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">LINK URL</Label>
                  <Input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://example.com" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">LINK TEXT</Label>
                  <Input value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="Display text for the link" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
              </div>
            )}

            {/* 13. Embed URL Block Form */}
            {blockConfigType === "embed" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">EXTERNAL RESOURCE URL</Label>
                  <Input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                  <p className="text-[10px] text-slate-400">Paste a link from YouTube, Vimeo, Loom, or other supported platforms</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px] font-bold text-slate-500">DISPLAY TITLE</Label>
                  <Input value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="e.g. Product Demo Video" className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]" />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["YOUTUBE", "VIMEO", "LOOM", "SOUNDCLOUD", "WHIMSICAL"].map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* 14. Quiz Block Form */}
            {blockConfigType === "quiz" && (
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between">
                  <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Quiz Questions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuizQuestions([...quizQuestions, { text: "", options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }] }])}
                    className="text-[11.5px] font-bold text-[#6C1D5F] border-[#6C1D5F]/20 hover:bg-[#6C1D5F]/5"
                  >
                    <Plus size={12} className="mr-1" /> Add Question
                  </Button>
                </div>

                {quizQuestions.length === 0 ? (
                  <div className="py-8 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <HelpCircle size={24} className="mx-auto mb-2 text-slate-300 pointer-events-none" />
                    <p className="text-xs font-semibold text-slate-500">No questions added yet</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Click "Add Question" above to start building your quiz</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                    {quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/30 relative space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400">QUESTION {qIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => setQuizQuestions(quizQuestions.filter((_, idx) => idx !== qIdx))}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="space-y-1.5">
                          <Input
                            value={q.text || ""}
                            onChange={e => {
                              const newQList = [...quizQuestions];
                              newQList[qIdx].text = e.target.value;
                              setQuizQuestions(newQList);
                            }}
                            placeholder="Type the question..."
                            className="text-[13px] h-9 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10.5px] font-semibold text-slate-500 font-sans">Options</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newQList = [...quizQuestions];
                                newQList[qIdx].options.push({ text: "", isCorrect: false });
                                setQuizQuestions(newQList);
                              }}
                              className="text-[10.5px] font-bold text-[#6C1D5F] hover:underline"
                            >
                              + Add Option
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            {q.options?.map((opt, oIdx) => (
                              <div key={oIdx} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={!!opt.isCorrect}
                                  onChange={e => {
                                    const newQList = [...quizQuestions];
                                    newQList[qIdx].options = newQList[qIdx].options.map((o, idx) => ({
                                      ...o,
                                      isCorrect: idx === oIdx ? e.target.checked : o.isCorrect
                                    }));
                                    setQuizQuestions(newQList);
                                  }}
                                  title="Mark as correct answer"
                                  className="w-4 h-4 rounded text-[#6C1D5F] focus:ring-[#6C1D5F]"
                                />
                                <Input
                                  value={opt.text || ""}
                                  onChange={e => {
                                    const newQList = [...quizQuestions];
                                    newQList[qIdx].options[oIdx].text = e.target.value;
                                    setQuizQuestions(newQList);
                                  }}
                                  placeholder={`Option ${oIdx + 1}`}
                                  className="text-[12px] h-8 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F] bg-white flex-1"
                                />
                                {q.options.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newQList = [...quizQuestions];
                                      newQList[qIdx].options = newQList[qIdx].options.filter((_, idx) => idx !== oIdx);
                                      setQuizQuestions(newQList);
                                    }}
                                    className="text-slate-400 hover:text-red-500 p-1 bg-transparent border-none outline-none cursor-pointer"
                                  >
                                    <X size={12} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 15. Assignment Block Form */}
            {blockConfigType === "assignment" && (
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="assignInstructions" className="text-[12px] font-bold text-slate-500">ASSIGNMENT INSTRUCTIONS</Label>
                  <Textarea
                    id="assignInstructions"
                    value={assignmentInstructions}
                    onChange={e => setAssignmentInstructions(e.target.value)}
                    placeholder="Provide clear instructions for the assignment..."
                    className="text-[13px] min-h-[120px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="assignDueDate" className="text-[12px] font-bold text-slate-500">DUE DATE (OPTIONAL)</Label>
                    <Input
                      id="assignDueDate"
                      type="date"
                      value={assignmentDueDate}
                      onChange={e => setAssignmentDueDate(e.target.value)}
                      className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="assignMaxScore" className="text-[12px] font-bold text-slate-500">MAX SCORE</Label>
                    <Input
                      id="assignMaxScore"
                      type="number"
                      value={assignmentMaxScore}
                      onChange={e => setAssignmentMaxScore(parseInt(e.target.value) || 0)}
                      className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="assignSubmissionType" className="text-[12px] font-bold text-slate-500">SUBMISSION TYPE</Label>
                  <select
                    id="assignSubmissionType"
                    value={assignmentSubmissionType}
                    onChange={e => setAssignmentSubmissionType(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[12px] focus:ring-1 focus:ring-[#6C1D5F]/30 text-slate-700 h-10 outline-none"
                  >
                    <option value="file">File Upload (PDF, ZIP, Word)</option>
                    <option value="text">Text Response / Written Answer</option>
                    <option value="link">URL Link Submission</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0 bg-slate-50/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setBlockConfigOpen(false)}
              className="text-[12.5px] font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSaveBlock(e)}
              disabled={submittingSubModule}
              className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer"
            >
              {submittingSubModule ? "Saving..." : "Save Block"}
            </Button>
          </footer>
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          COURSE SELECTION DIALOG
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent className="max-w-[560px] max-h-[85vh] rounded-2xl shadow-2xl bg-white border border-slate-200 p-0 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-[#6C1D5F]/8 flex items-center justify-center">
                <GraduationCap size={18} className="text-[#6C1D5F]" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Select or Create Course</h2>
                <p className="text-[11.5px] text-slate-400">Choose an existing course or start a new one</p>
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg mt-3.5">
              {[
                { id: "select", label: "Select Existing" },
                { id: "create", label: "Create New Course" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "create") {
                      setCourseDialogOpen(false);
                      navigate("/courses/create");
                    } else {
                      setCourseDialogTab(tab.id);
                    }
                  }}
                  className={`flex-1 py-1.5 text-[12px] font-bold rounded-md transition-all cursor-pointer ${
                    courseDialogTab === tab.id
                      ? "bg-white shadow-sm text-[#6C1D5F]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Select Existing */}
          {courseDialogTab === "select" && (
            <div className="flex flex-col flex-1 min-h-0">
              {/* Search */}
              <div className="px-5 py-3 border-b border-slate-100 shrink-0">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={e => setCourseSearch(e.target.value)}
                    placeholder="Search courses by name..."
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] outline-none focus:ring-1 focus:ring-[#6C1D5F]/30 focus:border-[#6C1D5F] transition-all"
                  />
                  {courseSearch && (
                    <button onClick={() => setCourseSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Course list */}
              <ScrollArea className="flex-1 min-h-0">
                <div className="p-3 space-y-1">
                  {loadingAllCourses ? (
                    [1, 2, 3, 4].map(i => (
                      <div key={i} className="animate-pulse flex items-center gap-3 px-3 py-3 rounded-xl">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                          <div className="h-2.5 bg-slate-50 rounded w-1/2" />
                        </div>
                      </div>
                    ))
                  ) : (() => {
                    const filtered = allCourses.filter(c =>
                      !courseSearch || c.title?.toLowerCase().includes(courseSearch.toLowerCase())
                    );
                    if (filtered.length === 0) return (
                      <EmptyState
                        size="sm"
                        icon={Search}
                        title="No courses found"
                        description={courseSearch ? `No results for "${courseSearch}"` : "Create your first course"}
                        primaryAction={{
                          label: "Create New Course",
                          onClick: () => {
                            setCourseDialogOpen(false);
                            navigate("/courses/create");
                          },
                        }}
                      />
                    );
                    return filtered.map(c => {
                      const isCurrent = c.id === Number(id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => !isCurrent && handleSelectCourse(c)}
                          disabled={isCurrent}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            isCurrent
                              ? "bg-[#6C1D5F]/5 border border-[#6C1D5F]/20 cursor-default"
                              : "hover:bg-slate-50 hover:shadow-sm border border-transparent cursor-pointer"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent ? "bg-[#6C1D5F]/10 text-[#6C1D5F]" : "bg-slate-100 text-slate-500"
                          }`}>
                            <BookOpen size={14} />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className={`text-[13px] font-semibold truncate ${isCurrent ? "text-[#6C1D5F]" : "text-slate-700"}`}>
                              {c.title}
                            </p>
                            {c.description && (
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                              c.status === "Published"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}>
                              {c.status || "Draft"}
                            </span>
                            {isCurrent && (
                              <span className="text-[9.5px] font-bold text-[#6C1D5F] bg-[#6C1D5F]/8 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                            {!isCurrent && (
                              <ChevronRight size={13} className="text-slate-300" />
                            )}
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>
              </ScrollArea>

              <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
                <span className="text-[11.5px] text-slate-400">
                  {allCourses.length} course{allCourses.length !== 1 ? "s" : ""} available
                </span>
                <button
                  onClick={() => {
                    setCourseDialogOpen(false);
                    navigate("/courses/create");
                  }}
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6C1D5F] hover:underline cursor-pointer"
                >
                  <Plus size={12} /> Create New
                </button>
              </div>
            </div>
          )}

          {/* Tab: Create New Course */}
          {courseDialogTab === "create" && (
            <form onSubmit={handleCreateAndSelectCourse} className="p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
              <div className="space-y-1.5">
                <Label htmlFor="newCourseTitle" className="text-[12px] font-semibold text-slate-500">
                  Course Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="newCourseTitle"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Advanced UX/UI Design Masterclass"
                  className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newCourseDescription" className="text-[12px] font-semibold text-slate-500">Description</Label>
                <Textarea
                  id="newCourseDescription"
                  value={newCourseDescription}
                  onChange={e => setNewCourseDescription(e.target.value)}
                  placeholder="Briefly describe what this course covers."
                  className="text-[13px] min-h-[85px] focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newCourseCategory" className="text-[12px] font-semibold text-slate-500">Category</Label>
                <Input
                  id="newCourseCategory"
                  value={newCourseCategory}
                  onChange={e => setNewCourseCategory(e.target.value)}
                  placeholder="e.g. Design, Development, Business"
                  className="text-[13px] h-10 focus:ring-1 focus:ring-[#6C1D5F]/40 focus:border-[#6C1D5F]"
                />
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button type="button" variant="outline" onClick={() => setCourseDialogOpen(false)} className="text-[12.5px] font-semibold cursor-pointer">Cancel</Button>
                <Button type="submit" disabled={creatingCourse} className="bg-[#6C1D5F] hover:bg-[#521347] text-white text-[12.5px] font-semibold px-6 shadow-sm cursor-pointer">
                  {creatingCourse ? "Creating..." : "Create Course"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════════════════════════
          DELETE CONFIRM
      ══════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-[14px] leading-tight">
                  Delete {deleteTarget.type === "module" ? "Module" : "Block"}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>
              {deleteTarget.type === "module" ? " and all its blocks?" : "?"}
            </p>
            <div className="flex justify-end gap-2.5 pt-1">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-[12px] font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl text-[12px] font-bold shadow-sm transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOAST NOTIFICATIONS
      ══════════════════════════════════════════════════════════ */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border animate-in slide-in-from-bottom-2 duration-300 ${
          toast.type === "error"
            ? "bg-red-50 border-red-200 text-red-700"
            : toast.type === "info"
            ? "bg-blue-50 border-blue-200 text-blue-700"
            : "bg-emerald-50 border-emerald-200 text-emerald-700"
        }`}>
          {toast.type === "error"
            ? <AlertCircle size={14} className="shrink-0" />
            : toast.type === "info"
            ? <HelpCircle size={14} className="shrink-0" />
            : <CheckCircle2 size={14} className="shrink-0" />
          }
          <span className="text-[13px] font-semibold">{toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-1 text-current opacity-50 hover:opacity-100 cursor-pointer">
            <X size={12} />
          </button>
        </div>
      )}
    </>
  );
}
