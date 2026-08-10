import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function CategoryHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Category Management
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Organize and manage your learning curriculum buckets.
        </p>
      </div>
      <button
        onClick={() => navigate("/categories/create")}
        className="flex items-center gap-1.5 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
      >
        <Plus size={14} />
        New Category
      </button>
    </div>
  );
}