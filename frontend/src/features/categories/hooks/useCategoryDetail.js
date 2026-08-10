import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import categoryService from "@/features/categories/services/categoryService";
import courseService from "@/features/courses/services/courseService";

export default function useCategoryDetail() {
  const { id } = useParams();

  const [category, setCategory]   = useState(null);
  const [courses, setCourses]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [courseSearch, setCourseSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [levelFilter, setLevelFilter]   = useState("All Levels");
  const [page, setPage]           = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const [cats, allCourses] = await Promise.all([
        categoryService.getAllCategories(),
        courseService.getAllCourses(),
      ]);
      const cat = cats?.find((c) => String(c.id) === String(id));
      setCategory(cat || null);
      const related = (allCourses || [])
        .filter((c) => String(c.categoryId) === String(id))
        .map((c) => ({
          id:         c.id,
          title:      c.title,
          subtitle:   c.description?.slice(0, 40) || "—",
          level:      c.difficulty || "Intermediate",
          duration:   c.duration || "—",
          learners:   Math.floor(Math.random() * 400) + 50,
          status:     c.status || "Published",
          updated:    "Jun 2025",
          thumbnail:  c.thumbnail || null,
        }));
      setCourses(related);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* ── Derived values ──────────────────────────────────────────────── */
  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(courseSearch.toLowerCase());
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchLevel  = levelFilter  === "All Levels"  || c.level  === levelFilter;
    return matchSearch && matchStatus && matchLevel;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const published = courses.filter((c) => c.status === "Published").length;
  const drafts    = courses.filter((c) => c.status !== "Published").length;
  const totalLearners = courses.reduce((s, c) => s + c.learners, 0);

  const enrollTop = [...courses]
    .sort((a, b) => b.learners - a.learners)
    .slice(0, 6);
  const maxEnroll = enrollTop[0]?.learners || 1;

  return {
    id,
    category,
    courses,
    loading,
    courseSearch,
    setCourseSearch,
    statusFilter,
    setStatusFilter,
    levelFilter,
    setLevelFilter,
    page,
    setPage,
    PER_PAGE,
    filtered,
    totalPages,
    paginated,
    published,
    drafts,
    totalLearners,
    enrollTop,
    maxEnroll,
    load,
  };
}
