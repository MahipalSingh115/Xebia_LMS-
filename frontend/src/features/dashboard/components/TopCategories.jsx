import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryService from "@/features/categories/services/categoryService";
import courseService from "@/features/courses/services/courseService";

const COLORS = ["#6C1D5F", "#22c55e", "#7c3aed", "#f59e0b", "#2563eb"];
const EMOJIS = {
  frontend: "⚛️",
  backend: "⚙️",
  cloud: "☁️",
  devops: "🚀",
  "ai/ml": "🤖",
  security: "🔐",
  design: "🎨",
  business: "💼",
};

function getEmojiForCategory(name) {
  const normalized = (name ?? "").toLowerCase();
  for (const [key, val] of Object.entries(EMOJIS)) {
    if (normalized.includes(key)) return val;
  }
  return "📁";
}

export default function TopCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cats, courses] = await Promise.all([
          categoryService.getAllCategories(),
          courseService.getAllCourses(),
        ]);

        const totalCourses = courses?.length || 1;
        const mapped = (cats || []).map((cat, idx) => {
          const count = (courses || []).filter(
            (c) => Number(c.categoryId) === Number(cat.id)
          ).length;

          return {
            id: cat.id,
            name: cat.name,
            courses: count,
            // Dynamic learners (since we don't have learners db table)
            learners: 0,
            pct: Math.round((count / totalCourses) * 100),
            color: COLORS[idx % COLORS.length],
            emoji: getEmojiForCategory(cat.name),
          };
        });

        // Sort by courses count descending, take top 5
        const sorted = mapped
          .sort((a, b) => b.courses - a.courses)
          .slice(0, 5);

        setCategories(sorted);
      } catch (err) {
        console.error("Failed to load top categories:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div>
          <div className="text-[13px] font-bold text-slate-900">Top Categories</div>
          <div className="text-[11px] text-slate-400 mt-0.5">By course distribution</div>
        </div>
        <button
          onClick={() => navigate("/categories")}
          className="text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors"
        >
          Manage
        </button>
      </div>

      {/* Category list */}
      <div className="px-[18px] py-1">
        {loading ? (
          <div className="py-8 text-center text-[12px] text-slate-400">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="py-8 text-center text-[12px] text-slate-400">
            No categories found.
          </div>
        ) : (
          categories.map((cat, i) => (
            <div
              key={cat.id}
              className={`flex items-center gap-3 py-3 ${
                i < categories.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              {/* Emoji icon */}
              <div className="w-8 h-8 rounded-md bg-slate-50 flex items-center justify-center text-base flex-shrink-0 border border-slate-100">
                {cat.emoji}
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] font-semibold text-slate-800 truncate cursor-pointer hover:text-[#6C1D5F] transition-colors"
                  onClick={() => navigate(`/categories/${cat.id}`)}
                >
                  {cat.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {cat.courses} courses · {cat.learners} learners
                </div>
              </div>

              {/* Percentage + progress bar */}
              <div className="flex-shrink-0 text-right min-w-[72px]">
                <div className="text-[12px] font-bold text-slate-800 mb-1">{cat.pct}%</div>
                <div className="h-1.5 w-[72px] bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${cat.pct}%`, background: cat.color }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
