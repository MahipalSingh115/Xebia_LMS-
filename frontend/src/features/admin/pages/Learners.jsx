import { useState } from "react";
import AppLayout from "@/app/layouts/AppLayout";
import { Users, Bolt, School, Award, Search, Trash2, Edit, Eye, ChevronRight, UserPlus } from "lucide-react";

const INITIAL_LEARNERS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@xebia-internal.com",
    department: "Cloud Architecture",
    courses: ["AWS", "AZR"],
    progress: 74,
    status: "Active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4jxu5wlvZNsF5kcWU8kAKBkR3rDrzHPNO7YVOhPaH7RwftlbDRWfmatT6z_rVOKh9BJ4EoIdU7k88fTj8yrokIRjIsz2H9hkGebKUDcyra_P6ld_sP-jDkEHlKcZnHNVDTi63oZfGJrxbh9i2tM73u-M3zFeUwqtdi2Nz6RSipelLVcc3Zg5fI4hobbG0wZVKu034BB21DG44eL9vIvpwPumSjGKIAAkWk-UPOSsvuPTuX0kAb79p"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    email: "m.thorne@xebia-internal.com",
    department: "Data Science",
    courses: ["PY", "SQL"],
    progress: 21,
    status: "Pending",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnH3yqRPOKAPvqpb19L-YSav_1okL7CWF61mg1oFHnH-iWgthoFtCS9TUNNeyC3wFDMy1rA0kuLSp3t6dNfQ-ulgrf7AMPeTvfqerQyowZQTwrKI0XZC0gWvikXlFEPrrNRo5fIpkaEEWdML2Y_WZEwD4gHHd16-QKzDu7D8zmSdWi9qqvW-fGkFgGHq2hoXTAE50c328plrOlebt2SNeIk7NvjRCeGp4QaoBUtbwsGEYqx4-y5oqJ"
  },
  {
    id: 3,
    name: "Lydia Huang",
    email: "l.huang@xebia-internal.com",
    department: "Product Management",
    courses: ["UX", "PDM", "AI"],
    progress: 100,
    status: "Active",
    avatar: ""
  },
  {
    id: 4,
    name: "Robert Vance",
    email: "r.vance@xebia-internal.com",
    department: "Legal & Compliance",
    courses: ["SEC", "CMP"],
    progress: 45,
    status: "Inactive",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzfrNXUqDr8JyNOoZ9D_kVl9gjMMEZqKzsSYqc_NjVeDZoB9mNf7cFDTnByA2qKJYwcollVgDKvpAUdsRr1PafJHN-xjAwc5kzqVkc93pXzpMAT6Ist8_ykVAMvIpQL_5t5u6-WnYflYZIQdTFtHdVgTL3_fMXxXnjjLUmgC6imooIHP2Bh_dJ5SNC6jrVdIYjlnH6ad5PT-3xWVfn4gqsZIgVmjAtSlzh2lEB6vd2ObVGGxEjyJqO"
  }
];

