import { useState, useEffect } from "react";
import contentService from "@/features/content/services/contentService";
import subModuleService from "@/features/submodules/services/subModuleService";
import moduleService from "@/features/modules/services/moduleService";
import courseService from "@/features/courses/services/courseService";

export default function useContentLibrary() {
  const [contents, setContents] = useState([]);
  const [submodules, setSubmodules] = useState([]);
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedModuleId, setSelectedModuleId] = useState("All");
  const [selectedCourseId, setSelectedCourseId] = useState("All");

  // Selection States
  const [selected, setSelected] = useState(new Set());

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [contentTitle, setContentTitle] = useState("");
  const [contentBody, setContentBody] = useState("");
  const [contentType, setContentType] = useState("text"); // text, video, pdf
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [targetSubModuleId, setTargetSubModuleId] = useState("");

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  async function loadData() {
    setLoading(true);
    try {
      const [contentsData, submodulesData, modulesData, coursesData] = await Promise.all([
        contentService.getAllContents(),
        subModuleService.getAllSubModules(),
        moduleService.getAllModules(),
        courseService.getAllCourses(),
      ]);

      setContents(contentsData || []);
      setSubmodules(submodulesData || []);
      setModules(modulesData || []);
      setCourses(coursesData || []);

      if (submodulesData && submodulesData.length > 0) {
        setTargetSubModuleId(String(submodulesData[0].id));
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load content library.", "error");
    } finally {
      setLoading(false);
    }
  }

  // Helper: Get item type
  const getContentItemType = (item) => {
    if (item.videoUrl && item.videoUrl.trim().length > 0) return "Video";
    if (item.pdfUrl && item.pdfUrl.trim().length > 0) return "PDF";
    return "Text";
  };

  // Filtering Logic
  const filteredContents = contents.filter((item) => {
    const type = getContentItemType(item);
    const subMod = submodules.find((sm) => sm.id === item.subModuleId);
    
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "All" || type === selectedType;
    
    const matchesModule = 
      selectedModuleId === "All" || 
      (subMod && String(subMod.moduleId) === selectedModuleId);

    const matchesCourse = 
      selectedCourseId === "All" ||
      (subMod && (() => {
        const parentMod = modules.find((m) => m.id === subMod.moduleId);
        return parentMod && String(parentMod.courseId) === selectedCourseId;
      })());

    return matchesSearch && matchesType && matchesModule && matchesCourse;
  });

  // Selection handlers
  const handleToggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleToggleAll = () => {
    if (selected.size === filteredContents.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredContents.map((c) => c.id)));
    }
  };



  // Action: Add / Edit Open
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingContent(item);
      setContentTitle(item.title);
      setContentBody(item.content || "");
      const type = getContentItemType(item);
      setContentType(type.toLowerCase());
      setVideoUrl(item.videoUrl || "");
      setPdfUrl(item.pdfUrl || "");
      setTargetSubModuleId(String(item.subModuleId));
    } else {
      setEditingContent(null);
      setContentTitle("");
      setContentBody("");
      setContentType("text");
      setVideoUrl("");
      setPdfUrl("");
      if (submodules.length > 0) {
        setTargetSubModuleId(String(submodules[0].id));
      }
    }
    setIsModalOpen(true);
  };

  // Action: Save Form
  const handleSubmitForm = async (e) => {
    if (e) e.preventDefault();
    if (!contentTitle.trim()) {
      showToast("Content title is required.", "error");
      return;
    }
    if (!targetSubModuleId) {
      showToast("Please assign a submodule.", "error");
      return;
    }

    const payload = {
      title: contentTitle.trim(),
      subModuleId: Number(targetSubModuleId),
      content: contentType === "text" ? contentBody.trim() : "",
      videoUrl: contentType === "video" ? videoUrl.trim() : "",
      pdfUrl: contentType === "pdf" ? pdfUrl.trim() : "",
    };

    try {
      if (editingContent) {
        await contentService.updateContent(editingContent.id, payload);
        showToast("Content updated successfully.");
      } else {
        await contentService.createContent(payload);
        showToast("Content created successfully.");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Failed to save content.", "error");
    }
  };

  // Action: Delete Single
  const handleDeleteSingle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content item?")) return;
    try {
      await contentService.deleteContent(id);
      showToast("Content item deleted.");
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete content.", "error");
    }
  };

  // Action: Delete Bulk
  const handleDeleteBulk = async () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selected.size} selected items?`)) return;

    try {
      await Promise.all(
        Array.from(selected).map((id) => contentService.deleteContent(id))
      );
      showToast(`${selected.size} items deleted.`);
      setSelected(new Set());
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete some selected items.", "error");
    }
  };

  return {
    contents,
    submodules,
    modules,
    courses,
    loading,
    toast,
    setToast,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedModuleId,
    setSelectedModuleId,
    selectedCourseId,
    setSelectedCourseId,
    selected,
    setSelected,
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
    handleSubmitForm,
    handleDeleteSingle,
    handleDeleteBulk,
    loadData,
  };
}
