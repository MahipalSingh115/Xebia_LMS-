import React from "react";
import { Eye, CheckCircle } from "lucide-react";

export default function CategoryPreview({
  form,
}) {
  return (
    <div className="w-[320px] min-w-[320px] border-l border-slate-200 bg-white flex flex-col sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto flex-shrink-0 text-left">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
        <div className="text-[13px] font-bold text-slate-900">Live Preview</div>
        <button className="text-[12px] font-medium text-slate-500 border border-slate-200 rounded-md px-2 py-1 hover:bg-slate-50 cursor-pointer">
          <Eye size={12} className="inline mr-1" /> Full preview
        </button>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Category card preview */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Category Card</div>
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <div className="h-1" style={{ background: form.accentColor || "#6C1D5F" }} />
            <div className="p-4">
              <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mb-3 bg-white border border-slate-100 w-[52px] h-[52px]">{form.emoji || "📁"}</div>
              <div className="text-[14px] font-bold text-slate-900 mb-0.5">{form.name || "Category Name"}</div>
              <div className="text-[11px] text-slate-400 font-mono mb-2">xebia.com/categories/{form.slug || "slug"}</div>
              <div className="text-[12px] text-slate-600 leading-snug mb-3 line-clamp-2">{form.shortDesc || "Short description will appear here."}</div>
              <div className="flex gap-3 mb-3">
                <div><div className="text-[14px] font-bold text-slate-900">0</div><div className="text-[10px] text-slate-400">Courses</div></div>
                <div><div className="text-[14px] font-bold text-slate-900">0</div><div className="text-[10px] text-slate-400">Learners</div></div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${form.featured ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                  {form.featured ? "⭐ Featured" : "Standard"}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${form.status === "Published" ? "bg-emerald-50 text-emerald-700" :
                  form.status === "Draft" ? "bg-amber-50 text-amber-700" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                  {form.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Completeness checklist */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Completeness</div>
          <div className="space-y-2">
            {[
              { label: "Category name", done: !!form.name },
              { label: "URL slug", done: !!form.slug },
              { label: "Emoji / icon", done: !!form.emoji },
              { label: "Accent color", done: !!form.accentColor },
              { label: "Short description", done: form.shortDesc.length >= 20 },
              { label: "Meta title", done: form.metaTitle.length >= 10 },
              { label: "Meta description", done: form.metaDesc.length >= 40 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-[12px]">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                  {item.done ? <CheckCircle size={10} /> : <span className="text-[9px]">○</span>}
                </div>
                <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* SEO preview */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Search Preview</div>
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-[11px] text-emerald-700 mb-0.5 font-medium truncate">xebia.com › categories › {form.slug || "slug"}</div>
            <div className="text-[14px] font-semibold text-blue-600 mb-1 leading-snug line-clamp-2">{form.metaTitle || "Meta title"}</div>
            <div className="text-[12px] text-slate-500 leading-snug line-clamp-3">{form.metaDesc || "Meta description will appear here."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
