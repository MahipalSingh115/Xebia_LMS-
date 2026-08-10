import { useState, useEffect } from "react";
import courseService from "@/features/courses/services/courseService";
import categoryService from "@/features/categories/services/categoryService";
import { TABS, DEFAULT_THUMBNAIL } from "@/features/courses/components/courseConstants";

export default function useCourses() {
  const [courses, setCourses]           = useState([]);
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchQuery, setSearch]        = useState("");
  const [activeTab, setActiveTab]       = useState(0);
  const [selectedCat, setSelectedCat]   = useState("All");
  const [selectedDiff, setSelectedDiff] = useState("All");
  const [viewMode, setViewMode]         = useState("list");
  const [selected, setSelected]         = useState(new Set());
  const [openDropdown, setOpenDropdown] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting]         = useState(false);
  const [toast, setToast]               = useState(null);

  useEffect(() => { loadData(); }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  async function loadData() {
    setLoading(true);
    try {
      const [coursesData, catsData] = await Promise.all([
        courseService.getAllCourses(),
        categoryService.getAllCategories(),
      ]);
      setCategories(catsData || []);
      if (coursesData?.length) {
        setCourses(
          coursesData.map((c) => ({
            id:          c.id,
            title:       c.title,
            description: c.description || "",
            curriculum:  c.curriculum || "",
            categoryId:  c.categoryId,
            category:    c.categoryName || "General",
            duration:    c.duration || "—",
            difficulty:  c.difficulty || "Intermediate",
            status:      (c.status || "published").toLowerCase(),
            featured:    false,
            active:      true,
            modules:     0,
            rating:      "4.5",
            learners:    (c.title.length * 7 + (c.id % 13) * 11) % 150 + 12,
            updated:     "Recently",
            thumbnail:   c.thumbnail || DEFAULT_THUMBNAIL,
          }))
        );
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }

  /* ─── Filtering ──────────────────────────────────────────────── */
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab    = TABS[activeTab].filter === null || c.status === TABS[activeTab].filter;
    const matchCat    = selectedCat === "All" || c.category === selectedCat;
    const matchDiff   = selectedDiff === "All" || c.difficulty === selectedDiff;
    return matchSearch && matchTab && matchCat && matchDiff;
  });

  /* ─── Selection ──────────────────────────────────────────────── */
  const toggleSelect = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected(
      selected.size === filtered.length ? new Set() : new Set(filtered.map((c) => c.id))
    );

  const toggleFeatured = (id) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)));

  const toggleActive = (id) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  /* ─── Delete ─────────────────────────────────────────────────── */
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.isBulk) {
        let successCount = 0;
        let failCount = 0;
        await Promise.all(
          Array.from(deleteTarget.ids).map(async (id) => {
            try {
              await courseService.deleteCourse(id);
              successCount++;
            } catch (err) {
              console.error(`Failed to delete course ${id}:`, err);
              failCount++;
            }
          })
        );
        setSelected(new Set());
        loadData();
        if (failCount > 0) {
          showToast(`Deleted ${successCount} courses. Failed to delete ${failCount} courses.`, "error");
        } else {
          showToast("Selected courses deleted successfully.", "success");
        }
      } else {
        await courseService.deleteCourse(deleteTarget.id);
        setSelected(prev => {
          const next = new Set(prev);
          next.delete(deleteTarget.id);
          return next;
        });
        loadData();
        showToast("Course deleted successfully.", "success");
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      showToast("An error occurred during deletion.", "error");
    } finally {
      setDeleting(false);
    }
  };

  /* ─── Bulk Actions ───────────────────────────────────────────── */
  const handleBulkStatusChange = async (statusVal) => {
    setLoading(true);
    let successCount = 0;
    let failCount = 0;
    try {
      await Promise.all(
        Array.from(selected).map(async (id) => {
          try {
            const courseObj = courses.find(c => c.id === id);
            if (courseObj) {
              const req = {
                title: courseObj.title,
                description: courseObj.description,
                thumbnail: courseObj.thumbnail,
                curriculum: courseObj.curriculum,
                difficulty: courseObj.difficulty,
                duration: courseObj.duration,
                categoryId: courseObj.categoryId,
                status: statusVal,
              };
              await courseService.updateCourse(id, req);
              successCount++;
            }
          } catch (err) {
            console.error(`Failed to update course status for ID ${id}:`, err);
            failCount++;
          }
        })
      );
    } finally {
      setSelected(new Set());
      await loadData();
      if (failCount > 0) {
        showToast(`Bulk action: ${successCount} updated successfully, ${failCount} failed.`, "error");
      } else {
        showToast(`Successfully updated status to ${statusVal} for all selected courses.`, "success");
      }
    }
  };

  const handleBulkFeature = () => {
    setCourses((prev) =>
      prev.map((c) => (selected.has(c.id) ? { ...c, featured: true } : c))
    );
    setSelected(new Set());
    showToast("Successfully marked selected courses as Featured.", "success");
  };

  return {
    courses,
    categories,
    loading,
    searchQuery,
    setSearch,
    activeTab,
    setActiveTab,
    selectedCat,
    setSelectedCat,
    selectedDiff,
    setSelectedDiff,
    viewMode,
    setViewMode,
    selected,
    setSelected,
    openDropdown,
    setOpenDropdown,
    deleteTarget,
    setDeleteTarget,
    deleting,
    toast,
    showToast,
    filtered,
    toggleSelect,
    toggleAll,
    toggleFeatured,
    toggleActive,
    confirmDelete,
    handleBulkStatusChange,
    handleBulkFeature,
    loadData,
  };
}
