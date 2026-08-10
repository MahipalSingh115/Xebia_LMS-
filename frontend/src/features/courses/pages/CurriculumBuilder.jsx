import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Cloud,
  CheckCircle2,
  CloudOff,
  Eye,
  Save,
  X,
  ExternalLink,
  Heading1,
  AlignLeft,
  Quote,
  Minus,
  Video,
  FileImage,
  FileText,
  HelpCircle,
  CheckSquare,
  Download,
  Link2,
} from "lucide-react";
import useCurriculumBuilder from "@/features/courses/hooks/useCurriculumBuilder";
import CurriculumSidebar from "@/features/courses/components/curriculum/CurriculumSidebar";
import CurriculumEditor from "@/features/courses/components/curriculum/CurriculumEditor";
import CurriculumRightPanel from "@/features/courses/components/curriculum/CurriculumRightPanel";
import CurriculumDialogs from "@/features/courses/components/curriculum/CurriculumDialogs";

/* ─── Block Picker Config ──────────────────────────────────────── */
const BLOCK_CATEGORIES = [
  {
    label: "Basic",
    items: [
      { type: "heading", icon: Heading1, label: "Heading", desc: "Section title or heading text" },
      { type: "paragraph", icon: AlignLeft, label: "Paragraph", desc: "Rich text paragraph content" },
      { type: "quote", icon: Quote, label: "Quote", desc: "Blockquote or callout text" },
      { type: "divider", icon: Minus, label: "Divider", desc: "Visual separator between sections" },
    ],
  },
  {
    label: "Media",
    items: [
      { type: "video", icon: Video, label: "Video", desc: "Embed a YouTube, Vimeo, or direct video" },
      { type: "image", icon: FileImage, label: "Image", desc: "Upload or link an image" },
      { type: "pdf", icon: FileText, label: "PDF", desc: "Attach a PDF document or reading" },
      { type: "code", icon: AlignLeft, label: "Code", desc: "Syntax-highlighted code snippet" },
    ],
  },
  {
    label: "Assessment",
    items: [
      { type: "quiz", icon: HelpCircle, label: "Quiz", desc: "Add multiple-choice quiz questions" },
      { type: "assignment", icon: CheckSquare, label: "Assignment", desc: "Learner submission task" },
    ],
  },
  {
    label: "Resources",
    items: [
      { type: "download", icon: Download, label: "Download", desc: "File download for learners" },
      { type: "link", icon: Link2, label: "External Link", desc: "Link to an external resource" },
    ],
  },
];

