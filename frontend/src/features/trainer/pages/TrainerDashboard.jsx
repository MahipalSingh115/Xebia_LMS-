import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Award,
  Users,
  Layers,
  HelpCircle,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  Inbox,
  UserCheck
} from "lucide-react";
import AppLayout from "@/app/layouts/AppLayout";
import assignmentService from "@/features/assignments/services/assignmentService";
import quizService from "@/features/quizzes/services/quizService";

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [quizStats, setQuizStats] = useState(null);
  const [gradebookStats, setGradebookStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [assignmentsData, batchesData, submissionsData, quizStatsData, gradebookStatsData] = await Promise.all([
          assignmentService.getAssignments().catch(() => []),
          assignmentService.getBatches().catch(() => []),
          assignmentService.getSubmissions().catch(() => []),
          quizService.getQuizStats().catch(() => null),
          assignmentService.getGradebookStats().catch(() => null)
        ]);

        setAssignments(assignmentsData || []);
        setBatches(batchesData || []);
        setSubmissions(submissionsData || []);
        setQuizStats(quizStatsData);
        setGradebookStats(gradebookStatsData);
      } catch (error) {
        console.error("Error loading trainer metrics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter pending review submissions (Submitted/Pending)
  const pendingSubmissions = useMemo(() => {
    return submissions.filter(
      (s) => s.status === "Submitted" || s.status === "Pending"
    ).slice(0, 5); // limit to top 5
  }, [submissions]);

  // Compute stats card values
  const stats = useMemo(() => {
    return [
      {
        label: "Active Batches",
        value: batches.length,
        description: `${batches.filter(b => b.status === "Active").length} Currently running`,
        icon: Layers,
        color: "from-blue-500 to-indigo-600",
        bgLight: "bg-blue-50/50",
        iconColor: "text-blue-600"
      },
      {
        label: "Assignments Posted",
        value: assignments.length,
        description: `${assignments.filter(a => a.status === "Active").length} Live assignments`,
        icon: BookOpen,
        color: "from-[#6C1D5F] to-[#9E2B8C]",
        bgLight: "bg-[#6C1D5F]/5",
        iconColor: "text-[#6C1D5F]"
      },
      {
        label: "Submissions Pending",
        value: gradebookStats?.pending ?? 0,
        description: "Awaiting your evaluation",
        icon: Inbox,
        color: "from-amber-500 to-orange-600",
        bgLight: "bg-amber-50/50",
        iconColor: "text-amber-600",
        badge: (gradebookStats?.pending ?? 0) > 0 ? "Needs Action" : null
      },
      {
        label: "Quiz Average Score",
        value: quizStats?.avgScorePercent ?? "0%",
        description: `Across ${quizStats?.total ?? 0} published quizzes`,
        icon: Award,
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50/50",
        iconColor: "text-emerald-600"
      }
    ];
  }, [batches, assignments, gradebookStats, quizStats]);

  const quickActions = [
    {
      title: "Create Assignment",
      desc: "Post a new homework, assessment, or lab case study",
      path: "/trainer/assignments/create",
      icon: Plus,
      color: "border-[#6C1D5F]/20 hover:border-[#6C1D5F] text-[#6C1D5F] hover:bg-[#6C1D5F]/5"
    },
    {
      title: "Create Quiz",
      desc: "Build manual questionnaires or import questions from Excel",
      path: "/trainer/quizzes",
      icon: HelpCircle,
      color: "border-indigo-100 hover:border-indigo-500 text-indigo-600 hover:bg-indigo-50/50"
    },
    {
      title: "Add New Batch",
      desc: "Initialize a new course cohort and configure capacity",
      path: "/trainer/batches/create",
      icon: Layers,
      color: "border-blue-100 hover:border-blue-500 text-blue-600 hover:bg-blue-50/50"
    },
    {
      title: "Review Gradebook",
      desc: "Complete pending grading cycles and analyze score logs",
      path: "/trainer/gradebook",
      icon: TrophyPlaceholder,
      color: "border-emerald-100 hover:border-emerald-500 text-emerald-600 hover:bg-emerald-50/50"
    }
  ];

  function TrophyPlaceholder(props) {
    return <Award {...props} />;
  }

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6 pb-12 animate-fadeIn">
        {/* Header greeting */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6C1D5F] via-[#851C74] to-[#A01E89] p-8 text-white shadow-md">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-12 bottom-0 translate-y-24 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          
          <div className="relative z-10 space-y-2.5 max-w-[620px]">
            <span className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Trainer Workspace
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, Instructor! 🎓
            </h1>
            <p className="text-[13.5px] text-white/80 leading-relaxed max-w-[550px]">
              Track course activities, review student submissions, and dispatch new assignments or quizzes to your active cohorts.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-black text-slate-800">
                      {loading ? "..." : stat.value}
                    </h3>
                  </div>
                  <div className={`p-2.5 rounded-lg ${stat.bgLight} ${stat.iconColor}`}>
                    <Icon size={20} />
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{stat.description}</span>
                  {stat.badge && (
                    <span className="bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full border border-rose-100 uppercase tracking-wider text-[9px] animate-pulse">
                      {stat.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action and Pending Evaluation Panels */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Quick Actions Panel */}
          <div className="xl:col-span-1 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase tracking-wider text-slate-400 text-[11px]">
              Shortcut Actions
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    onClick={() => navigate(action.path)}
                    className={`flex items-start gap-4 p-4 rounded-xl border bg-white text-left transition-all duration-200 cursor-pointer shadow-sm group hover:shadow ${action.color}`}
                  >
                    <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-transparent shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:text-inherit">
                        {action.title}
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </h3>
                      <p className="text-[10.5px] text-slate-400 font-normal leading-normal whitespace-normal">
                        {action.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pending Submissions / Tasks Panel */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase tracking-wider text-slate-400 text-[11px]">
                Pending Evaluations ({pendingSubmissions.length})
              </h2>
              {submissions.length > 0 && (
                <button
                  onClick={() => navigate("/trainer/gradebook")}
                  className="text-[11px] font-bold text-[#6C1D5F] hover:text-[#4A1E47] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  View Gradebook <ArrowRight size={12} />
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-slate-400 text-xs">Loading submissions...</div>
              ) : pendingSubmissions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle size={20} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-700">All submissions graded!</h3>
                  <p className="text-[11px] text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                    You have cleared the grading queue. Any new assignment submissions will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          {sub.studentAvatar ? (
                            <img src={sub.studentAvatar} alt={sub.studentName} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Users size={14} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-700">{sub.studentName}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">
                            Submitted <span className="font-semibold text-slate-500">{sub.assignmentTitle}</span> • {sub.batch}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                          <Clock size={11} />
                          {sub.submittedAt || "Recent"}
                        </div>
                        <button
                          onClick={() => navigate(`/trainer/assignments/review/${sub.id}`)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#6C1D5F] bg-white text-[11px] font-bold text-[#6C1D5F] hover:bg-[#6C1D5F]/5 transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          Grade Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Batches Overview Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase tracking-wider text-slate-400 text-[11px]">
              Active Batches Overview
            </h2>
            <button
              onClick={() => navigate("/trainer/batches")}
              className="text-[11px] font-bold text-[#6C1D5F] hover:text-[#4A1E47] transition-colors flex items-center gap-1 cursor-pointer"
            >
              Manage Batches <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full py-8 text-center text-slate-400 text-xs">Loading batches...</div>
            ) : batches.length === 0 ? (
              <div className="col-span-full py-12 bg-white rounded-xl border border-slate-200/80 text-center text-slate-400 text-xs">
                No active cohorts found. Click "Add New Batch" to get started.
              </div>
            ) : (
              batches.slice(0, 3).map((batch) => {
                const percent = Math.min(100, Math.round((batch.enrolled / (batch.capacity || 1)) * 100));
                return (
                  <div
                    key={batch.id}
                    className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#6C1D5F]/10 text-[#6C1D5F] text-[9px] font-bold px-2 py-0.5 rounded border border-[#6C1D5F]/10">
                          {batch.id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">{batch.status}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-700 pt-1 line-clamp-1">{batch.name}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal line-clamp-1">{batch.title || batch.course}</p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                        <span>Cohort Capacity</span>
                        <span className="text-slate-650">{batch.enrolled} / {batch.capacity} Students</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#6C1D5F] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
