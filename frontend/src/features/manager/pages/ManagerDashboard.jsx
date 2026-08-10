import { useState } from "react";
import { PlayCircle, Users, CheckCircle, Clock, AlertTriangle, Calendar, Award, ChevronRight, AlertCircle, Plus, Bell, HelpCircle, Layers } from "lucide-react";

export default function ManagerDashboard() {
  const [timePeriod, setTimePeriod] = useState("Real-time");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-1.5">
            <span>Xebia LMS</span>
            <ChevronRight size={12} className="text-slate-350" />
            <span className="text-primary font-semibold">Dashboard</span>
          </nav>
          <h2 className="text-[26px] font-bold text-primary tracking-tight leading-snug">Manager Overview</h2>
          <p className="text-[13px] text-slate-550 opacity-90">Welcome back, Manager. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setTimePeriod("Real-time")}
              className={`px-3 py-1.5 text-[11px] font-bold rounded transition-all ${
                timePeriod === "Real-time"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Real-time
            </button>
            <button
              onClick={() => setTimePeriod("History")}
              className={`px-3 py-1.5 text-[11px] font-bold rounded transition-all ${
                timePeriod === "History"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              History
            </button>
          </div>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-slate-100 text-primary rounded-lg group-hover:scale-110 transition-transform">
              <PlayCircle size={18} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12%</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Active Courses</p>
          <h3 className="text-[21px] font-bold text-slate-900 mt-1">142</h3>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
              <Users size={18} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+8%</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Total Learners</p>
          <h3 className="text-[21px] font-bold text-slate-900 mt-1">12.5k</h3>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg group-hover:scale-110 transition-transform">
              <CheckCircle size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">84% avg</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Completion Rate</p>
          <h3 className="text-[21px] font-bold text-slate-900 mt-1">76%</h3>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
              <Clock size={18} />
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Urgent</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Pending Approvals</p>
          <h3 className="text-[21px] font-bold text-red-600 mt-1">28</h3>
        </div>

        {/* KPI 5 */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
              <Award size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">98% cap</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Active Trainers</p>
          <h3 className="text-[21px] font-bold text-slate-900 mt-1">42</h3>
        </div>

        {/* KPI 6 */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-slate-100 text-slate-700 rounded-lg group-hover:scale-110 transition-transform">
              <Layers size={18} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Live</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium">Running Batches</p>
          <h3 className="text-[21px] font-bold text-slate-900 mt-1">15</h3>
        </div>
      </div>

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Enrollment Analytics (Line Chart) */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900">Enrollment Analytics</h3>
              <p className="text-[12px] text-slate-450">Tracking growth across all learning sectors</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="text-[11px] font-bold text-primary px-2.5 py-1 bg-purple-50 border border-primary/20 rounded">Weekly</button>
              <button className="text-[11px] font-medium text-slate-500 px-2.5 py-1 hover:bg-slate-50 rounded">Monthly</button>
            </div>
          </div>
          <div className="h-64 w-full bg-slate-50 rounded-lg relative overflow-hidden flex items-end">
            <svg className="w-full h-[85%]" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <path d="M0,250 Q100,200 200,230 T400,100 T600,180 T800,50 T1000,120 L1000,300 L0,300 Z" fill="url(#grad1)"></path>
              <path d="M0,250 Q100,200 200,230 T400,100 T600,180 T800,50 T1000,120" fill="none" stroke="#6d2057" strokeWidth="4"></path>
              <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#6d2057", stopOpacity: 0.25 }}></stop>
                  <stop offset="100%" style={{ stopColor: "#6d2057", stopOpacity: 0 }}></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Content Distribution (Doughnut Chart) */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-[16px] font-bold text-slate-900">Content Distribution</h3>
            <p className="text-[12px] text-slate-450">Engagement by category</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6C1D5F" strokeWidth="3" strokeDasharray="60, 100" strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#01ac9f" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-60" strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#84117C" strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-85" strokeLinecap="round"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[20px] font-bold text-slate-800">2.4k</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total Hours</span>
              </div>
            </div>
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6C1D5F]"></div>
                  <span className="text-slate-650 font-medium">Software Eng.</span>
                </div>
                <span className="font-bold text-slate-800">60%</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#01ac9f]"></div>
                  <span className="text-slate-650 font-medium">Design Ops</span>
                </div>
                <span className="font-bold text-slate-800">25%</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#84117C]"></div>
                  <span className="text-slate-650 font-medium">Soft Skills</span>
                </div>
                <span className="font-bold text-slate-800">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Mix Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (Recruitment Funnel & Alerts) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* Recruitment Funnel */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-slate-900 mb-6">Recruitment Funnel</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span className="text-slate-650">Applications Received</span>
                  <span className="text-slate-800">1,240</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6C1D5F] w-[100%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span className="text-slate-650">Screened & Selected</span>
                  <span className="text-slate-800">820</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#84117C] w-[66%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span className="text-slate-650">Interview Conducted</span>
                  <span className="text-slate-800">340</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-300 w-[27%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span className="text-slate-650">Final Offers Sent</span>
                  <span className="text-slate-800">120</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#01ac9f] w-[10%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent System Alerts */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-slate-900 mb-4">Recent System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 p-3.5 bg-red-50/50 border border-red-100 rounded-lg">
                <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-slate-800">AWS Server Latency (Region: US-East)</p>
                  <p className="text-[10px] text-slate-450 font-medium">2 mins ago • Affecting Batch-12 Video Playback</p>
                </div>
                <button className="text-[11px] font-bold text-red-600 hover:underline">Fix</button>
              </div>
              <div className="flex items-center gap-3.5 p-3.5 bg-purple-50/50 border border-purple-100 rounded-lg">
                <AlertTriangle className="text-primary flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-slate-800">Scheduled Maintenance</p>
                  <p className="text-[10px] text-slate-450 font-medium">4 hours ago • Maintenance window at 02:00 AM</p>
                </div>
                <button className="text-[11px] font-bold text-primary hover:underline">Details</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Trainer Availability & Deadlines) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Trainer Availability */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-bold text-slate-900">Trainer Availability</h3>
              <button className="text-primary text-[12px] font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4.5">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <img className="w-10 h-10 rounded-full object-cover border border-slate-200" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&fit=crop&q=80" alt="Sarah Jenkins" />
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-slate-800">Dr. Sarah Jenkins</p>
                  <p className="text-[11px] text-slate-450 font-medium">UX/UI Specialist</p>
                </div>
                <div className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Available
                </div>
              </div>
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <img className="w-10 h-10 rounded-full object-cover border border-slate-200" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&fit=crop&q=80" alt="Michael Torres" />
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-slate-800">Michael Torres</p>
                  <p className="text-[11px] text-slate-450 font-medium">Full-stack Lead</p>
                </div>
                <div className="px-2.5 py-0.5 bg-slate-105 text-slate-500 rounded-full text-[10px] font-bold">
                  In Session
                </div>
              </div>
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <img className="w-10 h-10 rounded-full object-cover border border-slate-200" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&fit=crop&q=80" alt="David Chen" />
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-slate-800">David Chen</p>
                  <p className="text-[11px] text-slate-450 font-medium">Data Scientist</p>
                </div>
                <div className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Critical Deadlines */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-slate-900 mb-4">Critical Deadlines</h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-50 border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">Quarterly Assessment Upload</p>
                    <p className="text-[10px] text-slate-450 font-medium">32 trainers pending review</p>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 uppercase">Today</span>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border-l-4 border-slate-350">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">Certificate Batch Generation</p>
                    <p className="text-[10px] text-slate-450 font-medium">Batch-A9 Final Exams Complete</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">In 2 days</span>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border-l-4 border-slate-350">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">Course Content Review</p>
                    <p className="text-[10px] text-slate-450 font-medium">Advanced React Patterns v2.1</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">In 4 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