export default function Learners() {
  const [learners, setLearners] = useState(INITIAL_LEARNERS);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("Department");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [showAddForm, setShowAddForm] = useState(false);

  // New learner form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDept, setNewDept] = useState("Cloud Architecture");
  const [newStatus, setNewStatus] = useState("Active");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this learner?")) {
      setLearners(learners.filter((l) => l.id !== id));
    }
  };

  const handleAddLearner = (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    const newL = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      department: newDept,
      courses: ["GEN"],
      progress: 0,
      status: newStatus,
      avatar: ""
    };
    setLearners([newL, ...learners]);
    setNewName("");
    setNewEmail("");
    setShowAddForm(false);
  };

  const filtered = learners.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "Department" || l.department === deptFilter;
    const matchesStatus = statusFilter === "Status" || l.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[13px] text-slate-400 font-medium">
          <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-800 font-semibold">Learners</span>
        </nav>

        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[21px] font-bold text-slate-900 tracking-tight leading-snug">
              Learners Dashboard
            </h1>
            <p className="text-[13px] text-slate-400 mt-1">
              Manage student registrations, academic progress, and directory details.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-primary hover:bg-primary-dark transition-colors cursor-pointer"
          >
            <UserPlus size={14} /> Add Learner
          </button>
        </div>

        {/* Quick Add Form */}
        {showAddForm && (
          <form onSubmit={handleAddLearner} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5 w-full">
            <h3 className="text-[15px] font-bold text-slate-800">Add New Learner</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter learner's full name"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    paddingRight: '32px'
                  }}
                >
                  <option>Cloud Architecture</option>
                  <option>Data Science</option>
                  <option>Product Management</option>
                  <option>Legal & Compliance</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    paddingRight: '32px'
                  }}
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-[13px] font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-[13px] font-bold bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors"
              >
                Create Learner
              </button>
            </div>
          </form>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Learners</span>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Users size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-slate-800">{learners.length}</span>
              <span className="text-emerald-600 font-bold text-[11px]">+14%</span>
            </div>
            <p className="text-[11px] text-slate-400">From last month activity</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Learners</span>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Bolt size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-slate-800">
                {learners.filter((l) => l.status === "Active").length}
              </span>
              <span className="text-emerald-600 font-bold text-[11px]">+3%</span>
            </div>
            <p className="text-[11px] text-slate-400">Users online in last 24h</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completions</span>
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <School size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-slate-800">45</span>
              <span className="text-primary font-bold text-[11px]">-2%</span>
            </div>
            <p className="text-[11px] text-slate-400">Aggregate course completions</p>
          </div>
          {/* Card 4 */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Certificates</span>
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <Award size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-slate-800">38</span>
              <span className="text-emerald-600 font-bold text-[11px]">+22%</span>
            </div>
            <p className="text-[11px] text-slate-400">Verified credentials</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          {/* Controls */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-bold text-slate-800">Learner Records</h3>
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[11px] font-bold">
                {filtered.length} RESULTS
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 w-64">
                <Search size={14} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-[13px] w-full outline-none"
                />
              </div>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[13px] focus:outline-none min-w-[130px]"
              >
                <option>Department</option>
                <option>Cloud Architecture</option>
                <option>Data Science</option>
                <option>Product Management</option>
                <option>Legal & Compliance</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[13px] focus:outline-none min-w-[130px]"
              >
                <option>Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="px-2 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap min-w-[140px] max-w-xs">Learner</th>
                  <th className="px-2 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap min-w-[90px]">Department</th>
                  <th className="px-2 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap min-w-[60px]">Courses</th>
                  <th className="px-2 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap min-w-[80px]">Progress</th>
                  <th className="px-2 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap min-w-[70px]">Status</th>
                  <th className="px-2 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right whitespace-nowrap min-w-[50px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-2 min-w-0">
                        {l.avatar ? (
                          <img className="w-8 h-8 rounded-full border border-slate-200 object-cover flex-shrink-0" src={l.avatar} alt={l.name} />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-[10px] flex-shrink-0">
                            {l.name.split(" ").map(n => n[0]).join("")}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-800 text-[12px] truncate">{l.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{l.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-[12px] text-slate-700 whitespace-nowrap">{l.department}</td>
                    <td className="px-2 py-4">
                      <div className="flex -space-x-1 flex-wrap">
                        {l.courses.map((c, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600 shadow-sm flex-shrink-0"
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-600">{l.progress}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${l.progress === 100 ? "bg-emerald-500" : "bg-primary"}`}
                            style={{ width: `${l.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase border inline-block ${
                          l.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : l.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-slate-50 text-slate-500 border-slate-100"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-2 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer hover:bg-slate-100 rounded-md">
                          <Eye size={13} />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer hover:bg-slate-100 rounded-md">
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(l.id)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer hover:bg-red-50 rounded-md"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
