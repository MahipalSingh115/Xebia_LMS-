import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Download,
  Plus,
  RotateCcw,
  Compass,
  CheckCircle,
  Clock,
  BookOpen,
  FileQuestion,
  Award,
} from "lucide-react";

/* ── X (Twitter) SVG Icon ──────────────────────────────────────── */
function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Confetti Particle Component ───────────────────────────────── */
function ConfettiParticles() {
  const particles = useMemo(() => {
    const colors = [
      "#6C1D5F", "#84117C", "#01AC9F", "#FF6200",
      "#E91E63", "#4CAF50", "#FFC107", "#2196F3",
      "#9C27B0", "#FF5722",
    ];
    const shapes = ["circle", "square", "triangle"];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      shape: shapes[i % shapes.length],
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      size: 4 + Math.random() * 8,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: p.left,
            top: "-20px",
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        >
          {p.shape === "circle" ? (
            <div
              className="rounded-full"
              style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            />
          ) : p.shape === "square" ? (
            <div
              className="rotate-45"
              style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            />
          ) : (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${p.size / 2}px solid transparent`,
                borderRight: `${p.size / 2}px solid transparent`,
                borderBottom: `${p.size}px solid ${p.color}`,
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }
      `}</style>
    </div>
  );
}

/* ── Circular Progress Ring ────────────────────────────────────── */
function CompletionRing() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 300);
    return () => clearTimeout(timer);
  }, []);

  const radius = 52;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-[140px] h-[140px] mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Background ring */}
        <circle
          cx="60" cy="60" r={radius}
          stroke="#e2e8f0" strokeWidth={stroke} fill="none"
        />
        {/* Progress ring */}
        <circle
          cx="60" cy="60" r={radius}
          stroke="#6C1D5F" strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-[2000ms] ease-out"
        />
        {/* Emerald cap at the end */}
        <circle
          cx="60" cy="60" r={radius}
          stroke="#01AC9F" strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (5 / 100) * circumference}
          className="transition-all duration-[2200ms] ease-out"
        />
      </svg>
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#6C1D5F] flex items-center justify-center shadow-lg shadow-[#6C1D5F]/20">
          <Award size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default function StudentCourseCompletion() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const stats = [
    { icon: Clock, value: "48", label: "Hours Learned" },
    { icon: BookOpen, value: "24", label: "Lessons Completed" },
    { icon: FileQuestion, value: "5", label: "Quizzes Passed" },
  ];

  return (
    <div className="max-w-[800px] w-full mx-auto px-6 md:px-8 py-10 space-y-8 animate-fadeIn relative">
      {/* Confetti Animation */}
      <ConfettiParticles />

      {/* ── Completion Icon Ring ────────────────────────────────── */}
      <CompletionRing />

      {/* ── Congratulations Header ─────────────────────────────── */}
      <div className="text-center space-y-3 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#6C1D5F] tracking-tight">
          Congratulations, Alex!
        </h1>
        <p className="text-xl md:text-2xl font-bold text-slate-800">
          You've Mastered Full Stack Development
        </p>
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[12px] font-bold border border-emerald-200">
            <CheckCircle size={14} />
            Course Certified & Verified
          </span>
        </div>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 relative z-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center gap-2 text-center hover:shadow-md transition-all"
            >
              <Icon size={22} className="text-[#6C1D5F]" />
              <span className="text-3xl font-black text-slate-800">{stat.value}</span>
              <span className="text-[11.5px] font-semibold text-slate-400">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* ── Certificate Preview ────────────────────────────────── */}
      <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl p-6 md:p-8 relative z-10">
        <div className="bg-white rounded-xl p-8 md:p-10 text-center space-y-4 border border-slate-200 shadow-inner">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#01AC9F]">
            CERTIFICATE OF EXCELLENCE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Alex Johnson</h2>
          <div className="w-16 h-px bg-slate-200 mx-auto" />
          <p className="text-[13px] text-slate-500 leading-relaxed max-w-[400px] mx-auto">
            has successfully completed the extensive curriculum for
          </p>
          <p className="text-[15px] font-bold text-slate-800">
            Full Stack Web Development Professional Track
          </p>

          {/* Signatures */}
          <div className="flex items-end justify-center gap-12 pt-6">
            <div className="text-center">
              <div className="w-20 h-px bg-slate-300 mb-1" />
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                Academic Dean
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
              <CheckCircle size={18} className="text-emerald-500" />
            </div>
            <div className="text-center">
              <div className="w-20 h-px bg-slate-300 mb-1" />
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                Course Lead
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
          <div>
            <p className="text-[14px] font-bold text-white">Official Certification</p>
            <p className="text-[11.5px] text-slate-400">ID: LL-2024-FS-998231</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6C1D5F] text-white text-[12px] font-bold hover:bg-[#521347] transition-all cursor-pointer border-none outline-none shadow-sm">
              <Download size={14} />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-700 text-[12px] font-bold hover:bg-slate-50 transition-all cursor-pointer border border-slate-200 outline-none">
              <Plus size={14} />
              Add to LinkedIn
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all cursor-pointer outline-none">
              <XIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        <button
          onClick={() => navigate(`/student/courses/${courseId}`)}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center gap-2 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer outline-none text-center"
        >
          <RotateCcw size={22} className="text-slate-500" />
          <span className="text-[14px] font-bold text-slate-800">Retake Course</span>
          <span className="text-[11.5px] text-slate-400">Review concepts and modules</span>
        </button>
        <button
          onClick={() => navigate("/student/courses")}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center gap-2 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer outline-none text-center"
        >
          <Compass size={22} className="text-slate-500" />
          <span className="text-[14px] font-bold text-slate-800">Explore Similar Courses</span>
          <span className="text-[11.5px] text-slate-400">Continue your learning path</span>
        </button>
      </div>
    </div>
  );
}
