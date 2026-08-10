import { Loader2 } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import useContentLibrary from "@/features/content/hooks/useContentLibrary";
import ContentLibraryHeader from "@/features/content/components/ContentLibraryHeader";
import ContentLibraryGrid from "@/features/content/components/ContentLibraryGrid";
import ContentLibraryModal from "@/features/content/components/ContentLibraryModal";

export default function ContentLibrary() {
  const {
    contents,
    submodules,
    modules,
    courses,
    loading,
    toast,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedModuleId,
    setSelectedModuleId,
    selectedCourseId,
    setSelectedCourseId,
    selected,
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
    getContentItemType,
    filteredContents,
    handleToggleSelect,
    handleToggleAll,
    handleOpenModal,
    handleSubmitForm: handleSaveContent,
    handleDeleteSingle: handleDeleteContent,
    handleDeleteBulk: handleBulkDelete,
  } = useContentLibrary();

  // Convert Set to Array for length checking
  const selectedList = Array.from(selected);

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        
        <ContentLibraryHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedModuleId={selectedModuleId}
          setSelectedModuleId={setSelectedModuleId}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          courses={courses}
          modules={modules}
          handleOpenModal={handleOpenModal}
          handleBulkDelete={handleBulkDelete}
          selectedCount={selectedList.length}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-400">
            <Loader2 className="animate-spin text-[#6C1D5F] mb-3" size={28} />
            <p className="text-[13px] font-semibold">Loading content items...</p>
          </div>
        ) : (
          <ContentLibraryGrid
            contents={contents}
            filteredContents={filteredContents}
            selected={selectedList}
            handleToggleSelect={handleToggleSelect}
            handleToggleAll={handleToggleAll}
            getContentItemType={getContentItemType}
            handleOpenModal={handleOpenModal}
            handleDeleteContent={handleDeleteContent}
            submodules={submodules}
          />
        )}

        <ContentLibraryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingContent={editingContent}
          contentTitle={contentTitle}
          setContentTitle={setContentTitle}
          contentBody={contentBody}
          setContentBody={setContentBody}
          contentType={contentType}
          setContentType={setContentType}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          pdfUrl={pdfUrl}
          setPdfUrl={setPdfUrl}
          targetSubModuleId={targetSubModuleId}
          setTargetSubModuleId={setTargetSubModuleId}
          submodules={submodules}
          handleSaveContent={handleSaveContent}
        />

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-[slideIn_0.3s_ease-out] ${
            toast.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            <span className={`w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"} flex-shrink-0 animate-pulse`} />
            <span className="text-[13px] font-semibold">{toast.message}</span>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
