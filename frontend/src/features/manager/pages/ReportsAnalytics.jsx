import { useState } from "react";
import { FileText, Download, FileSpreadsheet, Calendar, AlertCircle, BarChart3, TrendingUp, RefreshCw, File } from "lucide-react";

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [exportMessage, setExportMessage] = useState("");

  const handleExport = (type) => {
    setExportMessage(`Generating export for ${type}...`);
    setTimeout(() => {
      setExportMessage(`Successfully exported report as ${type}!`);
      setTimeout(() => setExportMessage(""), 3000);
    }, 1500);
  };

  const reports = [
    { name: "Monthly Learner Engagement", format: "PDF", size: "2.4 MB", date: "Jul 05, 2026", status: "Ready" },
    { name: "Q2 Skills Matrix Matrix Analysis", format: "CSV", size: "512 KB", date: "Jun 30, 2026", status: "Ready" },
    { name: "Executive Platform Budgeting", format: "PDF", size: "4.1 MB", date: "Jun 15, 2026", status: "Ready" },
    { name: "Fresher Journey Onboarding Log", format: "CSV", size: "1.2 MB", date: "May 28, 2026", status: "Archived" }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Export Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-primary mb-1">Reports Overview</h2>
          <p className="text-slate-500 text-[13px]">Real-time performance metrics and institutional analytics.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("PDF")}
            className="px-3.5 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700 hover:bg-slate-50 transition-all text-[12px] font-semibold"
          >
            <FileText size={14} className="text-red-500" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => handleExport("CSV")}
            className="px-3.5 py-1.5 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700 hover:bg-slate-50 transition-all text-[12px] font-semibold"
          >
            <FileSpreadsheet size={14} className="text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Export Notifications */}
      {exportMessage && (
        <div className="p-3 bg-purple-50 text-primary border border-primary/10 rounded-lg text-[12px] font-bold flex items-center gap-2 animate-pulse">
          <RefreshCw size={14} className="animate-spin" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        {["Overview", "Course Activity", "Learner Performance", "Financials"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 px-1 text-[13px] font-semibold border-b-2 transition-all ${
              activeTab === tab
                ? "text-primary border-primary font-bold"
                : "text-slate-450 border-transparent hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-primary rounded-lg">
              <BarChart3 size={18} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12.5%</span>
          </div>
          <p className="text-slate-500 text-[12px] mb-1 font-semibold">Total Reports</p>
          <h3 className="text-[22px] font-extrabold text-slate-800">1,284</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp size={18} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+4.2%</span>
          </div>
          <p className="text-slate-500 text-[12px] mb-1 font-semibold">Generated Reports</p>
          <h3 className="text-[22px] font-extrabold text-slate-800">8,421</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Download size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">0.0%</span>
          </div>
          <p className="text-slate-500 text-[12px] mb-1 font-semibold">Total Downloads</p>
          <h3 className="text-[22px] font-extrabold text-slate-800">42,019</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:scale-[1.02] transition-transform">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <Calendar size={18} />
            </div>
            <span className="text-[10px] font-bold text-red-650 bg-red-50 px-1.5 py-0.5 rounded">-2.1%</span>
          </div>
          <p className="text-slate-500 text-[12px] mb-1 font-semibold">Scheduled Reports</p>
          <h3 className="text-[22px] font-extrabold text-slate-800">156</h3>
        </div>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Course Performance Analysis Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[14px] font-bold text-slate-800">Course Performance Analysis</h4>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#84117C] bg-purple-50 px-2.5 py-1 rounded">
              Last 6 Months
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[
              { label: "Jan", val: "60%", h: "60%" },
              { label: "Feb", val: "45%", h: "45%" },
              { label: "Mar", val: "85%", h: "85%" },
              { label: "Apr", val: "70%", h: "70%" },
              { label: "May", val: "95%", h: "95%" },
              { label: "Jun", val: "50%", h: "50%" }
            ].map((col, idx) => (
              <div key={idx} className="w-full bg-slate-50 rounded-t-lg relative group h-48 flex items-end">
                <div
                  style={{ height: col.h }}
                  className="w-full bg-[#84117C]/20 group-hover:bg-[#84117C] rounded-t-lg relative transition-all duration-300"
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                    {col.val}
                  </div>
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Generated List */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-[14px] font-bold text-slate-800 mb-4">Recent Reports</h4>
            <div className="space-y-3">
              {reports.map((r, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="p-2 rounded bg-red-50 text-red-500">
                    <File size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-slate-800 truncate">{r.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{r.date} • {r.size}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    r.status === "Ready"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center py-2 border border-dashed border-slate-200 rounded-lg text-[11px] font-bold text-slate-400 hover:text-slate-650 hover:border-slate-350 transition-all mt-4">
            + Schedule New Report
          </button>
        </div>
      </div>
    </div>
  );
}
