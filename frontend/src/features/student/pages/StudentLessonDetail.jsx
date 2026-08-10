import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Lock,
  Clock,
  TrendingUp,
  Target,
  Sparkles,
  FileText,
  MessageSquare,
  PlayCircle,
  ChevronRight,
  AlignLeft,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────────────── */
const LESSON = {
  id: "2.1",
  title: "Custom Hooks & Performance Optimization",
  description:
    "Learn how to extract component logic into reusable functions and implement useMemo and useCallback to prevent unnecessary re-renders in complex React applications.",
};

const TABS = ["Overview", "Resources", "Notes", "Discussion", "Q&A"];

const OVERVIEW_CARDS = [
  {
    icon: TrendingUp,
    iconColor: "text-[#6C1D5F]",
    iconBg: "bg-[#6C1D5F]/10",
    title: "Skill Level",
    description: "Advanced React Patterns & Performance",
  },
  {
    icon: Clock,
    iconColor: "text-[#01AC9F]",
    iconBg: "bg-[#01AC9F]/10",
    title: "Time Invested",
    description: "45 mins remaining of 2.5 hours total",
  },
  {
    icon: Target,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "Learning Goal",
    description: "Mastering Memoization & State Lifting",
  },
];

const AI_SUMMARY =
  "In this module, we dive deep into the architecture of React components. Key takeaways include the difference between logic-heavy hooks and presentation-only components. You'll learn to identify performance bottlenecks using React DevTools and how to strategically apply useMemo only where necessary to avoid the overhead of unnecessary memoization.";

const MODULE_LESSONS = [
  { id: "1.9", title: "useRef and ...", duration: "12:04", status: "completed" },
  { id: "2.1", title: "Custom Ho...", duration: "18:20", status: "current" },
  { id: "2.2", title: "Render Pro...", duration: "15:55", status: "locked" },
  { id: "2.3", title: "High Order ...", duration: "22:10", status: "locked" },
];

const COURSE_PROGRESS = {
  percent: 70,
  title: "Advanced React",
  completedLessons: 14,
  totalLessons: 20,
};

export default function StudentLessonDetail() {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 py-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Main Content ─────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Area */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px),
                                    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px)`,
                }}
              />
              {/* Code-like imagery */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="text-center space-y-2">
                  <div className="flex gap-2 justify-center">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="font-mono text-xs text-emerald-400 space-y-1 mt-4 text-left">
                    <p>{"const useCustomHook = () => {"}</p>
                    <p className="pl-4">{"const [state, setState] = useState();"}</p>
                    <p className="pl-4">{"return useMemo(() => state, [state]);"}</p>
                    <p>{"};"}</p>
                  </div>
                </div>
              </div>
              {/* Play button */}
              <button className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer border-none outline-none group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <PlayCircle size={24} className="text-[#6C1D5F] ml-0.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Lesson Title + Actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-tight">
                {LESSON.id} {LESSON.title}
              </h1>
              <p className="text-[13px] text-slate-500 leading-relaxed max-w-[500px]">
                {LESSON.description}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-[12px] font-bold hover:bg-slate-50 transition-all cursor-pointer outline-none">
                <AlignLeft size={15} />
                Take Notes
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6C1D5F] text-white text-[12px] font-bold hover:bg-[#521347] transition-all cursor-pointer border-none outline-none shadow-sm shadow-[#6C1D5F]/15">
                <CheckCircle size={15} />
                Mark Complete
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[13px] font-semibold border-b-2 transition-all cursor-pointer bg-transparent outline-none ${
                    activeTab === tab
                      ? "border-[#6C1D5F] text-[#6C1D5F]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OVERVIEW_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                          <Icon size={16} className={card.iconColor} />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">{card.title}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-relaxed">{card.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* AI Summary */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-bold text-slate-800">AI Summary</h3>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6C1D5F] text-white text-[11px] font-bold hover:bg-[#521347] transition-all cursor-pointer border-none outline-none">
                    <Sparkles size={12} />
                    Regenerate
                  </button>
                </div>
                <p className="text-[13.5px] text-slate-600 leading-relaxed">
                  {AI_SUMMARY.split("useMemo").map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <React.Fragment key={i}>
                        {part}
                        <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[#6C1D5F] text-[12.5px] font-mono font-semibold border border-slate-200">
                          useMemo
                        </code>
                      </React.Fragment>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            </div>
          )}

          {activeTab === "Resources" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center">
              <FileText size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-[14px] font-bold text-slate-700">Resources</p>
              <p className="text-[12px] text-slate-400 mt-1">
                Downloadable materials and supplementary content will appear here.
              </p>
            </div>
          )}

          {activeTab === "Notes" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center">
              <AlignLeft size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-[14px] font-bold text-slate-700">Your Notes</p>
              <p className="text-[12px] text-slate-400 mt-1">
                Take notes while watching lessons. They'll be saved automatically.
              </p>
            </div>
          )}

          {activeTab === "Discussion" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center">
              <MessageSquare size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-[14px] font-bold text-slate-700">Discussion Forum</p>
              <p className="text-[12px] text-slate-400 mt-1">
                Share thoughts and interact with fellow learners.
              </p>
            </div>
          )}

          {activeTab === "Q&A" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center">
              <MessageSquare size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-[14px] font-bold text-slate-700">Questions & Answers</p>
              <p className="text-[12px] text-slate-400 mt-1">
                Ask questions about this lesson and get answers from instructors.
              </p>
            </div>
          )}
        </div>

        {/* ── Right Column: Sidebar ──────────────────────────────── */}
        <div className="space-y-5">
          {/* Course Progress */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-[14px] font-bold text-slate-800">Course Progress</h3>

            <div className="flex items-center gap-4">
              {/* Circular progress indicator */}
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle
                    cx="32" cy="32" r="26"
                    stroke="#e2e8f0" strokeWidth="5" fill="none"
                  />
                  <circle
                    cx="32" cy="32" r="26"
                    stroke="#6C1D5F" strokeWidth="5" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - COURSE_PROGRESS.percent / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[13px] font-black text-slate-800">
                    {COURSE_PROGRESS.percent}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">{COURSE_PROGRESS.title}</p>
                <p className="text-[11.5px] text-slate-400">
                  {COURSE_PROGRESS.completedLessons} of {COURSE_PROGRESS.totalLessons} lessons done
                </p>
              </div>
            </div>
          </div>

          {/* Module Lessons List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-2">
              MODULE 2: ADVANCED HOOKS
            </p>

            {MODULE_LESSONS.map((lesson) => {
              const isCurrent = lesson.status === "current";
              const isCompleted = lesson.status === "completed";
              const isLocked = lesson.status === "locked";

              return (
                <button
                  key={lesson.id}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all bg-transparent border-none outline-none ${
                    isCurrent
                      ? "bg-[#6C1D5F] text-white cursor-pointer"
                      : isLocked
                      ? "text-slate-400 cursor-default"
                      : "text-slate-700 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  ) : (
                    <Lock size={14} className="text-slate-300 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[12px] font-semibold truncate ${
                        isCurrent ? "text-white" : isLocked ? "text-slate-400" : "text-slate-700"
                      }`}
                    >
                      {lesson.id} {lesson.title}
                    </p>
                    <p
                      className={`text-[10px] ${
                        isCurrent ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {lesson.duration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* AI Assistant Floating Button */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 text-slate-700 text-[13px] font-bold hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 outline-none">
            <MessageSquare size={16} />
            Ask AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
