import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Award,
  Calendar,
  CheckCircle,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
  PlayCircle,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import courseService from "@/features/courses/services/courseService";
import assignmentService from "@/features/assignments/services/assignmentService";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Button } from "@/shared/components/ui/button";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, submitted: 0, reviewed: 0, overdue: 0, lateSubmitted: 0 });
  const [activities, setActivities] = useState([]);

  const studentId = "s4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, statsData, subsData] = await Promise.all([
          courseService.getAllCourses(),
          assignmentService.getStudentAssignmentStats(studentId),
          assignmentService.getStudentSubmissions(studentId)
        ]);

        setCourses(coursesData || []);
        if (statsData) {
          setStats(statsData);
        }

        // Generate dynamic timeline from submissions
        if (subsData && subsData.length > 0) {
          const mapped = subsData.map(sub => {
            let title = "Assignment Submitted";
            let detail = sub.assignmentTitle;
            let colorClass = "bg-emerald-500";
            if (sub.status === "Graded") {
              title = "New Grade Posted";
              detail = `${sub.assignmentTitle} (Score: ${sub.score})`;
              colorClass = "bg-[#6C1D5F]";
            } else if (sub.status === "Revision Needed" || sub.status === "Revision") {
              title = "Revision Requested";
              detail = sub.assignmentTitle;
              colorClass = "bg-rose-500";
            }
            return {
              id: sub.id,
              time: sub.submittedAt || "Recently",
              title,
              detail,
              colorClass
            };
          });
          // Sort by time/id desc, show up to 3
          setActivities(mapped.slice(0, 3));
        } else {
          // Fallback to static items if no submissions exist yet
          setActivities([
            { id: "1", time: "2 hours ago", title: "Assignment Submitted", detail: "AI Ethics Case Study", colorClass: "bg-emerald-500" },
            { id: "2", time: "Yesterday", title: "New Grade Posted", detail: "Data Visualization (Score: A)", colorClass: "bg-[#6C1D5F]" },
            { id: "3", time: "Oct 22, 2023", title: "Announcement", detail: "Mid-term exam results published next week", colorClass: "bg-amber-500" }
          ]);
        }
      } catch (err) {
        console.error("Failed to load student dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Welcome Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6C1D5F] via-[#84117C] to-[#4A1E47] rounded-3xl p-8 text-white shadow-xl shadow-[#6C1D5F]/15">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full border-[32px] border-white rounded-full translate-x-12 translate-y-12" />
        </div>
        <div className="relative z-10 space-y-2.5 max-w-[620px]">
          <Badge className="bg-white/15 border-none text-white hover:bg-white/20 text-[10px] font-bold uppercase py-1 px-3 rounded-full shrink-0">
            ⚡ Welcome Back
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Welcome back, Alex!
          </h2>
          <p className="text-[13.5px] text-white/80 leading-relaxed">
            Today is Thursday, July 2, 2026. You're doing great this term—you have completed 78% of your weekly learning goals!
          </p>
        </div>
      </section>

      {/* ── Quick Stats Grid ── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Attendance */}
        <Card className="bg-white border-slate-200/70 shadow-sm hover:shadow-md transition-all h-[135px]">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Attendance</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <CheckCircle size={16} />
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">94%</h3>
              <Progress value={94} className="h-1.5 mt-2 bg-slate-100" />
            </div>
          </CardContent>
        </Card>

        {/* GPA */}
        <Card className="bg-white border-slate-200/70 shadow-sm hover:shadow-md transition-all h-[135px]">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Current GPA</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <TrendingUp size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">3.8</h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                <ArrowUpRight size={12} /> +0.2 this term
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Courses */}
        <Card className="bg-[#6C1D5F]/5 border-[#6C1D5F]/10 shadow-sm hover:shadow-md transition-all h-[135px]">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[12px] font-bold text-[#6C1D5F] uppercase tracking-wider">My Courses</span>
              <div className="w-8 h-8 rounded-xl bg-[#6C1D5F] text-white flex items-center justify-center shadow-sm shadow-[#6C1D5F]/20">
                <BookOpen size={15} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#6C1D5F] tracking-tight">
                {loading ? "..." : courses.length}
              </h3>
              <p className="text-[11px] text-[#6C1D5F]/70 font-semibold mt-1">
                {courses.length === 1 ? "1 active course" : `${courses.length} active courses`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="bg-white border-slate-200/70 shadow-sm hover:shadow-md transition-all h-[135px] cursor-pointer" onClick={() => navigate("/student/assignments")}>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Pending Tasks</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <AlertCircle size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                {loading ? "..." : (stats.pending + stats.overdue)}
              </h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">
                {stats.overdue > 0 ? `${stats.overdue} overdue task(s)` : "Up to date"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Bento Grid: Course Progress & Timeline ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress */}
        <Card className="lg:col-span-2 bg-white border-slate-200/70 shadow-sm p-6 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-[16px] font-bold text-slate-800">Course Progress</h3>
              <p className="text-[11.5px] text-slate-400">Your current standing and progression</p>
            </div>
            <button
              onClick={() => navigate("/student/courses")}
              className="text-[11.5px] font-bold text-[#6C1D5F] hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-none outline-none"
            >
              View All <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-slate-50 border border-slate-100 rounded-xl h-[80px] p-4" />
              ))
            ) : courses.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">
                No active courses. Navigate to the courses tab to get started.
              </div>
            ) : (
              courses.slice(0, 3).map((c, index) => {
                const progress = [78, 92, 45][index % 3];
                const color = ["#6C1D5F", "#01AC9F", "#FF6200"][index % 3];
                return (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-all flex flex-col justify-between gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[13.5px] font-bold text-slate-800 line-clamp-1">{c.title}</h4>
                        <p className="text-[11px] text-slate-400">{c.category || "General Studies"}</p>
                      </div>
                      <span className="text-[13.5px] font-extrabold" style={{ color }}>
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2 bg-slate-100" />
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Timeline / Recent Activity */}
        <Card className="lg:col-span-1 bg-white border-slate-200/70 shadow-sm p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-800">Recent Activity</h3>
            <p className="text-[11.5px] text-slate-400">Updates and submissions feed</p>
          </div>

          <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-5 py-2 flex-1">
            {activities.map((act) => (
              <div key={act.id} className="relative space-y-0.5">
                <div className={`absolute w-3 h-3 ${act.colorClass} rounded-full -left-[22px] top-1.5 border-2 border-white shadow-sm`} />
                <span className="text-[10px] font-bold text-slate-400">{act.time}</span>
                <p className="text-[12px] font-bold text-slate-700">{act.title}</p>
                <p className="text-[11px] text-slate-400">{act.detail}</p>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full py-2.5 border-slate-200 hover:border-[#6C1D5F] text-[#6C1D5F] hover:bg-[#6C1D5F]/5 rounded-xl text-[12px] font-bold transition-all cursor-pointer h-10"
          >
            View Activity History
          </Button>
        </Card>
      </div>
    </div>
  );
}
