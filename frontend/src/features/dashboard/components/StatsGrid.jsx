import { useEffect, useState } from "react";
import { BookOpen, Target, FileText, Users, Award, UserCheck, TrendingUp, TrendingDown } from "lucide-react";
import dashboardService from "@/features/dashboard/services/dashboardService";

const CARDS = [
  {
    key: "totalCategories",
    label: "Categories",
    icon: BookOpen,
    iconBg: "bg-[#6C1D5F]/10",
    iconColor: "text-[#6C1D5F]",
    fallback: 0,
  },
  {
    key: "totalCourses",
    label: "Active Courses",
    icon: BookOpen,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    fallback: 0,
  },
  {
    key: "totalModules",
    label: "Modules",
    icon: Target,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    fallback: 0,
  },
  {
    key: "totalContents",
    label: "Content Items",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    fallback: 0,
  },
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    fallback: 0,
  },
  {
    key: "totalEnrollments",
    label: "Total Enrollments",
    icon: Award,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    fallback: 0,
  },
  {
    key: "totalInstructors",
    label: "Total Instructors",
    icon: UserCheck,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    fallback: 0,
  },
];

export default function StatsGrid() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setError(false);
      const data = await dashboardService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 animate-pulse">
        {CARDS.map((card) => (
          <div
            key={card.key}
            className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2.5"
          >
            <div className="flex items-start justify-between">
              <div className="h-3 w-20 bg-slate-100 rounded"></div>
              <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
            </div>
            <div className="h-7 w-12 bg-slate-100 rounded mt-1"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2">
        <span className="text-[13px] font-semibold text-red-700">Failed to load statistics.</span>
        <button
          onClick={load}
          className="px-3.5 py-1.5 rounded-md text-[12px] font-bold text-white bg-[#6C1D5F] hover:bg-[#4A1E47] transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  const isDbEmpty = stats && 
    stats.totalCategories === 0 && 
    stats.totalCourses === 0 && 
    stats.totalModules === 0 && 
    stats.totalContents === 0;

  return (
    <div className="space-y-4">
      {isDbEmpty && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13px] text-amber-800 font-medium">
          ⚠️ The database currently has no records. You can start by creating a new category or course using the Quick Actions.
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const value = stats ? (stats[card.key] ?? card.fallback) : card.fallback;

          return (
            <div
              key={card.key}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  {card.label}
                </div>
                <div className={`w-8 h-8 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={14} />
                </div>
              </div>

              {/* Value */}
              <div className="text-[26px] font-bold text-slate-900 tracking-tight leading-none">
                {typeof value === "number" ? value.toLocaleString() : value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}