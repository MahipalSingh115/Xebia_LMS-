import { useState, useEffect } from "react";
import { MoreHorizontal, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dashboardService from "@/features/dashboard/services/dashboardService";
/* ─── Category colour mapping ──────────────────────────────────────── */
const CATEGORY_COLORS = {
  Design:      { bg: "bg-[#f5f3ff]", text: "text-[#7c3aed]", border: "border-[#ddd6fe]" },
  Development: { bg: "bg-[#eef2ff]", text: "text-[#6C1D5F]", border: "border-[#c7d2fe]" },
  Frontend:    { bg: "bg-[#eef2ff]", text: "text-[#6C1D5F]", border: "border-[#c7d2fe]" },
  DevOps:      { bg: "bg-[#eff6ff]", text: "text-[#2563eb]", border: "border-[#bfdbfe]" },
  Cloud:       { bg: "bg-[#eff6ff]", text: "text-[#2563eb]", border: "border-[#bfdbfe]" },
  "AI/ML":     { bg: "bg-[#f5f3ff]", text: "text-[#7c3aed]", border: "border-[#ddd6fe]" },
  Business:    { bg: "bg-[#f0fdfa]", text: "text-[#0d9488]", border: "border-[#99f6e4]" },
  General:     { bg: "bg-slate-50",  text: "text-slate-500",  border: "border-slate-200" },
};

const DIFF_BADGE = {
  Beginner:     "bg-slate-100 text-slate-600 border border-slate-200",
  Intermediate: "bg-amber-50 text-amber-700 border border-amber-200",
  Advanced:     "bg-orange-50 text-orange-700 border border-orange-200",
  Expert:       "bg-red-50 text-red-700 border border-red-200",
};

function getCatColor(name) {
  const match = Object.keys(CATEGORY_COLORS).find((k) =>
    (name ?? "").toLowerCase().includes(k.toLowerCase())
  );
  return CATEGORY_COLORS[match ?? "General"];
}

const STATUS_MAP = {
  published: { label: "Published", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  draft:     { label: "Draft",     dot: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200" },
  archived:  { label: "Archived",  dot: "bg-red-500",     text: "text-red-700",     bg: "bg-red-50",     border: "border-red-200" },
};

export default function RecentCoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await dashboardService.getRecentCourses();
        if (data) {
          setCourses(data);
        }
      } catch (err) {
        console.error("Failed to load recent courses:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-200">
        <div>
          <div className="text-[13px] font-bold text-slate-900 tracking-tight">Recent Courses</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Latest published and updated content</div>
        </div>
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-1 text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md px-2.5 py-1 hover:bg-slate-50 transition-colors"
        >
          View all <ArrowRight size={11} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Course", "Category", "Difficulty", "Status", "Learners", ""].map((h) => (
                <th
                  key={h}
                  className="px-3.5 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[13px] text-slate-400">
                  Loading courses…
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[13px] text-slate-400">
                  No courses found.
                </td>
              </tr>
            ) : (
              <>
              {console.log(courses)}
              {courses.map((course) => {
                const cat = getCatColor(course.categoryName);
                const statusKey = (course.status ?? "published").toLowerCase();
                const status = STATUS_MAP[statusKey] ?? STATUS_MAP.published;
                return (
                  <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Course name cell */}
                    <td className="px-3.5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[38px] h-[26px] rounded-[4px] bg-slate-100 flex-shrink-0 flex items-center justify-center border border-slate-200">
                          <BookOpen size={12} className="text-[#6C1D5F]" />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                            {course.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-px">Updated recently</div>
                        </div>
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="px-3.5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cat.bg} ${cat.text} ${cat.border}`}>
                        {course.categoryName || "General"}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="px-3.5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${DIFF_BADGE[course.difficulty || "Intermediate"]}`}>
                        {course.difficulty || "Intermediate"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3.5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
                        {status.label}
                      </span>
                    </td>

                    {/* Learners */}
                    <td className="px-3.5 py-3 text-[13px] font-bold text-slate-900">
                      0
                    </td>

                    {/* Action */}
                    <td className="px-3.5 py-3">
                      <button className="w-[26px] h-[26px] rounded-[4px] bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <MoreHorizontal size={12} className="text-slate-500" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}