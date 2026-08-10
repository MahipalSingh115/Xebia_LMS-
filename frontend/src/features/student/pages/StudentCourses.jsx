import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  User,
  Clock,
  Play,
  CheckCircle,
  Heart,
  ChevronRight,
} from "lucide-react";
import courseService from "@/features/courses/services/courseService";

export default function StudentCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'in_progress', 'completed', 'bookmarked'
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to load student courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleFavorite = (courseId, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  // Mock statuses for demonstration matching the design
  const getCourseStatus = (course, index) => {
    if (favorites[course.id]) return { label: "Bookmarked", color: "bg-blue-50 text-blue-700 border-blue-200" };
    const statuses = [
      { label: "In Progress", color: "bg-amber-50 text-amber-700 border-amber-200" },
      { label: "In Progress", color: "bg-amber-50 text-amber-700 border-amber-200" },
      { label: "Completed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    ];
    return statuses[index % 3];
  };

  const getCourseProgress = (index) => {
    return [65, 32, 100, 45, 80][index % 5];
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const progress = getCourseProgress(courses.indexOf(c));
    const isFavorite = favorites[c.id];

    if (statusFilter === "completed") {
      return matchesSearch && progress === 100;
    }
    if (statusFilter === "in_progress") {
      return matchesSearch && progress < 100;
    }
    if (statusFilter === "bookmarked") {
      return matchesSearch && isFavorite;
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">My Courses</h2>
          <p className="text-[13px] text-slate-400 mt-1">Continue your learning journey.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 text-[13px] text-slate-700 placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200/50 shrink-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer border-none outline-none ${
                statusFilter === "all" ? "bg-white text-slate-850 shadow-sm" : "text-slate-450 hover:text-slate-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("in_progress")}
              className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer border-none outline-none ${
                statusFilter === "in_progress" ? "bg-white text-slate-850 shadow-sm" : "text-slate-450 hover:text-slate-700"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer border-none outline-none ${
                statusFilter === "completed" ? "bg-white text-slate-850 shadow-sm" : "text-slate-450 hover:text-slate-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter("bookmarked")}
              className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer border-none outline-none ${
                statusFilter === "bookmarked" ? "bg-white text-slate-850 shadow-sm" : "text-slate-450 hover:text-slate-700"
              }`}
            >
              Bookmarks
            </button>
          </div>
        </div>
      </div>

      {/* ── Courses Card Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-2xl h-[300px] p-6 space-y-4" />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-[500px] mx-auto shadow-sm">
          <BookOpen size={36} className="mx-auto text-slate-300 mb-4" />
          <h4 className="text-[14px] font-bold text-slate-700">No courses found</h4>
          <p className="text-[12px] text-slate-400 mt-1 max-w-[340px] mx-auto leading-relaxed">
            We couldn't find any courses matching your selection. Try adjusting your search query or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c, index) => {
            const progress = getCourseProgress(courses.indexOf(c));
            const status = getCourseStatus(c, courses.indexOf(c));
            const isFavorite = favorites[c.id];

            // Curated, beautiful cover gradients based on index
            const coverGradients = [
              "from-[#6C1D5F] to-[#84117C]",
              "from-[#01AC9F] to-[#007C74]",
              "from-[#FF6200] to-[#E05300]",
              "from-[#3F51B5] to-[#283593]",
              "from-[#E91E63] to-[#C2185B]",
            ];
            const gradient = coverGradients[courses.indexOf(c) % coverGradients.length];

            return (
              <div
                key={c.id}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative"
              >
                {/* Favorite toggle */}
                <button
                  onClick={(e) => toggleFavorite(c.id, e)}
                  className={`absolute top-3.5 right-3.5 z-10 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer border-none outline-none ${
                    isFavorite
                      ? "bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100"
                      : "bg-white/80 border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-white"
                  }`}
                >
                  <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                </button>

                {/* Course Header Banner */}
                <div className={`h-36 bg-gradient-to-tr ${gradient} relative flex items-end p-5 text-white`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10 space-y-1">
                    <span className="inline-block text-[9.5px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {c.category || "General"}
                    </span>
                  </div>
                </div>

                {/* Course Body Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-[14.5px] text-slate-800 line-clamp-2 min-h-[44px] leading-snug group-hover:text-[#6C1D5F] transition-colors">
                      {c.title}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium">
                      <span className="flex items-center gap-1">
                        <User size={13} />
                        LMS Admin
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {c.modules?.length || 5} modules
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-3 border-t border-slate-50">
                    {/* Progress details */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400">
                        <span>COURSE PROGRESS</span>
                        <span className="text-slate-700 font-bold">{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: progress === 100 ? "#10B981" : "#6C1D5F",
                          }}
                        />
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => navigate(`/student/courses/${c.id}`)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold shadow-sm transition-all cursor-pointer outline-none border ${
                        progress === 100
                          ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-[#6C1D5F] hover:bg-[#521347] text-white border-[#6C1D5F]"
                      }`}
                    >
                      {progress === 100 ? (
                        <>
                          <CheckCircle size={14} /> Review Curriculum
                        </>
                      ) : (
                        <>
                          <Play size={14} fill="currentColor" /> Resume Course
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
