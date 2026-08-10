import React from "react";
import { Info, Pencil, TrendingUp, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

export default function CategoryDetailSidebar({
  cat,
  ACCENT,
  enrollTop,
  maxEnroll,
  seoScore,
  seoChecks,
}) {
  const currentAccent = cat.accentColor || ACCENT;

  return (
    <div className="w-[272px] flex-shrink-0 flex flex-col gap-4 text-left">
      
      {/* Category Details */}
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="flex-row items-center justify-between py-3 px-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-800">
            <Info size={14} className="text-slate-400" /> Category Details
          </div>
          <button className="flex items-center gap-1 text-[12.5px] font-medium text-[#6C1D5F] hover:text-[#4A1E47] cursor-pointer">
            <Pencil size={11} /> Edit
          </button>
        </CardHeader>
        <CardContent className="px-0 py-0">
          {[
            { lbl: "Status", val: (
              <Badge className={`border-transparent gap-1 text-[11px] ${
                cat.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                {cat.status || "Active"}
              </Badge>
            )},
            { lbl: "Publish State", val: (
              <Badge className={`border-transparent gap-1 text-[11px] ${
                cat.publishState === "Published" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.publishState === "Published" ? "bg-blue-500" : "bg-amber-500"}`} />
                {cat.publishState || "Published"}
              </Badge>
            )},
            { lbl: "Slug",     val: <span className="font-mono text-[11.5px] bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-slate-700">{cat.slug || "—"}</span> },
            { lbl: "Accent Color", val: (
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-[3px] border border-slate-200" style={{ background: currentAccent }} />
                <span className="text-[12px] font-bold text-slate-700">{currentAccent}</span>
              </div>
            )},
            { lbl: "Created",  val: <span className="text-[12px] text-slate-500">Jan 10, 2024</span> },
            { lbl: "Modified", val: <span className="text-[12px] text-slate-500">Jun 19, 2025</span> },
            { lbl: "Featured", val: (
              <div className="flex items-center gap-1.5">
                <div className={`w-7 h-4 rounded-full relative flex-shrink-0 transition-all ${cat.featured ? "bg-[#6C1D5F]" : "bg-slate-200"}`}>
                  <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 shadow-sm transition-all ${cat.featured ? "right-0.5" : "left-0.5"}`} />
                </div>
                <span className="text-[12px] font-semibold text-[#6C1D5F]">{cat.featured ? "Yes" : "No"}</span>
              </div>
            )},
          ].map((row, i, arr) => (
            <div key={row.lbl} className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}>
              <span className="text-[12.5px] text-slate-400 font-medium">{row.lbl}</span>
              {row.val}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enrollments by Course */}
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="flex-row items-center gap-2 py-3 px-4 border-b border-slate-200">
          <TrendingUp size={14} className="text-slate-400" />
          <span className="text-[13.5px] font-semibold text-slate-800">Enrollments by Course</span>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <p className="text-[12px] text-slate-400 mb-3">Top 6 courses by learner count</p>
          <div className="flex flex-col gap-2.5">
            {enrollTop.length === 0 ? (
              <div className="text-[12px] text-slate-400 py-2 text-center">
                No courses available.
              </div>
            ) : (
              enrollTop.map((c, i) => {
                const pct = Math.round((c.learners / maxEnroll) * 100);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[12px] text-slate-500 w-24 truncate flex-shrink-0">{c.title}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: currentAccent, opacity: 0.85 }} />
                    </div>
                    <span className="text-[12px] font-semibold text-slate-700 w-8 text-right flex-shrink-0">{c.learners}</span>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Health */}
      <Card className="border-slate-200 overflow-hidden">
        <CardHeader className="flex-row items-center justify-between py-3 px-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-800">
            <Search size={14} className="text-slate-400" /> SEO Health
          </div>
          <button className="text-[12.5px] font-medium text-[#6C1D5F] hover:text-[#4A1E47] cursor-pointer">Edit SEO</button>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            {/* Score ring */}
            <div
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center flex-col flex-shrink-0"
              style={{ border: `4px solid ${currentAccent}` }}
            >
              <span className="text-[17px] font-bold text-slate-900 leading-none">{seoScore}</span>
              <span className="text-[9.5px] text-slate-400">Score</span>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-slate-800">
                {seoScore >= 90 ? "Excellent" : seoScore >= 70 ? "Good" : seoScore >= 50 ? "Average" : "Poor"}
              </div>
              <div className="text-[11.5px] text-slate-400 mt-0.5">
                {seoScore >= 90 ? "SEO is fully optimized" : seoScore >= 70 ? "A few improvements possible" : "Critical SEO items missing"}
              </div>
              <div className="h-1 w-28 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${seoScore}%`, background: currentAccent }} />
              </div>
            </div>
          </div>

          <Separator className="mb-3" />

          <div className="flex flex-col divide-y divide-slate-100">
            {seoChecks.map((chk) => (
              <div key={chk.label} className="flex items-center gap-2 py-2 text-[12.5px] text-slate-700">
                {chk.ok
                  ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                  : <AlertCircle  size={14} className="text-amber-500 flex-shrink-0"  />
                }
                {chk.label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
