import { useState, useEffect } from "react";
import categoryService from "@/features/categories/services/categoryService";
import courseService from "@/features/courses/services/courseService";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit" | "view"
  const [selectedCatDbId, setSelectedCatDbId] = useState(null);

  // Form fields
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatImageFile, setNewCatImageFile] = useState(null);
  const [newCatImagePreview, setNewCatImagePreview] = useState("");
  const [newCatStatus, setNewCatStatus] = useState("Active");
  const [newCatEmoji, setNewCatEmoji] = useState("");
  const [newCatAccentColor, setNewCatAccentColor] = useState("");
  const [newCatTags, setNewCatTags] = useState([]);
  const [newCatFeatured, setNewCatFeatured] = useState(false);
  const [newCatMetaTitle, setNewCatMetaTitle] = useState("");
  const [newCatMetaDesc, setNewCatMetaDesc] = useState("");
  const [newCatFocusKeyword, setNewCatFocusKeyword] = useState("");
  const [newCatLongDesc, setNewCatLongDesc] = useState("");
  const [newCatPublishState, setNewCatPublishState] = useState("Published");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatParentCat, setNewCatParentCat] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null); // { dbId, name }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const [categoriesData, coursesData] = await Promise.all([
        categoryService.getAllCategories(),
        courseService.getAllCourses(),
      ]);
      const coursesList = coursesData || [];

      if (categoriesData && categoriesData.length > 0) {
        const mapped = categoriesData.map((cat) => {
          const count = coursesList.filter((c) => Number(c.categoryId) === Number(cat.id)).length;
          return {
            id: `CAT-${1000 + cat.id}`,
            dbId: cat.id,
            name: cat.name,
            description: cat.description || "No description provided.",
            courses: count,
            status: cat.status || "Active",
            created: "Recently",
            image: cat.image || null,
            emoji: cat.emoji || "",
            accentColor: cat.accentColor || "",
            tags: cat.tags || [],
            featured: cat.featured || false,
            metaTitle: cat.metaTitle || "",
            metaDesc: cat.metaDesc || "",
            focusKeyword: cat.focusKeyword || "",
            longDesc: cat.longDesc || "",
            publishState: cat.publishState || "Published",
            slug: cat.slug || "",
            parentCat: cat.parentCat || "",
          };
        });
        setCategories(mapped);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setNewCatName("");
    setNewCatDesc("");
    setNewCatImageFile(null);
    setNewCatImagePreview("");
    setNewCatStatus("Active");
    setNewCatEmoji("");
    setNewCatAccentColor("");
    setNewCatTags([]);
    setNewCatFeatured(false);
    setNewCatMetaTitle("");
    setNewCatMetaDesc("");
    setNewCatFocusKeyword("");
    setNewCatLongDesc("");
    setNewCatPublishState("Published");
    setNewCatSlug("");
    setNewCatParentCat("");
    setErrorMsg("");
  };

  const handleImageFileChange = (file) => {
    setNewCatImageFile(file);
    setNewCatImagePreview(URL.createObjectURL(file));
  };

  const openAdd = () => {
    resetForm();
    setModalMode("add");
    setShowModal(true);
  };

  const openView = (cat) => {
    setNewCatName(cat.name);
    setNewCatDesc(cat.description || "");
    setNewCatImageFile(null);
    setNewCatImagePreview(cat.image || "");
    setNewCatStatus(cat.status || "Active");
    setNewCatEmoji(cat.emoji || "");
    setNewCatAccentColor(cat.accentColor || "");
    setNewCatTags(cat.tags || []);
    setNewCatFeatured(cat.featured || false);
    setNewCatMetaTitle(cat.metaTitle || "");
    setNewCatMetaDesc(cat.metaDesc || "");
    setNewCatFocusKeyword(cat.focusKeyword || "");
    setNewCatLongDesc(cat.longDesc || "");
    setNewCatPublishState(cat.publishState || "Published");
    setNewCatSlug(cat.slug || "");
    setNewCatParentCat(cat.parentCat || "");
    setModalMode("view");
    setErrorMsg("");
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setNewCatName(cat.name);
    setNewCatDesc(cat.description || "");
    setNewCatImageFile(null);
    setNewCatImagePreview(cat.image || "");
    setNewCatStatus(cat.status || "Active");
    setNewCatEmoji(cat.emoji || "");
    setNewCatAccentColor(cat.accentColor || "");
    setNewCatTags(cat.tags || []);
    setNewCatFeatured(cat.featured || false);
    setNewCatMetaTitle(cat.metaTitle || "");
    setNewCatMetaDesc(cat.metaDesc || "");
    setNewCatFocusKeyword(cat.focusKeyword || "");
    setNewCatLongDesc(cat.longDesc || "");
    setNewCatPublishState(cat.publishState || "Published");
    setNewCatSlug(cat.slug || "");
    setNewCatParentCat(cat.parentCat || "");
    setSelectedCatDbId(cat.dbId);
    setModalMode("edit");
    setErrorMsg("");
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (modalMode === "view") {
      setShowModal(false);
      return;
    }
    if (!newCatName.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.append("name", newCatName.trim());
      formData.append("description", newCatDesc.trim());
      formData.append("status", newCatStatus);
      if (newCatImageFile) {
        formData.append("image", newCatImageFile);
      }
      formData.append("emoji", newCatEmoji || "");
      formData.append("accentColor", newCatAccentColor || "");
      if (newCatTags && newCatTags.length > 0) {
        newCatTags.forEach(tag => formData.append("tags", tag));
      } else {
        formData.append("tags", "");
      }
      formData.append("featured", newCatFeatured);
      formData.append("metaTitle", newCatMetaTitle || "");
      formData.append("metaDesc", newCatMetaDesc || "");
      formData.append("focusKeyword", newCatFocusKeyword || "");
      formData.append("longDesc", newCatLongDesc || "");
      formData.append("publishState", newCatPublishState);
      formData.append("slug", newCatSlug || "");
      formData.append("parentCat", newCatParentCat || "");

      if (modalMode === "add") {
        await categoryService.createCategory(formData);
      } else if (modalMode === "edit") {
        await categoryService.updateCategory(selectedCatDbId, formData);
      }
      resetForm();
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error(`Failed to ${modalMode} category:`, err);
      const serverMsg = err.response?.data?.message;
      setErrorMsg(
        serverMsg || "Error processing category. Please check your connection or unique name."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const requestDelete = (cat) => {
    setDeleteTarget({ dbId: cat.dbId, name: cat.name });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await categoryService.deleteCategory(deleteTarget.dbId);
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = categories
    .filter((cat) =>
      cat.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((cat) => statusFilter === "All" || cat.status === statusFilter);

  return {
    categories,
    loading,
    filterText,
    setFilterText,
    statusFilter,
    setStatusFilter,
    showModal,
    setShowModal,
    modalMode,
    setModalMode,
    selectedCatDbId,
    newCatName,
    setNewCatName,
    newCatDesc,
    setNewCatDesc,
    newCatImageFile,
    newCatImagePreview,
    newCatStatus,
    setNewCatStatus,
    newCatEmoji,
    setNewCatEmoji,
    newCatAccentColor,
    setNewCatAccentColor,
    newCatTags,
    setNewCatTags,
    newCatFeatured,
    setNewCatFeatured,
    newCatMetaTitle,
    setNewCatMetaTitle,
    newCatMetaDesc,
    setNewCatMetaDesc,
    newCatFocusKeyword,
    setNewCatFocusKeyword,
    newCatLongDesc,
    setNewCatLongDesc,
    newCatPublishState,
    setNewCatPublishState,
    newCatSlug,
    setNewCatSlug,
    newCatParentCat,
    setNewCatParentCat,
    submitting,
    errorMsg,
    deleteTarget,
    setDeleteTarget,
    deleting,
    fetchCategories,
    resetForm,
    handleImageFileChange,
    openAdd,
    openView,
    openEdit,
    handleFormSubmit,
    requestDelete,
    confirmDelete,
    filteredCategories,
  };
}
