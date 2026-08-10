import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import courseService from "@/features/courses/services/courseService";
import moduleService from "@/features/modules/services/moduleService";
import subModuleService from "@/features/submodules/services/subModuleService";

export default function useModules() {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Curriculum Data
  const [modules, setModules] = useState([]);
  const [submodules, setSubmodules] = useState([]);
  const [activeModuleId, setActiveModuleId] = useState(null);

  // Content Library confirmation dialog
  const [cbDialogTarget, setCbDialogTarget] = useState(null); // { subModuleId?, label }

  // Modals state
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");

  const [isSubModuleModalOpen, setIsSubModuleModalOpen] = useState(false);
  const [editingSubModule, setEditingSubModule] = useState(null);
  const [subModuleTitle, setSubModuleTitle] = useState("");
  const [subModuleDescription, setSubModuleDescription] = useState("");

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  async function loadCourses() {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data || []);

      // Check if courseId is passed through navigation state or search params
      const stateCourseId = location.state?.courseId || location.state?.selectedCourseId || location.state?.id;
      
      const searchParams = new URLSearchParams(location.search);
      const queryCourseId = searchParams.get("courseId") || searchParams.get("id");
      
      const targetCourseId = stateCourseId || queryCourseId;

      if (targetCourseId) {
        const idStr = String(targetCourseId);
        setSelectedCourseId(idStr);
        loadCurriculum(idStr);
      } else {
        setSelectedCourseId("");
        loadCurriculum("");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load courses.", "error");
    }
  }

  async function loadCurriculum(courseId) {
    const targetCourseId = courseId !== undefined ? courseId : selectedCourseId;
    if (!targetCourseId) {
      setModules([]);
      setSubmodules([]);
      setActiveModuleId(null);
      return;
    }
    setLoading(true);
    try {
      const [allModules, allSubModules] = await Promise.all([
        moduleService.getAllModules(),
        subModuleService.getAllSubModules(),
      ]);

      // Filter modules for selected course
      const filteredModules = allModules.filter(
        (m) => m.courseId === Number(targetCourseId)
      );
      setModules(filteredModules);
      setSubmodules(allSubModules);

      if (filteredModules.length > 0) {
        if (activeModuleId && filteredModules.some((m) => m.id === activeModuleId)) {
          // Keep active module
        } else {
          setActiveModuleId(filteredModules[0].id);
        }
      } else {
        setActiveModuleId(null);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load curriculum data.", "error");
    } finally {
      setLoading(false);
    }
  }

  const handleCourseSelect = (val) => {
    setSelectedCourseId(val);
    loadCurriculum(val);
  };

  const activeModule = modules.find((m) => m.id === activeModuleId);
  const activeSubModules = submodules.filter((sm) => sm.moduleId === activeModuleId);

  // Module Actions
  const handleOpenModuleModal = (mod = null) => {
    if (mod) {
      setEditingModule(mod);
      setModuleTitle(mod.title);
      setModuleDescription(mod.description || "");
    } else {
      setEditingModule(null);
      setModuleTitle("");
      setModuleDescription("");
    }
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    try {
      const payload = {
        title: moduleTitle,
        description: moduleDescription,
        courseId: Number(selectedCourseId),
      };

      if (editingModule) {
        await moduleService.updateModule(editingModule.id, payload);
        showToast("Module updated successfully.", "success");
      } else {
        const newMod = await moduleService.createModule(payload);
        showToast("Module created successfully.", "success");
        if (!activeModuleId) {
          setActiveModuleId(newMod.id);
        }
      }
      setIsModuleModalOpen(false);
      loadCurriculum();
    } catch (err) {
      console.error(err);
      showToast("Failed to save module.", "error");
    }
  };

  const handleDeleteModule = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module and all its submodules?")) return;

    try {
      await moduleService.deleteModule(id);
      showToast("Module deleted successfully.", "success");
      if (activeModuleId === id) {
        setActiveModuleId(null);
      }
      loadCurriculum();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete module.", "error");
    }
  };

  // SubModule Actions
  const handleOpenSubModuleModal = (subMod = null) => {
    if (subMod) {
      setEditingSubModule(subMod);
      setSubModuleTitle(subMod.title);
      setSubModuleDescription(subMod.description || "");
    } else {
      setEditingSubModule(null);
      setSubModuleTitle("");
      setSubModuleDescription("");
    }
    setIsSubModuleModalOpen(true);
  };

  const handleSaveSubModule = async (e) => {
    e.preventDefault();
    if (!subModuleTitle.trim() || !activeModuleId) return;

    try {
      const payload = {
        title: subModuleTitle,
        description: subModuleDescription,
        moduleId: activeModuleId,
      };

      if (editingSubModule) {
        await subModuleService.updateSubModule(editingSubModule.id, payload);
        showToast("Submodule updated successfully.", "success");
      } else {
        await subModuleService.createSubModule(payload);
        showToast("Submodule created successfully.", "success");
      }
      setIsSubModuleModalOpen(false);
      loadCurriculum();
    } catch (err) {
      console.error(err);
      showToast("Failed to save submodule.", "error");
    }
  };

  const handleDeleteSubModule = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submodule?")) return;

    try {
      await subModuleService.deleteSubModule(id);
      showToast("Submodule deleted successfully.", "success");
      loadCurriculum();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete submodule.", "error");
    }
  };

  // Content Library navigation
  const openContentLibraryDialog = (subModuleId = null, label = null) => {
    setCbDialogTarget({ subModuleId, label });
  };

  const handleConfirmOpenContentLibrary = () => {
    if (!selectedCourseId) return;
    // Navigate to the curriculum builder for this course
    // Pass state so CurriculumBuilder can pre-select the right module/submodule
    navigate(`/courses/${selectedCourseId}/curriculum`, {
      state: {
        fromModuleManagement: true,
        preselectedModuleId: activeModuleId,
        preselectedSubModuleId: cbDialogTarget?.subModuleId ?? null,
      },
    });
    setCbDialogTarget(null);
  };

  return {
    navigate,
    courses,
    selectedCourseId,
    setSelectedCourseId: handleCourseSelect,
    loading,
    toast,
    setToast,
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
    loadCurriculum,
    loadCourses,
  };
}
