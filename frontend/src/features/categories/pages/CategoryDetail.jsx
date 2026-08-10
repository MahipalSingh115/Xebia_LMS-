import { useNavigate } from "react-router-dom";
import { Plus, Pencil, TrendingUp } from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import useCategoryDetail from "@/features/categories/hooks/useCategoryDetail";
import CategoryDetailHeader from "@/features/categories/components/CategoryDetailHeader";
import CategoryDetailHero from "@/features/categories/components/CategoryDetailHero";
import CategoryDetailStats from "@/features/categories/components/CategoryDetailStats";
import CategoryDetailCourses from "@/features/categories/components/CategoryDetailCourses";
import CategoryDetailSidebar from "@/features/categories/components/CategoryDetailSidebar";

const ACCENT = "#6C1D5F";

export default function CategoryDetail() {
  const navigate = useNavigate();

  const {
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
  } = useCategoryDetail();

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-[1300px] mx-auto text-center py-20 text-slate-400">
          Loading category...
        </div>
      </AppLayout>
    );
  }

  if (!category) {
    return (
      <AppLayout>
        <div className="max-w-[1300px] mx-auto text-center py-20 text-slate-400">
          Category not found.
        </div>
      </AppLayout>
    );
  }

  const cat = category;

  // Generate dynamic activities based on related courses
  const activities = courses.map((c, idx) => {
    const types = ["add", "edit", "pub"];
    const icons = [Plus, Pencil, TrendingUp];
    const colors = ["bg-emerald-100 text-emerald-600", "bg-blue-100 text-blue-600", "bg-yellow-100 text-yellow-600"];
    const typeIdx = idx % 3;
    return {
      type: types[typeIdx],
      icon: icons[typeIdx],
      color: colors[typeIdx],
      title: typeIdx === 0 
        ? `New course "${c.title}" added` 
        : typeIdx === 1 
          ? `Course "${c.title}" content updated` 
          : `"${c.title}" published`,
      meta: "By Instructor",
      time: "Recently"
    };
  });

  // Dynamic SEO checks
  const seoChecks = [
    { ok: !!cat.metaTitle, label: cat.metaTitle ? `Meta Title: "${cat.metaTitle}"` : "Meta Title not configured" },
    { ok: !!cat.metaDesc, label: cat.metaDesc ? "Meta Description configured" : "Meta Description not configured" },
    { ok: !!cat.focusKeyword, label: cat.focusKeyword ? `Focus Keyword: "${cat.focusKeyword}"` : "Focus Keyword not configured" },
    { ok: !!cat.image, label: "OG Image configured" },
    { ok: !!cat.slug, label: cat.slug ? `Slug: /categories/${cat.slug}` : "Slug not configured" },
  ];
  const seoScore = Math.round((seoChecks.filter(c => c.ok).length / seoChecks.length) * 100);

  return (
    <AppLayout>
      <div className="max-w-[1300px] mx-auto space-y-4">
        <CategoryDetailHeader cat={cat} id={id} navigate={navigate} />

        <CategoryDetailHero cat={cat} ACCENT={ACCENT} />

        <CategoryDetailStats
          coursesCount={courses.length}
          totalLearners={totalLearners}
          published={published}
          drafts={drafts}
        />

        <div className="flex gap-4 items-start pt-2">
          <CategoryDetailCourses
            courses={courses}
            courseSearch={courseSearch}
            setCourseSearch={setCourseSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
            page={page}
            setPage={setPage}
            PER_PAGE={PER_PAGE}
            filtered={filtered}
            totalPages={totalPages}
            paginated={paginated}
            activities={activities}
            navigate={navigate}
            loading={loading}
          />

          <CategoryDetailSidebar
            cat={cat}
            ACCENT={ACCENT}
            enrollTop={enrollTop}
            maxEnroll={maxEnroll}
            seoScore={seoScore}
            seoChecks={seoChecks}
          />
        </div>
      </div>
    </AppLayout>
  );
}

