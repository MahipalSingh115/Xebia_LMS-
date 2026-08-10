import { Layers, CheckCircle, BookOpen } from "lucide-react";

export default function CategoryStats({ categories }) {
  const total = categories.length;
  const active = categories.filter((c) => c.status === "Active").length;
  const avg = total > 0 
    ? (categories.reduce((acc, c) => acc + (c.courses || 0), 0) / total).toFixed(1) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#F7F8FC] flex items-center justify-center text-[#6C1D5F]">
          <Layers size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Categories
          </p>
          <p className="text-lg font-bold text-slate-800">{total}</p>
        </div>
      </div>

      {/* Active */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#01AC9F]/10 flex items-center justify-center text-[#01AC9F]">
          <CheckCircle size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Active
          </p>
          <p className="text-lg font-bold text-slate-800">{active}</p>
        </div>
      </div>

      {/* Avg courses */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
          <BookOpen size={22} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Avg. Courses/Cat
          </p>
          <p className="text-lg font-bold text-slate-800">{avg}</p>
        </div>
      </div>
    </div>
  );
}