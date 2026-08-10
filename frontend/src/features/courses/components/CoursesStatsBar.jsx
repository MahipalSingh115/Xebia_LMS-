export default function CoursesStatsBar({ courses, counts }) {
  const stats = [
    { label: "Total Courses",  value: courses.length,   color: "" },
    { label: "Published",      value: counts.published, color: "text-emerald-600" },
    { label: "Drafts",         value: counts.draft,     color: "text-amber-600" },
    { label: "Featured",       value: counts.featured,  color: "text-purple-600" },
    { label: "Total Learners", value: courses.reduce((acc, c) => acc + (c.learners || 0), 0).toLocaleString(), color: "" },
  ];

  return (
    <div className="grid grid-cols-5 gap-3.5">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-slate-200 rounded-xl px-4 py-3.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
            {s.label}
          </div>
          <div className={`text-[22px] font-bold tracking-tight leading-none ${s.color || "text-slate-900"}`}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
