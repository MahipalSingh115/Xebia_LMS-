import React from "react";
import { Link, Clock } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

export default function CategoryDetailHero({
  cat,
  ACCENT,
}) {
  const currentAccent = cat.accentColor || ACCENT;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-left">
      {/* Color accent bar */}
      <div className="h-1" style={{ background: currentAccent }} />
      <div className="p-5 flex items-start gap-4">
        {/* Emoji box */}
        <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-3xl flex-shrink-0 select-none">
          {cat.emoji || "📁"}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">{cat.name}</span>
            <Badge className={`border-transparent gap-1.5 font-semibold ${
              cat.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
              {cat.status || "Active"}
            </Badge>
            {cat.publishState && (
              <Badge className={`border-transparent gap-1.5 font-semibold ${
                cat.publishState === "Published" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.publishState === "Published" ? "bg-blue-500" : "bg-amber-400"}`} />
                {cat.publishState}
              </Badge>
            )}
            {cat.featured && (
              <Badge className="bg-amber-500 text-white border-transparent gap-1 font-bold">
                ★ Featured
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400 mb-2.5">
            <Link size={12} />
            <span>/categories/</span>
            <span className="text-[#6C1D5F] font-medium">{cat.slug || ""}</span>
          </div>
          <div className="text-[13.5px] text-slate-500 leading-relaxed mb-1 w-full">{cat.description}</div>
          {cat.longDesc && (
            <div className="text-[12.5px] text-slate-400 leading-relaxed mb-3 w-full border-l-2 border-slate-150 pl-3 italic">{cat.longDesc}</div>
          )}
          {cat.tags && cat.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {cat.tags.map((t) => (
                <span key={t} className="px-2.5 py-0.5 bg-slate-50 border border-slate-150 text-slate-600 rounded-full text-[11.5px] font-medium">#{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Aside */}
        <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-150 rounded-lg">
            <div className="w-3.5 h-3.5 rounded-[3px]" style={{ background: currentAccent }} />
            <span className="text-[12.5px] font-bold text-slate-700 font-mono">{currentAccent}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400">
            <Clock size={12} />
            Updated Recently
          </div>
        </div>
      </div>
    </div>
  );
}