export default function CurriculumBuilder() {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const {
    id,
    fromModuleManagement,
    course,
    modules,
    loadingCurriculum,
    expandedModules,
    setExpandedModules,
    activeSubModule,
    setActiveSubModule,
    treeSearch,
    setTreeSearch,
    showNavBanner,
    setShowNavBanner,
    saveStatus,
    activeRightTab,
    setActiveRightTab,
    selectedBlockType,
    setSelectedBlockType,
    blockPickerOpen,
    setBlockPickerOpen,
    blockSearch,
    setBlockSearch,
    toast,
    setToast,
    showToast,
    isModuleModalOpen,
    setIsModuleModalOpen,
    editingModule,
    moduleTitle,
    setModuleTitle,
    moduleDescription,
    setModuleDescription,
    submittingModule,
    isDrawerOpen,
    setIsDrawerOpen,
    editingSubModule,
    subModuleTitle,
    setSubModuleTitle,
    subModuleDescription,
    setSubModuleDescription,
    contentType,
    setContentType,
    videoUrl,
    setVideoUrl,
    pdfUrl,
    setPdfUrl,
    textContent,
    setTextContent,
    uploadedFileName,
    setUploadedFileName,
    submittingSubModule,
    videoUrlError,
    setVideoUrlError,
    showVideoPreview,
    setShowVideoPreview,
    pdfInputRef,
    deleteTarget,
    setDeleteTarget,
    courseDialogOpen,
    setCourseDialogOpen,
    allCourses,
    loadingAllCourses,
    courseSearch,
    setCourseSearch,
    courseDialogTab,
    setCourseDialogTab,
    newCourseTitle,
    setNewCourseTitle,
    newCourseDescription,
    setNewCourseDescription,
    newCourseCategory,
    setNewCourseCategory,
    creatingCourse,
    expandedSubModules,
    openCourseDialog,
    handleSelectCourse,
    handleCreateAndSelectCourse,
    toggleSubModuleExpand,
    openAddModuleModal,
    openEditModuleModal,
    handleSaveModule,
    openAddSubModuleDrawer,
    openEditSubModuleDrawer,
    handleSaveSubModule,
    requestDelete,
    confirmDelete,
    handlePublishCourse,
    handlePdfFileChange,
    handleVideoUrlChange,
    // Block config states and handlers
    blockConfigOpen,
    setBlockConfigOpen,
    blockConfigType,
    setBlockConfigType,
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
    openEditBlockDialog,
    handleSelectBlockType,
    handleSaveBlock,
    handleVideoFileChange,
    handleDuplicateCourse,
    handleDuplicateModule,
    handleDuplicateSubModule,
    handleMoveModule,
    handleMoveSubModule,
    // Quiz & Assignment state
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
    loadCurriculumData,
    activeBlock,
    setActiveBlock,
    editingBlock,
    setEditingBlock,
    handleDuplicateBlock,
    // Multi course props
    loadedCourses,
    activeCourseId,
    setActiveCourseId,
    expandedCourses,
    setExpandedCourses,
  } = useCurriculumBuilder();

  const activeCourse = loadedCourses.find(c => c.id === activeCourseId);
  const activeCourseModules = activeCourse?.modules || [];

  /* ── Block picker filter ── */
  const filteredBlockCategories = blockSearch.trim()
    ? BLOCK_CATEGORIES.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.label.toLowerCase().includes(blockSearch.toLowerCase()) ||
          item.desc.toLowerCase().includes(blockSearch.toLowerCase())
        ),
      })).filter(cat => cat.items.length > 0)
    : BLOCK_CATEGORIES;

  const parentModuleLabel = activeSubModule
    ? activeCourseModules.find(m => m.subModules?.find(s => s.id === activeSubModule.id))?.title
    : null;

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* ══════════════════════════════════════════════════════════
          STICKY TOP BAR
      ══════════════════════════════════════════════════════════ */}
      <header className="h-[54px] bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0 z-40 shadow-[0_1px_0_0_#e2e8f0]">
        {/* Left: back + breadcrumb */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => fromModuleManagement ? navigate("/module-management") : navigate("/courses")}
            className="flex items-center gap-1.5 text-slate-500 hover:text-[#6C1D5F] text-[12px] font-semibold transition-colors shrink-0 cursor-pointer animate-none bg-transparent border-none outline-none"
          >
            <ArrowLeft size={14} /> {fromModuleManagement ? "Module Management" : "Courses"}
          </button>

          <ChevronRight size={12} className="text-slate-300 shrink-0" />

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-400 min-w-0 truncate">
            {course && <span className="truncate max-w-[140px] hover:text-slate-600 cursor-default">{course.title}</span>}
            {parentModuleLabel && (
              <>
                <ChevronRight size={10} className="shrink-0" />
                <span className="truncate max-w-[130px] hover:text-slate-600 cursor-default">{parentModuleLabel}</span>
              </>
            )}
            {activeSubModule && (
              <>
                <ChevronRight size={10} className="shrink-0" />
                <span className="text-slate-800 font-semibold truncate max-w-[140px]">{activeSubModule.title}</span>
              </>
            )}
          </nav>
        </div>

        {/* Center: Save status */}
        <div className="flex items-center justify-center flex-shrink-0 px-4">
          {saveStatus === "saving" && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Cloud size={12} className="animate-pulse" /> Saving...
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
              <CheckCircle2 size={12} /> All changes saved
            </div>
          )}
          {saveStatus === "unsaved" && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-medium">
              <CloudOff size={12} /> Unsaved changes
            </div>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">
          {course && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              course.status === "Published"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {course.status || "Draft"}
            </span>
          )}

          <div className="w-px h-4 bg-slate-200" />

          <button
            onClick={() => course && navigate(`/courses/${course.id}/edit`)}
            disabled={!course}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-[#6C1D5F] hover:bg-slate-50 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer bg-transparent border-none outline-none disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Eye size={13} /> Preview
          </button>

          <button disabled={!course} className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer bg-transparent outline-none disabled:opacity-40 disabled:cursor-not-allowed">
            <Save size={13} /> Save Draft
          </button>

          <button
            onClick={handlePublishCourse}
            disabled={!course || course?.status === "Published"}
            className="px-4 py-1.5 bg-[#6C1D5F] text-white hover:bg-[#521347] disabled:bg-slate-200 disabled:text-slate-400 rounded-lg text-[12px] font-bold shadow-sm shadow-[#6C1D5F]/20 transition-all cursor-pointer disabled:cursor-not-allowed border-none outline-none"
          >
            {course?.status === "Published" ? "Published ✓" : "Publish"}
          </button>
        </div>
      </header>

      {/* Nav Banner */}
      {showNavBanner && (
        <div className="shrink-0 bg-[#6C1D5F]/5 border-b border-[#6C1D5F]/15 px-5 py-2 flex items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-2 text-[11.5px] text-[#6C1D5F] font-medium">
            <ExternalLink size={11} className="shrink-0" />
            <span>
              Navigated from <strong>Module Management</strong>.
              {activeSubModule
                ? <> Block <strong>"{activeSubModule.title}"</strong> is pre-selected.</>
                : " Select a block from the tree to begin editing."
              }
            </span>
          </div>
          <button onClick={() => setShowNavBanner(false)} className="text-[#6C1D5F]/50 hover:text-[#6C1D5F] transition-colors cursor-pointer bg-transparent border-none outline-none">
            <X size={12} />
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          3-COLUMN LAYOUT
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">
        <CurriculumSidebar
          loadingCurriculum={loadingCurriculum}
          treeSearch={treeSearch}
          setTreeSearch={setTreeSearch}
          expandedModules={expandedModules}
          setExpandedModules={setExpandedModules}
          activeSubModule={activeSubModule}
          setActiveSubModule={setActiveSubModule}
          expandedSubModules={expandedSubModules}
          toggleSubModuleExpand={toggleSubModuleExpand}
          openAddModuleModal={openAddModuleModal}
          openEditModuleModal={openEditModuleModal}
          openAddSubModuleDrawer={openAddSubModuleDrawer}
          openEditSubModuleDrawer={openEditSubModuleDrawer}
          openEditBlockDialog={openEditBlockDialog}
          requestDelete={requestDelete}
          openCourseDialog={openCourseDialog}
          loadedCourses={loadedCourses}
          activeCourseId={activeCourseId}
          setActiveCourseId={setActiveCourseId}
          expandedCourses={expandedCourses}
          setExpandedCourses={setExpandedCourses}
          handleDuplicateCourse={handleDuplicateCourse}
          handleDuplicateModule={handleDuplicateModule}
          handleDuplicateSubModule={handleDuplicateSubModule}
          handleDuplicateBlock={handleDuplicateBlock}
          handleMoveModule={handleMoveModule}
          handleMoveSubModule={handleMoveSubModule}
          loadCurriculumData={loadCurriculumData}
        />

        <CurriculumEditor
          activeSubModule={activeSubModule}
          parentModuleLabel={parentModuleLabel}
          modules={activeCourseModules}
          editorRef={editorRef}
          setBlockPickerOpen={setBlockPickerOpen}
          setBlockSearch={setBlockSearch}
          openEditSubModuleDrawer={openEditSubModuleDrawer}
          openEditBlockDialog={openEditBlockDialog}
          requestDelete={requestDelete}
          handlePublishCourse={handlePublishCourse}
          course={course}
          openAddModuleModal={openAddModuleModal}
          openCourseDialog={openCourseDialog}
        />

        {course && (
          <CurriculumRightPanel
            activeSubModule={activeSubModule}
            activeRightTab={activeRightTab}
            setActiveRightTab={setActiveRightTab}
            openEditSubModuleDrawer={openEditSubModuleDrawer}
            openEditBlockDialog={openEditBlockDialog}
            requestDelete={requestDelete}
            openAddModuleModal={openAddModuleModal}
            activeBlock={activeBlock}
          />
        )}
      </div>

      <CurriculumDialogs
        blockPickerOpen={blockPickerOpen}
        setBlockPickerOpen={setBlockPickerOpen}
        blockSearch={blockSearch}
        setBlockSearch={setBlockSearch}
        filteredBlockCategories={filteredBlockCategories}
        selectedBlockType={selectedBlockType}
        setSelectedBlockType={setSelectedBlockType}
        openAddSubModuleDrawer={openAddSubModuleDrawer}
        // Block config dialog states & handlers
        blockConfigOpen={blockConfigOpen}
        setBlockConfigOpen={setBlockConfigOpen}
        blockConfigType={blockConfigType}
        setBlockConfigType={setBlockConfigType}
        handleSelectBlockType={handleSelectBlockType}
        handleSaveBlock={handleSaveBlock}
        modules={modules}
        activeSubModule={activeSubModule}
        showToast={showToast}
        // Block extra fields
        headingText={headingText}
        setHeadingText={setHeadingText}
        quoteText={quoteText}
        setQuoteText={setQuoteText}
        dividerStyle={dividerStyle}
        setDividerStyle={setDividerStyle}
        imageAlt={imageAlt}
        setImageAlt={setImageAlt}
        imageCaption={imageCaption}
        setImageCaption={setImageCaption}
        codeContent={codeContent}
        setCodeContent={setCodeContent}
        codeLanguage={codeLanguage}
        setCodeLanguage={setCodeLanguage}
        downloadUrl={downloadUrl}
        setDownloadUrl={setDownloadUrl}
        downloadDisplayName={downloadDisplayName}
        setDownloadDisplayName={setDownloadDisplayName}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        linkText={linkText}
        setLinkText={setLinkText}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
        assignmentInstructions={assignmentInstructions}
        setAssignmentInstructions={setAssignmentInstructions}
        assignmentDueDate={assignmentDueDate}
        setAssignmentDueDate={setAssignmentDueDate}
        assignmentSubmissionType={assignmentSubmissionType}
        setAssignmentSubmissionType={setAssignmentSubmissionType}
        assignmentMaxScore={assignmentMaxScore}
        setAssignmentMaxScore={setAssignmentMaxScore}
        isModuleModalOpen={isModuleModalOpen}
        setIsModuleModalOpen={setIsModuleModalOpen}
        editingModule={editingModule}
        moduleTitle={moduleTitle}
        setModuleTitle={setModuleTitle}
        moduleDescription={moduleDescription}
        setModuleDescription={setModuleDescription}
        submittingModule={submittingModule}
        handleSaveModule={handleSaveModule}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        editingSubModule={editingSubModule}
        subModuleTitle={subModuleTitle}
        setSubModuleTitle={setSubModuleTitle}
        subModuleDescription={subModuleDescription}
        setSubModuleDescription={setSubModuleDescription}
        contentType={contentType}
        setContentType={setContentType}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        videoUrlError={videoUrlError}
        setVideoUrlError={setVideoUrlError}
        showVideoPreview={showVideoPreview}
        setShowVideoPreview={setShowVideoPreview}
        handleVideoUrlChange={handleVideoUrlChange}
        pdfUrl={pdfUrl}
        setPdfUrl={setPdfUrl}
        pdfInputRef={pdfInputRef}
        handlePdfFileChange={handlePdfFileChange}
        uploadedFileName={uploadedFileName}
        setUploadedFileName={setUploadedFileName}
        textContent={textContent}
        setTextContent={setTextContent}
        submittingSubModule={submittingSubModule}
        handleSaveSubModule={handleSaveSubModule}
        courseDialogOpen={courseDialogOpen}
        setCourseDialogOpen={setCourseDialogOpen}
        courseDialogTab={courseDialogTab}
        setCourseDialogTab={setCourseDialogTab}
        courseSearch={courseSearch}
        setCourseSearch={setCourseSearch}
        allCourses={allCourses}
        loadingAllCourses={loadingAllCourses}
        id={id}
        handleSelectCourse={handleSelectCourse}
        newCourseTitle={newCourseTitle}
        setNewCourseTitle={setNewCourseTitle}
        newCourseDescription={newCourseDescription}
        setNewCourseDescription={setNewCourseDescription}
        newCourseCategory={newCourseCategory}
        setNewCourseCategory={setNewCourseCategory}
        creatingCourse={creatingCourse}
        handleCreateAndSelectCourse={handleCreateAndSelectCourse}
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        confirmDelete={confirmDelete}
        toast={toast}
        setToast={setToast}
      />
    </div>
  );
}
