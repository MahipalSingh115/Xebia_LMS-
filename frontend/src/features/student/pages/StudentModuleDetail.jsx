import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Lock,
  Clock,
  FileText,
  PlayCircle,
  Star,
  MessageSquare,
  Sparkles,
  BookOpen,
  ClipboardList,
  Download,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────────────── */
const MODULE_DATA = {
  number: 2,
  category: "ADVANCED CORE",
  title: "Module 2: Advanced React Patterns",
  description:
    "Master the art of scalable React application architecture. We dive deep into custom hook encapsulation, higher-order components, and advanced state management strategies used by elite engineering teams.",
  duration: "8h Total",
  completion: "24% Overall",
  progress: 68,
  lessonsComplete: 12,
  totalLessons: 18,
  xpEarned: 420,
  totalXp: 600,
  lastAccessed: "2h ago",
  nextUp: "2.2 Patterns Quiz",
};

const OBJECTIVES = [
  "Implement and test complex Custom Hooks for logic reuse across multiple components.",
  "Architect applications using Render Props and Compound Components patterns.",
  "Master Context API for global state management with performance optimization.",
];

const LESSONS = [
  {
    id: "2.1",
    title: "Custom Hooks",
    type: "Video Lesson",
    typeIcon: "video",
    duration: "12:45",
    status: "completed",
  },
  {
    id: "2.2",
    title: "Patterns Quiz",
    type: "Module Quiz",
    typeIcon: "quiz",
    duration: "15m",
    status: "locked",
    lockMessage: "Complete previous to unlock",
  },
  {
    id: "2.3",
    title: "Context API Deep Dive",
    type: "PDF Resource",
    typeIcon: "pdf",
    duration: "5mb",
    status: "locked",
  },
  {
    id: "2.4",
    title: "Render Props Pattern",
    type: "Video Lesson",
    typeIcon: "video",
    duration: "18:30",
    status: "locked",
  },
  {
    id: "2.5",
    title: "Compound Components",
    type: "Video Lesson",
    typeIcon: "video",
    duration: "22:15",
    status: "locked",
  },
];

const INSTRUCTOR = {
  name: "Alex Riverdale",
  role: "LEAD INSTRUCTOR",
  avatar: null,
};

export default function StudentModuleDetail() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const getTypeIcon = (typeIcon) => {
    switch (typeIcon) {
      case "video":
        return <PlayCircle size={13} className="text-slate-400" />;
      case "quiz":
        return <ClipboardList size={13} className="text-slate-400" />;
      case "pdf":
        return <FileText size={13} className="text-slate-400" />;
      default:
        return <BookOpen size={13} className="text-slate-400" />;
    }
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column ────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Module Header */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6C1D5F]/10 text-[#6C1D5F] px-2.5 py-1 rounded-md">
                MODULE {MODULE_DATA.number}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {MODULE_DATA.category}
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
              {MODULE_DATA.title}
            </h1>

            <p className="text-[13.5px] text-slate-500 leading-relaxed">{MODULE_DATA.description}</p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Duration
                  </span>
                  <span className="text-[14px] font-bold text-slate-800">{MODULE_DATA.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className="text-slate-400" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Completion
                  </span>
                  <span className="text-[14px] font-bold text-slate-800">{MODULE_DATA.completion}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
            <h2 className="text-[17px] font-bold text-slate-800">Learning Objectives</h2>
            <div className="space-y-3">
              {OBJECTIVES.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Timeline */}
          <div className="space-y-4">
            <h2 className="text-[17px] font-bold text-slate-800">Lesson Timeline</h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100" />

              <div className="space-y-1">
                {LESSONS.map((lesson, idx) => {
                  const isCompleted = lesson.status === "completed";
                  const isLocked = lesson.status === "locked";

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        if (!isLocked) {
                          navigate(
                            `/student/courses/${courseId}/modules/${moduleId}/lessons/${idx + 1}`
                          );
                        }
                      }}
                      className={`w-full relative flex items-center gap-4 pl-1 pr-4 py-4 rounded-xl text-left bg-transparent border-none outline-none transition-all ${
                        isLocked
                          ? "opacity-70 cursor-default"
                          : "hover:bg-slate-50 cursor-pointer"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 shrink-0">
                        {isCompleted ? (
                          <div className="w-[30px] h-[30px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                        ) : (
                          <div className="w-[30px] h-[30px] rounded-full bg-slate-200 flex items-center justify-center">
                            <Lock size={14} className="text-slate-400" />
                          </div>
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-[14px] font-bold ${
                              isLocked ? "text-slate-400" : "text-slate-800"
                            }`}
                          >
                            {lesson.id} {lesson.title}
                          </h3>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isCompleted
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-50 text-slate-400 border border-slate-200"
                            }`}
                          >
                            {isCompleted ? "COMPLETED" : "LOCKED"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-[11.5px] text-slate-400">
                          {getTypeIcon(lesson.typeIcon)}
                          <span>{lesson.type}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {lesson.duration}
                          </span>
                        </div>
                        {lesson.lockMessage && (
                          <p className="text-[11px] text-amber-600 font-medium mt-1 flex items-center gap-1">
                            <Sparkles size={11} />
                            {lesson.lockMessage}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Sidebar ──────────────────────────────── */}
        <div className="space-y-5">
          {/* Continue Learning CTA */}
          <button
            onClick={() =>
              navigate(`/student/courses/${courseId}/modules/${moduleId}/lessons/1`)
            }
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#6C1D5F] text-white text-[14px] font-bold hover:bg-[#521347] transition-all cursor-pointer border-none outline-none shadow-lg shadow-[#6C1D5F]/20"
          >
            Continue Learning
            <ArrowRight size={18} />
          </button>

          {/* Last accessed / Next up */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-slate-500 font-medium">Last accessed</span>
              <span className="font-bold text-slate-800">{MODULE_DATA.lastAccessed}</span>
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-slate-500 font-medium">Next up</span>
              <span className="font-bold text-slate-800">{MODULE_DATA.nextUp}</span>
            </div>
          </div>

          {/* Course Progress Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-slate-800">Course Progress</h3>
              <span className="text-[16px] font-black text-[#6C1D5F]">{MODULE_DATA.progress}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#01AC9F] transition-all duration-700"
                style={{ width: `${MODULE_DATA.progress}%` }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12.5px]">
                <CheckCircle size={15} className="text-emerald-500" />
                <span className="text-slate-600 font-medium">
                  {MODULE_DATA.lessonsComplete}/{MODULE_DATA.totalLessons} Lessons Complete
                </span>
              </div>
              <div className="flex items-center gap-2 text-[12.5px]">
                <Star size={15} className="text-amber-500" />
                <span className="text-slate-600 font-medium">
                  {MODULE_DATA.xpEarned}/{MODULE_DATA.totalXp} XP Earned
                </span>
              </div>
            </div>
          </div>

          {/* Lead Instructor */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6C1D5F] to-[#84117C] flex items-center justify-center text-white font-bold text-[14px] shrink-0">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                {INSTRUCTOR.role}
              </span>
              <span className="text-[14px] font-bold text-slate-800">{INSTRUCTOR.name}</span>
            </div>
            <button className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6C1D5F] hover:border-[#6C1D5F]/30 transition-all cursor-pointer bg-transparent outline-none">
              <MessageSquare size={16} />
            </button>
          </div>

          {/* AI Module Summary */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-800 text-white text-[13px] font-bold hover:bg-slate-700 transition-all cursor-pointer border-none outline-none">
            <Sparkles size={16} />
            AI Module Summary
          </button>
        </div>
      </div>
    </div>
  );
}
