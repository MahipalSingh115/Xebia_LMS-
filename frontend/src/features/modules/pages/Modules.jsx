import React, { useState } from "react";
import { Loader2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import useModules from "@/features/modules/hooks/useModules";
import ModulesHeader from "@/features/modules/components/ModulesHeader";
import ModulesPane from "@/features/modules/components/ModulesPane";
import SubModulesPane from "@/features/submodules/components/SubModulesPane";
import ModulesDialogs from "@/features/modules/components/ModulesDialogs";
import EmptyState from "@/shared/components/EmptyState";

export default function Modules() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    loading,
    toast,
    modules,
    submodules,
    activeModuleId,
    setActiveModuleId,
    cbDialogTarget,
    setCbDialogTarget,
    isModuleModalOpen,
    setIsModuleModalOpen,
    editingModule,
    moduleTitle,
    setModuleTitle,
    moduleDescription,
    setModuleDescription,
    isSubModuleModalOpen,
    setIsSubModuleModalOpen,
    editingSubModule,
    subModuleTitle,
    setSubModuleTitle,
    subModuleDescription,
    setSubModuleDescription,
    activeModule,
    activeSubModules,
    handleOpenModuleModal,
    handleSaveModule,
    handleDeleteModule,
    handleOpenSubModuleModal,
    handleSaveSubModule,
    handleDeleteSubModule,
    openContentLibraryDialog,
    handleConfirmOpenContentLibrary,
  } = useModules();

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        <ModulesHeader
          courses={courses}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-xl p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin text-[#6C1D5F] mb-3" size={32} />
            <p className="text-[13px] font-medium">Loading curriculum data...</p>
          </div>
        ) : !selectedCourseId ? (
          <EmptyState
            icon={BookOpen}
            title="No Course Selected"
            description="Select an existing course or create a new one to start managing modules and curriculum."
            primaryAction={{
              label: "Select Course",
              onClick: () => setIsDropdownOpen(true),
            }}
            secondaryAction={{
              label: "Create New Course",
              onClick: () => navigate("/courses/create"),
            }}
          />
        ) : (
          <div className="grid grid-cols-12 gap-6 items-start">
            
            <ModulesPane
              modules={modules}
              submodules={submodules}
              activeModuleId={activeModuleId}
              setActiveModuleId={setActiveModuleId}
              selectedCourseId={selectedCourseId}
              handleOpenModuleModal={handleOpenModuleModal}
              handleDeleteModule={handleDeleteModule}
            />

            <SubModulesPane
              activeModule={activeModule}
              activeSubModules={activeSubModules}
              openContentLibraryDialog={openContentLibraryDialog}
              handleOpenSubModuleModal={handleOpenSubModuleModal}
              handleDeleteSubModule={handleDeleteSubModule}
            />

          </div>
        )}

      </div>

      <ModulesDialogs
        isModuleModalOpen={isModuleModalOpen}
        setIsModuleModalOpen={setIsModuleModalOpen}
        editingModule={editingModule}
        moduleTitle={moduleTitle}
        setModuleTitle={setModuleTitle}
        moduleDescription={moduleDescription}
        setModuleDescription={setModuleDescription}
        handleSaveModule={handleSaveModule}
        isSubModuleModalOpen={isSubModuleModalOpen}
        setIsSubModuleModalOpen={setIsSubModuleModalOpen}
        editingSubModule={editingSubModule}
        subModuleTitle={subModuleTitle}
        setSubModuleTitle={setSubModuleTitle}
        subModuleDescription={subModuleDescription}
        setSubModuleDescription={setSubModuleDescription}
        handleSaveSubModule={handleSaveSubModule}
        cbDialogTarget={cbDialogTarget}
        setCbDialogTarget={setCbDialogTarget}
        selectedCourseId={selectedCourseId}
        handleConfirmOpenContentLibrary={handleConfirmOpenContentLibrary}
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

    </AppLayout>
  );
}
