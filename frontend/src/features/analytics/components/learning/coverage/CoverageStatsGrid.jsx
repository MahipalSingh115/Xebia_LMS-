import React from "react";
import { Users, UserCheck, Percent, UserMinus, TrendingUp, TrendingDown } from "lucide-react";

// Reusable Coverage Stat Card Component
function CoverageStatCard({
  title,
  value,
  icon: Icon,
  colorConfig,
  trend,
  subtext,
  showProgress,
  progressValue,
}) {
  const isDown = trend && trend.startsWith("-");

  return (
    <div
      className="
        bg-white p-6 rounded-3xl border border-[#d5c1cc]
        hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(108,29,95,0.15)]
        transition-all duration-200 flex flex-col gap-4 relative overflow-hidden group
      "
    >
      {/* Top section: Icon and Trend badge */}
      <div className="flex justify-between items-start">
        <div
          className={`p-3 rounded-2xl ${colorConfig.iconBg} ${colorConfig.iconColor}
            group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon size={22} />
        </div>

        {trend && (
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
        )}
      </div>

      {/* Main Stats: Value & Title */}
      <div className="space-y-1.5">
        <p className="text-[#51434c] text-sm font-medium">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-[#6C1D5F]">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtext && (
            <span className="text-[11px] text-slate-400 font-medium">{subtext}</span>
          )}
        </div>
      </div>

      {/* Progress visualizer for % or custom bars */}
      {showProgress && (
        <div className="mt-1">
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
            <span>Progress</span>
            <span>{progressValue}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colorConfig.progressBg}`}
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Custom background glow on hover */}
      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full filter blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none ${colorConfig.glowBg}`}
      />
    </div>
  );
}

export default function CoverageStatsGrid({ summary = {}, loading = false }) {
  const { totalEmployees = 0, employeesCovered = 0, coveragePercentage = 0, pendingEmployees = 0 } = summary;

  // Visual styling configs for cards
  const cardConfigs = {
    total: {
      iconBg: "bg-[#6C1D5F]/10",
      iconColor: "text-[#6C1D5F]",
      progressBg: "bg-[#6C1D5F]",
      glowBg: "bg-[#6C1D5F]",
    },
    covered: {
      iconBg: "bg-[#56dacc]/25",
      iconColor: "text-[#005049]",
      progressBg: "bg-[#2ebdaf]",
      glowBg: "bg-[#2ebdaf]",
    },
    percentage: {
      iconBg: "bg-[#ff83ec]/20",
      iconColor: "text-[#9e2e93]",
      progressBg: "bg-[#9e2e93]",
      glowBg: "bg-[#ff83ec]",
    },
    pending: {
      iconBg: "bg-[#ffdad6]",
      iconColor: "text-[#ba1a1a]",
      progressBg: "bg-[#ba1a1a]",
      glowBg: "bg-[#ba1a1a]",
    },
  };

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Employees */}
      <CoverageStatCard
        title="Total Employees"
        value={loading ? "—" : totalEmployees}
        icon={Users}
        colorConfig={cardConfigs.total}
        trend="+3.4%"
        subtext="headcount"
      />

      {/* 2. Employees Covered */}
      <CoverageStatCard
        title="Employees Covered"
        value={loading ? "—" : employeesCovered}
        icon={UserCheck}
        colorConfig={cardConfigs.covered}
        trend="+5.8%"
        subtext="enrolled/completed"
        showProgress={!loading && totalEmployees > 0}
        progressValue={totalEmployees > 0 ? Math.round((employeesCovered / totalEmployees) * 100) : 0}
      />

      {/* 3. Coverage % */}
      <CoverageStatCard
        title="Coverage Percentage"
        value={loading ? "—" : `${coveragePercentage}%`}
        icon={Percent}
        colorConfig={cardConfigs.percentage}
        trend="+2.1%"
        showProgress={!loading}
        progressValue={coveragePercentage}
      />

      {/* 4. Pending Employees */}
      <CoverageStatCard
        title="Pending Employees"
        value={loading ? "—" : pendingEmployees}
        icon={UserMinus}
        colorConfig={cardConfigs.pending}
        trend="-4.2%"
        subtext="not started"
        showProgress={!loading && totalEmployees > 0}
        progressValue={totalEmployees > 0 ? Math.round((pendingEmployees / totalEmployees) * 100) : 0}
      />
    </div>
  );
}
