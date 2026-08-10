import { useState } from "react";
import { Timer, Users, CheckCircle, TrendingUp, Download, Calendar, Filter, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

export default function LearningDashboard() {
  const [filterPeriod, setFilterPeriod] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("");

  const recentActivity = [
    { name: "John Smith", initials: "JS", course: "Advanced UI Design Systems", hours: "24h", progress: 85, dept: "Design", status: "Active" },
    { name: "Maria Davis", initials: "MD", course: "AWS Cloud Architecture", hours: "12h", progress: 100, dept: "Engineering", status: "Completed" },
    { name: "Robert King", initials: "RK", course: "Leadership & Empathy", hours: "8h", progress: 42, dept: "Leadership", status: "Active" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome & Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-slate-900 leading-snug">Admin Insights</h2>
          <p className="text-[13px] text-slate-500">Comprehensive overview of platform learning metrics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 gap-2">
            <Calendar size={14} className="text-slate-400" />
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="border-none bg-transparent p-0 text-[12px] font-medium text-slate-700 focus:ring-0 cursor-pointer outline-none"
            >
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          <button className="flex items-center bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg gap-2 text-[12px] font-semibold hover:bg-slate-50 transition-colors">
            <SlidersHorizontal size={14} className="text-slate-450" />
            <span>Filters</span>
          </button>
          <button className="flex items-center bg-purple-50 border border-primary/20 text-primary px-3 py-1.5 rounded-lg gap-2 text-[12px] font-bold hover:bg-purple-100/60 transition-colors">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Bento Grid - Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-slate-100 text-primary">
              <Timer size={18} />
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold">+12.4%</span>
          </div>
          <div>
            <p className="text-[12px] text-slate-500 font-medium">Total Learning Hours</p>
            <h3 className="text-[21px] font-bold text-slate-900">42,850</h3>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-slate-100 text-primary">
              <Users size={18} />
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold">+5.2%</span>
          </div>
          <div>
            <p className="text-[12px] text-slate-500 font-medium">Active Learners</p>
            <h3 className="text-[21px] font-bold text-slate-900">1,248</h3>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[60%]"></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-slate-100 text-primary">
              <CheckCircle size={18} />
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold">+8.1%</span>
          </div>
          <div>
            <p className="text-[12px] text-slate-500 font-medium">Completed Courses</p>
            <h3 className="text-[21px] font-bold text-slate-900">842</h3>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[85%]"></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-slate-100 text-primary">
              <TrendingUp size={18} />
            </div>
            <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-bold">Stable</span>
          </div>
          <div>
            <p className="text-[12px] text-slate-500 font-medium">Learning Progress</p>
            <h3 className="text-[21px] font-bold text-slate-900">68.5%</h3>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[68%]"></div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Learning Hours */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-[14px] font-bold text-slate-900">Monthly Learning Hours</h4>
              <p className="text-[11px] text-slate-450">Hours spent across all departments</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
              <span className="text-[10px] text-slate-450 font-bold uppercase">Hours</span>
            </div>
          </div>
          <div className="p-6 flex-1 min-h-[260px] flex items-end justify-between gap-3">
            {[
              { month: "JAN", h: "40%" },
              { month: "FEB", h: "60%" },
              { month: "MAR", h: "45%" },
              { month: "APR", h: "75%" },
              { month: "MAY", h: "90%" },
              { month: "JUN", h: "55%" },
              { month: "JUL", h: "100%" }
            ].map((d, i) => (
              <div key={i} className="flex-1 bg-slate-50 h-36 rounded-t-lg relative group">
                <div
                  style={{ height: d.h }}
                  className="absolute inset-x-0 bottom-0 bg-primary rounded-t-lg transition-all group-hover:opacity-80"
                ></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Completion Doughnut */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-4">
          <div>
            <h4 className="text-[14px] font-bold text-slate-900">Course Completion</h4>
            <p className="text-[11px] text-slate-450">Status breakdown</p>
          </div>
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3.2"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6C1D5F" strokeWidth="3.2" strokeDasharray="72, 100" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#84117C" strokeWidth="3.2" strokeDasharray="20, 100" strokeDashoffset="-72" strokeLinecap="round"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#cbd5e1" strokeWidth="3.2" strokeDasharray="8, 100" strokeDashoffset="-92" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[20px] font-bold text-slate-800">84%</span>
              <span className="text-[9px] uppercase font-bold text-slate-400">Success</span>
            </div>
          </div>
          <div className="space-y-2 mt-auto text-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-slate-650">Completed</span>
              </div>
              <span className="font-bold text-slate-800">1,402</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#84117C]"></div>
                <span className="text-slate-650">In Progress</span>
              </div>
              <span className="font-bold text-slate-800">458</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <span className="text-slate-650">Not Started</span>
              </div>
              <span className="font-bold text-slate-800">120</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h4 className="text-[14px] font-bold text-slate-900 mb-4">Learning Distribution</h4>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-450 uppercase">Design</span>
                  <span className="text-slate-700">35%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[35%]"></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-450 uppercase">Engineering</span>
                  <span className="text-slate-700">48%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[48%]"></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-450 uppercase">Leadership</span>
                  <span className="text-slate-700">17%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[17%]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-slate-50 rounded-xl">
              <div className="text-center">
                <p className="text-[36px] font-extrabold text-primary leading-none">12</p>
                <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mt-1.5">Active Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Departments */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h4 className="text-[14px] font-bold text-slate-900 mb-4">Top Departments by Hours</h4>
          <div className="space-y-3">
            {[
              { dept: "Product Design", hours: "1,240h", w: "95%" },
              { dept: "DevOps", hours: "1,080h", w: "82%" },
              { dept: "Sales", hours: "850h", w: "65%" },
              { dept: "QA", hours: "590h", w: "45%" }
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-slate-500 w-24 text-right">{d.dept}</span>
                <div className="flex-1 h-6 bg-slate-50 rounded-r-lg overflow-hidden flex items-center pr-4">
                  <div style={{ width: d.w }} className="bg-[#84117C]/20 hover:bg-[#84117C] h-full rounded-r transition-all"></div>
                  <span className="ml-2.5 text-[9px] font-bold text-slate-800">{d.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Learning Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-150 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-[14px] font-bold text-slate-900">Recent Learning Activity</h4>
            <p className="text-[11px] text-slate-450">Tracking real-time employee engagement</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-4 text-[12px] text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search activities..."
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Employee</th>
                <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Course</th>
                <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Hours</th>
                <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Completion</th>
                <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Department</th>
                <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivity
                .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.course.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((act, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-50 border border-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                          {act.initials}
                        </div>
                        <span className="text-[12px] font-semibold text-slate-800">{act.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-[12px] text-slate-700">{act.course}</td>
                    <td className="p-3 text-[12px] text-slate-500 font-medium">{act.hours}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div style={{ width: `${act.progress}%` }} className="bg-primary h-full"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-700">{act.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-purple-55 text-primary text-[9px] font-bold uppercase tracking-wider">
                        {act.dept}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${act.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-slate-50 flex items-center justify-between border-t border-slate-200">
          <span className="text-[11px] text-slate-400 font-medium">Showing 3 of 1,248 learners</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-slate-450 disabled:opacity-40" disabled>
              <ChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center border border-primary bg-primary text-white rounded text-[11px] font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-[11px] text-slate-650">2</button>
            <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-[11px] text-slate-650">3</button>
            <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-slate-450">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
