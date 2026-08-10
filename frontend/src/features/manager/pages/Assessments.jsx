import { useState, useEffect } from "react";
import { Award, FileText, CheckCircle2, TrendingUp, Search, Plus, Download, X, Calendar, BookOpen, Clock, BarChart } from "lucide-react";
import api from "@/shared/services/api";

export default function Assessments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [activeAssessments, setActiveAssessments] = useState([
    { id: 1, name: "Advanced React Concepts Q3", course: "Full-Stack Web Architecture", due: "Oct 24, 2026", comp: 86, total: 100, type: "Interactive" },
    { id: 2, name: "AWS Cloud Practitioner Mock", course: "AWS Cloud Deployments", due: "Oct 28, 2026", comp: 12, total: 80, type: "Mock Exam" },
    { id: 3, name: "Leadership Case Analysis", course: "Leadership & Empathy", due: "Nov 02, 2026", comp: 0, total: 35, type: "Case Study" }
  ]);

  const [allAssessments, setAllAssessments] = useState([]);
  const [stats, setStats] = useState({ totalAssessments: 0, activeCount: 0, draftCount: 0, avgPassScore: 75.0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 5;

  const fetchStats = () => {
    api.get("/assessments/stats").then(res => {
      if (res.data && res.data.data) {
        setStats(res.data.data);
      }
    }).catch(() => {});
  };

  const fetchAssessments = () => {
    api.get("/assessments", {
      params: {
        q: searchQuery,
        page: currentPage,
        size: itemsPerPage
      }
    }).then(res => {
      if (res.data && res.data.data) {
        setAllAssessments(res.data.data.content || []);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalElements(res.data.data.totalElements || 0);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchAssessments();
    setCurrentPage(0);
  }, [searchQuery]);

  useEffect(() => {
    fetchAssessments();
  }, [currentPage]);

  const [newAssessment, setNewAssessment] = useState({ name: "", course: "", questions: 20, duration: "45 mins", passScore: "75%", status: "Active" });

  const handleCreateAssessment = (e) => {
    e.preventDefault();
    api.post("/assessments", newAssessment).then(() => {
      fetchStats();
      fetchAssessments();
      setShowCreateModal(false);
      setNewAssessment({ name: "", course: "", questions: 20, duration: "45 mins", passScore: "75%", status: "Active" });
    }).catch(() => {});
  };

  const filteredAssessments = allAssessments;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Assessment Management</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Configure, monitor, and analyze learner performance across enterprise training programs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 cursor-pointer">
            <Download size={13} />
            <span>Export Report</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Assessment</span>
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Total Assessments</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.totalAssessments}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileText size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Active</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.activeCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Calendar size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Draft Templates</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.draftCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Avg. Passing Score</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.avgPassScore}%</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
        </div>
      </div>

      {/* Active Assessments Cards */}
      <div className="space-y-3">
        <h3 className="text-[16px] font-bold text-slate-800">Active Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeAssessments.map((a) => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-primary">{a.type}</span>
                  <span className="text-slate-400 font-bold text-[11px]">Due {a.due}</span>
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 leading-snug">{a.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{a.course}</p>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Completion Progress</span>
                  <span>{a.comp}/{a.total} Learners</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${(a.comp / a.total) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Directory Filter & Search */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assessments..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Assessments Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3">Assessment Name</th>
                <th className="p-3">Course</th>
                <th className="p-3 text-center">Questions</th>
                <th className="p-3 text-center">Time Limit</th>
                <th className="p-3 text-center">Passing Score</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px] text-slate-600">
              {filteredAssessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 font-semibold text-slate-800">{a.name}</td>
                  <td className="p-3 text-slate-500">{a.course}</td>
                  <td className="p-3 text-center font-semibold text-slate-800">{a.questions}</td>
                  <td className="p-3 text-center font-semibold text-slate-800">{a.duration}</td>
                  <td className="p-3 text-center font-semibold text-slate-800">{a.passScore}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${a.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-primary hover:underline cursor-pointer font-semibold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-2 pt-4 border-t border-slate-100 mt-2">
            <span>Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalElements)} of {totalElements} assessments</span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                className="px-3 py-1 rounded border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                className="px-3 py-1 rounded border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative bg-white w-full max-w-[448px] rounded-xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-[16px] font-bold text-slate-800">Create New Assessment</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateAssessment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assessment Name</label>
                <input
                  type="text"
                  required
                  value={newAssessment.name}
                  onChange={(e) => setNewAssessment({ ...newAssessment, name: e.target.value })}
                  placeholder="e.g. AWS Security Quiz"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Associated Course</label>
                <input
                  type="text"
                  required
                  value={newAssessment.course}
                  onChange={(e) => setNewAssessment({ ...newAssessment, course: e.target.value })}
                  placeholder="e.g. AWS Cloud Deployments"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Questions</label>
                  <input
                    type="number"
                    required
                    value={newAssessment.questions}
                    onChange={(e) => setNewAssessment({ ...newAssessment, questions: parseInt(e.target.value) || 20 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration</label>
                  <input
                    type="text"
                    required
                    value={newAssessment.duration}
                    onChange={(e) => setNewAssessment({ ...newAssessment, duration: e.target.value })}
                    placeholder="e.g. 45 mins"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Passing Score</label>
                  <input
                    type="text"
                    required
                    value={newAssessment.passScore}
                    onChange={(e) => setNewAssessment({ ...newAssessment, passScore: e.target.value })}
                    placeholder="e.g. 75%"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-[12px] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[12px] font-semibold cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 size={13} />
                  <span>Create</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
