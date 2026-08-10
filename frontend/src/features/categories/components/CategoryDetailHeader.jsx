import React from "react";
import { ChevronRight, BarChart2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function CategoryDetailHeader({
  cat,
  id,
  navigate,
}) {
  return (
    <div className="flex items-start justify-between text-left">
      <div className="space-y-0.5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400">
          <button onClick={() => navigate("/categories")} className="font-medium text-slate-500 hover:text-[#6C1D5F] transition-colors cursor-pointer">
            Categories
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-800 font-semibold">{cat.name}</span>
        </div>
        <h1 className="text-[18px] font-bold text-slate-900 tracking-tight leading-snug">{cat.name}</h1>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="outline" size="sm" className="gap-1.5 text-[13px] cursor-pointer">
          <BarChart2 size={14} /> Analytics
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-[13px] cursor-pointer" onClick={() => navigate(`/categories/${id}/edit`)}>
          <Pencil size={14} /> Edit Category
        </Button>
        <Button variant="destructive" size="sm" className="gap-1.5 text-[13px] bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer">
          <Trash2 size={14} /> Delete
        </Button>
      </div>
    </div>
  );
}
