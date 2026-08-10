import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Award,
  Flame,
  Brain,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import studentService from "@/features/student/services/studentService";

export default function StudentAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentService.getAnalytics();
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve student analytics metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded" />
        <div className="h-4 w-64 bg-slate-100 rounded mt-2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="h-32 bg-white rounded-2xl border border-slate-200" />
          <div className="h-32 bg-white rounded-2xl border border-slate-200" />
          <div className="h-32 bg-white rounded-2xl border border-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-12 text-center space-y-4">
        <p className="text-red-650 font-semibold">{error || "Something went wrong"}</p>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-[#6C1D5F] text-white rounded-xl text-xs font-bold cursor-pointer border-none"
        >
          Retry
        </button>
      </div>
    );
  }

  const { trendData, attendanceData, marksData, skillsData, kpis, insights } = data;

  return (
    <div className="max-w-[1000px] w-full mx-auto px-6 md:px-8 py-8 space-y-8 animate-fadeIn">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Analytics Overview</h2>
          <p className="text-[13px] text-slate-400 mt-1">Track your academic progress and skill development.</p>
        </div>
      </div>

      {/* ── Top Stats Row ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GPA */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full blur-xl group-hover:bg-purple-100/50 transition-colors" />
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Current GPA</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#6C1D5F] tracking-tight">{kpis.gpa}</span>
            <span className="text-[13px] text-slate-400 font-bold">/ 4.0</span>
          </div>
          <div className="flex items-center gap-0.5 text-emerald-600 mt-1.5 font-bold text-[10.5px]">
            <TrendingUp size={12} /> {kpis.gpaDiff} from last term
          </div>
        </div>

        {/* Credits */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-50 rounded-full blur-xl group-hover:bg-teal-100/50 transition-colors" />
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Credits Earned</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{kpis.credits}</span>
            <span className="text-[13px] text-slate-400 font-bold">/ {kpis.creditsTotal}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[#01AC9F] rounded-full" style={{ width: kpis.creditsPercent }} />
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between h-[130px] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full blur-xl group-hover:bg-orange-100/50 transition-colors" />
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Study Streak</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#FF6200] tracking-tight">{kpis.studyStreak}</span>
            <span className="text-[13px] text-slate-400 font-bold">Days</span>
          </div>
          <div className="flex items-center gap-1 text-[#FF6200] mt-1.5 font-bold text-[10.5px]">
            <Flame size={13} fill="currentColor" /> Keep it up!
          </div>
        </div>
      </section>

      {/* ── Bento Grid: Recharts Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[14.5px] text-slate-850">Performance Trend</h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last 6 Months</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0F172A",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#6C1D5F"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4 relative">
          <h3 className="font-bold text-[14.5px] text-slate-855">Attendance Overview</h3>
          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">92%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Present</span>
            </div>
          </div>
        </div>

        {/* Marks per Subject */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4">
          <h3 className="font-bold text-[14.5px] text-slate-855">Marks per Subject</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="subject" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0F172A",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {marksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col space-y-4">
          <h3 className="font-bold text-[14.5px] text-slate-850">Skill Strength</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillsData}>
                <PolarGrid stroke="#F1F5F9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "#94A3B8", fontSize: 9 }} />
                <Radar name="Srikar" dataKey="A" stroke="#84117C" fill="#84117C" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── AI Insights Banner ── */}
      <section className="bg-gradient-to-r from-[#6C1D5F]/5 via-[#84117C]/5 to-[#6C1D5F]/5 rounded-3xl p-[1px]">
        <div className="bg-white rounded-[23px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C1D5F] to-[#84117C] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#6C1D5F]/10">
              <Brain size={20} />
            </div>
            <div>
              <h4 className="font-bold text-[14.5px] text-slate-800">AI Performance Insight</h4>
              <p className="text-[12.5px] text-slate-500 leading-relaxed max-w-[620px] mt-0.5">
                {insights?.performanceText}
              </p>
            </div>
          </div>
          <button className="bg-[#6c1d5f] hover:bg-[#521347] text-white font-bold px-4.5 py-2 rounded-xl text-[12px] shadow-sm shadow-[#6C1D5F]/15 shrink-0 transition-colors cursor-pointer border-none outline-none">
            View Recommendations
          </button>
        </div>
      </section>
    </div>
  );
}
