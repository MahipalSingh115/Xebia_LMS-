import { useState, useEffect } from "react";
import { FolderOpen, Users, Edit, Search, Filter, Grid, List, ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import categoryService from "@/features/categories/services/categoryService";

export default function CategoriesManagement() {
  const [viewType, setViewType] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    categoryService.getAllCategories().then(data => {
      if (data && Array.isArray(data)) {
        setCategories(data.map(c => ({
          id: c.id,
          name: c.name,
          desc: c.description || "Comprehensive educational track.",
          courses: c.coursesCount || 10,
          learners: c.learnersCount || "400",
          status: c.status || "Active",
          image: c.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&fit=crop"
        })));
      }
    }).catch(() => {});
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editingCategory.name);
    formData.append("description", editingCategory.desc);
    formData.append("status", editingCategory.status || "Active");

    categoryService.updateCategory(editingCategory.id, formData).then(() => {
      loadCategories();
      setEditingCategory(null);
    }).catch(() => {});
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-bold text-slate-800 leading-snug">Category Management</h2>
          <p className="text-[13px] text-slate-500 max-w-[672px]">
            Organize your educational content into thematic groups to improve discoverability for learners and administrators.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-sm">
          <button
            onClick={() => setViewType("grid")}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1 text-[11px] font-bold transition-all ${
              viewType === "grid"
                ? "bg-purple-50 text-primary shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Grid size={14} />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewType("table")}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1 text-[11px] font-bold transition-all ${
              viewType === "table"
                ? "bg-purple-50 text-primary shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <List size={14} />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-1 items-center gap-3 min-w-[300px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-[12px] text-slate-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Search categories..."
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold hover:bg-slate-50 transition-colors">
            <Filter size={14} className="text-slate-450" />
            <span>Filters</span>
          </button>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-slate-500 font-medium">
          <span>Showing {filteredCategories.length} of 24 Categories</span>
        </div>
      </div>

      {/* Grid View */}
      {viewType === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((c) => (
            <div key={c.id} className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="relative h-40">
                <img className="w-full h-full object-cover" src={c.image} alt={c.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-primary text-[9px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    {c.status}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between min-h-[170px]">
                <div>
                  <h3 className="text-[14px] font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed mb-4">{c.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                  <div className="flex gap-4 text-[11px] text-slate-500 font-bold">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">Courses</p>
                      <p className="text-[13px] font-black text-slate-805 mt-1">{c.courses}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">Learners</p>
                      <p className="text-[13px] font-black text-slate-805 mt-1">{c.learners}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingCategory(c)}
                    className="text-primary hover:bg-purple-50 p-2 rounded-lg transition-colors border border-transparent hover:border-primary/10"
                  >
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewType === "table" && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Category</th>
                  <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Description</th>
                  <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-center">Courses</th>
                  <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-center">Learners</th>
                  <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                  <th className="p-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3">
                      <span className="text-[12px] font-semibold text-slate-850">{c.name}</span>
                    </td>
                    <td className="p-3 text-[12px] text-slate-500 max-w-[320px] truncate">{c.desc}</td>
                    <td className="p-3 text-[12px] font-bold text-slate-800 text-center">{c.courses}</td>
                    <td className="p-3 text-[12px] font-bold text-slate-800 text-center">{c.learners}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setEditingCategory(c)}
                        className="text-primary hover:bg-purple-50 p-1.5 rounded transition-all inline-block border border-transparent hover:border-primary/10"
                      >
                        <Edit size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-[12px] text-slate-500 font-medium">
        <span>Showing {filteredCategories.length} of 24 Categories</span>
        <div className="flex items-center gap-1.5">
          <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-slate-450 disabled:opacity-40" disabled>
            <ChevronLeft size={14} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center border border-primary bg-primary text-white rounded text-[11px] font-bold">1</button>
          <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-[11px] text-slate-650">2</button>
          <button className="w-7 h-7 flex items-center justify-center border border-slate-250 rounded hover:bg-slate-100 transition-colors text-slate-450">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setEditingCategory(null)}></div>
          <div className="relative bg-white w-full max-w-[448px] rounded-xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-up border border-slate-100">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-[16px] font-bold text-slate-800">Edit Category</h3>
              <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Category Name</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-[12px] text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Description</label>
                <textarea
                  rows="3"
                  required
                  value={editingCategory.desc}
                  onChange={(e) => setEditingCategory({ ...editingCategory, desc: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-[12px] text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-3.5 py-2 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-primary text-white rounded-lg text-[12px] font-bold hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
