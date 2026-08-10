import { useState, useEffect } from "react";
import { PlayCircle, Award, Star, Search, Filter, Plus, Grid, List, ChevronRight, X, BookOpen, Layers } from "lucide-react";
import courseService from "@/features/courses/services/courseService";

export default function CoursesManagement() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseService.getAllCourses().then(data => {
      if (data && Array.isArray(data)) {
        setCourses(data.map(c => ({
          id: c.id,
          title: c.title,
          category: c.category || "Business",
          status: c.status || "ACTIVE",
          instructor: c.instructor || "Prof. Helen Carter",
          instructorAvatar: c.instructorAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&fit=crop",
          learners: c.learners || 420,
          rating: c.rating || "4.9",
          bgImage: c.bgImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&fit=crop",
          desc: c.description || "Our flagship masterclass on business agility and digital transformation processes.",
          curriculum: c.curriculum || [
            { title: "Introduction to Course Concepts", duration: "2h 15m" },
            { title: "Advanced Methods & Paradigms", duration: "4h 30m" },
            { title: "Industry Case Study and Projects", duration: "3h 10m" }
          ]
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-6 relative min-h-[80vh]">
      {/* Hero Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h2 className="text-[26px] font-bold text-primary tracking-tight">Course Management</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Organize, track, and optimize your organization's learning paths with comprehensive course controls.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[12px] font-semibold hover:bg-slate-50 transition-all">
            <Filter size={14} className="text-slate-450" />
            <span>Filters</span>
          </button>
          <button className="bg-primary text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[12px] font-bold hover:bg-primary-dark transition-all shadow-sm">
            <Plus size={14} />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Bento Grid - Stats & Featured */}
      <div className="grid grid-cols-12 gap-6 h-auto">
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="z-10">
            <div className="inline-flex items-center px-2.5 py-0.5 bg-purple-50 text-primary border border-primary/10 rounded-full text-[10px] font-bold mb-3 uppercase tracking-wider">
              Featured Track
            </div>
            <h3 className="text-[20px] font-extrabold text-slate-800 mb-1">Advanced Cloud Architecture</h3>
            <p className="text-[13px] text-slate-500 max-w-[448px] leading-relaxed">
              Our most popular certification track this month. Explore how 1,200 learners are mastering AWS and Azure deployments.
            </p>
          </div>
          <div className="flex items-center gap-6 z-10 pt-4">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Learners</p>
              <p className="text-[20px] font-black text-primary">1,248</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completion Rate</p>
              <p className="text-[20px] font-black text-primary">78%</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Courses</p>
              <p className="text-[21px] font-bold text-slate-800">42</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-primary">
              <PlayCircle size={22} />
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Enrollment Rev.</p>
              <p className="text-[21px] font-bold text-slate-800">$14,280</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="text-[22px] font-extrabold">$</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Rating</p>
              <p className="text-[21px] font-bold text-slate-800">4.8/5</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <Star size={20} fill="#f59e0b" className="text-amber-550" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-6">
        {["Overview", "Learners", "Curriculum", "Assessments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-3.5 text-[13px] font-semibold border-b-2 transition-all ${
              activeTab === tab
                ? "text-primary border-primary font-bold"
                : "text-slate-450 border-transparent hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-slate-800">Recent Courses</h3>
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
            <button className="p-1 rounded bg-purple-50 text-primary">
              <Grid size={15} />
            </button>
            <button className="p-1 rounded text-slate-400 hover:bg-slate-50">
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-[448px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-[12px] text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Search recent courses..."
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((c, i) => (
              <div
                key={i}
                onClick={() => setSelectedCourse(c)}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group cursor-pointer hover:border-primary/45 transition-all"
              >
                <div className="relative h-40">
                  <img className="w-full h-full object-cover" src={c.bgImage} alt={c.title} />
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur rounded-full text-[9px] font-bold text-primary shadow-sm border border-slate-100">
                    {c.status}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#84117C] font-bold uppercase tracking-wider">{c.category}</p>
                    <h4 className="text-[14px] font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors">
                      {c.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <img className="w-5 h-5 rounded-full border border-slate-200 object-cover" src={c.instructorAvatar} alt={c.instructor} />
                      <span className="font-semibold text-slate-650">{c.instructor}</span>
                    </div>
                    <span className="font-bold text-slate-800 bg-slate-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star size={11} fill="#fbbf24" className="text-amber-500" />
                      {c.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Side Slide-Over Drawer Detail */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedCourse(null)}></div>
          <div className="relative w-full max-w-[448px] bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-6 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                  {selectedCourse.category}
                </span>
                <h3 className="text-[18px] font-bold text-slate-900">{selectedCourse.title}</h3>
              </div>

              <img className="w-full h-44 object-cover rounded-xl shadow-inner border border-slate-100" src={selectedCourse.bgImage} alt={selectedCourse.title} />

              <div className="space-y-2">
                <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest">About Course</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">{selectedCourse.desc}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers size={14} />
                  <span>Curriculum Structure</span>
                </h4>
                <div className="space-y-2">
                  {selectedCourse.curriculum.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2 text-[12px] text-slate-700 font-semibold">
                        <BookOpen size={12} className="text-slate-400" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-[12px] text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img className="w-7 h-7 rounded-full object-cover border border-slate-200" src={selectedCourse.instructorAvatar} alt={selectedCourse.instructor} />
                  <div>
                    <p className="font-bold text-slate-800 leading-none">{selectedCourse.instructor}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lead Instructor</p>
                  </div>
                </div>
                <span className="font-bold text-primary bg-purple-50 px-2.5 py-1 rounded">
                  {selectedCourse.learners} Active Learners
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
