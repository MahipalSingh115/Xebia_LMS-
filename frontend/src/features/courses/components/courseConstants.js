/* ─── Badge config ──────────────────────────────────────────────── */
export const DIFF_BADGE = {
  Beginner:     "bg-slate-100 text-slate-600 border border-slate-200",
  Intermediate: "bg-amber-50 text-amber-700 border border-amber-200",
  Advanced:     "bg-orange-50 text-orange-700 border border-orange-200",
  Expert:       "bg-red-50 text-red-700 border border-red-200",
};

export const STATUS_BADGE = {
  published: { cls: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500", label: "Published" },
  draft:     { cls: "bg-amber-50 text-amber-700 border border-amber-200",       dot: "bg-amber-500",   label: "Draft" },
  archived:  { cls: "bg-red-50 text-red-700 border border-red-200",             dot: "bg-red-500",     label: "Archived" },
};

const CAT_BADGE = {
  Frontend: "bg-[#eef2ff] text-[#6C1D5F] border border-[#c7d2fe]",
  DevOps:   "bg-blue-50 text-blue-700 border border-blue-200",
  Cloud:    "bg-blue-50 text-blue-700 border border-blue-200",
  "AI/ML":  "bg-purple-50 text-purple-700 border border-purple-200",
  Design:   "bg-slate-100 text-slate-600 border border-slate-200",
  Business: "bg-teal-50 text-teal-700 border border-teal-200",
  General:  "bg-slate-100 text-slate-600 border border-slate-200",
};

export function getCatBadge(name = "") {
  const key = Object.keys(CAT_BADGE).find((k) =>
    name.toLowerCase().includes(k.toLowerCase())
  );
  return CAT_BADGE[key ?? "General"];
}

export const TABS = [
  { label: "All Courses", filter: null },
  { label: "Published",   filter: "published", badge: "badge-success" },
  { label: "Drafts",      filter: "draft",      badge: "badge-warning" },
  { label: "Archived",    filter: "archived",   badge: "badge-danger" },
  { label: "Featured",    filter: "featured",   badge: "badge-purple" },
];

export const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60";
