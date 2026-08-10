import { useState, useEffect } from "react";
import { Users, Activity, BookOpen, Star, Grid, List, Search, Filter, Plus, ChevronRight, CheckCircle2, X } from "lucide-react";
import api from "@/shared/services/api";

export default function TrainersManagement() {
  const [viewMode, setViewMode] = useState("grid"); // grid | table
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [trainers, setTrainers] = useState([]);
  const [stats, setStats] = useState({ totalTrainers: 0, activeTrainers: 0, totalCoursesAssigned: 0, averageRating: 0.0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    api.get("/trainers/stats").then(response => {
      if (response.data && response.data.data) {
        setStats(response.data.data);
      }
    }).catch(() => {});
  }, [showAddModal]);

  useEffect(() => {
    api.get("/trainers", {
      params: {
        q: searchQuery,
        status: statusFilter,
        page: currentPage,
        size: itemsPerPage
      }
    }).then(response => {
      if (response.data && response.data.data) {
        const pageData = response.data.data;
        setTotalPages(pageData.totalPages || 1);
        setTotalElements(pageData.totalElements || 0);
        setTrainers(pageData.content || []);
      }
    }).catch(() => {});
  }, [searchQuery, statusFilter, currentPage, showAddModal]);

  const [newTrainer, setNewTrainer] = useState({ name: "", email: "", role: "", dept: "", courses: 1, learners: 0, rating: 5.0, status: "Active" });

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(0);
  };

  const handleStatusFilterChange = (val) => {
    setStatusFilter(val);
    setCurrentPage(0);
  };

  const filteredTrainers = trainers;

  const handleAddTrainer = (e) => {
    e.preventDefault();
    const trainerData = {
      ...newTrainer,
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    };
    api.post("/trainers", trainerData).then(() => {
      setShowAddModal(false);
      setNewTrainer({ name: "", email: "", role: "", dept: "", courses: 1, learners: 0, rating: 5.0, status: "Active" });
    }).catch(() => {});
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Trainers</h2>
          <p className="text-[13px] text-slate-500 max-w-[576px]">
            Manage and monitor instructional talent performance across your ecosystem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[13px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Trainer</span>
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Total Trainers</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.totalTrainers}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Active Trainers</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">
              {stats.activeTrainers}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Activity size={18} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Courses Assigned</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">
              {stats.totalCoursesAssigned}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Average Rating</span>
            <h3 className="text-[24px] font-extrabold text-slate-800 mt-1">{stats.averageRating}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
            <Star size={18} />
          </div>
        </div>
      </div>

      {/* Filter and controls bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search trainers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          {/* Status Select */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-600">
            <Filter size={11} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="bg-transparent border-none outline-none pr-3 py-0.5 cursor-pointer text-[12px] font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 self-end sm:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            <Grid size={15} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === "table" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTrainers.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-slate-100" />
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-800 leading-snug">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${t.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                  {t.status}
                </span>
              </div>

              <div className="bg-slate-50 rounded-lg p-2.5 grid grid-cols-3 gap-1.5 text-center mb-4">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Courses</p>
                  <p className="text-[14px] font-extrabold text-slate-700 mt-0.5">{t.courses}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Learners</p>
                  <p className="text-[14px] font-extrabold text-slate-700 mt-0.5">{t.learners}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rating</p>
                  <p className="text-[14px] font-extrabold text-[#FF6200] flex items-center justify-center gap-0.5 mt-0.5">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{t.rating}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-3">
                <span>{t.dept}</span>
                <span className="text-primary hover:underline cursor-pointer flex items-center gap-0.5">
                  <span>Details</span>
                  <ChevronRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table view */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-3">Trainer</th>
                  <th className="p-3">Department</th>
                  <th className="p-3 text-center">Courses</th>
                  <th className="p-3 text-center">Learners</th>
                  <th className="p-3 text-center">Rating</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[12px] text-slate-600">
                {filteredTrainers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 flex items-center gap-2.5">
                      <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-slate-800">{t.name}</div>
                        <div className="text-[10px] text-slate-400">{t.email}</div>
                      </div>
                    </td>
                    <td className="p-3">{t.dept}</td>
                    <td className="p-3 text-center font-semibold text-slate-800">{t.courses}</td>
                    <td className="p-3 text-center font-semibold text-slate-800">{t.learners}</td>
                    <td className="p-3 text-center font-semibold text-[#FF6200]">{t.rating}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${t.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                        {t.status}
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
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center text-[12.5px] text-slate-450 font-bold px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50">
          <span>Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalElements)} of {totalElements} entries</span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
              className="px-3 py-1 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer text-[12px] font-semibold transition-all"
            >
              Prev
            </button>
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}
              className="px-3 py-1 rounded-lg border border-slate-200 hover:border-slate-350 disabled:opacity-40 disabled:cursor-not-allowed bg-white cursor-pointer text-[12px] font-semibold transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white w-full max-w-[448px] rounded-xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-[16px] font-bold text-slate-800">Add New Trainer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddTrainer} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                  placeholder="e.g. Michael Brown"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={newTrainer.email}
                  onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                  placeholder="e.g. michael.b@xebia.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Role</label>
                  <input
                    type="text"
                    required
                    value={newTrainer.role}
                    onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                    placeholder="e.g. Developer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Department</label>
                  <input
                    type="text"
                    required
                    value={newTrainer.dept}
                    onChange={(e) => setNewTrainer({ ...newTrainer, dept: e.target.value })}
                    placeholder="e.g. Frontend"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-[12px] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-[#6c0f66] text-white rounded-lg text-[12px] font-semibold cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 size={13} />
                  <span>Save Trainer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
