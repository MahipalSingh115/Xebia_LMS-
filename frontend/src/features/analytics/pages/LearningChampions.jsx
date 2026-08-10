import React, { useState, useEffect, useMemo } from "react";
import { Award, Zap, Trophy, Medal, Star } from "lucide-react";
import { useAnalyticsFilters } from "../context/AnalyticsFilterContext";
import analyticsService from "../services/analyticsService";
import AnalyticsPageLayout from "../components/AnalyticsPageLayout";
import AnalyticsSection from "../components/AnalyticsSection";
import AnalyticsKpiCard from "../components/AnalyticsKpiCard";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AnalyticsTable from "../components/AnalyticsTable";

export default function LearningChampions() {
  const { filters, search } = useAnalyticsFilters();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  // UI Status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dev Simulators
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState(false);
  const [simEmpty, setSimEmpty] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyticsService.getChampionsDashboard({ ...filters, search }, page, 5);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve champions metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters, search, page]);

  const kpis = data?.kpis || {};
  const charts = data?.charts || {};
  const table = data?.tables || {};
  const rows = table.content || [];

  // Derived Top 10 leaderboard (calculated server-side or filtered/sorted on the loaded registry list)
  const leaderboardEmployees = useMemo(() => {
    return [...rows]
      .sort((a, b) => b.learningHours - a.learningHours || b.readinessScore - a.readinessScore)
      .slice(0, 10);
  }, [rows]);

  return (
    <AnalyticsPageLayout
      title="Learning Champions"
      description="Acknowledge top self-paced learning time achievers, certification leaders, and practice champions."
      breadcrumbs={[{ label: "Learning Champions" }]}
      isLoading={loading || simLoading}
      isError={error !== null || simError}
      isEmpty={simEmpty || rows.length === 0}
      onRetry={fetchDashboard}
      simulateLoading={simLoading}
      setSimulateLoading={setSimLoading}
      simulateError={simError}
      setSimulateError={setSimError}
      simulateEmpty={simEmpty}
      setSimulateEmpty={setSimEmpty}
    >
      {/* KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsKpiCard
          title="Champion Learners"
          value={kpis.topLearners}
          icon={Trophy}
          type="primary"
          tooltip="Total champions matching search criteria"
        />
        <AnalyticsKpiCard
          title="Advocacy Ratio"
          value={kpis.aiChampionsCount ? Math.round((kpis.aiChampionsCount / (kpis.topLearners || 1)) * 100) : 0}
          suffix="%"
          icon={Zap}
          type="info"
          tooltip="Ratio of AI & Data champions in the cohort"
        />
        <AnalyticsKpiCard
          title="Certified Headcount"
          value={kpis.certifiedEmployees}
          icon={Award}
          type="success"
          tooltip="Champions holding active certifications"
        />
        <AnalyticsKpiCard
          title="Awards Recognized"
          value={kpis.recognitionAwards}
          icon={Medal}
          type="warning"
          tooltip="Champions assigned special recognition awards"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsCard title="Top 5 Learners (Hours)" subtitle="Highest self-paced learning time completed">
          <AnalyticsChart type="bar" data={charts.championLearningHours} xKey="name" yKey="hours" />
        </AnalyticsCard>
        <AnalyticsCard title="Top 5 Readiness Scores" subtitle="Leading individual AI competency index scores">
          <AnalyticsChart type="bar" data={charts.championReadiness} xKey="name" yKey="score" />
        </AnalyticsCard>
        <AnalyticsCard title="Top 5 Certifications Points" subtitle="Total points scored (20 pts per certification)">
          <AnalyticsChart type="bar" data={charts.championCertScore} xKey="name" yKey="certs" />
        </AnalyticsCard>
      </div>

      {/* Grid: Leaderboard & Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 10 Leaderboard Panel */}
        <div id="leaderboard" className="bg-white p-6 rounded-3xl border border-[#d5c1cc]/80 shadow-[0_4px_12px_-4px_rgba(108,29,95,0.05)] flex flex-col select-none">
          <div className="mb-6 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500 fill-amber-500" />
            <div>
              <h4 className="text-sm font-extrabold text-[#6C1D5F]">Top 10 Learning Champions</h4>
              <p className="text-[10px] text-[#83727c] font-semibold">Ranked by hours & AI readiness</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {leaderboardEmployees.length === 0 ? (
              <div className="text-center py-12 text-[#83727c] text-xs font-semibold">
                No leaderboard data available.
              </div>
            ) : (
              leaderboardEmployees.map((emp, index) => {
                const isTop3 = index < 3;
                const rankIcons = [
                  <Trophy size={14} className="text-amber-500 fill-amber-500" />,
                  <Medal size={14} className="text-slate-400 fill-slate-400" />,
                  <Medal size={14} className="text-amber-700 fill-amber-700" />
                ];

                return (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-[#6C1D5F]/5 border border-slate-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${isTop3 ? "bg-white shadow border border-slate-200" : "text-slate-500"}`}>
                        {isTop3 ? rankIcons[index] : index + 1}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-slate-800">{emp.name}</p>
                        <p className="text-[9px] text-[#83727c] font-bold">{emp.department} - {emp.bu}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-black text-[#6C1D5F]">{emp.learningHours} hrs</p>
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-black bg-[#01AC9F]/10 text-[#01AC9F] px-1 rounded">
                        <Zap size={8} className="fill-[#01AC9F]" />
                        {emp.readinessScore}%
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Registry table */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h4 className="text-sm font-extrabold text-[#6C1D5F]">Champions Registry</h4>
            <p className="text-[10px] text-[#83727c] font-semibold">Verify training paths and milestones</p>
          </div>
          <AnalyticsTable
            headers={["Champion Name", "Department", "Practice", "Hours Completed", "Readiness", "Special Recognition", "Actions"]}
            rows={rows}
            currentPage={page + 1}
            totalPages={table.totalPages || 1}
            onPageChange={(p) => setPage(p - 1)}
            renderRow={(emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-800">{emp.name}</td>
                <td className="py-4 px-6 text-slate-500">{emp.department}</td>
                <td className="py-4 px-6 text-slate-500">{emp.practice}</td>
                <td className="py-4 px-6 font-bold text-slate-700">{emp.learningHours} hrs</td>
                <td className="py-4 px-6 font-bold text-[#01AC9F]">{emp.readinessScore}%</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#6C1D5F]/10 text-[#6C1D5F]">
                    <Star size={10} className="fill-[#6C1D5F]" />
                    {emp.recognition}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className={`h-2 w-2 rounded-full inline-block ${emp.active ? "bg-emerald-500" : "bg-slate-350"}`} />
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </AnalyticsPageLayout>
  );
}
