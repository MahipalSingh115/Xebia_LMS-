import { TrendingUp, TrendingDown } from "lucide-react";

/* ─── Per-card visual config ──────────────────────────────────────── */
const CONFIG = {
  Categories: {
    iconBg: "bg-[#ff83ec]/20",
    iconColor: "text-[#9e2e93]",
    sparkColor: "#9e2e93",
    spark: "M0 15 Q 10 5, 20 12 T 40 8 T 60 15 T 80 5 T 100 12",
  },
  Courses: {
    iconBg: "bg-[#6C1D5F]/10",
    iconColor: "text-[#6C1D5F]",
    sparkColor: "#6C1D5F",
    spark: "M0 18 Q 15 2, 30 15 T 45 5 T 60 12 T 75 2 T 100 10",
  },
  Modules: {
    iconBg: "bg-[#2ebdaf]/20",
    iconColor: "text-[#2ebdaf]",
    sparkColor: "#2ebdaf",
    spark: "M0 10 Q 20 15, 40 5 T 60 12 T 80 8 T 100 2",
  },
  "Sub Modules": {
    iconBg: "bg-[#83727c]/20",
    iconColor: "text-[#83727c]",
    sparkColor: "#83727c",
    spark: "M0 5 Q 15 15, 30 8 T 45 12 T 60 5 T 75 10 T 100 8",
  },
  Content: {
    iconBg: "bg-[#56dacc]/20",
    iconColor: "text-[#2ebdaf]",
    sparkColor: "#2ebdaf",
    spark: "M0 12 Q 20 4, 40 10 T 60 6 T 80 12 T 100 4",
  },
};

export default function StatCard({ title, value, icon: Icon, trend = "+0%" }) {
  const cfg = CONFIG[title] ?? CONFIG.Courses;
  const isDown = String(trend).startsWith("-");

  return (
    <div
      className="
        bg-white p-6 rounded-3xl border border-[#d5c1cc]
        hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(108,29,95,0.15)]
        transition-all duration-200 flex flex-col gap-4 relative overflow-hidden group
      "
    >
      {/* Icon + Trend badge */}
      <div className="flex justify-between items-start">
        <div
          className={`p-3 rounded-2xl ${cfg.iconBg} ${cfg.iconColor}
            group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon size={22} />
        </div>

        <span
          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
            isDown
              ? "bg-[#ffdad6] text-[#ba1a1a]"
              : "bg-[#56dacc]/20 text-[#002f2a]"
          }`}
        >
          {isDown ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
          {trend}
        </span>
      </div>

      {/* Label + value */}
      <div>
        <p className="text-[#51434c] text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-[#6C1D5F]">
          {typeof value === "number" ? value.toLocaleString() : value ?? 0}
        </p>
      </div>
    </div>
  );
}