import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import courseService from "@/features/courses/services/courseService";
import moduleService from "@/features/modules/services/moduleService";
import subModuleService from "@/features/submodules/services/subModuleService";
import contentService from "@/features/content/services/contentService";
import categoryService from "@/features/categories/services/categoryService";

export default function useCurriculumBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* ── Navigation state from Module Management ── */
  const navState = location.state ?? {};
  const { fromModuleManagement, preselectedModuleId, preselectedSubModuleId } = navState;

  /* ── Course & Curriculum ── */
  const [loadingCourse, setLoadingCourse] = useState(!!id);
  const [loadingCurriculum, setLoadingCurriculum] = useState(!!id);

  /* ── Multi-Course State ── */
  const [loadedCourses, setLoadedCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState(null);

  const changeLoadedCourses = (val) => {
    setLoadedCourses(prev => {
      const nextCourses = typeof val === "function" ? val(prev) : val;
      if (nextCourses && nextCourses.length > 0) {
        const ids = nextCourses.map(c => c.id);
        localStorage.setItem("curriculum_builder_loaded_course_ids", JSON.stringify(ids));
      } else {
        localStorage.removeItem("curriculum_builder_loaded_course_ids");
      }
      return nextCourses;
    });
  };

  const changeActiveCourseId = (val) => {
    setActiveCourseId(prev => {
      const nextId = typeof val === "function" ? val(prev) : val;
      if (nextId !== null && nextId !== undefined) {
        localStorage.setItem("curriculum_builder_active_course_id", String(nextId));
      } else {
        localStorage.removeItem("curriculum_builder_active_course_id");
      }
      return nextId;
    });
  };

  const course = loadedCourses.find(c => c.id === activeCourseId) || null;
  const modules = course?.modules || [];
  const [expandedCourses, setExpandedCourses] = useState({});
  const [targetCourseId, setTargetCourseId] = useState(null);

  /* ── UI State ── */
  const [expandedModules, setExpandedModules] = useState({});
  const [activeSubModule, setActiveSubModule] = useState(null);
  const [activeBlock, setActiveBlock] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);
  const [treeSearch, setTreeSearch] = useState("");
  const [showNavBanner, setShowNavBanner] = useState(!!fromModuleManagement);
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "saving" | "unsaved"
  const [activeRightTab, setActiveRightTab] = useState("submodule"); // "submodule" | "block"
  const [selectedBlockType, setSelectedBlockType] = useState(null);
  const [blockPickerOpen, setBlockPickerOpen] = useState(false);
  const [blockSearch, setBlockSearch] = useState("");
  const [blockConfigOpen, setBlockConfigOpen] = useState(false);
  const [blockConfigType, setBlockConfigType] = useState("video");

  /* ── Block Extra Fields ── */
  const [headingText, setHeadingText] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [dividerStyle, setDividerStyle] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadDisplayName, setDownloadDisplayName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  /* ── Notification ── */
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  /* ── Module modal ── */
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [submittingModule, setSubmittingModule] = useState(false);

  /* ── SubModule dialog ── */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSubModule, setEditingSubModule] = useState(null);
  const [parentModuleId, setParentModuleId] = useState(null);
  const [subModuleTitle, setSubModuleTitle] = useState("");
  const [subModuleDescription, setSubModuleDescription] = useState("");
  const [contentType, setContentType] = useState("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [submittingSubModule, setSubmittingSubModule] = useState(false);
  const [videoUrlError, setVideoUrlError] = useState("");
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  /* ── Delete ── */
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ── Course Selector Dialog ── */
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [loadingAllCourses, setLoadingAllCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseDialogTab, setCourseDialogTab] = useState("select"); // "select" | "create"
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("");
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [expandedSubModules, setExpandedSubModules] = useState({});

  const loadAllCourses = async () => {
    setLoadingAllCourses(true);
    try {
      const data = await courseService.getAllCourses();
      setAllCourses(data || []);
    } catch (err) {
      console.error(err);
      showToast("Could not load courses.", "error");
    } finally {
      setLoadingAllCourses(false);
    }
  };

  const openCourseDialog = (tab = "select") => {
    if (tab === "create") {
      setCourseDialogOpen(false);
      navigate("/courses/create");
      return;
    }
    setCourseSearch("");
    setCourseDialogTab(tab);
    setNewCourseTitle("");
    setNewCourseDescription("");
    setNewCourseCategory("");
    setCourseDialogOpen(true);
    loadAllCourses();
  };

  const handleSelectCourse = async (selectedCourse) => {
    setCourseDialogOpen(false);

    // Prevent duplicate courses from being added
    const alreadyExists = loadedCourses.some(c => c.id === selectedCourse.id);
    if (alreadyExists) {
      // Focus and expand that course instead of adding it again
      changeActiveCourseId(selectedCourse.id);
      setExpandedCourses(prev => ({ ...prev, [selectedCourse.id]: true }));

      const existingCourse = loadedCourses.find(c => c.id === selectedCourse.id);
      if (existingCourse && existingCourse.modules?.[0]?.subModules?.[0]) {
        setActiveSubModule(existingCourse.modules[0].subModules[0]);
      }
      showToast(`Switched to "${selectedCourse.title}"`);
      return;
    }

    setLoadingCurriculum(true);
    try {
      const courseModules = await loadCurriculumForCourse(selectedCourse.id);
      const newCourseObj = {
        ...selectedCourse,
        modules: courseModules,
      };

      changeLoadedCourses(prev => [...prev, newCourseObj]);
      changeActiveCourseId(selectedCourse.id);
      setExpandedCourses(prev => ({ ...prev, [selectedCourse.id]: true }));

      const expandMap = {};
      courseModules.forEach(m => { expandMap[m.id] = true; });
      setExpandedModules(prev => ({ ...expandMap, ...prev }));

      if (courseModules[0]?.subModules?.[0]) {
        setActiveSubModule(courseModules[0].subModules[0]);
      }
      showToast(`Course "${selectedCourse.title}" loaded!`);
    } catch (err) {
      console.error(err);
      showToast("Failed to load selected course curriculum.", "error");
    } finally {
      setLoadingCurriculum(false);
    }
  };

  const handleCreateAndSelectCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) { showToast("Course title is required.", "error"); return; }
    if (!newCourseCategory.trim()) { showToast("Category is required.", "error"); return; }
    setCreatingCourse(true);
    try {
      // 1. Fetch categories to check if the entered category exists
      const categories = await categoryService.getAllCategories();
      let matchedCategory = categories?.find(
        c => c.name.toLowerCase() === newCourseCategory.trim().toLowerCase()
      );

      let targetCategoryId;
      if (matchedCategory) {
        targetCategoryId = matchedCategory.id;
      } else {
        // 2. Create the category if it doesn't exist
        const fd = new FormData();
        fd.append("name", newCourseCategory.trim());
        fd.append("description", `Automatically created category for course ${newCourseTitle.trim()}`);
        fd.append("publishState", "Published");
        fd.append("status", "Active");

        const slug = newCourseCategory.trim().toLowerCase()
          .replace(/[^a-z0-9 ]/g, '')
          .replace(/\s+/g, '-');
        fd.append("slug", slug);

        const newCat = await categoryService.createCategory(fd);
        targetCategoryId = newCat.id;
      }

      // 3. Create the course with the resolved categoryId
      const created = await courseService.createCourse({
        title: newCourseTitle.trim(),
        description: newCourseDescription.trim(),
        categoryId: targetCategoryId,
        status: "Draft",
      });
      showToast("Course created!");
      setCourseDialogOpen(false);
      await handleSelectCourse(created);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to create course.", "error");
    } finally {
      setCreatingCourse(false);
    }
  };

  const toggleSubModuleExpand = (subId) =>
    setExpandedSubModules(p => ({ ...p, [subId]: !p[subId] }));

  /* ── Quiz & Assignment State ── */
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [assignmentInstructions, setAssignmentInstructions] = useState("");
  const [assignmentDueDate, setAssignmentDueDate] = useState("");
  const [assignmentSubmissionType, setAssignmentSubmissionType] = useState("file");
  const [assignmentMaxScore, setAssignmentMaxScore] = useState(100);

  /* ── Load Modules for Course Helper ── */
  const loadCurriculumForCourse = async (courseId) => {
    const courseModules = await moduleService.getModulesByCourseId(courseId);
    const sortedModules = [...(courseModules || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    
    return Promise.all(sortedModules.map(async (mod) => {
      const subModules = await subModuleService.getSubModulesByModuleId(mod.id);
      const sortedSubModules = [...(subModules || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      
      const mappedSubModules = await Promise.all(sortedSubModules.map(async (sm) => {
        const blocks = await contentService.getContentsBySubModuleId(sm.id);
        const sortedBlocks = [...(blocks || [])].sort((a, b) => a.id - b.id);
        return {
          ...sm,
          blocks: sortedBlocks,
          content: sortedBlocks[0] || null
        };
      }));
      
      return {
        ...mod,
        subModules: mappedSubModules
      };
    }));
  };

  const reloadAllLoadedCourses = async (coursesListToReload = loadedCourses) => {
    setLoadingCurriculum(true);
    try {
      const updatedCourses = await Promise.all(
        coursesListToReload.map(async (c) => {
          const courseData = await courseService.getCourseById(c.id);
          const modulesData = await loadCurriculumForCourse(c.id);
          return {
            ...courseData,
            modules: modulesData,
          };
        })
      );

      changeLoadedCourses(updatedCourses);

      if (activeSubModule) {
        const nextCourse = updatedCourses.find(c => c.id === activeCourseId);
        const nextSubModule = nextCourse?.modules
          ?.flatMap(m => m.subModules || [])
          ?.find(sm => sm.id === activeSubModule.id);
        if (nextSubModule) {
          setActiveSubModule(nextSubModule);
          if (activeBlock) {
            const nextBlock = nextSubModule.blocks?.find(b => b.id === activeBlock.id);
            setActiveBlock(nextBlock || null);
          }
        } else {
          setActiveSubModule(null);
          setActiveBlock(null);
        }
      }

      const expandMap = {};
      updatedCourses.forEach(c => {
        c.modules.forEach(m => {
          if (expandedModules[m.id] === undefined) {
            expandMap[m.id] = true;
          }
        });
      });
      setExpandedModules(prev => ({ ...expandMap, ...prev }));
    } catch (err) {
      console.error(err);
      showToast("Could not reload curriculum data.", "error");
    } finally {
      setLoadingCurriculum(false);
    }
  };

  /* ── Data Loading & Persistence ── */
  useEffect(() => {
    const initLoad = async () => {
      setLoadingCourse(true);
      setLoadingCurriculum(true);
      try {
        let savedIds = [];
        try {
          const savedIdsStr = localStorage.getItem("curriculum_builder_loaded_course_ids");
          if (savedIdsStr) {
            savedIds = JSON.parse(savedIdsStr);
          }
        } catch (err) {
          console.error("Failed to parse saved loaded course IDs:", err);
        }

        // If id is in useParams(), ensure it is in the loaded list
        if (id) {
          const numericId = Number(id);
          if (!savedIds.includes(numericId)) {
            savedIds = [...savedIds, numericId];
          }
        }

        if (savedIds.length === 0) {
          changeLoadedCourses([]);
          changeActiveCourseId(null);
          setLoadingCourse(false);
          setLoadingCurriculum(false);
          return;
        }

        const coursesData = await Promise.all(
          savedIds.map(async (courseId) => {
            try {
              const courseData = await courseService.getCourseById(courseId);
              const courseModules = await loadCurriculumForCourse(courseId);
              return {
                ...courseData,
                modules: courseModules,
              };
            } catch (err) {
              console.error(`Failed to load course ${courseId}:`, err);
              return null;
            }
          })
        );

        const validCourses = coursesData.filter(Boolean);
        changeLoadedCourses(validCourses);

        const expandMap = {};
        validCourses.forEach(c => {
          c.modules.forEach(m => {
            expandMap[m.id] = true;
          });
        });
        setExpandedModules(prev => ({ ...expandMap, ...prev }));

        // Resolve active course ID
        let resolvedActiveId = null;
        if (id) {
          resolvedActiveId = Number(id);
        } else {
          const savedActiveIdStr = localStorage.getItem("curriculum_builder_active_course_id");
          if (savedActiveIdStr) {
            const savedActiveId = Number(savedActiveIdStr);
            if (validCourses.some(c => c.id === savedActiveId)) {
              resolvedActiveId = savedActiveId;
            }
          }
          if (resolvedActiveId === null && validCourses.length > 0) {
            resolvedActiveId = validCourses[0].id;
          }
        }

        if (resolvedActiveId) {
          changeActiveCourseId(resolvedActiveId);
          setExpandedCourses(prev => ({ ...prev, [resolvedActiveId]: true }));

          const activeCourseObj = validCourses.find(c => c.id === resolvedActiveId);
          if (activeCourseObj) {
            const activeCourseModules = activeCourseObj.modules || [];

            // Only perform pre-selection if id was matched in useParams()
            if (id) {
              if (preselectedSubModuleId) {
                const flat = activeCourseModules.flatMap(m => m.subModules || []);
                const t = flat.find(s => s.id === preselectedSubModuleId);
                if (t) { setActiveSubModule(t); setLoadingCourse(false); setLoadingCurriculum(false); return; }
              }
              if (preselectedModuleId) {
                const tm = activeCourseModules.find(m => m.id === preselectedModuleId);
                if (tm?.subModules?.[0]) { setActiveSubModule(tm.subModules[0]); setLoadingCourse(false); setLoadingCurriculum(false); return; }
              }
            }

            if (activeCourseModules[0]?.subModules?.[0]) {
              setActiveSubModule(activeCourseModules[0].subModules[0]);
            }
          }
        } else {
          changeActiveCourseId(null);
        }
      } catch (err) {
        console.error(err);
        showToast("Could not load course and curriculum.", "error");
      } finally {
        setLoadingCourse(false);
        setLoadingCurriculum(false);
      }
    };

    initLoad();
  }, [id, preselectedModuleId, preselectedSubModuleId, showToast]);



  /* ── Module Actions ── */
  const openAddModuleModal = (courseId) => {
    const resolvedId = (courseId && !isNaN(Number(courseId)) && typeof courseId !== "object")
      ? Number(courseId)
      : (activeCourseId || Number(id));
    setTargetCourseId(resolvedId);
    setEditingModule(null);
    setModuleTitle("");
    setModuleDescription("");
    setIsModuleModalOpen(true);
  };
  const openEditModuleModal = (mod) => {
    setEditingModule(mod); setModuleTitle(mod.title); setModuleDescription(mod.description || ""); setIsModuleModalOpen(true);
  };
  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) { showToast("Module title is required.", "error"); return; }
    setSubmittingModule(true);
    try {
      if (editingModule) {
        await moduleService.updateModule(editingModule.id, {
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: editingModule.courseId
        });
        showToast("Module updated!");
      } else {
        const finalCourseId = Number(targetCourseId || activeCourseId || id);
        if (!finalCourseId || isNaN(finalCourseId)) {
          showToast("Course is required.", "error");
          setSubmittingModule(false);
          return;
        }
        await moduleService.createModule({
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: finalCourseId
        });
        showToast("Module created!");
      }
      setIsModuleModalOpen(false);
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save module.", "error");
    } finally { setSubmittingModule(false); }
  };

  /* ── SubModule Actions ── */
  const openAddSubModuleDrawer = (moduleId) => {
    setEditingSubModule(null);
    setParentModuleId(moduleId);
    setSubModuleTitle("");
    setSubModuleDescription("");
    setIsDrawerOpen(true);
  };

  const openEditSubModuleDrawer = (subMod) => {
    setEditingSubModule(subMod);
    setParentModuleId(subMod.moduleId);
    setSubModuleTitle(subMod.title);
    setSubModuleDescription(subMod.description || "");
    setIsDrawerOpen(true);
  };

  const handleSaveSubModule = async (e) => {
    if (e) e.preventDefault();
    if (!subModuleTitle.trim()) { showToast("Sub-module title is required.", "error"); return; }
    setSubmittingSubModule(true);
    setSaveStatus("saving");
    try {
      if (editingSubModule) {
        await subModuleService.updateSubModule(editingSubModule.id, {
          title: subModuleTitle.trim(),
          description: subModuleDescription.trim(),
          moduleId: parentModuleId
        });
        showToast("Sub-module updated!");
      } else {
        await subModuleService.createSubModule({
          title: subModuleTitle.trim(),
          description: subModuleDescription.trim(),
          moduleId: parentModuleId
        });
        showToast("Sub-module created!");
      }
      setIsDrawerOpen(false);
      await reloadAllLoadedCourses();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save sub-module.", "error");
      setSaveStatus("unsaved");
    } finally { setSubmittingSubModule(false); }
  };

  /* ── Move Up / Move Down Handlers ── */
  const handleMoveModule = async (mod, direction) => {
    const activeCourse = loadedCourses.find(c => c.id === activeCourseId);
    if (!activeCourse) return;
    const mods = [...activeCourse.modules].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const idx = mods.findIndex(m => m.id === mod.id);
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= mods.length) return;
    // Swap sort orders
    const reorderList = mods.map((m, i) => {
      if (i === idx) return { id: m.id, sortOrder: targetIdx };
      if (i === targetIdx) return { id: m.id, sortOrder: idx };
      return { id: m.id, sortOrder: i };
    });
    try {
      await moduleService.reorderModules(reorderList);
      showToast(`Module moved ${direction}!`);
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to reorder modules.", "error");
    }
  };

  const handleMoveSubModule = async (sub, direction) => {
    const activeCourse = loadedCourses.find(c => c.id === activeCourseId);
    if (!activeCourse) return;
    const parentMod = activeCourse.modules.find(m => m.subModules?.some(s => s.id === sub.id));
    if (!parentMod) return;
    const subs = [...parentMod.subModules].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const idx = subs.findIndex(s => s.id === sub.id);
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= subs.length) return;
    const reorderList = subs.map((s, i) => {
      if (i === idx) return { id: s.id, sortOrder: targetIdx };
      if (i === targetIdx) return { id: s.id, sortOrder: idx };
      return { id: s.id, sortOrder: i };
    });
    try {
      await subModuleService.reorderSubModules(reorderList);
      showToast(`Block moved ${direction}!`);
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to reorder blocks.", "error");
    }
  };

  /* ── Block Actions ── */
  const resetAllBlockFields = () => {
    setVideoUrl("");
    setPdfUrl("");
    setTextContent("");
    setUploadedFileName("");
    setVideoUrlError("");
    setShowVideoPreview(false);
    setHeadingText("");
    setQuoteText("");
    setDividerStyle("solid");
    setImageAlt("");
    setImageCaption("");
    setCodeContent("");
    setCodeLanguage("javascript");
    setDownloadUrl("");
    setDownloadDisplayName("");
    setLinkUrl("");
    setLinkText("");
    setQuizQuestions([]);
    setAssignmentInstructions("");
    setAssignmentDueDate("");
    setAssignmentSubmissionType("file");
    setAssignmentMaxScore(100);
  };

  const openEditBlockDialog = (subMod, block = null) => {
    setActiveSubModule(subMod);
    setEditingBlock(block);
    resetAllBlockFields();

    if (block) {
      const bt = block.blockType || "";
      const c = block;

      if (bt === "heading") {
        setBlockConfigType("heading");
        setHeadingText(c.content || "");
      } else if (bt === "quote") {
        setBlockConfigType("quote");
        setQuoteText(c.content || "");
      } else if (bt === "divider") {
        setBlockConfigType("divider");
        setDividerStyle(c.content || "solid");
      } else if (bt === "image") {
        setBlockConfigType("image");
        // imageUrl stored in c.imageUrl; alt & caption stored as JSON in content
        if (c.imageUrl) setUploadedFileName(c.imageUrl.split("/").pop());
        try {
          const meta = JSON.parse(c.content || "{}");
          setImageAlt(meta.alt || "");
          setImageCaption(meta.caption || "");
        } catch { setImageAlt(""); setImageCaption(""); }
      } else if (bt === "code") {
        setBlockConfigType("code");
        try {
          const meta = JSON.parse(c.content || "{}");
          setCodeContent(meta.code || "");
          setCodeLanguage(meta.language || "javascript");
        } catch { setCodeContent(c.content || ""); setCodeLanguage("javascript"); }
      } else if (bt === "download" || bt === "file") {
        setBlockConfigType(bt);
        setDownloadUrl(c.pdfUrl || c.imageUrl || "");
        setDownloadDisplayName(c.content || "");
      } else if (bt === "link" || bt === "embed") {
        setBlockConfigType(bt);
        setLinkUrl(c.videoUrl || c.imageUrl || "");
        setLinkText(c.content || "");
      } else if (bt === "callout") {
        setBlockConfigType("callout");
        setTextContent(c.content || "");
      } else if (bt === "audio") {
        setBlockConfigType("audio");
        setDownloadUrl(c.videoUrl || "");
        setDownloadDisplayName(c.content || "");
      } else if (bt === "paragraph" || bt === "text") {
        setBlockConfigType("paragraph");
        setTextContent(c.content || "");
      } else if (bt === "quiz") {
        setBlockConfigType("quiz");
        try {
          const parsed = JSON.parse(c.content || "[]");
          setQuizQuestions(Array.isArray(parsed) ? parsed : parsed.questions || []);
        } catch { setQuizQuestions([]); }
      } else if (bt === "assignment") {
        setBlockConfigType("assignment");
        try {
          const parsed = JSON.parse(c.content || "{}");
          setAssignmentInstructions(parsed.instructions || "");
          setAssignmentDueDate(parsed.dueDate || "");
          setAssignmentSubmissionType(parsed.submissionType || "file");
          setAssignmentMaxScore(parsed.maxScore ?? 100);
        } catch {
          setAssignmentInstructions(c.content || "");
        }
      } else if (c.pdfUrl) {
        setBlockConfigType("pdf");
        setPdfUrl(c.pdfUrl);
        setUploadedFileName("document.pdf");
      } else if (c.videoUrl) {
        setBlockConfigType("video");
        setVideoUrl(c.videoUrl);
      } else {
        setBlockConfigType("text");
        setTextContent(c.content || "");
      }
      setBlockConfigOpen(true);
    } else {
      setBlockPickerOpen(true);
    }
  };

  const handleSelectBlockType = (type) => {
    setBlockPickerOpen(false);
    setBlockConfigType(type);
    resetAllBlockFields();
    setEditingBlock(null);
    setBlockConfigOpen(true);
  };

  const buildBlockPayload = () => {
    const base = {
      title: `${activeSubModule.title} Content`,
      subModuleId: activeSubModule.id,
      blockType: blockConfigType,
      content: "",
      videoUrl: "",
      pdfUrl: "",
      imageUrl: "",
    };

    switch (blockConfigType) {
      case "video":
        base.content = `Content for ${activeSubModule.title}`;
        base.videoUrl = videoUrl.trim();
        break;
      case "pdf":
        base.content = `Content for ${activeSubModule.title}`;
        base.pdfUrl = pdfUrl.trim();
        break;
      case "paragraph":
      case "text":
        base.content = textContent.trim();
        break;
      case "heading":
        base.content = headingText.trim();
        break;
      case "quote":
        base.content = quoteText.trim();
        break;
      case "divider":
        base.content = dividerStyle || "solid";
        break;
      case "image":
        base.imageUrl = downloadUrl.trim(); // reuse downloadUrl for uploaded image URL
        base.content = JSON.stringify({ alt: imageAlt.trim(), caption: imageCaption.trim() });
        break;
      case "code":
        base.content = JSON.stringify({ code: codeContent.trim(), language: codeLanguage || "javascript" });
        break;
      case "download":
      case "file":
        base.pdfUrl = downloadUrl.trim();
        base.content = downloadDisplayName.trim() || "Downloadable File";
        break;
      case "link":
      case "embed":
        base.videoUrl = linkUrl.trim();
        base.content = linkText.trim() || linkUrl.trim();
        break;
      case "callout":
        base.content = textContent.trim();
        break;
      case "audio":
        base.videoUrl = downloadUrl.trim();
        base.content = downloadDisplayName.trim() || "Audio";
        break;
      case "quiz":
        base.content = JSON.stringify(quizQuestions);
        break;
      case "assignment":
        base.content = JSON.stringify({
          instructions: assignmentInstructions.trim(),
          dueDate: assignmentDueDate || null,
          submissionType: assignmentSubmissionType,
          maxScore: assignmentMaxScore,
        });
        break;
      default:
        base.content = textContent.trim() || `Content for ${activeSubModule.title}`;
        break;
    }
    return base;
  };

  const handleSaveBlock = async (e) => {
    console.log("handleSaveBlock called");
    console.log(activeSubModule);
    console.log(blockConfigType);
    if (e) e.preventDefault();
    if (!activeSubModule) return;
    setSubmittingSubModule(true);
    setSaveStatus("saving");
    try {
      const payload = buildBlockPayload();

      if (editingBlock) {
        await contentService.updateContent(editingBlock.id, payload);
        showToast("Block updated!");
      } else {
        console.log("Creating content...");
        await contentService.createContent(payload);
        showToast("Block created!");
      }
      setBlockConfigOpen(false);
      setEditingBlock(null);
      await reloadAllLoadedCourses();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save block.", "error");
      setSaveStatus("unsaved");
    } finally { setSubmittingSubModule(false); }
  };


  const requestDelete = (type, target) => setDeleteTarget({ type, id: target.id, title: target.title || target.content || target.blockType || "Block" });
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "module") {
        await moduleService.deleteModule(deleteTarget.id);
        showToast("Module deleted.");
      } else if (deleteTarget.type === "submodule") {
        await subModuleService.deleteSubModule(deleteTarget.id);
        showToast("Sub-module deleted.");
        if (activeSubModule?.id === deleteTarget.id) setActiveSubModule(null);
      } else if (deleteTarget.type === "block") {
        await contentService.deleteContent(deleteTarget.id);
        showToast("Block deleted.");
        if (activeBlock?.id === deleteTarget.id) setActiveBlock(null);
      }
      await reloadAllLoadedCourses();
    } catch (err) { console.error(err); showToast("Deletion failed.", "error"); }
    finally { setDeleteTarget(null); }
  };

  const handlePublishCourse = async () => {
    if (!course) return;
    setSaveStatus("saving");
    try {
      await courseService.updateCourse(course.id, { ...course, status: "Published" });
      showToast("Course published!");
      await reloadAllLoadedCourses();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      showToast("Failed to publish course.", "error");
      setSaveStatus("unsaved");
    }
  };

  const handleDuplicateCourse = async (c) => {
    try {
      showToast("Duplicating course...");
      const duplicatedCourse = await courseService.createCourse({
        title: `${c.title} (Copy)`,
        description: c.description || "",
        category: c.category || "",
        status: "Draft",
      });

      const courseModules = await moduleService.getModulesByCourseId(c.id);

      for (const mod of (courseModules || [])) {
        const duplicatedMod = await moduleService.createModule({
          courseId: duplicatedCourse.id,
          title: mod.title,
          description: mod.description || "",
        });

        const modSubModules = await subModuleService.getSubModulesByModuleId(mod.id);
        for (const sub of (modSubModules || [])) {
          const duplicatedSub = await subModuleService.createSubModule({
            moduleId: duplicatedMod.id,
            title: sub.title,
            description: sub.description || "",
          });

          const subContents = await contentService.getContentsBySubModuleId(sub.id);
          for (const subContent of (subContents || [])) {
            await contentService.createContent({
              subModuleId: duplicatedSub.id,
              blockType: subContent.blockType,
              content: subContent.content || "",
              videoUrl: subContent.videoUrl || "",
              pdfUrl: subContent.pdfUrl || "",
              imageUrl: subContent.imageUrl || "",
              title: subContent.title || `${sub.title} Content`
            });
          }
        }
      }

      showToast("Course duplicated successfully!");
      await loadAllCourses();
      await handleSelectCourse(duplicatedCourse);
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate course.", "error");
    }
  };

  const handleDuplicateModule = async (mod) => {
    try {
      showToast("Duplicating module...");
      const duplicatedMod = await moduleService.createModule({
        courseId: mod.courseId,
        title: `${mod.title} (Copy)`,
        description: mod.description || "",
      });

      const [allSubModules, allContents] = await Promise.all([
        subModuleService.getAllSubModules(),
        contentService.getAllContents(),
      ]);

      const modSubModules = allSubModules.filter(sm => sm.moduleId === mod.id);
      for (const sub of modSubModules) {
        const duplicatedSub = await subModuleService.createSubModule({
          moduleId: duplicatedMod.id,
          title: sub.title,
          description: sub.description || "",
        });

        const subContents = allContents.filter(cont => cont.subModuleId === sub.id);
        for (const subContent of subContents) {
          await contentService.createContent({
            subModuleId: duplicatedSub.id,
            blockType: subContent.blockType,
            content: subContent.content || "",
            videoUrl: subContent.videoUrl || "",
            pdfUrl: subContent.pdfUrl || "",
            imageUrl: subContent.imageUrl || "",
            title: subContent.title || `${sub.title} Content`
          });
        }
      }

      showToast("Module duplicated successfully!");
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate module.", "error");
    }
  };

  const handleDuplicateSubModule = async (sub) => {
    try {
      showToast("Duplicating sub-module...");
      const duplicatedSub = await subModuleService.createSubModule({
        moduleId: sub.moduleId,
        title: `${sub.title} (Copy)`,
        description: sub.description || "",
      });

      const allContents = await contentService.getAllContents();
      const subContents = allContents.filter(cont => cont.subModuleId === sub.id);
      for (const subContent of subContents) {
        await contentService.createContent({
          subModuleId: duplicatedSub.id,
          blockType: subContent.blockType,
          content: subContent.content || "",
          videoUrl: subContent.videoUrl || "",
          pdfUrl: subContent.pdfUrl || "",
          imageUrl: subContent.imageUrl || "",
          title: subContent.title || `${sub.title} Content`
        });
      }

      showToast("Sub-module duplicated successfully!");
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate sub-module.", "error");
    }
  };

  const handleDuplicateBlock = async (block) => {
    try {
      showToast("Duplicating block...");
      await contentService.createContent({
        subModuleId: block.subModuleId,
        blockType: block.blockType,
        content: block.content || "",
        videoUrl: block.videoUrl || "",
        pdfUrl: block.pdfUrl || "",
        imageUrl: block.imageUrl || "",
        title: block.title || "Block Content"
      });
      showToast("Block duplicated successfully!");
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate block.", "error");
    }
  };

  /* ── Video helpers ── */
  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setVideoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handlePdfFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPdfUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const validateUrlFormat = (url) => {
    if (!url.trim()) { setVideoUrlError(""); return false; }
    try { new URL(url); setVideoUrlError(""); return true; }
    catch { setVideoUrlError("Please enter a valid URL (e.g. https://...)"); return false; }
  };
  const handleVideoUrlChange = (val) => {
    setVideoUrl(val); setShowVideoPreview(false); validateUrlFormat(val);
  };

  return {
    id,
    navigate,
    fromModuleManagement,
    course,
    loadingCourse,
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
    setSaveStatus,
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
    parentModuleId,
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
    videoInputRef,
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
    loadCourseData: reloadAllLoadedCourses,
    loadCurriculumData: reloadAllLoadedCourses,
    openAddModuleModal,
    openEditModuleModal,
    handleSaveModule,
    openAddSubModuleDrawer,
    openEditSubModuleDrawer,
    handleSaveSubModule,
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
    requestDelete,
    confirmDelete,
    handlePublishCourse,
    handleVideoFileChange,
    handlePdfFileChange,
    handleVideoUrlChange,
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
    activeBlock,
    setActiveBlock,
    editingBlock,
    setEditingBlock,
    handleDuplicateBlock,
    // Multi course props
    loadedCourses,
    setLoadedCourses: changeLoadedCourses,
    activeCourseId,
    setActiveCourseId: changeActiveCourseId,
    expandedCourses,
    setExpandedCourses,
  };
}
